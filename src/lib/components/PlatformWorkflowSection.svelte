<script lang="ts">
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  import { isReducedMotion, sectionLayeredParallax, tilt3D } from '$lib/actions/gsapParallax';

  let workflowRoot: HTMLElement;
  let pinContainer: HTMLElement;
  let headlineEl: HTMLElement;

  const workflowChartBars = [
    { day: 'Sen', pct: 38, value: '18 dtk', active: false, mid: false },
    { day: 'Sel', pct: 54, value: '15 dtk', active: false, mid: false },
    { day: 'Rab', pct: 72, value: '13 dtk', active: false, mid: true },
    { day: 'Kam', pct: 96, value: '10 dtk', active: true, mid: false },
    { day: 'Jum', pct: 64, value: '14 dtk', active: false, mid: false },
    { day: 'Sab', pct: 80, value: '11 dtk', active: false, mid: true }
  ];

  const menuCells = [
    { icon: 'local_cafe', label: 'Es Kopi' },
    { icon: 'coffee', label: 'Americano' },
    { icon: 'bakery_dining', label: 'Croissant' },
    { icon: 'local_drink', label: 'Matcha' },
    { icon: 'lunch_dining', label: 'Toast' },
    { icon: 'receipt_long', label: 'Paket' }
  ];

  onMount(() => {
    if (typeof window === 'undefined' || isReducedMotion()) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Entrance Choreography Timeline (Scroll-triggered when section enters viewport)
      const entranceTl = gsap.timeline({
        scrollTrigger: {
          trigger: workflowRoot,
          start: 'top 82%',
          toggleActions: 'play none none none',
          once: true,
        },
        defaults: { ease: 'power2.out' },
      });

      entranceTl.fromTo(
        '.workflow-kicker',
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.5 },
        0.05
      );

      entranceTl.fromTo(
        '.workflow-kicker-icon',
        { opacity: 0, scale: 0.7 },
        { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(1.8)' },
        0.1
      );

      const words = headlineEl ? headlineEl.querySelectorAll('.workflow-word') : [];
      if (words.length > 0) {
        entranceTl.fromTo(
          words,
          { opacity: 0, y: '115%' },
          { opacity: 1, y: '0%', duration: 0.75, stagger: 0.03, ease: 'power3.out' },
          0.14
        );
      }

      entranceTl.fromTo(
        '.workflow-accent-text',
        { scale: 0.96 },
        { scale: 1, duration: 0.55, ease: 'back.out(1.5)' },
        0.45
      );

      entranceTl.fromTo(
        '.workflow-desc',
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.6 },
        0.35
      );

      entranceTl.fromTo(
        ['.workflow-step-1', '.workflow-step-2'],
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.14 },
        0.42
      );

      entranceTl.fromTo(
        ['.workflow-mockup-1', '.workflow-mockup-2'],
        { opacity: 0, y: 45, scale: 0.94, rotateX: 8 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.16,
          ease: 'back.out(1.3)',
        },
        0.5
      );

      // Grow all chart bars cleanly on entrance (works on mobile & desktop!)
      entranceTl.fromTo(
        '.report-bar-fill',
        { scaleY: 0, opacity: 0.3 },
        {
          scaleY: 1,
          opacity: 1,
          stagger: 0.07,
          duration: 0.7,
          ease: 'back.out(1.4)',
        },
        0.75
      );

      entranceTl.fromTo(
        '.growth-bubble',
        { scale: 0.75, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.8)' },
        0.9
      );

      // 2. Desktop Scrubbed Interaction (Checkout menu selection progression + step emphasis)
      if (window.innerWidth >= 1024) {
        const scrubTl = gsap.timeline({
          scrollTrigger: {
            trigger: pinContainer,
            start: 'top 62%',
            end: 'bottom 35%',
            scrub: 0.8,
            invalidateOnRefresh: true,
          }
        });

        scrubTl
          .to('.workflow-item-cell', {
            backgroundColor: '#006948',
            color: '#ffffff',
            scale: 1.04,
            stagger: 0.08,
            duration: 0.6,
          })
          .to(
            '.workflow-checkout-btn',
            {
              backgroundColor: '#005137',
              scale: 1.03,
              duration: 0.35
            },
            '-=0.2'
          )
          .to('.workflow-step-1', {
            opacity: 0.45,
            y: -8,
            duration: 0.45
          })
          .to(
            '.workflow-step-2',
            {
              opacity: 1,
              y: 0,
              duration: 0.45
            },
            '<'
          )
          .to('.growth-bubble', {
            scale: 1.08,
            y: -3,
            duration: 0.4,
            ease: 'power2.out'
          });
      }
    }, workflowRoot);

    return () => ctx.revert();
  });
</script>

<section
  id="workflow"
  bind:this={workflowRoot}
  use:sectionLayeredParallax={{ bgSpeed: 0.45, contentSpeed: 0.18, fgSpeed: -0.3 }}
  class="w-full relative flex flex-col justify-center items-center py-16 md:py-24 bg-surface overflow-hidden perspective-grid"
>
  <!-- Background Glow Layer (data-depth="bg") -->
  <div data-depth="bg" class="absolute inset-0 z-0 pointer-events-none opacity-30">
    <div class="absolute top-1/3 left-12 w-80 h-80 glow-orb-primary rounded-full"></div>
    <div class="absolute bottom-1/4 right-12 w-80 h-80 glow-orb-primary-fixed rounded-full"></div>
  </div>

  <!-- Section Depth Stage -->
  <div class="section-depth-stage w-full max-w-6xl mx-auto px-6 md:px-gutter flex flex-col justify-center relative z-10">
    
    <!-- Section Title (data-depth="content") -->
    <div data-depth="content" class="flex flex-col items-center text-center mb-10 md:mb-14">
      <div class="workflow-kicker inline-flex items-center space-x-2 bg-white px-4 py-1.5 rounded-full mb-4 border border-slate-200 shadow-[0_4px_14px_-2px_rgba(0,0,0,0.06)] select-none">
        <span class="workflow-kicker-icon material-symbols-outlined text-primary text-sm" style="font-variation-settings: 'FILL' 1;">star</span>
        <span class="font-label-sm text-label-sm uppercase tracking-widest text-primary font-label-bold">ALUR KERJA KASIR</span>
      </div>

      <h2
        bind:this={headlineEl}
        class="workflow-headline font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg max-w-3xl mb-4 tracking-tight text-on-surface"
      >
        <span class="inline-block overflow-hidden align-top"><span class="workflow-word inline-block">Kasir</span></span>
        <span class="inline-block overflow-hidden align-top"><span class="workflow-word inline-block">yang</span></span>
        <span class="inline-block overflow-hidden align-top"><span class="workflow-word inline-block">bikin</span></span>
        <span class="inline-block overflow-hidden align-top"><span class="workflow-word inline-block">antrean</span></span>
        <span class="inline-block overflow-hidden align-top"><span class="workflow-word inline-block">cepat,</span></span>
        <br class="hidden md:block" />
        <span class="inline-block overflow-hidden align-top"><span class="workflow-word inline-block">laporan</span></span>
        <span class="inline-block overflow-hidden align-top"><span class="workflow-word inline-block italic text-primary font-light workflow-accent-text">beres</span></span>
        <span class="inline-block overflow-hidden align-top"><span class="workflow-word inline-block italic text-primary font-light workflow-accent-text">sendiri.</span></span>
      </h2>
      <p class="workflow-desc font-body-lg text-body-lg text-text-muted max-w-2xl mx-auto leading-relaxed">
        Alur kerja terintegrasi dari input pesanan di meja kasir hingga otomatisasi rekap pembukuan harian.
      </p>
    </div>

    <!-- Content Container (data-depth="foreground") -->
    <div data-depth="foreground" bind:this={pinContainer} class="w-full">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">

        <!-- Left Column: Story Steps Text -->
        <div class="flex flex-col gap-10">
          
          <!-- Step 1 Text -->
          <div class="workflow-step-1 transition-opacity duration-300">
            <span class="inline-block px-3.5 py-1 bg-primary-fixed text-on-primary-fixed rounded-full font-label-sm text-label-sm uppercase tracking-wider mb-5">
              01 · TAMPILAN BERSIH
            </span>
            <h3 class="font-headline-md text-headline-md mb-4 text-on-surface">
              Layar Kasir Gampang Dipakai
            </h3>
            <p class="font-body-md text-body-md text-text-muted mb-6 leading-relaxed">
              Tata letak kasir yang sederhana dan jelas, langsung dipahami kasir baru tanpa pelatihan teknis berhari-hari.
            </p>

            <ul class="space-y-3.5">
              <li class="flex items-center gap-3 font-body-md text-on-surface">
                <span class="material-symbols-outlined text-success">check_circle</span>
                <span>Checkout lebih cepat, antrean kasir gak menumpuk</span>
              </li>
              <li class="flex items-center gap-3 font-body-md text-on-surface">
                <span class="material-symbols-outlined text-success">check_circle</span>
                <span>Terima tunai, QRIS, maupun transfer tanpa input dua kali</span>
              </li>
            </ul>
          </div>

          <!-- Step 2 Text -->
          <div class="workflow-step-2 lg:opacity-70 transition-opacity duration-300">
            <span class="inline-block px-3.5 py-1 bg-primary-fixed text-on-primary-fixed rounded-full font-label-sm text-label-sm uppercase tracking-wider mb-5">
              02 · REKAP OTOMATIS
            </span>
            <h3 class="font-headline-md text-headline-md mb-4 text-on-surface">
              Laporan Harian Jadi Otomatis
            </h3>
            <p class="font-body-md text-body-md text-text-muted mb-6 leading-relaxed">
              Setiap transaksi otomatis memotong stok bahan dan merangkum pemasukan harian saat tutup toko, tanpa lembur hitung nota.
            </p>

            <ul class="space-y-3.5">
              <li class="flex items-center gap-3 font-body-md text-on-surface">
                <span class="material-symbols-outlined text-success">check_circle</span>
                <span>Rekonsiliasi pergantian shift kasir langsung cocok</span>
              </li>
              <li class="flex items-center gap-3 font-body-md text-on-surface">
                <span class="material-symbols-outlined text-success">check_circle</span>
                <span>Unduh rekap PDF atau Excel pembukuan dalam sekali klik</span>
              </li>
            </ul>
          </div>

        </div>

        <!-- Right Column: Interactive Mockup Stage -->
        <div class="relative w-full flex flex-col gap-6">
          
          <!-- Mockup 1: Checkout Interface Card -->
          <div
            use:tilt3D={{ maxTilt: 4, scale: 1.01 }}
            class="workflow-mockup-1 relative rounded-[24px] overflow-hidden bg-white border border-border-hairline shadow-[0_20px_50px_rgba(0,0,0,0.06)] p-5 md:p-6 will-change-transform"
          >
            <div class="w-full max-w-[340px] mx-auto bg-surface-container-lowest rounded-2xl p-4 border border-border-hairline shadow-sm">
              <div class="flex items-center justify-between mb-4 pb-2.5 border-b border-border-hairline">
                <div class="flex items-center space-x-3">
                  <div class="w-9 h-9 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                    <span class="material-symbols-outlined text-[18px]">point_of_sale</span>
                  </div>
                  <div class="text-left">
                    <p class="font-label-bold text-xs text-on-surface leading-tight">Kedai Kopi Seruni</p>
                    <p class="font-label-sm text-[10px] text-text-muted">Shift Sore · Kasir 01</p>
                  </div>
                </div>
                <div class="h-6 px-2.5 bg-primary/15 rounded-full flex items-center justify-center text-primary font-bold text-[10px]">MEJA 04</div>
              </div>

              <div class="grid grid-cols-3 gap-2 mb-4">
                {#each menuCells as cell}
                  <div class="workflow-item-cell h-12 bg-surface-container rounded-xl flex flex-col items-center justify-center gap-0.5 text-on-surface-variant hover:bg-primary/15 hover:text-primary transition-colors duration-200 cursor-pointer">
                    <span class="material-symbols-outlined text-[16px]">{cell.icon}</span>
                    <span class="text-[9px] font-label-bold">{cell.label}</span>
                  </div>
                {/each}
              </div>

              <button type="button" class="workflow-checkout-btn w-full bg-primary text-on-primary py-2.5 rounded-xl font-label-bold text-xs sm:text-sm shadow-md transition-colors duration-300 cursor-pointer flex items-center justify-center gap-2">
                <span>Checkout Transaksi</span>
                <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
          </div>

          <!-- Mockup 2: Velocity Efficiency Growth Chart (Fixed Concrete Container Heights) -->
          <div
            use:tilt3D={{ maxTilt: 4, scale: 1.01 }}
            class="workflow-mockup-2 relative rounded-[24px] overflow-hidden bg-white border border-border-hairline shadow-[0_20px_50px_rgba(0,0,0,0.06)] p-5 md:p-6 will-change-transform"
          >
            <div class="flex items-center justify-between mb-3 gap-2">
              <div>
                <span class="font-label-bold text-sm text-on-surface block">Grafik Efisiensi Transaksi</span>
                <span class="font-label-sm text-[11px] text-text-muted">Rata-rata kecepatan layanan kasir mingguan</span>
              </div>
              <span class="growth-bubble bg-primary text-on-primary text-xs font-label-bold px-3 py-1 rounded-full shadow-sm shrink-0">
                +24% Lebih Cepat
              </span>
            </div>

            <div class="w-full h-36 flex items-end justify-between gap-2.5 sm:gap-3 pt-3 border-b border-border-hairline pb-2">
              {#each workflowChartBars as bar}
                <div class="flex-1 h-full flex flex-col items-center justify-end gap-1.5 group/wbar cursor-pointer relative">
                  <span class="opacity-0 group-hover/wbar:opacity-100 transition-opacity duration-150 bg-on-surface text-surface text-[9px] font-mono px-1.5 py-0.5 rounded shadow-sm whitespace-nowrap pointer-events-none">
                    {bar.value}
                  </span>
                  <div class="w-full flex-1 flex items-end min-h-0">
                    <div
                      class="report-bar-fill w-full rounded-t-lg origin-bottom transition-colors duration-200 {bar.active
                        ? 'bg-primary shadow-[0_0_16px_rgba(0,105,72,0.3)]'
                        : bar.mid
                          ? 'bg-primary/45 group-hover/wbar:bg-primary/75'
                          : 'bg-surface-container group-hover/wbar:bg-primary/30'}"
                      style="height: {bar.pct}%; transform-origin: bottom center;"
                    ></div>
                  </div>
                  <span class="text-[10px] font-label-sm {bar.active ? 'text-primary font-bold' : 'text-text-muted'}">{bar.day}</span>
                </div>
              {/each}
            </div>
          </div>

        </div>

      </div>
    </div>
  </div>
</section>