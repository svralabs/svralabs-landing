<script lang="ts">
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  import { tilt3D, sectionLayeredParallax, isReducedMotion, magneticButton } from '$lib/actions/gsapParallax';

  let caseRoot: HTMLElement;
  let headlineEl: HTMLElement;

  onMount(() => {
    if (typeof window === 'undefined' || isReducedMotion()) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const entranceTl = gsap.timeline({
        scrollTrigger: {
          trigger: caseRoot,
          start: 'top 80%',
          toggleActions: 'play none none none',
          once: true,
        },
        defaults: { ease: 'power2.out' },
      });

      // 1. Kicker Badge: Smooth Fade & Subtle Rise
      entranceTl.fromTo(
        '.case-kicker',
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out' },
        0.05
      );

      // 2. Icon Fade & Settle
      entranceTl.fromTo(
        '.case-kicker-icon',
        { opacity: 0, scale: 0.85 },
        { opacity: 1, scale: 1, duration: 0.4, ease: 'power2.out' },
        0.12
      );

      // 3. Headline Masked Kinetic Words
      const words = headlineEl ? headlineEl.querySelectorAll('.case-word') : [];
      if (words.length > 0) {
        entranceTl.fromTo(
          words,
          { opacity: 0, y: '115%' },
          { opacity: 1, y: '0%', duration: 0.85, stagger: 0.035, ease: 'power3.out' },
          0.18
        );
      }

      // 4. Accent Text Smooth Scale Pulse
      entranceTl.fromTo(
        '.case-accent-text',
        { scale: 0.96 },
        { scale: 1, duration: 0.55, ease: 'back.out(1.5)' },
        0.48
      );

      // 5. Description Paragraph
      entranceTl.fromTo(
        '.case-desc',
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
        0.45
      );

      // 6. 2 Case Study Cards: 3D Perspective Spring Rise
      entranceTl.fromTo(
        '.case-card',
        { opacity: 0, y: 65, scale: 0.90, rotateX: 10 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          duration: 0.9,
          stagger: 0.16,
          ease: 'back.out(1.4)',
        },
        0.55
      );
    }, caseRoot);

    return () => ctx.revert();
  });
</script>

<section
  id="portofolio"
  bind:this={caseRoot}
  use:sectionLayeredParallax={{ bgSpeed: 0.45, contentSpeed: 0.16, fgSpeed: -0.28 }}
  class="min-h-screen min-h-[100dvh] w-full relative flex flex-col justify-center items-center pt-28 pb-20 md:pt-36 md:pb-28 bg-surface overflow-hidden perspective-grid"
>
  <!-- Background Layer (data-depth="bg") -->
  <div data-depth="bg" class="absolute inset-0 z-0 pointer-events-none opacity-30">
    <div class="absolute top-1/4 left-1/4 w-80 h-80 glow-orb-primary rounded-full"></div>
    <div class="absolute bottom-16 right-1/4 w-80 h-80 glow-orb-primary-fixed rounded-full"></div>
  </div>

  <!-- Section Depth Stage: Scales and fades smoothly for 3D page transitions -->
  <div class="section-depth-stage w-full max-w-7xl mx-auto flex flex-col justify-center relative z-10">
    
    <!-- Header (data-depth="content") -->
    <div data-depth="content" class="text-center mb-16 md:mb-20">
      <!-- Kicker Badge with Spring Drop -->
      <div class="case-kicker inline-flex items-center space-x-2 bg-white px-4 py-1.5 rounded-full mb-6 border border-slate-200 shadow-[0_4px_14px_-2px_rgba(0,0,0,0.06)] select-none">
        <span class="case-kicker-icon material-symbols-outlined text-primary text-sm" style="font-variation-settings: 'FILL' 1;">folder_special</span>
        <span class="font-label-sm text-label-sm uppercase tracking-wider text-primary font-label-bold">PORTOFOLIO NYATA &amp; LIVE DEMO</span>
      </div>

      <!-- Masked Kinetic Word Reveal Headline -->
      <h2
        bind:this={headlineEl}
        class="case-headline font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg text-on-surface max-w-3xl mx-auto tracking-tight"
      >
        <span class="inline-block overflow-hidden align-top"><span class="case-word inline-block">Sistem</span></span>
        <span class="inline-block overflow-hidden align-top"><span class="case-word inline-block">yang</span></span>
        <span class="inline-block overflow-hidden align-top"><span class="case-word inline-block">sudah</span></span>
        <span class="inline-block overflow-hidden align-top"><span class="case-word inline-block">jalan</span></span>
        <span class="inline-block overflow-hidden align-top"><span class="case-word inline-block">—</span></span>
        <br class="hidden md:block" />
        <span class="inline-block overflow-hidden align-top"><span class="case-word inline-block italic text-primary font-light case-accent-text">bukan</span></span>
        <span class="inline-block overflow-hidden align-top"><span class="case-word inline-block italic text-primary font-light case-accent-text">sekadar</span></span>
        <span class="inline-block overflow-hidden align-top"><span class="case-word inline-block italic text-primary font-light case-accent-text">konsep.</span></span>
      </h2>
      <p class="case-desc font-body-lg text-body-lg text-text-muted mt-4 max-w-2xl mx-auto leading-relaxed">
        Setiap sistem yang kami tampilkan sudah teruji langsung di lapangan dan memberi dampak terukur bagi bisnis klien.
      </p>
    </div>

    <!-- Case Studies Grid with High-Fidelity Browser Mockups & Agency Summary Cards (data-depth="foreground") -->
    <div data-depth="foreground" class="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 perspective-grid">
      
      <!-- Project 1: Puskesmas Wonokerto -->
      <article
        use:tilt3D={{ maxTilt: 3.5, perspective: 1100, glare: true }}
        class="case-card bg-white rounded-[32px] border border-border-hairline overflow-hidden flex flex-col justify-between shadow-[0_15px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_25px_60px_rgba(0,105,72,0.12)] transition-[box-shadow,border-color] duration-300 group hover:border-primary/40 will-change-transform"
      >
        <div>
          <!-- High-Fidelity Browser Window Frame Mockup -->
          <div class="w-full bg-slate-900 border-b border-border-hairline overflow-hidden flex flex-col">
            <!-- Sleek Browser Chrome Title Bar -->
            <div class="px-4 py-2.5 bg-slate-950 flex items-center justify-between border-b border-white/10 select-none">
              <!-- Traffic Light Dots -->
              <div class="flex items-center gap-1.5">
                <span class="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block"></span>
                <span class="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block"></span>
                <span class="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block"></span>
              </div>

              <!-- Browser URL Bar -->
              <div class="flex-1 max-w-xs mx-auto bg-white/10 rounded-full px-3 py-1 flex items-center justify-center gap-1.5 text-[10px] text-white/70 font-mono">
                <span class="material-symbols-outlined text-[11px] text-emerald-400">lock</span>
                <span class="truncate">simpus.wonokerto.svralabs.id</span>
              </div>

              <!-- Sector Badge -->
              <span class="text-[9px] font-label-bold text-emerald-400 bg-emerald-500/15 border border-emerald-400/30 px-2 py-0.5 rounded-full">
                Instansi Faskes
              </span>
            </div>

            <!-- Authentic Full Screenshot with Soft Overlay & Hover Zoom -->
            <div class="relative aspect-[16/10] w-full overflow-hidden bg-slate-950 group">
              <img
                src="/puskesmas wonokerto/Tangkapan Layar 2026-08-07 pukul 22.04.52.webp"
                alt="Sistem Rekam Medis EMR Puskesmas Wonokerto"
                class="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-500"
                loading="lazy"
                decoding="async"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none"></div>
              
              <!-- Bottom Pill Overlay inside Screenshot -->
              <div class="absolute bottom-3 left-4 right-4 flex items-center justify-between z-10">
                <div class="flex items-center gap-2 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-white/15">
                  <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span class="text-[10px] text-white font-label-bold">Sistem Aktif Berjalan di Poli</span>
                </div>
                <span class="text-[10px] font-mono text-white/80 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
                  SATUSEHAT Ready
                </span>
              </div>
            </div>
          </div>

          <!-- Agency Project Summary Body -->
          <div class="p-6 md:p-8">
            <!-- Client Identity Header -->
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 shadow-2xs">
                  <span class="material-symbols-outlined text-[22px]">local_hospital</span>
                </div>
                <div>
                  <div class="font-headline-md text-sm sm:text-base font-bold text-on-surface">Puskesmas Wonokerto</div>
                  <p class="font-body-md text-xs text-text-muted">Kabupaten Pekalongan · Faskes Tingkat 1</p>
                </div>
              </div>
              <span class="inline-flex items-center gap-1 text-[10px] font-label-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                Klien Terverifikasi
              </span>
            </div>

            <!-- Title & Pitch -->
            <h3 class="font-headline-md text-lg sm:text-xl font-bold text-on-surface mb-2.5 group-hover:text-primary transition-colors leading-snug">
              SIMPUS &amp; Rekam Medis Elektronik (EMR) Terintegrasi
            </h3>
            <p class="font-body-md text-xs sm:text-sm text-text-muted mb-6 leading-relaxed">
              Menggantikan tumpukan berkas manual dengan sistem antrian layar poli digital, arsip rekam medis tersentral, dan persiapan bridging SATUSEHAT Kemenkes RI.
            </p>

            <!-- Key Metric Chips -->
            <div class="grid grid-cols-3 gap-2.5 p-3.5 bg-surface-container-lowest rounded-2xl border border-border-hairline mb-6">
              <div class="text-center">
                <p class="text-base sm:text-lg font-bold text-primary font-mono">100%</p>
                <p class="text-[10px] text-text-muted uppercase tracking-tight font-label-bold">Paperless EMR</p>
              </div>
              <div class="text-center border-x border-border-hairline/80 px-1">
                <p class="text-base sm:text-lg font-bold text-on-surface font-mono">&lt; 2 Menit</p>
                <p class="text-[10px] text-text-muted uppercase tracking-tight font-label-bold">Cari Berkas</p>
              </div>
              <div class="text-center">
                <p class="text-base sm:text-lg font-bold text-emerald-600 font-mono">Real-Time</p>
                <p class="text-[10px] text-text-muted uppercase tracking-tight font-label-bold">Antrian Layar</p>
              </div>
            </div>

            <!-- Tech Stack Tags -->
            <div class="flex flex-wrap items-center gap-1.5 text-[10px] font-mono text-text-muted">
              <span class="px-2.5 py-1 rounded-lg bg-surface border border-border-hairline">SvelteKit</span>
              <span class="px-2.5 py-1 rounded-lg bg-surface border border-border-hairline">TypeScript</span>
              <span class="px-2.5 py-1 rounded-lg bg-surface border border-border-hairline">PostgreSQL</span>
              <span class="px-2.5 py-1 rounded-lg bg-surface border border-border-hairline">TailwindCSS</span>
            </div>
          </div>
        </div>

        <!-- Action Link Footer -->
        <div class="p-6 md:p-8 pt-0 border-t border-border-hairline/60 flex items-center justify-between">
          <a
            href="/project/puskesmas-wonokerto"
            class="inline-flex items-center gap-2 text-primary font-label-bold text-xs sm:text-sm hover:gap-3 transition-all duration-300 group-hover:text-primary-container"
          >
            <span>Pelajari Studi Kasus &amp; Alur Sistem</span>
            <span class="material-symbols-outlined text-[18px]">arrow_forward</span>
          </a>
        </div>
      </article>

      <!-- Project 2: Toko Konveksi Wonopringgo -->
      <article
        use:tilt3D={{ maxTilt: 3.5, perspective: 1100, glare: true }}
        class="case-card bg-white rounded-[32px] border border-border-hairline overflow-hidden flex flex-col justify-between shadow-[0_15px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_25px_60px_rgba(0,105,72,0.12)] transition-[box-shadow,border-color] duration-300 group hover:border-primary/40 will-change-transform"
      >
        <div>
          <!-- High-Fidelity Browser Window Frame Mockup -->
          <div class="w-full bg-slate-900 border-b border-border-hairline overflow-hidden flex flex-col">
            <!-- Sleek Browser Chrome Title Bar -->
            <div class="px-4 py-2.5 bg-slate-950 flex items-center justify-between border-b border-white/10 select-none">
              <!-- Traffic Light Dots -->
              <div class="flex items-center gap-1.5">
                <span class="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block"></span>
                <span class="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block"></span>
                <span class="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block"></span>
              </div>

              <!-- Browser URL Bar -->
              <div class="flex-1 max-w-xs mx-auto bg-white/10 rounded-full px-3 py-1 flex items-center justify-center gap-1.5 text-[10px] text-white/70 font-mono">
                <span class="material-symbols-outlined text-[11px] text-blue-400">lock</span>
                <span class="truncate">pos.wonopringgo.svralabs.id</span>
              </div>

              <!-- Sector Badge -->
              <span class="text-[9px] font-label-bold text-blue-400 bg-blue-500/15 border border-blue-400/30 px-2 py-0.5 rounded-full">
                Garmen &amp; Wholesale
              </span>
            </div>

            <!-- Authentic Full Screenshot with Soft Overlay & Hover Zoom -->
            <div class="relative aspect-[16/10] w-full overflow-hidden bg-slate-950 group">
              <img
                src="/toko konveksi wonopringgo/Tangkapan Layar 2026-08-09 pukul 00.24.23.webp"
                alt="Sistem POS Multi-Gudang Toko Konveksi Wonopringgo"
                class="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-500"
                loading="lazy"
                decoding="async"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none"></div>
              
              <!-- Bottom Pill Overlay inside Screenshot -->
              <div class="absolute bottom-3 left-4 right-4 flex items-center justify-between z-10">
                <div class="flex items-center gap-2 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-white/15">
                  <span class="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></span>
                  <span class="text-[10px] text-white font-label-bold">Kasir Online &amp; Multi-Gudang</span>
                </div>
                <span class="text-[10px] font-mono text-white/80 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
                  Surat Jalan Otomatis
                </span>
              </div>
            </div>
          </div>

          <!-- Agency Project Summary Body -->
          <div class="p-6 md:p-8">
            <!-- Client Identity Header -->
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700 shadow-2xs">
                  <span class="material-symbols-outlined text-[22px]">inventory_2</span>
                </div>
                <div>
                  <div class="font-headline-md text-sm sm:text-base font-bold text-on-surface">Toko Konveksi Wonopringgo</div>
                  <p class="font-body-md text-xs text-text-muted">Pusat Grosir Tekstil &amp; Celana Chino</p>
                </div>
              </div>
              <span class="inline-flex items-center gap-1 text-[10px] font-label-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
                <span class="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                Klien Terverifikasi
              </span>
            </div>

            <!-- Title & Pitch -->
            <h3 class="font-headline-md text-lg sm:text-xl font-bold text-on-surface mb-2.5 group-hover:text-primary transition-colors leading-snug">
              POS Grosir &amp; Sistem Manajemen Multi-Gudang Bahan
            </h3>
            <p class="font-body-md text-xs sm:text-sm text-text-muted mb-6 leading-relaxed">
              Pencatatan ribuan yard kain katun, pemotongan stok otomatis saat penjualan partai besar, dan pencetakan nota &amp; surat jalan ekspedisi instan.
            </p>

            <!-- Key Metric Chips -->
            <div class="grid grid-cols-3 gap-2.5 p-3.5 bg-surface-container-lowest rounded-2xl border border-border-hairline mb-6">
              <div class="text-center">
                <p class="text-base sm:text-lg font-bold text-blue-700 font-mono">0 Selisih</p>
                <p class="text-[10px] text-text-muted uppercase tracking-tight font-label-bold">Audit Stok</p>
              </div>
              <div class="text-center border-x border-border-hairline/80 px-1">
                <p class="text-base sm:text-lg font-bold text-on-surface font-mono">1.400+ Yd</p>
                <p class="text-[10px] text-text-muted uppercase tracking-tight font-label-bold">Bahan Terlacak</p>
              </div>
              <div class="text-center">
                <p class="text-base sm:text-lg font-bold text-primary font-mono">Otomatis</p>
                <p class="text-[10px] text-text-muted uppercase tracking-tight font-label-bold">Surat Jalan</p>
              </div>
            </div>

            <!-- Tech Stack Tags -->
            <div class="flex flex-wrap items-center gap-1.5 text-[10px] font-mono text-text-muted">
              <span class="px-2.5 py-1 rounded-lg bg-surface border border-border-hairline">SvelteKit</span>
              <span class="px-2.5 py-1 rounded-lg bg-surface border border-border-hairline">TypeScript</span>
              <span class="px-2.5 py-1 rounded-lg bg-surface border border-border-hairline">Prisma ORM</span>
              <span class="px-2.5 py-1 rounded-lg bg-surface border border-border-hairline">TailwindCSS</span>
            </div>
          </div>
        </div>

        <!-- Action Link Footer -->
        <div class="p-6 md:p-8 pt-0 border-t border-border-hairline/60 flex items-center justify-between">
          <a
            href="/project/pos-wonopringgo"
            class="inline-flex items-center gap-2 text-primary font-label-bold text-xs sm:text-sm hover:gap-3 transition-all duration-300 group-hover:text-primary-container"
          >
            <span>Pelajari Studi Kasus &amp; Alur Sistem</span>
            <span class="material-symbols-outlined text-[18px]">arrow_forward</span>
          </a>
        </div>
      </article>

    </div>

    <!-- Unified Portfolio & Demo Catalog CTA Button (Single Direct Action to Wadah) -->
    <div class="mt-14 text-center flex items-center justify-center">
      <a
        use:magneticButton={{ strength: 14 }}
        href="/portfolio"
        class="inline-flex items-center gap-2.5 bg-primary text-on-primary hover:bg-primary-container px-8 py-4 rounded-full font-label-bold text-sm shadow-md hover:shadow-lg transition-all duration-300 group"
      >
        <span class="material-symbols-outlined text-[18px]">folder_special</span>
        <span>Lihat Semua Project &amp; Live Demo</span>
        <span class="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
      </a>
    </div>
  </div>
</section>
