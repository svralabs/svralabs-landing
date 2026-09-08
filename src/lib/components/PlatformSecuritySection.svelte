<script lang="ts">
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  import { tilt3D, sectionLayeredParallax, isReducedMotion } from '$lib/actions/gsapParallax';

  let securityRoot: HTMLElement;
  let headlineEl: HTMLElement;

  onMount(() => {
    if (typeof window === 'undefined' || isReducedMotion()) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const entranceTl = gsap.timeline({
        scrollTrigger: {
          trigger: securityRoot,
          start: 'top 65%',
          toggleActions: 'play none none none',
          once: true,
        },
        defaults: { ease: 'power2.out' },
      });

      // 1. Kicker Badge: Smooth Fade & Subtle Rise
      entranceTl.fromTo(
        '.security-kicker',
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out' },
        0.05
      );

      // 2. Shield Icon Fade & Settle
      entranceTl.fromTo(
        '.security-kicker-icon',
        { opacity: 0, scale: 0.85 },
        { opacity: 1, scale: 1, duration: 0.4, ease: 'power2.out' },
        0.12
      );

      // 3. Headline Masked Kinetic Words
      const words = headlineEl ? headlineEl.querySelectorAll('.security-word') : [];
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
        '.security-accent-text',
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
        '.security-desc',
        { opacity: 0, y: 22, filter: 'blur(6px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.7, ease: 'power2.out' },
        0.45
      );

      // 6. 2 Large Feature Cards: 3D Perspective Spring Rise
      entranceTl.fromTo(
        '.security-card',
        { opacity: 0, y: 60, scale: 0.90, rotateX: 10, filter: 'blur(8px)' },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          filter: 'blur(0px)',
          duration: 0.9,
          stagger: 0.16,
          ease: 'back.out(1.4)',
        },
        0.55
      );

      // 7. Role Access Items sequential slide in
      entranceTl.fromTo(
        '.role-access-item',
        { opacity: 0, x: -25, scale: 0.92 },
        { opacity: 1, x: 0, scale: 1, stagger: 0.12, duration: 0.65, ease: 'back.out(1.5)' },
        0.80
      );

      // 8. Draw-in animation for Revenue Product Bars
      entranceTl.fromTo(
        '.product-metric-bar',
        { scaleX: 0 },
        {
          scaleX: 1,
          transformOrigin: 'left center',
          stagger: 0.14,
          duration: 0.85,
          ease: 'power3.out',
        },
        0.90
      );
    }, securityRoot);

    return () => ctx.revert();
  });
</script>

<section
  id="platform-security"
  bind:this={securityRoot}
  class="min-h-screen min-h-[100dvh] w-full relative flex flex-col justify-center items-center pt-28 pb-20 md:pt-36 md:pb-28 bg-surface overflow-hidden perspective-grid"
>
  <!-- Background Glow Layer (data-depth="bg") -->
  <div data-depth="bg" class="absolute inset-0 z-0 pointer-events-none opacity-30">
    <div class="absolute top-1/4 left-1/3 w-80 h-80 glow-orb-primary rounded-full"></div>
    <div class="absolute bottom-16 right-1/4 w-80 h-80 glow-orb-primary-fixed rounded-full"></div>
  </div>

  <!-- Section Depth Stage: Scales and fades smoothly for 3D page transitions -->
  <div class="section-depth-stage w-full max-w-7xl mx-auto px-6 md:px-8 flex flex-col justify-center relative z-10">
    
    <!-- Section Title (data-depth="content") -->
    <div data-depth="content" class="flex flex-col items-center text-center mb-16 md:mb-20">
      <!-- Kicker Badge with Spring Drop -->
      <div class="security-kicker inline-flex items-center space-x-2 bg-white/95 backdrop-blur-md px-4 py-1.5 rounded-full mb-6 border border-slate-200 shadow-[0_4px_14px_-2px_rgba(0,0,0,0.06)] select-none">
        <span class="security-kicker-icon material-symbols-outlined text-primary text-sm" style="font-variation-settings: 'FILL' 1;">shield</span>
        <span class="font-label-sm text-label-sm uppercase tracking-widest text-primary font-label-bold">KEAMANAN &amp; ANALITIK</span>
      </div>

      <!-- Masked Kinetic Word Reveal Headline -->
      <h2
        bind:this={headlineEl}
        class="security-headline font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg max-w-3xl mb-4 tracking-tight text-on-surface"
      >
        <span class="inline-block overflow-hidden align-top"><span class="security-word inline-block">Kontrol</span></span>
        <span class="inline-block overflow-hidden align-top"><span class="security-word inline-block">penuh</span></span>
        <span class="inline-block overflow-hidden align-top"><span class="security-word inline-block">bisnis</span></span>
        <span class="inline-block overflow-hidden align-top"><span class="security-word inline-block">di</span></span>
        <span class="inline-block overflow-hidden align-top"><span class="security-word inline-block">tanganmu,</span></span>
        <br class="hidden md:block" />
        <span class="inline-block overflow-hidden align-top"><span class="security-word inline-block italic text-primary font-light security-accent-text">bukan</span></span>
        <span class="inline-block overflow-hidden align-top"><span class="security-word inline-block italic text-primary font-light security-accent-text">di</span></span>
        <span class="inline-block overflow-hidden align-top"><span class="security-word inline-block italic text-primary font-light security-accent-text">tangan</span></span>
        <span class="inline-block overflow-hidden align-top"><span class="security-word inline-block italic text-primary font-light security-accent-text">karyawan.</span></span>
      </h2>
      <p class="security-desc font-body-lg text-body-lg text-text-muted max-w-2xl mx-auto leading-relaxed">
        Keamanan data berlapis dengan analitik real-time yang akurat untuk setiap keputusan bisnismu.
      </p>
    </div>

    <!-- 2 Large Feature Cards (data-depth="foreground") -->
    <div data-depth="foreground" class="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 perspective-grid">
      
      <!-- Door 1 Wrapper for 3D Architectural Swing -->
      <div class="security-door-1 w-full h-full preserve-3d">
        <!-- Feature 1: Keamanan & Role Access -->
        <div
          use:tilt3D={{ maxTilt: 6, perspective: 1000, glare: true }}
          class="security-card bg-surface-faint rounded-[32px] p-8 md:p-10 border border-border-hairline hover:border-primary/30 transition-[box-shadow,border-color] duration-300 flex flex-col justify-between shadow-sm hover:shadow-[0_20px_50px_rgba(0,105,72,0.08)] preserve-3d will-change-transform h-full"
        >
          <div class="mb-8">
            <span class="inline-block px-3.5 py-1 bg-primary-fixed text-on-primary-fixed rounded-full font-label-sm text-label-sm uppercase tracking-wider mb-5">
              DATA SECURITY
            </span>
            <h3 class="font-headline-md text-headline-md mb-3 text-on-surface">
              Transaksi &amp; Akses Aman
            </h3>
            <p class="font-body-md text-body-md text-text-muted leading-relaxed">
              Hak akses kasir, manajer, dan owner terpisah dengan enkripsi data kelas enterprise, mencegah manipulasi data transaksi dan kebocoran kas.
            </p>
          </div>

          <!-- Sequential Role Access Visualization -->
          <div class="role-access-container relative rounded-2xl overflow-hidden bg-white border border-border-hairline shadow-sm p-6 flex justify-center items-center min-h-[240px]">
            <div class="w-full max-w-[320px] space-y-3">
              
              <!-- Role 1: Owner -->
              <div class="role-access-item bg-primary/10 rounded-xl p-4 border border-primary/25 flex items-center justify-between shadow-sm">
                <div class="flex items-center space-x-3">
                  <div class="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">
                    <span class="material-symbols-outlined text-[18px]">verified_user</span>
                  </div>
                  <div>
                    <span class="text-sm font-semibold text-primary block">Owner Access</span>
                    <span class="text-[11px] text-text-muted">Akses penuh laporan &amp; keuangan</span>
                  </div>
                </div>
                <span class="material-symbols-outlined text-success text-[20px]">check_circle</span>
              </div>

              <!-- Role 2: Manager -->
              <div class="role-access-item bg-surface-container rounded-xl p-4 border border-border-hairline flex items-center justify-between">
                <div class="flex items-center space-x-3">
                  <div class="w-8 h-8 rounded-full bg-surface-container-high text-on-surface-variant flex items-center justify-center">
                    <span class="material-symbols-outlined text-[18px]">manage_accounts</span>
                  </div>
                  <div>
                    <span class="text-sm font-semibold text-on-surface block">Manager Access</span>
                    <span class="text-[11px] text-text-muted">Kelola stok, harga, &amp; shift kasir</span>
                  </div>
                </div>
                <span class="material-symbols-outlined text-primary text-[20px]">lock_open</span>
              </div>

              <!-- Role 3: Cashier -->
              <div class="role-access-item bg-surface-faint rounded-xl p-4 border border-border-hairline/60 flex items-center justify-between opacity-80">
                <div class="flex items-center space-x-3">
                  <div class="w-8 h-8 rounded-full bg-surface-container text-text-muted flex items-center justify-center">
                    <span class="material-symbols-outlined text-[18px]">point_of_sale</span>
                  </div>
                  <div>
                    <span class="text-sm font-semibold text-on-surface block">Cashier Access</span>
                    <span class="text-[11px] text-text-muted">Hanya input transaksi kasir</span>
                  </div>
                </div>
                <span class="material-symbols-outlined text-text-muted text-[20px]">lock</span>
              </div>

            </div>
          </div>
        </div>
      </div>

      <!-- Door 2 Wrapper for 3D Architectural Swing -->
      <div class="security-door-2 w-full h-full preserve-3d">
        <!-- Feature 2: Analitik Stok & Revenue Chart -->
        <div
          use:tilt3D={{ maxTilt: 6, perspective: 1000, glare: true }}
          class="security-card bg-surface-faint rounded-[32px] p-8 md:p-10 border border-border-hairline hover:border-primary/30 transition-[box-shadow,border-color] duration-300 flex flex-col justify-between shadow-sm hover:shadow-[0_20px_50px_rgba(0,105,72,0.08)] preserve-3d will-change-transform h-full"
        >
        <div class="mb-8">
          <span class="inline-block px-3.5 py-1 bg-primary-fixed text-on-primary-fixed rounded-full font-label-sm text-label-sm uppercase tracking-wider mb-5">
            REAL-TIME INSIGHTS
          </span>
          <h3 class="font-headline-md text-headline-md mb-3 text-on-surface">
            Analitik Stok &amp; Penjualan
          </h3>
          <p class="font-body-md text-body-md text-text-muted leading-relaxed">
            Pantau pergerakan produk terlaris dan grafik pendapatan bulanan secara akurat untuk pengambilan keputusan bisnis yang cerdas.
          </p>
        </div>

        <!-- Draw-in Revenue & Product Breakdown Chart -->
        <div class="revenue-chart-container relative rounded-2xl overflow-hidden bg-white border border-border-hairline shadow-sm p-6 flex flex-col justify-center min-h-[240px]">
          <div class="w-full max-w-[340px] mx-auto">
            
            <!-- Top Stats -->
            <div class="flex items-center justify-between mb-6 pb-3 border-b border-border-hairline">
              <div>
                <div class="text-xs text-text-muted mb-0.5">Total Revenue</div>
                <div class="text-2xl font-bold text-on-surface">Rp 45.2M</div>
              </div>
              <div class="bg-success/10 text-success text-xs font-bold px-2.5 py-1 rounded-full flex items-center border border-success/20">
                <span class="material-symbols-outlined text-[16px] mr-1">trending_up</span> +12%
              </div>
            </div>

            <!-- Product Bars with Progressive Width Draw-in -->
            <div class="space-y-4">
              
              <!-- Product 1: Kopi Susu -->
              <div>
                <div class="flex justify-between text-xs mb-1.5 font-medium">
                  <span class="text-on-surface">Kopi Susu Gula Aren</span>
                  <span class="text-primary font-bold">450 qty (85%)</span>
                </div>
                <div class="w-full h-2 bg-surface-container rounded-full overflow-hidden">
                  <div class="product-metric-bar h-full bg-primary rounded-full origin-left" style="width: 85%; transform-origin: left center;"></div>
                </div>
              </div>

              <!-- Product 2: Matcha Latte -->
              <div>
                <div class="flex justify-between text-xs mb-1.5 font-medium">
                  <span class="text-on-surface">Matcha Latte</span>
                  <span class="text-primary font-bold">320 qty (60%)</span>
                </div>
                <div class="w-full h-2 bg-surface-container rounded-full overflow-hidden">
                  <div class="product-metric-bar h-full bg-primary/70 rounded-full origin-left" style="width: 60%; transform-origin: left center;"></div>
                </div>
              </div>

              <!-- Product 3: Croissant Butter -->
              <div>
                <div class="flex justify-between text-xs mb-1.5 font-medium">
                  <span class="text-on-surface">Croissant Butter</span>
                  <span class="text-primary font-bold">180 qty (45%)</span>
                </div>
                <div class="w-full h-2 bg-surface-container rounded-full overflow-hidden">
                  <div class="product-metric-bar h-full bg-primary/45 rounded-full origin-left" style="width: 45%; transform-origin: left center;"></div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
  </div>
</section>
