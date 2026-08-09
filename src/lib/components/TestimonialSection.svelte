<script lang="ts">
    import { fadeUp, staggerFadeUp, fadeIn, glareCard } from '$lib/actions/motion';
</script>

<section id="portofolio" use:fadeIn={{ duration: 0.8 }} class="py-section-padding-mobile md:py-section-padding-desktop px-gutter max-w-7xl mx-auto">
<div use:fadeUp={{ duration: 0.8 }} class="text-center mb-24">
<div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-container-highest/50 mb-6 border border-border-hairline backdrop-blur-md">
<span class="material-symbols-outlined text-primary text-sm" style="font-variation-settings: 'FILL' 1;">star</span>
<span class="font-label-sm text-label-sm uppercase tracking-wider text-on-surface">STUDI KASUS NYATA</span>
</div>
<h2 class="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg text-on-surface max-w-3xl mx-auto">
                Sistem yang sudah jalan — bukan sekadar demo
            </h2>
<p class="font-body-md text-body-md text-on-surface-variant mt-4 max-w-2xl mx-auto">
                Dari klinik fasilitas kesehatan hingga grosir konveksi. Ini bukan portofolio, ini sistem yang dipakai sehari-hari.
            </p>
</div>

<div use:staggerFadeUp={{ staggerDelay: 0.15 }} class="perspective-grid grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16 mt-8">
    
    <!-- Case Study 1 -->
    <div use:glareCard class="bg-surface-faint rounded-[24px] border border-border-hairline overflow-hidden flex flex-col">
        <div class="w-full h-72 overflow-hidden relative border-b border-border-hairline">
            <img class="w-full h-full object-cover transition-transform duration-500" src="/puskesmas wonokerto/Tangkapan Layar 2026-06-17 pukul 20.43.07.png" alt="Sistem Puskesmas Wonokerto" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-6 md:p-8">
                <h3 class="font-headline-md text-white text-[24px] font-bold leading-tight">Sistem Pelayanan Puskesmas Wonokerto</h3>
            </div>
        </div>
        <div class="p-8 flex flex-col gap-6 flex-grow">
            <div>
                <h4 class="font-label-bold text-text-muted mb-1 flex items-center gap-2"><span class="material-symbols-outlined text-[18px]">report_problem</span> Problem</h4>
                <p class="font-body-md text-on-surface font-medium">Antrian pasien panjang dan pencarian rekam medis manual yang memakan waktu lama.</p>
            </div>
            <div>
                <h4 class="font-label-bold text-text-muted mb-1 flex items-center gap-2"><span class="material-symbols-outlined text-[18px]">lightbulb</span> Solution</h4>
                <p class="font-body-md text-on-surface font-medium">Digitalisasi alur pendaftaran terintegrasi dengan database pasien dan rekam medis elektronik.</p>
            </div>
            <div class="bg-primary/5 p-4 rounded-xl border border-primary/10 mt-2">
                <h4 class="font-label-bold text-primary mb-1 flex items-center gap-2"><span class="material-symbols-outlined text-[18px]">check_circle</span> Outcome</h4>
                <p class="font-body-md text-on-surface">Pelayanan jauh lebih cepat, bebas antrian panjang, dan arsip rekam medis 100% aman tersentralisasi.</p>
            </div>
            <a href="/studi-kasus/puskesmas-wonokerto" class="mt-auto inline-flex items-center gap-2 text-primary font-label-bold hover:gap-3 transition-all duration-300">
                Lihat Detail Proyek
                <span class="material-symbols-outlined text-[18px]">arrow_forward</span>
            </a>
        </div>
    </div>

    <!-- Case Study 2 -->
    <div use:glareCard class="bg-surface-faint rounded-[24px] border border-border-hairline overflow-hidden flex flex-col">
        <div class="w-full h-72 overflow-hidden relative border-b border-border-hairline">
            <img class="w-full h-full object-cover object-top transition-transform duration-500" src="/toko konveksi wonopringgo/Tangkapan Layar 2026-08-09 pukul 00.24.23.png" alt="POS Toko Konveksi Wonopringgo" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-6 md:p-8">
                <h3 class="font-headline-md text-white text-[24px] font-bold leading-tight">POS Grosir Konveksi Wonopringgo</h3>
            </div>
        </div>
        <div class="p-8 flex flex-col gap-6 flex-grow">
            <div>
                <h4 class="font-label-bold text-text-muted mb-1 flex items-center gap-2"><span class="material-symbols-outlined text-[18px]">report_problem</span> Problem</h4>
                <p class="font-body-md text-on-surface font-medium">Susah melacak stok kain, bahan baku, dan baju jadi yang keluar masuk setiap harinya secara akurat.</p>
            </div>
            <div>
                <h4 class="font-label-bold text-text-muted mb-1 flex items-center gap-2"><span class="material-symbols-outlined text-[18px]">lightbulb</span> Solution</h4>
                <p class="font-body-md text-on-surface font-medium">Sistem POS khusus grosir/manufaktur dengan manajemen inventaris berlapis untuk bahan baku &amp; barang jadi.</p>
            </div>
            <div class="bg-primary/5 p-4 rounded-xl border border-primary/10 mt-2">
                <h4 class="font-label-bold text-primary mb-1 flex items-center gap-2"><span class="material-symbols-outlined text-[18px]">check_circle</span> Outcome</h4>
                <p class="font-body-md text-on-surface">Stok terpotong presisi, tidak ada lagi selisih laporan, dan mencegah barang hilang tak tercatat.</p>
            </div>
            <a href="/studi-kasus/pos-wonopringgo" class="mt-auto inline-flex items-center gap-2 text-primary font-label-bold hover:gap-3 transition-all duration-300">
                Lihat Detail Proyek
                <span class="material-symbols-outlined text-[18px]">arrow_forward</span>
            </a>
        </div>
    </div>

</div>
</section>
