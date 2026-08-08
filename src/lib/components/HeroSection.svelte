<script lang="ts">
  import { animate } from "motion";
  import { onMount } from "svelte";
  import { staggerFadeUp, scaleIn, magneticButton, shimmerButton, blurReveal, headlineMaskReveal } from "$lib/actions/motion";
  
  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  
  let heroContainer: HTMLElement;
  
  onMount(() => {
    animate(
      heroContainer, 
      { opacity: [0, 1], y: [40, 0] } as any, 
      { duration: 0.8, easing: "ease-out" }
    );
  });
</script>

<section id="hero" bind:this={heroContainer} class="relative pt-[180px] pb-section-padding-desktop px-gutter overflow-hidden">
<div class="absolute inset-0 z-0 pointer-events-none opacity-80" data-alt="A serene, high-resolution organic sky and clouds photography background with soft, diffused white lighting, blending seamlessly into a pure white void. The style is editorial minimalist, evoking a sense of calm and institutional stability. Very subtle blue tints." style="background-image: url('/blue_sky_bg_1786188871421.jpg'); background-size: cover; background-position: top center; mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%); -webkit-mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%);">
</div>
<div use:staggerFadeUp={{ staggerDelay: 0.15 }} class="relative z-10 max-w-7xl mx-auto flex flex-col items-center text-center">
<div class="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md border border-border-hairline rounded-full px-4 py-1.5 mb-8 shadow-sm">
<span class="material-symbols-outlined text-primary text-sm" style="font-variation-settings: 'FILL' 1;">star</span>
<span class="font-label-sm text-label-sm uppercase tracking-widest text-text-muted">Software House Pekalongan</span>
</div>
<h1 use:headlineMaskReveal class="font-display-xl-mobile md:font-display-xl text-display-xl-mobile md:text-display-xl text-on-surface max-w-4xl mb-6">
                Digitalisasi UMKM <span class="italic font-light text-primary">Gak Perlu</span> Mahal dan Ribet
            </h1>
<p use:blurReveal={{ delay: 0.2 }} class="font-body-lg text-body-lg text-text-muted max-w-2xl mb-12">
                Sistem harus mempermudah, bukan mempersulit. Svralabs hadir untuk bantu usahamu beralih ke digital dengan cepat dan efisien.
            </p>
<div class="flex flex-col sm:flex-row gap-4 mb-24">
<button use:magneticButton onclick={() => scrollTo('kontak')} class="bg-on-surface text-surface px-8 py-4 rounded-full font-label-bold hover:bg-primary transition-colors duration-300 shadow-lg">
                    Konsultasi Gratis
                </button>
<button use:shimmerButton onclick={() => scrollTo('portofolio')} class="bg-surface-container-lowest text-on-surface border border-border-hairline px-8 py-4 rounded-full font-label-bold hover:bg-surface-container transition-colors duration-300 shadow-sm flex items-center justify-center gap-2">
                    Lihat Portofolio
                    <span class="material-symbols-outlined">arrow_forward</span>
</button>
</div>
<div use:scaleIn={{ delay: 0.4 }} class="relative w-full max-w-5xl mx-auto">
<div class="absolute top-1/2 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-[100px] -translate-y-1/2 -z-10"></div>
<div class="absolute bottom-0 right-1/4 w-80 h-80 bg-inverse-primary/30 rounded-full blur-[120px] -z-10"></div>
<div class="bg-white/70 backdrop-blur-[20px] rounded-[24px] border border-white/40 shadow-[0_40px_80px_-20px_rgba(17,24,39,0.08)] p-6 md:p-8 relative overflow-hidden">
<div class="flex justify-between items-center mb-8 border-b border-border-hairline/50 pb-4">
<div class="flex items-center gap-3">
<div class="w-10 h-10 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">store</span>
</div>
<div>
<h3 class="font-label-bold text-label-bold text-on-surface">POS Coffee Shop</h3>
<p class="font-label-sm text-label-sm text-text-muted">Ready-Made Product</p>
</div>
</div>
<div class="flex gap-2">
<span class="material-symbols-outlined text-outline p-2 hover:bg-surface-container rounded-full cursor-pointer transition-colors">notifications</span>
<span class="material-symbols-outlined text-outline p-2 hover:bg-surface-container rounded-full cursor-pointer transition-colors">settings</span>
</div>
</div>
<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
<div class="col-span-1 md:col-span-2 bg-surface-container-lowest rounded-xl p-6 border border-border-hairline shadow-sm">
<div class="flex justify-between items-start mb-6">
<div>
<p class="font-label-sm text-label-sm text-text-muted mb-1">Pendapatan Bulan Ini</p>
<h2 class="font-headline-md text-headline-md text-on-surface">Rp 124.500.000</h2>
</div>
<div class="bg-success/10 text-success px-3 py-1 rounded-full flex items-center gap-1">
<span class="material-symbols-outlined text-sm">trending_up</span>
<span class="font-label-bold text-[12px]">+12.5%</span>
</div>
</div>
<div class="h-32 flex items-end justify-between gap-2 mt-8">
<div class="w-full bg-surface-container rounded-t-md h-[40%] hover:bg-primary-container transition-colors"></div>
<div class="w-full bg-surface-container rounded-t-md h-[60%] hover:bg-primary-container transition-colors"></div>
<div class="w-full bg-surface-container rounded-t-md h-[45%] hover:bg-primary-container transition-colors"></div>
<div class="w-full bg-surface-container rounded-t-md h-[80%] hover:bg-primary-container transition-colors"></div>
<div class="w-full bg-primary rounded-t-md h-[100%] shadow-[0_0_15px_rgba(0,82,255,0.4)] relative">
<div class="absolute -top-8 left-1/2 -translate-x-1/2 bg-on-surface text-surface text-xs py-1 px-2 rounded opacity-0 hover:opacity-100 transition-opacity">Hari Ini</div>
</div>
<div class="w-full bg-surface-container rounded-t-md h-[55%] hover:bg-primary-container transition-colors"></div>
<div class="w-full bg-surface-container rounded-t-md h-[70%] hover:bg-primary-container transition-colors"></div>
</div>
<div class="flex justify-between text-xs text-text-muted mt-2 font-label-sm">
<span>Sen</span><span>Sel</span><span>Rab</span><span>Kam</span><span>Jum</span><span>Sab</span><span>Min</span>
</div>
</div>
<div class="col-span-1 flex flex-col gap-6">
<div class="bg-surface-container-lowest rounded-xl p-6 border border-border-hairline shadow-sm flex-1">
<div class="flex items-center gap-2 mb-4">
<span class="material-symbols-outlined text-secondary" style="font-variation-settings: 'FILL' 1;">receipt_long</span>
<p class="font-label-bold text-label-bold text-on-surface">Total Transaksi</p>
</div>
<h3 class="font-headline-md text-headline-lg-mobile text-on-surface mb-2">1,482</h3>
<p class="font-label-sm text-label-sm text-text-muted">Rata-rata: Rp 84.000 / transaksi</p>
</div>
<div class="bg-surface-container-lowest rounded-xl p-6 border border-border-hairline shadow-sm flex-1">
<div class="flex items-center gap-2 mb-4">
<span class="material-symbols-outlined text-tertiary-container" style="font-variation-settings: 'FILL' 1;">warning</span>
<p class="font-label-bold text-label-bold text-on-surface">Stok Menipis</p>
</div>
<ul class="space-y-3">
<li class="flex justify-between items-center">
<span class="font-body-sm text-sm text-on-surface-variant">Biji Kopi Arabica</span>
<span class="font-label-bold text-xs bg-error-container text-on-error-container px-2 py-0.5 rounded">Sisa 2kg</span>
</li>
<li class="flex justify-between items-center">
<span class="font-body-sm text-sm text-on-surface-variant">Gula Aren Cair</span>
<span class="font-label-bold text-xs bg-surface-container text-on-surface-variant px-2 py-0.5 rounded">Sisa 5L</span>
</li>
</ul>
</div>
</div>
</div>
</div>
<div class="absolute -left-12 top-1/4 bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-lg border border-border-hairline hidden lg:flex items-center gap-3 animate-[bounce_4s_infinite]">
<div class="w-10 h-10 bg-success/20 rounded-full flex items-center justify-center text-success">
<span class="material-symbols-outlined">check_circle</span>
</div>
<div>
<p class="font-label-bold text-sm">Pembayaran Berhasil</p>
<p class="font-label-sm text-xs text-text-muted">QRIS - Rp 150.000</p>
</div>
</div>
<div class="absolute -right-8 bottom-1/4 bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-lg border border-border-hairline hidden lg:flex flex-col gap-2 animate-[bounce_5s_infinite_0.5s]">
<p class="font-label-bold text-sm text-on-surface flex items-center gap-1">
<span class="material-symbols-outlined text-primary text-sm" style="font-variation-settings: 'FILL' 1;">bolt</span>
                        Data Sinkronisasi
                    </p>
<div class="w-32 h-1.5 bg-surface-container rounded-full overflow-hidden">
<div class="w-3/4 h-full bg-primary rounded-full"></div>
</div>
<p class="font-label-sm text-[10px] text-text-muted text-right">Updated just now</p>
</div>
</div>
</div>
</section>
