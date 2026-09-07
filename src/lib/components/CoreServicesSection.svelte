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
          start: 'top 52%',
          toggleActions: 'play none none reverse',
        },
        defaults: { ease: 'power3.out' },
      });

      // 1. Kicker Badge: 3D Spring Drop with optical blur clear
      entranceTl.fromTo(
        '.services-kicker',
        { opacity: 0, y: -24, scale: 0.88, filter: 'blur(6px)' },
        { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', duration: 0.75, ease: 'back.out(1.6)' },
        0.05
      );

      // 2. Hub Icon Pop & Spin
      entranceTl.fromTo(
        '.services-kicker-icon',
        { scale: 0, rotate: -60 },
        { scale: 1, rotate: 0, duration: 0.55, ease: 'back.out(2.2)' },
        0.15
      );

      // 3. Headline Masked Kinetic Words
      const words = headlineEl ? headlineEl.querySelectorAll('.services-word') : [];
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
        '.services-accent-text',
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

      // 5. Description & Header CTA button
      entranceTl.fromTo(
        '.services-desc, .services-cta',
        { opacity: 0, y: 22, filter: 'blur(6px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.7, stagger: 0.1, ease: 'power2.out' },
        0.45
      );

      // 6. 3 Service Cards: 3D Perspective Staggered Spring Rise
      entranceTl.fromTo(
        '.service-card',
        { opacity: 0, y: 65, scale: 0.90, rotateX: 10, filter: 'blur(8px)' },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          filter: 'blur(0px)',
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
  class="min-h-screen min-h-[100dvh] w-full relative flex flex-col justify-center items-center pt-28 pb-20 md:pt-36 md:pb-28 bg-surface overflow-hidden perspective-grid"
>
  <!-- Background Layer (data-depth="bg") -->
  <div data-depth="bg" class="absolute inset-0 z-0 pointer-events-none opacity-30">
    <div class="absolute top-1/3 left-12 w-80 h-80 glow-orb-primary rounded-full"></div>
    <div class="absolute bottom-16 right-12 w-80 h-80 glow-orb-primary-fixed rounded-full"></div>
  </div>

  <!-- Section Depth Stage: Scales and fades smoothly for 3D page transitions -->
  <div class="section-depth-stage w-full max-w-7xl mx-auto px-gutter flex flex-col justify-center relative z-10">
    
    <!-- Header (data-depth="content") -->
    <div data-depth="content" class="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-20 gap-8">
      <div class="max-w-2xl">
        <!-- Kicker Badge with Spring Drop -->
        <div class="services-kicker inline-flex items-center space-x-2 bg-white/95 backdrop-blur-md px-4 py-1.5 rounded-full mb-6 border border-slate-200 shadow-[0_4px_14px_-2px_rgba(0,0,0,0.06)] select-none">
          <span class="services-kicker-icon material-symbols-outlined text-primary text-sm" style="font-variation-settings: 'FILL' 1;">hub</span>
          <span class="font-label-sm text-label-sm uppercase tracking-widest text-primary font-label-bold">CORE SOLUTIONS</span>
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
          Mulai dari template instan yang siap pakai hari ini hingga sistem custom skala besar.
        </p>
      </div>

      <div class="services-cta">
        <a
          use:magneticButton={{ strength: 12 }}
          href="#kontak"
          class="bg-white text-on-surface border border-border-hairline px-6 py-3 rounded-full font-label-bold hover:bg-surface-container transition-colors shadow-sm whitespace-nowrap cursor-pointer inline-flex items-center gap-2"
        >
          <span>Lihat Semua Layanan</span>
          <span class="material-symbols-outlined text-[18px]">arrow_forward</span>
        </a>
      </div>
    </div>

    <!-- 3 Service Cards with 3D Depth Layering (data-depth="foreground") -->
    <div data-depth="foreground" class="grid grid-cols-1 md:grid-cols-3 gap-8 perspective-grid">
      
      <!-- Service 1: Sistem Siap Pakai -->
      <div
        use:tilt3D={{ maxTilt: 8, perspective: 1000, scale: 1.025, glare: true }}
        class="service-card group relative bg-[#F8FAFC] rounded-[32px] p-8 border border-border-hairline flex flex-col justify-between h-full preserve-3d shadow-sm hover:shadow-[0_20px_45px_rgba(0,105,72,0.1)] transition-[box-shadow,border-color] duration-300 will-change-transform"
      >
        <div>
          <div class="service-icon-box w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm border border-border-hairline group-hover:scale-110 transition-transform duration-300">
            <span class="material-symbols-outlined text-primary text-[28px]" style="font-variation-settings: 'FILL' 1;">point_of_sale</span>
          </div>

          <h3 class="font-headline-md text-[24px] leading-tight font-semibold text-on-surface mb-4 group-hover:text-primary transition-colors">
            Sistem Siap Pakai
          </h3>

          <p class="font-body-md text-body-md text-text-muted mb-8 leading-relaxed">
            Cepat dan hemat. Tersedia untuk Laundry Management dan POS Coffee Shop. Langsung jalan tanpa nunggu development dari nol.
          </p>
        </div>

        <div class="pt-4 border-t border-border-hairline/60">
          <a
            use:magneticButton={{ strength: 10 }}
            class="inline-flex items-center gap-2 bg-on-surface text-surface font-label-bold text-sm rounded-full px-6 py-3 transition-colors duration-300 hover:bg-primary shadow-md"
            href="#kontak"
          >
            Lihat Demo
            <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
          </a>
        </div>
      </div>

      <!-- Service 2: Custom Development -->
      <div
        use:tilt3D={{ maxTilt: 8, perspective: 1000, scale: 1.025, glare: true }}
        class="service-card group relative bg-[#F8FAFC] rounded-[32px] p-8 border border-border-hairline flex flex-col justify-between h-full preserve-3d shadow-sm hover:shadow-[0_20px_45px_rgba(0,105,72,0.1)] transition-[box-shadow,border-color] duration-300 will-change-transform"
      >
        <div>
          <div class="service-icon-box w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm border border-border-hairline group-hover:scale-110 transition-transform duration-300">
            <span class="material-symbols-outlined text-primary text-[28px]" style="font-variation-settings: 'FILL' 1;">code</span>
          </div>

          <h3 class="font-headline-md text-[24px] leading-tight font-semibold text-on-surface mb-4 group-hover:text-primary transition-colors">
            Custom Development
          </h3>

          <p class="font-body-md text-body-md text-text-muted mb-8 leading-relaxed">
            Bisnis punya alur kerja unik? Kami bangun sistem yang dijahit sesuai kebutuhan — dari ritel, klinik, hingga manufaktur.
          </p>
        </div>

        <div class="pt-4 border-t border-border-hairline/60">
          <a
            use:magneticButton={{ strength: 10 }}
            class="inline-flex items-center gap-2 bg-on-surface text-surface font-label-bold text-sm rounded-full px-6 py-3 transition-colors duration-300 hover:bg-primary shadow-md"
            href="#kontak"
          >
            Konsultasi Kebutuhan
            <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
          </a>
        </div>
      </div>

      <!-- Service 3: Integrasi Enterprise -->
      <div
        use:tilt3D={{ maxTilt: 8, perspective: 1000, scale: 1.025, glare: true }}
        class="service-card group relative bg-[#F8FAFC] rounded-[32px] p-8 border border-border-hairline flex flex-col justify-between h-full preserve-3d shadow-sm hover:shadow-[0_20px_45px_rgba(0,105,72,0.1)] transition-[box-shadow,border-color] duration-300 will-change-transform"
      >
        <div>
          <div class="service-icon-box w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm border border-border-hairline group-hover:scale-110 transition-transform duration-300">
            <span class="material-symbols-outlined text-primary text-[28px]" style="font-variation-settings: 'FILL' 1;">domain</span>
          </div>

          <h3 class="font-headline-md text-[24px] leading-tight font-semibold text-on-surface mb-4 group-hover:text-primary transition-colors">
            Integrasi Enterprise
          </h3>

          <p class="font-body-md text-body-md text-text-muted mb-8 leading-relaxed">
            Skalakan sistem dengan mudah. Kami membantu menghubungkan operasional cabang dengan ERP dan analitik terpusat.
          </p>
        </div>

        <div class="pt-4 border-t border-border-hairline/60">
          <a
            use:magneticButton={{ strength: 10 }}
            class="inline-flex items-center gap-2 bg-on-surface text-surface font-label-bold text-sm rounded-full px-6 py-3 transition-colors duration-300 hover:bg-primary shadow-md"
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
