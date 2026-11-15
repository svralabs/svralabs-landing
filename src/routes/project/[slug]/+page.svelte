<script lang="ts">
  import { onMount } from 'svelte';
  import type { PageData } from './$types';
  import { fadeUp, fadeIn, staggerFadeUp, glareCard, floatCard, tiltCard, magneticButton, shimmerButton } from '$lib/actions/motion';

  let { data } = $props<{ data: PageData }>();
  let project = $derived(data.project);
  let related = $derived(data.relatedProjects);

  onMount(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  });
</script>

<svelte:head>
  <title>{project.client} — {project.title} | Detail Project Svralabs</title>
  <meta name="description" content="{project.tagline} Dibangun oleh Svralabs Software House Pekalongan." />
  <meta property="og:title" content="{project.client} — {project.title} | Svralabs" />
  <meta property="og:description" content="{project.description}" />
  <meta property="og:image" content="{project.heroImage}" />
</svelte:head>

<div class="bg-surface text-on-surface antialiased min-h-screen font-body-md selection:bg-primary-container selection:text-on-primary-container">
  
  <!-- Fixed Header Navigation -->
  <header class="fixed left-1/2 -translate-x-1/2 w-[95%] max-w-7xl rounded-full border z-50 top-6 bg-white/90 border-slate-200/80 shadow-[0_10px_30px_rgba(0,0,0,0.06)] backdrop-blur-md">
    <div class="flex justify-between items-center px-5 sm:px-8 py-3.5">
      <div class="flex items-center gap-3">
        <a class="flex items-center" href="/" aria-label="Beranda Svralabs">
          <img src="/logo.webp" alt="Svralabs" class="h-7 md:h-8 w-auto object-contain" />
        </a>
        <span class="text-text-muted/40 hidden sm:inline">/</span>
        <a href="/portfolio" class="font-label-sm text-text-muted hover:text-on-surface transition-colors hidden sm:inline">Project</a>
        <span class="text-text-muted/40 hidden md:inline">/</span>
        <span class="font-label-sm text-on-surface font-semibold truncate max-w-[180px] hidden md:inline">{project.client}</span>
      </div>

      <div class="flex items-center gap-3">
        <a href="/portfolio" class="text-text-muted hover:text-on-surface text-sm font-label-bold transition-colors inline-flex items-center gap-1">
          <span class="material-symbols-outlined text-[18px]">arrow_back</span>
          <span class="hidden sm:inline">Semua Project</span>
        </a>

        {#if project.hasDemo && project.demoUrl}
          <a
            use:magneticButton
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            class="bg-primary text-on-primary px-4 sm:px-5 py-2 rounded-full font-label-bold text-xs sm:text-sm hover:bg-primary-container transition-all duration-300 shadow-sm inline-flex items-center gap-1.5"
          >
            <span class="material-symbols-outlined text-[16px]">play_circle</span>
            <span>Uji Coba Demo</span>
          </a>
        {:else}
          <a
            use:magneticButton
            href="https://wa.me/6285158418944?text=Halo%20Svralabs%2C%20saya%20tertarik%20dengan%20solusi%20seperti%20{encodeURIComponent(project.title)}"
            target="_blank"
            rel="noopener noreferrer"
            class="bg-on-surface text-surface px-4 sm:px-5 py-2 rounded-full font-label-bold text-xs sm:text-sm hover:bg-primary transition-all duration-300 shadow-md inline-flex items-center gap-1.5"
          >
            <span>Konsultasi Proyek</span>
            <span class="material-symbols-outlined text-[16px]">chat</span>
          </a>
        {/if}
      </div>
    </div>
  </header>

  <main class="pt-28 md:pt-32">
    <!-- Hero Section -->
    <section use:fadeIn={{ duration: 0.8 }} class="pt-8 md:pt-12 pb-16 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto">
      <div use:fadeUp={{ duration: 0.8 }} class="max-w-4xl mx-auto text-center mb-10 md:mb-14">
        <!-- Badge -->
        <div class="inline-flex items-center gap-2 bg-surface-container-highest/60 border border-border-hairline rounded-full px-4 py-1.5 mb-6 backdrop-blur-md">
          <span class="material-symbols-outlined text-primary text-sm" style="font-variation-settings: 'FILL' 1;">
            {#if project.category === 'layanan-publik'}medical_services
            {:else if project.category === 'fnb'}local_cafe
            {:else if project.category === 'pos-retail'}storefront
            {:else}precision_manufacturing
            {/if}
          </span>
          <span class="font-label-sm text-label-sm uppercase tracking-widest text-on-surface font-semibold">{project.categoryLabel}</span>
          <span class="text-text-muted/40">•</span>
          <span class="font-label-sm text-label-sm text-primary font-bold">{project.badge}</span>
        </div>
        
        <h1 class="font-display-xl-mobile md:font-display-xl text-display-xl-mobile md:text-display-xl text-on-surface mb-6 leading-tight tracking-tight">
          {project.title}
        </h1>
        
        <p class="font-body-lg text-body-lg text-text-muted max-w-2xl mx-auto leading-relaxed">
          {project.tagline}
        </p>

        <!-- CTAs Strip -->
        <div class="flex flex-wrap items-center justify-center gap-3 mt-8">
          {#if project.hasDemo && project.demoUrl}
            <a
              use:shimmerButton
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              class="bg-primary text-on-primary px-6 py-3 rounded-full font-label-bold text-sm hover:bg-primary-container transition-all duration-300 shadow-md inline-flex items-center gap-2"
            >
              <span class="material-symbols-outlined text-[18px]">play_circle</span>
              <span>Buka Live Demo Interaktif</span>
              <span class="material-symbols-outlined text-[16px]">open_in_new</span>
            </a>
          {/if}

          <a
            use:magneticButton
            href="https://wa.me/6285158418944?text=Halo%20Svralabs%2C%20saya%20ingin%20diskusi%20sistem%20seperti%20{encodeURIComponent(project.title)}"
            target="_blank"
            rel="noopener noreferrer"
            class="bg-surface-container-lowest text-on-surface border border-border-hairline px-6 py-3 rounded-full font-label-bold text-sm hover:bg-surface-container transition-all duration-300 shadow-sm inline-flex items-center gap-2"
          >
            <span class="material-symbols-outlined text-[18px]">chat</span>
            <span>Konsultasi Kebutuhan Serupa</span>
          </a>
        </div>
      </div>

      <!-- Main Screenshot Frame -->
      <div use:fadeUp={{ delay: 0.15 }} class="max-w-5xl mx-auto">
        <div use:glareCard class="bg-surface-container-lowest rounded-[28px] p-3 md:p-4 border border-border-hairline shadow-[0_30px_70px_rgba(0,0,0,0.08)]">
          <div class="bg-surface-faint rounded-[20px] overflow-hidden border border-border-hairline aspect-[16/10] relative">
            <img 
              src={project.heroImage} 
              alt={project.title} 
              class="w-full h-full object-cover object-top"
              loading="eager"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- At-a-Glance Facts Strip -->
    <section use:fadeIn class="py-10 bg-surface-container-lowest border-y border-border-hairline">
      <div use:staggerFadeUp class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        <div use:tiltCard class="bg-[#F8F9FA] p-5 rounded-2xl border border-slate-200/60">
          <p class="font-label-sm text-text-muted uppercase tracking-wider text-[11px] mb-1.5">Klien</p>
          <p class="font-headline-md text-base md:text-lg font-bold text-on-surface">{project.client}</p>
          <p class="font-body-sm text-xs text-text-muted mt-0.5">{project.location}</p>
        </div>
        
        <div use:tiltCard class="bg-[#F8F9FA] p-5 rounded-2xl border border-slate-200/60">
          <p class="font-label-sm text-text-muted uppercase tracking-wider text-[11px] mb-1.5">Sektor Industri</p>
          <p class="font-headline-md text-base md:text-lg font-bold text-on-surface">{project.categoryLabel}</p>
          <p class="font-body-sm text-xs text-text-muted mt-0.5">Tahun {project.year}</p>
        </div>

        <div use:tiltCard class="bg-[#F8F9FA] p-5 rounded-2xl border border-slate-200/60">
          <p class="font-label-sm text-text-muted uppercase tracking-wider text-[11px] mb-1.5">Status Sistem</p>
          <p class="font-headline-md text-base md:text-lg font-bold text-primary flex items-center gap-1.5">
            <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse inline-block"></span>
            <span>{project.status}</span>
          </p>
          <p class="font-body-sm text-xs text-text-muted mt-0.5">{project.badge}</p>
        </div>

        <div use:tiltCard class="bg-[#F8F9FA] p-5 rounded-2xl border border-slate-200/60">
          <p class="font-label-sm text-text-muted uppercase tracking-wider text-[11px] mb-1.5">Tech Stack</p>
          <div class="flex flex-wrap gap-1 mt-1">
            {#each project.techStack.slice(0, 3) as tech}
              <span class="px-2 py-0.5 bg-white border border-slate-200 rounded text-[10px] font-mono text-on-surface">
                {tech}
              </span>
            {/each}
          </div>
        </div>
      </div>
    </section>

    <!-- Key Metrics Highlight Section -->
    <section class="py-12 max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        {#each project.metrics as metric}
          <div use:tiltCard class="p-6 md:p-8 rounded-[24px] bg-white border border-border-hairline shadow-sm flex flex-col justify-center text-center">
            <p class="font-display-xl text-3xl md:text-4xl font-bold text-primary mb-1 tracking-tight">{metric.value}</p>
            <p class="font-label-bold text-xs uppercase tracking-wider text-text-muted">{metric.label}</p>
          </div>
        {/each}
      </div>
    </section>

    <!-- Tantangan vs Solusi Section -->
    <section class="py-12 md:py-16 max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
        
        <!-- Tantangan Lapangan -->
        <div use:fadeUp class="bg-surface-container-lowest p-7 md:p-10 rounded-[28px] border border-border-hairline shadow-sm flex flex-col justify-between">
          <div>
            <div class="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-700 flex items-center justify-center mb-6">
              <span class="material-symbols-outlined text-[26px]">warning</span>
            </div>
            <h2 class="font-headline-lg text-2xl md:text-[28px] font-bold text-on-surface mb-4">Tantangan Klien</h2>
            <p class="font-body-md text-text-muted text-sm leading-relaxed mb-6">
              Sebelum sistem ini diimplementasikan, alur kerja operasional menghadapi kendala nyata di lapangan:
            </p>
            <ul class="space-y-3.5">
              {#each project.challenges as ch}
                <li class="flex items-start gap-3 text-sm text-on-surface leading-relaxed">
                  <span class="material-symbols-outlined text-amber-600 text-[18px] shrink-0 mt-0.5">remove_circle_outline</span>
                  <span>{ch}</span>
                </li>
              {/each}
            </ul>
          </div>
        </div>

        <!-- Solusi Sistem Svralabs -->
        <div use:fadeUp={{ delay: 0.15 }} class="bg-surface-container-lowest p-7 md:p-10 rounded-[28px] border border-primary/25 shadow-sm relative overflow-hidden flex flex-col justify-between">
          <div>
            <div class="w-12 h-12 rounded-2xl bg-primary-container text-on-primary-container flex items-center justify-center mb-6">
              <span class="material-symbols-outlined text-[26px]">check_circle</span>
            </div>
            <h2 class="font-headline-lg text-2xl md:text-[28px] font-bold text-on-surface mb-4">Solusi Sistem Svralabs</h2>
            <p class="font-body-md text-text-muted text-sm leading-relaxed mb-6">
              Svralabs merancang arsitektur perangkat lunak yang memecahkan akar masalah secara langsung dan terukur:
            </p>
            <ul class="space-y-3.5">
              {#each project.solutions as sol}
                <li class="flex items-start gap-3 text-sm text-on-surface font-medium leading-relaxed">
                  <span class="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5" style="font-variation-settings: 'FILL' 1;">check_circle</span>
                  <span>{sol}</span>
                </li>
              {/each}
            </ul>
          </div>
        </div>

      </div>
    </section>

    <!-- Galeri Antarmuka Nyata (Real Screenshots) -->
    <section class="py-16 md:py-20 bg-[#F8F9FA] border-y border-border-hairline">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div use:fadeUp class="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <span class="inline-block bg-white text-primary border border-slate-200 font-label-sm text-label-sm uppercase tracking-widest px-4 py-1.5 rounded-full mb-4 font-bold shadow-sm">
            FOTO ASLI ANTARMUKA SISTEM
          </span>
          <h2 class="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface tracking-tight">
            Tampilan Layar &amp; <span class="text-primary italic font-light">Alur Pengguna</span>
          </h2>
          <p class="font-body-md text-text-muted text-sm mt-3 max-w-xl mx-auto">
            Setiap tangkapan layar diambil langsung dari aplikasi produksi yang aktif digunakan untuk mendukung operasional harian.
          </p>
        </div>

        <div use:staggerFadeUp class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {#each project.gallery as item}
            <div use:floatCard class="bg-white rounded-[24px] p-4 border border-border-hairline shadow-sm overflow-hidden flex flex-col justify-between">
              <div>
                <div class="rounded-xl overflow-hidden border border-border-hairline aspect-[16/10] mb-4 bg-surface-faint relative group">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    class="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" 
                    loading="lazy"
                  />
                </div>
                <h3 class="font-headline-md text-base font-bold text-on-surface px-1">{item.title}</h3>
                <p class="font-body-md text-xs text-text-muted px-1 mt-1.5 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          {/each}
        </div>
      </div>
    </section>

    <!-- Dampak Bisnis Nyata (Business Impact) -->
    <section class="py-16 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
      <div use:fadeUp class="bg-slate-900 text-white rounded-[32px] p-8 md:p-14 relative overflow-hidden shadow-2xl">
        <div class="max-w-4xl relative z-10">
          <span class="inline-block bg-primary text-on-primary font-label-sm text-label-sm uppercase tracking-wider px-4 py-1 rounded-full mb-6 font-bold">
            HASIL &amp; DAMPAK BISNIS
          </span>
          
          <h2 class="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-white mb-8 tracking-tight">
            Perubahan Nyata Setelah <span class="text-emerald-400 font-light italic">Implementasi</span>
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6 border-t border-white/10">
            {#each project.businessImpacts as impact, i}
              <div>
                <p class="font-display-xl text-3xl md:text-4xl font-bold text-emerald-400 mb-2 tracking-tight">{impact.metric}</p>
                <h4 class="font-label-bold text-white text-base mb-2">{impact.title}</h4>
                <p class="font-body-md text-xs text-slate-300 leading-relaxed">{impact.desc}</p>
              </div>
            {/each}
          </div>
        </div>
      </div>
    </section>

    <!-- Live Demo Banner (If Applicable) -->
    {#if project.hasDemo && project.demoUrl}
      <section class="pb-16 max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div class="bg-gradient-to-r from-emerald-900 to-slate-900 text-white rounded-[28px] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-emerald-500/20">
          <div>
            <div class="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full text-xs font-bold mb-3 border border-emerald-400/30">
              <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Demo Siap Uji Coba</span>
            </div>
            <h3 class="text-2xl md:text-3xl font-bold text-white">Ingin Coba Langsung Sistem Ini?</h3>
            <p class="text-slate-300 text-sm mt-1 max-w-xl">
              Uji coba seluruh fitur interaktif aplikasi {project.client} langsung di perambanmu tanpa perlu mendaftar.
            </p>
          </div>
          <a
            use:shimmerButton
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            class="bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-label-bold px-8 py-3.5 rounded-full text-sm shrink-0 transition-colors shadow-lg inline-flex items-center gap-2"
          >
            <span class="material-symbols-outlined text-[18px]">play_circle</span>
            <span>Buka Live Demo Sekarang</span>
            <span class="material-symbols-outlined text-[16px]">open_in_new</span>
          </a>
        </div>
      </section>
    {/if}

    <!-- Related Projects Strip -->
    {#if related.length > 0}
      <section class="py-12 max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div class="flex items-center justify-between mb-8">
          <div>
            <h3 class="text-xl md:text-2xl font-bold text-on-surface">Lihat Project Lainnya</h3>
            <p class="text-xs text-text-muted mt-0.5">Sistem operasional dan digitalisasi bisnis lain yang telah kami bangun.</p>
          </div>
          <a href="/portfolio" class="text-primary text-sm font-label-bold hover:underline inline-flex items-center gap-1">
            <span>Katalog Lengkap</span>
            <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
          </a>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          {#each related as rel}
            <a
              href="/project/{rel.slug}"
              class="group bg-white rounded-2xl p-4 sm:p-5 border border-border-hairline shadow-sm hover:border-primary/40 hover:shadow-md transition-all flex flex-col sm:flex-row gap-4 items-center"
            >
              <img 
                src={rel.image} 
                alt={rel.title} 
                class="w-full sm:w-36 h-24 object-cover object-top rounded-xl border border-slate-100 shrink-0" 
              />
              <div class="flex-1">
                <span class="text-[10px] uppercase font-bold text-primary tracking-wider">{rel.categoryLabel}</span>
                <h4 class="text-sm font-bold text-on-surface group-hover:text-primary transition-colors line-clamp-1 mt-0.5">{rel.client}</h4>
                <p class="text-xs text-text-muted line-clamp-2 mt-1">{rel.tagline}</p>
              </div>
              <span class="material-symbols-outlined text-text-muted group-hover:text-primary group-hover:translate-x-1 transition-all text-[20px] hidden sm:block">
                arrow_forward
              </span>
            </a>
          {/each}
        </div>
      </section>
    {/if}

    <!-- Bottom CTA Section -->
    <section class="py-16 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto text-center">
      <div use:fadeUp class="bg-surface-container-lowest rounded-[28px] p-8 md:p-16 border border-border-hairline shadow-sm">
        <h2 class="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-4 tracking-tight">
          Punya Kebutuhan Sistem Serupa untuk Usahamu?
        </h2>
        <p class="font-body-lg text-body-lg text-text-muted max-w-2xl mx-auto mb-8 leading-relaxed">
          Konsultasikan alur kerja bisnismu bersama tim Svralabs. Kami rancang sistem yang pas dengan operasional lapangan—gak perlu ribet dan mahal.
        </p>
        <div class="flex flex-col sm:flex-row justify-center gap-4">
          <a 
            use:magneticButton 
            href="https://wa.me/6285158418944?text=Halo%20Svralabs%2C%20saya%20ingin%20konsultasi%20pembuatan%20sistem%20seperti%20{encodeURIComponent(project.title)}" 
            target="_blank"
            rel="noopener noreferrer"
            class="bg-on-surface text-surface px-8 py-4 rounded-full font-label-bold text-sm hover:bg-primary transition-colors shadow-lg inline-flex items-center justify-center gap-2"
          >
            <span class="material-symbols-outlined text-[18px]">chat</span>
            <span>Konsultasi Proyek Gratis</span>
          </a>
          <a 
            use:shimmerButton 
            href="/portfolio" 
            class="bg-surface-container-lowest text-on-surface border border-border-hairline px-8 py-4 rounded-full font-label-bold text-sm hover:bg-surface-container transition-colors shadow-sm inline-flex items-center justify-center gap-2"
          >
            <span class="material-symbols-outlined text-[18px]">folder_special</span>
            <span>Jelajahi Project Lainnya</span>
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
