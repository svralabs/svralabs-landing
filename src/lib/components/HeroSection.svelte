<script lang="ts">
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';
  import { ScrollSmoother } from 'gsap/ScrollSmoother';
  import { sectionLayeredParallax, mouseParallax, tilt3D, magneticButton, idleFloat, isReducedMotion } from '$lib/actions/gsapParallax';
  import { bokehReveal, blurReveal } from '$lib/actions/motion';

  function scrollTo(id: string) {
    const el = document.getElementById(id);
    if (!el) return;
    const smoother = ScrollSmoother.get();
    if (smoother) {
      smoother.scrollTo(el, true, 'top top');
    } else {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  let heroRoot: HTMLElement;
  let dashboardCard: HTMLElement;

  onMount(() => {
    if (typeof window === 'undefined' || isReducedMotion()) return;

    // Orchestrated Entrance Master Timeline for Hero elements
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // 1. Top Pill Tag Badge: 3D Spring Drop with optical blur clear
      tl.fromTo(
        '.hero-badge-tag',
        { opacity: 0, y: -24, rotateX: 35, scale: 0.88, filter: 'blur(6px)' },
        { opacity: 1, y: 0, rotateX: 0, scale: 1, filter: 'blur(0px)', duration: 0.8, ease: 'back.out(1.6)' },
        0.05
      );

      // 2. Accent Text Soft Emerald Bloom Pulse ("Gak Perlu")
      tl.fromTo(
        '.hero-accent-text',
        { filter: 'drop-shadow(0 0 0px rgba(0,105,72,0))' },
        {
          filter: 'drop-shadow(0 0 16px rgba(0,105,72,0.45))',
          duration: 0.75,
          ease: 'power2.out',
          yoyo: true,
          repeat: 1,
          repeatDelay: 0.15,
        },
        0.45
      );

      // 3. CTA Buttons staggered spring entrance with depth blur
      tl.fromTo(
        '.hero-cta-btn',
        { opacity: 0, y: 28, scale: 0.92, filter: 'blur(6px)' },
        { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', duration: 0.85, stagger: 0.12, ease: 'back.out(1.4)' },
        0.65
      );

      // 4. Main Dashboard Card Floating Rise with 3D perspective tilt
      tl.fromTo(
        '.hero-card-container',
        { opacity: 0, y: 65, scale: 0.92, rotateX: 10, filter: 'blur(6px)' },
        { opacity: 1, y: 0, scale: 1, rotateX: 0, filter: 'blur(0px)', duration: 1.15, ease: 'power3.out' },
        0.75
      );

      // 5. Metric summary cards inside dashboard
      tl.fromTo(
        '.hero-metric-card',
        { opacity: 0, y: 20, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 0.65, stagger: 0.1, ease: 'power2.out' },
        1.05
      );

      // 6. Revenue Chart Bars Staggered Growth from bottom
      tl.fromTo(
        '.hero-chart-bar',
        { scaleY: 0, opacity: 0 },
        { scaleY: 1, opacity: 1, duration: 0.75, stagger: 0.05, ease: 'back.out(1.5)' },
        1.1
      );

      // 7. "Hari Ini" Tooltip Badge Pop
      tl.fromTo(
        '.hero-chart-tooltip',
        { opacity: 0, scale: 0.5, y: 8 },
        { opacity: 1, scale: 1, y: 0, duration: 0.45, ease: 'back.out(2)' },
        1.45
      );

      // 8. Left Floating Badge ("Pembayaran Berhasil" QRIS) Entrance
      tl.fromTo(
        '.hero-badge-entrance-qris',
        { opacity: 0, x: -60, y: 35, scale: 0.7, rotate: -10, filter: 'blur(6px)' },
        { opacity: 1, x: 0, y: 0, scale: 1, rotate: 0, filter: 'blur(0px)', duration: 0.95, ease: 'back.out(1.6)' },
        1.15
      );

      // 9. QRIS Checkmark Icon Pop
      tl.fromTo(
        '.hero-qris-icon',
        { scale: 0, rotate: -50 },
        { scale: 1, rotate: 0, duration: 0.55, ease: 'back.out(2.2)' },
        1.45
      );

      // 10. Right Floating Badge ("Data Sinkronisasi") Entrance — Clear delayed entry
      tl.fromTo(
        '.hero-badge-entrance-sync',
        { opacity: 0, x: 60, y: 35, scale: 0.7, rotate: 10, filter: 'blur(6px)' },
        { opacity: 1, x: 0, y: 0, scale: 1, rotate: 0, filter: 'blur(0px)', duration: 0.95, ease: 'back.out(1.6)' },
        1.75
      );

      // 11. Sync Bolt Icon Flash/Pop
      tl.fromTo(
        '.hero-sync-icon',
        { scale: 0, rotate: 35 },
        { scale: 1, rotate: 0, duration: 0.5, ease: 'back.out(2)' },
        2.05
      );

      // 12. Sync Progress Bar Fill-in
      tl.fromTo(
        '.hero-sync-progress-bar',
        { width: '0%' },
        { width: '85%', duration: 1.1, ease: 'power2.out' },
        2.15
      );

      // 13. Glow Orbs Breathing expansion
      tl.fromTo(
        '.hero-glow-orb',
        { opacity: 0, scale: 0.6 },
        { opacity: 1, scale: 1, duration: 1.5, ease: 'power2.out' },
        0.2
      );
    }, heroRoot);

    return () => ctx.revert();
  });
</script>

<section
  id="hero"
  bind:this={heroRoot}
  use:sectionLayeredParallax={{ bgSpeed: 0.6, contentSpeed: 0.3, fgSpeed: -0.5 }}
  class="min-h-screen lg:h-screen lg:max-h-[960px] xl:max-h-[1020px] w-full relative flex flex-col justify-center items-center pt-[104px] sm:pt-[112px] md:pt-[120px] pb-6 md:pb-8 px-4 sm:px-6 md:px-gutter overflow-hidden perspective-grid bg-white"
>
  <!-- Layer 1: Background Sky & Atmosphere (data-depth="bg") -->
  <div
    data-depth="bg"
    class="absolute inset-0 z-0 pointer-events-none opacity-90 select-none will-change-transform"
    style="background-image: url('/blue_sky_bg_1786188871421.webp'); background-size: cover; background-position: top center; mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 35%, rgba(0,0,0,0.4) 65%, rgba(0,0,0,0) 95%); -webkit-mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 35%, rgba(0,0,0,0.4) 65%, rgba(0,0,0,0) 95%);"
  ></div>

  <!-- Ambient Glow Orbs -->
  <div data-depth="bg" class="hero-glow-orb absolute top-1/3 left-1/4 w-72 h-72 glow-orb-primary rounded-full -translate-y-1/2 -z-10 pointer-events-none"></div>
  <div data-depth="bg" class="hero-glow-orb absolute top-1/2 right-1/4 w-80 h-80 glow-orb-primary-fixed-dim rounded-full -z-10 pointer-events-none"></div>

  <!-- Seamless Horizon Fog Blend into Solusi Section -->
  <div class="absolute inset-x-0 bottom-0 h-24 md:h-36 pointer-events-none bg-gradient-to-b from-transparent via-white/70 via-50% to-white z-0"></div>

  <!-- Section Depth Stage: Scales and fades smoothly for 3D page transitions -->
  <div class="section-depth-stage w-full max-w-5xl mx-auto flex flex-col items-center text-center relative z-10 my-auto">
    
    <!-- Layer 2: Content (Headline, Subtitle, CTAs) (data-depth="content") -->
    <div data-depth="content" class="w-full flex flex-col items-center text-center">
      <!-- Top Pill Badge -->
      <div class="hero-badge-tag inline-flex items-center gap-2 bg-white/85 backdrop-blur-md border border-border-hairline rounded-full px-4 py-1.5 mb-3 md:mb-4 shadow-sm">
        <span class="material-symbols-outlined text-primary text-sm" style="font-variation-settings: 'FILL' 1;">star</span>
        <span class="font-label-sm text-label-sm uppercase tracking-widest text-text-muted">Sistem Kasir · EMR · Custom Software</span>
      </div>

      <!-- Headline: Luxury Bokeh Optical Focus & Tracking Reveal -->
      <h1 use:bokehReveal={{ delay: 0.08, staggerDelay: 0.065, duration: 1.15 }} class="font-display-xl-mobile md:font-display-xl text-display-xl-mobile md:text-display-xl text-on-surface max-w-4xl mb-3 md:mb-4 tracking-tight">
        Digitalisasi Usaha, <span class="italic font-light text-primary hero-accent-text inline-block">Gak Perlu</span> Mahal dan Ribet
      </h1>

      <!-- Subtitle: Fluid Optical Bokeh Cascade -->
      <p use:bokehReveal={{ delay: 0.35, staggerDelay: 0.022, duration: 0.9 }} class="font-body-lg text-body-lg text-text-muted max-w-2xl mb-5 md:mb-6 leading-relaxed">
        Operasional manual bikin pusing? Svralabs bantu bisnismu beralih digital dengan sistem yang langsung jalan — cepat, efisien, dan terjangkau.
      </p>

      <!-- CTAs with Magnetic Hover -->
      <div class="hero-cta-group flex flex-col sm:flex-row items-center justify-center gap-4 mb-6 md:mb-8">
        <button
          use:magneticButton={{ strength: 16 }}
          onclick={() => scrollTo('kontak')}
          class="hero-cta-btn bg-on-surface text-surface px-8 py-3.5 md:py-4 rounded-full font-label-bold hover:bg-primary transition-colors duration-300 shadow-lg hover:shadow-primary/25 cursor-pointer"
        >
          Konsultasi Gratis
        </button>

        <button
          use:magneticButton={{ strength: 12 }}
          onclick={() => scrollTo('portofolio')}
          class="hero-cta-btn bg-white/90 backdrop-blur-sm text-on-surface border border-border-hairline px-8 py-3.5 md:py-4 rounded-full font-label-bold hover:bg-surface-container transition-colors duration-300 shadow-sm flex items-center justify-center gap-2 cursor-pointer"
        >
          Lihat Portofolio
          <span class="material-symbols-outlined text-sm">arrow_forward</span>
        </button>
      </div>
    </div>

    <!-- Layer 3: Foreground (3D Floating Dashboard Showcase) (data-depth="foreground") -->
    <div data-depth="foreground" class="w-full max-w-4xl mx-auto preserve-3d">
      <div
        bind:this={dashboardCard}
        use:mouseParallax={{ strengthX: 18, strengthY: 12 }}
        class="hero-card-container relative w-full preserve-3d"
      >
      <!-- Main Dashboard Card with 3D Tilt & Specular Glare -->
      <div
        use:tilt3D={{ maxTilt: 5, perspective: 1200, scale: 1.01, glare: true, triggerPadding: 120 }}
        class="bg-white/90 backdrop-blur-[24px] rounded-[24px] md:rounded-[28px] border border-white/70 shadow-[0_25px_80px_-15px_rgba(17,24,39,0.12)] p-4 md:p-6 relative overflow-hidden preserve-3d"
      >
        <!-- Card Top Bar -->
        <div class="flex justify-between items-center mb-3.5 md:mb-4 border-b border-border-hairline/60 pb-2.5 md:pb-3">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 md:w-9 md:h-9 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center shadow-2xs">
              <span class="material-symbols-outlined text-white text-[16px] md:text-[18px]" style="font-variation-settings: 'FILL' 1;">store</span>
            </div>
            <div class="text-left">
              <h3 class="font-label-bold text-xs md:text-sm text-on-surface">POS Coffee Shop</h3>
              <p class="font-label-sm text-[10px] md:text-xs text-text-muted">Ready-Made Product</p>
            </div>
          </div>
          <div class="flex gap-1.5 text-text-muted">
            <span class="material-symbols-outlined p-1.5 hover:bg-surface-container rounded-full cursor-pointer transition-colors text-[18px]">notifications</span>
            <span class="material-symbols-outlined p-1.5 hover:bg-surface-container rounded-full cursor-pointer transition-colors text-[18px]">settings</span>
          </div>
        </div>

        <!-- Metric Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-3.5 md:gap-4 text-left">
          
          <!-- Column 1 & 2: Revenue Chart -->
          <div class="hero-metric-card col-span-1 md:col-span-2 bg-surface-container-lowest/90 rounded-2xl p-3.5 md:p-4 border border-border-hairline shadow-2xs flex flex-col justify-between">
            <div>
              <div class="flex justify-between items-start mb-2 md:mb-3">
                <div>
                  <p class="font-label-sm text-[11px] md:text-xs text-text-muted mb-0.5">Pendapatan Bulan Ini</p>
                  <h2 class="font-headline-md text-lg md:text-xl font-bold text-on-surface">Rp 124.500.000</h2>
                </div>
                <div class="bg-success/10 text-success px-2.5 py-0.5 rounded-full flex items-center gap-1 border border-success/20">
                  <span class="material-symbols-outlined text-xs">trending_up</span>
                  <span class="font-label-bold text-[11px]">+12.5%</span>
                </div>
              </div>
            </div>

            <!-- Revenue Bars -->
            <div>
              <div class="h-24 md:h-28 flex items-end justify-between gap-1.5 md:gap-2.5 mt-2">
                <div class="hero-chart-bar w-full bg-surface-container rounded-t h-[40%] hover:bg-primary/20 transition-all origin-bottom"></div>
                <div class="hero-chart-bar w-full bg-surface-container rounded-t h-[60%] hover:bg-primary/20 transition-all origin-bottom"></div>
                <div class="hero-chart-bar w-full bg-surface-container rounded-t h-[45%] hover:bg-primary/20 transition-all origin-bottom"></div>
                <div class="hero-chart-bar w-full bg-surface-container rounded-t h-[80%] hover:bg-primary/20 transition-all origin-bottom"></div>
                <div class="hero-chart-bar w-full bg-primary rounded-t h-[100%] shadow-[0_0_18px_rgba(0,105,72,0.4)] relative group cursor-pointer origin-bottom">
                  <div class="hero-chart-tooltip absolute -top-8 left-1/2 -translate-x-1/2 bg-on-surface text-surface text-[10px] py-0.5 px-2 rounded shadow whitespace-nowrap">Hari Ini</div>
                </div>
                <div class="hero-chart-bar w-full bg-surface-container rounded-t h-[55%] hover:bg-primary/20 transition-all origin-bottom"></div>
                <div class="hero-chart-bar w-full bg-surface-container rounded-t h-[70%] hover:bg-primary/20 transition-all origin-bottom"></div>
              </div>
              <div class="flex justify-between text-[11px] text-text-muted mt-2 font-label-sm">
                <span>Sen</span><span>Sel</span><span>Rab</span><span>Kam</span><span>Jum</span><span>Sab</span><span>Min</span>
              </div>
            </div>
          </div>

          <!-- Column 3: Summary Cards -->
          <div class="col-span-1 flex flex-col gap-3 md:gap-3.5">
            
            <!-- Total Transaksi -->
            <div class="hero-metric-card bg-surface-container-lowest/90 rounded-2xl p-3.5 md:p-4 border border-border-hairline shadow-2xs flex-1">
              <div class="flex items-center gap-1.5 mb-1.5">
                <span class="material-symbols-outlined text-primary text-[16px] md:text-[18px]" style="font-variation-settings: 'FILL' 1;">receipt_long</span>
                <p class="font-label-bold text-xs text-on-surface">Total Transaksi</p>
              </div>
              <h3 class="font-headline-md text-base md:text-lg font-bold text-on-surface mb-0.5">1,482</h3>
              <p class="font-label-sm text-[10px] md:text-[11px] text-text-muted">Rata-rata: Rp 84.000 / transaksi</p>
            </div>

            <!-- Stok Menipis -->
            <div class="hero-metric-card bg-surface-container-lowest/90 rounded-2xl p-3.5 md:p-4 border border-border-hairline shadow-2xs flex-1">
              <div class="flex items-center gap-1.5 mb-1.5">
                <span class="material-symbols-outlined text-amber-500 text-[16px] md:text-[18px]" style="font-variation-settings: 'FILL' 1;">warning</span>
                <p class="font-label-bold text-xs text-on-surface">Stok Menipis</p>
              </div>
              <ul class="space-y-1.5">
                <li class="flex justify-between items-center">
                  <span class="font-body-sm text-xs text-on-surface-variant font-medium">Biji Kopi Arabica</span>
                  <span class="font-label-bold text-[10px] bg-red-100 text-red-700 px-1.5 py-0.5 rounded">Sisa 2kg</span>
                </li>
                <li class="flex justify-between items-center">
                  <span class="font-body-sm text-xs text-on-surface-variant font-medium">Gula Aren Cair</span>
                  <span class="font-label-bold text-[10px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded">Sisa 5L</span>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </div>
      </div>

      <!-- Floating Badge 1: QRIS Payment Success (Floats to the left, no overlap with POS header) -->
      <div
        use:mouseParallax={{ strengthX: 20, strengthY: 12 }}
        class="absolute -left-6 md:-left-12 lg:-left-16 top-10 md:top-14 z-20 hidden lg:block pointer-events-none"
      >
        <div class="hero-badge-entrance-qris">
          <div
            use:idleFloat={{ y: 8, duration: 4.0 }}
            class="bg-white/95 backdrop-blur-md p-3 md:p-3.5 rounded-2xl shadow-xl border border-border-hairline flex items-center gap-3"
          >
            <div class="hero-qris-icon-wrap w-9 h-9 bg-success/15 rounded-full flex items-center justify-center text-success relative overflow-hidden">
              <span class="hero-qris-icon material-symbols-outlined text-[20px]" style="font-variation-settings: 'FILL' 1;">check_circle</span>
            </div>
            <div class="text-left">
              <p class="font-label-bold text-xs text-on-surface">Pembayaran Berhasil</p>
              <p class="font-label-sm text-[11px] text-text-muted">QRIS - Rp 150.000</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Floating Badge 2: Data Sinkronisasi (Floats to the right, no overlap with Stok list) -->
      <div
        use:mouseParallax={{ strengthX: -18, strengthY: -10 }}
        class="absolute -right-6 md:-right-12 lg:-right-16 bottom-8 md:bottom-12 z-20 hidden lg:block pointer-events-none"
      >
        <div class="hero-badge-entrance-sync">
          <div
            use:idleFloat={{ y: -6, duration: 4.8, delay: 0.6 }}
            class="bg-white/95 backdrop-blur-md p-3 md:p-3.5 rounded-2xl shadow-xl border border-border-hairline flex flex-col gap-1.5 text-left min-w-[170px]"
          >
            <p class="font-label-bold text-xs text-on-surface flex items-center gap-1.5">
              <span class="hero-sync-icon material-symbols-outlined text-primary text-xs inline-block" style="font-variation-settings: 'FILL' 1;">bolt</span>
              Data Sinkronisasi
            </p>
            <div class="w-full h-1.5 bg-surface-container rounded-full overflow-hidden relative">
              <div class="hero-sync-progress-bar h-full bg-primary rounded-full w-0"></div>
            </div>
            <div class="flex justify-between items-center font-label-sm text-[10px] text-text-muted mt-0.5 gap-2">
              <span class="text-primary font-medium shrink-0">85% synced</span>
              <span class="shrink-0">Updated just now</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</section>

