<script lang="ts">
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  import { tilt3D, magneticButton, sectionLayeredParallax, isReducedMotion } from '$lib/actions/gsapParallax';

  let pricingRoot: HTMLElement;
  let headlineEl: HTMLElement;

  onMount(() => {
    if (typeof window === 'undefined' || isReducedMotion()) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const entranceTl = gsap.timeline({
        scrollTrigger: {
          trigger: pricingRoot,
          start: 'top 80%',
          toggleActions: 'play none none none',
          once: true,
        },
        defaults: { ease: 'power2.out' },
      });

      // 1. Kicker Badge: Smooth Fade & Subtle Rise
      entranceTl.fromTo(
        '.pricing-kicker',
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out' },
        0.05
      );

      // 2. Icon Soft Fade
      entranceTl.fromTo(
        '.pricing-kicker-icon',
        { opacity: 0 },
        { opacity: 1, duration: 0.4, ease: 'power2.out' },
        0.12
      );

      // 3. Headline Masked Kinetic Words
      const words = headlineEl ? headlineEl.querySelectorAll('.pricing-word') : [];
      if (words.length > 0) {
        entranceTl.fromTo(
          words,
          { opacity: 0, y: '115%' },
          { opacity: 1, y: '0%', duration: 0.85, stagger: 0.035, ease: 'power3.out' },
          0.18
        );
      }

      // 4. Accent Text Crisp Scale Pulse
      entranceTl.fromTo(
        '.pricing-accent-text',
        { scale: 0.96 },
        { scale: 1, duration: 0.55, ease: 'back.out(1.5)' },
        0.48
      );

      // 5. Description Paragraph
      entranceTl.fromTo(
        '.pricing-desc',
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
        0.45
      );

      // 6. 3 Pricing Cards: 3D Perspective Spring Rise
      entranceTl.fromTo(
        '.pricing-card',
        { opacity: 0, y: 70, scale: 0.90, rotateX: 10 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          duration: 0.9,
          stagger: 0.15,
          ease: 'back.out(1.4)',
        },
        0.55
      );

      // 7. Recommended Badge Pop
      entranceTl.fromTo(
        '.recommended-badge',
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(2)' },
        0.95
      );
    }, pricingRoot);

    return () => ctx.revert();
  });
</script>

<section
  id="harga"
  bind:this={pricingRoot}
  use:sectionLayeredParallax={{ bgSpeed: 0.45, contentSpeed: 0.16, fgSpeed: -0.28 }}
  class="min-h-screen min-h-[100dvh] w-full relative flex flex-col justify-center items-center pt-28 pb-20 md:pt-36 md:pb-28 bg-surface overflow-hidden perspective-grid"
>
  <!-- Background Layer (data-depth="bg") -->
  <div data-depth="bg" class="absolute inset-0 z-0 pointer-events-none opacity-30">
    <div class="absolute top-1/4 right-1/4 w-80 h-80 glow-orb-primary rounded-full"></div>
    <div class="absolute bottom-16 left-1/4 w-80 h-80 glow-orb-primary-fixed rounded-full"></div>
  </div>

  <!-- Section Depth Stage: Scales and fades smoothly for 3D page transitions -->
  <div class="section-depth-stage w-full max-w-7xl mx-auto px-gutter flex flex-col justify-center relative z-10">
    
    <!-- Header (data-depth="content") -->
    <div data-depth="content" class="text-center max-w-4xl mx-auto mb-16 md:mb-20">
      <!-- Kicker Badge with Spring Drop -->
      <div class="pricing-kicker inline-flex items-center space-x-2 bg-white px-4 py-1.5 rounded-full mb-6 border border-slate-200 shadow-[0_4px_14px_-2px_rgba(0,0,0,0.06)] select-none">
        <span class="pricing-kicker-icon material-symbols-outlined text-primary text-sm" style="font-variation-settings: 'FILL' 1;">payments</span>
        <span class="font-label-sm text-label-sm uppercase tracking-widest text-primary font-label-bold">HARGA &amp; PAKET</span>
      </div>

      <!-- Masked Kinetic Word Reveal Headline -->
      <h2
        bind:this={headlineEl}
        class="pricing-headline font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg mb-4 tracking-tight text-on-surface"
      >
        <span class="inline-block overflow-hidden align-top"><span class="pricing-word inline-block">Sistem</span></span>
        <span class="inline-block overflow-hidden align-top"><span class="pricing-word inline-block">Siap</span></span>
        <span class="inline-block overflow-hidden align-top"><span class="pricing-word inline-block">Pakai</span></span>
        <span class="inline-block overflow-hidden align-top"><span class="pricing-word inline-block">atau</span></span>
        <br class="hidden md:block" />
        <span class="inline-block overflow-hidden align-top"><span class="pricing-word inline-block italic text-primary font-light pricing-accent-text">Custom</span></span>
        <span class="inline-block overflow-hidden align-top"><span class="pricing-word inline-block italic text-primary font-light pricing-accent-text">Software</span></span>
        <span class="inline-block overflow-hidden align-top"><span class="pricing-word inline-block italic text-primary font-light pricing-accent-text">Development.</span></span>
      </h2>
      <p class="pricing-desc font-body-lg text-body-lg text-text-muted max-w-2xl mx-auto leading-relaxed">
        Dari aplikasi kasir &amp; operasional siap jalan hari ini, hingga pembuatan sistem kustom dari nol dengan hak milik source code penuh tanpa biaya langganan wajib.
      </p>
    </div>

    <!-- 3 Pricing Cards Grid (data-depth="foreground") -->
    <div data-depth="foreground" class="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto perspective-grid">
      
      <!-- Card 1: Solusi Siap Pakai -->
      <div
        use:tilt3D={{ maxTilt: 6, perspective: 1000, scale: 1.015, glare: true }}
        class="pricing-card bg-white rounded-[28px] p-8 flex flex-col justify-between shadow-[0_10px_35px_rgba(0,0,0,0.04)] border border-border-hairline preserve-3d will-change-transform"
      >
        <div>
          <div class="mb-8">
            <div class="flex items-center gap-3 mb-4">
              <span class="material-symbols-outlined text-primary bg-primary-fixed p-2 rounded-xl">rocket_launch</span>
              <div>
                <h3 class="font-label-bold text-label-bold text-on-surface text-lg">Solusi Siap Pakai</h3>
                <span class="text-[11px] text-text-muted">POS, Laundry, &amp; Booking</span>
              </div>
            </div>
            <div class="flex items-baseline mb-2">
              <span class="font-headline-md text-headline-md text-on-surface tabular-nums">Rp 499.000</span>
              <span class="font-body-md text-body-md text-text-muted ml-2">/bulan</span>
            </div>
            <p class="font-body-md text-body-md text-text-muted text-sm leading-relaxed">Aplikasi matang siap pakai langsung hari ini di toko atau usahamu.</p>
          </div>

          <ul class="flex flex-col gap-3.5 mb-8 font-body-md text-sm text-on-surface-variant">
            <li class="flex items-start gap-3">
              <span class="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">check_circle</span>
              <span>Aplikasi Kasir POS / Laundry / Booking siap jalan</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">check_circle</span>
              <span>Cloud Server &amp; Database terkelola otomatis</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">check_circle</span>
              <span>Cetak struk kasir Bluetooth thermal &amp; QRIS</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">check_circle</span>
              <span>Laporan omzet harian &amp; bulanan otomatis</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">check_circle</span>
              <span>Gratis input data menu / produk awal</span>
            </li>
          </ul>
        </div>

        <a
          use:magneticButton={{ strength: 10 }}
          class="w-full inline-flex justify-center items-center h-12 rounded-full bg-on-surface text-surface hover:bg-primary transition-colors duration-300 font-label-bold text-sm shadow-md cursor-pointer"
          href="https://wa.me/6285158418944?text=Halo%20Svralabs,%20saya%20tertarik%20dengan%20Paket%20Solusi%20Siap%20Pakai"
          target="_blank"
          rel="noopener noreferrer"
        >
          Pilih Solusi Siap Pakai
        </a>
      </div>

      <!-- Card 2: Custom Development / RECOMMENDED (Elevated + Glow) -->
      <div class="pricing-card recommended-pricing-card relative z-10 flex flex-col will-change-transform">
        <!-- Floating RECOMMENDED Badge -->
        <div class="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20 pointer-events-none whitespace-nowrap">
          <span class="recommended-badge bg-primary text-on-primary font-label-sm text-[11px] uppercase tracking-wider py-1.5 px-4 rounded-full shadow-lg flex items-center gap-1.5 border border-white/30">
            <span class="material-symbols-outlined text-[14px]" style="font-variation-settings: 'FILL' 1;">star</span>
            PALING DIMINATI · SEKALI BAYAR
          </span>
        </div>

        <div
          use:tilt3D={{ maxTilt: 7, perspective: 1000, scale: 1.02, glare: true }}
          class="bg-white rounded-[28px] p-8 flex flex-col justify-between h-full shadow-[0_25px_60px_rgba(0,105,72,0.18)] border-2 border-primary preserve-3d"
        >
          <div>
            <div class="mb-8 mt-2">
              <div class="flex items-center gap-3 mb-4">
                <span class="material-symbols-outlined text-primary bg-primary-fixed p-2 rounded-xl">terminal</span>
                <div>
                  <h3 class="font-label-bold text-label-bold text-on-surface text-lg">Custom Development</h3>
                  <span class="text-[11px] text-text-muted">Web App, ERP, &amp; Sistem SOP Khusus</span>
                </div>
              </div>
              <div class="flex items-baseline mb-2">
                <span class="font-headline-md text-headline-md text-on-surface tabular-nums">Mulai Rp 3.5jt</span>
                <span class="font-body-md text-body-md text-text-muted ml-2">/proyek</span>
              </div>
              <p class="font-body-md text-body-md text-text-muted text-sm leading-relaxed">Sistem dibangun spesifik sesuai alur kerja usahamu — 100% hak milik kode.</p>
            </div>

            <ul class="flex flex-col gap-3.5 mb-8 font-body-md text-sm text-on-surface-variant">
              <li class="flex items-start gap-3">
                <span class="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5" style="font-variation-settings: 'FILL' 1;">check_circle</span>
                <span class="font-semibold text-on-surface">100% Hak Milik Source Code &amp; Database</span>
              </li>
              <li class="flex items-start gap-3">
                <span class="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5" style="font-variation-settings: 'FILL' 1;">check_circle</span>
                <span class="font-semibold text-on-surface">Tanpa Biaya Langganan Wajib (One-Time Fee)</span>
              </li>
              <li class="flex items-start gap-3">
                <span class="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5" style="font-variation-settings: 'FILL' 1;">check_circle</span>
                <span>Desain UI/UX &amp; Alur Fitur 100% Sesuai Kebutuhan</span>
              </li>
              <li class="flex items-start gap-3">
                <span class="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5" style="font-variation-settings: 'FILL' 1;">check_circle</span>
                <span>Multi-Gudang, Multi-Cabang, &amp; Role Akses Staf</span>
              </li>
              <li class="flex items-start gap-3">
                <span class="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5" style="font-variation-settings: 'FILL' 1;">check_circle</span>
                <span>Pelatihan Staf On-Site &amp; Garansi Bug 3 Bulan</span>
              </li>
            </ul>
          </div>

          <a
            use:magneticButton={{ strength: 12 }}
            class="w-full inline-flex justify-center items-center h-12 rounded-full bg-primary text-on-primary hover:bg-on-surface transition-colors duration-300 font-label-bold text-sm shadow-lg shadow-primary/25 cursor-pointer"
            href="https://wa.me/6285158418944?text=Halo%20Svralabs,%20saya%20mau%20konsultasi%20Custom%20Software%20Development%20untuk%20usaha%20saya"
            target="_blank"
            rel="noopener noreferrer"
          >
            Konsultasi Proyek Kustom
          </a>
        </div>
      </div>

      <!-- Card 3: Enterprise & AI Automation -->
      <div
        use:tilt3D={{ maxTilt: 6, perspective: 1000, scale: 1.015, glare: true }}
        class="pricing-card bg-white rounded-[28px] p-8 flex flex-col justify-between shadow-[0_10px_35px_rgba(0,0,0,0.04)] border border-border-hairline preserve-3d will-change-transform"
      >
        <div>
          <div class="mb-8">
            <div class="flex items-center gap-3 mb-4">
              <span class="material-symbols-outlined text-primary bg-primary-fixed p-2 rounded-xl">hub</span>
              <div>
                <h3 class="font-label-bold text-label-bold text-on-surface text-lg">Enterprise &amp; AI</h3>
                <span class="text-[11px] text-text-muted">Faskes EMR &amp; Otomasi OCR</span>
              </div>
            </div>
            <div class="flex items-baseline mb-2">
              <span class="font-headline-md text-headline-md text-on-surface">Sesuai Kebutuhan</span>
            </div>
            <p class="font-body-md text-body-md text-text-muted text-sm leading-relaxed">Solusi skala besar untuk faskes, instansi publik, dan integrasi API rumit.</p>
          </div>

          <ul class="flex flex-col gap-3.5 mb-8 font-body-md text-sm text-on-surface-variant">
            <li class="flex items-start gap-3">
              <span class="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">check_circle</span>
              <span>Bridging SATUSEHAT Kemenkes &amp; BPJS Kesehatan</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">check_circle</span>
              <span>Otomasi AI Vision OCR Scanner Nota Pembelian</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">check_circle</span>
              <span>Opsi On-Premise Server Lokal / Private Cloud Dedicated</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">check_circle</span>
              <span>Dedicated Software Engineer &amp; SLA Respon Cepat</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">check_circle</span>
              <span>Audit Keamanan Data, Enkripsi, &amp; Backup Redundan</span>
            </li>
          </ul>
        </div>

        <a
          use:magneticButton={{ strength: 10 }}
          class="w-full inline-flex justify-center items-center h-12 rounded-full bg-on-surface text-surface hover:bg-primary transition-colors duration-300 font-label-bold text-sm shadow-md cursor-pointer"
          href="https://wa.me/6285158418944?text=Halo%20Svralabs,%20saya%20butuh%20solusi%20Enterprise%20dan%20Integrasi%20Sistem%20Khusus"
          target="_blank"
          rel="noopener noreferrer"
        >
          Diskusikan Kebutuhan Enterprise
        </a>
      </div>

    </div>
  </div>
</section>
