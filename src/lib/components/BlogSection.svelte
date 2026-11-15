<script lang="ts">
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  import { sectionLayeredParallax, isReducedMotion } from '$lib/actions/gsapParallax';

  let blogRoot: HTMLElement;
  let headlineEl: HTMLElement;

  onMount(() => {
    if (typeof window === 'undefined' || isReducedMotion()) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const entranceTl = gsap.timeline({
        scrollTrigger: {
          trigger: blogRoot,
          start: 'top 80%',
          toggleActions: 'play none none none',
          once: true,
        },
        defaults: { ease: 'power2.out' },
      });

      // 1. Kicker Badge: Smooth Fade & Subtle Rise
      entranceTl.fromTo(
        '.blog-kicker',
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out' },
        0.05
      );

      // 2. Icon Fade & Settle
      entranceTl.fromTo(
        '.blog-kicker-icon',
        { opacity: 0, scale: 0.85 },
        { opacity: 1, scale: 1, duration: 0.4, ease: 'power2.out' },
        0.12
      );

      // 3. Headline Masked Kinetic Words
      const words = headlineEl ? headlineEl.querySelectorAll('.blog-word') : [];
      if (words.length > 0) {
        entranceTl.fromTo(
          words,
          { opacity: 0, y: '115%' },
          { opacity: 1, y: '0%', duration: 0.85, stagger: 0.035, ease: 'power3.out' },
          0.18
        );
      }

      // 4. Accent Text Soft Emerald Bloom Pulse
      entranceTl.fromTo(
        '.blog-accent-text',
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

      // 5. 3 Article Cards: Editorial Magazine Publication Fan-In
      const cards = blogRoot ? blogRoot.querySelectorAll('.blog-card') : [];
      if (cards.length >= 3) {
        entranceTl.fromTo(
          cards[0],
          { opacity: 0, y: 65, scale: 0.90, rotate: -2.8, rotateX: 8 },
          { opacity: 1, y: 0, scale: 1, rotate: 0, rotateX: 0, duration: 0.9, ease: 'back.out(1.4)' },
          0.45
        );
        entranceTl.fromTo(
          cards[1],
          { opacity: 0, y: 75, scale: 0.90, rotate: 0, rotateX: 8 },
          { opacity: 1, y: 0, scale: 1, rotate: 0, rotateX: 0, duration: 0.9, ease: 'back.out(1.4)' },
          0.58
        );
        entranceTl.fromTo(
          cards[2],
          { opacity: 0, y: 65, scale: 0.90, rotate: 2.8, rotateX: 8 },
          { opacity: 1, y: 0, scale: 1, rotate: 0, rotateX: 0, duration: 0.9, ease: 'back.out(1.4)' },
          0.71
        );
      } else {
        entranceTl.fromTo(
          '.blog-card',
          { opacity: 0, y: 65, scale: 0.90, rotateX: 10 },
          { opacity: 1, y: 0, scale: 1, rotateX: 0, duration: 0.9, stagger: 0.14, ease: 'back.out(1.4)' },
          0.45
        );
      }
    }, blogRoot);

    return () => ctx.revert();
  });
</script>

<section
  id="blog"
  bind:this={blogRoot}
  class="min-h-screen min-h-[100dvh] w-full relative flex flex-col justify-center items-center pt-28 pb-20 md:pt-36 md:pb-28 bg-surface overflow-hidden perspective-grid"
>
  <!-- Background Layer (data-depth="bg") -->
  <div data-depth="bg" class="absolute inset-0 z-0 pointer-events-none opacity-30">
    <div class="absolute top-1/4 right-1/4 w-80 h-80 glow-orb-primary rounded-full"></div>
    <div class="absolute bottom-16 left-1/4 w-80 h-80 glow-orb-primary-fixed rounded-full"></div>
  </div>

  <!-- Section Depth Stage: Scales and fades smoothly for 3D page transitions -->
  <div class="section-depth-stage w-full max-w-7xl mx-auto flex flex-col justify-center relative z-10">
    <!-- Header (data-depth="content") -->
    <div data-depth="content" class="text-center mb-16 flex flex-col items-center">
      <!-- Kicker Badge with Spring Drop -->
      <div class="blog-kicker inline-flex items-center space-x-2 bg-white px-4 py-1.5 rounded-full mb-6 border border-slate-200 shadow-[0_4px_14px_-2px_rgba(0,0,0,0.06)] select-none">
        <span class="blog-kicker-icon material-symbols-outlined text-primary text-sm" style="font-variation-settings: 'FILL' 1;">article</span>
        <span class="font-label-sm text-label-sm uppercase tracking-widest text-primary font-label-bold">WAWASAN &amp; ARTIKEL BISNIS</span>
      </div>

      <!-- Masked Kinetic Word Reveal Headline -->
      <h2
        bind:this={headlineEl}
        class="blog-headline font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg text-on-surface max-w-3xl mx-auto tracking-tight"
      >
        <span class="inline-block overflow-hidden align-top"><span class="blog-word inline-block">Wawasan</span></span>
        <span class="inline-block overflow-hidden align-top"><span class="blog-word inline-block">terbaru</span></span>
        <span class="inline-block overflow-hidden align-top"><span class="blog-word inline-block">untuk</span></span>
        <span class="inline-block overflow-hidden align-top"><span class="blog-word inline-block">otomatisasi</span></span>
        <br class="hidden md:block" />
        <span class="inline-block overflow-hidden align-top"><span class="blog-word inline-block italic text-primary font-light blog-accent-text">bisnis</span></span>
        <span class="inline-block overflow-hidden align-top"><span class="blog-word inline-block italic text-primary font-light blog-accent-text">lokal.</span></span>
      </h2>
    </div>

    <!-- 3 Article Cards Grid (data-depth="content") -->
    <div data-depth="content" class="grid grid-cols-1 md:grid-cols-3 gap-8">
      
      <!-- Article 1 -->
      <article
        class="blog-card group flex flex-col bg-white rounded-[28px] border border-border-hairline p-5 shadow-sm hover:shadow-[0_15px_35px_rgba(0,0,0,0.06)] transition-[box-shadow,border-color] duration-300 cursor-pointer will-change-transform"
      >
        <div class="overflow-hidden rounded-2xl mb-6 relative border border-border-hairline aspect-video bg-surface-faint">
          <img
            alt="Modern retail clothing store"
            class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            src="/blog/blog-1.webp"
            loading="lazy"
            decoding="async"
          />
        </div>

        <h3 class="font-headline-md text-[20px] leading-snug font-semibold text-on-surface mb-3 group-hover:text-primary transition-colors">
          5 Tanda Toko Ritel Anda Sudah Membutuhkan Sistem POS Cloud
        </h3>

        <p class="font-body-md text-[14px] text-text-muted mb-6 flex-grow leading-relaxed">
          Hindari kebocoran kas dan kesalahan catat manual dengan beralih ke kasir terintegrasi.
        </p>

        <div class="mt-auto pt-4 border-t border-border-hairline/60">
          <span class="inline-flex items-center gap-1 text-sm font-label-bold text-on-surface group-hover:text-primary transition-colors">
            Baca Artikel
            <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
          </span>
        </div>
      </article>

      <!-- Article 2 -->
      <article
        class="blog-card group flex flex-col bg-white rounded-[28px] border border-border-hairline p-5 shadow-sm hover:shadow-[0_15px_35px_rgba(0,0,0,0.06)] transition-[box-shadow,border-color] duration-300 cursor-pointer will-change-transform"
      >
        <div class="overflow-hidden rounded-2xl mb-6 relative border border-border-hairline aspect-video bg-surface-faint">
          <img
            alt="Indonesian coffee shop interior"
            class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            src="/blog/blog-2.webp"
            loading="lazy"
            decoding="async"
          />
        </div>

        <h3 class="font-headline-md text-[20px] leading-snug font-semibold text-on-surface mb-3 group-hover:text-primary transition-colors">
          Rahasia Manajemen F&amp;B: Pantau Omset Cabang Tanpa Harus Keliling
        </h3>

        <p class="font-body-md text-[14px] text-text-muted mb-6 flex-grow leading-relaxed">
          Pelajari cara mengotomatisasi laporan penjualan harian dari banyak cabang ke satu dashboard terpusat.
        </p>

        <div class="mt-auto pt-4 border-t border-border-hairline/60">
          <span class="inline-flex items-center gap-1 text-sm font-label-bold text-on-surface group-hover:text-primary transition-colors">
            Baca Artikel
            <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
          </span>
        </div>
      </article>

      <!-- Article 3 -->
      <article
        class="blog-card group flex flex-col bg-white rounded-[28px] border border-border-hairline p-5 shadow-sm hover:shadow-[0_15px_35px_rgba(0,0,0,0.06)] transition-[box-shadow,border-color] duration-300 cursor-pointer will-change-transform"
      >
        <div class="overflow-hidden rounded-2xl mb-6 relative border border-border-hairline aspect-video bg-surface-faint">
          <img
            alt="Indonesian F&B warehouse"
            class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            src="/blog/blog-3.webp"
            loading="lazy"
            decoding="async"
          />
        </div>

        <h3 class="font-headline-md text-[20px] leading-snug font-semibold text-on-surface mb-3 group-hover:text-primary transition-colors">
          Panduan Mengatur Stok Gudang Anti-Selisih untuk Grosir &amp; F&amp;B
        </h3>

        <p class="font-body-md text-[14px] text-text-muted mb-6 flex-grow leading-relaxed">
          Langkah praktis menerapkan sistem barcode dan stock opname otomatis di bisnis lokal.
        </p>

        <div class="mt-auto pt-4 border-t border-border-hairline/60">
          <span class="inline-flex items-center gap-1 text-sm font-label-bold text-on-surface group-hover:text-primary transition-colors">
            Baca Artikel
            <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
          </span>
        </div>
      </article>

    </div>
  </div>
</section>
