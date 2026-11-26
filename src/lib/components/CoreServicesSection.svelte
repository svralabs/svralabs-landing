<script lang="ts">
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  import { tilt3D, magneticButton, sectionLayeredParallax, isReducedMotion } from '$lib/actions/gsapParallax';

  let servicesRoot: HTMLElement;
  let headlineEl: HTMLElement;

  onMount(() => {
    if (typeof window === 'undefined' || isReducedMotion()) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const entranceTl = gsap.timeline({
        scrollTrigger: {
          trigger: servicesRoot,
          start: 'top 80%',
          toggleActions: 'play none none none',
          once: true,
        },
        defaults: { ease: 'power2.out' },
      });

      // 1. Kicker Badge: Smooth Fade & Subtle Rise
      entranceTl.fromTo(
        '.services-kicker',
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out' },
        0.05
      );

      // 2. Hub Icon Fade & Settle
      entranceTl.fromTo(
        '.services-kicker-icon',
        { opacity: 0, scale: 0.85 },
        { opacity: 1, scale: 1, duration: 0.4, ease: 'power2.out' },
        0.12
      );

      // 3. Headline Masked Kinetic Words
      const words = headlineEl ? headlineEl.querySelectorAll('.services-word') : [];
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
        '.services-accent-text',
        { scale: 0.96 },
        { scale: 1, duration: 0.55, ease: 'back.out(1.5)' },
        0.48
      );

      // 5. Description & Header CTA button
      entranceTl.fromTo(
        '.services-desc, .services-cta',
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power2.out' },
        0.45
      );

      // 6. 3 Service Cards: 3D Perspective Staggered Spring Rise
      entranceTl.fromTo(
        '.service-card',
        { opacity: 0, y: 65, scale: 0.90, rotateX: 10 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          duration: 0.9,
          stagger: 0.14,
          ease: 'back.out(1.4)',
        },
        0.55
      );

      // 7. Icon Pop inside cards
      entranceTl.fromTo(
        '.service-icon-box',
        { scale: 0.65, opacity: 0 },
        { scale: 1, opacity: 1, stagger: 0.14, duration: 0.6, ease: 'back.out(2)' },
        0.75
      );
    }, servicesRoot);

    return () => ctx.revert();
  });
</script>

<section
  id="layanan"
  bind:this={servicesRoot}
  use:sectionLayeredParallax={{ bgSpeed: 0.45, contentSpeed: 0.16, fgSpeed: -0.28 }}
  class="w-full relative flex flex-col justify-center items-center py-16 md:py-24 bg-surface overflow-hidden perspective-grid"
>
  <!-- Background Layer (data-depth="bg") -->
  <div data-depth="bg" class="absolute inset-0 z-0 pointer-events-none opacity-30">
    <div class="absolute top-1/3 left-12 w-80 h-80 glow-orb-primary rounded-full"></div>
    <div class="absolute bottom-16 right-12 w-80 h-80 glow-orb-primary-fixed rounded-full"></div>
  </div>

  <!-- Section Depth Stage: Scales and fades smoothly for 3D page transitions -->
  <div class="section-depth-stage w-full max-w-6xl mx-auto px-gutter flex flex-col justify-center relative z-10">
    
    <!-- Header (data-depth="content") -->
    <div data-depth="content" class="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-12 gap-6">
      <div class="max-w-2xl">
        <!-- Kicker Badge with Spring Drop -->
        <div class="services-kicker inline-flex items-center space-x-2 bg-white px-4 py-1.5 rounded-full mb-4 border border-slate-200 shadow-[0_4px_14px_-2px_rgba(0,0,0,0.06)] select-none">
          <span class="services-kicker-icon material-symbols-outlined text-primary text-sm" style="font-variation-settings: 'FILL' 1;">hub</span>
          <span class="font-label-sm text-label-sm uppercase tracking-widest text-primary font-label-bold">SOLUSI UTAMA</span>
        </div>

        <!-- Masked Kinetic Word Reveal Headline -->
        <h2
          bind:this={headlineEl}
          class="services-headline font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg mb-4 tracking-tight text-on-surface"
        >
          <span class="inline-block overflow-hidden align-top"><span class="services-word inline-block">Tiga</span></span>
          <span class="inline-block overflow-hidden align-top"><span class="services-word inline-block">cara</span></span>
          <span class="inline-block overflow-hidden align-top"><span class="services-word inline-block">kerja</span></span>
          <span class="inline-block overflow-hidden align-top"><span class="services-word inline-block">Svralabs</span></span>
          <span class="inline-block overflow-hidden align-top"><span class="services-word inline-block">—</span></span>
          <span class="inline-block overflow-hidden align-top"><span class="services-word inline-block">pilih</span></span>
          <span class="inline-block overflow-hidden align-top"><span class="services-word inline-block">yang</span></span>
          <span class="inline-block overflow-hidden align-top"><span class="services-word inline-block">paling</span></span>
          <span class="inline-block overflow-hidden align-top"><span class="services-word inline-block">cocok</span></span>
          <br class="hidden md:block" />
          <span class="inline-block overflow-hidden align-top"><span class="services-word inline-block italic text-primary font-light services-accent-text">buat</span></span>
          <span class="inline-block overflow-hidden align-top"><span class="services-word inline-block italic text-primary font-light services-accent-text">bisnismu.</span></span>
        </h2>
        <p class="services-desc font-body-md text-body-md text-text-muted leading-relaxed">
          Mulai dari sistem siap pakai yang langsung jalan hari ini hingga pembuatan khusus sesuai alur usahamu.
        </p>
      </div>

      <div class="services-cta">
        <a
          use:magneticButton={{ strength: 12 }}
          href="#kontak"
          class="bg-white text-on-surface border border-border-hairline px-6 py-3 rounded-full font-label-bold hover:bg-surface-container transition-colors shadow-sm whitespace-nowrap cursor-pointer inline-flex items-center gap-2"
        >
          <span>Konsultasi Layanan</span>
          <span class="material-symbols-outlined text-[18px]">arrow_forward</span>
        </a>
      </div>
    </div>

    <!-- 3 Service Cards with 3D Depth Layering (data-depth="foreground") -->
    <div data-depth="foreground" class="grid grid-cols-1 md:grid-cols-3 gap-6 perspective-grid">
      
      <!-- Service 1: Sistem Siap Pakai -->
      <div
        use:tilt3D={{ maxTilt: 8, perspective: 1000, scale: 1.025, glare: true }}
        class="service-card group relative bg-[#F8FAFC] rounded-[28px] p-6 md:p-7 border border-border-hairline flex flex-col justify-between h-full preserve-3d shadow-sm hover:shadow-[0_20px_45px_rgba(0,105,72,0.1)] transition-[box-shadow,border-color] duration-300 will-change-transform"
      >
        <div>
          <div class="service-icon-box w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-border-hairline group-hover:scale-110 transition-transform duration-300">
            <span class="material-symbols-outlined text-primary text-[24px]" style="font-variation-settings: 'FILL' 1;">point_of_sale</span>
          </div>

          <h3 class="font-headline-md text-[21px] leading-tight font-semibold text-on-surface mb-3 group-hover:text-primary transition-colors">
            Sistem Siap Pakai
          </h3>

          <p class="font-body-md text-body-md text-text-muted mb-6 leading-relaxed">
            Cepat dan hemat. Tersedia live demo untuk sistem Laundry, Kasir Kopi Seruni, dan Belanja Bahan Warmindo. Langsung jalan tanpa nunggu dari nol.
          </p>
        </div>

        <div class="pt-4 border-t border-border-hairline/60">
          <a
            use:magneticButton={{ strength: 10 }}
            class="inline-flex items-center gap-2 bg-on-surface text-surface font-label-bold text-xs sm:text-sm rounded-full px-5 py-2.5 transition-colors duration-300 hover:bg-primary shadow-md"
            href="/portfolio?category=has-demo"
          >
            <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Coba Live Demo
            <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
          </a>
        </div>
      </div>

      <!-- Service 2: Sistem Kustom -->
      <div
        use:tilt3D={{ maxTilt: 8, perspective: 1000, scale: 1.025, glare: true }}
        class="service-card group relative bg-[#F8FAFC] rounded-[28px] p-6 md:p-7 border border-border-hairline flex flex-col justify-between h-full preserve-3d shadow-sm hover:shadow-[0_20px_45px_rgba(0,105,72,0.1)] transition-[box-shadow,border-color] duration-300 will-change-transform"
      >
        <div>
          <div class="service-icon-box w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-border-hairline group-hover:scale-110 transition-transform duration-300">
            <span class="material-symbols-outlined text-primary text-[24px]" style="font-variation-settings: 'FILL' 1;">code</span>
          </div>

          <h3 class="font-headline-md text-[21px] leading-tight font-semibold text-on-surface mb-3 group-hover:text-primary transition-colors">
            Sistem Kustom
          </h3>

          <p class="font-body-md text-body-md text-text-muted mb-6 leading-relaxed">
            Punya alur kerja unik yang gak cocok dengan aplikasi pasaran? Kami bangun sistem yang pas dengan cara kerja timmu — dari ritel, klinik, hingga pabrik.
          </p>
        </div>

        <div class="pt-4 border-t border-border-hairline/60">
          <a
            use:magneticButton={{ strength: 10 }}
            class="inline-flex items-center gap-2 bg-on-surface text-surface font-label-bold text-xs sm:text-sm rounded-full px-5 py-2.5 transition-colors duration-300 hover:bg-primary shadow-md"
            href="#kontak"
          >
            Konsultasi Kebutuhan
            <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
          </a>
        </div>
      </div>

      <!-- Service 3: Koneksi Cabang & Instansi -->
      <div
        use:tilt3D={{ maxTilt: 8, perspective: 1000, scale: 1.025, glare: true }}
        class="service-card group relative bg-[#F8FAFC] rounded-[28px] p-6 md:p-7 border border-border-hairline flex flex-col justify-between h-full preserve-3d shadow-sm hover:shadow-[0_20px_45px_rgba(0,105,72,0.1)] transition-[box-shadow,border-color] duration-300 will-change-transform"
      >
        <div>
          <div class="service-icon-box w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-border-hairline group-hover:scale-110 transition-transform duration-300">
            <span class="material-symbols-outlined text-primary text-[24px]" style="font-variation-settings: 'FILL' 1;">domain</span>
          </div>

          <h3 class="font-headline-md text-[21px] leading-tight font-semibold text-on-surface mb-3 group-hover:text-primary transition-colors">
            Koneksi Cabang &amp; Instansi
          </h3>

          <p class="font-body-md text-body-md text-text-muted mb-6 leading-relaxed">
            Satukan operasional banyak cabang, kontrol gudang, hingga laporan keuangan dalam satu dashboard terpusat tanpa rekap ulang manual.
          </p>
        </div>

        <div class="pt-4 border-t border-border-hairline/60">
          <a
            use:magneticButton={{ strength: 10 }}
            class="inline-flex items-center gap-2 bg-on-surface text-surface font-label-bold text-xs sm:text-sm rounded-full px-5 py-2.5 transition-colors duration-300 hover:bg-primary shadow-md"
            href="#kontak"
          >
            Pelajari Selengkapnya
            <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
          </a>
        </div>
      </div>

    </div>
  </div>
</section>
