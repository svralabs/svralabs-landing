<script lang="ts">
    import { magneticButton, shimmerButton } from '$lib/actions/motion';
    
    let y = $state(0);
    let lastY = $state(0);
    let isHidden = $state(false);
    let mobileMenuOpen = $state(false);
    let atTop = $derived(y <= 50);
    
    $effect(() => {
        if (y > 50) {
            if (y > lastY && y > 200) {
                isHidden = true;
                mobileMenuOpen = false;
            } else if (y < lastY) {
                isHidden = false;
            }
        } else {
            isHidden = false;
        }
        lastY = y;
    });

    function navigateOrScroll(event: MouseEvent, targetId: string) {
        if (window.location.pathname === '/') {
            event.preventDefault();
            mobileMenuOpen = false;
            const el = document.getElementById(targetId);
            if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    }
</script>

<svelte:window bind:scrollY={y} />

<!-- Desktop Navbar -->
<nav class="fixed left-1/2 -translate-x-1/2 w-[95%] max-w-7xl rounded-full border z-50 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] {isHidden ? '-top-24 opacity-0 scale-95' : 'top-6 opacity-100 scale-100'} {atTop ? 'bg-white/60 border-white/30 shadow-none backdrop-blur-md' : 'bg-white/90 border-white/50 shadow-[0px_20px_40px_rgba(17,24,39,0.08)] backdrop-blur-xl'} hidden md:block">
    <div class="flex justify-between items-center px-8 py-3.5">
        <a 
            class="font-headline-md text-headline-md font-bold text-on-surface flex items-center gap-2.5" 
            href="/#hero"
            onclick={(e) => navigateOrScroll(e, 'hero')}
        >
            <img src="/logowotext.png" alt="Svralabs" class="h-8 w-auto object-contain" />
            Svralabs
        </a>

        <ul class="flex items-center gap-8">
            <li>
                <a 
                    href="/#solusi" 
                    onclick={(e) => navigateOrScroll(e, 'solusi')}
                    class="text-on-surface-variant font-label-bold hover:text-primary transition-colors duration-300"
                >
                    Solusi
                </a>
            </li>
            <li>
                <a 
                    href="/#layanan" 
                    onclick={(e) => navigateOrScroll(e, 'layanan')}
                    class="text-on-surface-variant font-label-bold hover:text-primary transition-colors duration-300"
                >
                    Layanan
                </a>
            </li>
            <li>
                <a 
                    href="/#portofolio" 
                    onclick={(e) => navigateOrScroll(e, 'portofolio')}
                    class="text-on-surface-variant font-label-bold hover:text-primary transition-colors duration-300"
                >
                    Studi Kasus
                </a>
            </li>
            <li>
                <a 
                    href="/#harga" 
                    onclick={(e) => navigateOrScroll(e, 'harga')}
                    class="text-on-surface-variant font-label-bold hover:text-primary transition-colors duration-300"
                >
                    Harga
                </a>
            </li>
            <li>
                <a 
                    href="/#tentang-kami" 
                    onclick={(e) => navigateOrScroll(e, 'tentang-kami')}
                    class="text-on-surface-variant font-label-bold hover:text-primary transition-colors duration-300"
                >
                    Tentang Kami
                </a>
            </li>
        </ul>

        <a 
            use:magneticButton 
            href="/#kontak" 
            onclick={(e) => navigateOrScroll(e, 'kontak')}
            class="bg-on-surface text-surface px-6 py-2.5 rounded-full font-label-bold text-sm hover:bg-primary transition-all duration-300 shadow-md inline-flex items-center"
        >
            Konsultasi Gratis
        </a>
    </div>
</nav>

<!-- Mobile Navbar -->
<nav class="fixed left-4 right-4 z-50 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] {isHidden ? '-top-24 opacity-0 scale-95' : 'top-4 opacity-100 scale-100'} md:hidden">
    <div class="flex justify-between items-center rounded-2xl p-4 {atTop ? 'bg-white/80 border border-white/40 backdrop-blur-md' : 'bg-white/95 border border-border-hairline shadow-lg backdrop-blur-xl'}">
        <a 
            class="font-headline-md text-headline-lg-mobile font-bold text-on-surface flex items-center gap-2" 
            href="/#hero"
            onclick={(e) => navigateOrScroll(e, 'hero')}
        >
            <img src="/logowotext.png" alt="Svralabs" class="h-7 w-auto object-contain" />
            Svralabs
        </a>

        <button 
            onclick={() => mobileMenuOpen = !mobileMenuOpen}
            aria-label="Toggle Navigation Menu"
            class="p-2 text-on-surface rounded-xl hover:bg-surface-container transition-colors"
        >
            <span class="material-symbols-outlined text-2xl">{mobileMenuOpen ? 'close' : 'menu'}</span>
        </button>
    </div>

    <!-- Mobile Drawer Menu -->
    {#if mobileMenuOpen}
        <div class="mt-2 bg-white/95 backdrop-blur-2xl border border-border-hairline rounded-2xl p-6 shadow-2xl flex flex-col gap-5 transition-all">
            <a 
                href="/#solusi" 
                onclick={(e) => navigateOrScroll(e, 'solusi')}
                class="font-label-bold text-on-surface text-lg py-1 border-b border-border-hairline/50 flex justify-between items-center"
            >
                Solusi
                <span class="material-symbols-outlined text-sm text-text-muted">chevron_right</span>
            </a>
            <a 
                href="/#layanan" 
                onclick={(e) => navigateOrScroll(e, 'layanan')}
                class="font-label-bold text-on-surface text-lg py-1 border-b border-border-hairline/50 flex justify-between items-center"
            >
                Layanan
                <span class="material-symbols-outlined text-sm text-text-muted">chevron_right</span>
            </a>
            <a 
                href="/#portofolio" 
                onclick={(e) => navigateOrScroll(e, 'portofolio')}
                class="font-label-bold text-on-surface text-lg py-1 border-b border-border-hairline/50 flex justify-between items-center"
            >
                Studi Kasus
                <span class="material-symbols-outlined text-sm text-text-muted">chevron_right</span>
            </a>
            <a 
                href="/#harga" 
                onclick={(e) => navigateOrScroll(e, 'harga')}
                class="font-label-bold text-on-surface text-lg py-1 border-b border-border-hairline/50 flex justify-between items-center"
            >
                Harga
                <span class="material-symbols-outlined text-sm text-text-muted">chevron_right</span>
            </a>
            <a 
                href="/#tentang-kami" 
                onclick={(e) => navigateOrScroll(e, 'tentang-kami')}
                class="font-label-bold text-on-surface text-lg py-1 border-b border-border-hairline/50 flex justify-between items-center"
            >
                Tentang Kami
                <span class="material-symbols-outlined text-sm text-text-muted">chevron_right</span>
            </a>

            <a 
                href="/#kontak" 
                onclick={(e) => navigateOrScroll(e, 'kontak')}
                class="mt-2 bg-on-surface text-surface text-center py-3.5 rounded-full font-label-bold text-base hover:bg-primary transition-colors shadow-md"
            >
                Konsultasi Gratis
            </a>
        </div>
    {/if}
</nav>
