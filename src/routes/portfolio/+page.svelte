<script lang="ts">
  import { onMount } from 'svelte';
  import { portfolioItems, portfolioCategories, type PortfolioItem } from '$lib/data/portfolio';
  import { tilt3D, magneticButton } from '$lib/actions/gsapParallax';

  let selectedCategory = $state<string>('all');
  let searchQuery = $state<string>('');

  onMount(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  });

  const filteredItems = $derived.by(() => {
    let items = portfolioItems;

    // Filter by Category
    if (selectedCategory === 'has-demo') {
      items = items.filter(item => item.hasDemo);
    } else if (selectedCategory === 'has-case-study') {
      items = items.filter(item => item.hasCaseStudy);
    } else if (selectedCategory !== 'all') {
      items = items.filter(item => item.category === selectedCategory);
    }

    // Filter by Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      items = items.filter(item => 
        item.title.toLowerCase().includes(q) ||
        item.client.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.tagline.toLowerCase().includes(q) ||
        item.categoryLabel.toLowerCase().includes(q) ||
        item.features.some(f => f.toLowerCase().includes(q)) ||
        item.techStack.some(t => t.toLowerCase().includes(q))
      );
    }

    return items;
  });

  function clearFilters() {
    selectedCategory = 'all';
    searchQuery = '';
  }
</script>

<svelte:head>
  <title>Katalog Portofolio & Live Demo Sistem | Svralabs</title>
  <meta name="description" content="Katalog portofolio sistem digital dan live demo interaktif Svralabs. Sistem kasir POS, rekam medis EMR, manajemen laundry, dan otomasi operasional bisnis." />
  <meta property="og:title" content="Katalog Portofolio & Live Demo Sistem | Svralabs" />
  <meta property="og:description" content="Setiap demo yang kami buat lahir dari portofolio nyata yang teruji di lapangan. Uji coba live demo atau baca bedah studi kasusnya." />
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
        <span class="font-label-sm text-text-muted hidden sm:inline">Portofolio & Demo</span>
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
    <div class="text-center max-w-4xl mx-auto mb-12 md:mb-16">
      <div class="inline-flex items-center gap-2 bg-white px-4 py-1.5 rounded-full mb-6 border border-slate-200 shadow-[0_4px_14px_-2px_rgba(0,0,0,0.06)] select-none">
        <span class="material-symbols-outlined text-primary text-sm" style="font-variation-settings: 'FILL' 1;">folder_special</span>
        <span class="font-label-sm text-label-sm uppercase tracking-widest text-primary font-label-bold">WADAH PORTOFOLIO &amp; LIVE DEMO</span>
      </div>

      <h1 class="font-display-xl-mobile md:font-display-xl text-display-xl-mobile md:text-display-xl text-on-surface mb-6 tracking-tight leading-tight">
        Karya Nyata, <span class="italic font-light text-primary">Sistem Teruji</span>
      </h1>

      <p class="font-body-lg text-body-lg text-text-muted max-w-2xl mx-auto leading-relaxed mb-8">
        Demo dan portofolio adalah satu kesatuan. Setiap demo yang kami bangun lahir dari implementasi nyata di klien kami. Pelajari alur kerjanya melalui studi kasus, atau langsung uji coba interaktif demonya.
      </p>

      <!-- Quick Metrics Strip -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto pt-4 border-t border-border-hairline text-left">
        <div class="p-3 bg-surface-container-lowest rounded-2xl border border-border-hairline">
          <p class="text-xs text-text-muted font-label-bold uppercase tracking-wider">Total Portofolio</p>
          <p class="text-xl md:text-2xl font-bold text-primary">{portfolioItems.length} Sistem</p>
        </div>
        <div class="p-3 bg-surface-container-lowest rounded-2xl border border-border-hairline">
          <p class="text-xs text-text-muted font-label-bold uppercase tracking-wider">Live Demo Terbuka</p>
          <p class="text-xl md:text-2xl font-bold text-on-surface">{portfolioItems.filter(p => p.hasDemo).length} Aplikasi</p>
        </div>
        <div class="p-3 bg-surface-container-lowest rounded-2xl border border-border-hairline">
          <p class="text-xs text-text-muted font-label-bold uppercase tracking-wider">Studi Kasus Lengkap</p>
          <p class="text-xl md:text-2xl font-bold text-primary">{portfolioItems.filter(p => p.hasCaseStudy).length} Dokumentasi</p>
        </div>
        <div class="p-3 bg-surface-container-lowest rounded-2xl border border-border-hairline">
          <p class="text-xs text-text-muted font-label-bold uppercase tracking-wider">Tingkat Utilisasi</p>
          <p class="text-xl md:text-2xl font-bold text-on-surface">100% Teruji</p>
        </div>
      </div>
    </div>

    <!-- Search & Filter Bar -->
    <div class="mb-10 flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
      
      <!-- Category Filter Pills -->
      <div class="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none no-scrollbar">
        {#each portfolioCategories as cat}
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
          placeholder="Cari sistem, kasir, laundry..."
          class="w-full bg-surface-container-lowest border border-border-hairline rounded-full pl-10 pr-8 py-2 text-xs font-body-md text-on-surface placeholder:text-text-muted/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
        />
        {#if searchQuery}
          <button 
            type="button"
            onclick={() => searchQuery = ''}
            class="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-text-muted/60 hover:text-on-surface text-[16px] cursor-pointer"
          >
            close
          </button>
        {/if}
      </div>
    </div>

    <!-- Results Status Info -->
    <div class="mb-6 flex justify-between items-center text-xs text-text-muted font-label-bold">
      <p>Menampilkan <span class="text-on-surface font-bold">{filteredItems.length}</span> dari {portfolioItems.length} sistem</p>
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

    <!-- Portfolio & Demo Grid -->
    {#if filteredItems.length > 0}
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {#each filteredItems as item (item.id)}
          <article 
            use:tilt3D={{ maxTilt: 3, perspective: 1000, glare: false }}
            class="bg-white rounded-[28px] border border-border-hairline overflow-hidden flex flex-col justify-between shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,105,72,0.1)] transition-[box-shadow,border-color] duration-300 group hover:border-primary/30"
          >
            <div>
              <!-- Thumbnail Frame with Badges -->
              <div class="relative aspect-video w-full overflow-hidden bg-slate-900 border-b border-border-hairline">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  loading="lazy"
                  class="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                
                <!-- Status Badges Overlay -->
                <div class="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
                  {#if item.hasDemo}
                    <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-600/95 text-white text-[10px] font-label-bold uppercase tracking-wider shadow-sm">
                      <span class="h-1.5 w-1.5 rounded-full bg-white animate-pulse"></span>
                      Live Demo
                    </span>
                  {/if}
                  {#if item.hasCaseStudy}
                    <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-label-bold uppercase tracking-wider shadow-sm">
                      <span class="material-symbols-outlined text-[12px]">description</span>
                      Studi Kasus
                    </span>
                  {/if}
                </div>

                <div class="absolute top-3 right-3 z-10">
                  <span class="inline-block px-2.5 py-1 rounded-full bg-white/90 text-on-surface text-[10px] font-label-bold shadow-sm">
                    {item.client}
                  </span>
                </div>
              </div>

              <!-- Content Body -->
              <div class="p-6">
                <!-- Category Label -->
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

            <!-- Card Action Footer (Dual Actions: Demo & Studi Kasus) -->
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
                  <span>Baca Bedah Studi Kasus</span>
                  <span class="material-symbols-outlined text-[14px]">arrow_forward</span>
                </a>
              {/if}
            </div>
          </article>
        {/each}
      </div>
    {:else}
      <!-- Empty State -->
      <div class="text-center py-20 bg-surface-container-lowest rounded-3xl border border-dashed border-border-hairline max-w-xl mx-auto">
        <span class="material-symbols-outlined text-4xl text-text-muted/50 mb-3">search_off</span>
        <h3 class="text-base font-bold text-on-surface mb-1">Tidak ada portofolio yang cocok</h3>
        <p class="text-xs text-text-muted mb-6">Coba ganti kata kunci pencarian atau bersihkan filter kategori yang dipilih.</p>
        <button
          type="button"
          onclick={clearFilters}
          class="bg-primary text-on-primary px-6 py-2 rounded-full font-label-bold text-xs hover:bg-primary-container transition-colors shadow-sm inline-flex items-center gap-1.5"
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
          Punya Kebutuhan Sistem Digital Khusus?
        </h2>
        <p class="font-body-lg text-body-lg text-text-muted mb-8 leading-relaxed max-w-2xl mx-auto">
          Tidak menemukan fitur yang pas di katalog? Svralabs siap merancang dan membangun sistem bisnis yang 100% disesuaikan dengan alur operasional usahamu.
        </p>
        <div class="flex flex-col sm:flex-row justify-center items-center gap-4">
          <a
            use:magneticButton={{ strength: 14 }}
            href="https://wa.me/6285158418944?text=Halo%20Svralabs%2C%20saya%20mau%20konsultasi%20pembuatan%20sistem%20kustom"
            target="_blank"
            rel="noopener noreferrer"
            class="bg-primary text-on-primary px-8 py-3.5 rounded-full font-label-bold text-sm hover:bg-primary-container transition-colors duration-300 shadow-md flex items-center justify-center gap-2 w-full sm:w-auto"
          >
            <span class="material-symbols-outlined text-[18px]">chat</span>
            <span>Konsultasi Gratis via WhatsApp</span>
          </a>
          <a
            href="https://demo.svralabs.com"
            target="_blank"
            rel="noopener noreferrer"
            class="bg-surface-container-lowest text-on-surface border border-border-hairline px-8 py-3.5 rounded-full font-label-bold text-sm hover:bg-surface-container transition-colors duration-300 shadow-sm flex items-center justify-center gap-2 w-full sm:w-auto"
          >
            <span>Kunjungi Hub Demo Interaktif</span>
            <span class="material-symbols-outlined text-[16px]">open_in_new</span>
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
        <a href="/portfolio" class="text-primary font-bold">Portofolio & Demo</a>
        <span>·</span>
        <a href="/#kontak" class="hover:text-primary transition-colors">Kontak</a>
      </div>
    </div>
  </footer>
</div>
