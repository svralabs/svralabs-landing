<script lang="ts">
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  import { tilt3D, magneticButton, isReducedMotion } from '$lib/actions/gsapParallax';
  import { glareCard } from '$lib/actions/motion';

  if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }

  let fiturRoot: HTMLElement;
  let headlineEl: HTMLElement;

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  onMount(() => {
    if (typeof window === 'undefined' || isReducedMotion()) return;

    const ctx = gsap.context(() => {
      const words = headlineEl ? headlineEl.querySelectorAll('.fitur-word') : [];

      // ── INCOMING: scroll-triggered entrance from bottom ──
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: fiturRoot,
          start: 'top 65%',
          toggleActions: 'play none none none',
          once: true,
        },
        defaults: { ease: 'power2.out' },
      });

      tl.fromTo(
        '.fitur-kicker',
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out' },
        0
      );

      tl.fromTo(
        '.fitur-kicker-icon',
        { opacity: 0, scale: 0.85 },
        { opacity: 1, scale: 1, duration: 0.4, ease: 'power2.out' },
        0.08
      );

      if (words.length > 0) {
        tl.fromTo(
          words,
          { opacity: 0, y: '110%', filter: 'blur(6px)' },
          { opacity: 1, y: '0%', filter: 'blur(0px)', duration: 0.8, stagger: 0.03, ease: 'power3.out' },
          0.12
        );
      }

      tl.fromTo(
        '.fitur-accent-text',
        { filter: 'drop-shadow(0 0 0px rgba(0,105,72,0))' },
        {
          filter: 'drop-shadow(0 0 18px rgba(0,105,72,0.45))',
          duration: 0.7,
          ease: 'power2.out',
          yoyo: true,
          repeat: 1,
          repeatDelay: 0.1,
        },
        0.55
      );

      tl.fromTo(
        '.fitur-desc',
        { opacity: 0, y: 20, filter: 'blur(4px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.65, ease: 'power2.out' },
        0.3
      );

      // Cards: fast staggered 3D rise from below
      tl.fromTo(
        '.fitur-card',
        { opacity: 0, y: 50, scale: 0.92, rotateX: 8, filter: 'blur(6px)' },
        {
          opacity: 1, y: 0, scale: 1, rotateX: 0, filter: 'blur(0px)',
          duration: 0.75, stagger: 0.08, ease: 'back.out(1.3)',
        },
        0.4
      );

      tl.fromTo(
        '.fitur-card-icon',
        { scale: 0, rotate: -30 },
        { scale: 1, rotate: 0, duration: 0.55, stagger: 0.08, ease: 'back.out(2.0)' },
        0.58
      );

      tl.fromTo(
        '.fitur-card-badge',
        { opacity: 0, scale: 0.7, x: 10 },
        { opacity: 1, scale: 1, x: 0, duration: 0.45, stagger: 0.08, ease: 'back.out(1.5)' },
        0.68
      );

      tl.fromTo(
        '.fitur-card-pill',
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.45, stagger: 0.08, ease: 'power2.out' },
        0.76
      );

      tl.fromTo(
        '.fitur-cta-wrap',
        { opacity: 0, y: 22, scale: 0.93, filter: 'blur(5px)' },
        { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', duration: 0.7, ease: 'back.out(1.4)' },
        0.88
      );

      // ── OUT: Scrubbed recession as next section scrolls in ──
      const outTl = gsap.timeline({
        scrollTrigger: {
          trigger: fiturRoot,
          start: 'bottom 80%',
          end: 'bottom 10%',
          scrub: 1.0,
          invalidateOnRefresh: true,
        }
      });

      // Cards fan out and recede upward with slight lateral spread
      outTl.to(['.fitur-card:nth-child(1)', '.fitur-card:nth-child(2)'], {
        x: -35, y: -25, opacity: 0.1, scale: 0.93, filter: 'blur(3px)',
        ease: 'power1.in', duration: 0.8,
      }, 0);
      outTl.to(['.fitur-card:nth-child(3)', '.fitur-card:nth-child(4)'], {
        x: 35, y: -25, opacity: 0.1, scale: 0.93, filter: 'blur(3px)',
        ease: 'power1.in', duration: 0.8,
      }, 0);

      outTl.to('.fitur-desc, .fitur-kicker', {
        y: -18, opacity: 0, ease: 'power1.in', duration: 0.55,
      }, 0);
      outTl.to('.fitur-cta-wrap', {
        y: -12, opacity: 0, scale: 0.96, ease: 'power1.in', duration: 0.45,
      }, 0.05);

    }, fiturRoot);

    return () => ctx.revert();
  });
</script>

<section
  id="fitur"
  bind:this={fiturRoot}
  class="min-h-screen min-h-[100dvh] w-full relative flex flex-col justify-center items-center pt-24 pb-10 md:pt-28 md:pb-14 bg-surface overflow-hidden perspective-grid"
>
  <!-- Background Atmosphere Layer -->
  <div
    data-depth="bg"
    class="absolute inset-0 z-0 pointer-events-none opacity-40 select-none overflow-hidden"
  >
    <img alt="Serene blue sky background" class="w-full h-full object-cover" src="/blue_sky_bg_1786188871421.webp" />
    <div class="absolute inset-0 bg-white/80"></div>
  </div>

  <!-- Section Depth Stage: Scales and fades smoothly for 3D page transitions -->
  <div class="section-depth-stage relative z-10 max-w-[1280px] w-full mx-auto px-4 md:px-8 flex flex-col items-center">
    
    <!-- Header (data-depth="content") -->
    <div data-depth="content" class="text-center mb-16 max-w-3xl">
      <!-- Kicker Badge with Spring Drop & Icon Pop -->
      <span class="fitur-kicker inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-slate-200 shadow-[0_4px_14px_-2px_rgba(0,0,0,0.06)] font-label-bold text-primary uppercase text-xs mb-6 select-none">
        <span class="fitur-kicker-icon material-symbols-outlined text-[16px] text-primary" style="font-variation-settings: 'FILL' 1;">star</span>
        MASALAH &amp; SOLUSI
      </span>

      <!-- Masked Kinetic Word Reveal Headline -->
      <h2
        bind:this={headlineEl}
        class="fitur-headline font-headline-lg-mobile md:font-headline-lg text-on-surface tracking-tight"
      >
        <span class="inline-block overflow-hidden align-top"><span class="fitur-word inline-block">Masih</span></span>
        <span class="inline-block overflow-hidden align-top"><span class="fitur-word inline-block">pusing</span></span>
        <span class="inline-block overflow-hidden align-top"><span class="fitur-word inline-block">urus</span></span>
        <span class="inline-block overflow-hidden align-top"><span class="fitur-word inline-block">stok</span></span>
        <span class="inline-block overflow-hidden align-top"><span class="fitur-word inline-block">hilang</span></span>
        <br class="hidden md:block" />
        <span class="inline-block overflow-hidden align-top"><span class="fitur-word inline-block">dan</span></span>
        <span class="inline-block overflow-hidden align-top"><span class="fitur-word inline-block italic text-primary fitur-accent-text">antrian</span></span>
        <span class="inline-block overflow-hidden align-top"><span class="fitur-word inline-block italic text-primary fitur-accent-text">panjang?</span></span>
      </h2>

      <!-- Description Paragraph -->
      <p class="fitur-desc mt-6 text-on-surface-variant font-body-md max-w-2xl mx-auto leading-relaxed">
        Kami paham sakit kepalanya — stok nggak cocok, laporan kelewatan, antrian numpuk. Svralabs bikin sistem yang beresin itu satu per satu.
      </p>
    </div>

    <!-- 4 Point Grid with 3D Tilt On Hover (data-depth="foreground") -->
    <div data-depth="foreground" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full mb-16 perspective-grid">
      
      <!-- Card 1: POS Kasir Multi-Cabang -->
      <div
        use:tilt3D={{ maxTilt: 7, perspective: 900, scale: 1.02, glare: true }}
        use:glareCard
        class="fitur-card bg-white rounded-[24px] p-7 sm:p-8 border border-border-hairline shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_45px_-12px_rgba(0,105,72,0.16)] flex flex-col justify-between items-start text-left preserve-3d transition-[box-shadow,border-color] duration-300 group hover:border-primary/30 cursor-default"
      >
        <div class="w-full">
          <div class="flex items-center justify-between w-full mb-6">
            <div class="fitur-card-icon w-12 h-12 rounded-2xl bg-primary-container flex items-center justify-center shadow-md group-hover:scale-110 group-hover:bg-primary transition-all duration-300">
              <span class="material-symbols-outlined text-white text-[22px]" data-icon="storefront">storefront</span>
            </div>
            <span class="fitur-card-badge inline-flex items-center gap-1 bg-primary/10 text-primary text-[11px] font-semibold px-2.5 py-1 rounded-full border border-primary/20 transition-all duration-300 group-hover:bg-primary group-hover:text-white">
              Multi-Cabang
            </span>
          </div>
          <h3 class="font-headline-md text-[20px] font-semibold text-on-surface mb-3 group-hover:text-primary transition-colors duration-200">
            POS Kasir Multi-Cabang
          </h3>
          <p class="font-body-md text-[14px] text-text-muted leading-relaxed">
            Kelola transaksi kasir online maupun offline dengan sinkronisasi data seketika di semua toko.
          </p>
        </div>

        <div class="fitur-card-pill mt-6 pt-4 border-t border-slate-100 w-full flex items-center justify-between text-xs text-text-muted group-hover:text-on-surface transition-colors">
          <span class="inline-flex items-center gap-1.5 font-medium">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Real-time Cloud Sync
          </span>
          <span class="material-symbols-outlined text-[16px] text-primary opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-200">arrow_forward</span>
        </div>
      </div>

      <!-- Card 2: Manajemen Stok Otomatis -->
      <div
        use:tilt3D={{ maxTilt: 7, perspective: 900, scale: 1.02, glare: true }}
        use:glareCard
        class="fitur-card bg-white rounded-[24px] p-7 sm:p-8 border border-border-hairline shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_45px_-12px_rgba(0,105,72,0.16)] flex flex-col justify-between items-start text-left preserve-3d transition-[box-shadow,border-color] duration-300 group hover:border-primary/30 cursor-default"
      >
        <div class="w-full">
          <div class="flex items-center justify-between w-full mb-6">
            <div class="fitur-card-icon w-12 h-12 rounded-2xl bg-primary-container flex items-center justify-center shadow-md group-hover:scale-110 group-hover:bg-primary transition-all duration-300">
              <span class="material-symbols-outlined text-white text-[22px]" data-icon="inventory_2">inventory_2</span>
            </div>
            <span class="fitur-card-badge inline-flex items-center gap-1 bg-primary/10 text-primary text-[11px] font-semibold px-2.5 py-1 rounded-full border border-primary/20 transition-all duration-300 group-hover:bg-primary group-hover:text-white">
              Auto Restock
            </span>
          </div>
          <h3 class="font-headline-md text-[20px] font-semibold text-on-surface mb-3 group-hover:text-primary transition-colors duration-200">
            Manajemen Stok Otomatis
          </h3>
          <p class="font-body-md text-[14px] text-text-muted leading-relaxed">
            Lacak pergerakan bahan baku dan barang jadi dengan peringatan restock sebelum kehabisan.
          </p>
        </div>

        <div class="fitur-card-pill mt-6 pt-4 border-t border-slate-100 w-full flex items-center justify-between text-xs text-text-muted group-hover:text-on-surface transition-colors">
          <span class="inline-flex items-center gap-1.5 font-medium">
            <span class="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
            Peringatan Stok Rendah
          </span>
          <span class="material-symbols-outlined text-[16px] text-primary opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-200">arrow_forward</span>
        </div>
      </div>

      <!-- Card 3: Digitalisasi Alur Bisnis -->
      <div
        use:tilt3D={{ maxTilt: 7, perspective: 900, scale: 1.02, glare: true }}
        use:glareCard
        class="fitur-card bg-white rounded-[24px] p-7 sm:p-8 border border-border-hairline shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_45px_-12px_rgba(0,105,72,0.16)] flex flex-col justify-between items-start text-left preserve-3d transition-[box-shadow,border-color] duration-300 group hover:border-primary/30 cursor-default"
      >
        <div class="w-full">
          <div class="flex items-center justify-between w-full mb-6">
            <div class="fitur-card-icon w-12 h-12 rounded-2xl bg-primary-container flex items-center justify-center shadow-md group-hover:scale-110 group-hover:bg-primary transition-all duration-300">
              <span class="material-symbols-outlined text-white text-[22px]" data-icon="cloud_sync">cloud_sync</span>
            </div>
            <span class="fitur-card-badge inline-flex items-center gap-1 bg-primary/10 text-primary text-[11px] font-semibold px-2.5 py-1 rounded-full border border-primary/20 transition-all duration-300 group-hover:bg-primary group-hover:text-white">
              All-in-One Cloud
            </span>
          </div>
          <h3 class="font-headline-md text-[20px] font-semibold text-on-surface mb-3 group-hover:text-primary transition-colors duration-200">
            Digitalisasi Alur Bisnis
          </h3>
          <p class="font-body-md text-[14px] text-text-muted leading-relaxed">
            Integrasikan seluruh alur kerja bisnis ke dalam satu ekosistem cloud modern — dari kasir hingga laporan.
          </p>
        </div>

        <div class="fitur-card-pill mt-6 pt-4 border-t border-slate-100 w-full flex items-center justify-between text-xs text-text-muted group-hover:text-on-surface transition-colors">
          <span class="inline-flex items-center gap-1.5 font-medium">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Kasir s/d Laporan Laba
          </span>
          <span class="material-symbols-outlined text-[16px] text-primary opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-200">arrow_forward</span>
        </div>
      </div>

      <!-- Card 4: Ekspansi Pasar Lebih Mudah -->
      <div
        use:tilt3D={{ maxTilt: 7, perspective: 900, scale: 1.02, glare: true }}
        use:glareCard
        class="fitur-card bg-white rounded-[24px] p-7 sm:p-8 border border-border-hairline shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_45px_-12px_rgba(0,105,72,0.16)] flex flex-col justify-between items-start text-left preserve-3d transition-[box-shadow,border-color] duration-300 group hover:border-primary/30 cursor-default"
      >
        <div class="w-full">
          <div class="flex items-center justify-between w-full mb-6">
            <div class="fitur-card-icon w-12 h-12 rounded-2xl bg-primary-container flex items-center justify-center shadow-md group-hover:scale-110 group-hover:bg-primary transition-all duration-300">
              <span class="material-symbols-outlined text-white text-[22px]" data-icon="trending_up">trending_up</span>
            </div>
            <span class="fitur-card-badge inline-flex items-center gap-1 bg-primary/10 text-primary text-[11px] font-semibold px-2.5 py-1 rounded-full border border-primary/20 transition-all duration-300 group-hover:bg-primary group-hover:text-white">
              Smart Analytics
            </span>
          </div>
          <h3 class="font-headline-md text-[20px] font-semibold text-on-surface mb-3 group-hover:text-primary transition-colors duration-200">
            Ekspansi Pasar Lebih Mudah
          </h3>
          <p class="font-body-md text-[14px] text-text-muted leading-relaxed">
            Analisis tren penjualan produk terlaris untuk merancang strategi promosi yang akurat.
          </p>
        </div>

        <div class="fitur-card-pill mt-6 pt-4 border-t border-slate-100 w-full flex items-center justify-between text-xs text-text-muted group-hover:text-on-surface transition-colors">
          <span class="inline-flex items-center gap-1.5 font-medium">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Tren Produk Terlaris
          </span>
          <span class="material-symbols-outlined text-[16px] text-primary opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-200">arrow_forward</span>
        </div>
      </div>

    </div>

    <!-- CTA Button (data-depth="content") -->
    <div data-depth="content" class="fitur-cta-wrap">
      <button
        use:magneticButton={{ strength: 16 }}
        onclick={() => scrollTo('kontak')}
        class="bg-near-black hover:bg-primary text-white font-label-bold px-9 py-4 rounded-full transition-all duration-300 shadow-xl hover:shadow-primary/30 cursor-pointer flex items-center gap-2 group hover:scale-[1.02]"
      >
        <span>Mulai Digitalisasi Sekarang</span>
        <span class="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform duration-200">arrow_forward</span>
      </button>
    </div>

  </div>
</section>
