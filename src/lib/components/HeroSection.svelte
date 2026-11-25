<script lang="ts">
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';
  import { sectionLayeredParallax, mouseParallax, tilt3D, magneticButton, idleFloat, isReducedMotion } from '$lib/actions/gsapParallax';

  function scrollTo(id: string) {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  let heroRoot: HTMLElement;
  let dashboardCard: HTMLElement;

  onMount(() => {
    if (typeof window === 'undefined' || isReducedMotion()) return;

    // Fast, buttery-smooth entrance timeline that settles in < 0.6s
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      // 1. Top Pill Tag Badge: gentle rise
      tl.from(
        '.hero-badge-tag',
        { opacity: 0, y: -12, duration: 0.45 },
        0.02
      );

      // 2. Accent Text Subtle Composite Pulse (GPU only, zero filter repaint)
      tl.fromTo(
        '.hero-accent-text',
        { scale: 0.96, y: 4 },
        {
          scale: 1,
          y: 0,
          duration: 0.55,
          ease: 'back.out(1.6)',
        },
        0.12
      );

      // 3. CTA Buttons: immediate fast reveal
      tl.from(
        '.hero-cta-btn',
        { opacity: 0, y: 16, duration: 0.45, stagger: 0.06 },
        0.08
      );

      // 4. Main Dashboard Card: responsive smooth lift
      tl.from(
        '.hero-card-container',
        { opacity: 0, y: 28, duration: 0.55 },
        0.12
      );

      // 5. Metric summary cards inside dashboard
      tl.from(
        '.hero-metric-card',
        { opacity: 0, y: 12, duration: 0.4, stagger: 0.05 },
        0.2
      );

      // 6. Revenue Chart Bars Staggered Growth from bottom
      tl.fromTo(
        '.hero-chart-bar',
        { scaleY: 0, opacity: 0 },
        { scaleY: 1, opacity: 1, duration: 0.55, stagger: 0.03, ease: 'back.out(1.4)' },
        0.25
      );

      // 7. "Hari Ini" Tooltip Badge Pop
      tl.from(
        '.hero-chart-tooltip',
        { opacity: 0, scale: 0.6, y: 4, duration: 0.35, ease: 'back.out(1.8)' },
        0.35
      );

      // 8. Left Floating Badge ("Pembayaran Berhasil" QRIS) Entrance
      tl.from(
        '.hero-badge-entrance-qris',
        { opacity: 0, x: -30, y: 15, duration: 0.55, ease: 'back.out(1.4)' },
        0.28
      );

      // 9. QRIS Checkmark Icon Pop
      tl.from(
        '.hero-qris-icon',
        { scale: 0, duration: 0.35, ease: 'back.out(2)' },
        0.38
      );

      // 10. Right Floating Badge ("Data Sinkronisasi") Entrance
      tl.from(
        '.hero-badge-entrance-sync',
        { opacity: 0, x: 30, y: 15, duration: 0.55, ease: 'back.out(1.4)' },
        0.32
      );

      // 11. Sync Bolt Icon Flash/Pop
      tl.from(
        '.hero-sync-icon',
        { scale: 0, duration: 0.35, ease: 'back.out(2)' },
        0.42
      );

      // 12. Sync Progress Bar Fill-in (GPU scaleX, zero layout width thrashing)
      tl.fromTo(
        '.hero-sync-progress-bar',
        { scaleX: 0 },
        { scaleX: 1, duration: 0.7, ease: 'power2.out' },
        0.45
      );

      // 12b. Animated Revenue & Transaction Count-up
      const revObj = { val: 850 };
      const revEl = heroRoot.querySelector('.hero-revenue-num');
      if (revEl) {
        tl.to(
          revObj,
          {
            val: 1245,
            duration: 0.9,
            ease: 'power2.out',
            onUpdate: () => {
              const millions = Math.floor(revObj.val / 10);
              const hundredThousands = revObj.val % 10;
              revEl.textContent = `Rp ${millions}.${hundredThousands}00.000`;
            }
          },
          0.2
        );
      }

      const txObj = { val: 920 };
      const txEl = heroRoot.querySelector('.hero-tx-num');
      if (txEl) {
        tl.to(
          txObj,
          {
            val: 1482,
            duration: 0.85,
            ease: 'power2.out',
            onUpdate: () => {
              txEl.textContent = Math.round(txObj.val).toLocaleString('id-ID');
            }
          },
          0.24
        );
      }

      // 13. Glow Orbs Breathing expansion
      tl.from(
        '.hero-glow-orb',
        { opacity: 0, scale: 0.8, duration: 0.8 },
        0.1
      );
    }, heroRoot);

    return () => ctx.revert();
  });
</script>

<section
  id="hero"
  bind:this={heroRoot}
  use:sectionLayeredParallax={{ bgSpeed: 0.6, contentSpeed: 0.3, fgSpeed: -0.5 }}
  class="min-h-screen w-full relative flex flex-col justify-between items-center pt-[104px] sm:pt-[112px] md:pt-[120px] pb-16 md:pb-20 px-4 sm:px-6 md:px-gutter overflow-hidden perspective-grid bg-white"
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
      <div class="hero-badge-tag inline-flex items-center gap-2 bg-white border border-border-hairline rounded-full px-4 py-1.5 mb-3 md:mb-4 shadow-sm">
        <span class="material-symbols-outlined text-primary text-sm" style="font-variation-settings: 'FILL' 1;">hub</span>
        <span class="font-label-sm text-label-sm uppercase tracking-widest text-text-muted">Software House &amp; Sistem Bisnis Teruji</span>
      </div>

      <!-- Headline: Instant zero-delay semantic render for optimal LCP -->
      <h1 class="font-display-xl-mobile md:font-display-xl text-display-xl-mobile md:text-display-xl text-on-surface max-w-4xl mb-3 md:mb-4 tracking-tight">
        Digitalisasi Usaha, <span class="italic font-light text-primary hero-accent-text inline-block">Gak Perlu</span> Mahal dan Ribet
      </h1>

      <!-- Subtitle -->
      <p class="font-body-lg text-body-lg text-text-muted max-w-2xl mb-5 md:mb-6 leading-relaxed">
        Dari sistem kasir POS, rekam medis EMR faskes, manajemen stok multi-gudang, hingga custom software. Svralabs membangun sistem operasional yang langsung jalan — praktis, teruji, dan tanpa langganan mahal.
      </p>

      <!-- CTAs with Magnetic Hover -->
      <div class="hero-cta-group flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-6 md:mb-8">
        <a
          use:magneticButton={{ strength: 16 }}
          href="/portfolio"
          class="hero-cta-btn bg-primary text-on-primary px-8 sm:px-9 py-3.5 md:py-4 rounded-full font-label-bold hover:bg-primary-container transition-all duration-300 shadow-lg hover:shadow-primary/30 flex items-center justify-center gap-2 cursor-pointer w-full sm:w-auto text-sm sm:text-base"
        >
          <span class="material-symbols-outlined text-[18px]">visibility</span>
          Lihat Project &amp; Demo
          <span class="material-symbols-outlined text-[18px]">arrow_forward</span>
        </a>

        <a
          use:magneticButton={{ strength: 14 }}
          href="https://wa.me/6285158418944?text=Halo%20Svralabs%2C%20saya%20ingin%20konsultasi%20mengenai%20sistem%20operasional%20bisnis"
          target="_blank"
          rel="noopener noreferrer"
          class="hero-cta-btn bg-white/95 backdrop-blur-sm text-on-surface border border-border-hairline hover:border-emerald-500 hover:text-emerald-700 px-8 sm:px-9 py-3.5 md:py-4 rounded-full font-label-bold transition-all duration-300 shadow-sm hover:shadow-md flex items-center justify-center gap-2.5 cursor-pointer w-full sm:w-auto text-sm sm:text-base"
        >
          <svg class="w-4 h-4 fill-emerald-600" viewBox="0 0 24 24">
            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.699c.96.541 1.961.828 3.003.828 3.18 0 5.767-2.587 5.768-5.767 0-3.18-2.587-5.768-5.768-5.768zm3.364 8.163c-.144.405-.837.774-1.17.824-.312.045-.634.074-1.849-.427-1.442-.596-2.368-2.072-2.439-2.167-.072-.095-.579-.771-.579-1.47 0-.699.366-1.042.497-1.185.131-.143.286-.179.382-.179.095 0 .191.002.274.006.088.004.205-.034.32.245.119.29.407.994.443 1.066.036.072.06.155.012.25-.048.096-.072.155-.144.239-.071.083-.151.186-.216.25-.072.072-.147.15-.063.294.084.144.373.615.8 1 .552.496 1.016.65 1.16.721.144.072.227.06.31-.036.084-.096.358-.417.454-.56.096-.144.191-.12.323-.072.131.048.835.394.979.465.144.072.239.108.274.168.036.06.036.347-.108.752zM12 2C6.477 2 2 6.477 2 12c0 1.891.524 3.66 1.434 5.176L2 22l4.981-1.306C8.441 21.536 10.16 22 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2z"/>
          </svg>
          Konsultasi WhatsApp
        </a>
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
              <span class="material-symbols-outlined text-white text-[16px] md:text-[18px]" style="font-variation-settings: 'FILL' 1;">terminal</span>
            </div>
            <div class="text-left">
              <p class="font-label-bold text-xs md:text-sm text-on-surface">Svralabs Core Engine</p>
              <p class="font-label-sm text-[10px] md:text-xs text-text-muted">Kasir POS · EMR Faskes · Stok Gudang · Custom</p>
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
                  <p class="hero-revenue-num font-headline-md text-lg md:text-xl font-bold text-on-surface tabular-nums">Rp 124.500.000</p>
                </div>
                <div class="bg-success/10 text-success px-2.5 py-0.5 rounded-full flex items-center gap-1 border border-success/20">
                  <span class="material-symbols-outlined text-xs">trending_up</span>
                  <span class="font-label-bold text-[11px]">+12.5%</span>
                </div>
              </div>
            </div>

            <!-- Revenue Bars with Interactive Hover Values -->
            <div>
              <div class="h-24 md:h-28 flex items-end justify-between gap-1.5 md:gap-2.5 mt-4">
                <div class="hero-chart-bar w-full bg-surface-container rounded-t h-[40%] hover:bg-primary/25 transition-colors duration-200 relative group cursor-pointer origin-bottom">
                  <div class="opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none absolute -top-7 left-1/2 -translate-x-1/2 bg-on-surface text-surface text-[10px] py-0.5 px-2 rounded shadow whitespace-nowrap font-mono">Rp 11.4 Jt</div>
                </div>
                <div class="hero-chart-bar w-full bg-surface-container rounded-t h-[60%] hover:bg-primary/25 transition-colors duration-200 relative group cursor-pointer origin-bottom">
                  <div class="opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none absolute -top-7 left-1/2 -translate-x-1/2 bg-on-surface text-surface text-[10px] py-0.5 px-2 rounded shadow whitespace-nowrap font-mono">Rp 16.8 Jt</div>
                </div>
                <div class="hero-chart-bar w-full bg-surface-container rounded-t h-[45%] hover:bg-primary/25 transition-colors duration-200 relative group cursor-pointer origin-bottom">
                  <div class="opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none absolute -top-7 left-1/2 -translate-x-1/2 bg-on-surface text-surface text-[10px] py-0.5 px-2 rounded shadow whitespace-nowrap font-mono">Rp 13.1 Jt</div>
                </div>
                <div class="hero-chart-bar w-full bg-surface-container rounded-t h-[80%] hover:bg-primary/25 transition-colors duration-200 relative group cursor-pointer origin-bottom">
                  <div class="opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none absolute -top-7 left-1/2 -translate-x-1/2 bg-on-surface text-surface text-[10px] py-0.5 px-2 rounded shadow whitespace-nowrap font-mono">Rp 21.5 Jt</div>
                </div>
                <div class="hero-chart-bar w-full bg-primary rounded-t h-[100%] shadow-[0_0_18px_rgba(0,105,72,0.4)] relative group cursor-pointer origin-bottom">
                  <div class="hero-chart-tooltip absolute -top-8 left-1/2 -translate-x-1/2 bg-on-surface text-surface text-[10px] py-0.5 px-2 rounded shadow whitespace-nowrap">Hari Ini</div>
                </div>
                <div class="hero-chart-bar w-full bg-surface-container rounded-t h-[55%] hover:bg-primary/25 transition-colors duration-200 relative group cursor-pointer origin-bottom">
                  <div class="opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none absolute -top-7 left-1/2 -translate-x-1/2 bg-on-surface text-surface text-[10px] py-0.5 px-2 rounded shadow whitespace-nowrap font-mono">Rp 15.2 Jt</div>
                </div>
                <div class="hero-chart-bar w-full bg-surface-container rounded-t h-[70%] hover:bg-primary/25 transition-colors duration-200 relative group cursor-pointer origin-bottom">
                  <div class="opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none absolute -top-7 left-1/2 -translate-x-1/2 bg-on-surface text-surface text-[10px] py-0.5 px-2 rounded shadow whitespace-nowrap font-mono">Rp 19.6 Jt</div>
                </div>
              </div>
              <div class="flex justify-between text-[11px] text-text-muted mt-2 font-label-sm">
                <span>Sen</span><span>Sel</span><span>Rab</span><span>Kam</span><span class="text-primary font-bold">Jum</span><span>Sab</span><span>Min</span>
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
              <p class="hero-tx-num font-headline-md text-base md:text-lg font-bold text-on-surface mb-0.5 tabular-nums">1.482</p>
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

      <!-- Floating Badge 1: QRIS Payment Success (Zero text overlap at xl+) -->
      <div
        use:mouseParallax={{ strengthX: 20, strengthY: 12 }}
        class="absolute xl:-left-44 2xl:-left-48 top-24 z-20 hidden xl:block pointer-events-none"
      >
        <div class="hero-badge-entrance-qris">
          <div
            use:idleFloat={{ y: 8, duration: 4.0 }}
            class="bg-white/95 backdrop-blur-md px-3 py-2.5 rounded-2xl shadow-xl border border-border-hairline flex items-center gap-2.5"
          >
            <div class="hero-qris-icon-wrap w-8 h-8 bg-success/15 rounded-full flex items-center justify-center text-success relative overflow-hidden shrink-0">
              <span class="hero-qris-icon material-symbols-outlined text-[18px]" style="font-variation-settings: 'FILL' 1;">check_circle</span>
            </div>
            <div class="text-left">
              <p class="font-label-bold text-[11px] text-on-surface leading-tight">Pembayaran Berhasil</p>
              <p class="font-label-sm text-[10px] text-text-muted leading-tight mt-0.5">QRIS - Rp 150.000</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Floating Badge 2: Data Sinkronisasi (Zero text overlap at xl+) -->
      <div
        use:mouseParallax={{ strengthX: -18, strengthY: -10 }}
        class="absolute xl:-right-40 2xl:-right-44 bottom-8 z-20 hidden xl:block pointer-events-none"
      >
        <div class="hero-badge-entrance-sync">
          <div
            use:idleFloat={{ y: -6, duration: 4.8, delay: 0.6 }}
            class="bg-white/95 backdrop-blur-md p-3 rounded-2xl shadow-xl border border-border-hairline flex flex-col gap-1.5 text-left min-w-[172px]"
          >
            <p class="font-label-bold text-xs text-on-surface flex items-center gap-1.5">
              <span class="hero-sync-icon material-symbols-outlined text-primary text-xs inline-block" style="font-variation-settings: 'FILL' 1;">bolt</span>
              Data Sinkronisasi
            </p>
            <div class="w-full h-1.5 bg-surface-container rounded-full overflow-hidden relative">
              <div class="hero-sync-progress-bar h-full w-[85%] bg-primary rounded-full origin-left"></div>
            </div>
            <div class="flex justify-between items-center font-label-sm text-[10px] text-text-muted mt-0.5 gap-2">
              <span class="text-primary font-medium shrink-0">Sinkron 85%</span>
              <span class="shrink-0">Baru diperbarui</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</section>

