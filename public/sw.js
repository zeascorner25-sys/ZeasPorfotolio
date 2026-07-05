const CACHE_NAME = "zeas-creative-corner-v1";
const OFFLINE_URL = "/offline.html";

const PRECACHE_ASSETS = [
  "/",
  "/index.html",
  OFFLINE_URL,
  "/manifest.json",
  "/zeas_brand_icon.jpg"
];

// 1. Install Event: Pre-cache core assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("[Service Worker] Pre-caching core offline assets");
      return cache.addAll(PRECACHE_ASSETS);
    }).then(() => self.skipWaiting())
  );
});

// 2. Activate Event: Clean up outdated caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log("[Service Worker] Removing old cache:", cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// 3. Fetch Event: Serve assets from Cache or Fallback to Offline
self.addEventListener("fetch", (event) => {
  // Only handle GET requests
  if (event.request.method !== "GET") return;

  // Handle HTML document navigation requests
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request).catch(() => {
        // If fetch fails (offline), return cached offline page
        return caches.match(OFFLINE_URL);
      })
    );
    return;
  }

  // Stale-While-Revalidate strategy for static resources (JS, CSS, Images, Fonts)
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        // Fetch in background to update cache asynchronously
        fetch(event.request)
          .then((networkResponse) => {
            if (networkResponse.status === 200) {
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(event.request, networkResponse);
              });
            }
          })
          .catch(() => {
            /* Ignore network errors during async revalidation */
          });
        return cachedResponse;
      }

      // If not cached, fetch from network
      return fetch(event.request).then((networkResponse) => {
        // Cache successful responses for future offline use
        if (
          networkResponse &&
          networkResponse.status === 200 &&
          networkResponse.type === "basic"
        ) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      }).catch(() => {
        // Fallback for media files or fetch errors
        return new Response("Offline resource unavailable", {
          status: 503,
          statusText: "Service Unavailable"
        });
      });
    })
  );
});
