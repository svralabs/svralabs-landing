export interface ProjectScreenshot {
  title: string;
  desc: string;
  image: string;
}

export type ProjectType = 'system' | 'landing-page';

export interface PortfolioItem {
  id: string;
  slug: string;
  projectType: ProjectType;
  title: string;
  client: string;
  category: string;
  categoryLabel: string;
  badge: string;
  tagline: string;
  description: string;
  year: string;
  location: string;
  status: 'Klien Aktif' | 'Live Demo' | 'Live Website';
  
  // Prinsip filosofi: Demo sudah pasti portofolio, portofolio belum tentu punya demo
  hasDemo: boolean;
  demoUrl?: string;          // Link ke demo interaktif (demo.svralabs.com)
  iframeSource?: string;     // URL app live
  
  hasCaseStudy: boolean;     // Menandakan ada halaman detail project
  caseStudyUrl: string;      // URL ke halaman detail project (/project/[slug])
  
  metrics: { label: string; value: string }[];
  features: string[];
  techStack: string[];
  image: string;
  heroImage: string;
  featured: boolean;
  
  // Konten Detail Project (Tantangan, Solusi, Dampak, Galeri)
  challenges: string[];
  solutions: string[];
  businessImpacts: { metric: string; title: string; desc: string }[];
  gallery: ProjectScreenshot[];
}

export const portfolioCategories = [
  { id: 'all', label: 'Semua Project' },
  { id: 'has-demo', label: 'Ada Live Demo' },
  { id: 'layanan-publik', label: 'Layanan Publik' },
  { id: 'fnb', label: 'F&B & Kuliner' },
  { id: 'pos-retail', label: 'Ritel & Kasir' },
  { id: 'operasional', label: 'Operasional & Jasa' },
] as const;

export const portfolioItems: PortfolioItem[] = [
  {
    id: 'puskesmas-wonokerto',
    slug: 'puskesmas-wonokerto',
    projectType: 'system',
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
    hasDemo: false, // Data rekam medis privat & jaringan intranet
    hasCaseStudy: true,
    caseStudyUrl: '/project/puskesmas-wonokerto',
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
    image: '/puskesmas wonokerto/Tangkapan Layar 2026-08-07 pukul 22.04.52.webp',
    heroImage: '/puskesmas wonokerto/Tangkapan Layar 2026-08-07 pukul 22.04.52.webp',
    featured: true,
    challenges: [
      'Pendaftaran pasien menumpuk setiap pagi karena proses registrasi masih ditulis tangan di buku besar.',
      'Petugas loket dan perawat membutuhkan waktu 15–20 menit hanya untuk mencari berkas rekam medis kertas di gudang arsip.',
      'Dokter kesulitan meninjau riwayat penyakit masa lalu pasien karena berkas fisik sering terselip atau rusak.',
      'Rekapitulasi laporan kunjungan harian untuk dinas kesehatan memakan waktu lembur berjam-jam.'
    ],
    solutions: [
      'Pembangunan sistem EMR terpadu berbasis jaringan intranet lokal yang cepat, stabil, dan aman dari kebocoran data.',
      'Modul pencarian data pasien instan berbasis NIK atau Nomor Kartu BPJS dalam hitungan detik.',
      'Penyatuan alur antrean dari loket pendaftaran langsung masuk ke layar komputer dokter di tiap ruang poli.',
      'Dashboard statistik otomatis yang meng-generate laporan akreditasi dinas kesehatan dalam sekali klik.'
    ],
    businessImpacts: [
      {
        metric: '75%',
        title: 'Waktu Antrean Terpangkas',
        desc: 'Proses pendaftaran hingga pasien masuk ke ruang periksa dokter menjadi jauh lebih singkat dan teratur.'
      },
      {
        metric: '0 Kasus',
        title: 'Kehilangan Rekam Medis',
        desc: 'Seluruh riwayat diagnosa dan terapi tersimpan aman di database digital tanpa risiko berkas fisik hilang.'
      },
      {
        metric: '< 2 Detik',
        title: 'Pencarian Data Pasien',
        desc: 'Petugas loket cukup mengetik NIK atau nama untuk memuat seluruh histori kunjungan pasien.'
      }
    ],
    gallery: [
      {
        title: 'Dashboard Manajemen Puskesmas',
        desc: 'Pemantauan real-time jumlah kunjungan pasien per poli dan status antrean aktif.',
        image: '/puskesmas wonokerto/Tangkapan Layar 2026-08-07 pukul 22.04.52.webp'
      },
      {
        title: 'Modul Loket Pendaftaran Pasien',
        desc: 'Formulir registrasi cepat yang terhubung dengan master data kependudukan & BPJS.',
        image: '/puskesmas wonokerto/Tangkapan Layar 2026-06-17 pukul 20.43.07.webp'
      },
      {
        title: 'Rekam Medis Digital Ruang Poli',
        desc: 'Antarmuka periksa dokter untuk menginput diagnosa ICD-10, resep obat, dan riwayat klinis.',
        image: '/puskesmas wonokerto/Tangkapan Layar 2026-06-17 pukul 20.43.13.webp'
      },
      {
        title: 'Antrean & Akses Tablet Petugas',
        desc: 'Tampilan responsif yang dapat dioperasikan staf faskes melalui PC desktop maupun tablet perawat.',
        image: '/puskesmas wonokerto/Tangkapan Layar 2026-08-07 pukul 21.59.46.webp'
      }
    ]
  },
  {
    id: 'pos-wonopringgo',
    slug: 'pos-wonopringgo',
    projectType: 'system',
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
    caseStudyUrl: '/project/pos-wonopringgo',
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
    heroImage: '/toko konveksi wonopringgo/Tangkapan Layar 2026-08-09 pukul 00.24.23.webp',
    featured: true,
    challenges: [
      'Inventaris ribuan roll kain dengan konversi satuan rumit (roll, yard, meter, kodi) rawan selisih saat stok opname.',
      'Tiap pelanggan langganan memiliki kesepakatan harga grosir dan termin piutang yang berbeda-beda.',
      'Stok tersebar di 3 gudang tekstil berbeda tanpa sistem mutasi otomatis, memicu kesalahan konfirmasi pesanan pembeli.',
      'Pembuatan faktur dan surat jalan manual memperlambat pengiriman armada truk ekspedisi.'
    ],
    solutions: [
      'Aplikasi POS grosir dengan kalkulasi multi-satuan otomatis dan penyesuaian potongan roll presisi.',
      'Sistem penetapan harga dinamis bertingkat yang otomatis mendeteksi riwayat tier pelanggan.',
      'Pusat kontrol stok multi-gudang dengan otorisasi surat jalan dan verifikasi barcode mutasi fisik.',
      'Cetak surat jalan dan faktur penjualan format garmen hanya dalam 1.5 detik.'
    ],
    businessImpacts: [
      {
        metric: '< 0.1%',
        title: 'Presisi Inventaris',
        desc: 'Selisih antara stok fisik di gudang dengan catatan sistem terpangkas mendekati nol.'
      },
      {
        metric: '10.000+',
        title: 'Kapasitas SKU',
        desc: 'Sistem mampu menangani katalog varian motif, jenis kain, dan ukuran pakaian jadi tanpa kendala performa.'
      },
      {
        metric: '1.5 Detik',
        title: 'Cetak Faktur Grosir',
        desc: 'Armada pengiriman langsung berangkat tanpa antre panjang proses administrasi kasir.'
      }
    ],
    gallery: [
      {
        title: 'Kasir POS Penjualan Grosir',
        desc: 'Antarmuka kasir cepat dengan dukungan multi-satuan (roll, yard, meter) dan diskon kuantitas.',
        image: '/toko konveksi wonopringgo/Tangkapan Layar 2026-08-09 pukul 00.24.23.webp'
      },
      {
        title: 'Manajemen Stok & Kartu Kain',
        desc: 'Pencatatan rincian warna, gramasi, dan posisi rak penyimpanan kain di gudang.',
        image: '/toko konveksi wonopringgo/Tangkapan Layar 2026-08-09 pukul 00.24.39.webp'
      },
      {
        title: 'Transfer Barang Antar Gudang',
        desc: 'Alur mutasi stok terverifikasi dengan nomor surat jalan dan pengawasan stok opname.',
        image: '/toko konveksi wonopringgo/Tangkapan Layar 2026-08-09 pukul 00.24.56.webp'
      },
      {
        title: 'Monitoring Piutang & Keuangan',
        desc: 'Laporan piutang jatuh tempo pembeli grosir dan rekonsiliasi arus kas masuk harian.',
        image: '/toko konveksi wonopringgo/Tangkapan Layar 2026-08-09 pukul 00.25.16.webp'
      }
    ]
  },
  {
    id: 'pos-kopi-seruni',
    slug: 'kopi-seruni',
    projectType: 'system',
    title: 'POS Kasir Cafe, Kitchen Display & Pemotongan Resep HPP',
    client: 'Toko Kopi Seruni',
    category: 'fnb',
    categoryLabel: 'F&B & Kuliner',
    badge: 'Live Demo · Klien Aktif',
    tagline: 'Sistem kasir F&B modern dengan tiket dapur otomatis, split-bill, dan kartu stok bahan baku resep (HPP).',
    description: 'Aplikasi kasir cafe yang menghubungkan pemesanan meja langsung ke printer dapur dan bar. Stok bahan baku (biji kopi, susu, cup) otomatis berkurang berdasarkan resep menu yang terjual, menjaga margin keuntungan selalu terukur.',
    year: '2024',
    location: 'Pekalongan, Jawa Tengah',
    status: 'Live Demo',
    hasDemo: true,
    demoUrl: 'https://demo.svralabs.com/pos/pos-fb',
    iframeSource: 'https://kopi-seruni.vercel.app',
    hasCaseStudy: true,
    caseStudyUrl: '/project/kopi-seruni',
    metrics: [
      { label: 'Akurasi Perhitungan HPP', value: '100%' },
      { label: 'Waktu Transaksi Kasir', value: '15 Detik' },
      { label: 'Otomasi Tiket Dapur', value: 'Real-time' }
    ],
    features: [
      'Manajemen Meja & Status Pesanan (Dine-in / Take-away)',
      'Kustomisasi Minuman (Suhu Hot/Ice, Level Gula, Level Es)',
      'Pemisahan Tiket Bar Minuman & Dapur Makanan',
      'Fitur Split Bill & Gabung Tagihan Meja Cepat',
      'Kartu Stok Otomatis Berdasarkan Resep Bahan (HPP)',
      'Rekonsiliasi Shift Kasir & Laporan Omset Harian'
    ],
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Turso DB', 'Vercel'],
    image: '/projects/kopi-seruni/pos-screen.webp',
    heroImage: '/projects/kopi-seruni/pos-screen.webp',
    featured: true,
    challenges: [
      'Jam sibuk malam hari sering menimbulkan pesanan terselip atau pesanan meja tertukar antara kasir dan barista bar.',
      'Margin laba kotor tidak terkontrol karena pemakaian bahan baku (biji espresso, susu fresh milk, sirup) bocor tanpa kartu stok resep.',
      'Kasir kewalahan saat pelanggan minta bayar pisah (split bill) atau menggabungkan tagihan meja.',
      'Proses closing kasir shift 1 dan shift 2 memakan waktu lama dan sering selisih ratusan ribu rupiah.'
    ],
    solutions: [
      'Antarmuka kasir modern berbasis Next.js dengan alur pemesanan meja, pilihan kustomisasi (es/gula), dan split bill instan.',
      'Pemisahan tiket otomatis yang mengirim instruksi pesanan makanan ke dapur dan minuman ke stasiun barista.',
      'Pemotongan stok bahan baku otomatis berdasarkan gramatur resep (HPP) setiap kali menu terjual.',
      'Laporan rekonsiliasi shift harian terintegrasi dengan perhitungan kas masuk tunai, QRIS, dan EDC.'
    ],
    businessImpacts: [
      {
        metric: '100%',
        title: 'Akurasi Resep & HPP',
        desc: 'Setiap gram kopi dan mililiter susu tercatat presisi, menghilangkan kebocoran bahan baku yang menekan margin cafe.'
      },
      {
        metric: '15 Detik',
        title: 'Kecepatan Antrean Kasir',
        desc: 'Proses input menu hingga cetak nota pembayaran selesai dengan cepat tanpa membuat antrean pengunjung menumpuk.'
      },
      {
        metric: 'Zero Selisih',
        title: 'Closing Shift Akurat',
        desc: 'Uang fisik di laci kasir cocok dengan rekap digital sistem, memudahkan evaluasi omset harian owner.'
      }
    ],
    gallery: [
      {
        title: 'Antarmuka Kasir POS Utama',
        desc: 'Katalog menu cepat, pemilihan level gula & es, keranjang belanja aktif, serta opsi multi-pembayaran.',
        image: '/projects/kopi-seruni/pos-screen.webp'
      },
      {
        title: 'Katalog Menu & Manajemen Varian',
        desc: 'Pengaturan kategori, harga jual, foto produk, dan status ketersediaan menu per outlet.',
        image: '/projects/kopi-seruni/products-screen.webp'
      },
      {
        title: 'Stok Inventori & Resep Bahan Baku',
        desc: 'Pemantauan sisa bahan pokok (biji kopi, susu, sirup) dengan peringatan otomatis saat stok menipis.',
        image: '/projects/kopi-seruni/stock-screen.webp'
      }
    ]
  },
  {
    id: 'laundry-management',
    slug: 'laundry',
    projectType: 'system',
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
    hasCaseStudy: true,
    caseStudyUrl: '/project/laundry',
    metrics: [
      { label: 'Komplain Baju Tertukar', value: 'Turun 95%' },
      { label: 'Efisiensi Waktu Kasir', value: '60%' },
      { label: 'Notifikasi WhatsApp', value: 'Otomatis' }
    ],
    features: [
      'Input Kasir Cepat dengan Integrasi Timbangan Digital',
      'Tracking Status Cucian 4 Tahap (Cuci/Kering/Setrika/Siap)',
      'Manajemen Rak Penyimpanan dengan Nomor Barcode',
      'Cetak Struk Thermal Bluetooth 58mm & 80mm',
      'Kirim Notifikasi WhatsApp Saat Cucian Siap Diambil',
      'Laporan Laba Rugi & Rekapitulasi Kasir Harian'
    ],
    techStack: ['SvelteKit', 'TypeScript', 'Tailwind CSS', 'Google Apps Script', 'Vercel'],
    image: '/projects/laundry/dashboard-screen.webp',
    heroImage: '/projects/laundry/dashboard-screen.webp',
    featured: true,
    challenges: [
      'Komplain pelanggan akibat pakaian tertukar atau terselip karena hanya mengandalkan nota kertas robek bertuliskan tangan.',
      'Admin laundry kehabisan waktu berharga hanya untuk membalas puluhan chat WhatsApp menanyakan status cucian.',
      'Kerap terjadi kebocoran uang kasir dan tidak ada pencatatan operasional belanja harian (deterjen, pewangi, plastik).',
      'Staf produksi bingung mencari baju yang sudah selesai disetrika di tumpukan rak laundry.'
    ],
    solutions: [
      'Aplikasi kasir terintegrasi penimbangan kiloan otomatis dengan cetak nota berkode barcode unik.',
      'Papan tracking digital 4 tahap kerja (Cuci -> Kering -> Setrika -> Siap Ambil) dengan nomor rak terverifikasi.',
      'Layanan cek status mandiri bagi pelanggan lewat scan QR nota tanpa perlu menghubungi nomor admin.',
      'Integrasi Bot WhatsApp yang mengirim pesan otomatis ke nomor pelanggan begitu status berubah menjadi "Siap Diambil".'
    ],
    businessImpacts: [
      {
        metric: '95%',
        title: 'Penurunan Baju Tertukar',
        desc: 'Setiap bundel cucian dilabeli nomor barcode dan nomor rak spesifik, mengeliminasi risiko baju hilang atau tertukar.'
      },
      {
        metric: '60%',
        title: 'Efisiensi Kasir & Admin',
        desc: 'Kasir tidak lagi disibukkan menjawab chat manual status cucian dan nota tercatat otomatis di sistem.'
      },
      {
        metric: 'Instant',
        title: 'Notifikasi Selesai',
        desc: 'Pelanggan langsung menerima pesan WhatsApp otomatis segera setelah cucian masuk rak penyimpanan.'
      }
    ],
    gallery: [
      {
        title: 'Dashboard Operasional Laundry',
        desc: 'Ringkasan performa omset harian, total berat kiloan cucian masuk, dan transaksi terbaru.',
        image: '/projects/laundry/dashboard-screen.webp'
      },
      {
        title: 'Formulir Kasir & Input Cucian Baru',
        desc: 'Pendaftaran pelanggan cepat, pemilihan jenis paket cuci, dan kalkulasi tagihan otomatis.',
        image: '/projects/laundry/input-screen.webp'
      },
      {
        title: 'Papan Status Tracking Pengerjaan',
        desc: 'Monitoring visual alur kerja mesin cuci, pengering, setrika uap, dan nomor rak pengambilan.',
        image: '/projects/laundry/status-screen.webp'
      }
    ]
  },
  {
    id: 'purchasing-garwo',
    slug: 'purchasing-garwo',
    projectType: 'system',
    title: 'Purchasing & Scan OCR Nota Pasar AI Vision (Warmindo Garwo)',
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
    hasCaseStudy: true,
    caseStudyUrl: '/project/purchasing-garwo',
    metrics: [
      { label: 'Waktu Rekap Nota', value: '45m → 2m' },
      { label: 'Deteksi Kenaikan Harga', value: 'Real-time' },
      { label: 'Akurasi Ekstraksi OCR', value: '98%' }
    ],
    features: [
      'Scan Foto Nota Fisik dengan AI OCR Vision',
      'Normalisasi Nama Bahan Belanjaan Pasar Tradisional',
      'Pelacakan Tren Kenaikan Harga Bahan Pokok Harian',
      'Sinkronisasi Otomatis ke Pembukuan Google Sheets',
      'Arsip Bukti Foto Nota Terverifikasi & Anti-Manipulasi',
      'Rekapitulasi Anggaran Belanja Bahan Baku vs Operasional'
    ],
    techStack: ['Next.js', 'TypeScript', 'AI Vision OCR', 'Tailwind CSS', 'Google Cloud', 'Vercel'],
    image: '/projects/purchasing-garwo/dashboard-screen.webp',
    heroImage: '/projects/purchasing-garwo/dashboard-screen.webp',
    featured: true,
    challenges: [
      'Staf belanja pasar membawa puluhan lembar nota kertas lusuh dan tulisan tangan pedagang yang harus direkap manual setiap siang.',
      'Proses input manual memakan waktu hingga 45 menit per hari dan rawan salah ketik angka nol atau nominal pengeluaran.',
      'Owner tidak memiliki visibilitas langsung saat terjadi lonjakan harga bahan pokok penting (cabai, telur, minyak goreng).',
      'Bukti struk fisik rawan hilang atau basah di dapur, menyulitkan proses audit pembukuan akhir bulan.'
    ],
    solutions: [
      'Fitur foto nota belanja dari kamera HP yang langsung dibaca oleh model AI Vision & OCR otomatis.',
      'Algoritma normalisasi nama barang pasar (misalnya "tlor 1kg" otomatis dinormalisasi menjadi "Telur Ayam").',
      'Sinkronisasi real-time ke spreadsheet pembukuan Google Sheets tanpa perlu mengetik ulang satu per satu.',
      'Dashboard grafik fluktuasi harga yang memberi peringatan dini saat harga vendor naik di atas batas wajar.'
    ],
    businessImpacts: [
      {
        metric: '2 Menit',
        title: 'Pemangkasan Waktu Rekap',
        desc: 'Waktu administrasi belanja dipangkas dari 45 menit menjadi kurang dari 2 menit per nota.'
      },
      {
        metric: 'Real-time',
        title: 'Deteksi Fluktuasi Harga',
        desc: 'Owner dapat langsung memantau kenaikan harga telur dan bumbu untuk menyesuaikan porsi resep.'
      },
      {
        metric: '100% Valid',
        title: 'Arsip Nota Digital',
        desc: 'Setiap baris pengeluaran terhubung langsung dengan foto nota fisik aslinya, bebas risiko manipulasi kasbon.'
      }
    ],
    gallery: [
      {
        title: 'Dashboard Keuangan & Purchasing',
        desc: 'Grafik pengeluaran harian, perbandingan pos bahan baku vs operasional, dan vendor langganan.',
        image: '/projects/purchasing-garwo/dashboard-screen.webp'
      },
      {
        title: 'Riwayat Transaksi & Bukti Nota',
        desc: 'Daftar seluruh transaksi belanja lengkap dengan status sinkronisasi spreadsheet dan arsip foto.',
        image: '/projects/purchasing-garwo/transactions-screen.webp'
      },
      {
        title: 'Arsitektur Sistem & Verifikasi AI',
        desc: 'Alur kerja otomasi dari jepret foto nota di pasar hingga tercatat rapi di sistem analitik.',
        image: '/projects/purchasing-garwo/about-screen.webp'
      }
    ]
  },
  {
    id: 'vortex-padel',
    slug: 'vortex-padel',
    projectType: 'landing-page',
    title: 'Vortex Padel Club — Arena & Social Sanctuary',
    client: 'Vortex Padel Club',
    category: 'sports-lifestyle',
    categoryLabel: 'Sports & Lifestyle',
    badge: 'Website & Booking Interaktif',
    tagline: 'Website klub olahraga modern dengan fitur pilih jadwal lapangan, hitung sewa raket otomatis, dan pemesanan langsung ke WhatsApp.',
    description: 'Website profil sekaligus gerbang reservasi untuk klub padel modern. Dirancang agar calon member mudah melihat fasilitas arena, menghitung total biaya sewa lapangan beserta perlengkapan, lalu langsung melakukan pemesanan.',
    year: '2026',
    location: 'Jakarta Selatan',
    status: 'Live Website',
    hasDemo: true,
    demoUrl: 'https://demo.svralabs.com/landing/vortex-padel',
    iframeSource: 'https://svralabs-vortex-padel-club.vercel.app',
    hasCaseStudy: true,
    caseStudyUrl: '/project/vortex-padel',
    metrics: [
      { label: 'Gaya Tampilan', value: 'Sport Modern' },
      { label: 'Pemesanan', value: 'Hitung Otomatis' },
      { label: 'Checkout', value: 'Langsung ke WA' }
    ],
    features: [
      'Pilih tipe lapangan & hitung estimasi harga otomatis',
      'Tambahan sewa raket, bola, dan pelatih sekali klik',
      'Katalog fasilitas klub & ulasan member interaktif'
    ],
    techStack: ['Astro', 'TypeScript', 'CSS Modern', 'GSAP'],
    image: '/projects/vortex-padel/hero-screen.webp',
    heroImage: '/projects/vortex-padel/hero-screen.webp',
    featured: true,
    challenges: [
      'Website klub olahraga konvensional sering kali tampil kaku seperti brosur biasa sehingga kurang menarik minat komunitas baru.',
      'Calon pemain kesulitan memperkirakan total biaya sewa lapangan beserta tambahan raket dan pelatih sebelum menghubungi admin.',
      'Pengunjung yang masuk lewat iklan media sosial membutuhkan halaman yang ringan dan cepat dibuka dari HP.'
    ],
    solutions: [
      'Merancang tata letak modern bernuansa biru dan neon khas arena padel kelas atas yang langsung membangun kepercayaan.',
      'Menyediakan formulir pemesanan interaktif yang menghitung tarif durasi, jenis lapangan, dan perlengkapan secara otomatis lalu mengirim rincian rapi ke WhatsApp admin.',
      'Mengoptimalkan struktur halaman dan gambar agar tetap mulus dan nyaman diakses dari berbagai ukuran layar HP.'
    ],
    businessImpacts: [
      {
        metric: 'Otomatis',
        title: 'Rincian Biaya Sebelum Chat',
        desc: 'Pengunjung sudah tahu estimasi biaya sebelum menghubungi admin, sehingga proses deal reservasi lebih cepat.'
      },
      {
        metric: 'Anti Lemot',
        title: 'Ringan Dibuka dari Iklan HP',
        desc: 'Halaman terbuka dengan cepat saat diklik dari iklan Instagram atau TikTok sehingga calon pemain tidak keburu pergi.'
      },
      {
        metric: 'Siap Pakai',
        title: 'Rapi di Semua Ukuran Layar',
        desc: 'Tampilan menyesuaikan otomatis di layar smartphone maupun laptop tanpa perlu geser kanan-kiri.'
      }
    ],
    gallery: [
      {
        title: 'Halaman Pembuka & Identitas Klub',
        desc: 'Tampilan pembuka dengan ringkasan fasilitas unggulan dan tombol pemesanan lapangan yang langsung terlihat.',
        image: '/projects/vortex-padel/hero-screen.webp'
      },
      {
        title: 'Formulir Booking & Hitung Biaya',
        desc: 'Pilihan jenis lapangan, tanggal, durasi jam, serta tambahan sewa raket lengkap dengan kalkulasi harga otomatis.',
        image: '/projects/vortex-padel/booking-screen.webp'
      },
      {
        title: 'Galeri Lapangan & Pengalaman Bermain',
        desc: 'Bagian khusus yang menampilkan kualitas pencahayaan arena, perlengkapan pro, dan layanan pelatih.',
        image: '/projects/vortex-padel/experience-screen.webp'
      },
      {
        title: 'Daftar Fasilitas Lengkap Klub',
        desc: 'Menampilkan pilihan area mulai dari lapangan kaca panoramik hingga ruang santai kafe dan gym.',
        image: '/projects/vortex-padel/facilities-screen.webp'
      }
    ]
  },
  {
    id: 'tennis-plaza',
    slug: 'tennis-plaza',
    projectType: 'landing-page',
    title: 'Tennis Plaza — Club & Academy Landing Page',
    client: 'Tennis Plaza',
    category: 'sports-lifestyle',
    categoryLabel: 'Sports & Lifestyle',
    badge: 'Website & Desain Brand',
    tagline: 'Website klub dan akademi tenis bergaya profesional dengan tampilan tegas, navigasi simpel, dan alur daftar sesi latihan yang praktis.',
    description: 'Website profil dan pendaftaran untuk akademi serta klub tenis modern. Menggabungkan warna khas lapangan tenis dengan penulisan tegas yang mudah dibaca, galeri program latihan, hingga formulir daftar sesi.',
    year: '2026',
    location: 'Jakarta Pusat',
    status: 'Live Website',
    hasDemo: true,
    demoUrl: 'https://demo.svralabs.com/landing/tennis-plaza',
    iframeSource: 'https://svralabs-tennis-plaza.vercel.app',
    hasCaseStudy: true,
    caseStudyUrl: '/project/tennis-plaza',
    metrics: [
      { label: 'Gaya Desain', value: 'Atletik Tegas' },
      { label: 'Tampilan', value: 'Rapi di HP & PC' },
      { label: 'Akses Web', value: 'Super Ringan' }
    ],
    features: [
      'Penulisan judul tebal & tegas yang memikat perhatian',
      'Penjelasan program latihan, lapangan, dan pro shop',
      'Tombol daftar sesi & booking lapangan yang mudah diakses'
    ],
    techStack: ['HTML5', 'Tailwind CSS', 'Alpine.js', 'GSAP'],
    image: '/projects/tennis-plaza/hero-screen.webp',
    heroImage: '/projects/tennis-plaza/hero-screen.webp',
    featured: true,
    challenges: [
      'Menghadirkan website klub tenis dengan tampilan premium setara brand olahraga besar tanpa membuat halaman terasa berat saat dibuka.',
      'Menyusun informasi program latihan, kualitas lapangan standar turnamen, dan katalog perlengkapan agar tidak membingungkan pengunjung.',
      'Memastikan calon anggota baru bisa langsung mendaftar sesi latihan hanya dengan beberapa klik.'
    ],
    solutions: [
      'Merancang identitas visual khas lapangan tenis (hijau tua, neon terang, dan aksen biru) yang langsung mencuri perhatian.',
      'Mengatur alur informasi secara bertahap mulai dari keunggulan klub, statistik komunitas aktif, hingga fasilitas lapangan.',
      'Menempatkan tombol pendaftaran dan formulir booking di posisi yang selalu mudah dijangkau saat pengunjung menjelajah halaman.'
    ],
    businessImpacts: [
      {
        metric: 'Super Ringan',
        title: 'Akses Cepat & Hemat Kuota',
        desc: 'Struktur halaman yang ringkas membuat website tetap lancar dibuka bahkan saat sinyal seluler kurang stabil.'
      },
      {
        metric: 'Berkarakter',
        title: 'Identitas Brand Lebih Kuat',
        desc: 'Desain khusus yang berbeda dari website template umum langsung mengangkat citra profesional akademi.'
      },
      {
        metric: 'Praktis',
        title: 'Alur Pendaftaran Lebih Singkat',
        desc: 'Tombol ajakan yang jelas di bagian atas dan isi halaman mempercepat calon anggota untuk langsung booking.'
      }
    ],
    gallery: [
      {
        title: 'Halaman Pembuka Berkarakter Atletik',
        desc: 'Bagian atas halaman dengan tipografi besar yang tegas, warna khas lapangan, dan tombol booking langsung.',
        image: '/projects/tennis-plaza/hero-screen.webp'
      },
      {
        title: 'Statistik Klub & Standar Lapangan',
        desc: 'Ringkasan pencapaian komunitas anggota aktif serta pilihan lapangan indoor maupun outdoor.',
        image: '/projects/tennis-plaza/courts-screen.webp'
      },
      {
        title: 'Bagian Penutup & Informasi Kontak',
        desc: 'Penutup halaman yang bersih berisi alamat lokasi klub, kontak WhatsApp, dan kolom berlangganan info.',
        image: '/projects/tennis-plaza/footer-screen.webp'
      }
    ]
  },
  {
    id: 'arunika-nusantara',
    slug: 'arunika-nusantara',
    projectType: 'landing-page',
    title: 'Arunika Nusantara — Kurasi Ekspedisi Alam & Wisata Indonesia',
    client: 'Arunika Nusantara Expedition',
    category: 'travel-tourism',
    categoryLabel: 'Travel & Pariwisata',
    badge: 'Website & Simulasi Booking',
    tagline: 'Website ekspedisi wisata Nusantara dengan pilihan destinasi interaktif, galeri momen perjalanan, dan simulasi kalkulator tur.',
    description: 'Website profil dan kurasi perjalanan alam lintas kepulauan Indonesia — mencakup Gunung Bromo, Pulau Padar Labuan Bajo, Nusa Penida Bali, hingga Dataran Tinggi Dieng. Dilengkapi fitur ganti destinasi langsung di beranda, filter jenis perjalanan, galeri foto momen, dan jendela simulasi hitung biaya tur.',
    year: '2026',
    location: 'Jawa Timur, Bali & NTT',
    status: 'Live Website',
    hasDemo: true,
    demoUrl: 'https://demo.svralabs.com/landing/arunika-nusantara',
    iframeSource: 'https://svralabs-arunika-nusantara.vercel.app',
    hasCaseStudy: true,
    caseStudyUrl: '/project/arunika-nusantara',
    metrics: [
      { label: 'Gaya Desain', value: 'Editorial Alam' },
      { label: 'Cakupan Wisata', value: '4 Destinasi' },
      { label: 'Rencana Tur', value: 'Simulasi Harga' }
    ],
    features: [
      'Ganti 4 destinasi utama langsung di bagian pembuka (Bromo, Padar, Nusa Penida, Dieng)',
      'Filter kategori aktivitas perjalanan & galeri dokumentasi momen',
      'Kalkulator simulasi biaya tur otomatis sesuai jumlah peserta & perlengkapan'
    ],
    techStack: ['Astro', 'TypeScript', 'CSS Modern', 'GSAP'],
    image: '/projects/arunika-nusantara/hero-screen.webp',
    heroImage: '/projects/arunika-nusantara/hero-screen.webp',
    featured: true,
    challenges: [
      'Menampilkan banyak destinasi wisata alam Indonesia dalam satu halaman depan tanpa membuat pengunjung bingung memilih rute.',
      'Membantu calon peserta tur menghitung gambaran biaya perjalanan beserta perlengkapan tambahan sebelum menghubungi tim admin.',
      'Menjaga foto pemandangan beresolusi tinggi dan animasi transisi halaman tetap ringan saat diakses lewat koneksi HP.'
    ],
    solutions: [
      'Merancang bagian pembuka layar lebar lengkap dengan pengalih 4 destinasi utama (Bromo, Padar, Nusa Penida, Dieng) yang bisa diklik langsung.',
      'Menghadirkan filter kategori tur interaktif dan galeri foto perjalanan dengan animasi halus agar halaman terasa hidup.',
      'Memasang jendela simulasi rencana tur yang otomatis menghitung estimasi total biaya berdasarkan paket pilihan dan jumlah peserta.'
    ],
    businessImpacts: [
      {
        metric: 'Interaktif',
        title: 'Banyak Destinasi Tetap Ringkas',
        desc: 'Pengunjung cukup klik pilihan destinasi di bagian atas untuk melihat detail wilayah dan jadwal keberangkatan tanpa perlu pindah halaman.'
      },
      {
        metric: 'Terstruktur',
        title: 'Gambaran Biaya Jelas di Awal',
        desc: 'Calon peserta bisa menimbang paket perjalanan beserta perlengkapan sebelum chat admin, membuat konsultasi lebih cepat deal.'
      },
      {
        metric: 'Tampil Elegan',
        title: 'Citra Layanan Lebih Tepercaya',
        desc: 'Paduan tipografi editorial dan foto alam berbingkai lebar langsung menampilkan kesan agen ekspedisi yang terkurasi rapi.'
      }
    ],
    gallery: [
      {
        title: 'Halaman Pembuka & Pengalih 4 Destinasi',
        desc: 'Kanvas lebar pembuka dengan pemilih wilayah Fajar Bromo, Pulau Padar, Nusa Penida, hingga Dataran Tinggi Dieng.',
        image: '/projects/arunika-nusantara/hero-screen.webp'
      },
      {
        title: 'Kurasi Aktivitas Tur & Filter Medan',
        desc: 'Daftar aktivitas ekspedisi lengkap dengan filter Jip Vulkanik, Kepulauan & Laut, Pendakian Sabana, dan Dataran Tinggi.',
        image: '/projects/arunika-nusantara/destinations-screen.webp'
      },
      {
        title: 'Dokumentasi Momen & Kisah Peserta',
        desc: 'Bagian cerita peserta dipadukan slider foto momen lapangan dari jalur sabana, air terjun, hingga pantai.',
        image: '/projects/arunika-nusantara/moments-screen.webp'
      },
      {
        title: 'Pilihan Paket Tur Nusantara',
        desc: 'Susunan paket ekspedisi harian hingga lintas pulau dengan rincian harga per orang dan tombol simulasi pesan.',
        image: '/projects/arunika-nusantara/packages-screen.webp'
      }
    ]
  }
];
