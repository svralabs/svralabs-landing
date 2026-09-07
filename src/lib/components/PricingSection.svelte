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
          start: 'top 52%',
          toggleActions: 'play none none reverse',
        },
        defaults: { ease: 'power3.out' },
      });

      // 1. Kicker Badge: 3D Spring Drop with optical blur clear
      entranceTl.fromTo(
        '.pricing-kicker',
        { opacity: 0, y: -24, scale: 0.88, filter: 'blur(6px)' },
        { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', duration: 0.75, ease: 'back.out(1.6)' },
        0.05
      );

      // 2. Icon Pop & Spin
      entranceTl.fromTo(
        '.pricing-kicker-icon',
        { scale: 0, rotate: -60 },
        { scale: 1, rotate: 0, duration: 0.55, ease: 'back.out(2.2)' },
        0.15
      );

      // 3. Headline Masked Kinetic Words
      const words = headlineEl ? headlineEl.querySelectorAll('.pricing-word') : [];
      if (words.length > 0) {
        entranceTl.fromTo(
          words,
          { opacity: 0, y: '115%', filter: 'blur(8px)' },
          { opacity: 1, y: '0%', filter: 'blur(0px)', duration: 0.85, stagger: 0.035, ease: 'power3.out' },
          0.18
        );
      }

      // 4. Accent Text Soft Emerald Bloom Pulse
      entranceTl.fromTo(
        '.pricing-accent-text',
        { filter: 'drop-shadow(0 0 0px rgba(0,105,72,0))' },
        {
          filter: 'drop-shadow(0 0 18px rgba(0,105,72,0.45))',
          duration: 0.75,
          ease: 'power2.out',
          yoyo: true,
          repeat: 1,
          repeatDelay: 0.12,
        },
        0.65
      );

      // 5. Description Paragraph
      entranceTl.fromTo(
        '.pricing-desc',
        { opacity: 0, y: 22, filter: 'blur(6px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.7, ease: 'power2.out' },
        0.45
      );

      // 6. 3 Pricing Cards: 3D Perspective Spring Rise
      entranceTl.fromTo(
        '.pricing-card',
        { opacity: 0, y: 70, scale: 0.90, rotateX: 10, filter: 'blur(8px)' },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          filter: 'blur(0px)',
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
      <div class="pricing-kicker inline-flex items-center space-x-2 bg-white/95 backdrop-blur-md px-4 py-1.5 rounded-full mb-6 border border-slate-200 shadow-[0_4px_14px_-2px_rgba(0,0,0,0.06)] select-none">
        <span class="pricing-kicker-icon material-symbols-outlined text-primary text-sm" style="font-variation-settings: 'FILL' 1;">payments</span>
        <span class="font-label-sm text-label-sm uppercase tracking-widest text-primary font-label-bold">HARGA &amp; PAKET</span>
      </div>

      <!-- Masked Kinetic Word Reveal Headline -->
      <h2
        bind:this={headlineEl}
        class="pricing-headline font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg mb-4 tracking-tight text-on-surface"
      >
        <span class="inline-block overflow-hidden align-top"><span class="pricing-word inline-block">Mulai</span></span>
        <span class="inline-block overflow-hidden align-top"><span class="pricing-word inline-block">dari</span></span>
        <span class="inline-block overflow-hidden align-top"><span class="pricing-word inline-block font-semibold">Rp 499.000/bulan</span></span>
        <span class="inline-block overflow-hidden align-top"><span class="pricing-word inline-block">—</span></span>
        <br class="hidden md:block" />
        <span class="inline-block overflow-hidden align-top"><span class="pricing-word inline-block italic text-primary font-light pricing-accent-text">tidak</span></span>
        <span class="inline-block overflow-hidden align-top"><span class="pricing-word inline-block italic text-primary font-light pricing-accent-text">ada</span></span>
        <span class="inline-block overflow-hidden align-top"><span class="pricing-word inline-block italic text-primary font-light pricing-accent-text">biaya</span></span>
        <span class="inline-block overflow-hidden align-top"><span class="pricing-word inline-block italic text-primary font-light pricing-accent-text">kejutan.</span></span>
      </h2>
      <p class="pricing-desc font-body-lg text-body-lg text-text-muted max-w-2xl mx-auto leading-relaxed">
        Produk siap pakai bisa langsung dipakai hari ini. Sistem custom? Konsultasi dulu, bayar kalau cocok.
      </p>
    </div>

    <!-- 3 Pricing Cards Grid (data-depth="foreground") -->
    <div data-depth="foreground" class="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto perspective-grid">
      
      <!-- Card 1: Starter / POS Ritel -->
      <div
        use:tilt3D={{ maxTilt: 6, perspective: 1000, scale: 1.015, glare: true }}
        class="pricing-card bg-white rounded-[28px] p-8 flex flex-col justify-between shadow-[0_10px_35px_rgba(0,0,0,0.04)] border border-border-hairline preserve-3d will-change-transform"
      >
        <div>
          <div class="mb-8">
            <div class="flex items-center gap-3 mb-4">
              <span class="material-symbols-outlined text-primary bg-primary-fixed p-2 rounded-xl">storefront</span>
              <h3 class="font-label-bold text-label-bold text-on-surface text-lg">Paket POS Ritel</h3>
            </div>
            <div class="flex items-baseline mb-2">
              <span class="font-headline-md text-headline-md text-on-surface tabular-nums">Rp 499.000</span>
              <span class="font-body-md text-body-md text-text-muted ml-2">/bulan</span>
            </div>
            <p class="font-body-md text-body-md text-text-muted text-sm leading-relaxed">Ideal untuk usaha kecil yang baru memulai digitalisasi kasir.</p>
          </div>

          <ul class="flex flex-col gap-3.5 mb-8 font-body-md text-sm text-on-surface-variant">
            <li class="flex items-start gap-3">
              <span class="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">check_circle</span>
              <span>1 Cabang Toko</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">check_circle</span>
              <span>Kasir POS Cloud</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">check_circle</span>
              <span>Laporan Harian Otomatis</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">check_circle</span>
              <span>Dukungan WhatsApp</span>
            </li>
          </ul>
        </div>

        <a
          use:magneticButton={{ strength: 10 }}
          class="w-full inline-flex justify-center items-center h-12 rounded-full bg-on-surface text-surface hover:bg-primary transition-colors duration-300 font-label-bold text-sm shadow-md cursor-pointer"
          href="#kontak"
        >
          Pilih Starter
        </a>
      </div>

      <!-- Card 2: Growth / RECOMMENDED (Elevated + Glow) -->
      <div class="pricing-card recommended-pricing-card relative z-10 flex flex-col will-change-transform">
        <!-- Floating RECOMMENDED Badge -->
        <div class="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20 pointer-events-none whitespace-nowrap">
          <span class="recommended-badge bg-primary text-on-primary font-label-sm text-[11px] uppercase tracking-wider py-1.5 px-4 rounded-full shadow-lg flex items-center gap-1.5 border border-white/30">
            <span class="material-symbols-outlined text-[14px]" style="font-variation-settings: 'FILL' 1;">star</span>
            RECOMMENDED
          </span>
        </div>

        <div
          use:tilt3D={{ maxTilt: 7, perspective: 1000, scale: 1.02, glare: true }}
          class="bg-white rounded-[28px] p-8 flex flex-col justify-between h-full shadow-[0_25px_60px_rgba(0,105,72,0.18)] border-2 border-primary preserve-3d"
        >
          <div>
            <div class="mb-8 mt-2">
              <div class="flex items-center gap-3 mb-4">
                <span class="material-symbols-outlined text-primary bg-primary-fixed p-2 rounded-xl">account_tree</span>
                <h3 class="font-label-bold text-label-bold text-on-surface text-lg">Paket Multi-Cabang &amp; Stok</h3>
              </div>
              <div class="flex items-baseline mb-2">
                <span class="font-headline-md text-headline-md text-on-surface tabular-nums">Rp 1.299.000</span>
                <span class="font-body-md text-body-md text-text-muted ml-2">/bulan</span>
              </div>
              <p class="font-body-md text-body-md text-text-muted text-sm leading-relaxed">Sempurna untuk bisnis berkembang dengan banyak lokasi.</p>
            </div>

            <ul class="flex flex-col gap-3.5 mb-8 font-body-md text-sm text-on-surface-variant">
              <li class="flex items-start gap-3">
                <span class="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5" style="font-variation-settings: 'FILL' 1;">check_circle</span>
                <span class="font-semibold text-on-surface">Hingga 5 Cabang</span>
              </li>
              <li class="flex items-start gap-3">
                <span class="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5" style="font-variation-settings: 'FILL' 1;">check_circle</span>
                <span class="font-semibold text-on-surface">Manajemen Stok &amp; Gudang</span>
              </li>
              <li class="flex items-start gap-3">
                <span class="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5" style="font-variation-settings: 'FILL' 1;">check_circle</span>
                <span>Analitik Produk Terlaris</span>
              </li>
              <li class="flex items-start gap-3">
                <span class="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5" style="font-variation-settings: 'FILL' 1;">check_circle</span>
                <span>Ekspor Laporan Pajak</span>
              </li>
              <li class="flex items-start gap-3">
                <span class="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5" style="font-variation-settings: 'FILL' 1;">check_circle</span>
                <span>Prioritas Support 24/7</span>
              </li>
            </ul>
          </div>

          <a
            use:magneticButton={{ strength: 12 }}
            class="w-full inline-flex justify-center items-center h-12 rounded-full bg-primary text-on-primary hover:bg-on-surface transition-colors duration-300 font-label-bold text-sm shadow-lg shadow-primary/25 cursor-pointer"
            href="#kontak"
          >
            Pilih Growth
          </a>
        </div>
      </div>

      <!-- Card 3: Enterprise -->
      <div
        use:tilt3D={{ maxTilt: 6, perspective: 1000, scale: 1.015, glare: true }}
        class="pricing-card bg-white rounded-[28px] p-8 flex flex-col justify-between shadow-[0_10px_35px_rgba(0,0,0,0.04)] border border-border-hairline preserve-3d will-change-transform"
      >
        <div>
          <div class="mb-8">
            <div class="flex items-center gap-3 mb-4">
              <span class="material-symbols-outlined text-primary bg-primary-fixed p-2 rounded-xl">corporate_fare</span>
              <h3 class="font-label-bold text-label-bold text-on-surface text-lg">Paket Enterprise</h3>
            </div>
            <div class="flex items-baseline mb-2">
              <span class="font-headline-md text-headline-md text-on-surface">Custom</span>
            </div>
            <p class="font-body-md text-body-md text-text-muted text-sm leading-relaxed">Solusi khusus untuk jaringan bisnis besar, klinik, dan manufaktur.</p>
          </div>

          <ul class="flex flex-col gap-3.5 mb-8 font-body-md text-sm text-on-surface-variant">
            <li class="flex items-start gap-3">
              <span class="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">check_circle</span>
              <span>Cabang Tak Terbatas</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">check_circle</span>
              <span>Custom Feature Development</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">check_circle</span>
              <span>Integrasi API &amp; ERP Khusus</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">check_circle</span>
              <span>Dedicated Account Manager</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">check_circle</span>
              <span>Pelatihan Staf di Lokasi</span>
            </li>
          </ul>
        </div>

        <a
          use:magneticButton={{ strength: 10 }}
          class="w-full inline-flex justify-center items-center h-12 rounded-full bg-on-surface text-surface hover:bg-primary transition-colors duration-300 font-label-bold text-sm shadow-md cursor-pointer"
          href="#kontak"
        >
          Hubungi Tim Sales
        </a>
      </div>

    </div>
  </div>
</section>
