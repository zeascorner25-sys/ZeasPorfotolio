export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  link: string;
  buttonText: string;
  isExternalLink?: boolean;
}

export interface ShowcaseCategory {
  id: string;
  title: string;
  icon: string;
  desc: string;
  featuredProjects: { title: string }[];
  exploreButtonText: string;
  viewAllButtonText: string;
  path: string;
  allProjects: ProjectItem[];
}

export const CATEGORIES_DATA: ShowcaseCategory[] = [
  {
    id: "website",
    title: "Website",
    icon: "🌐",
    desc: "Website premium untuk UMKM, Company Profile, Corporate dan Personal Brand.",
    featuredProjects: [
      { title: "Website D'Foria Kitchen" },
      { title: "Company Profile" },
      { title: "Corporate Website" }
    ],
    exploreButtonText: "Explore Website",
    viewAllButtonText: "Lihat Semua Website",
    path: "/portfolio/website",
    allProjects: [
      {
        id: "web-1",
        title: "Website D'Foria Kitchen",
        description: "Website UMKM modern untuk memperkenalkan produk, menu eksklusif, dan memudahkan pelanggan menghubungi bisnis langsung.",
        link: "https://d-foria-kitchen.vercel.app",
        buttonText: "Lihat Demo"
      },
      {
        id: "web-2",
        title: "Company Profile Zeas",
        description: "Website Company Profile elegan berkelas dunia untuk meningkatkan reputasi, nilai tawar, dan profesionalisme bisnis Anda.",
        link: "https://d-foria-kitchen.vercel.app",
        buttonText: "Lihat Demo"
      },
      {
        id: "web-3",
        title: "Corporate Website Premium",
        description: "Platform corporate modern dengan struktur navigasi profesional, performa tinggi, dan standar keamanan internasional.",
        link: "https://d-foria-kitchen.vercel.app",
        buttonText: "Lihat Demo"
      },
      {
        id: "web-4",
        title: "Luxury Personal Portfolio",
        description: "Website portofolio pribadi mewah yang dikustomisasi khusus untuk seniman, eksekutif, dan profesional terkemuka.",
        link: "https://d-foria-kitchen.vercel.app",
        buttonText: "Lihat Demo"
      },
      {
        id: "web-5",
        title: "Boutique E-Commerce",
        description: "Toko online eksklusif dengan pengalaman berbelanja mulus, galeri produk estetik, dan sistem checkout ringkas.",
        link: "https://d-foria-kitchen.vercel.app",
        buttonText: "Lihat Demo"
      }
    ]
  },
  {
    id: "landing-page",
    title: "Landing Page",
    icon: "🚀",
    desc: "Landing page modern dengan desain premium dan fokus tinggi pada peningkatan konversi.",
    featuredProjects: [
      { title: "Zeas Landing Premium" },
      { title: "Sales Landing Page" },
      { title: "Event Landing Page" }
    ],
    exploreButtonText: "Explore Landing Page",
    viewAllButtonText: "Lihat Semua Landing Page",
    path: "/portfolio/landing-page",
    allProjects: [
      {
        id: "lp-1",
        title: "Landing Page Zeas Lynk",
        description: "Landing page modern dengan tata letak minimalis dan desain premium untuk meningkatkan konversi pemasaran.",
        link: "https://zeaslynkid.lovable.app",
        buttonText: "Lihat Demo"
      },
      {
        id: "lp-2",
        title: "Sales Landing Page",
        description: "Halaman penawaran produk yang sangat persuasif, dioptimalkan untuk memicu tindakan pembelian instan secara maksimal.",
        link: "https://zeaslynkid.lovable.app",
        buttonText: "Lihat Demo"
      },
      {
        id: "lp-3",
        title: "Event Landing Page",
        description: "Landing page promosi acara, seminar, atau peluncuran produk lengkap dengan integrasi form pendaftaran interaktif.",
        link: "https://zeaslynkid.lovable.app",
        buttonText: "Lihat Demo"
      },
      {
        id: "lp-4",
        title: "Product Launch Page",
        description: "Desain halaman khusus berestetika modern untuk memperkenalkan produk baru ke pasar global dengan dampak visual tinggi.",
        link: "https://zeaslynkid.lovable.app",
        buttonText: "Lihat Demo"
      }
    ]
  },
  {
    id: "undangan-website",
    title: "Undangan Website",
    icon: "💌",
    desc: "Website undangan digital elegan dengan fitur lengkap, interaktif, dan ramah pengguna.",
    featuredProjects: [
      { title: "Wedding Invitation Premium" },
      { title: "Birthday Invitation" },
      { title: "Event Invitation" }
    ],
    exploreButtonText: "Explore Invitation",
    viewAllButtonText: "Lihat Semua Undangan",
    path: "/portfolio/undangan",
    allProjects: [
      {
        id: "inv-1",
        title: "Wedding Invitation Website",
        description: "Website undangan pernikahan digital super elegan dilengkapi countdown, galeri foto, peta lokasi, dan RSVP otomatis.",
        link: "https://wedding19.vercel.app/",
        buttonText: "Lihat Demo"
      },
      {
        id: "inv-2",
        title: "Birthday Invitation Custom",
        description: "Undangan digital ulang tahun yang ceria, penuh interaksi, animasi mulus, serta penyesuaian tema warna sesuka hati.",
        link: "https://wedding19.vercel.app/",
        buttonText: "Lihat Demo"
      },
      {
        id: "inv-3",
        title: "Exclusive Gala Invitation",
        description: "Undangan resmi kelas atas untuk jamuan makan malam, gala dinner, reuni mewah, atau perayaan korporat eksklusif.",
        link: "https://wedding19.vercel.app/",
        buttonText: "Lihat Demo"
      }
    ]
  },
  {
    id: "video-ai",
    title: "Video AI",
    icon: "🎬",
    desc: "Koleksi video animasi AI terbaru, video promosi beresolusi tinggi, dan motion graphic dinamis.",
    featuredProjects: [
      { title: "Koleksi Video AI" }
    ],
    exploreButtonText: "Lihat di Threads",
    viewAllButtonText: "Lihat Semua Video AI",
    path: "/portfolio/video-ai",
    allProjects: [
      {
        id: "vid-1",
        title: "Video Animasi AI",
        description: "Lihat seluruh koleksi video AI terbaru, sinematik, dan penuh inspirasi melalui akun Threads resmi Zeas Creative Corner.",
        link: "https://www.threads.net/@zeascreativecorner",
        buttonText: "Lihat Video"
      },
      {
        id: "vid-2",
        title: "Premium AI Motion Visual",
        description: "Kreasi video pendek berestetika tinggi yang diproduksi dengan teknologi AI tercanggih untuk keperluan branding digital.",
        link: "https://www.threads.net/@zeascreativecorner",
        buttonText: "Lihat Video"
      },
      {
        id: "vid-3",
        title: "Interactive AI Promotion Clip",
        description: "Klip video iklan promosi dinamis untuk memperkuat citra visual personal brand Anda di platform media sosial.",
        link: "https://www.threads.net/@zeascreativecorner",
        buttonText: "Lihat Video"
      }
    ]
  },
  {
    id: "produk-digital",
    title: "Produk Digital",
    icon: "🛍",
    desc: "Template premium berstandar industri dengan kebebasan kustomisasi kreatif tingkat tinggi.",
    featuredProjects: [
      { title: "Creative Canvas" },
      { title: "Creative Nest" },
      { title: "Creative Spark" }
    ],
    exploreButtonText: "Explore Product",
    viewAllButtonText: "Lihat Semua Produk Digital",
    path: "/portfolio/produk-digital",
    allProjects: [
      {
        id: "pd-1",
        title: "Creative Canvas",
        description: "Template digital premium dengan kebebasan kustomisasi kreatif tingkat tinggi bagi para desainer dan profesional.",
        link: "https://zeas-creative-canvas.lovable.app",
        buttonText: "Lihat Demo"
      },
      {
        id: "pd-2",
        title: "Creative Nest",
        description: "Koleksi aset kreatif premium dan template portofolio eksklusif untuk agensi dan kreator konten digital.",
        link: "https://zea-creative-nest.lovable.app",
        buttonText: "Lihat Demo"
      },
      {
        id: "pd-3",
        title: "Creative Spark",
        description: "Inspirasi visual instan, aset grafis siap pakai, dan kit peningkatan merek digital profesional berkelas tinggi.",
        link: "https://zea-creative-spark.lovable.app",
        buttonText: "Lihat Demo"
      },
      {
        id: "pd-4",
        title: "Creative Haven",
        description: "Ruang kreatif terpadu dengan ribuan resources digital premium berkualitas tinggi untuk mempercepat alur kerja Anda.",
        link: "https://zeas-creative-haven.lovable.app",
        buttonText: "Lihat Demo"
      }
    ]
  },
  {
    id: "desain-link",
    title: "Desain Link",
    icon: "🔗",
    desc: "Desain Link Bio modern, ringkas, dan elegan untuk mengoptimalkan konversi profil Anda.",
    featuredProjects: [
      { title: "Premium Link Bio" },
      { title: "Business Link Page" },
      { title: "Personal Brand Link" }
    ],
    exploreButtonText: "Explore Design",
    viewAllButtonText: "Lihat Semua Desain Link",
    path: "/portfolio/desain-link",
    allProjects: [
      {
        id: "dl-1",
        title: "Lynk.id Premium",
        description: "Desain Link Bio modern, mewah, dan elegan yang diatur secara presisi untuk personal branding ataupun bisnis.",
        link: "https://lynk.id/fitridianaa28",
        buttonText: "Lihat Demo"
      },
      {
        id: "dl-2",
        title: "Business Link Page",
        description: "Optimasi halaman bio link untuk mengarahkan pengikut media sosial ke kanal penjualan utama dan portofolio Anda.",
        link: "https://lynk.id/fitridianaa28",
        buttonText: "Lihat Demo"
      },
      {
        id: "dl-3",
        title: "Personal Brand Link Showcase",
        description: "Desain tautan satu halaman minimalis modern untuk menampilkan profil profesional, rujukan media, dan link kontak.",
        link: "https://lynk.id/fitridianaa28",
        buttonText: "Lihat Demo"
      }
    ]
  }
];
