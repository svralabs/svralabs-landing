export interface PortfolioItem {
  id: string;
  slug: string;
  title: string;
  client: string;
  category: 'layanan-publik' | 'pos-retail' | 'fnb' | 'operasional' | 'booking';
  categoryLabel: string;
  badge: string;
  tagline: string;
  description: string;
  year: string;
  location: string;
  status: 'Klien Aktif' | 'Live Demo' | 'Katalog Demo';
  
  // Prinsip filosofi: Demo sudah pasti portofolio, portofolio belum tentu punya demo
  hasDemo: boolean;
  demoUrl?: string;          // Link ke demo interaktif (demo.svralabs.com)
  iframeSource?: string;     // URL app live
  
  hasCaseStudy: boolean;
  caseStudyUrl?: string;     // Link ke artikel studi kasus mendalam
  
  metrics: { label: string; value: string }[];
  features: string[];
  techStack: string[];
  image: string;
  featured: boolean;         // Ditampilkan di highlight homepage
}

export const portfolioCategories = [
  { id: 'all', label: 'Semua Portofolio' },
  { id: 'has-demo', label: '🎮 Ada Live Demo' },
  { id: 'has-case-study', label: '📄 Ada Studi Kasus' },
  { id: 'layanan-publik', label: 'Layanan Publik' },
  { id: 'fnb', label: 'F&B & Cafe' },
  { id: 'pos-retail', label: 'Ritel & Kasir' },
  { id: 'operasional', label: 'Operasional & Jasa' },
  { id: 'booking', label: 'Booking & Reservasi' },
] as const;

export const portfolioItems: PortfolioItem[] = [
  {
    id: 'puskesmas-wonokerto',
    slug: 'puskesmas-wonokerto',
    title: 'Digitalisasi Pelayanan & Rekam Medis Elektronik (EMR)',
    client: 'Puskesmas Wonokerto',
    category: 'layanan-publik',
    categoryLabel: 'Layanan Publik & Kesehatan',
    badge: 'Klien Produksi · Intranet',
    tagline: 'Transformasi alur pendaftaran manual & rekam medis kertas menuju sistem informasi kesehatan terpusat, cepat, dan transparan.',
    description: 'Sistem rekam medis elektronik (EMR) terpusat untuk fasilitas kesehatan primer. Menggantikan ribuan berkas rekam medis fisik menjadi pencarian data instan, bebas antrean menumpuk, dan terintegrasi standar akreditasi dinas.',
    year: '2024',
    location: 'Pekalongan, Jawa Tengah',
    status: 'Klien Aktif',
    hasDemo: false, // Portofolio belum tentu punya public demo (karena data pasien privat & intranet)
    hasCaseStudy: true,
    caseStudyUrl: '/studi-kasus/puskesmas-wonokerto',
    metrics: [
      { label: 'Pencarian Berkas Pasien', value: '< 2 Detik' },
      { label: 'Penurunan Waktu Antre', value: '75%' },
      { label: 'Kehilangan Arsip', value: '0 Kasus' }
    ],
    features: [
      'Pendaftaran Pasien Cepat (NIK / No. BPJS / Nama)',
      'Riwayat Rekam Medis Pasien Terintegrasi',
      'Manajemen Antrean Poli & Farmasi',
      'Dashboard Statistik Kunjungan Harian',
      'Pelaporan Otomatis Standar Dinas Kesehatan'
    ],
    techStack: ['SvelteKit', 'TypeScript', 'PostgreSQL', 'Tailwind CSS'],
    image: '/puskesmas wonokerto/Tangkapan Layar 2026-08-07 pukul 21.59.46.webp',
    featured: true
  },
  {
    id: 'pos-wonopringgo',
    slug: 'pos-wonopringgo',
    title: 'Sistem POS Grosir & Manajemen Inventaris Tekstil',
    client: 'Toko Konveksi Wonopringgo',
    category: 'pos-retail',
    categoryLabel: 'Ritel & Grosir',
    badge: 'Klien Produksi · Pergudangan',
    tagline: 'Sistem POS kasir grosir, pelacakan puluhan ribu meter kain roll, dan sinkronisasi stok multi-gudang.',
    description: 'Solusi kasir dan manajemen persediaan khusus industri garmen dan toko konveksi grosir. Mendukung satuan bertingkat (roll, yard, meter, lusin, kodi), harga grosir dinamis per pelanggan, dan transfer antar gudang otomatis.',
    year: '2024',
    location: 'Wonopringgo, Pekalongan',
    status: 'Klien Aktif',
    hasDemo: false, // Database wholesale privat
    hasCaseStudy: true,
    caseStudyUrl: '/studi-kasus/pos-wonopringgo',
    metrics: [
      { label: 'SKU Kain & Barang Jadi', value: '10.000+' },
      { label: 'Selisih Stok Fisik vs Sistem', value: '< 0.1%' },
      { label: 'Kecepatan Cetak Nota', value: '1.5 Detik' }
    ],
    features: [
      'Multi-Satuan Fleksibel (Roll, Meter, Kodi, Lusin)',
      'Harga Grosir Bertingkat Berdasarkan Volume',
      'Sinkronisasi Stok Real-time 3 Gudang',
      'Cetak Surat Jalan & Faktur Penjualan Grosir',
      'Laporan Laba Kotor & Piutang Pelanggan'
    ],
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js'],
    image: '/toko konveksi wonopringgo/Tangkapan Layar 2026-08-09 pukul 00.24.23.webp',
    featured: true
  },
  {
    id: 'pos-kopi-seruni',
    slug: 'pos-kopi-seruni',
    title: 'POS Kasir Cafe, Kitchen Display & Pemotongan Resep HPP',
    client: 'Kopi Seruni',
    category: 'fnb',
    categoryLabel: 'F&B & Kuliner',
    badge: 'Live Demo · Klien Aktif',
    tagline: 'Sistem kasir F&B modern dengan tiket dapur otomatis, split-bill, dan kartu stok bahan baku resep (HPP).',
    description: 'Aplikasi kasir cafe yang menghubungkan pemesanan meja langsung ke printer dapur dan bar. Stok bahan baku (biji kopi, susu, cup) otomatis berkurang berdasarkan resep menu yang terjual, menjaga margin keuntungan selalu terukur.',
    year: '2024',
    location: 'Pekalongan, Jawa Tengah',
    status: 'Live Demo',
    hasDemo: true, // Demo sudah pasti portofolio
    demoUrl: 'https://demo.svralabs.com/pos/pos-fb',
    iframeSource: 'https://kopi-seruni.vercel.app',
    hasCaseStudy: false,
    metrics: [
      { label: 'Akurasi Perhitungan HPP', value: '100%' },
      { label: 'Kecepatan Tiket ke Dapur', value: 'Instant' },
      { label: 'Waktu Transaksi Kasir', value: '15 Detik' }
    ],
    features: [
      'Manajemen Meja & Status Pesanan (Dine-in / Take-away)',
      'Pemisahan Tiket Bar Minuman & Dapur Makanan',
      'Fitur Split Bill & Gabung Tagihan Cepat',
      'Kartu Stok Otomatis Berdasarkan Resep (HPP)',
      'Rekonsiliasi Shift Kasir & Laporan Omset Harian'
    ],
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Vercel'],
    image: '/toko konveksi wonopringgo/Tangkapan Layar 2026-08-09 pukul 00.24.39.webp',
    featured: true
  },
  {
    id: 'laundry-management',
    slug: 'laundry-management',
    title: 'Sistem Manajemen Laundry Kiloan, QR Tracking & WhatsApp Bot',
    client: 'Svra Laundry Solutions',
    category: 'operasional',
    categoryLabel: 'Jasa & Operasional',
    badge: 'Live Demo · Solusi Siap Pakai',
    tagline: 'Otomasi kasir penimbangan, pelacakan rak cuci-kering-setrika, struk bluetooth, dan notifikasi WA selesai.',
    description: 'Sistem operasional lengkap untuk pengusaha laundry modern. Pelanggan dapat memantau status cucian secara mandiri via scan QR nota, sementara kasir dan staf produksi mencatat alur kerja dari timbang kotor hingga siap diambil.',
    year: '2024',
    location: 'Jawa Tengah',
    status: 'Live Demo',
    hasDemo: true,
    demoUrl: 'https://demo.svralabs.com/operational/laundry',
    iframeSource: 'https://svra-laundry.vercel.app',
    hasCaseStudy: false,
    metrics: [
      { label: 'Komplain Baju Tertukar', value: 'Turun 95%' },
      { label: 'Efisiensi Waktu Kasir', value: '60%' },
      { label: 'Pengiriman Notif WhatsApp', value: 'Otomatis' }
    ],
    features: [
      'Input Kasir Cepat dengan Integrasi Timbangan',
      'Tracking Status Cucian 4 Tahap (Cuci/Kering/Setrika/Siap)',
      'Manajemen Rak Penyimpanan dengan Nomor Barcode',
      'Cetak Struk Thermal Bluetooth 58mm / 80mm',
      'Kirim Notifikasi WhatsApp Saat Cucian Siap Diambil'
    ],
    techStack: ['SvelteKit', 'TypeScript', 'Tailwind CSS', 'Vercel'],
    image: '/laundry management/Tangkapan Layar 2026-08-09 pukul 00.17.08.webp',
    featured: true
  },
  {
    id: 'purchasing-garwo',
    slug: 'purchasing-garwo',
    title: 'Purchasing & Scan OCR Nota Pasar AI (Warmindo Garwo)',
    client: 'Warmindo Garwo',
    category: 'operasional',
    categoryLabel: 'Procurement & Kuliner',
    badge: 'Live Demo · Klien Aktif',
    tagline: 'Otomasi scan OCR nota belanja pasar, rekap pengeluaran bahan baku, dan monitoring procurement.',
    description: 'Sistem pencatatan belanja harian yang memanfaatkan Computer Vision & OCR AI. Cukup foto nota belanja pasar dari smartphone, sistem secara otomatis mengekstrak nama barang, kuantitas, harga satuan, dan menormalkan nama bahan baku.',
    year: '2024',
    location: 'Pekalongan, Jawa Tengah',
    status: 'Live Demo',
    hasDemo: true,
    demoUrl: 'https://demo.svralabs.com/operational/purchasing-garwo',
    iframeSource: 'https://warmindo-garwo-purchasing.vercel.app',
    hasCaseStudy: false,
    metrics: [
      { label: 'Waktu Rekap Nota', value: '45m ➔ 2m' },
      { label: 'Deteksi Kenaikan Harga', value: 'Real-time' },
      { label: 'Akurasi OCR AI', value: '98%' }
    ],
    features: [
      'Scan Foto Nota Fisik dengan AI OCR Vision',
      'Normalisasi Nama Bahan Belanjaan Pasar',
      'Pelacakan Tren Kenaikan Harga Bahan Pokok',
      'Sinkronisasi Otomatis ke Pembukuan Google Sheets',
      'Arsip Bukti Foto Nota Terverifikasi'
    ],
    techStack: ['Next.js', 'TypeScript', 'AI Vision OCR', 'Tailwind CSS'],
    image: '/laundry management/Tangkapan Layar 2026-08-09 pukul 00.17.44.webp',
    featured: true
  },
  {
    id: 'padel-court-booking',
    slug: 'padel-court-booking',
    title: 'Padel Court Booking, Rental Raket & Pembayaran DP 24/7',
    client: 'Svra Sports Venue',
    category: 'booking',
    categoryLabel: 'Booking & Reservasi',
    badge: 'Katalog Demo · Sistem Reservasi',
    tagline: 'Kalender jadwal interaktif per jam, add-on sewa raket/bola, dan kunci slot via DP otomatis.',
    description: 'Platform booking lapangan olahraga online mandiri 24 jam. Pemain dapat memilih slot jam kosong, menambahkan persewaan perlengkapan raket dan bola, serta mengonfirmasi jadwal melalui pembayaran uang muka otomatis.',
    year: '2024',
    location: 'Indonesia',
    status: 'Katalog Demo',
    hasDemo: true,
    demoUrl: 'https://demo.svralabs.com/booking/padel',
    hasCaseStudy: false,
    metrics: [
      { label: 'Kasus Double-Booking', value: '0%' },
      { label: 'Waktu Reservasi Mandiri', value: '< 1 Menit' },
      { label: 'Pemberitahuan Jadwal', value: 'Auto WA' }
    ],
    features: [
      'Kalender Slot Jam Interaktif & Real-Time',
      'Kunci Slot Otomatis dengan Timer Pembayaran DP',
      'Add-on Persewaan Raket, Kok, dan Bola',
      'Pengingat Jadwal Bermain via WhatsApp',
      'Manajemen Member & Paket Main Bulanan'
    ],
    techStack: ['SvelteKit', 'TypeScript', 'Tailwind CSS'],
    image: '/laundry management/Tangkapan Layar 2026-08-09 pukul 00.17.31.webp',
    featured: false
  },
  {
    id: 'minisoccer-arena',
    slug: 'minisoccer-arena',
    title: 'Mini Soccer & Futsal Arena Management System',
    client: 'Svra Sports Arena',
    category: 'booking',
    categoryLabel: 'Booking & Reservasi',
    badge: 'Katalog Demo · Multi-Lapangan',
    tagline: 'Manajemen jadwal multi-lapangan, sparring match, dan paket langganan tim komunitas.',
    description: 'Sistem pengelola venue olahraga berkapasitas banyak lapangan. Mempermudah penjadwalan tim langganan mingguan, pencatatan sewa wasit/fotografer, serta kasir kantin arena dalam satu ekosistem.',
    year: '2024',
    location: 'Indonesia',
    status: 'Katalog Demo',
    hasDemo: true,
    demoUrl: 'https://demo.svralabs.com/booking/minisoccer',
    hasCaseStudy: false,
    metrics: [
      { label: 'Keterisian Lapangan', value: '+35%' },
      { label: 'Kepastian Jadwal Rutin', value: '100%' },
      { label: 'Rekap Kasir Arena', value: 'Otomatis' }
    ],
    features: [
      'Matrix Tampilan Multi-Lapangan Berdampingan',
      'Paket Langganan Mingguan / Bulanan Klub',
      'Sistem Tambahan Sewa Wasit & Dokumentasi',
      'Kasir Terpadu Penjualan Minuman & Jersey',
      'Laporan Okupansi Jam Sibuk (Prime Time)'
    ],
    techStack: ['SvelteKit', 'TypeScript', 'Tailwind CSS'],
    image: '/laundry management/Tangkapan Layar 2026-08-09 pukul 00.17.56.webp',
    featured: false
  },
  {
    id: 'badminton-hall',
    slug: 'badminton-hall',
    title: 'Badminton Hall & Multi-Court Rental System',
    client: 'Svra Badminton Hall',
    category: 'booking',
    categoryLabel: 'Booking & Reservasi',
    badge: 'Katalog Demo · GOR Terpadu',
    tagline: 'Manajemen puluhan karpet lapangan bulutangkis dengan tarif fleksibel per jam.',
    description: 'Solusi digital untuk gedung olahraga bulutangkis dengan banyak lapangan. Mengeliminasi buku jadwal kertas yang rawan bentrok, menyediakan sistem member komunitas, dan laporan pendapatan harian per kasir.',
    year: '2024',
    location: 'Indonesia',
    status: 'Katalog Demo',
    hasDemo: true,
    demoUrl: 'https://demo.svralabs.com/booking/badminton',
    hasCaseStudy: false,
    metrics: [
      { label: 'Utilisasi Lapangan', value: 'Maksimal' },
      { label: 'Human Error Penjadwalan', value: 'Nol' },
      { label: 'Laporan Rekap Keuangan', value: '1-Klik' }
    ],
    features: [
      'Visual Grid Ketersediaan Seluruh Court',
      'Tarif Jam Fleksibel (Pagi, Malam, Akhir Pekan)',
      'Penjualan Kok & Perlengkapan Terintegrasi',
      'Pendaftaran Member & Booking Mandiri',
      'Laporan Rekapitulasi Pendapatan Harian'
    ],
    techStack: ['SvelteKit', 'TypeScript', 'Tailwind CSS'],
    image: '/laundry management/Tangkapan Layar 2026-08-09 pukul 00.18.16.webp',
    featured: false
  }
];
