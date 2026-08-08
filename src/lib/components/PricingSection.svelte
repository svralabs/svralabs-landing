<script lang="ts">
    import { fadeUp, staggerFadeUp, fadeIn, magneticButton, shimmerButton, glareCard, blurReveal, headlineMaskReveal } from '$lib/actions/motion';
</script>

<section id="harga" use:fadeIn={{ duration: 0.8 }} class="py-section-padding-mobile md:py-section-padding-desktop bg-surface-container-lowest">
<div class="px-gutter">
<div use:fadeUp={{ duration: 0.8 }} class="text-center max-w-4xl mx-auto mb-16 md:mb-24">
<div class="inline-flex items-center space-x-2 bg-surface-container px-4 py-1.5 rounded-full mb-8 border border-border-hairline">
<span class="material-symbols-outlined text-primary text-sm">star</span>
<span class="font-label-sm text-label-sm uppercase tracking-widest text-primary">INVESTASI</span>
</div>
<h2 use:headlineMaskReveal class="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg mb-6">
                    Solusi Sesuai <i class="text-text-muted font-light">Kebutuhan Bisnismu</i>
</h2>
<p use:blurReveal={{ delay: 0.15 }} class="font-body-lg text-body-lg text-text-muted max-w-2xl mx-auto">
                    Mulai dari produk siap pakai yang cepat diimplementasikan, hingga pengembangan sistem custom berskala besar.
                </p>
</div>
<div use:staggerFadeUp={{ staggerDelay: 0.15 }} class="perspective-grid grid grid-cols-1 md:grid-cols-3 gap-8 items-end max-w-6xl mx-auto">
<div use:glareCard class="bg-white rounded-[24px] p-8 flex flex-col h-full shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-border-hairline">
<div class="mb-8">
<div class="flex items-center gap-3 mb-4">
<span class="material-symbols-outlined text-primary bg-primary-fixed p-2 rounded-full">storefront</span>
<h3 class="font-label-bold text-label-bold text-on-surface text-lg">Paket POS Ritel</h3>
</div>
<div class="flex items-baseline mb-2">
<span class="font-headline-md text-headline-md text-on-surface tabular-nums">Rp 499.000</span>
<span class="font-body-md text-body-md text-text-muted ml-2">/bulan</span>
</div>
<p class="font-body-md text-body-md text-text-muted text-sm">Ideal untuk usaha kecil yang baru memulai digitalisasi kasir.</p>
</div>
<ul class="flex flex-col gap-4 flex-grow mb-8 font-body-md text-body-md text-on-surface-variant">
<li class="flex items-start gap-3">
<span class="material-symbols-outlined text-primary text-[20px] shrink-0 mt-0.5">check_circle</span>
<span class="">1 Cabang Toko</span>
</li>
<li class="flex items-start gap-3">
<span class="material-symbols-outlined text-primary text-[20px] shrink-0 mt-0.5">check_circle</span>
<span class="">Kasir POS Cloud</span>
</li>
<li class="flex items-start gap-3">
<span class="material-symbols-outlined text-primary text-[20px] shrink-0 mt-0.5">check_circle</span>
<span class="">Laporan Harian Otomatis</span>
</li>
<li class="flex items-start gap-3">
<span class="material-symbols-outlined text-primary text-[20px] shrink-0 mt-0.5">check_circle</span>
<span class="">Dukungan WhatsApp</span>
</li>
</ul>
<a use:shimmerButton class="w-full inline-flex justify-center items-center h-12 rounded-full bg-on-background text-on-primary hover:bg-primary transition-colors duration-300 font-label-bold text-label-bold" href="#kontak">Pilih Starter</a>
</div>
<div class="relative transform transition duration-300 md:-translate-y-4 h-full z-10">
    <div class="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20 pointer-events-none whitespace-nowrap">
        <span class="bg-primary text-on-primary font-label-sm text-[11px] uppercase tracking-wider py-1.5 px-4 rounded-full shadow-md flex items-center gap-1">
            <span class="material-symbols-outlined text-[14px]" style="font-variation-settings: 'FILL' 1;">star</span>
            RECOMMENDED
        </span>
    </div>
    <div use:glareCard class="bg-white rounded-[24px] p-8 flex flex-col h-full shadow-[0_20px_50px_rgb(0,0,0,0.1)] border-2 border-primary">
        <div class="mb-8 mt-2">
<div class="flex items-center gap-3 mb-4">
<span class="material-symbols-outlined text-primary bg-primary-fixed p-2 rounded-full">account_tree</span>
<h3 class="font-label-bold text-label-bold text-on-surface text-lg">Paket Multi-Cabang &amp; Stok</h3>
</div>
<div class="flex items-baseline mb-2">
<span class="font-headline-md text-headline-md text-on-surface tabular-nums">Rp 1.299.000</span>
<span class="font-body-md text-body-md text-text-muted ml-2">/bulan</span>
</div>
<p class="font-body-md text-body-md text-text-muted text-sm">Sempurna untuk bisnis berkembang dengan banyak lokasi.</p>
</div>
<ul class="flex flex-col gap-4 flex-grow mb-8 font-body-md text-body-md text-on-surface-variant">
<li class="flex items-start gap-3">
<span class="material-symbols-outlined text-primary text-[20px] shrink-0 mt-0.5" style="font-variation-settings: 'FILL' 1;">check_circle</span>
<span class="font-medium text-on-surface">Hingga 5 Cabang</span>
</li>
<li class="flex items-start gap-3">
<span class="material-symbols-outlined text-primary text-[20px] shrink-0 mt-0.5" style="font-variation-settings: 'FILL' 1;">check_circle</span>
<span class="font-medium text-on-surface">Manajemen Stok &amp; Gudang</span>
</li>
<li class="flex items-start gap-3">
<span class="material-symbols-outlined text-primary text-[20px] shrink-0 mt-0.5" style="font-variation-settings: 'FILL' 1;">check_circle</span>
<span class="">Analitik Produk Terlaris</span>
</li>
<li class="flex items-start gap-3">
<span class="material-symbols-outlined text-primary text-[20px] shrink-0 mt-0.5" style="font-variation-settings: 'FILL' 1;">check_circle</span>
<span class="">Ekspor Laporan Pajak</span>
</li>
<li class="flex items-start gap-3">
<span class="material-symbols-outlined text-primary text-[20px] shrink-0 mt-0.5" style="font-variation-settings: 'FILL' 1;">check_circle</span>
<span class="">Prioritas Support</span>
</li>
</ul>
<a use:magneticButton class="w-full inline-flex justify-center items-center h-12 rounded-full bg-primary text-on-primary hover:bg-on-background transition-colors duration-300 font-label-bold text-label-bold shadow-md shadow-primary/20" href="#kontak">Pilih Growth</a>
</div>
</div>
<div use:glareCard class="bg-white rounded-[24px] p-8 flex flex-col h-full shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-border-hairline">
<div class="mb-8">
<div class="flex items-center gap-3 mb-4">
<span class="material-symbols-outlined text-primary bg-primary-fixed p-2 rounded-full">corporate_fare</span>
<h3 class="font-label-bold text-label-bold text-on-surface text-lg">Paket Enterprise UMKM</h3>
</div>
<div class="flex items-baseline mb-2">
<span class="font-headline-md text-headline-md text-on-surface tabular-nums">Rp 2.899.000</span>
<span class="font-body-md text-body-md text-text-muted ml-2">/bulan</span>
</div>
<p class="font-body-md text-body-md text-text-muted text-sm">Solusi menyeluruh dengan kustomisasi untuk operasional besar.</p>
</div>
<ul class="flex flex-col gap-4 flex-grow mb-8 font-body-md text-body-md text-on-surface-variant">
<li class="flex items-start gap-3">
<span class="material-symbols-outlined text-primary text-[20px] shrink-0 mt-0.5">check_circle</span>
<span class="">Cabang Tanpa Batas</span>
</li>
<li class="flex items-start gap-3">
<span class="material-symbols-outlined text-primary text-[20px] shrink-0 mt-0.5">check_circle</span>
<span class="">Integrasi ERP &amp; Kustomisasi Fitur</span>
</li>
<li class="flex items-start gap-3">
<span class="material-symbols-outlined text-primary text-[20px] shrink-0 mt-0.5">check_circle</span>
<span class="">Dedicated Account Manager</span>
</li>
<li class="flex items-start gap-3">
<span class="material-symbols-outlined text-primary text-[20px] shrink-0 mt-0.5">check_circle</span>
<span class="">Pelatihan Offline Staf</span>
</li>
</ul>
<a use:shimmerButton class="w-full inline-flex justify-center items-center h-12 rounded-full bg-on-background text-on-primary hover:bg-primary transition-colors duration-300 font-label-bold text-label-bold" href="#kontak">Pilih Scale</a>
</div>
</div>
</div>
</section>
