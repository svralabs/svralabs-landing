<script lang="ts">
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  import { isReducedMotion, sectionLayeredParallax, tilt3D } from '$lib/actions/gsapParallax';

  let workflowRoot: HTMLElement;
  let pinContainer: HTMLElement;
  let headlineEl: HTMLElement;

  onMount(() => {
    if (typeof window === 'undefined' || isReducedMotion()) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Entrance Choreography Timeline
      const entranceTl = gsap.timeline({
        scrollTrigger: {
          trigger: workflowRoot,
          start: 'top 52%',
          toggleActions: 'play none none reverse',
        },
        defaults: { ease: 'power3.out' },
      });

      // Kicker Badge: 3D Spring Drop with blur clear
      entranceTl.fromTo(
        '.workflow-kicker',
        { opacity: 0, y: -24, scale: 0.88, filter: 'blur(6px)' },
        { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', duration: 0.75, ease: 'back.out(1.6)' },
        0.05
      );

      // Kicker Star Icon Pop
      entranceTl.fromTo(
        '.workflow-kicker-icon',
        { scale: 0, rotate: -60 },
        { scale: 1, rotate: 0, duration: 0.55, ease: 'back.out(2.2)' },
        0.15
      );

      // Headline Masked Kinetic Words
      const words = headlineEl ? headlineEl.querySelectorAll('.workflow-word') : [];
      if (words.length > 0) {
        entranceTl.fromTo(
          words,
          { opacity: 0, y: '115%', filter: 'blur(8px)' },
          { opacity: 1, y: '0%', filter: 'blur(0px)', duration: 0.85, stagger: 0.035, ease: 'power3.out' },
          0.18
        );
      }

      // Accent Text ("beres sendiri.") Soft Emerald Bloom
      entranceTl.fromTo(
        '.workflow-accent-text',
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

      // Description Paragraph
      entranceTl.fromTo(
        '.workflow-desc',
        { opacity: 0, y: 22, filter: 'blur(6px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.7, ease: 'power2.out' },
        0.45
      );

      // Left Column Step 1 & Step 2 Text Cards
      entranceTl.fromTo(
        ['.workflow-step-1', '.workflow-step-2'],
        { opacity: 0, y: 35, filter: 'blur(6px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8, stagger: 0.15, ease: 'power2.out' },
        0.55
      );

      // Right Column Mockup Cards (3D Perspective Spring Entrance)
      entranceTl.fromTo(
        ['.workflow-mockup-1', '.workflow-mockup-2'],
        { opacity: 0, y: 60, scale: 0.90, rotateX: 10, filter: 'blur(8px)' },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          filter: 'blur(0px)',
          duration: 0.9,
          stagger: 0.18,
          ease: 'back.out(1.4)',
        },
        0.65
      );

      // 2. Interactive Scrubbed Visuals (Checkout items & growth chart bars)
      const isDesktop = window.innerWidth >= 1024;
      if (isDesktop) {
        const scrubTl = gsap.timeline({
          scrollTrigger: {
            trigger: pinContainer,
            start: 'top 52%',
            end: 'bottom 25%',
            scrub: 1,
            invalidateOnRefresh: true,
          }
        });

        // Step 1: Feature 1 active -> Highlight & pulse checkout button
        scrubTl.to('.workflow-item-cell', {
          backgroundColor: '#006948',
          color: '#ffffff',
          scale: 1.05,
          stagger: 0.08,
          duration: 0.6,
        })
        .to('.workflow-checkout-btn', {
          backgroundColor: '#005137',
          scale: 1.04,
          boxShadow: '0 10px 25px rgba(0, 105, 72, 0.4)',
          duration: 0.4
        }, '-=0.2')

        // Transition: Fade feature 1 slightly, reveal feature 2 with prominence
        .to('.workflow-step-1', {
          opacity: 0.35,
          y: -15,
          duration: 0.5
        })
        .to('.workflow-step-2', {
          opacity: 1,
          y: 0,
          duration: 0.5
        }, '<')

        // Step 2: Animate Report Chart bars growing +24% pop in (GPU scaleY with zero reflow)
        .fromTo('.report-bar-fill', {
          scaleY: 0.25,
          transformOrigin: 'bottom center'
        }, {
          scaleY: 1.0,
          stagger: 0.08,
          duration: 0.8,
          ease: 'power2.out'
        })
        .to('.growth-bubble', {
          scale: 1.15,
          opacity: 1,
          y: -8,
          duration: 0.4,
          ease: 'back.out(2)'
        });
      }
    }, workflowRoot);

    return () => ctx.revert();
  });
</script>

<section
  id="workflow"
  bind:this={workflowRoot}
  class="min-h-screen min-h-[100dvh] w-full relative flex flex-col justify-center items-center pt-28 pb-20 md:pt-36 md:pb-28 bg-surface overflow-hidden perspective-grid"
>
  <!-- Background Glow Layer (data-depth="bg") -->
  <div data-depth="bg" class="absolute inset-0 z-0 pointer-events-none opacity-30">
    <div class="absolute top-1/3 left-12 w-80 h-80 glow-orb-primary rounded-full"></div>
    <div class="absolute bottom-1/4 right-12 w-80 h-80 glow-orb-primary-fixed rounded-full"></div>
  </div>

  <!-- Section Depth Stage: Scales and fades smoothly for 3D page transitions -->
  <div class="section-depth-stage w-full max-w-7xl mx-auto px-6 md:px-8 flex flex-col justify-center relative z-10">
    
    <!-- Section Title (data-depth="content") -->
    <div data-depth="content" class="flex flex-col items-center text-center mb-16 md:mb-20">
      <!-- Kicker Badge with Spring Drop -->
      <div class="workflow-kicker inline-flex items-center space-x-2 bg-white/95 backdrop-blur-md px-4 py-1.5 rounded-full mb-6 border border-slate-200 shadow-[0_4px_14px_-2px_rgba(0,0,0,0.06)] select-none">
        <span class="workflow-kicker-icon material-symbols-outlined text-primary text-sm" style="font-variation-settings: 'FILL' 1;">star</span>
        <span class="font-label-sm text-label-sm uppercase tracking-widest text-primary font-label-bold">WORKFLOW KASIR</span>
      </div>

      <!-- Masked Kinetic Word Reveal Headline -->
      <h2
        bind:this={headlineEl}
        class="workflow-headline font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg max-w-3xl mb-4 tracking-tight text-on-surface"
      >
        <span class="inline-block overflow-hidden align-top"><span class="workflow-word inline-block">Kasir</span></span>
        <span class="inline-block overflow-hidden align-top"><span class="workflow-word inline-block">yang</span></span>
        <span class="inline-block overflow-hidden align-top"><span class="workflow-word inline-block">bikin</span></span>
        <span class="inline-block overflow-hidden align-top"><span class="workflow-word inline-block">antri</span></span>
        <span class="inline-block overflow-hidden align-top"><span class="workflow-word inline-block">cepat,</span></span>
        <br class="hidden md:block" />
        <span class="inline-block overflow-hidden align-top"><span class="workflow-word inline-block">laporan</span></span>
        <span class="inline-block overflow-hidden align-top"><span class="workflow-word inline-block italic text-primary font-light workflow-accent-text">beres</span></span>
        <span class="inline-block overflow-hidden align-top"><span class="workflow-word inline-block italic text-primary font-light workflow-accent-text">sendiri.</span></span>
      </h2>
      <p class="workflow-desc font-body-lg text-body-lg text-text-muted max-w-2xl mx-auto leading-relaxed">
        Alur kerja kasir terintegrasi dari input pesanan di kasir sampai otomatisasi rekap pembukuan harian.
      </p>
    </div>

    <!-- Pinned Content Container (data-depth="foreground") -->
    <div data-depth="foreground" bind:this={pinContainer} class="w-full">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

        <!-- Left Column: Story Steps Text -->
        <div class="flex flex-col gap-16">
          
          <!-- Step 1 Text -->
          <div class="workflow-step-1 transition-opacity duration-300">
            <span class="inline-block px-3.5 py-1 bg-primary-fixed text-on-primary-fixed rounded-full font-label-sm text-label-sm uppercase tracking-wider mb-5">
              01 · INTERFAS BERSIH
            </span>
            <h3 class="font-headline-md text-headline-md mb-4 text-on-surface">
              Antarmuka Kasir Intuitif
            </h3>
            <p class="font-body-md text-body-md text-text-muted mb-6 leading-relaxed">
              Desain layar kasir yang ramah pengguna, mudah dioperasikan tanpa pelatihan teknis rumit untuk staf baru.
            </p>

            <ul class="space-y-3.5">
              <li class="flex items-center gap-3 font-body-md text-on-surface">
                <span class="material-symbols-outlined text-success">check_circle</span>
                <span>Proses checkout lebih cepat, antrian tidak menumpuk</span>
              </li>
              <li class="flex items-center gap-3 font-body-md text-on-surface">
                <span class="material-symbols-outlined text-success">check_circle</span>
                <span>Mendukung berbagai metode pembayaran termasuk QRIS &amp; Tunai</span>
              </li>
            </ul>
          </div>

          <!-- Step 2 Text -->
          <div class="workflow-step-2 lg:opacity-60 transition-opacity duration-300">
            <span class="inline-block px-3.5 py-1 bg-primary-fixed text-on-primary-fixed rounded-full font-label-sm text-label-sm uppercase tracking-wider mb-5">
              02 · LEBIH CEPAT
            </span>
            <h3 class="font-headline-md text-headline-md mb-4 text-on-surface">
              Otomatisasi Laporan Harian
            </h3>
            <p class="font-body-md text-body-md text-text-muted mb-6 leading-relaxed">
              Alur kerja terintegrasi yang otomatis merekap penjualan, stok masuk, dan arus kas tiap tutup kedai tanpa input manual.
            </p>

            <ul class="space-y-3.5">
              <li class="flex items-center gap-3 font-body-md text-on-surface">
                <span class="material-symbols-outlined text-success">check_circle</span>
                <span>Integrasi data real-time antar shift kerja</span>
              </li>
              <li class="flex items-center gap-3 font-body-md text-on-surface">
                <span class="material-symbols-outlined text-success">check_circle</span>
                <span>Export instan ke PDF atau format Excel akuntansi</span>
              </li>
            </ul>
          </div>

        </div>

        <!-- Right Column: Interactive Mockup Stage (Scrubbed Visuals) -->
        <div class="relative w-full flex flex-col gap-8">
          
          <!-- Mockup 1: Checkout Interface Card -->
          <div
            use:tilt3D={{ maxTilt: 5, scale: 1.01 }}
            class="workflow-mockup-1 relative rounded-[28px] overflow-hidden bg-white border border-border-hairline shadow-[0_20px_50px_rgba(0,0,0,0.06)] p-6 md:p-8 will-change-transform"
          >
            <div class="w-full max-w-[340px] mx-auto bg-surface-container-lowest rounded-2xl p-5 border border-border-hairline shadow-sm">
              <div class="flex items-center justify-between mb-5 pb-3 border-b border-border-hairline">
                <div class="flex items-center space-x-3">
                  <div class="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                    <span class="material-symbols-outlined text-[20px]">point_of_sale</span>
                  </div>
                  <div>
                    <div class="h-3 w-24 bg-surface-dim rounded mb-1.5"></div>
                    <div class="h-2 w-14 bg-surface-container rounded"></div>
                  </div>
                </div>
                <div class="h-7 w-16 bg-primary/15 rounded-full flex items-center justify-center text-primary font-bold text-[11px]">MEJA 04</div>
              </div>

              <div class="grid grid-cols-3 gap-2.5 mb-5">
                {#each [1,2,3,4,5,6] as i}
                  <div class="workflow-item-cell h-14 bg-surface-container rounded-xl flex items-center justify-center text-text-muted transition-colors duration-300">
                    <span class="material-symbols-outlined text-[18px]">local_cafe</span>
                  </div>
                {/each}
              </div>

              <button class="workflow-checkout-btn w-full bg-primary text-on-primary py-3 rounded-xl font-label-bold text-sm shadow-md transition-colors duration-300 cursor-pointer">
                Checkout Transaksi
              </button>
            </div>
          </div>

          <!-- Mockup 2: Scrubbed Growth Chart -->
          <div
            use:tilt3D={{ maxTilt: 5, scale: 1.01 }}
            class="workflow-mockup-2 relative rounded-[28px] overflow-hidden bg-white border border-border-hairline shadow-[0_20px_50px_rgba(0,0,0,0.06)] p-6 md:p-8 will-change-transform"
          >
            <div class="flex items-center justify-between mb-4">
              <span class="font-label-bold text-sm text-on-surface">Grafik Efisiensi Transaksi</span>
              <span class="growth-bubble bg-primary text-on-primary text-xs font-label-bold px-3 py-1 rounded-full shadow opacity-90">
                +24% Lebih Cepat
              </span>
            </div>

            <div class="w-full h-36 flex items-end justify-between gap-3 pt-4 border-b border-border-hairline pb-2">
              <div class="flex-1 flex flex-col items-center gap-1.5">
                <div class="report-bar-fill w-full bg-surface-container rounded-t-lg" style="height: 35%; transform-origin: bottom center;"></div>
                <span class="text-[10px] text-text-muted">Sen</span>
              </div>
              <div class="flex-1 flex flex-col items-center gap-1.5">
                <div class="report-bar-fill w-full bg-surface-container rounded-t-lg" style="height: 50%; transform-origin: bottom center;"></div>
                <span class="text-[10px] text-text-muted">Sel</span>
              </div>
              <div class="flex-1 flex flex-col items-center gap-1.5">
                <div class="report-bar-fill w-full bg-primary/40 rounded-t-lg" style="height: 70%; transform-origin: bottom center;"></div>
                <span class="text-[10px] text-text-muted">Rab</span>
              </div>
              <div class="flex-1 flex flex-col items-center gap-1.5">
                <div class="report-bar-fill w-full bg-primary rounded-t-lg shadow-[0_0_15px_rgba(0,105,72,0.3)]" style="height: 95%; transform-origin: bottom center;"></div>
                <span class="text-[10px] text-primary font-bold">Kam</span>
              </div>
              <div class="flex-1 flex flex-col items-center gap-1.5">
                <div class="report-bar-fill w-full bg-surface-container rounded-t-lg" style="height: 60%; transform-origin: bottom center;"></div>
                <span class="text-[10px] text-text-muted">Jum</span>
              </div>
              <div class="flex-1 flex flex-col items-center gap-1.5">
                <div class="report-bar-fill w-full bg-surface-container rounded-t-lg" style="height: 75%; transform-origin: bottom center;"></div>
                <span class="text-[10px] text-text-muted">Sab</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  </div>
</section>
