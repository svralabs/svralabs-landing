<script lang="ts">
    import { fadeUp, staggerFadeUp, fadeIn, magneticButton, tiltCard, blurReveal, headlineMaskReveal } from '$lib/actions/motion';
    
    function scrollTo(id: string) {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
</script>

<section use:fadeIn={{ duration: 0.8 }} class="relative py-section-padding-mobile md:py-section-padding-desktop w-full overflow-hidden">
<div class="absolute inset-0 z-0">
<img alt="Serene blue sky background" class="w-full h-full object-cover" src="/blue_sky_bg_1786188871421.jpg"/>
<div class="absolute inset-0 bg-white/10"></div>
</div>
<div class="relative z-10 max-w-[1280px] mx-margin-container px-4 md:px-8 flex flex-col items-center">
<div use:fadeUp={{ duration: 0.8 }} class="text-center mb-16 max-w-3xl">
<span class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-border-hairline shadow-sm font-label-bold text-primary uppercase mb-6">
<span class="material-symbols-outlined text-[16px] text-primary" data-icon="star" data-weight="fill" style="font-variation-settings: 'FILL' 1;">star</span>
                    MASALAH & SOLUSI
                </span>
<h2 use:headlineMaskReveal class="font-headline-lg-mobile md:font-headline-lg text-on-surface">
                    Masih pusing urus stok hilang <br class="hidden md:block"/>
dan <span class="italic text-primary-container">antrian panjang?</span>
                </h2>
<p use:blurReveal={{ delay: 0.15 }} class="mt-6 text-on-surface-variant font-body-md max-w-2xl mx-auto">
                    Kami paham sakit kepalanya ngurus operasional manual. Svralabs merancang sistem yang bantu selesaikan akar masalahnya.
                </p>
</div>
<div use:staggerFadeUp={{ staggerDelay: 0.1 }} class="perspective-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full mb-16">
<div use:tiltCard class="bg-white rounded-24 p-8 border border-border-hairline flex flex-col items-start text-left">
<div class="w-12 h-12 rounded-full bg-primary-container flex items-center justify-center mb-6 shadow-md">
<span class="material-symbols-outlined text-white" data-icon="storefront">storefront</span>
</div>
<h3 class="font-headline-md text-[20px] font-semibold text-on-surface mb-3">POS Kasir Multi-Cabang</h3>
<p class="font-body-md text-[14px] text-text-muted">Kelola transaksi kasir online maupun offline dengan sinkronisasi data seketika di semua toko.</p>
</div>
<div use:tiltCard class="bg-white rounded-24 p-8 border border-border-hairline flex flex-col items-start text-left">
<div class="w-12 h-12 rounded-full bg-primary-container flex items-center justify-center mb-6 shadow-md">
<span class="material-symbols-outlined text-white" data-icon="inventory_2">inventory_2</span>
</div>
<h3 class="font-headline-md text-[20px] font-semibold text-on-surface mb-3">Manajemen Stok Otomatis</h3>
<p class="font-body-md text-[14px] text-text-muted">Lacak pergerakan bahan baku dan barang jadi dengan peringatan restock sebelum kehabisan.</p>
</div>
<div use:tiltCard class="bg-white rounded-24 p-8 border border-border-hairline flex flex-col items-start text-left">
<div class="w-12 h-12 rounded-full bg-primary-container flex items-center justify-center mb-6 shadow-md">
<span class="material-symbols-outlined text-white" data-icon="cloud_sync">cloud_sync</span>
</div>
<h3 class="font-headline-md text-[20px] font-semibold text-on-surface mb-3">Digitalisasi Alur Bisnis</h3>
<p class="font-body-md text-[14px] text-text-muted">Integrasikan seluruh alur kerja bisnis ke dalam satu ekosistem cloud modern — dari kasir hingga laporan.</p>
</div>
<div use:tiltCard class="bg-white rounded-24 p-8 border border-border-hairline flex flex-col items-start text-left">
<div class="w-12 h-12 rounded-full bg-primary-container flex items-center justify-center mb-6 shadow-md">
<span class="material-symbols-outlined text-white" data-icon="trending_up">trending_up</span>
</div>
<h3 class="font-headline-md text-[20px] font-semibold text-on-surface mb-3">Ekspansi Pasar Lebih Mudah</h3>
<p class="font-body-md text-[14px] text-text-muted">Analisis tren penjualan produk terlaris untuk merancang strategi promosi yang akurat.</p>
</div>
</div>
<button use:magneticButton onclick={() => scrollTo('kontak')} class="bg-near-black hover:bg-primary text-white font-label-bold px-8 py-4 rounded-full transition-colors duration-300 shadow-lg hover:shadow-xl">
                Mulai Digitalisasi Sekarang
            </button>
</div>
</section>
