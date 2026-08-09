<script lang="ts">
    import { fadeUp, staggerScaleIn, scaleIn, staggerFadeUp, fadeIn, countUp, headlineMaskReveal } from '$lib/actions/motion';
</script>

<section id="tentang-kami" use:fadeIn={{ duration: 0.8 }} class="py-section-padding-mobile md:py-section-padding-desktop bg-surface-container-lowest overflow-hidden">
    <div class="max-w-7xl mx-auto px-gutter flex flex-col md:flex-row items-center gap-16 md:gap-24">
        <!-- Left Side: Header & Stats -->
        <div class="flex-1 w-full">
            <div use:fadeUp={{ duration: 0.8 }} class="text-left mb-12">
                <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-container border border-outline-variant/30 mb-8">
                    <span class="material-symbols-outlined text-[16px] text-primary" style="font-variation-settings: 'FILL' 1;">star</span>
                    <span class="font-label-bold text-label-bold text-on-surface uppercase tracking-wider">TENTANG KAMI</span>
                </div>
                <h2 use:headlineMaskReveal class="font-display-xl-mobile md:font-headline-lg text-display-xl-mobile md:text-headline-lg text-on-surface leading-tight">
                    Efisiensikan waktumu dari operasional, biar bisa fokus <em class="italic text-primary">menganalisa bisnismu</em>.
                </h2>
            </div>
            
            <div use:staggerFadeUp={{ staggerDelay: 0.15 }} class="w-full grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12">
                <div class="flex flex-col items-start">
                    <div class="w-12 h-12 rounded-full bg-primary-container flex items-center justify-center mb-4 shadow-sm">
                        <span class="material-symbols-outlined text-white" data-icon="autorenew">autorenew</span>
                    </div>
                    <h3 class="font-label-bold text-label-bold text-on-surface mb-2">Laporan Otomatis</h3>
                    <p class="font-body-md text-body-md text-text-muted">Tinggalkan rekap manual berjam-jam tiap tutup toko.</p>
                </div>
                
                <div class="flex flex-col items-start">
                    <div class="w-12 h-12 rounded-full bg-primary-container flex items-center justify-center mb-4 shadow-sm">
                        <span class="material-symbols-outlined text-white" data-icon="language">language</span>
                    </div>
                    <h3 class="font-label-bold text-label-bold text-on-surface mb-2">Pantau Darimana Saja</h3>
                    <p class="font-body-md text-body-md text-text-muted">Cek omset dan stok toko dari HP, meski kamu lagi di luar.</p>
                </div>
                
                <div class="flex flex-col items-start">
                    <div class="w-12 h-12 rounded-full bg-primary-container flex items-center justify-center mb-4 shadow-sm">
                        <span class="material-symbols-outlined text-white" data-icon="fact_check">fact_check</span>
                    </div>
                    <h3 class="font-label-bold text-label-bold text-on-surface mb-2">Minim Kesalahan</h3>
                    <p class="font-body-md text-body-md text-text-muted">Akurasi data otomatis untuk mencegah kebocoran kas.</p>
                </div>
            </div>
        </div>

        <!-- Right Side: Image -->
        <div class="flex-1 w-full max-w-[500px] mx-auto md:mx-0">
            <div use:scaleIn={{ delay: 0.2 }} class="relative w-full aspect-[3/4] group">
                <div class="absolute inset-0 bg-surface-faint rounded-[24px] overflow-hidden transition-transform duration-500 group-hover:-translate-y-2 border border-border-hairline shadow-sm">
                    <img class="w-full h-full object-cover" alt="Tampilan sistem manajemen laundry Svralabs di tablet" src="/laundry management/Tangkapan Layar 2026-08-09 pukul 00.34.44.png"/>
                </div>
                
                <div class="absolute -left-6 md:-left-12 bottom-12 glass-panel rounded-xl p-4 w-56 transition-transform duration-500 delay-100 group-hover:-translate-y-4">
                    <div class="flex justify-between items-center mb-2">
                        <span class="font-label-bold text-label-bold text-on-surface">Expenses</span>
                        <span class="bg-surface-container px-2 py-0.5 rounded-md text-xs text-text-muted">Monthly <span class="material-symbols-outlined text-[12px] align-middle">expand_more</span></span>
                    </div>
                    <div class="text-2xl font-semibold text-primary mb-2"><span use:countUp={{to: 85}}>0</span>%</div>
                    <div class="flex items-end gap-1 h-8">
                        <div class="w-2 bg-primary/20 rounded-t-sm h-1/3"></div>
                        <div class="w-2 bg-primary/40 rounded-t-sm h-2/3"></div>
                        <div class="w-2 bg-primary/60 rounded-t-sm h-1/2"></div>
                        <div class="w-2 bg-primary/80 rounded-t-sm h-full"></div>
                        <div class="w-2 bg-primary rounded-t-sm h-5/6"></div>
                        <div class="w-2 bg-primary/40 rounded-t-sm h-1/3"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
