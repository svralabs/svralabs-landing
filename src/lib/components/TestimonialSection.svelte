<script lang="ts">
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  import { tilt3D, sectionLayeredParallax, isReducedMotion } from '$lib/actions/gsapParallax';

  let caseRoot: HTMLElement;
  let headlineEl: HTMLElement;

  onMount(() => {
    if (typeof window === 'undefined' || isReducedMotion()) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const entranceTl = gsap.timeline({
        scrollTrigger: {
          trigger: caseRoot,
          start: 'top 52%',
          toggleActions: 'play none none reverse',
        },
        defaults: { ease: 'power3.out' },
      });

      // 1. Kicker Badge: 3D Spring Drop with optical blur clear
      entranceTl.fromTo(
        '.case-kicker',
        { opacity: 0, y: -24, scale: 0.88, filter: 'blur(6px)' },
        { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', duration: 0.75, ease: 'back.out(1.6)' },
        0.05
      );

      // 2. Icon Pop & Spin
      entranceTl.fromTo(
        '.case-kicker-icon',
        { scale: 0, rotate: -60 },
        { scale: 1, rotate: 0, duration: 0.55, ease: 'back.out(2.2)' },
        0.15
      );

      // 3. Headline Masked Kinetic Words
      const words = headlineEl ? headlineEl.querySelectorAll('.case-word') : [];
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
        '.case-accent-text',
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

      // 5. Description Paragraph
      entranceTl.fromTo(
        '.case-desc',
        { opacity: 0, y: 22, filter: 'blur(6px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.7, ease: 'power2.out' },
        0.45
      );

      // 6. 2 Case Study Cards: 3D Perspective Spring Rise
      entranceTl.fromTo(
        '.case-card',
        { opacity: 0, y: 65, scale: 0.90, rotateX: 10, filter: 'blur(8px)' },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          filter: 'blur(0px)',
          duration: 0.9,
          stagger: 0.16,
          ease: 'back.out(1.4)',
        },
        0.55
      );
    }, caseRoot);

    return () => ctx.revert();
  });
</script>

<section
  id="portofolio"
  bind:this={caseRoot}
  class="min-h-screen min-h-[100dvh] w-full relative flex flex-col justify-center items-center pt-28 pb-20 md:pt-36 md:pb-28 bg-surface overflow-hidden perspective-grid"
>
  <!-- Background Layer (data-depth="bg") -->
  <div data-depth="bg" class="absolute inset-0 z-0 pointer-events-none opacity-30">
    <div class="absolute top-1/4 left-1/4 w-80 h-80 glow-orb-primary rounded-full"></div>
    <div class="absolute bottom-16 right-1/4 w-80 h-80 glow-orb-primary-fixed rounded-full"></div>
  </div>

  <!-- Section Depth Stage: Scales and fades smoothly for 3D page transitions -->
  <div class="section-depth-stage w-full max-w-7xl mx-auto flex flex-col justify-center relative z-10">
    
    <!-- Header (data-depth="content") -->
    <div data-depth="content" class="text-center mb-16 md:mb-20">
      <!-- Kicker Badge with Spring Drop -->
      <div class="case-kicker inline-flex items-center space-x-2 bg-white/95 backdrop-blur-md px-4 py-1.5 rounded-full mb-6 border border-slate-200 shadow-[0_4px_14px_-2px_rgba(0,0,0,0.06)] select-none">
        <span class="case-kicker-icon material-symbols-outlined text-primary text-sm" style="font-variation-settings: 'FILL' 1;">verified</span>
        <span class="font-label-sm text-label-sm uppercase tracking-wider text-primary font-label-bold">STUDI KASUS NYATA</span>
      </div>

      <!-- Masked Kinetic Word Reveal Headline -->
      <h2
        bind:this={headlineEl}
        class="case-headline font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg text-on-surface max-w-3xl mx-auto tracking-tight"
      >
        <span class="inline-block overflow-hidden align-top"><span class="case-word inline-block">Sistem</span></span>
        <span class="inline-block overflow-hidden align-top"><span class="case-word inline-block">yang</span></span>
        <span class="inline-block overflow-hidden align-top"><span class="case-word inline-block">sudah</span></span>
        <span class="inline-block overflow-hidden align-top"><span class="case-word inline-block">jalan</span></span>
        <span class="inline-block overflow-hidden align-top"><span class="case-word inline-block">—</span></span>
        <br class="hidden md:block" />
        <span class="inline-block overflow-hidden align-top"><span class="case-word inline-block italic text-primary font-light case-accent-text">bukan</span></span>
        <span class="inline-block overflow-hidden align-top"><span class="case-word inline-block italic text-primary font-light case-accent-text">sekadar</span></span>
        <span class="inline-block overflow-hidden align-top"><span class="case-word inline-block italic text-primary font-light case-accent-text">demo.</span></span>
      </h2>
      <p class="case-desc font-body-lg text-body-lg text-text-muted mt-4 max-w-2xl mx-auto leading-relaxed">
        Dari fasilitas kesehatan hingga grosir konveksi. Ini bukan portofolio konsep, ini sistem yang dipakai operasional sehari-hari.
      </p>
    </div>

    <!-- Case Studies Grid with Problem -> Solution -> Outcome Storytelling (data-depth="foreground") -->
    <div data-depth="foreground" class="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 perspective-grid">
      
      <!-- Case Study 1: Puskesmas Wonokerto -->
      <div
        use:tilt3D={{ maxTilt: 4, perspective: 1100, glare: true }}
        class="case-card bg-white rounded-[32px] border border-border-hairline overflow-hidden flex flex-col justify-between shadow-[0_15px_40px_rgba(0,0,0,0.05)] hover:shadow-[0_25px_60px_rgba(0,105,72,0.12)] transition-[box-shadow,border-color] duration-300 group will-change-transform"
      >
        <div>
          <!-- Coded EMR & Antrian Pasien UI Dashboard -->
          <div class="w-full min-h-[290px] p-6 border-b border-border-hairline bg-gradient-to-br from-emerald-950 via-slate-900 to-primary-container text-white flex flex-col justify-between relative overflow-hidden">
            <!-- Subtle Grid Background -->
            <div class="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none"></div>

            <!-- Top bar -->
            <div class="relative z-10 flex items-center justify-between border-b border-white/10 pb-3">
              <div class="flex items-center gap-2.5">
                <div class="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-400">
                  <span class="material-symbols-outlined text-[18px]">local_hospital</span>
                </div>
                <div>
                  <h4 class="font-label-bold text-xs text-white font-semibold">SIMPUS Wonokerto (EMR)</h4>
                  <p class="text-[10px] text-emerald-300">Poli Umum • Shift Pagi</p>
                </div>
              </div>
              <div class="flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-2.5 py-1 rounded-full text-[10px] font-label-bold">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>SATUSEHAT Ready</span>
              </div>
            </div>

            <!-- Active Serving Card -->
            <div class="relative z-10 bg-white/15 rounded-2xl p-3.5 border border-white/20 my-2">
              <div class="flex items-start justify-between mb-2">
                <div>
                  <span class="text-[10px] text-emerald-200 uppercase tracking-wider font-semibold">Nomor Antrian Aktif</span>
                  <div class="flex items-baseline gap-2 mt-0.5">
                    <span class="text-3xl font-mono font-bold text-white">A-042</span>
                    <span class="text-xs text-white/80">Ny. Siti Aminah (52 th)</span>
                  </div>
                </div>
                <span class="text-[10px] bg-emerald-400 text-slate-900 font-bold px-2 py-0.5 rounded-full">Diperiksa</span>
              </div>
              <div class="flex items-center justify-between text-[11px] text-white/70 border-t border-white/10 pt-2">
                <span>Dokter: dr. Bambang Irawan</span>
                <span class="font-mono text-emerald-300">Rekam Medis: #RM-002481</span>
              </div>
            </div>

            <!-- Queue Counter Strip + Corner Authentic Thumbnail -->
            <div class="relative z-10 flex items-center justify-between pt-1 text-xs">
              <div class="flex items-center gap-3 text-[11px] text-white/80">
                <span>Antrian Berikutnya: <strong class="text-white font-mono">A-043</strong></span>
                <span>•</span>
                <span>Sisa: <strong class="text-white">6 Pasien</strong></span>
              </div>

              <!-- Corner Authentic Proof Thumbnail -->
              <div class="flex items-center gap-2 bg-black/60 px-2.5 py-1 rounded-xl border border-white/20">
                <img
                  src="/puskesmas wonokerto/Tangkapan Layar 2026-06-17 pukul 20.43.07.webp"
                  alt="Dokumentasi Puskesmas Wonokerto"
                  class="w-6 h-6 rounded-md object-cover border border-white/30"
                />
                <span class="text-[10px] text-white/90 font-label-bold">Foto Asli</span>
              </div>
            </div>
          </div>

          <!-- Problem -> Solution -> Outcome Stack -->
          <div class="p-6 md:p-8 flex flex-col gap-5">
            <!-- Problem -->
            <div class="p-4 rounded-2xl bg-surface-faint border border-border-hairline/70">
              <h4 class="font-label-bold text-xs uppercase tracking-wider text-text-muted mb-1.5 flex items-center gap-1.5">
                <span class="material-symbols-outlined text-amber-600 text-[18px]">report_problem</span>
                Problem
              </h4>
              <p class="font-body-md text-sm text-on-surface font-medium leading-relaxed">
                Antrian pasien panjang dan pencarian arsip rekam medis kertas manual yang memakan waktu lama setiap harinya.
              </p>
            </div>

            <!-- Solution -->
            <div class="p-4 rounded-2xl bg-surface-faint border border-border-hairline/70">
              <h4 class="font-label-bold text-xs uppercase tracking-wider text-text-muted mb-1.5 flex items-center gap-1.5">
                <span class="material-symbols-outlined text-primary text-[18px]">lightbulb</span>
                Solution
              </h4>
              <p class="font-body-md text-sm text-on-surface font-medium leading-relaxed">
                Digitalisasi alur pendaftaran terintegrasi dengan database pasien dan rekam medis elektronik (EMR) yang tersentral.
              </p>
            </div>

            <!-- Outcome -->
            <div class="p-4 rounded-2xl bg-primary/8 border border-primary/15">
              <h4 class="font-label-bold text-xs uppercase tracking-wider text-primary mb-1.5 flex items-center gap-1.5">
                <span class="material-symbols-outlined text-primary text-[18px]" style="font-variation-settings: 'FILL' 1;">check_circle</span>
                Outcome
              </h4>
              <p class="font-body-md text-sm text-on-surface font-medium leading-relaxed">
                Pelayanan jauh lebih cepat, bebas antrian panjang yang menumpuk, dan arsip rekam medis 100% aman dan mudah diakses.
              </p>
            </div>
          </div>
        </div>

        <!-- Action Link -->
        <div class="p-6 md:p-8 pt-0">
          <a
            href="/studi-kasus/puskesmas-wonokerto"
            class="inline-flex items-center gap-2 text-primary font-label-bold hover:gap-3 transition-all duration-300 group-hover:text-primary-container"
          >
            Lihat Detail Proyek
            <span class="material-symbols-outlined text-[18px]">arrow_forward</span>
          </a>
        </div>
      </div>

      <!-- Case Study 2: POS Toko Konveksi Wonopringgo -->
      <div
        use:tilt3D={{ maxTilt: 4, perspective: 1100, glare: true }}
        class="case-card bg-white rounded-[32px] border border-border-hairline overflow-hidden flex flex-col justify-between shadow-[0_15px_40px_rgba(0,0,0,0.05)] hover:shadow-[0_25px_60px_rgba(0,105,72,0.12)] transition-[box-shadow,border-color] duration-300 group will-change-transform"
      >
        <div>
          <!-- Coded POS Wholesale & Multi-Gudang Dashboard -->
          <div class="w-full min-h-[290px] p-6 border-b border-border-hairline bg-gradient-to-br from-slate-900 via-slate-850 to-primary-fixed-variant text-white flex flex-col justify-between relative overflow-hidden">
            <!-- Subtle Grid Background -->
            <div class="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none"></div>

            <!-- Top bar -->
            <div class="relative z-10 flex items-center justify-between border-b border-white/10 pb-3">
              <div class="flex items-center gap-2.5">
                <div class="w-8 h-8 rounded-lg bg-primary/20 border border-primary/40 flex items-center justify-center text-primary-fixed">
                  <span class="material-symbols-outlined text-[18px]">inventory_2</span>
                </div>
                <div>
                  <h4 class="font-label-bold text-xs text-white font-semibold">Wonopringgo Fashion ERP</h4>
                  <p class="text-[10px] text-primary-fixed-dim">Grosir &amp; Multi-Gudang Bahan</p>
                </div>
              </div>
              <div class="flex items-center gap-1.5 bg-primary/20 text-primary-fixed border border-primary/30 px-2.5 py-1 rounded-full text-[10px] font-label-bold">
                <span class="w-1.5 h-1.5 rounded-full bg-primary-fixed animate-pulse"></span>
                <span>Kasir Online</span>
              </div>
            </div>

            <!-- Key Metrics Strip -->
            <div class="relative z-10 grid grid-cols-2 gap-2.5 my-2">
              <div class="bg-white/15 rounded-2xl p-3 border border-white/20">
                <span class="text-[10px] text-white/70 block">Penjualan Grosir Hari Ini</span>
                <span class="text-xl font-bold font-mono text-white">Rp 38.450.000</span>
                <span class="text-[10px] text-emerald-400 block mt-0.5">↑ 18.2% vs target</span>
              </div>
              <div class="bg-white/15 rounded-2xl p-3 border border-white/20">
                <span class="text-[10px] text-white/70 block">Stok Bahan Baku Keluar</span>
                <span class="text-xl font-bold font-mono text-primary-fixed">1.420 Yard</span>
                <span class="text-[10px] text-white/70 block mt-0.5">42 rol kain katun</span>
              </div>
            </div>

            <!-- Inventory SKU Quick Table + Corner Authentic Thumbnail -->
            <div class="relative z-10 flex items-center justify-between pt-1 text-xs">
              <div class="flex items-center gap-3 text-[11px] text-white/80">
                <span>Surat Jalan: <strong class="text-white font-mono">#SJ-8912</strong></span>
                <span>•</span>
                <span>Status: <strong class="text-emerald-300">Siap Kirim Cargo</strong></span>
              </div>

              <!-- Corner Authentic Proof Thumbnail -->
              <div class="flex items-center gap-2 bg-black/60 px-2.5 py-1 rounded-xl border border-white/20">
                <img
                  src="/toko konveksi wonopringgo/Tangkapan Layar 2026-08-09 pukul 00.24.23.webp"
                  alt="Dokumentasi Toko Konveksi Wonopringgo"
                  class="w-6 h-6 rounded-md object-cover border border-white/30"
                />
                <span class="text-[10px] text-white/90 font-label-bold">Foto Asli</span>
              </div>
            </div>
          </div>

          <!-- Problem -> Solution -> Outcome Stack -->
          <div class="p-6 md:p-8 flex flex-col gap-5">
            <!-- Problem -->
            <div class="p-4 rounded-2xl bg-surface-faint border border-border-hairline/70">
              <h4 class="font-label-bold text-xs uppercase tracking-wider text-text-muted mb-1.5 flex items-center gap-1.5">
                <span class="material-symbols-outlined text-amber-600 text-[18px]">report_problem</span>
                Problem
              </h4>
              <p class="font-body-md text-sm text-on-surface font-medium leading-relaxed">
                Susah melacak stok kain, bahan baku, dan baju jadi yang keluar masuk setiap harinya secara akurat di gudang.
              </p>
            </div>

            <!-- Solution -->
            <div class="p-4 rounded-2xl bg-surface-faint border border-border-hairline/70">
              <h4 class="font-label-bold text-xs uppercase tracking-wider text-text-muted mb-1.5 flex items-center gap-1.5">
                <span class="material-symbols-outlined text-primary text-[18px]">lightbulb</span>
                Solution
              </h4>
              <p class="font-body-md text-sm text-on-surface font-medium leading-relaxed">
                Sistem POS khusus grosir/manufaktur dengan manajemen inventaris multi-gudang untuk bahan baku &amp; barang jadi.
              </p>
            </div>

            <!-- Outcome -->
            <div class="p-4 rounded-2xl bg-primary/8 border border-primary/15">
              <h4 class="font-label-bold text-xs uppercase tracking-wider text-primary mb-1.5 flex items-center gap-1.5">
                <span class="material-symbols-outlined text-primary text-[18px]" style="font-variation-settings: 'FILL' 1;">check_circle</span>
                Outcome
              </h4>
              <p class="font-body-md text-sm text-on-surface font-medium leading-relaxed">
                Stok terpotong presisi, tidak ada lagi selisih laporan kas, dan mencegah barang hilang tanpa jejak catatan.
              </p>
            </div>
          </div>
        </div>

        <!-- Action Link -->
        <div class="p-6 md:p-8 pt-0">
          <a
            href="/studi-kasus/pos-wonopringgo"
            class="inline-flex items-center gap-2 text-primary font-label-bold hover:gap-3 transition-all duration-300 group-hover:text-primary-container"
          >
            Lihat Detail Proyek
            <span class="material-symbols-outlined text-[18px]">arrow_forward</span>
          </a>
        </div>
      </div>

    </div>
  </div>
</section>
