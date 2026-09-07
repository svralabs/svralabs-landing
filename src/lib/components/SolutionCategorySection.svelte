<script lang="ts">
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  import { tilt3D, magneticButton, isReducedMotion } from '$lib/actions/gsapParallax';
  import { bokehReveal } from '$lib/actions/motion';

  let sectionRoot: HTMLElement;
  let activeStep = $state(1);
  let mainTimeline: gsap.core.Timeline | null = null;

  function scrollToStep(step: number) {
    if (!mainTimeline || !mainTimeline.scrollTrigger) return;
    const st = mainTimeline.scrollTrigger;
    const total = st.end - st.start;
    let targetY = st.start;
    if (step === 2) targetY = st.start + total * 0.50;
    if (step === 3) targetY = st.start + total * 1.0;

    const smoother = (window as any).ScrollSmoother?.get();
    if (smoother) {
      smoother.scrollTo(targetY, true);
    } else {
      window.scrollTo({ top: targetY, behavior: 'smooth' });
    }
  }

  onMount(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    if (isReducedMotion()) return;

    const ctx = gsap.context(() => {
      // Stacking Cards Scroll Scrubbing Timeline with GSAP Pinning & Smooth Fluid Scrub (Zero Snap)
      mainTimeline = gsap.timeline({
        scrollTrigger: {
          id: 'solusi-pin',
          trigger: sectionRoot,
          start: 'top top',
          end: '+=200%',
          pin: true,
          pinSpacing: true,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = self.progress;
            if (p < 0.35) {
              activeStep = 1;
            } else if (p < 0.75) {
              activeStep = 2;
            } else {
              activeStep = 3;
            }
          },
        },
      });

      // Initial card states
      gsap.set('.solusi-card-1', { zIndex: 10, y: 0, scale: 1 });
      gsap.set('.solusi-card-2', { zIndex: 20, y: '70vh', scale: 0.96 });
      gsap.set('.solusi-card-3', { zIndex: 30, y: '70vh', scale: 0.96 });
      gsap.set('.solusi-veil-1, .solusi-veil-2', { opacity: 0 });

      // ─── Fluid Transition Planning (Normalized Timeline Duration = 2.0s) ───
      // 0.0s -> 0.1s: Card 1 brief settling zone
      // 0.1s -> 1.0s: Phase 1 transition (Card 1 recedes & veils, Card 2 glides up to dock)
      // 1.0s -> 1.1s: Card 2 docked focus zone (progress ~0.50)
      // 1.1s -> 2.0s: Phase 2 transition (Card 2 recedes & veils, Card 3 glides up to dock)

      mainTimeline
        // Phase 1 (starts at 0.1s, duration 0.9s -> reaches full dock at 1.0s)
        .to(
          '.solusi-card-1',
          {
            scale: 0.95,
            y: -16,
            ease: 'power1.inOut',
            duration: 0.9,
          },
          0.1
        )
        .to(
          '.solusi-veil-1',
          {
            opacity: 1,
            ease: 'power1.inOut',
            duration: 0.9,
          },
          0.1
        )
        .to(
          '.solusi-card-2',
          {
            y: 0,
            scale: 1,
            ease: 'power1.out',
            duration: 0.9,
          },
          0.1
        )

        // Phase 2 (starts at 1.1s, duration 0.9s -> reaches full dock at 2.0s)
        .to(
          '.solusi-card-2',
          {
            scale: 0.95,
            y: -12,
            ease: 'power1.inOut',
            duration: 0.9,
          },
          1.1
        )
        .to(
          '.solusi-veil-2',
          {
            opacity: 1,
            ease: 'power1.inOut',
            duration: 0.9,
          },
          1.1
        )
        .to(
          '.solusi-card-3',
          {
            y: 0,
            scale: 1,
            ease: 'power1.out',
            duration: 0.9,
          },
          1.1
        )

        // Explicitly fix timeline total duration to exactly 2.0s so progress 0..1 matches 0..2.0s
        .set({}, {}, 2.0);
    }, sectionRoot);

    return () => {
      ctx.revert();
    };
  });
</script>

<!-- Section Solusi: Pinned 100vh stage across 200vh total scroll distance (2 scrolls per card switch) -->
<section
  id="solusi"
  bind:this={sectionRoot}
  class="relative w-full h-screen h-[100dvh] bg-white flex flex-col justify-between items-center pt-16 md:pt-20 pb-4 md:pb-6 px-4 sm:px-6 md:px-gutter overflow-hidden z-10"
>
  <!-- Background Atmosphere Glow -->
  <div class="absolute inset-0 z-0 pointer-events-none opacity-35">
    <div class="absolute top-12 left-1/4 w-80 h-80 glow-orb-primary rounded-full"></div>
    <div class="absolute bottom-12 right-1/4 w-80 h-80 glow-orb-primary-fixed rounded-full"></div>
  </div>

  <!-- Seamless Horizon Fog Blend into Tentang Kami Section -->
  <div class="absolute inset-x-0 bottom-0 h-24 md:h-36 pointer-events-none bg-gradient-to-b from-transparent via-white/70 via-50% to-white z-0"></div>

  <!-- Section Depth Stage Container -->
  <div class="section-depth-stage w-full max-w-6xl mx-auto flex flex-col h-full justify-between items-center relative z-10">
    
    <!-- Compact Header & Step Navigation -->
    <div class="solusi-header-group text-center max-w-3xl mx-auto shrink-0 mb-2 md:mb-3 will-change-transform">
      <div class="inline-flex items-center gap-2 bg-surface-container border border-border-hairline px-3.5 py-1 rounded-full font-label-bold text-label-bold text-on-surface-variant uppercase tracking-widest text-[11px] mb-1.5 shadow-2xs">
        <span class="material-symbols-outlined text-[13px] text-primary" style="font-variation-settings: 'FILL' 1;">hub</span>
        Solusi Kami
      </div>

      <h2 use:bokehReveal={{ delay: 0.05, staggerDelay: 0.04 }} class="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-2">
        Satu sistem, masalah operasional <i class="text-primary font-light">selesai</i>
      </h2>

      <!-- Interactive Category Stepper Pills -->
      <div class="inline-flex items-center gap-1.5 p-1 bg-surface-container/80 backdrop-blur-md rounded-full border border-border-hairline shadow-2xs">
        <button
          onclick={() => scrollToStep(1)}
          class="px-3 md:px-4 py-1 rounded-full text-xs font-label-bold transition-all duration-300 flex items-center gap-1.5 {activeStep === 1 ? 'bg-on-surface text-surface shadow-xs' : 'text-text-muted hover:text-on-surface'}"
        >
          <span class="w-1.5 h-1.5 rounded-full {activeStep === 1 ? 'bg-primary' : 'bg-transparent'}"></span>
          01 Kasir & Transaksi
        </button>

        <button
          onclick={() => scrollToStep(2)}
          class="px-3 md:px-4 py-1 rounded-full text-xs font-label-bold transition-all duration-300 flex items-center gap-1.5 {activeStep === 2 ? 'bg-on-surface text-surface shadow-xs' : 'text-text-muted hover:text-on-surface'}"
        >
          <span class="w-1.5 h-1.5 rounded-full {activeStep === 2 ? 'bg-primary' : 'bg-transparent'}"></span>
          02 Booking & Jadwal
        </button>

        <button
          onclick={() => scrollToStep(3)}
          class="px-3 md:px-4 py-1 rounded-full text-xs font-label-bold transition-all duration-300 flex items-center gap-1.5 {activeStep === 3 ? 'bg-on-surface text-surface shadow-xs' : 'text-text-muted hover:text-on-surface'}"
        >
          <span class="w-1.5 h-1.5 rounded-full {activeStep === 3 ? 'bg-primary' : 'bg-transparent'}"></span>
          03 Tracking Operasional
        </button>
      </div>
    </div>

    <!-- Center Stage: Stacking Cards Deck -->
    <div class="relative w-full flex-1 flex items-center justify-center min-h-0 my-auto">
      
      <!-- ─── CARD 1: Kasir & Transaksi (Base: z-10) ─── -->
      <div
        class="solusi-card-1 absolute inset-0 w-full h-full max-h-[440px] md:max-h-[470px] lg:max-h-[490px] my-auto bg-white rounded-[28px] md:rounded-[32px] border border-border-hairline shadow-[0_25px_60px_-15px_rgba(17,24,39,0.12)] overflow-hidden flex flex-col md:flex-row will-change-transform"
      >
        <!-- Frosted White Blur Veil on Receding -->
        <div class="solusi-veil-1 pointer-events-none absolute inset-0 bg-white/70 backdrop-blur-[3px] opacity-0 z-30 transition-opacity"></div>

        <!-- Left Content -->
        <div class="flex-1 flex flex-col justify-between p-6 md:p-8 lg:p-10 order-2 md:order-1 z-10 overflow-y-auto">
          <div>
            <div class="flex items-center gap-2 mb-3">
              <div class="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center shrink-0 shadow-2xs">
                <span class="material-symbols-outlined text-[16px] text-white" style="font-variation-settings: 'FILL' 1;">point_of_sale</span>
              </div>
              <span class="font-label-bold text-on-surface uppercase tracking-wider text-xs">Sistem Kasir &amp; Transaksi</span>
            </div>

            <h3 class="font-headline-md text-base md:text-xl lg:text-2xl font-bold text-on-surface mb-2.5">
              Capek rekap penjualan manual tiap hari?
            </h3>

            <p class="font-body-md text-xs md:text-sm text-text-muted mb-2 leading-relaxed">
              Pesanan tercatat di kertas, kadang di WhatsApp, kadang cuma diingat-ingat. Pas tutup toko, rekap penjualan jadi kerjaan tambahan yang makan waktu dan rawan salah hitung.
            </p>
            <p class="font-body-md text-xs md:text-sm text-on-surface leading-relaxed mb-3.5">
              Sistem kasir yang mudah dipakai siapa aja, transaksi langsung tercatat rapi, laporan penjualan otomatis kebentuk sendiri. Kamu tinggal cek angka, bukan hitung manual satu-satu.
            </p>

            <!-- Proof Point -->
            <div class="bg-primary/5 border border-primary/15 rounded-xl px-3.5 py-2 mb-3.5 flex items-start gap-2.5">
              <span class="material-symbols-outlined text-primary text-[16px] mt-0.5 shrink-0" style="font-variation-settings: 'FILL' 1;">verified</span>
              <p class="font-body-md text-xs text-on-surface">
                Sudah dipakai untuk sistem kasir toko konveksi (real project), dan tersedia versi siap pakai untuk coffee shop — tinggal sesuaikan, nggak perlu bangun dari nol.
              </p>
            </div>
          </div>

          <!-- CTA -->
          <a
            use:magneticButton={{ strength: 10 }}
            href="https://demo.svralabs.com/pos"
            target="_blank"
            rel="noopener noreferrer"
            class="bg-on-surface text-surface hover:bg-primary transition-colors duration-300 font-label-bold px-6 py-2.5 md:py-3 rounded-full inline-flex items-center gap-2 w-fit text-xs md:text-sm shadow-md hover:shadow-primary/25"
          >
            <span class="material-symbols-outlined text-[16px]" style="font-variation-settings: 'FILL' 1;">play_circle</span>
            Coba Demo Kasir
          </a>
        </div>

        <!-- Right Mockup -->
        <div class="relative md:w-[48%] min-h-[220px] md:min-h-full order-1 md:order-2 p-4 md:p-6 flex flex-col justify-center bg-gradient-to-br from-slate-50 to-surface-container-low border-b md:border-b-0 md:border-l border-border-hairline">
          <div class="bg-white rounded-2xl p-4 border border-border-hairline shadow-md flex flex-col gap-3 relative">
            <div class="flex items-center justify-between border-b border-border-hairline/70 pb-2">
              <div class="flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-success animate-pulse"></span>
                <span class="font-label-bold text-xs text-on-surface">Kasir 01 — Toko Wonopringgo</span>
              </div>
              <span class="text-[10px] font-mono text-text-muted bg-surface-container px-2 py-0.5 rounded">TX-8492</span>
            </div>

            <!-- Cart Items -->
            <div class="space-y-1.5 text-xs">
              <div class="flex items-center justify-between p-1.5 rounded-lg bg-surface-faint text-[11px]">
                <div>
                  <p class="font-label-bold text-on-surface">Kemeja Oxford Pria (Navy - L)</p>
                  <p class="text-[10px] text-text-muted">3 pcs × Rp 95.000</p>
                </div>
                <span class="font-label-bold text-on-surface">Rp 285.000</span>
              </div>
              <div class="flex items-center justify-between p-1.5 rounded-lg bg-surface-faint text-[11px]">
                <div>
                  <p class="font-label-bold text-on-surface">Celana Chino Slim Fit (Khaki - 32)</p>
                  <p class="text-[10px] text-text-muted">2 pcs × Rp 125.000</p>
                </div>
                <span class="font-label-bold text-on-surface">Rp 250.000</span>
              </div>
            </div>

            <!-- Breakdown -->
            <div class="border-t border-dashed border-border-hairline pt-2 space-y-0.5 text-xs">
              <div class="flex justify-between text-text-muted text-[11px]">
                <span>Subtotal</span>
                <span>Rp 535.000</span>
              </div>
              <div class="flex justify-between font-headline-md text-sm text-on-surface font-bold pt-0.5">
                <span>Total Bayar</span>
                <span class="text-primary font-bold">Rp 535.000</span>
              </div>
            </div>

            <!-- Floating Real Project Badge -->
            <div class="absolute -bottom-3 -left-2 bg-white/95 backdrop-blur-md rounded-xl p-1.5 pr-2.5 flex items-center gap-2 shadow-lg border border-border-hairline z-20">
              <img
                src="/toko konveksi wonopringgo/Tangkapan Layar 2026-08-09 pukul 00.24.23.webp"
                alt="Foto Toko Konveksi Wonopringgo"
                class="w-8 h-8 rounded-lg object-cover border border-border-hairline shrink-0"
              />
              <div class="text-left">
                <div class="flex items-center gap-1">
                  <span class="material-symbols-outlined text-success text-[12px]" style="font-variation-settings: 'FILL' 1;">verified</span>
                  <span class="font-label-bold text-[10px] text-on-surface">Toko Konveksi Wonopringgo</span>
                </div>
                <p class="text-[9px] text-text-muted">Foto sistem aktif di toko</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ─── CARD 2: Booking & Jadwal (Middle: z-20) ─── -->
      <div
        class="solusi-card-2 absolute inset-0 w-full h-full max-h-[440px] md:max-h-[470px] lg:max-h-[490px] my-auto bg-white rounded-[28px] md:rounded-[32px] border border-border-hairline shadow-[0_25px_60px_-15px_rgba(17,24,39,0.12)] overflow-hidden flex flex-col md:flex-row will-change-transform"
      >
        <!-- Frosted White Blur Veil on Receding -->
        <div class="solusi-veil-2 pointer-events-none absolute inset-0 bg-white/70 backdrop-blur-[3px] opacity-0 z-30 transition-opacity"></div>

        <!-- Left Mockup -->
        <div class="relative md:w-[48%] min-h-[220px] md:min-h-full order-1 md:order-1 p-4 md:p-6 flex flex-col justify-center bg-gradient-to-br from-primary/5 via-surface-container-low to-slate-50 border-b md:border-b-0 md:border-r border-border-hairline">
          <div class="bg-white rounded-2xl p-4 border border-border-hairline shadow-md flex flex-col gap-3 relative">
            <div class="flex items-center justify-between border-b border-border-hairline/70 pb-2">
              <div>
                <span class="font-label-bold text-xs text-on-surface block">Jadwal Praktik &amp; Reservasi</span>
                <span class="text-[10px] text-text-muted">Senin, 17 Agustus 2026</span>
              </div>
              <div class="flex items-center gap-1 bg-primary/10 text-primary px-2 py-0.5 rounded-full text-[10px] font-label-bold">
                <span class="w-1.5 h-1.5 rounded-full bg-primary animate-ping"></span>
                <span>Slot: 4 Sisa</span>
              </div>
            </div>

            <!-- Time Slots -->
            <div class="space-y-1.5 text-xs">
              <div class="flex items-center justify-between p-1.5 rounded-lg bg-emerald-50 border border-emerald-200/60 text-[11px]">
                <div class="flex items-center gap-2">
                  <span class="font-mono text-emerald-800 font-semibold text-[10px] bg-white px-1.5 py-0.5 rounded">09:00</span>
                  <span class="font-label-bold text-on-surface">Konsultasi Umum (Ny. Dewi)</span>
                </div>
                <span class="text-[9px] bg-emerald-600 text-white font-label-bold px-1.5 py-0.5 rounded-full">Selesai</span>
              </div>

              <div class="flex items-center justify-between p-1.5 rounded-lg bg-primary/10 border border-primary/25 text-[11px]">
                <div class="flex items-center gap-2">
                  <span class="font-mono text-primary font-semibold text-[10px] bg-white px-1.5 py-0.5 rounded">10:30</span>
                  <span class="font-label-bold text-on-surface">Perawatan Gigi (Tn. Andi)</span>
                </div>
                <span class="text-[9px] bg-primary text-white font-label-bold px-1.5 py-0.5 rounded-full">Aktif</span>
              </div>
            </div>

            <!-- Notification -->
            <div class="bg-surface-faint rounded-xl p-2 border border-border-hairline flex items-center justify-between text-[11px] text-text-muted">
              <span class="flex items-center gap-1">
                <span class="material-symbols-outlined text-[14px] text-primary">notifications_active</span>
                WhatsApp Reminder
              </span>
              <span class="text-success font-semibold">Aktif (H-1)</span>
            </div>

            <div class="absolute -top-2.5 -right-2 bg-on-surface text-surface text-[9px] font-label-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md">
              Segera Hadir
            </div>
          </div>
        </div>

        <!-- Right Content -->
        <div class="flex-1 flex flex-col justify-between p-6 md:p-8 lg:p-10 order-2 md:order-2 z-10 overflow-y-auto">
          <div>
            <div class="flex items-center gap-2 mb-3">
              <div class="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center shrink-0 shadow-2xs">
                <span class="material-symbols-outlined text-[16px] text-white" style="font-variation-settings: 'FILL' 1;">calendar_month</span>
              </div>
              <span class="font-label-bold text-on-surface uppercase tracking-wider text-xs">Sistem Booking &amp; Jadwal</span>
            </div>

            <h3 class="font-headline-md text-base md:text-xl lg:text-2xl font-bold text-on-surface mb-2.5">
              Jadwal masih dicatat di buku atau chat WhatsApp?
            </h3>

            <p class="font-body-md text-xs md:text-sm text-text-muted mb-2 leading-relaxed">
              Pelanggan booking lewat chat, kadang kelewat baca, kadang jadwal bentrok karena dicatat manual. Belum lagi kalau harus bolak-balik konfirmasi satu-satu.
            </p>
            <p class="font-body-md text-xs md:text-sm text-on-surface leading-relaxed mb-3.5">
              Sistem booking yang bikin pelanggan bisa lihat jadwal kosong sendiri dan booking tanpa ribet — kamu tinggal pantau dari satu tempat.
            </p>

            <div class="bg-white border border-border-hairline rounded-xl px-3.5 py-2 mb-3.5 flex items-start gap-2.5 shadow-2xs">
              <span class="material-symbols-outlined text-text-muted text-[16px] mt-0.5 shrink-0">info</span>
              <p class="font-body-md text-xs text-text-muted">
                Template ini sedang dalam pengembangan. Kalau butuh sekarang, ceritakan kebutuhanmu — kami bantu rancang yang sesuai.
              </p>
            </div>
          </div>

          <!-- CTA -->
          <a
            use:magneticButton={{ strength: 10 }}
            href="https://wa.me/6285158418944?text=Halo%20Svralabs,%20saya%20butuh%20sistem%20booking%20dan%20jadwal%20untuk%20bisnis%20saya."
            target="_blank"
            rel="noopener noreferrer"
            class="bg-white border border-border-hairline text-on-surface hover:bg-surface-container transition-colors duration-300 font-label-bold px-6 py-2.5 md:py-3 rounded-full inline-flex items-center gap-2 w-fit text-xs md:text-sm shadow-xs"
          >
            <span class="material-symbols-outlined text-[16px]" style="font-variation-settings: 'FILL' 1;">chat</span>
            Diskusikan Kebutuhanmu
          </a>
        </div>
      </div>

      <!-- ─── CARD 3: Tracking & Operasional (Top: z-30) ─── -->
      <div
        class="solusi-card-3 absolute inset-0 w-full h-full max-h-[440px] md:max-h-[470px] lg:max-h-[490px] my-auto bg-white rounded-[28px] md:rounded-[32px] border border-border-hairline shadow-[0_25px_60px_-15px_rgba(17,24,39,0.12)] overflow-hidden flex flex-col md:flex-row will-change-transform"
      >
        <!-- Left Content -->
        <div class="card3-text-group flex-1 flex flex-col justify-between p-6 md:p-8 lg:p-10 order-2 md:order-1 z-10 overflow-y-auto will-change-transform">
          <div>
            <div class="flex items-center gap-2 mb-3">
              <div class="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center shrink-0 shadow-2xs">
                <span class="material-symbols-outlined text-[16px] text-white" style="font-variation-settings: 'FILL' 1;">track_changes</span>
              </div>
              <span class="font-label-bold text-on-surface uppercase tracking-wider text-xs">Sistem Tracking &amp; Operasional</span>
            </div>

            <h3 class="font-headline-md text-base md:text-xl lg:text-2xl font-bold text-on-surface mb-2.5">
              Mau tahu cucian atau antrian yang belum selesai?
            </h3>

            <p class="font-body-md text-xs md:text-sm text-text-muted mb-2 leading-relaxed">
              Cucian yang masih diproses, antrian pasien, atau orderan konveksi — kalau cuma di kepala satu orang, yang lain nunggu dan rawan salah langkah.
            </p>
            <p class="font-body-md text-xs md:text-sm text-on-surface leading-relaxed mb-3.5">
              Setiap item punya statusnya sendiri yang kelihatan langsung di layar tanpa harus nanya. Karyawan laundry tahu mana yang belum selesai, admin klinik tahu antrian berikutnya.
            </p>

            <!-- Proof Point -->
            <div class="bg-primary/5 border border-primary/15 rounded-xl px-3.5 py-2 mb-3.5 flex items-start gap-2.5">
              <span class="material-symbols-outlined text-primary text-[16px] mt-0.5 shrink-0" style="font-variation-settings: 'FILL' 1;">verified</span>
              <p class="font-body-md text-xs text-on-surface">
                Sudah dipakai untuk administrasi Puskesmas Wonokerto (real project) dan siap pakai untuk manajemen laundry — tinggal sesuaikan alurmu.
              </p>
            </div>
          </div>

          <!-- CTA -->
          <a
            use:magneticButton={{ strength: 10 }}
            href="https://demo.svralabs.com/operational"
            target="_blank"
            rel="noopener noreferrer"
            class="bg-on-surface text-surface hover:bg-primary transition-colors duration-300 font-label-bold px-6 py-2.5 md:py-3 rounded-full inline-flex items-center gap-2 w-fit text-xs md:text-sm shadow-md hover:shadow-primary/25"
          >
            <span class="material-symbols-outlined text-[16px]" style="font-variation-settings: 'FILL' 1;">play_circle</span>
            Coba Demo Tracking
          </a>
        </div>

        <!-- Right Mockup -->
        <div class="card3-mockup-group relative md:w-[48%] min-h-[220px] md:min-h-full order-1 md:order-2 p-4 md:p-6 flex flex-col justify-center bg-gradient-to-br from-slate-50 to-surface-container-low border-b md:border-b-0 md:border-l border-border-hairline will-change-transform">
          <div class="bg-white rounded-2xl p-4 border border-border-hairline shadow-md flex flex-col gap-3 relative">
            <div class="flex items-center justify-between border-b border-border-hairline/70 pb-2">
              <div class="flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                <span class="font-label-bold text-xs text-on-surface">SvraFlow — Monitoring Antrian &amp; Cucian</span>
              </div>
              <span class="text-[10px] font-mono text-text-muted bg-surface-container px-2 py-0.5 rounded">24 Aktif</span>
            </div>

            <!-- Pipeline Stepper -->
            <div class="grid grid-cols-4 gap-1 text-center text-[9px]">
              <div class="p-1 rounded bg-emerald-50 border border-emerald-200 text-emerald-800 font-label-bold">
                <span class="block text-emerald-600">✓ Beres</span>
                Terima
              </div>
              <div class="p-1 rounded bg-emerald-50 border border-emerald-200 text-emerald-800 font-label-bold">
                <span class="block text-emerald-600">✓ Beres</span>
                Cuci
              </div>
              <div class="p-1 rounded bg-primary/10 border border-primary text-primary font-label-bold">
                <span class="block text-primary animate-pulse">● Proses</span>
                Setrika
              </div>
              <div class="p-1 rounded bg-surface-faint border border-border-hairline text-text-muted font-medium">
                <span class="block">○ Antri</span>
                Siap
              </div>
            </div>

            <!-- Active Item -->
            <div class="p-2 rounded-xl bg-surface-faint border border-border-hairline/80 flex items-center justify-between text-xs">
              <div>
                <span class="font-mono font-semibold text-on-surface text-[11px]">#LND-9021 • Bpk. Hendra W.</span>
                <p class="text-[10px] text-text-muted">Cuci Kering Kilat • 7.5 Kg</p>
              </div>
              <span class="text-[9px] bg-amber-100 text-amber-800 font-label-bold px-1.5 py-0.5 rounded-full">SLA 45 mnt</span>
            </div>

            <!-- Floating Real Project Badge -->
            <div class="absolute -bottom-3 -left-2 bg-white/95 backdrop-blur-md rounded-xl p-1.5 pr-2.5 flex items-center gap-2 shadow-lg border border-border-hairline z-20">
              <img
                src="/puskesmas wonokerto/Tangkapan Layar 2026-08-07 pukul 21.59.46.webp"
                alt="Foto Sistem Puskesmas Wonokerto"
                class="w-8 h-8 rounded-lg object-cover border border-border-hairline shrink-0"
              />
              <div class="text-left">
                <div class="flex items-center gap-1">
                  <span class="material-symbols-outlined text-success text-[12px]" style="font-variation-settings: 'FILL' 1;">verified</span>
                  <span class="font-label-bold text-[10px] text-on-surface">Puskesmas Wonokerto</span>
                </div>
                <p class="text-[9px] text-text-muted">Implementasi sistem antrian</p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>



  </div>
</section>
