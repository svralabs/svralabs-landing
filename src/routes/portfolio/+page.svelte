<script lang="ts">
  import { onMount } from 'svelte';
  import {
    portfolioItems,
    portfolioCategories,
    type PortfolioItem,
    type ProjectType
  } from '$lib/data/portfolio';
  import { tilt3D, magneticButton } from '$lib/actions/gsapParallax';

  let activeScope = $state<ProjectType>('system');
  let selectedCategory = $state<string>('all');
  let searchQuery = $state<string>('');

  // Quick Preview Lightbox Modal state (untuk Landing Page gallery)
  let previewProject = $state<PortfolioItem | null>(null);
  let previewSlideIndex = $state<number>(0);

  const systemItems = $derived(
    portfolioItems.filter((item) => item.projectType === 'system')
  );
  const landingItems = $derived(
    portfolioItems.filter((item) => item.projectType === 'landing-page')
  );

  // Kategori Landing Page diturunkan dinamis dari data sehingga selalu siap menampung kategori baru
  const landingCategories = $derived.by(() => {
    const seen = new Map<string, string>();
    for (const item of landingItems) {
      if (!seen.has(item.category)) {
        seen.set(item.category, item.categoryLabel);
      }
    }
    return [
      { id: 'all', label: 'Semua Desain' },
      ...Array.from(seen.entries()).map(([id, label]) => ({ id, label }))
    ];
  });

  const activeCategories = $derived(
    activeScope === 'system' ? portfolioCategories : landingCategories
  );

  const scopedItems = $derived(
    activeScope === 'system' ? systemItems : landingItems
  );

  const clientBrands = [
    {
      name: 'Puskesmas Wonokerto',
      sector: 'Kesehatan & Rekam Medis EMR',
      slug: 'puskesmas-wonokerto',
      monogram: 'PW',
      tag: 'Instansi Faskes'
    },
    {
      name: 'Konveksi Wonopringgo',
      sector: 'Grosir Tekstil & Multi-Gudang',
      slug: 'pos-wonopringgo',
      monogram: 'KW',
      tag: 'Garmen & Wholesale'
    },
    {
      name: 'Toko Kopi Seruni',
      sector: 'POS Kasir F&B & Resep HPP',
      slug: 'kopi-seruni',
      monogram: 'KS',
      tag: 'Cafe & Kuliner'
    },
    {
      name: 'Warmindo Garwo',
      sector: 'Procurement AI OCR Scanner',
      slug: 'purchasing-garwo',
      monogram: 'WG',
      tag: 'Procurement AI'
    },
    {
      name: 'SVRA Laundry Solutions',
      sector: 'Tracking QR & WhatsApp Bot',
      slug: 'laundry',
      monogram: 'SL',
      tag: 'Jasa & Operasional'
    }
  ];

  onMount(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const scopeParam = params.get('scope') || params.get('tab');
      const catParam = params.get('category');

      if (scopeParam === 'landing' || scopeParam === 'landing-page') {
        activeScope = 'landing-page';
      }

      if (catParam) {
        const belongsToLanding = landingItems.some((item) => item.category === catParam);
        if (belongsToLanding) {
          activeScope = 'landing-page';
        }
        selectedCategory = catParam;
      }
    }
  });

  const filteredItems = $derived.by(() => {
    let items = scopedItems;

    // Filter by Category
    if (selectedCategory === 'has-demo') {
      items = items.filter((item) => item.hasDemo);
    } else if (selectedCategory === 'has-case-study') {
      items = items.filter((item) => item.hasCaseStudy);
    } else if (selectedCategory !== 'all') {
      items = items.filter((item) => item.category === selectedCategory);
    }

    // Filter by Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      items = items.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.client.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.tagline.toLowerCase().includes(q) ||
          item.categoryLabel.toLowerCase().includes(q) ||
          item.features.some((f) => f.toLowerCase().includes(q)) ||
          item.techStack.some((t) => t.toLowerCase().includes(q))
      );
    }

    return items;
  });

  function switchScope(scope: ProjectType) {
    if (activeScope === scope) return;
    activeScope = scope;
    selectedCategory = 'all';
    searchQuery = '';
  }

  function clearFilters() {
    selectedCategory = 'all';
    searchQuery = '';
  }

  function openPreview(item: PortfolioItem, startIndex = 0) {
    previewProject = item;
    previewSlideIndex = startIndex;
  }

  function closePreview() {
    previewProject = null;
    previewSlideIndex = 0;
  }

  function nextSlide() {
    if (!previewProject || previewProject.gallery.length === 0) return;
    previewSlideIndex = (previewSlideIndex + 1) % previewProject.gallery.length;
  }

  function prevSlide() {
    if (!previewProject || previewProject.gallery.length === 0) return;
    previewSlideIndex =
      (previewSlideIndex - 1 + previewProject.gallery.length) %
      previewProject.gallery.length;
  }

  function handleKeydown(e: KeyboardEvent) {
    if (!previewProject) return;
    if (e.key === 'Escape') closePreview();
    if (e.key === 'ArrowRight') nextSlide();
    if (e.key === 'ArrowLeft') prevSlide();
  }
</script>

<svelte:window onkeydown={handleKeydown} />

<svelte:head>
  <title>Katalog Project & Live Demo Sistem | Svralabs</title>
  <meta name="description" content="Katalog project sistem digital, aplikasi web kustom, dan showcase landing page dari Svralabs. Uji coba live demo interaktif atau telusuri detail implementasinya." />
  <meta property="og:title" content="Katalog Project & Live Demo Sistem | Svralabs" />
  <meta property="og:description" content="Portofolio sistem bisnis teruji di lapangan serta showcase website dan landing page modern dari Svralabs." />
  <meta property="og:url" content="https://www.svralabs.com/portfolio" />
  <meta property="og:image" content="https://www.svralabs.com/logo.png" />
  <link rel="canonical" href="https://www.svralabs.com/portfolio" />
</svelte:head>

<div class="bg-surface text-on-surface antialiased min-h-screen font-body-md selection:bg-primary-container selection:text-on-primary-container flex flex-col justify-between">
  
  <!-- Dedicated Navbar Header -->
  <header class="fixed left-1/2 -translate-x-1/2 w-[95%] max-w-7xl rounded-full border z-50 top-6 bg-white/90 border-slate-200/80 shadow-[0_10px_30px_rgba(0,0,0,0.06)] backdrop-blur-md">
    <div class="flex justify-between items-center px-6 md:px-8 py-3.5">
      <div class="flex items-center gap-3">
        <a class="flex items-center" href="/" aria-label="Beranda Svralabs">
          <img src="/logo.webp" alt="Svralabs" class="h-7 md:h-8 w-auto object-contain" />
        </a>
        <span class="text-text-muted/40 hidden sm:inline">/</span>
        <span class="font-label-sm text-text-muted hidden sm:inline">Portofolio &amp; Demo</span>
      </div>

      <div class="flex items-center gap-4">
        <a href="/" class="text-text-muted hover:text-on-surface text-sm font-label-bold transition-colors hidden sm:inline-flex items-center gap-1">
          <span class="material-symbols-outlined text-[18px]">arrow_back</span>
          Beranda
        </a>
        <a 
          use:magneticButton={{ strength: 12 }} 
          href="https://wa.me/6285158418944?text=Halo%20Svralabs%2C%20saya%20tertarik%20dengan%20portofolio%20sistem%20digital%20Anda" 
          target="_blank" 
          rel="noopener noreferrer" 
          class="bg-on-surface text-surface px-5 py-2 rounded-full font-label-bold text-sm hover:bg-primary transition-colors duration-300 shadow-md inline-flex items-center gap-1.5"
        >
          <span>Konsultasi Proyek</span>
          <span class="material-symbols-outlined text-[16px]">chat</span>
        </a>
      </div>
    </div>
  </header>

  <main class="pt-32 pb-24 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto w-full">
    
    <!-- Hero Header -->
    <div class="text-center max-w-4xl mx-auto mb-10 md:mb-12">
      <div class="inline-flex items-center gap-2 bg-white px-4 py-1.5 rounded-full mb-6 border border-slate-200 shadow-[0_4px_14px_-2px_rgba(0,0,0,0.06)] select-none">
        <span class="material-symbols-outlined text-primary text-sm" style="font-variation-settings: 'FILL' 1;">folder_special</span>
        <span class="font-label-sm text-label-sm uppercase tracking-widest text-primary font-label-bold">WADAH PORTOFOLIO &amp; LIVE DEMO</span>
      </div>

      <h1 class="font-display-xl-mobile md:font-display-xl text-display-xl-mobile md:text-display-xl text-on-surface mb-6 tracking-tight leading-tight">
        Karya Nyata, <span class="italic font-light text-primary">Sistem &amp; Desain Teruji</span>
      </h1>

      <p class="font-body-lg text-body-lg text-text-muted max-w-2xl mx-auto leading-relaxed mb-8">
        {#if activeScope === 'system'}
          Demo dan portofolio adalah satu kesatuan. Setiap demo sistem lahir dari implementasi nyata di klien kami. Pelajari alur kerjanya melalui detail project, atau langsung uji coba demonya.
        {:else}
          Contoh website dan landing page yang kami rancang agar bisnismu terlihat terpercaya, enak dilihat di HP maupun laptop, dan memudahkan calon pelanggan memesan.
        {/if}
      </p>

      <!-- Dual-Track Scope Switcher -->
      <div class="inline-flex p-1.5 rounded-full bg-white border border-slate-200/90 shadow-[0_8px_24px_-6px_rgba(15,23,42,0.08)] mb-9 max-w-full overflow-x-auto">
        <button
          type="button"
          onclick={() => switchScope('system')}
          aria-pressed={activeScope === 'system'}
          class="inline-flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-label-bold transition-all duration-200 cursor-pointer whitespace-nowrap {activeScope === 'system' ? 'bg-primary text-white shadow-sm' : 'text-text-muted hover:text-on-surface hover:bg-surface-container-low/60'}"
        >
          <span class="material-symbols-outlined text-[18px]">developer_board</span>
          <span>Sistem &amp; Aplikasi Bisnis</span>
          <span class="px-2 py-0.5 rounded-full text-[11px] font-bold {activeScope === 'system' ? 'bg-white/20 text-white' : 'bg-slate-100 text-text-muted'}">
            {systemItems.length}
          </span>
        </button>

        <button
          type="button"
          onclick={() => switchScope('landing-page')}
          aria-pressed={activeScope === 'landing-page'}
          class="inline-flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-label-bold transition-all duration-200 cursor-pointer whitespace-nowrap {activeScope === 'landing-page' ? 'bg-primary text-white shadow-sm' : 'text-text-muted hover:text-on-surface hover:bg-surface-container-low/60'}"
        >
          <span class="material-symbols-outlined text-[18px]">web</span>
          <span>Website &amp; Landing Page</span>
          <span class="px-2 py-0.5 rounded-full text-[11px] font-bold {activeScope === 'landing-page' ? 'bg-white/20 text-white' : 'bg-slate-100 text-text-muted'}">
            {landingItems.length}
          </span>
        </button>
      </div>

      <!-- Contextual Metric Counter Bar -->
      <div class="max-w-3xl mx-auto pt-6 border-t border-border-hairline">
        {#if activeScope === 'system'}
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-border-hairline/60">
            <div class="text-center pt-2 sm:pt-0 sm:px-3">
              <p class="font-display-sm text-2xl sm:text-3xl font-bold text-on-surface tracking-tight">
                {systemItems.length}
              </p>
              <p class="font-label-sm text-[11px] font-bold text-text-muted uppercase tracking-wider mt-1">
                Project Sistem
              </p>
            </div>
            <div class="text-center pt-2 sm:pt-0 sm:px-3">
              <p class="font-display-sm text-2xl sm:text-3xl font-bold text-primary tracking-tight">
                {systemItems.filter((p) => p.hasDemo).length}
              </p>
              <p class="font-label-sm text-[11px] font-bold text-text-muted uppercase tracking-wider mt-1">
                Live Demo Siap Uji
              </p>
            </div>
            <div class="text-center pt-2 sm:pt-0 sm:px-3">
              <p class="font-display-sm text-2xl sm:text-3xl font-bold text-on-surface tracking-tight">
                {systemItems.filter((p) => p.hasCaseStudy).length}
              </p>
              <p class="font-label-sm text-[11px] font-bold text-text-muted uppercase tracking-wider mt-1">
                Detail Alur Kasus
              </p>
            </div>
            <div class="text-center pt-2 sm:pt-0 sm:px-3">
              <p class="font-display-sm text-2xl sm:text-3xl font-bold text-primary tracking-tight">
                100%
              </p>
              <p class="font-label-sm text-[11px] font-bold text-text-muted uppercase tracking-wider mt-1">
                Implementasi Nyata
              </p>
            </div>
          </div>
        {:else}
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-border-hairline/60">
            <div class="text-center pt-2 sm:pt-0 sm:px-3">
              <p class="font-display-sm text-2xl sm:text-3xl font-bold text-on-surface tracking-tight">
                {landingItems.length}
              </p>
              <p class="font-label-sm text-[11px] font-bold text-text-muted uppercase tracking-wider mt-1">
                Koleksi Website
              </p>
            </div>
            <div class="text-center pt-2 sm:pt-0 sm:px-3">
              <p class="font-display-sm text-2xl sm:text-3xl font-bold text-primary tracking-tight">
                {landingItems.filter((p) => p.hasDemo).length}
              </p>
              <p class="font-label-sm text-[11px] font-bold text-text-muted uppercase tracking-wider mt-1">
                Web Siap Dicoba
              </p>
            </div>
            <div class="text-center pt-2 sm:pt-0 sm:px-3">
              <p class="font-display-sm text-2xl sm:text-3xl font-bold text-on-surface tracking-tight">
                100%
              </p>
              <p class="font-label-sm text-[11px] font-bold text-text-muted uppercase tracking-wider mt-1">
                Desain Eksklusif
              </p>
            </div>
            <div class="text-center pt-2 sm:pt-0 sm:px-3">
              <p class="font-display-sm text-2xl sm:text-3xl font-bold text-primary tracking-tight">
                Cepat
              </p>
              <p class="font-label-sm text-[11px] font-bold text-text-muted uppercase tracking-wider mt-1">
                Rapi &amp; Ringan di HP
              </p>
            </div>
          </div>
        {/if}
      </div>
    </div>

    <!-- Client Brands Strip (Hanya relevan di track Sistem Bisnis) -->
    {#if activeScope === 'system'}
      <div class="mb-12 bg-white rounded-3xl p-6 border border-border-hairline shadow-2xs">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 border-b border-border-hairline/70 pb-4">
          <div>
            <h2 class="font-headline-md text-base sm:text-lg font-bold text-on-surface flex items-center gap-2">
              <span class="material-symbols-outlined text-primary text-[18px]">verified</span>
              Brand &amp; Instansi yang Bekerja Sama
            </h2>
            <p class="font-body-md text-xs text-text-muted mt-0.5">
              Sistem produksi aktif yang dikembangkan dan dioperasikan oleh klien Svralabs.
            </p>
          </div>
          <span class="text-[11px] font-label-bold text-primary bg-primary/10 px-3 py-1 rounded-full self-start sm:self-auto">
            5 Klien Terverifikasi
          </span>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {#each clientBrands as brand}
            <a
              href="/project/{brand.slug}"
              class="group bg-surface-container-lowest hover:bg-slate-50 rounded-2xl p-3.5 border border-border-hairline hover:border-primary/40 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div class="flex items-center justify-between mb-2">
                  <div class="w-8 h-8 rounded-xl bg-surface-container-high group-hover:bg-primary text-on-surface group-hover:text-white flex items-center justify-center font-mono font-bold text-xs tracking-wider transition-colors shadow-2xs">
                    {brand.monogram}
                  </div>
                  <span class="text-[9px] font-label-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                    {brand.tag}
                  </span>
                </div>
                <h3 class="font-headline-md text-xs font-bold text-on-surface group-hover:text-primary transition-colors leading-snug">
                  {brand.name}
                </h3>
                <p class="font-body-md text-[10px] text-text-muted mt-0.5 line-clamp-1">
                  {brand.sector}
                </p>
              </div>
              <div class="pt-2 mt-2 border-t border-border-hairline/60 flex items-center justify-between text-[10px] text-text-muted group-hover:text-primary font-label-bold">
                <span>Buka Project</span>
                <span class="material-symbols-outlined text-[13px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </div>
            </a>
          {/each}
        </div>
      </div>
    {:else}
      <div class="mb-10 bg-surface-container-low/65 rounded-3xl p-5 sm:p-6 border border-surface-container-highest flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div class="flex items-start sm:items-center gap-3.5">
          <div class="w-10 h-10 rounded-2xl bg-white border border-border-hairline flex items-center justify-center text-primary shrink-0 shadow-2xs">
            <span class="material-symbols-outlined text-[20px]">language</span>
          </div>
          <div>
            <h2 class="font-headline-md text-sm sm:text-base font-bold text-on-surface">
              Bisa Langsung Kamu Klik dan Coba Sendiri
            </h2>
            <p class="font-body-md text-xs text-text-muted mt-0.5">
              Semua contoh website di bawah ini sudah online dan bisa langsung kamu coba alur booking-nya lewat <span class="font-mono text-on-surface font-medium">demo.svralabs.com</span>.
            </p>
          </div>
        </div>
        <a
          href="https://demo.svralabs.com/landing"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-1.5 text-xs font-label-bold text-primary bg-white hover:bg-primary hover:text-white border border-primary/20 px-4 py-2 rounded-full transition-colors self-start sm:self-auto shrink-0 shadow-2xs"
        >
          <span>Lihat Semua Demo Web</span>
          <span class="material-symbols-outlined text-[15px]">open_in_new</span>
        </a>
      </div>
    {/if}

    <!-- Search & Filter Bar -->
    <div class="mb-10 flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
      
      <!-- Category Filter Pills -->
      <div class="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none no-scrollbar">
        {#each activeCategories as cat}
          <button
            type="button"
            onclick={() => selectedCategory = cat.id}
            class="px-4 py-2 rounded-full text-xs font-label-bold tracking-wide whitespace-nowrap transition-all duration-200 cursor-pointer border {selectedCategory === cat.id ? 'bg-primary text-white border-primary shadow-sm' : 'bg-surface-container-lowest text-text-muted border-border-hairline hover:border-slate-300 hover:text-on-surface'}"
          >
            {cat.label}
          </button>
        {/each}
      </div>

      <!-- Search Input -->
      <div class="relative min-w-[260px] md:w-72">
        <span class="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted/60 text-[18px]">search</span>
        <input
          id="portfolio-search"
          name="search"
          aria-label="Cari portofolio atau demo"
          type="text"
          bind:value={searchQuery}
          placeholder={activeScope === 'system' ? 'Cari sistem, kasir, laundry...' : 'Cari desain padel, tennis, toko...'}
          class="w-full bg-surface-container-lowest border border-border-hairline rounded-full pl-10 pr-8 py-2 text-xs font-body-md text-on-surface placeholder:text-text-muted/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
        />
        {#if searchQuery}
          <button 
            type="button"
            onclick={() => searchQuery = ''}
            aria-label="Hapus pencarian"
            class="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-text-muted/60 hover:text-on-surface text-[16px] cursor-pointer"
          >
            close
          </button>
        {/if}
      </div>
    </div>

    <!-- Results Status Info -->
    <div class="mb-6 flex justify-between items-center text-xs text-text-muted font-label-bold">
      <p>
        Menampilkan <span class="text-on-surface font-bold">{filteredItems.length}</span> dari {scopedItems.length} {activeScope === 'system' ? 'sistem' : 'desain landing page'}
      </p>
      {#if selectedCategory !== 'all' || searchQuery}
        <button 
          type="button"
          onclick={clearFilters}
          class="text-primary hover:underline inline-flex items-center gap-1 cursor-pointer"
        >
          <span class="material-symbols-outlined text-[14px]">refresh</span>
          Reset Filter
        </button>
      {/if}
    </div>

    <!-- Portfolio Grid: Adaptif antara Track Sistem & Track Landing Page -->
    {#if filteredItems.length > 0}
      {#if activeScope === 'system'}
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {#each filteredItems as item (item.id)}
            <article 
              use:tilt3D={{ maxTilt: 3, perspective: 1000, glare: false }}
              class="bg-white rounded-[28px] border border-border-hairline overflow-hidden flex flex-col justify-between shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,105,72,0.1)] transition-[box-shadow,border-color] duration-300 group hover:border-primary/30"
            >
              <div>
                <!-- Thumbnail Frame with Badges -->
                <div class="relative aspect-[16/10] w-full overflow-hidden bg-slate-950 flex items-center justify-center p-2.5 sm:p-3 border-b border-border-hairline group/thumb">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    loading="lazy"
                    decoding="async"
                    class="w-full h-full object-contain rounded-lg shadow-sm group-hover:scale-[1.02] transition-transform duration-300"
                  />
                  
                  <!-- Status Badges Overlay -->
                  <div class="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10 pointer-events-none">
                    {#if item.hasDemo}
                      <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary text-on-primary text-[10px] font-label-bold uppercase tracking-wider shadow-sm">
                        <span class="material-symbols-outlined text-[13px]">play_circle</span>
                        Live Demo
                      </span>
                    {/if}
                    {#if item.hasCaseStudy}
                      <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-xs text-white text-[10px] font-label-bold uppercase tracking-wider shadow-sm border border-white/10">
                        <span class="material-symbols-outlined text-[13px]">assignment</span>
                        Detail Project
                      </span>
                    {/if}
                  </div>

                  <div class="absolute top-3 right-3 z-10 pointer-events-none">
                    <span class="inline-block px-2.5 py-1 rounded-full bg-white/95 text-on-surface text-[10px] font-label-bold shadow-sm border border-border-hairline">
                      {item.client}
                    </span>
                  </div>
                </div>

                <!-- Content Body -->
                <div class="p-6">
                  <p class="font-label-sm text-[11px] uppercase tracking-wider text-primary font-label-bold mb-2">
                    {item.categoryLabel} · {item.year}
                  </p>

                  <h3 class="font-headline-md text-lg font-bold text-on-surface group-hover:text-primary transition-colors leading-snug mb-3">
                    {item.title}
                  </h3>

                  <p class="font-body-md text-xs text-text-muted leading-relaxed line-clamp-3 mb-5">
                    {item.tagline}
                  </p>

                  <!-- Key Metrics Badges -->
                  <div class="grid grid-cols-3 gap-2 py-3 px-3 bg-surface-container-lowest rounded-xl border border-border-hairline mb-5">
                    {#each item.metrics as metric}
                      <div class="text-center">
                        <p class="text-xs font-bold text-primary truncate">{metric.value}</p>
                        <p class="text-[9px] text-text-muted uppercase tracking-tight truncate">{metric.label}</p>
                      </div>
                    {/each}
                  </div>

                  <!-- Features Highlights -->
                  <div class="space-y-1.5 mb-5">
                    {#each item.features.slice(0, 3) as feat}
                      <div class="flex items-center gap-2 text-xs text-on-surface/90">
                        <span class="material-symbols-outlined text-primary text-[14px]">check_circle</span>
                        <span class="truncate">{feat}</span>
                      </div>
                    {/each}
                  </div>

                  <!-- Tech Stack Chips -->
                  <div class="flex flex-wrap gap-1.5 pt-3 border-t border-border-hairline">
                    {#each item.techStack as tech}
                      <span class="px-2 py-0.5 rounded-md bg-surface text-text-muted text-[10px] font-mono">
                        {tech}
                      </span>
                    {/each}
                  </div>
                </div>
              </div>

              <!-- Card Action Footer -->
              <div class="p-6 pt-0 border-t border-border-hairline/60 mt-4 flex flex-col gap-2.5">
                {#if item.hasDemo && item.demoUrl}
                  <a
                    href={item.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="w-full inline-flex items-center justify-center gap-2 bg-primary text-on-primary py-2.5 px-4 rounded-full font-label-bold text-xs hover:bg-primary-container transition-colors shadow-sm"
                  >
                    <span class="material-symbols-outlined text-[16px]">play_circle</span>
                    <span>Coba Live Demo Interaktif</span>
                    <span class="material-symbols-outlined text-[14px]">open_in_new</span>
                  </a>
                {:else}
                  <div class="py-2 px-3 rounded-full bg-surface-container text-text-muted text-[11px] font-medium text-center flex items-center justify-center gap-1.5 select-none">
                    <span class="material-symbols-outlined text-[14px] text-text-muted">lock</span>
                    <span>Sistem Intranet Klien (Data Privat)</span>
                  </div>
                {/if}

                {#if item.hasCaseStudy && item.caseStudyUrl}
                  <a
                    href={item.caseStudyUrl}
                    class="w-full inline-flex items-center justify-center gap-1.5 text-on-surface hover:text-primary py-2 px-4 rounded-full font-label-bold text-xs hover:bg-surface-container-lowest transition-colors border border-border-hairline"
                  >
                    <span>Lihat Detail Project</span>
                    <span class="material-symbols-outlined text-[14px]">arrow_forward</span>
                  </a>
                {/if}
              </div>
            </article>
          {/each}
        </div>
      {:else}
        <!-- Visual-First Landing Page Grid -->
        <div class="grid gap-8 {filteredItems.length <= 2 ? 'grid-cols-1 md:grid-cols-2 max-w-5xl mx-auto' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}">
          {#each filteredItems as item (item.id)}
            <article 
              use:tilt3D={{ maxTilt: 2.5, perspective: 1100, glare: false }}
              class="bg-white rounded-[28px] border border-border-hairline overflow-hidden flex flex-col justify-between shadow-[0_12px_32px_rgba(15,23,42,0.05)] hover:shadow-[0_22px_45px_rgba(0,105,72,0.1)] transition-[box-shadow,border-color] duration-300 group hover:border-primary/35"
            >
              <div>
                <!-- Minimalist Browser Frame Header + Edge-to-Edge Live Preview -->
                <div class="border-b border-border-hairline bg-surface-container-low/50">
                  <div class="px-4 py-2.5 flex items-center justify-between border-b border-border-hairline/80 bg-white/90">
                    <div class="flex items-center gap-1.5">
                      <span class="w-2.5 h-2.5 rounded-full bg-slate-200"></span>
                      <span class="w-2.5 h-2.5 rounded-full bg-slate-200"></span>
                      <span class="w-2.5 h-2.5 rounded-full bg-slate-200"></span>
                    </div>
                    <span class="px-3 py-0.5 rounded-full bg-surface-container-low text-[10px] font-mono text-text-muted border border-border-hairline/70 truncate max-w-[200px] sm:max-w-[240px]">
                      demo.svralabs.com/landing/{item.slug}
                    </span>
                    <button
                      type="button"
                      onclick={() => openPreview(item, 0)}
                      aria-label="Preview layar {item.client}"
                      class="w-6 h-6 rounded-full hover:bg-primary/10 text-text-muted hover:text-primary flex items-center justify-center transition-colors cursor-pointer"
                      title="Preview Layar"
                    >
                      <span class="material-symbols-outlined text-[15px]">zoom_in</span>
                    </button>
                  </div>

                  <button
                    type="button"
                    onclick={() => openPreview(item, 0)}
                    aria-label="Buka galeri preview {item.client}"
                    class="relative aspect-[21/10] w-full overflow-hidden bg-white block cursor-zoom-in text-left p-0 border-0"
                  >
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      loading="lazy"
                      decoding="async"
                      class="w-full h-full object-cover object-top group-hover:scale-[1.02] transition-transform duration-500"
                    />
                    <div class="absolute inset-0 bg-gradient-to-t from-on-surface/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4">
                      <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 text-on-surface text-[11px] font-label-bold shadow-sm">
                        <span class="material-symbols-outlined text-[14px] text-primary">photo_library</span>
                        <span>{item.gallery.length} Layar Tersedia</span>
                      </span>
                    </div>
                  </button>
                </div>

                <!-- Content Body -->
                <div class="p-6">
                  <div class="flex items-center justify-between gap-2 mb-2.5">
                    <p class="font-label-sm text-[11px] uppercase tracking-wider text-primary font-label-bold">
                      {item.categoryLabel} · {item.year}
                    </p>
                    <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-surface-container text-primary text-[10px] font-label-bold">
                      <span class="w-1.5 h-1.5 rounded-full bg-primary"></span>
                      Live Website
                    </span>
                  </div>

                  <h3 class="font-headline-md text-xl font-bold text-on-surface group-hover:text-primary transition-colors leading-snug mb-2.5">
                    {item.title}
                  </h3>

                  <p class="font-body-md text-xs text-text-muted leading-relaxed line-clamp-3 mb-5">
                    {item.tagline}
                  </p>

                  <!-- Web Craft & Performance Pillars -->
                  <div class="grid grid-cols-3 gap-2 py-3 px-3 bg-surface-container-low/55 rounded-xl border border-surface-container-highest mb-5">
                    {#each item.metrics as metric}
                      <div class="text-center">
                        <p class="text-xs font-bold text-primary truncate">{metric.value}</p>
                        <p class="text-[9px] text-text-muted uppercase tracking-tight truncate">{metric.label}</p>
                      </div>
                    {/each}
                  </div>

                  <!-- Conversion & Visual Craft Highlights -->
                  <div class="space-y-1.5 mb-5">
                    {#each item.features.slice(0, 3) as feat}
                      <div class="flex items-center gap-2 text-xs text-on-surface/90">
                        <span class="material-symbols-outlined text-primary text-[14px]">check_circle</span>
                        <span class="truncate">{feat}</span>
                      </div>
                    {/each}
                  </div>

                  <!-- Tech Stack Chips -->
                  <div class="flex flex-wrap gap-1.5 pt-3 border-t border-border-hairline">
                    {#each item.techStack as tech}
                      <span class="px-2 py-0.5 rounded-md bg-surface-container-low text-on-surface-variant text-[10px] font-mono border border-surface-container-highest/60">
                        {tech}
                      </span>
                    {/each}
                  </div>
                </div>
              </div>

              <!-- Landing Page Dual Action Footer -->
              <div class="p-6 pt-0 border-t border-border-hairline/60 mt-2 flex flex-col gap-2.5">
                {#if item.demoUrl}
                  <a
                    href={item.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="w-full inline-flex items-center justify-center gap-2 bg-primary text-on-primary py-2.5 px-4 rounded-full font-label-bold text-xs hover:bg-primary-container transition-colors shadow-sm"
                  >
                    <span class="material-symbols-outlined text-[16px]">play_circle</span>
                    <span>Buka Website Live</span>
                    <span class="material-symbols-outlined text-[14px]">open_in_new</span>
                  </a>
                {/if}

                <div class="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onclick={() => openPreview(item, 0)}
                    class="w-full inline-flex items-center justify-center gap-1.5 text-on-surface hover:text-primary py-2 px-3 rounded-full font-label-bold text-xs hover:bg-surface-container-low/70 transition-colors border border-border-hairline cursor-pointer"
                  >
                    <span class="material-symbols-outlined text-[15px]">photo_library</span>
                    <span>Preview Layar</span>
                  </button>

                  {#if item.hasCaseStudy && item.caseStudyUrl}
                    <a
                      href={item.caseStudyUrl}
                      class="w-full inline-flex items-center justify-center gap-1.5 text-on-surface hover:text-primary py-2 px-3 rounded-full font-label-bold text-xs hover:bg-surface-container-low/70 transition-colors border border-border-hairline"
                    >
                      <span>Konsep Desain</span>
                      <span class="material-symbols-outlined text-[14px]">arrow_forward</span>
                    </a>
                  {/if}
                </div>
              </div>
            </article>
          {/each}
        </div>
      {/if}
    {:else}
      <!-- Empty State -->
      <div class="text-center py-20 bg-surface-container-lowest rounded-3xl border border-dashed border-border-hairline max-w-xl mx-auto">
        <span class="material-symbols-outlined text-4xl text-text-muted/50 mb-3">search_off</span>
        <h3 class="text-base font-bold text-on-surface mb-1">Tidak ada portofolio yang cocok</h3>
        <p class="text-xs text-text-muted mb-6">Coba ganti kata kunci pencarian atau bersihkan filter kategori yang dipilih.</p>
        <button
          type="button"
          onclick={clearFilters}
          class="bg-primary text-on-primary px-6 py-2 rounded-full font-label-bold text-xs hover:bg-primary-container transition-colors shadow-sm inline-flex items-center gap-1.5 cursor-pointer"
        >
          <span>Tampilkan Semua Portofolio</span>
          <span class="material-symbols-outlined text-[14px]">refresh</span>
        </button>
      </div>
    {/if}

    <!-- Bottom CTA Section -->
    <section class="mt-20 bg-surface-container-lowest rounded-[32px] p-8 md:p-14 border border-border-hairline text-center shadow-sm relative overflow-hidden">
      <div class="max-w-3xl mx-auto relative z-10">
        <span class="inline-block bg-primary/10 text-primary font-label-sm text-label-sm uppercase tracking-wider px-4 py-1.5 rounded-full mb-6 font-bold">
          SOLUSI KUSTOM &amp; KONSULTASI
        </span>
        <h2 class="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-4 tracking-tight">
          {activeScope === 'system'
            ? 'Punya Kebutuhan Sistem Digital Khusus?'
            : 'Butuh Website atau Landing Page Berkarakter?'}
        </h2>
        <p class="font-body-lg text-body-lg text-text-muted mb-8 leading-relaxed max-w-2xl mx-auto">
          {activeScope === 'system'
            ? 'Tidak menemukan fitur yang pas di katalog? Svralabs siap merancang dan membangun sistem bisnis yang 100% disesuaikan dengan alur operasional usahamu.'
            : 'Ceritakan gambaran usaha dan target pembelimu. Tim Svralabs siap buatkan website yang tampil meyakinkan, enak dilihat di HP, dan memudahkan calon pelanggan memesan.'}
        </p>
        <div class="flex flex-col sm:flex-row justify-center items-center gap-4">
          <a
            use:magneticButton={{ strength: 14 }}
            href="https://wa.me/6285158418944?text=Halo%20Svralabs%2C%20saya%20mau%20konsultasi%20pembuatan%20sistem%20atau%20landing%20page"
            target="_blank"
            rel="noopener noreferrer"
            class="bg-primary text-on-primary px-8 py-3.5 rounded-full font-label-bold text-sm hover:bg-primary-container transition-colors duration-300 shadow-md flex items-center justify-center gap-2 w-full sm:w-auto"
          >
            <span class="material-symbols-outlined text-[18px]">chat</span>
            <span>Konsultasi Gratis via WhatsApp</span>
          </a>
          <a
            href="/"
            class="bg-surface-container-lowest text-on-surface border border-border-hairline px-8 py-3.5 rounded-full font-label-bold text-sm hover:bg-surface-container transition-colors duration-300 shadow-sm flex items-center justify-center gap-2 w-full sm:w-auto"
          >
            <span class="material-symbols-outlined text-[18px]">arrow_back</span>
            <span>Kembali ke Beranda</span>
          </a>
        </div>
      </div>
    </section>

  </main>

  <!-- Clean Footer -->
  <footer class="bg-surface-container-lowest border-t border-border-hairline py-8 text-center text-text-muted font-label-bold text-xs">
    <div class="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
      <div class="flex items-center gap-2">
        <img src="/logo.webp" alt="Svralabs" class="h-5 w-auto" />
        <span>© 2026 Svralabs. Digitalisasi UMKM gak perlu mahal dan ribet.</span>
      </div>
      <div class="flex items-center gap-4">
        <a href="/" class="hover:text-primary transition-colors">Beranda</a>
        <span>·</span>
        <a href="/portfolio" class="text-primary font-bold">Portofolio &amp; Demo</a>
        <span>·</span>
        <a href="/#kontak" class="hover:text-primary transition-colors">Kontak</a>
      </div>
    </div>
  </footer>
</div>

<!-- Interactive Preview Layar Lightbox Modal -->
{#if previewProject}
  {@const currentSlide = previewProject.gallery[previewSlideIndex]}
  <div
    class="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6"
    role="dialog"
    aria-modal="true"
    tabindex="-1"
    aria-label="Preview Layar {previewProject.client}"
  >
    <button
      type="button"
      onclick={closePreview}
      aria-label="Tutup preview"
      class="absolute inset-0 w-full h-full bg-on-surface/80 backdrop-blur-sm border-0 cursor-default"
    ></button>
    <div class="relative z-10 bg-white rounded-[28px] border border-border-hairline shadow-2xl max-w-5xl w-full overflow-hidden flex flex-col max-h-[92vh]">
      <!-- Modal Header -->
      <div class="px-5 sm:px-6 py-4 border-b border-border-hairline flex items-center justify-between gap-4 bg-white">
        <div class="min-w-0">
          <div class="flex items-center gap-2 text-[11px] font-label-bold text-primary uppercase tracking-wider">
            <span>{previewProject.client}</span>
            <span class="text-text-muted/40">·</span>
            <span>{previewSlideIndex + 1} / {previewProject.gallery.length}</span>
          </div>
          <h3 class="font-headline-md text-sm sm:text-base font-bold text-on-surface truncate mt-0.5">
            {currentSlide?.title || previewProject.title}
          </h3>
        </div>

        <div class="flex items-center gap-2 shrink-0">
          {#if previewProject.demoUrl}
            <a
              href={previewProject.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              class="hidden sm:inline-flex items-center gap-1.5 bg-primary text-on-primary px-4 py-2 rounded-full text-xs font-label-bold hover:bg-primary-container transition-colors"
            >
              <span>Buka Website Live</span>
              <span class="material-symbols-outlined text-[14px]">open_in_new</span>
            </a>
          {/if}
          <button
            type="button"
            onclick={closePreview}
            aria-label="Tutup preview"
            class="w-9 h-9 rounded-full bg-surface-container-low hover:bg-slate-200/80 text-on-surface flex items-center justify-center transition-colors cursor-pointer"
          >
            <span class="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>
      </div>

      <!-- Main Image Viewport -->
      <div class="relative bg-slate-100 flex-1 min-h-0 flex items-center justify-center overflow-hidden p-3 sm:p-5">
        {#if currentSlide}
          <img
            src={currentSlide.image}
            alt={currentSlide.title}
            class="max-h-[58vh] w-auto max-w-full rounded-2xl border border-border-hairline shadow-md object-contain bg-white"
          />
        {/if}

        {#if previewProject.gallery.length > 1}
          <button
            type="button"
            onclick={prevSlide}
            aria-label="Slide sebelumnya"
            class="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/95 hover:bg-white text-on-surface border border-border-hairline shadow-md flex items-center justify-center transition-transform hover:scale-105 cursor-pointer"
          >
            <span class="material-symbols-outlined text-[20px]">chevron_left</span>
          </button>
          <button
            type="button"
            onclick={nextSlide}
            aria-label="Slide berikutnya"
            class="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/95 hover:bg-white text-on-surface border border-border-hairline shadow-md flex items-center justify-center transition-transform hover:scale-105 cursor-pointer"
          >
            <span class="material-symbols-outlined text-[20px]">chevron_right</span>
          </button>
        {/if}
      </div>

      <!-- Modal Caption & Section Switcher Strip -->
      <div class="px-5 sm:px-6 py-4 border-t border-border-hairline bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <p class="font-body-md text-xs text-text-muted leading-relaxed max-w-xl">
          {currentSlide?.desc || previewProject.description}
        </p>

        <div class="flex items-center gap-2 overflow-x-auto shrink-0 pb-1 sm:pb-0">
          {#each previewProject.gallery as slide, i}
            <button
              type="button"
              onclick={() => (previewSlideIndex = i)}
              class="px-3 py-1.5 rounded-full text-[11px] font-label-bold whitespace-nowrap transition-colors cursor-pointer border {previewSlideIndex === i ? 'bg-primary text-white border-primary' : 'bg-surface-container-low/70 text-text-muted border-border-hairline hover:text-on-surface'}"
            >
              {i + 1}. {slide.title.split(' ')[0]}
            </button>
          {/each}
        </div>
      </div>
    </div>
  </div>
{/if}
