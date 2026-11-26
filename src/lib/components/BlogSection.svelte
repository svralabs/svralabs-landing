<script lang="ts">
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  import { sectionLayeredParallax, isReducedMotion } from '$lib/actions/gsapParallax';

  interface Article {
    id: string;
    category: string;
    readTime: string;
    title: string;
    excerpt: string;
    image: string;
    alt: string;
    points: string[];
    takeaway: string;
  }

  const articles: Article[] = [
    {
      id: 'pos-cloud',
      category: 'Ritel & Kasir',
      readTime: '3 menit baca',
      title: '5 Tanda Toko Ritelmu Sudah Membutuhkan Sistem POS Cloud',
      excerpt: 'Hindari kebocoran kas dan kesalahan catat manual dengan beralih ke kasir terintegrasi.',
      image: '/blog/blog-1.webp',
      alt: 'Modern retail clothing store',
      points: [
        'Stok di rak dan catatan buku sering selisih setiap kali tutup bulan.',
        'Owner harus telepon atau minta foto laporan ke kasir kalau sedang berada di luar kota.',
        'Kasir masih menghitung diskon grosir atau kembalian secara manual saat antrean ramai.',
        'Barang kadaluarsa atau produk lambat laku menumpuk tanpa ketahuan di gudang.',
        'Pergantian shift kasir memakan waktu lama dan rawan salah hitung uang tunai di laci.'
      ],
      takeaway: 'Dengan kasir terintegrasi, setiap struk otomatis memotong stok dan merekap omzet harian langsung ke HP owner.'
    },
    {
      id: 'manajemen-fnb',
      category: 'F&B & Kafe',
      readTime: '4 menit baca',
      title: 'Rahasia Manajemen F&B: Pantau Omzet Cabang Tanpa Harus Keliling',
      excerpt: 'Pelajari cara mengotomatisasi laporan penjualan harian dari banyak cabang ke satu dashboard terpusat.',
      image: '/blog/blog-2.webp',
      alt: 'Indonesian coffee shop interior',
      points: [
        'Pisahkan tiket pesanan ke dapur makanan dan bar minuman secara otomatis agar pesanan tidak tertukar.',
        'Terapkan pemotongan stok bahan baku (biji kopi, susu, sirup) berdasarkan resep tiap menu yang terjual.',
        'Pantau perbandingan omzet dan jam tersibuk antar cabang dari satu layar utama.',
        'Gunakan rekap shift kasir digital untuk mengecek kesesuaian cash, QRIS, dan transfer bank.'
      ],
      takeaway: 'Kontrol bahan baku dan HPP yang presisi menjaga margin profit kafe tetap sehat meski cabang bertambah.'
    },
    {
      id: 'stok-gudang',
      category: 'Grosir & Gudang',
      readTime: '4 menit baca',
      title: 'Panduan Mengatur Stok Gudang Anti-Selisih untuk Grosir & F&B',
      excerpt: 'Langkah praktis menerapkan sistem barcode dan pencatatan mutasi stok otomatis di bisnis lokal.',
      image: '/blog/blog-3.webp',
      alt: 'Indonesian F&B warehouse',
      points: [
        'Catat konversi satuan bertingkat secara otomatis (misal dari roll/karung/dus ke meter/kilogram/pcs).',
        'Wajibkan surat jalan digital setiap kali ada mutasi barang antar gudang atau cabang.',
        'Atur peringatan otomatis saat stok bahan pokok menyentuh batas minimum sebelum kehabisan.',
        'Simpan foto bukti nota belanja masuk agar audit harga supplier lebih transparan.'
      ],
      takeaway: 'Pencatatan stok yang disiplin memangkas risiko barang hilang dan mempercepat proses audit opname mingguan.'
    }
  ];

  let blogRoot: HTMLElement;
  let headlineEl: HTMLElement;
  let activeArticle = $state<Article | null>(null);

  function openArticle(article: Article) {
    activeArticle = article;
  }

  function closeArticle() {
    activeArticle = null;
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape' && activeArticle) {
      closeArticle();
    }
  }

  onMount(() => {
    if (typeof window === 'undefined' || isReducedMotion()) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const entranceTl = gsap.timeline({
        scrollTrigger: {
          trigger: blogRoot,
          start: 'top 82%',
          toggleActions: 'play none none none',
          once: true,
        },
        defaults: { ease: 'power2.out' },
      });

      entranceTl.fromTo(
        '.blog-kicker',
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.5 },
        0.05
      );

      entranceTl.fromTo(
        '.blog-kicker-icon',
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.4 },
        0.12
      );

      const words = headlineEl ? headlineEl.querySelectorAll('.blog-word') : [];
      if (words.length > 0) {
        entranceTl.fromTo(
          words,
          { opacity: 0, y: '115%' },
          { opacity: 1, y: '0%', duration: 0.75, stagger: 0.03, ease: 'power3.out' },
          0.16
        );
      }

      entranceTl.fromTo(
        '.blog-accent-text',
        { scale: 0.96 },
        { scale: 1, duration: 0.55, ease: 'back.out(1.5)' },
        0.48
      );

      const cards = blogRoot ? blogRoot.querySelectorAll('.blog-card') : [];
      if (cards.length >= 3) {
        entranceTl.fromTo(
          cards[0],
          { opacity: 0, y: 55, scale: 0.92, rotate: -2.2 },
          { opacity: 1, y: 0, scale: 1, rotate: 0, duration: 0.8, ease: 'back.out(1.3)' },
          0.4
        );
        entranceTl.fromTo(
          cards[1],
          { opacity: 0, y: 65, scale: 0.92, rotate: 0 },
          { opacity: 1, y: 0, scale: 1, rotate: 0, duration: 0.8, ease: 'back.out(1.3)' },
          0.52
        );
        entranceTl.fromTo(
          cards[2],
          { opacity: 0, y: 55, scale: 0.92, rotate: 2.2 },
          { opacity: 1, y: 0, scale: 1, rotate: 0, duration: 0.8, ease: 'back.out(1.3)' },
          0.64
        );
      } else {
        entranceTl.fromTo(
          '.blog-card',
          { opacity: 0, y: 55, scale: 0.92 },
          { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.14, ease: 'back.out(1.3)' },
          0.4
        );
      }
    }, blogRoot);

    return () => ctx.revert();
  });
</script>

<svelte:window onkeydown={handleKeydown} />

<section
  id="blog"
  bind:this={blogRoot}
  use:sectionLayeredParallax={{ bgSpeed: 0.45, contentSpeed: 0.16, fgSpeed: -0.25 }}
  class="w-full relative flex flex-col justify-center items-center py-16 md:py-24 bg-surface overflow-hidden perspective-grid"
>
  <!-- Background Layer (data-depth="bg") -->
  <div data-depth="bg" class="absolute inset-0 z-0 pointer-events-none opacity-30">
    <div class="absolute top-1/4 right-1/4 w-80 h-80 glow-orb-primary rounded-full"></div>
    <div class="absolute bottom-16 left-1/4 w-80 h-80 glow-orb-primary-fixed rounded-full"></div>
  </div>

  <div class="section-depth-stage w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-gutter flex flex-col justify-center relative z-10">
    <!-- Header (data-depth="content") -->
    <div data-depth="content" class="text-center mb-10 md:mb-12 flex flex-col items-center">
      <div class="blog-kicker inline-flex items-center space-x-2 bg-white px-4 py-1.5 rounded-full mb-4 border border-slate-200 shadow-[0_4px_14px_-2px_rgba(0,0,0,0.06)] select-none">
        <span class="blog-kicker-icon material-symbols-outlined text-primary text-sm" style="font-variation-settings: 'FILL' 1;">article</span>
        <span class="font-label-sm text-label-sm uppercase tracking-widest text-primary font-label-bold">WAWASAN &amp; ARTIKEL BISNIS</span>
      </div>

      <h2
        bind:this={headlineEl}
        class="blog-headline font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg text-on-surface max-w-3xl mx-auto tracking-tight"
      >
        <span class="inline-block overflow-hidden align-top"><span class="blog-word inline-block">Wawasan</span></span>
        <span class="inline-block overflow-hidden align-top"><span class="blog-word inline-block">terbaru</span></span>
        <span class="inline-block overflow-hidden align-top"><span class="blog-word inline-block">untuk</span></span>
        <span class="inline-block overflow-hidden align-top"><span class="blog-word inline-block">otomasi</span></span>
        <br class="hidden md:block" />
        <span class="inline-block overflow-hidden align-top"><span class="blog-word inline-block italic text-primary font-light blog-accent-text">bisnis</span></span>
        <span class="inline-block overflow-hidden align-top"><span class="blog-word inline-block italic text-primary font-light blog-accent-text">lokal.</span></span>
      </h2>
    </div>

    <!-- 3 Article Cards Grid (data-depth="foreground") -->
    <div data-depth="foreground" class="grid grid-cols-1 md:grid-cols-3 gap-6">
      {#each articles as article}
        <article
          class="blog-card group flex flex-col bg-white rounded-[24px] border border-border-hairline p-4 sm:p-5 shadow-sm hover:shadow-[0_18px_38px_rgba(0,105,72,0.1)] hover:border-primary/30 transition-[box-shadow,border-color] duration-300 will-change-transform"
        >
          <button
            type="button"
            onclick={() => openArticle(article)}
            class="text-left flex flex-col h-full w-full cursor-pointer bg-transparent border-0 p-0"
          >
            <div class="overflow-hidden rounded-2xl mb-4 relative border border-border-hairline aspect-video bg-surface-faint w-full">
              <img
                alt={article.alt}
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                src={article.image}
                loading="lazy"
                decoding="async"
              />
              <span class="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/95 text-primary text-[10px] font-label-bold shadow-xs border border-border-hairline">
                {article.category}
              </span>
            </div>

            <h3 class="font-headline-md text-[18px] leading-snug font-semibold text-on-surface mb-2.5 group-hover:text-primary transition-colors">
              {article.title}
            </h3>

            <p class="font-body-md text-[13.5px] text-text-muted mb-5 flex-grow leading-relaxed">
              {article.excerpt}
            </p>

            <div class="mt-auto pt-4 border-t border-border-hairline/60 w-full flex items-center justify-between">
              <span class="inline-flex items-center gap-1 text-sm font-label-bold text-on-surface group-hover:text-primary transition-colors">
                Baca Artikel
                <span class="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </span>
              <span class="text-[11px] font-label-sm text-text-muted">{article.readTime}</span>
            </div>
          </button>
        </article>
      {/each}
    </div>
  </div>
</section>

<!-- Article Reader Modal -->
{#if activeArticle}
  <div
    class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
    role="dialog"
    aria-modal="true"
    tabindex="-1"
    aria-label={activeArticle.title}
  >
    <button
      type="button"
      onclick={closeArticle}
      aria-label="Tutup artikel"
      class="absolute inset-0 w-full h-full bg-on-surface/75 backdrop-blur-sm border-0 cursor-default"
    ></button>

    <div class="relative z-10 bg-white rounded-[28px] border border-border-hairline shadow-2xl max-w-2xl w-full overflow-hidden max-h-[90vh] flex flex-col">
      <div class="px-6 py-4 border-b border-border-hairline flex items-center justify-between gap-4">
        <div class="flex items-center gap-2 text-xs font-label-bold text-primary">
          <span class="px-2.5 py-0.5 rounded-full bg-primary/10">{activeArticle.category}</span>
          <span class="text-text-muted font-medium">{activeArticle.readTime}</span>
        </div>
        <button
          type="button"
          onclick={closeArticle}
          aria-label="Tutup artikel"
          class="w-9 h-9 rounded-full bg-surface-container-low hover:bg-slate-200/80 text-on-surface flex items-center justify-center transition-colors cursor-pointer"
        >
          <span class="material-symbols-outlined text-[18px]">close</span>
        </button>
      </div>

      <div class="p-6 sm:p-8 overflow-y-auto space-y-5">
        <div class="rounded-2xl overflow-hidden border border-border-hairline aspect-video bg-surface-faint">
          <img src={activeArticle.image} alt={activeArticle.alt} class="w-full h-full object-cover" />
        </div>

        <h3 class="font-headline-md text-xl sm:text-2xl font-bold text-on-surface leading-snug">
          {activeArticle.title}
        </h3>

        <p class="font-body-md text-sm text-text-muted leading-relaxed">
          {activeArticle.excerpt}
        </p>

        <div class="bg-surface-container-low/55 rounded-2xl p-5 border border-surface-container-highest space-y-3">
          <p class="font-label-bold text-xs uppercase tracking-wider text-primary">Poin Penting di Lapangan:</p>
          <ul class="space-y-2.5">
            {#each activeArticle.points as point}
              <li class="flex items-start gap-2.5 text-sm text-on-surface leading-relaxed">
                <span class="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">check_circle</span>
                <span>{point}</span>
              </li>
            {/each}
          </ul>
        </div>

        <div class="p-4 rounded-2xl bg-primary/5 border border-primary/15">
          <p class="font-body-md text-xs sm:text-sm text-on-surface leading-relaxed font-medium">
            {activeArticle.takeaway}
          </p>
        </div>
      </div>

      <div class="px-6 py-4 border-t border-border-hairline bg-surface-faint flex flex-wrap items-center justify-between gap-3">
        <a
          href="/portfolio"
          class="inline-flex items-center gap-1.5 text-xs font-label-bold text-primary hover:underline"
        >
          <span>Lihat Solusi Terkait</span>
          <span class="material-symbols-outlined text-[15px]">arrow_forward</span>
        </a>
        <a
          href="https://wa.me/6285158418944?text=Halo%20Svralabs%2C%20saya%20ingin%20konsultasi%20setelah%20membaca%20artikel%20{encodeURIComponent(activeArticle.title)}"
          target="_blank"
          rel="noopener noreferrer"
          class="bg-primary text-on-primary px-5 py-2.5 rounded-full text-xs font-label-bold hover:bg-primary-container transition-colors inline-flex items-center gap-1.5"
        >
          <span class="material-symbols-outlined text-[16px]">chat</span>
          <span>Konsultasi Kebutuhan Ini</span>
        </a>
      </div>
    </div>
  </div>
{/if}
