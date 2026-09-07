<script lang="ts">
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  import { tilt3D, idleFloat, isReducedMotion } from '$lib/actions/gsapParallax';
  import { glareCard } from '$lib/actions/motion';

  if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }

  let missionRoot: HTMLElement;
  let headlineEl: HTMLElement;

  onMount(() => {
    if (typeof window === 'undefined' || isReducedMotion()) return;

    const ctx = gsap.context(() => {
      const words = headlineEl ? headlineEl.querySelectorAll('.mission-word') : [];

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: missionRoot,
          start: 'top 52%',
          toggleActions: 'play none none reverse',
        },
        defaults: { ease: 'power3.out' },
      });

      // 1. Kicker Badge: 3D Spring Drop with optical blur clear
      tl.fromTo(
        '.mission-kicker',
        { opacity: 0, y: -20, scale: 0.88, filter: 'blur(6px)' },
        { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', duration: 0.75, ease: 'back.out(1.6)' },
        0.05
      );

      // 2. Headline Words: Kinetic Masked Rise with Optical Blur Clear
      if (words.length > 0) {
        tl.fromTo(
          words,
          { opacity: 0, y: '115%', filter: 'blur(8px)' },
          { opacity: 1, y: '0%', filter: 'blur(0px)', duration: 0.9, stagger: 0.035, ease: 'power3.out' },
          0.15
        );
      }

      // 3. Emphasized Text Soft Emerald Bloom Pulse
      tl.fromTo(
        '.mission-accent-text',
        { filter: 'drop-shadow(0 0 0px rgba(0,105,72,0))' },
        {
          filter: 'drop-shadow(0 0 20px rgba(0,105,72,0.5))',
          duration: 0.8,
          ease: 'power2.out',
          yoyo: true,
          repeat: 1,
          repeatDelay: 0.12,
        },
        0.7
      );

      // 4. Feature points cascade with icon micro-spring rotation
      tl.fromTo(
        '.mission-feature-item',
        { opacity: 0, y: 30, scale: 0.94 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.14, ease: 'power3.out' },
        0.45
      );

      tl.fromTo(
        '.mission-feature-icon',
        { scale: 0.5, rotate: -20 },
        { scale: 1, rotate: 0, duration: 0.7, stagger: 0.14, ease: 'back.out(1.9)' },
        0.5
      );

      // 5. Tablet chassis Grand 3D entrance rise & perspective settle
      tl.fromTo(
        '.mission-tablet-chassis',
        { opacity: 0, y: 65, scale: 0.92, rotateX: 10, filter: 'blur(8px)' },
        { opacity: 1, y: 0, scale: 1, rotateX: 0, filter: 'blur(0px)', duration: 1.15, ease: 'power3.out' },
        0.35
      );

      // 6. Tablet KPI Metric Cards cascade
      tl.fromTo(
        '.mission-kpi-card',
        { opacity: 0, y: 20, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.65, stagger: 0.09, ease: 'power2.out' },
        0.75
      );

      // 7. Tablet Queue Rows glide in sequentially
      tl.fromTo(
        '.mission-queue-row',
        { opacity: 0, x: 25 },
        { opacity: 1, x: 0, duration: 0.6, stagger: 0.08, ease: 'power2.out' },
        0.88
      );

      // 8. Floating Card spring pop entrance (at bottom-left with delay)
      tl.fromTo(
        '.mission-floating-card-wrap',
        { opacity: 0, x: -65, y: 40, scale: 0.7, rotate: -10, filter: 'blur(8px)' },
        { opacity: 1, x: 0, y: 0, scale: 1, rotate: 0, filter: 'blur(0px)', duration: 0.95, ease: 'back.out(1.6)' },
        1.15
      );

      // 9. Floating card counter 0 -> 94 synchronized with card entrance
      const countObj = { val: 0 };
      const counterSpan = missionRoot.querySelector('.mission-counter');
      if (counterSpan) {
        tl.to(
          countObj,
          {
            val: 94,
            duration: 1.1,
            ease: 'power2.out',
            onUpdate: () => {
              counterSpan.textContent = String(Math.round(countObj.val));
            },
          },
          1.2
        );
      }

      // 10. Floating card bar chart columns dynamic growth from bottom
      tl.fromTo(
        '.mission-bar',
        { scaleY: 0 },
        { scaleY: 1, duration: 0.75, stagger: 0.06, ease: 'back.out(1.5)' },
        1.35
      );

      // ── OUT: Scrubbed exit as Fitur slides in from below ──
      const outTl = gsap.timeline({
        scrollTrigger: {
          trigger: missionRoot,
          start: 'bottom 85%',
          end: 'bottom 15%',
          scrub: 1.0,
          invalidateOnRefresh: true,
        }
      });

      outTl.to('.mission-text-wrapper', {
        y: -40, opacity: 0, scale: 0.96, ease: 'power1.in', duration: 0.7,
      }, 0);
      outTl.to('.tablet-morph-stage', {
        y: -55, opacity: 0, scale: 0.92, filter: 'blur(5px)', ease: 'power1.in', duration: 0.75,
      }, 0.05);
      outTl.to('.mission-floating-card-wrap', {
        x: -30, y: -40, opacity: 0, scale: 0.85, ease: 'power1.in', duration: 0.65,
      }, 0);

    }, missionRoot);

    return () => ctx.revert();
  });
</script>

<section
  id="tentang-kami"
  bind:this={missionRoot}
  class="min-h-screen min-h-[100dvh] w-full relative flex flex-col justify-center items-center pt-24 pb-16 md:pt-28 md:pb-20 bg-surface-container-lowest overflow-hidden perspective-grid"
>
  <!-- Background Glow Layer (data-depth="bg") -->
  <div data-depth="bg" class="absolute inset-0 z-0 pointer-events-none opacity-40">
    <div class="absolute top-1/4 right-8 w-72 h-72 glow-orb-primary rounded-full"></div>
    <div class="absolute bottom-16 left-8 w-80 h-80 glow-orb-primary-fixed rounded-full"></div>
  </div>

  <!-- Seamless Horizon Fog Blend from Solusi Section -->
  <div class="absolute inset-x-0 top-0 h-24 md:h-36 pointer-events-none bg-gradient-to-b from-white via-white/80 via-40% to-transparent z-0"></div>

  <!-- Seamless Bottom Fog Blend to Fitur Section -->
  <div class="absolute inset-x-0 bottom-0 h-24 md:h-36 pointer-events-none bg-gradient-to-t from-white via-white/80 via-40% to-transparent z-0"></div>

  <!-- Section Depth Stage -->
  <div class="section-depth-stage w-full max-w-7xl mx-auto px-gutter flex flex-col lg:flex-row items-center gap-14 lg:gap-20 relative z-10">
    
    <!-- Left Side: Header & Stats (Restored to Original Clean Design with Kinetic Word Reveals) -->
    <div data-depth="content" class="flex-1 w-full">
      <div class="mission-text-wrapper w-full">
        <div class="text-left mb-12">
          
          <!-- Kicker badge with interactive hover shine & spin -->
          <div class="mission-kicker inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-container border border-outline-variant/30 mb-8 shadow-xs group/badge hover:border-primary/50 hover:bg-primary/5 hover:scale-105 hover:shadow-sm transition-all duration-300 cursor-default">
            <span class="material-symbols-outlined text-[16px] text-primary group-hover/badge:rotate-72 group-hover/badge:scale-125 transition-all duration-500" style="font-variation-settings: 'FILL' 1;">star</span>
            <span class="font-label-bold text-label-bold text-on-surface uppercase tracking-wider text-xs">TENTANG KAMI</span>
          </div>

          <!-- Kinetic word reveal typography -->
          <h2
            bind:this={headlineEl}
            class="font-display-xl-mobile md:font-headline-lg text-display-xl-mobile md:text-headline-lg text-on-surface leading-tight"
          >
            <span class="inline-block overflow-hidden"><span class="mission-word inline-block">Efisiensikan</span></span>
            <span class="inline-block overflow-hidden"><span class="mission-word inline-block">waktumu</span></span>
            <span class="inline-block overflow-hidden"><span class="mission-word inline-block">dari</span></span>
            <span class="inline-block overflow-hidden"><span class="mission-word inline-block">operasional,</span></span>
            <span class="inline-block overflow-hidden"><span class="mission-word inline-block">biar</span></span>
            <span class="inline-block overflow-hidden"><span class="mission-word inline-block">bisa</span></span>
            <span class="inline-block overflow-hidden"><span class="mission-word inline-block">fokus</span></span>
            <em class="mission-accent-text italic text-primary font-normal relative inline-block transition-all duration-300 hover:text-primary-hover hover:drop-shadow-[0_0_20px_rgba(0,105,72,0.45)] hover:scale-[1.03] cursor-pointer group/em">
              <span class="inline-block overflow-hidden"><span class="mission-word inline-block">menganalisa</span></span>
              <span class="inline-block overflow-hidden"><span class="mission-word inline-block">bisnismu</span></span>.
              <span class="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-primary to-emerald-400 group-hover/em:w-full transition-all duration-300 rounded-full"></span>
            </em>
          </h2>
        </div>

        <!-- 3 Feature Points with Choreographed Stagger & Rich Micro-Interactions -->
        <div class="w-full grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12">
          
          <!-- Feature 1 -->
          <div class="mission-feature-item flex flex-col items-start group cursor-pointer p-4 -m-4 rounded-2xl transition-all duration-300 hover:bg-surface-container/60 hover:shadow-md hover:shadow-primary/5 hover:border hover:border-primary/15 border border-transparent">
            <div class="mission-feature-icon w-12 h-12 rounded-2xl bg-primary-container flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-lg group-hover:shadow-primary/30 transition-all duration-300">
              <span class="material-symbols-outlined text-white transition-transform duration-300 group-hover:scale-110" data-icon="autorenew">autorenew</span>
            </div>
            <h3 class="font-label-bold text-label-bold text-on-surface mb-2 group-hover:text-primary group-hover:translate-x-1 transition-all duration-200">Laporan Otomatis</h3>
            <p class="font-body-md text-body-md text-text-muted group-hover:text-on-surface transition-colors duration-200 leading-relaxed">Tinggalkan rekap manual berjam-jam tiap tutup toko.</p>
          </div>

          <!-- Feature 2 -->
          <div class="mission-feature-item flex flex-col items-start group cursor-pointer p-4 -m-4 rounded-2xl transition-all duration-300 hover:bg-surface-container/60 hover:shadow-md hover:shadow-primary/5 hover:border hover:border-primary/15 border border-transparent">
            <div class="mission-feature-icon w-12 h-12 rounded-2xl bg-primary-container flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-lg group-hover:shadow-primary/30 transition-all duration-300">
              <span class="material-symbols-outlined text-white transition-transform duration-300 group-hover:scale-110" data-icon="language">language</span>
            </div>
            <h3 class="font-label-bold text-label-bold text-on-surface mb-2 group-hover:text-primary group-hover:translate-x-1 transition-all duration-200">Pantau Darimana Saja</h3>
            <p class="font-body-md text-body-md text-text-muted group-hover:text-on-surface transition-colors duration-200 leading-relaxed">Cek omset dan stok toko dari HP, meski kamu lagi di luar.</p>
          </div>

          <!-- Feature 3 -->
          <div class="mission-feature-item flex flex-col items-start group cursor-pointer p-4 -m-4 rounded-2xl transition-all duration-300 hover:bg-surface-container/60 hover:shadow-md hover:shadow-primary/5 hover:border hover:border-primary/15 border border-transparent sm:col-span-2 md:col-span-1">
            <div class="mission-feature-icon w-12 h-12 rounded-2xl bg-primary-container flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-lg group-hover:shadow-primary/30 transition-all duration-300">
              <span class="material-symbols-outlined text-white transition-transform duration-300 group-hover:scale-110" data-icon="fact_check">fact_check</span>
            </div>
            <h3 class="font-label-bold text-label-bold text-on-surface mb-2 group-hover:text-primary group-hover:translate-x-1 transition-all duration-200">Minim Kesalahan</h3>
            <p class="font-body-md text-body-md text-text-muted group-hover:text-on-surface transition-colors duration-200 leading-relaxed">Akurasi data otomatis untuk mencegah kebocoran kas.</p>
          </div>

        </div>
      </div>
    </div>


    <!-- Right Side: Coded Tablet UI Component with 3D Depth (data-depth="foreground") -->
    <div data-depth="foreground" class="flex-1 w-full max-w-[540px] mx-auto lg:mx-0 preserve-3d">
      <div class="tablet-morph-stage relative w-full preserve-3d">
        
        <!-- Base Tablet Chassis with 3D Tilt: Apple-style Aluminum Light Finish -->
        <div
          use:tilt3D={{ maxTilt: 5, perspective: 1200, glare: true }}
          class="mission-tablet-chassis relative bg-slate-100/95 rounded-[32px] p-3 sm:p-3.5 shadow-[0_20px_50px_-10px_rgba(0,105,72,0.12),0_10px_25px_-5px_rgba(17,24,39,0.06)] border border-slate-200/90 preserve-3d"
        >
          <!-- Front Camera Dot -->
          <div class="absolute top-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-slate-300 border border-slate-300 flex items-center justify-center">
            <div class="w-1 h-1 rounded-full bg-slate-600"></div>
          </div>

          <!-- Tablet Screen Display (Crisp Light Mode) -->
          <div class="w-full bg-white rounded-[22px] overflow-hidden flex flex-col border border-slate-200/80 text-on-surface font-sans select-none min-h-[440px] sm:min-h-[470px]">
            
            <!-- Top App Bar -->
            <div class="px-4 py-2.5 bg-slate-50/90 border-b border-slate-200/80 flex items-center justify-between">
              <div class="flex items-center gap-2.5">
                <div class="w-7 h-7 rounded-lg bg-primary flex items-center justify-center shadow-xs hover:scale-110 hover:rotate-6 transition-all duration-200 cursor-pointer">
                  <span class="material-symbols-outlined text-[16px] text-white">local_laundry_service</span>
                </div>
                <div>
                  <div class="font-bold text-xs text-on-surface leading-tight flex items-center gap-1.5">
                    Svra Laundry Pro
                    <span class="text-[9px] px-1.5 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full font-mono font-semibold hover:bg-emerald-100 hover:scale-105 transition-all cursor-default">v2.4</span>
                  </div>
                  <div class="text-[10px] text-slate-500">Cabang Wonopringgo • Kasir 01</div>
                </div>
              </div>
              <div class="flex items-center gap-2 text-[11px]">
                <span class="inline-flex items-center gap-1 text-emerald-700 font-mono text-[10px] bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 hover:bg-emerald-100 hover:scale-105 hover:shadow-2xs transition-all cursor-pointer">
                  <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  Sinkron Cloud
                </span>
                <span class="text-slate-500 font-mono text-[11px]">14:28</span>
              </div>
            </div>

            <!-- Operational KPI Cards Row -->
            <div class="grid grid-cols-3 gap-2 p-3 bg-slate-50/50 border-b border-slate-200/60">
              <div class="mission-kpi-card bg-white rounded-xl p-2.5 border border-slate-200/80 shadow-2xs hover:-translate-y-1 hover:shadow-md hover:border-emerald-300 active:scale-98 transition-all duration-200 cursor-pointer group/kpi">
                <div class="text-[10px] text-slate-500 font-medium mb-0.5">Omset Hari Ini</div>
                <div class="font-bold text-xs sm:text-sm text-slate-900 font-mono group-hover/kpi:text-emerald-700 transition-colors">Rp 2.840.000</div>
                <div class="text-[9px] text-emerald-600 font-medium flex items-center gap-0.5 mt-0.5 group-hover/kpi:translate-x-0.5 transition-transform">
                  <span class="material-symbols-outlined text-[10px]">trending_up</span> +14.8%
                </div>
              </div>
              <div class="mission-kpi-card bg-white rounded-xl p-2.5 border border-slate-200/80 shadow-2xs hover:-translate-y-1 hover:shadow-md hover:border-sky-300 active:scale-98 transition-all duration-200 cursor-pointer group/kpi">
                <div class="text-[10px] text-slate-500 font-medium mb-0.5">Total Muatan</div>
                <div class="font-bold text-xs sm:text-sm text-slate-900 font-mono group-hover/kpi:text-sky-700 transition-colors">138.5 Kg</div>
                <div class="text-[9px] text-sky-600 font-medium flex items-center gap-0.5 mt-0.5 group-hover/kpi:translate-x-0.5 transition-transform">
                  <span class="material-symbols-outlined text-[10px]">inventory_2</span> 24 Nota Aktif
                </div>
              </div>
              <div class="mission-kpi-card bg-white rounded-xl p-2.5 border border-slate-200/80 shadow-2xs hover:-translate-y-1 hover:shadow-md hover:border-amber-300 active:scale-98 transition-all duration-200 cursor-pointer group/kpi">
                <div class="text-[10px] text-slate-500 font-medium mb-0.5">Mesin Cuci</div>
                <div class="font-bold text-xs sm:text-sm text-slate-900 font-mono group-hover/kpi:text-amber-700 transition-colors">6 / 8 Aktif</div>
                <div class="text-[9px] text-amber-600 font-medium flex items-center gap-0.5 mt-0.5 group-hover/kpi:translate-x-0.5 transition-transform">
                  <span class="material-symbols-outlined text-[10px]">timelapse</span> 2 Siap Angkat
                </div>
              </div>
            </div>

            <!-- Live Laundry Queue Table -->
            <div class="flex-1 p-3 flex flex-col justify-between bg-slate-50/30">
              <div>
                <div class="flex items-center justify-between mb-2">
                  <div class="flex items-center gap-1.5">
                    <span class="text-xs font-semibold text-slate-800">Antrian Cucian Berjalan</span>
                    <span class="text-[10px] bg-slate-200/80 text-slate-700 px-1.5 py-0.2 rounded font-mono font-medium">11 order</span>
                  </div>
                  <span class="text-[10px] text-primary flex items-center gap-0.5 font-medium hover:underline cursor-pointer">
                    Auto-refresh • 5s
                  </span>
                </div>

                <!-- Order Rows with interactive hover -->
                <div class="space-y-1.5">
                  <!-- Order 1: Ready -->
                  <div class="mission-queue-row bg-white rounded-xl p-2.5 border border-slate-200/80 shadow-2xs hover:bg-emerald-50/30 hover:border-emerald-300 hover:scale-[1.01] hover:shadow-2xs active:scale-[0.99] transition-all duration-200 cursor-pointer flex items-center justify-between gap-2 group/row">
                    <div class="flex items-center gap-2 min-w-0">
                      <div class="w-7 h-7 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0 text-emerald-600 group-hover/row:scale-110 group-hover/row:rotate-6 transition-all duration-200">
                        <span class="material-symbols-outlined text-[15px]">check_circle</span>
                      </div>
                      <div class="min-w-0">
                        <div class="flex items-center gap-1.5">
                          <span class="font-mono text-xs font-bold text-slate-900 group-hover/row:text-primary transition-colors">#LD-2841</span>
                          <span class="text-[11px] text-slate-700 font-medium truncate">Bpk. Rahmat</span>
                        </div>
                        <div class="text-[10px] text-slate-500 truncate">Cuci Komplit Express • 5.2 Kg</div>
                      </div>
                    </div>
                    <div class="text-right shrink-0 flex flex-col items-end">
                      <span class="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-[9px] font-medium inline-flex items-center gap-1 group-hover/row:bg-emerald-100 transition-colors">
                        <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Siap Diambil
                      </span>
                      <span class="text-[10px] text-slate-600 font-mono font-semibold mt-0.5 group-hover/row:text-emerald-700 transition-colors">Rp 42.000</span>
                    </div>
                  </div>

                  <!-- Order 2: Ironing -->
                  <div class="mission-queue-row bg-white rounded-xl p-2.5 border border-slate-200/80 shadow-2xs hover:bg-sky-50/30 hover:border-sky-300 hover:scale-[1.01] hover:shadow-2xs active:scale-[0.99] transition-all duration-200 cursor-pointer flex items-center justify-between gap-2 group/row">
                    <div class="flex items-center gap-2 min-w-0">
                      <div class="w-7 h-7 rounded-lg bg-sky-50 border border-sky-200 flex items-center justify-center shrink-0 text-sky-600 group-hover/row:scale-110 group-hover/row:rotate-6 transition-all duration-200">
                        <span class="material-symbols-outlined text-[15px]">iron</span>
                      </div>
                      <div class="min-w-0">
                        <div class="flex items-center gap-1.5">
                          <span class="font-mono text-xs font-bold text-slate-900 group-hover/row:text-primary transition-colors">#LD-2842</span>
                          <span class="text-[11px] text-slate-700 font-medium truncate">Ibu Siti Aminah</span>
                        </div>
                        <div class="text-[10px] text-slate-500 truncate">Setrika Uap Wangi • 8.0 Kg</div>
                      </div>
                    </div>
                    <div class="text-right shrink-0 flex flex-col items-end">
                      <span class="px-2 py-0.5 bg-sky-50 text-sky-700 border border-sky-200 rounded-full text-[9px] font-medium inline-flex items-center gap-1 group-hover/row:bg-sky-100 transition-colors">
                        <span class="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse"></span> Setrika (Meja 2)
                      </span>
                      <span class="text-[10px] text-slate-600 font-mono font-semibold mt-0.5 group-hover/row:text-sky-700 transition-colors">Rp 48.000</span>
                    </div>
                  </div>

                  <!-- Order 3: Washing -->
                  <div class="mission-queue-row bg-white rounded-xl p-2.5 border border-slate-200/80 shadow-2xs hover:bg-amber-50/30 hover:border-amber-300 hover:scale-[1.01] hover:shadow-2xs active:scale-[0.99] transition-all duration-200 cursor-pointer flex items-center justify-between gap-2 group/row">
                    <div class="flex items-center gap-2 min-w-0">
                      <div class="w-7 h-7 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0 text-amber-600 group-hover/row:scale-110 group-hover/row:rotate-6 transition-all duration-200">
                        <span class="material-symbols-outlined text-[15px]">local_laundry_service</span>
                      </div>
                      <div class="min-w-0">
                        <div class="flex items-center gap-1.5">
                          <span class="font-mono text-xs font-bold text-slate-900 group-hover/row:text-primary transition-colors">#LD-2843</span>
                          <span class="text-[11px] text-slate-700 font-medium truncate">dr. Hendra</span>
                        </div>
                        <div class="text-[10px] text-slate-500 truncate">Cuci Bedcover Jumbo • 3 Pcs</div>
                      </div>
                    </div>
                    <div class="text-right shrink-0 flex flex-col items-end">
                      <span class="px-2 py-0.5 bg-amber-50 text-amber-700 border border-amber-200 rounded-full text-[9px] font-medium inline-flex items-center gap-1 group-hover/row:bg-amber-100 transition-colors">
                        <span class="w-1.5 h-1.5 rounded-full bg-amber-500"></span> Cuci (Mesin 03)
                      </span>
                      <span class="text-[10px] text-slate-600 font-mono font-semibold mt-0.5 group-hover/row:text-amber-700 transition-colors">Rp 75.000</span>
                    </div>
                  </div>

                  <!-- Order 4: Weighing -->
                  <div class="mission-queue-row bg-white/80 rounded-xl p-2.5 border border-slate-200/70 hover:bg-slate-50 hover:border-slate-300 hover:scale-[1.01] hover:shadow-2xs active:scale-[0.99] transition-all duration-200 cursor-pointer flex items-center justify-between gap-2 group/row">
                    <div class="flex items-center gap-2 min-w-0">
                      <div class="w-7 h-7 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0 text-slate-500 group-hover/row:scale-110 transition-all duration-200">
                        <span class="material-symbols-outlined text-[15px]">scale</span>
                      </div>
                      <div class="min-w-0">
                        <div class="flex items-center gap-1.5">
                          <span class="font-mono text-xs font-bold text-slate-700 group-hover/row:text-primary transition-colors">#LD-2844</span>
                          <span class="text-[11px] text-slate-700 font-medium truncate">Kafetaria Barokah</span>
                        </div>
                        <div class="text-[10px] text-slate-500 truncate">Seragam &amp; Linen • 18.4 Kg</div>
                      </div>
                    </div>
                    <div class="text-right shrink-0 flex flex-col items-end">
                      <span class="px-2 py-0.5 bg-slate-100 text-slate-600 border border-slate-200 rounded-full text-[9px] font-medium group-hover/row:bg-slate-200 transition-colors">
                        Antrian Timbang
                      </span>
                      <span class="text-[10px] text-slate-600 font-mono font-semibold mt-0.5 group-hover/row:text-slate-900 transition-colors">Rp 110.000</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Bottom Quick Actions Bar with tactile hover and active press states -->
              <div class="pt-3 mt-2 border-t border-slate-200/80 flex items-center gap-2">
                <button class="flex-1 py-2 px-3 bg-primary hover:bg-primary-hover hover:scale-[1.02] active:scale-95 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 cursor-pointer">
                  <span class="material-symbols-outlined text-[15px]">add_circle</span>
                  + Nota Baru (F2)
                </button>
                <button class="py-2 px-3 bg-white hover:bg-slate-50 hover:border-slate-300 hover:scale-[1.02] active:scale-95 text-slate-700 rounded-xl text-xs font-medium flex items-center justify-center gap-1.5 transition-all border border-slate-200 shadow-2xs cursor-pointer">
                  <span class="material-symbols-outlined text-[15px]">qr_code_scanner</span>
                  Scan QR
                </button>
                <button class="py-2 px-2.5 bg-white hover:bg-slate-50 hover:border-slate-300 hover:scale-[1.08] active:scale-95 text-slate-700 rounded-xl text-xs font-medium flex items-center justify-center transition-all border border-slate-200 shadow-2xs cursor-pointer" title="Cetak Label">
                  <span class="material-symbols-outlined text-[15px]">print</span>
                </button>
              </div>

            </div>
          </div>
        </div>

        <!-- Floating Glass Widget: Operational Efficiency Stats — Positioned at BOTTOM-LEFT of tablet chassis with Hero-style spring pop entrance & increased delay -->
        <div class="mission-floating-card-wrap absolute -left-5 sm:-left-8 lg:-left-12 -bottom-5 sm:-bottom-7 z-30 pointer-events-auto">
          <div
            use:idleFloat={{ y: 8, duration: 4.2 }}
            use:glareCard
            class="group bg-white/95 backdrop-blur-xl rounded-2xl p-4 sm:p-5 w-56 sm:w-60 shadow-[0_20px_45px_-10px_rgba(0,0,0,0.14),0_10px_20px_-5px_rgba(0,105,72,0.1)] border border-slate-200/80 cursor-default"
          >
            <div class="flex justify-between items-center mb-1.5">
              <span class="font-label-bold text-label-bold text-on-surface text-xs sm:text-sm transition-colors duration-200 group-hover:text-primary">Efisiensi Operasional</span>
              <span class="bg-surface-container/80 px-2 py-0.5 rounded-md text-[10px] text-text-muted font-medium flex items-center transition-all duration-200 group-hover:bg-primary/10 group-hover:text-primary hover:scale-105 cursor-pointer">
                Bulan Ini
              </span>
            </div>

            <div class="text-2xl sm:text-3xl font-bold text-primary mb-2.5 transition-all duration-300 group-hover:scale-105 group-hover:drop-shadow-[0_0_12px_rgba(0,105,72,0.4)] hover:drop-shadow-[0_0_16px_rgba(0,105,72,0.6)] origin-left cursor-pointer">
              <span class="mission-counter">94</span>.2%
            </div>

            <!-- Micro bar chart — dynamic vertical growth on reveal + interactive live tooltips & bar lift on hover -->
            <div class="flex items-end gap-1.5 h-8 pt-1">
              <div class="mission-bar origin-bottom flex-1 bg-primary/25 rounded-t-sm h-1/3 transition-all duration-200 hover:bg-primary hover:h-1/2 hover:scale-y-110 hover:shadow-[0_0_8px_rgba(0,105,72,0.35)] cursor-pointer group/bar relative" title="Senin">
                <span class="absolute -top-6 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[9px] font-mono px-1.5 py-0.5 rounded opacity-0 group-hover/bar:opacity-100 transition-opacity duration-150 pointer-events-none whitespace-nowrap shadow-md z-10">42%</span>
              </div>
              <div class="mission-bar origin-bottom flex-1 bg-primary/40 rounded-t-sm h-1/2 transition-all duration-200 hover:bg-primary hover:h-2/3 hover:scale-y-110 hover:shadow-[0_0_8px_rgba(0,105,72,0.35)] cursor-pointer group/bar relative" style="transition-delay:30ms" title="Selasa">
                <span class="absolute -top-6 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[9px] font-mono px-1.5 py-0.5 rounded opacity-0 group-hover/bar:opacity-100 transition-opacity duration-150 pointer-events-none whitespace-nowrap shadow-md z-10">65%</span>
              </div>
              <div class="mission-bar origin-bottom flex-1 bg-primary/60 rounded-t-sm h-2/3 transition-all duration-200 hover:bg-primary hover:h-3/4 hover:scale-y-110 hover:shadow-[0_0_8px_rgba(0,105,72,0.35)] cursor-pointer group/bar relative" style="transition-delay:60ms" title="Rabu">
                <span class="absolute -top-6 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[9px] font-mono px-1.5 py-0.5 rounded opacity-0 group-hover/bar:opacity-100 transition-opacity duration-150 pointer-events-none whitespace-nowrap shadow-md z-10">78%</span>
              </div>
              <div class="mission-bar origin-bottom flex-1 bg-primary/80 rounded-t-sm h-4/5 transition-all duration-200 hover:bg-primary hover:h-full hover:scale-y-110 hover:shadow-[0_0_10px_rgba(0,105,72,0.45)] cursor-pointer group/bar relative" style="transition-delay:90ms" title="Kamis">
                <span class="absolute -top-6 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[9px] font-mono px-1.5 py-0.5 rounded opacity-0 group-hover/bar:opacity-100 transition-opacity duration-150 pointer-events-none whitespace-nowrap shadow-md z-10">88%</span>
              </div>
              <div class="mission-bar origin-bottom flex-1 bg-primary rounded-t-sm h-full transition-all duration-200 hover:scale-y-110 hover:shadow-[0_0_12px_rgba(0,105,72,0.55)] cursor-pointer group/bar relative" style="transition-delay:120ms" title="Jumat">
                <span class="absolute -top-6 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[9px] font-mono px-1.5 py-0.5 rounded opacity-0 group-hover/bar:opacity-100 transition-opacity duration-150 pointer-events-none whitespace-nowrap shadow-md z-10">96%</span>
              </div>
              <div class="mission-bar origin-bottom flex-1 bg-primary/50 rounded-t-sm h-3/5 transition-all duration-200 hover:bg-primary hover:h-4/5 hover:scale-y-110 hover:shadow-[0_0_8px_rgba(0,105,72,0.35)] cursor-pointer group/bar relative" style="transition-delay:90ms" title="Sabtu">
                <span class="absolute -top-6 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[9px] font-mono px-1.5 py-0.5 rounded opacity-0 group-hover/bar:opacity-100 transition-opacity duration-150 pointer-events-none whitespace-nowrap shadow-md z-10">72%</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>

  </div>
</section>
