<script lang="ts">
    import { fadeUp, staggerFadeUp, fadeIn } from '$lib/actions/motion';
</script>

<section id="platform-workflow" use:fadeIn={{ duration: 0.8 }} class="py-section-padding-mobile md:py-section-padding-desktop max-w-7xl mx-auto px-8">
    <div use:fadeUp={{ duration: 0.8 }} class="flex flex-col items-center text-center mb-16 md:mb-24">
        <div class="inline-flex items-center space-x-2 bg-surface-container px-4 py-1.5 rounded-full mb-8 border border-border-hairline">
            <span class="material-symbols-outlined text-primary text-sm">star</span>
            <span class="font-label-sm text-label-sm uppercase tracking-widest text-primary">WORKFLOW KASIR</span>
        </div>
        
        <h2 class="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg max-w-3xl mb-8">
            Kasir yang bikin antri cepat, laporan <i class="text-text-muted font-light">beres sendiri</i>.
        </h2>
    </div>

    <div class="flex flex-col gap-24">
        <!-- Feature 1: Kasir Intuitif -->
        <div class="flex flex-col md:flex-row items-center gap-12 group">
            <div use:fadeUp={{ duration: 0.8 }} class="flex-1 w-full order-2 md:order-1 md:pr-12">
                <span class="inline-block px-3 py-1 bg-primary-fixed text-on-primary-fixed rounded-full font-label-sm text-label-sm uppercase tracking-wider mb-6">INTERFAS BERSIH</span>
                <h3 class="font-headline-md text-headline-md mb-4 text-on-surface group-hover:text-primary transition-colors duration-300">Antarmuka Kasir Intuitif</h3>
                <p class="font-body-md text-body-md text-text-muted mb-8">Desain layar kasir yang ramah pengguna, mudah dioperasikan tanpa pelatihan teknis rumit untuk staf baru.</p>
                
                <ul class="space-y-4">
                    <li class="flex items-center gap-3 font-body-md text-on-surface">
                        <span class="material-symbols-outlined text-success">check_circle</span> Proses checkout lebih cepat, antrian tidak menumpuk
                    </li>
                    <li class="flex items-center gap-3 font-body-md text-on-surface">
                        <span class="material-symbols-outlined text-success">check_circle</span> Mendukung berbagai metode pembayaran termasuk QRIS
                    </li>
                </ul>
            </div>
            
            <div use:fadeUp={{ duration: 0.8, delay: 0.1 }} class="flex-1 w-full order-1 md:order-2">
                <div class="relative rounded-3xl overflow-hidden bg-surface-faint border border-border-hairline shadow-sm p-8 flex justify-center items-center min-h-[350px]">
                    <div class="w-full max-w-[320px] bg-white rounded-xl p-6 shadow-sm border border-border-hairline transition-transform duration-500 group-hover:scale-105">
                        <div class="flex items-center justify-between mb-6 pb-4 border-b border-border-hairline">
                            <div class="flex items-center space-x-3">
                                <div class="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                                    <span class="material-symbols-outlined text-primary">point_of_sale</span>
                                </div>
                                <div>
                                    <div class="h-3 w-20 bg-surface-dim rounded mb-2"></div>
                                    <div class="h-2 w-12 bg-surface-container rounded"></div>
                                </div>
                            </div>
                            <div class="h-8 w-20 bg-primary-container/20 rounded-full"></div>
                        </div>
                        <div class="grid grid-cols-3 gap-3 mb-6">
                            <div class="h-16 bg-surface-container rounded-lg"></div>
                            <div class="h-16 bg-surface-container rounded-lg"></div>
                            <div class="h-16 bg-surface-container rounded-lg"></div>
                            <div class="h-16 bg-surface-container rounded-lg"></div>
                            <div class="h-16 bg-surface-container rounded-lg"></div>
                            <div class="h-16 bg-surface-container rounded-lg"></div>
                        </div>
                        <div class="h-12 w-full bg-primary rounded-lg flex items-center justify-center text-on-primary font-label-bold text-sm">
                            Checkout
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Feature 2: Laporan Harian -->
        <div class="flex flex-col md:flex-row items-center gap-12 group">
            <div use:fadeUp={{ duration: 0.8, delay: 0.1 }} class="flex-1 w-full order-1 md:order-1">
                <div class="relative rounded-3xl overflow-hidden bg-surface-faint border border-border-hairline shadow-sm p-8 flex justify-center items-end min-h-[350px]">
                    <div class="w-full max-w-[320px] h-40 flex items-end justify-between space-x-3 pb-4">
                        <div class="w-full bg-surface-container rounded-t-md h-[30%]"></div>
                        <div class="w-full bg-surface-container rounded-t-md h-[50%]"></div>
                        <div class="w-full bg-primary/40 rounded-t-md h-[70%] relative group-hover:bg-primary/60 transition-colors"></div>
                        <div class="w-full bg-primary rounded-t-md h-[90%] relative group-hover:h-[100%] transition-all duration-500">
                            <div class="absolute -top-8 left-1/2 -translate-x-1/2 bg-on-surface text-on-primary text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">+24%</div>
                        </div>
                        <div class="w-full bg-surface-container rounded-t-md h-[40%]"></div>
                        <div class="w-full bg-surface-container rounded-t-md h-[60%]"></div>
                    </div>
                </div>
            </div>
            
            <div use:fadeUp={{ duration: 0.8 }} class="flex-1 w-full order-2 md:order-2 md:pl-12">
                <span class="inline-block px-3 py-1 bg-primary-fixed text-on-primary-fixed rounded-full font-label-sm text-label-sm uppercase tracking-wider mb-6">LEBIH CEPAT</span>
                <h3 class="font-headline-md text-headline-md mb-4 text-on-surface group-hover:text-primary transition-colors duration-300">Otomatisasi Laporan Harian</h3>
                <p class="font-body-md text-body-md text-text-muted mb-8">Alur kerja terintegrasi yang otomatis merekap penjualan, stok masuk, dan arus kas tiap tutup kedai tanpa input manual.</p>
                
                <ul class="space-y-4">
                    <li class="flex items-center gap-3 font-body-md text-on-surface">
                        <span class="material-symbols-outlined text-success">check_circle</span> Integrasi data real-time
                    </li>
                    <li class="flex items-center gap-3 font-body-md text-on-surface">
                        <span class="material-symbols-outlined text-success">check_circle</span> Export ke PDF atau Excel
                    </li>
                </ul>
            </div>
        </div>
    </div>
</section>
