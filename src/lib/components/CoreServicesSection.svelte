<script lang="ts">
    import { fadeUp, staggerFadeUp, fadeIn, shimmerButton, spotlightButton, tiltCard, headlineMaskReveal } from '$lib/actions/motion';
</script>

<section id="layanan" use:fadeIn={{ duration: 0.8 }} class="py-section-padding-mobile md:py-section-padding-desktop max-w-7xl mx-auto px-gutter">
    <div use:fadeUp={{ duration: 0.8 }} class="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-24 gap-8">
        <div class="max-w-2xl">
            <span class="inline-block bg-surface-variant text-on-surface-variant font-label-sm text-label-sm uppercase tracking-[0.1em] px-4 py-1 rounded-full mb-6">
                CORE SOLUTIONS
            </span>
            <h2 use:headlineMaskReveal class="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg mb-6">
                Tiga cara kerja Svralabs — pilih yang paling cocok <i class="text-text-muted font-light">buat bisnismu</i>
            </h2>
        </div>
        <button use:shimmerButton class="bg-surface-container-lowest text-on-surface border border-border-hairline px-6 py-3 rounded-full font-label-bold hover:bg-surface-container transition-colors shadow-sm whitespace-nowrap">
            Lihat Semua Layanan
        </button>
    </div>
    
    <div use:staggerFadeUp={{ staggerDelay: 0.1 }} class="perspective-grid grid grid-cols-1 md:grid-cols-3 gap-8">
        <div use:tiltCard class="bg-[#F3F4F6] rounded-[24px] p-8 border border-transparent flex flex-col h-full">
            <div class="w-14 h-14 bg-white rounded-full flex items-center justify-center mb-8 shadow-sm">
                <span class="material-symbols-outlined text-primary-container" data-icon="point_of_sale" style="font-variation-settings: 'FILL' 1, 'wght' 400;">
                    point_of_sale
                </span>
            </div>
            <h3 class="font-headline-md text-[24px] leading-tight font-semibold text-on-surface mb-4">
                Sistem Siap Pakai
            </h3>
            <p class="font-body-md text-body-md text-text-muted mb-8 flex-grow">
                Cepat dan hemat. Tersedia untuk Laundry Management dan POS Coffee Shop. Langsung jalan tanpa nunggu development dari nol.
            </p>
            <a use:spotlightButton class="inline-flex items-center gap-2 bg-on-background text-on-primary font-label-bold text-label-bold rounded-full px-6 py-3 w-fit transition-colors duration-300 hover:bg-primary-container" href="#kontak">
                Lihat Demo
                <span class="material-symbols-outlined text-[16px]" data-icon="arrow_forward">arrow_forward</span>
            </a>
        </div>

        <div use:tiltCard class="bg-[#F3F4F6] rounded-[24px] p-8 border border-transparent flex flex-col h-full">
            <div class="w-14 h-14 bg-white rounded-full flex items-center justify-center mb-8 shadow-sm">
                <span class="material-symbols-outlined text-primary-container" data-icon="code" style="font-variation-settings: 'FILL' 1, 'wght' 400;">
                    code
                </span>
            </div>
            <h3 class="font-headline-md text-[24px] leading-tight font-semibold text-on-surface mb-4">
                Custom Development
            </h3>
            <p class="font-body-md text-body-md text-text-muted mb-8 flex-grow">
                Bisnis punya alur kerja unik? Kami bangun sistem yang dijahit sesuai kebutuhan — dari ritel, klinik, hingga manufaktur.
            </p>
            <a use:spotlightButton class="inline-flex items-center gap-2 bg-on-background text-on-primary font-label-bold text-label-bold rounded-full px-6 py-3 w-fit transition-colors duration-300 hover:bg-primary-container" href="#kontak">
                Konsultasi Kebutuhan
                <span class="material-symbols-outlined text-[16px]" data-icon="arrow_forward">arrow_forward</span>
            </a>
        </div>

        <div use:tiltCard class="bg-[#F3F4F6] rounded-[24px] p-8 border border-transparent flex flex-col h-full">
            <div class="w-14 h-14 bg-white rounded-full flex items-center justify-center mb-8 shadow-sm">
                <span class="material-symbols-outlined text-primary-container" data-icon="domain" style="font-variation-settings: 'FILL' 1, 'wght' 400;">
                    domain
                </span>
            </div>
            <h3 class="font-headline-md text-[24px] leading-tight font-semibold text-on-surface mb-4">
                Integrasi Enterprise
            </h3>
            <p class="font-body-md text-body-md text-text-muted mb-8 flex-grow">
                Skalakan sistem dengan mudah. Kami membantu menghubungkan operasional cabang dengan ERP dan analitik terpusat.
            </p>
            <a use:spotlightButton class="inline-flex items-center gap-2 bg-on-background text-on-primary font-label-bold text-label-bold rounded-full px-6 py-3 w-fit transition-colors duration-300 hover:bg-primary-container" href="#kontak">
                Pelajari Selengkapnya
                <span class="material-symbols-outlined text-[16px]" data-icon="arrow_forward">arrow_forward</span>
            </a>
        </div>
    </div>
</section>
