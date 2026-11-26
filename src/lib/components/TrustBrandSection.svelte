<script lang="ts">
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  import { tilt3D, isReducedMotion } from '$lib/actions/gsapParallax';

  let trustRoot: HTMLElement;

  const clientBrands = [
    {
      name: 'Puskesmas Wonokerto',
      sector: 'Rekam Medis Digital & Antrean Poli',
      impact: 'Cari berkas pasien < 2 menit',
      slug: 'puskesmas-wonokerto',
      monogram: 'PW',
      tag: 'Instansi Faskes',
    },
    {
      name: 'Konveksi Wonopringgo',
      sector: 'Kasir Grosir & Stok Multi-Gudang',
      impact: '1.400+ yard kain terlacak akurat',
      slug: 'pos-wonopringgo',
      monogram: 'KW',
      tag: 'Grosir & Produksi',
    },
    {
      name: 'Toko Kopi Seruni',
      sector: 'Kasir Cepat & Hitung Modal Resep',
      impact: 'Rekap shift kasir langsung cocok',
      slug: 'kopi-seruni',
      monogram: 'KS',
      tag: 'Cafe & Kuliner',
    },
    {
      name: 'Warmindo Garwo',
      sector: 'Catat Nota Belanja dari Foto AI',
      impact: 'Rekap belanja tanpa ketik ulang',
      slug: 'purchasing-garwo',
      monogram: 'WG',
      tag: 'Belanja Stok AI',
    },
    {
      name: 'SVRA Laundry Solutions',
      sector: 'Lacak Cucian QR & Info WhatsApp',
      impact: 'Pelanggan pantau cucian mandiri',
      slug: 'laundry',
      monogram: 'SL',
      tag: 'Jasa & Operasional',
    },
  ];

  onMount(() => {
    if (typeof window === 'undefined' || isReducedMotion()) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: trustRoot,
          start: 'top 85%',
          toggleActions: 'play none none none',
          once: true,
        },
        defaults: { ease: 'power2.out' },
      });

      // 1. Kicker Badge entrance
      tl.fromTo(
        '.trust-kicker',
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.55 },
        0.05
      );

      // 2. Client Brand Cards staggered 3D rise
      tl.fromTo(
        '.trust-brand-card',
        { opacity: 0, y: 30, scale: 0.94 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.75,
          stagger: 0.08,
          ease: 'back.out(1.4)',
        },
        0.15
      );
    }, trustRoot);

    return () => ctx.revert();
  });
</script>

<!-- Seamless, borderless social proof band that flows with hero horizon fog -->
<section
  bind:this={trustRoot}
  class="w-full relative z-20 py-8 md:py-12 bg-gradient-to-b from-white via-surface-container-lowest/80 to-white overflow-hidden"
>
  <div class="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
    
    <!-- Header Title (No Green Pulse Dot) -->
    <div class="trust-kicker text-center mb-5 md:mb-6 will-change-transform">
      <div class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-surface-container border border-border-hairline shadow-2xs mb-2">
        <span class="material-symbols-outlined text-primary text-[13px]" style="font-variation-settings: 'FILL' 1;">verified</span>
        <span class="font-label-sm text-[11px] font-bold text-on-surface-variant uppercase tracking-widest">
          Sistem Produksi Aktif &amp; Klien Terverifikasi
        </span>
      </div>
      <h2 class="font-headline-md text-base sm:text-lg font-bold text-on-surface mb-1">
        Dipercaya oleh Berbagai Sektor Bisnis Nyata
      </h2>
      <p class="font-body-md text-xs sm:text-sm text-text-muted max-w-xl mx-auto">
        Dari faskes layanan publik hingga ritel grosir, kuliner, dan jasa operasional di Pekalongan &amp; sekitarnya.
      </p>
    </div>

    <!-- Client Cards Grid with 3D Tilt & Professional Monogram Badges -->
    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
      {#each clientBrands as brand}
        <a
          use:tilt3D={{ maxTilt: 5, perspective: 900, glare: false }}
          href="/project/{brand.slug}"
          class="trust-brand-card group bg-white hover:bg-slate-50/90 rounded-2xl p-4 border border-border-hairline hover:border-primary/50 shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between will-change-transform"
        >
          <div>
            <div class="flex items-center justify-between mb-3">
              <!-- Architectural Monogram Badge -->
              <div class="w-8 h-8 rounded-xl bg-surface-container-high group-hover:bg-primary text-on-surface group-hover:text-white flex items-center justify-center font-mono font-bold text-xs tracking-wider transition-colors shadow-2xs">
                {brand.monogram}
              </div>
              <span class="text-[9px] font-label-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                {brand.tag}
              </span>
            </div>

            <h3 class="font-headline-md text-xs sm:text-sm font-bold text-on-surface group-hover:text-primary transition-colors leading-snug">
              {brand.name}
            </h3>
            <p class="font-body-md text-[11px] text-text-muted mt-0.5 line-clamp-1">
              {brand.sector}
            </p>
            <p class="font-body-md text-[10px] text-primary font-medium mt-2 line-clamp-1">
              {brand.impact}
            </p>
          </div>

          <div class="pt-3 mt-3 border-t border-border-hairline/60 flex items-center justify-between text-[10px] text-text-muted group-hover:text-primary font-label-bold">
            <span>Buka Project</span>
            <span class="material-symbols-outlined text-[13px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </div>
        </a>
      {/each}
    </div>

  </div>
</section>
