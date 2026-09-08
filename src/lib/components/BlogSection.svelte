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
          start: 'top 65%',
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
          { opacity: 0, y: '115%', filter: 'blur(8px)' },
          { opacity: 1, y: '0%', filter: 'blur(0px)', duration: 0.85, stagger: 0.035, ease: 'power3.out' },
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
          { opacity: 0, y: 65, scale: 0.90, rotate: -2.8, rotateX: 8, filter: 'blur(8px)' },
          { opacity: 1, y: 0, scale: 1, rotate: 0, rotateX: 0, filter: 'blur(0px)', duration: 0.9, ease: 'back.out(1.4)' },
          0.45
        );
        entranceTl.fromTo(
          cards[1],
          { opacity: 0, y: 75, scale: 0.90, rotate: 0, rotateX: 8, filter: 'blur(8px)' },
          { opacity: 1, y: 0, scale: 1, rotate: 0, rotateX: 0, filter: 'blur(0px)', duration: 0.9, ease: 'back.out(1.4)' },
          0.58
        );
        entranceTl.fromTo(
          cards[2],
          { opacity: 0, y: 65, scale: 0.90, rotate: 2.8, rotateX: 8, filter: 'blur(8px)' },
          { opacity: 1, y: 0, scale: 1, rotate: 0, rotateX: 0, filter: 'blur(0px)', duration: 0.9, ease: 'back.out(1.4)' },
          0.71
        );
      } else {
        entranceTl.fromTo(
          '.blog-card',
          { opacity: 0, y: 65, scale: 0.90, rotateX: 10, filter: 'blur(8px)' },
          { opacity: 1, y: 0, scale: 1, rotateX: 0, filter: 'blur(0px)', duration: 0.9, stagger: 0.14, ease: 'back.out(1.4)' },
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
      <div class="blog-kicker inline-flex items-center space-x-2 bg-white/95 backdrop-blur-md px-4 py-1.5 rounded-full mb-6 border border-slate-200 shadow-[0_4px_14px_-2px_rgba(0,0,0,0.06)] select-none">
        <span class="blog-kicker-icon material-symbols-outlined text-primary text-sm" style="font-variation-settings: 'FILL' 1;">article</span>
        <span class="font-label-sm text-label-sm uppercase tracking-widest text-primary font-label-bold">STUDI KASUS &amp; ARTIKEL</span>
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
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuC6cS1HWlMi2zSa2pcPD2aOYOtvpbsn-GY9h2OJH3_PeXY3DxWVZXYoRXyEvVBImAYSCOHNHbY8a9IRVEl5JqwxKj_VlHZ0mduMWud2jR2FZ4Pf1D9TmtXyR5nTApLdRDK8Y0J_95Wo5nQ-PYBwwezzyYiTLaKN0ID5yx0z3hC-ZDdTF5kOmqlgOquki_RAL4JE3XU7S9zhlLbSDrOh8IQM7QfOOhyjzdpkXWNiAx2Df9EcHSGKan18CQ"
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
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCYFJd9EkxA9GFcbO5L6PruiVKGOWtJQ4RCpYsyK2drjsSukyHsArRkxO7dKqomOkrJfdIYylAODctaPPnqaHTrV11bL4QsqBe1vEovq0bGakDhVoUye1XRZK4fvBEDg-5q1lbci3bpky7UDPFSe3qDjgwZCmBUMxf97bCcXWhA3310jT25GhN7dZebRIhCQJ3OXp80edAh6Ao3YDtDDlg43paIjhQFQ1rK7J3w1CIGkT03aMSdtP_fDg"
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
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBAhg-iD3pKum8MBiixSX1qBgPhrQiQNGBVeFIs2rR-flYNIobSwB_M0MW9x2Dq0MUzP1uqvbTCF2Kw3e5j58nqyxJxozm2N_mwwgUCBYcliWSXwSETeWltxlRFvbkMB-A_vGtHPxq_oaymmlv24wN7pg_vKlVv3jJVZbDNO01eFY3Yx4DhfxC0-doz6s-SICnNxyP0ydXHmJ037oqkHwZcNQYp_t7NDAnjvEo07Fy0Em_qjVFi5_kiIQ"
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
