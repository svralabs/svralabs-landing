<script lang="ts">
    import { fadeUp, staggerFadeUp, fadeIn } from '$lib/actions/motion';
</script>

<section id="platform-security" use:fadeIn={{ duration: 0.8 }} class="py-section-padding-mobile md:py-section-padding-desktop max-w-7xl mx-auto px-8">
    <div use:fadeUp={{ duration: 0.8 }} class="flex flex-col items-center text-center mb-16 md:mb-24">
        <div class="inline-flex items-center space-x-2 bg-surface-container px-4 py-1.5 rounded-full mb-8 border border-border-hairline">
            <span class="material-symbols-outlined text-primary text-sm">shield</span>
            <span class="font-label-sm text-label-sm uppercase tracking-widest text-primary">KEAMANAN & ANALITIK</span>
        </div>
        
        <h2 class="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg max-w-3xl mb-8">
            Kontrol penuh bisnis di tanganmu, <i class="text-text-muted font-light">bukan di tangan karyawan.</i>
        </h2>
    </div>

    <div use:staggerFadeUp={{ staggerDelay: 0.15 }} class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Feature 3: Keamanan Data -->
        <div class="bg-surface-faint rounded-[24px] p-8 md:p-10 border border-border-hairline hover:border-outline-variant transition-colors group flex flex-col h-full">
            <div class="mb-10">
                <span class="inline-block px-3 py-1 bg-primary-fixed text-on-primary-fixed rounded-full font-label-sm text-label-sm uppercase tracking-wider mb-6">DATA SECURITY</span>
                <h3 class="font-headline-md text-headline-md mb-4 group-hover:text-primary transition-colors duration-300">Transaksi & Akses Aman</h3>
                <p class="font-body-md text-body-md text-text-muted">Hak akses kasir, manajer, dan owner terpisah dengan enkripsi data kelas enterprise, mencegah manipulasi data transaksi.</p>
            </div>
            
            <div class="mt-auto relative rounded-xl overflow-hidden bg-white border border-border-hairline shadow-sm p-6 flex justify-center items-center min-h-[220px]">
                <div class="w-full max-w-[280px]">
                    <div class="bg-surface-container rounded-lg p-4 mb-3 border border-border-hairline/50 flex items-center justify-between transition-transform duration-300 group-hover:scale-105">
                        <div class="flex items-center space-x-3">
                            <span class="material-symbols-outlined text-text-muted">person</span>
                            <span class="text-sm font-medium text-on-surface">Owner Access</span>
                        </div>
                        <span class="material-symbols-outlined text-success text-sm">check_circle</span>
                    </div>
                    
                    <div class="bg-primary/5 rounded-lg p-4 mb-3 border border-primary/20 flex items-center justify-between transition-transform duration-300 group-hover:scale-105 delay-75">
                        <div class="flex items-center space-x-3">
                            <span class="material-symbols-outlined text-primary">manage_accounts</span>
                            <span class="text-sm font-medium text-primary">Manager Access</span>
                        </div>
                        <span class="material-symbols-outlined text-primary text-sm">lock_open</span>
                    </div>
                    
                    <div class="bg-surface-container rounded-lg p-4 border border-border-hairline/50 flex items-center justify-between opacity-60 transition-transform duration-300 group-hover:scale-105 delay-150">
                        <div class="flex items-center space-x-3">
                            <span class="material-symbols-outlined text-text-muted">point_of_sale</span>
                            <span class="text-sm font-medium text-on-surface">Cashier Access</span>
                        </div>
                        <span class="material-symbols-outlined text-text-muted text-sm">lock</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Feature 4: Analitik Stok -->
        <div class="bg-surface-faint rounded-[24px] p-8 md:p-10 border border-border-hairline hover:border-outline-variant transition-colors group flex flex-col h-full">
            <div class="mb-10">
                <span class="inline-block px-3 py-1 bg-primary-fixed text-on-primary-fixed rounded-full font-label-sm text-label-sm uppercase tracking-wider mb-6">REAL-TIME INSIGHTS</span>
                <h3 class="font-headline-md text-headline-md mb-4 group-hover:text-primary transition-colors duration-300">Analitik Stok & Penjualan</h3>
                <p class="font-body-md text-body-md text-text-muted">Pantau pergerakan produk terlaris dan grafik pendapatan bulanan secara akurat untuk pengambilan keputusan bisnis yang cerdas.</p>
            </div>
            
            <div class="mt-auto relative rounded-xl overflow-hidden bg-white border border-border-hairline shadow-sm p-6 flex justify-center items-center min-h-[220px]">
                <div class="w-full max-w-[280px]">
                    <div class="flex items-center justify-between mb-6">
                        <div>
                            <div class="text-xs text-text-muted mb-1">Total Revenue</div>
                            <div class="text-xl font-bold text-on-surface">Rp 45.2M</div>
                        </div>
                        <div class="bg-success/10 text-success text-xs px-2 py-1 rounded flex items-center">
                            <span class="material-symbols-outlined text-[14px] mr-1">trending_up</span> 12%
                        </div>
                    </div>
                    
                    <div class="space-y-4">
                        <div class="flex flex-col justify-between group-hover:pl-2 transition-all duration-300">
                            <div class="flex justify-between mb-1">
                                <span class="text-xs text-text-muted">Kopi Susu Gula Aren</span>
                                <span class="text-xs font-medium text-on-surface">450 qty</span>
                            </div>
                            <div class="w-full h-1.5 bg-surface-container rounded-full overflow-hidden">
                                <div class="h-full bg-primary w-[85%]"></div>
                            </div>
                        </div>
                        
                        <div class="flex flex-col justify-between group-hover:pl-2 transition-all duration-300 delay-75">
                            <div class="flex justify-between mb-1">
                                <span class="text-xs text-text-muted">Matcha Latte</span>
                                <span class="text-xs font-medium text-on-surface">320 qty</span>
                            </div>
                            <div class="w-full h-1.5 bg-surface-container rounded-full overflow-hidden">
                                <div class="h-full bg-primary/70 w-[60%]"></div>
                            </div>
                        </div>
                        
                        <div class="flex flex-col justify-between group-hover:pl-2 transition-all duration-300 delay-150">
                            <div class="flex justify-between mb-1">
                                <span class="text-xs text-text-muted">Croissant Butter</span>
                                <span class="text-xs font-medium text-on-surface">180 qty</span>
                            </div>
                            <div class="w-full h-1.5 bg-surface-container rounded-full overflow-hidden">
                                <div class="h-full bg-primary/40 w-[45%]"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
