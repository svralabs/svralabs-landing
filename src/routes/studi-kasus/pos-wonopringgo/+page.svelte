<script lang="ts">
  import { fadeUp, fadeIn, staggerFadeUp, glareCard, floatCard, tiltCard, magneticButton, shimmerButton } from '$lib/actions/motion';
</script>

<svelte:head>
  <title>Studi Kasus: POS Konveksi Wonopringgo | Svralabs</title>
  <meta name="description" content="Sistem POS grosir & manajemen inventaris kain/barang jadi Toko Konveksi Wonopringgo oleh Svralabs." />
</svelte:head>

<div class="bg-surface text-on-surface antialiased min-h-screen font-body-md selection:bg-primary-container selection:text-on-primary-container">
  
  <!-- Header / Navigation -->
  <header class="fixed left-1/2 -translate-x-1/2 w-[95%] max-w-7xl rounded-full border z-50 top-6 bg-white/80 border-white/40 shadow-[0px_20px_40px_rgba(17,24,39,0.08)] backdrop-blur-xl">
    <div class="flex justify-between items-center px-6 md:px-8 py-3.5">
      <div class="flex items-center gap-3">
        <a class="font-headline-md text-headline-md font-bold text-on-surface flex items-center gap-2.5" href="/">
          <img src="/logowotext.png" alt="Svralabs" class="h-8 w-auto object-contain" />
          Svralabs
        </a>
        <span class="text-text-muted/40 hidden sm:inline">/</span>
        <span class="font-label-sm text-text-muted hidden sm:inline">Studi Kasus</span>
        <span class="text-text-muted/40 hidden md:inline">/</span>
        <span class="font-label-sm text-on-surface font-semibold hidden md:inline">POS Konveksi Wonopringgo</span>
      </div>

      <div class="flex items-center gap-4">
        <a href="/" class="text-text-muted hover:text-on-surface text-sm font-label-bold transition-colors hidden sm:inline-flex items-center gap-1">
          <span class="material-symbols-outlined text-[18px]">arrow_back</span>
          Beranda
        </a>
        <a use:magneticButton href="/#kontak" class="bg-on-surface text-surface px-5 py-2 rounded-full font-label-bold text-sm hover:bg-primary transition-all duration-300 shadow-md">
          Konsultasi Gratis
        </a>
      </div>
    </div>
  </header>

  <main class="pt-32">
    <!-- Hero Section -->
    <section use:fadeIn={{ duration: 0.8 }} class="pt-12 pb-16 px-gutter max-w-7xl mx-auto">
      <div use:fadeUp={{ duration: 0.8 }} class="max-w-4xl mx-auto text-center mb-12">
        <div class="inline-flex items-center gap-2 bg-surface-container-highest/60 border border-border-hairline rounded-full px-4 py-1.5 mb-6 backdrop-blur-md">
          <span class="material-symbols-outlined text-primary text-sm" style="font-variation-settings: 'FILL' 1;">point_of_sale</span>
          <span class="font-label-sm text-label-sm uppercase tracking-widest text-on-surface">Ritel & Manufaktur Tekstil</span>
        </div>
        
        <h1 class="font-display-xl-mobile md:font-display-xl text-display-xl-mobile md:text-display-xl text-on-surface mb-6 leading-tight">
          POS & Inventaris <i class="text-text-muted font-light">Konveksi Wonopringgo</i>
        </h1>
        
        <p class="font-body-lg text-body-lg text-text-muted max-w-2xl mx-auto">
          Sistem kasir grosir terintegrasi manajemen bahan baku kain dan produk baju jadi anti-selisih.
        </p>
      </div>

      <!-- Hero Main Screenshot Frame -->
      <div use:fadeUp={{ delay: 0.2 }} class="max-w-5xl mx-auto">
        <div use:glareCard class="bg-surface-container-lowest rounded-[28px] p-3 md:p-4 border border-border-hairline shadow-[0_30px_70px_rgba(0,0,0,0.08)]">
          <div class="bg-surface-faint rounded-[20px] overflow-hidden border border-border-hairline aspect-[16/10] relative">
            <img 
              src="/toko konveksi wonopringgo/Tangkapan Layar 2026-08-09 pukul 00.24.23.png" 
              alt="Tampilan Antarmuka POS Kasir Konveksi Wonopringgo" 
              class="w-full h-full object-cover object-top"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- At-a-Glance Metrics Grid -->
    <section use:fadeIn class="py-12 bg-surface-container-lowest border-y border-border-hairline">
      <div use:staggerFadeUp class="max-w-7xl mx-auto px-gutter grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        <div use:tiltCard class="bg-[#F3F4F6] p-6 rounded-2xl border border-transparent">
          <p class="font-label-sm text-text-muted uppercase tracking-wider mb-2">Klien</p>
          <p class="font-headline-md text-[20px] font-bold text-on-surface">Grosir Konveksi</p>
          <p class="font-body-sm text-xs text-text-muted mt-1">Wonopringgo, Pekalongan</p>
        </div>
        
        <div use:tiltCard class="bg-[#F3F4F6] p-6 rounded-2xl border border-transparent">
          <p class="font-label-sm text-text-muted uppercase tracking-wider mb-2">Industri</p>
          <p class="font-headline-md text-[20px] font-bold text-on-surface">Manufaktur Tekstil</p>
          <p class="font-body-sm text-xs text-text-muted mt-1">Grosir & Ritel Pakaian</p>
        </div>

        <div use:tiltCard class="bg-[#F3F4F6] p-6 rounded-2xl border border-transparent">
          <p class="font-label-sm text-text-muted uppercase tracking-wider mb-2">Modul Utama</p>
          <p class="font-headline-md text-[20px] font-bold text-on-surface">POS Multi-Stok</p>
          <p class="font-body-sm text-xs text-text-muted mt-1">Bahan Baku vs Barang Jadi</p>
        </div>

        <div use:tiltCard class="bg-[#F3F4F6] p-6 rounded-2xl border border-transparent">
          <p class="font-label-sm text-text-muted uppercase tracking-wider mb-2">Status Operasional</p>
          <p class="font-headline-md text-[20px] font-bold text-primary flex items-center gap-1.5">
            <span class="w-2.5 h-2.5 rounded-full bg-success inline-block"></span>
            Aktif Digunakan
          </p>
          <p class="font-body-sm text-xs text-text-muted mt-1">Sejak 2026</p>
        </div>
      </div>
    </section>

    <!-- Problem & Solution Story Section -->
    <section class="py-section-padding-mobile md:py-section-padding-desktop max-w-7xl mx-auto px-gutter">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        
        <!-- The Challenge -->
        <div use:fadeUp class="bg-surface-container-lowest p-8 md:p-10 rounded-[28px] border border-border-hairline shadow-sm">
          <div class="w-12 h-12 rounded-2xl bg-error-container/20 text-on-error-container flex items-center justify-center mb-6">
            <span class="material-symbols-outlined text-[24px]">report_problem</span>
          </div>
          <h2 class="font-headline-lg text-[28px] font-bold text-on-surface mb-4">Tantangan Lapangan</h2>
          <div class="space-y-4 font-body-md text-text-muted leading-relaxed">
            <p>
              Toko konveksi di Wonopringgo mengelola transaksi dalam jumlah roll kain serta baju pakaian jadi siap jual setiap hari.
            </p>
            <p>
              Pencatatan persediaan secara manual menyebabkan stok sering selisih antara di catatan toko dengan jumlah pisik barang di gudang.
            </p>
            <p>
              Tidak ada catatan terintegrasi mengenai riwayat diskon grosir per langganan, yang sering memicu kesalahpahaman saat penagihan.
            </p>
          </div>
        </div>

        <!-- The Solution -->
        <div use:fadeUp={{ delay: 0.15 }} class="bg-surface-container-lowest p-8 md:p-10 rounded-[28px] border border-primary/20 shadow-sm relative overflow-hidden">
          <div class="w-12 h-12 rounded-2xl bg-primary-container text-on-primary-container flex items-center justify-center mb-6">
            <span class="material-symbols-outlined text-[24px]">lightbulb</span>
          </div>
          <h2 class="font-headline-lg text-[28px] font-bold text-on-surface mb-4">Solusi Svralabs</h2>
          <div class="space-y-4 font-body-md text-text-muted leading-relaxed">
            <p>
              Svralabs mendevelop sistem POS Grosir khusus yang menjahit alur produksi hingga penjualan pakaian:
            </p>
            <ul class="space-y-3 pt-2">
              <li class="flex items-start gap-3 text-on-surface font-medium">
                <span class="material-symbols-outlined text-primary text-[20px] mt-0.5">check_circle</span>
                <span>Manajemen persediaan terpisah antara kain rol & baju pakaian jadi.</span>
              </li>
              <li class="flex items-start gap-3 text-on-surface font-medium">
                <span class="material-symbols-outlined text-primary text-[20px] mt-0.5">check_circle</span>
                <span>Harga berjenjang otomatis sesuai kuantitas pengambilan grosir.</span>
              </li>
              <li class="flex items-start gap-3 text-on-surface font-medium">
                <span class="material-symbols-outlined text-primary text-[20px] mt-0.5">check_circle</span>
                <span>Cetak nota & rekap laporan harian otomatis tanpa selisih kas.</span>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </section>

    <!-- Gallery / Interface Showcase -->
    <section class="py-section-padding-mobile md:py-section-padding-desktop bg-[#F8F9FA] border-y border-border-hairline">
      <div class="max-w-7xl mx-auto px-gutter">
        <div use:fadeUp class="text-center max-w-3xl mx-auto mb-16">
          <span class="inline-block bg-surface-variant text-on-surface-variant font-label-sm text-label-sm uppercase tracking-[0.1em] px-4 py-1 rounded-full mb-4">
            GALLERY SISTEM
          </span>
          <h2 class="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">
            Antarmuka Kasir <i class="text-text-muted font-light">Serba Cepat & Akurat</i>
          </h2>
        </div>

        <div use:staggerFadeUp class="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <!-- Screenshot 1 -->
          <div use:floatCard class="bg-white rounded-[24px] p-4 border border-border-hairline shadow-sm overflow-hidden flex flex-col">
            <div class="rounded-xl overflow-hidden border border-border-hairline aspect-video mb-4 bg-surface-faint">
              <img src="/toko konveksi wonopringgo/Tangkapan Layar 2026-08-09 pukul 00.24.23.png" alt="Kasir POS Konveksi" class="w-full h-full object-cover object-top" />
            </div>
            <h3 class="font-headline-md text-[18px] font-bold text-on-surface px-2">Layar Kasir & Pencarian Produk Cepat</h3>
            <p class="font-body-md text-sm text-text-muted px-2 mt-1">Staf toko dapat mencari varian ukuran & warna pakaian dengan cepat saat antrean transaksi grosir ramai.</p>
          </div>

          <!-- Screenshot 2 -->
          <div use:floatCard class="bg-white rounded-[24px] p-4 border border-border-hairline shadow-sm overflow-hidden flex flex-col">
            <div class="rounded-xl overflow-hidden border border-border-hairline aspect-video mb-4 bg-surface-faint">
              <img src="/toko konveksi wonopringgo/Tangkapan Layar 2026-08-09 pukul 00.24.39.png" alt="Manajemen Stok & Harga" class="w-full h-full object-cover object-top" />
            </div>
            <h3 class="font-headline-md text-[18px] font-bold text-on-surface px-2">Pengaturan Harga Grosir & Eceran</h3>
            <p class="font-body-md text-sm text-text-muted px-2 mt-1">Sistem otomatis menerapkan skema harga potongan khusus jika pelanggan membeli dalam jumlah kodi atau lusinan.</p>
          </div>

          <!-- Screenshot 3 -->
          <div use:floatCard class="bg-white rounded-[24px] p-4 border border-border-hairline shadow-sm overflow-hidden flex flex-col">
            <div class="rounded-xl overflow-hidden border border-border-hairline aspect-video mb-4 bg-surface-faint">
              <img src="/toko konveksi wonopringgo/Tangkapan Layar 2026-08-09 pukul 00.24.56.png" alt="Detail Stok Gudang" class="w-full h-full object-cover object-top" />
            </div>
            <h3 class="font-headline-md text-[18px] font-bold text-on-surface px-2">Monitoring Stok Real-Time</h3>
            <p class="font-body-md text-sm text-text-muted px-2 mt-1">Setiap barang teruji terpotong otomatis begitu nota dicetak, mencegah terjadinya barang hilang tak terdeteksi.</p>
          </div>

          <!-- Screenshot 4 -->
          <div use:floatCard class="bg-white rounded-[24px] p-4 border border-border-hairline shadow-sm overflow-hidden flex flex-col">
            <div class="rounded-xl overflow-hidden border border-border-hairline aspect-video mb-4 bg-surface-faint">
              <img src="/toko konveksi wonopringgo/Tangkapan Layar 2026-08-09 pukul 00.25.16.png" alt="Laporan Penjualan" class="w-full h-full object-cover object-top" />
            </div>
            <h3 class="font-headline-md text-[18px] font-bold text-on-surface px-2">Laporan Penjualan & Arus Kas</h3>
            <p class="font-body-md text-sm text-text-muted px-2 mt-1">Pemilik toko dapat memantau total omset, profit bersih, serta produk paling laku tanpa hitung kalkulator manual.</p>
          </div>

        </div>
      </div>
    </section>

    <!-- Outcome / Results Section -->
    <section class="py-section-padding-mobile md:py-section-padding-desktop max-w-7xl mx-auto px-gutter">
      <div use:fadeUp class="bg-on-background text-surface rounded-[32px] p-8 md:p-14 relative overflow-hidden shadow-2xl">
        <div class="max-w-3xl relative z-10">
          <span class="inline-block bg-primary text-on-primary font-label-sm text-label-sm uppercase tracking-wider px-4 py-1 rounded-full mb-6">
            HASIL & IMPACT
          </span>
          
          <h2 class="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-surface mb-8">
            Dampak Nyata bagi <i class="text-primary-fixed font-light">Operasional Toko</i>
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-white/10">
            <div>
              <p class="font-display-xl text-[36px] font-bold text-primary-fixed mb-1">01</p>
              <h4 class="font-label-bold text-surface text-base mb-2">Stok Presisi 100%</h4>
              <p class="font-body-md text-sm text-surface/70">Tidak ada lagi selisih antara fisik kain di gudang dengan data inventaris kasir.</p>
            </div>

            <div>
              <p class="font-display-xl text-[36px] font-bold text-primary-fixed mb-1">02</p>
              <h4 class="font-label-bold text-surface text-base mb-2">Laporan Instan</h4>
              <p class="font-body-md text-sm text-surface/70">Rekap omset harian beres otomatis setiap toko tutup tanpa perhitung manual.</p>
            </div>

            <div>
              <p class="font-display-xl text-[36px] font-bold text-primary-fixed mb-1">03</p>
              <h4 class="font-label-bold text-surface text-base mb-2">Transaksi Lebih Cepat</h4>
              <p class="font-body-md text-sm text-surface/70">Melayani pelanggan grosir jauh lebih cepat tanpa antrean panjang kasir.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Bottom CTA Section -->
    <section class="py-16 px-gutter max-w-7xl mx-auto text-center">
      <div use:fadeUp class="bg-surface-container-lowest rounded-[28px] p-10 md:p-16 border border-border-hairline shadow-sm">
        <h2 class="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-4">
          Punya bisnis konveksi atau toko grosir?
        </h2>
        <p class="font-body-lg text-body-lg text-text-muted max-w-2xl mx-auto mb-8">
          Bangun sistem POS & stok khusus yang sesuai persis dengan alur bisnismu bersama Svralabs.
        </p>
        <div class="flex flex-col sm:flex-row justify-center gap-4">
          <a use:magneticButton href="/#kontak" class="bg-on-surface text-surface px-8 py-4 rounded-full font-label-bold hover:bg-primary transition-colors shadow-lg">
            Konsultasi Gratis
          </a>
          <a use:shimmerButton href="/" class="bg-surface-container-lowest text-on-surface border border-border-hairline px-8 py-4 rounded-full hover:bg-surface-container transition-colors shadow-sm">
            Lihat Studi Kasus Lain
          </a>
        </div>
      </div>
    </section>
  </main>

  <!-- Footer -->
  <footer class="bg-surface-container-lowest border-t border-border-hairline py-8 text-center text-text-muted font-label-bold text-sm">
    <p>© 2026 Svralabs. Digitalisasi UMKM gak perlu mahal dan ribet.</p>
  </footer>
</div>
