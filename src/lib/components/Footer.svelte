<script lang="ts">
    import { fadeUp, magneticButton } from '$lib/actions/motion';

    function navigateOrScroll(event: MouseEvent, targetId: string) {
        if (window.location.pathname === '/') {
            event.preventDefault();
            const el = document.getElementById(targetId);
            if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    }
</script>

<!-- CTA Card Section -->
<section id="kontak" class="max-w-7xl mx-auto px-gutter py-section-padding-mobile md:py-section-padding-desktop">
    <div class="relative w-full rounded-[32px] overflow-hidden bg-gradient-to-br from-on-background via-[#1c2432] to-[#0f1520] text-surface border border-white/10 shadow-2xl p-8 md:p-16 text-center">
        <!-- Subtle Glow Orbs -->
        <div class="absolute top-0 left-1/4 w-72 h-72 bg-primary/20 rounded-full blur-[100px] pointer-events-none"></div>
        <div class="absolute bottom-0 right-1/4 w-72 h-72 bg-inverse-primary/20 rounded-full blur-[100px] pointer-events-none"></div>

        <div use:fadeUp={{ duration: 0.8 }} class="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
            <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 mb-6">
                <span class="material-symbols-outlined text-[16px] text-primary-fixed" style="font-variation-settings: 'FILL' 1;">star</span>
                <span class="font-label-sm text-label-sm uppercase tracking-widest text-surface/90">MULAI DIGITALISASI</span>
            </div>

            <h2 class="font-display-xl-mobile md:font-display-xl text-display-xl-mobile md:text-display-xl text-surface mb-6 leading-tight">
                Capai keunggulan operasional bisnis dengan <i class="text-primary-fixed font-light">sistem terintegrasi</i>
            </h2>

            <p class="font-body-lg text-body-lg text-surface/75 mb-10 max-w-2xl">
                Dirancang oleh praktisi teknologi Pekalongan untuk membantu UMKM ritel, F&B, dan fasilitas publik berkembang tanpa batas.
            </p>

            <a 
                use:magneticButton 
                href="https://wa.me/6285158418944?text=Halo%20Svralabs,%20saya%20ingin%20konsultasi%20mengenai%20sistem%20digitalisasi%20bisnis." 
                target="_blank"
                rel="noopener noreferrer"
                class="bg-primary text-on-primary font-label-bold text-base py-4 px-9 rounded-full transition-all duration-300 shadow-lg hover:shadow-primary/30 inline-flex items-center gap-2"
            >
                <span class="material-symbols-outlined">chat</span>
                Jadwalkan Konsultasi Gratis
            </a>
        </div>
    </div>
</section>

<!-- Footer Main -->
<footer aria-labelledby="footer-heading" class="w-full pt-16 bg-surface-container-lowest text-on-surface border-t border-border-hairline overflow-hidden">
    <h2 class="sr-only" id="footer-heading">Footer</h2>
    
    <div use:fadeUp={{ duration: 0.8 }} class="max-w-7xl mx-auto px-gutter flex flex-col lg:flex-row justify-between gap-12 lg:gap-24 mb-16">
        
        <!-- Brand Info & Newsletter -->
        <div class="flex flex-col gap-6 max-w-sm">
            <a 
                aria-label="Svralabs Home" 
                class="font-display-xl text-headline-md font-bold tracking-tighter text-on-surface flex items-center gap-2.5" 
                href="/#hero"
                onclick={(e) => navigateOrScroll(e, 'hero')}
            >
                <img src="/logowotext.png" alt="Svralabs" class="h-8 w-auto object-contain" />
                Svralabs
            </a>
            
            <p class="font-body-md text-sm text-text-muted">
                Software house asal Pekalongan. Solusi sistem kasir POS, rekam medis EMR, dan custom software untuk UMKM hingga enterprise.
            </p>

            <div>
                <h3 class="font-inter text-sm font-semibold text-on-surface mb-3">Dapatkan insight digitalisasi bisnis</h3>
                <form action="#" class="flex gap-2" onsubmit={(e) => e.preventDefault()}>
                    <label class="sr-only" for="email-address">Alamat Email</label>
                    <input 
                        autocomplete="email" 
                        class="min-w-0 flex-auto rounded-full border border-border-hairline bg-[#F3F4F6] px-4 py-2.5 text-on-surface text-sm font-inter focus:ring-2 focus:ring-primary focus:outline-none" 
                        id="email-address" 
                        name="email" 
                        placeholder="Masukkan email anda" 
                        required 
                        type="email"
                    />
                    <button class="flex-none rounded-full bg-on-surface px-5 py-2.5 text-sm font-semibold text-surface hover:bg-primary transition-colors duration-150 font-inter" type="submit">
                        Kirim
                    </button>
                </form>
            </div>
        </div>

        <!-- Links Columns -->
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-8 md:gap-16">
            <div>
                <h3 class="font-inter text-sm font-semibold uppercase tracking-wider text-on-surface mb-4">Navigasi</h3>
                <ul class="space-y-3 font-body-md text-sm">
                    <li><a class="text-text-muted hover:text-primary transition-colors" href="/#hero" onclick={(e) => navigateOrScroll(e, 'hero')}>Beranda</a></li>
                    <li><a class="text-text-muted hover:text-primary transition-colors" href="/#layanan" onclick={(e) => navigateOrScroll(e, 'layanan')}>Layanan</a></li>
                    <li><a class="text-text-muted hover:text-primary transition-colors" href="/#portofolio" onclick={(e) => navigateOrScroll(e, 'portofolio')}>Studi Kasus</a></li>
                    <li><a class="text-text-muted hover:text-primary transition-colors" href="/#harga" onclick={(e) => navigateOrScroll(e, 'harga')}>Harga & Paket</a></li>
                    <li><a class="text-text-muted hover:text-primary transition-colors" href="/#tentang-kami" onclick={(e) => navigateOrScroll(e, 'tentang-kami')}>Tentang Kami</a></li>
                </ul>
            </div>

            <div>
                <h3 class="font-inter text-sm font-semibold uppercase tracking-wider text-on-surface mb-4">Studi Kasus</h3>
                <ul class="space-y-3 font-body-md text-sm">
                    <li><a class="text-text-muted hover:text-primary transition-colors" href="/studi-kasus/puskesmas-wonokerto">Puskesmas Wonokerto</a></li>
                    <li><a class="text-text-muted hover:text-primary transition-colors" href="/studi-kasus/pos-wonopringgo">POS Konveksi Wonopringgo</a></li>
                    <li><a class="text-text-muted hover:text-primary transition-colors" href="/#portofolio" onclick={(e) => navigateOrScroll(e, 'portofolio')}>Semua Portofolio</a></li>
                </ul>
            </div>

            <div>
                <h3 class="font-inter text-sm font-semibold uppercase tracking-wider text-on-surface mb-4">Kontak</h3>
                <ul class="space-y-3 font-body-md text-sm">
                    <li class="text-text-muted">Pekalongan, Jawa Tengah</li>
                    <li><a class="text-text-muted hover:text-primary transition-colors" href="https://wa.me/6285158418944" target="_blank" rel="noopener noreferrer">WhatsApp Support (+62 851-5841-8944)</a></li>
                    <li><a class="text-text-muted hover:text-primary transition-colors" href="mailto:svralabs@gmail.com">svralabs@gmail.com</a></li>
                </ul>
            </div>
        </div>

    </div>

    <!-- Copyright & Big Wordmark -->
    <div class="max-w-7xl mx-auto px-gutter pb-6 flex flex-col sm:flex-row justify-between items-center text-text-muted font-label-bold text-xs border-t border-border-hairline pt-6">
        <p>© 2026 Svralabs. Digitalisasi UMKM gak perlu mahal dan ribet.</p>
        <div class="flex gap-4 mt-2 sm:mt-0">
            <a class="hover:text-primary transition-colors" href="/#kontak" onclick={(e) => navigateOrScroll(e, 'kontak')}>Privasi</a>
            <a class="hover:text-primary transition-colors" href="/#kontak" onclick={(e) => navigateOrScroll(e, 'kontak')}>Syarat & Ketentuan</a>
        </div>
    </div>

    <div use:fadeUp={{ duration: 1 }} class="w-full flex justify-center items-end bg-surface-container-lowest select-none pointer-events-none overflow-hidden pt-4">
        <span class="font-display-xl giant-wordmark text-near-black/5 text-center w-full px-4 tracking-tighter leading-none">
            SVRALABS
        </span>
    </div>
</footer>
