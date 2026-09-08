<script lang="ts">
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  import { magneticButton, idleFloat, sectionLayeredParallax, isReducedMotion } from '$lib/actions/gsapParallax';
  import { ScrollSmoother } from 'gsap/ScrollSmoother';

  let footerRoot: HTMLElement;
  let headlineEl: HTMLElement;

  function navigateOrScroll(event: MouseEvent, targetId: string) {
    if (typeof window !== 'undefined' && window.location.pathname === '/') {
      event.preventDefault();
      const el = document.getElementById(targetId);
      if (el) {
        const smoother = ScrollSmoother.get();
        if (smoother) {
          smoother.scrollTo(el, true, 'top top');
        } else {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    }
  }

  onMount(() => {
    if (typeof window === 'undefined' || isReducedMotion()) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const entranceTl = gsap.timeline({
        scrollTrigger: {
          trigger: footerRoot,
          start: 'top 65%',
          toggleActions: 'play none none none',
          once: true,
        },
        defaults: { ease: 'power2.out' },
      });

      // 1. CTA Card: Smooth Rise
      entranceTl.fromTo(
        '.footer-cta-card',
        { opacity: 0, y: 50, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power2.out' },
        0.05
      );

      // 2. Kicker Badge: Smooth Fade & Rise
      entranceTl.fromTo(
        '.footer-kicker',
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out' },
        0.15
      );

      // 3. Headline Masked Kinetic Words
      const words = headlineEl ? headlineEl.querySelectorAll('.footer-word') : [];
      if (words.length > 0) {
        entranceTl.fromTo(
          words,
          { opacity: 0, y: '115%', filter: 'blur(8px)' },
          { opacity: 1, y: '0%', filter: 'blur(0px)', duration: 0.85, stagger: 0.035, ease: 'power3.out' },
          0.3
        );
      }

      // 4. Description & WA Button Pop
      entranceTl.fromTo(
        '.footer-desc, .footer-wa-btn',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.12, duration: 0.7, ease: 'power2.out' },
        0.5
      );

      // 5. Navigation & Legal Footer
      entranceTl.fromTo(
        '.footer-nav-section',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        0.65
      );
    }, footerRoot);

    return () => ctx.revert();
  });
</script>

<!-- Footer with Integrated CTA & Navigation -->
<footer
  id="kontak"
  bind:this={footerRoot}
  aria-labelledby="footer-heading"
  use:sectionLayeredParallax={{ bgSpeed: 1.0, contentSpeed: 1.0, fgSpeed: -1.0 }}
  class="min-h-screen min-h-[100dvh] w-full relative flex flex-col justify-between items-center pt-20 pb-8 px-gutter overflow-hidden bg-surface-container-lowest text-on-surface rounded-t-[36px] sm:rounded-t-[48px] md:rounded-t-[60px] lg:rounded-t-[72px] border-t border-slate-200/90 shadow-[0_-30px_70px_-15px_rgba(0,0,0,0.15),0_-10px_30px_-5px_rgba(0,105,72,0.06)] perspective-grid z-[90]"
>
  <h2 class="sr-only" id="footer-heading">Kontak dan Footer</h2>

  <!-- Background Layer (data-depth="bg") -->
  <div data-depth="bg" class="absolute inset-0 z-0 pointer-events-none opacity-20">
    <div class="absolute top-1/4 left-1/3 w-80 h-80 glow-orb-primary rounded-full"></div>
    <div class="absolute bottom-16 right-1/4 w-80 h-80 glow-orb-primary-fixed rounded-full"></div>
  </div>

  <!-- Section Depth Stage: Scales and fades smoothly for 3D page transitions -->
  <div class="section-depth-stage w-full max-w-7xl mx-auto flex flex-col justify-between flex-grow relative z-10 gap-12">
    
    <!-- CTA Card Section -->
    <div class="footer-cta-card relative w-full rounded-[36px] overflow-hidden bg-gradient-to-br from-[#111827] via-[#162130] to-[#0d131d] text-surface border border-white/10 shadow-2xl p-8 md:p-14 lg:p-16 text-center will-change-transform">
      
      <!-- Gentle Animated Atmospheric Glow Orbs (data-depth="bg") -->
      <div data-depth="bg" class="absolute inset-0 pointer-events-none">
        <div
          use:idleFloat={{ y: 12, duration: 6 }}
          class="absolute top-6 left-1/4 w-72 h-72 glow-orb-primary rounded-full pointer-events-none"
        ></div>
        <div
          use:idleFloat={{ y: -12, duration: 7, delay: 1 }}
          class="absolute bottom-6 right-1/4 w-72 h-72 glow-orb-primary-fixed-dim rounded-full pointer-events-none"
        ></div>
      </div>

      <div class="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
        <!-- Top Tag (data-depth="foreground") -->
        <div data-depth="foreground" class="footer-kicker inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 border border-white/20 mb-8 shadow-sm select-none">
          <span class="material-symbols-outlined text-[16px] text-primary-fixed" style="font-variation-settings: 'FILL' 1;">star</span>
          <span class="font-label-sm text-label-sm uppercase tracking-widest text-white/90 font-label-bold">KONSULTASI GRATIS</span>
        </div>

        <!-- Headline & Subtitle (data-depth="content") -->
        <div data-depth="content">
          <h2
            bind:this={headlineEl}
            class="footer-headline font-display-xl-mobile md:font-display-xl text-display-xl-mobile md:text-display-xl text-white mb-6 leading-tight tracking-tight"
          >
            <span class="inline-block overflow-hidden align-top"><span class="footer-word inline-block">Sistem</span></span>
            <span class="inline-block overflow-hidden align-top"><span class="footer-word inline-block">yang</span></span>
            <span class="inline-block overflow-hidden align-top"><span class="footer-word inline-block">bikin</span></span>
            <span class="inline-block overflow-hidden align-top"><span class="footer-word inline-block">operasional</span></span>
            <span class="inline-block overflow-hidden align-top"><span class="footer-word inline-block">beres,</span></span>
            <br class="hidden md:block" />
            <span class="inline-block overflow-hidden align-top"><span class="footer-word inline-block">biar</span></span>
            <span class="inline-block overflow-hidden align-top"><span class="footer-word inline-block">kamu</span></span>
            <span class="inline-block overflow-hidden align-top"><span class="footer-word inline-block">bisa</span></span>
            <span class="inline-block overflow-hidden align-top"><span class="footer-word inline-block italic text-primary-fixed font-light">fokus</span></span>
            <span class="inline-block overflow-hidden align-top"><span class="footer-word inline-block italic text-primary-fixed font-light">analisa</span></span>
            <span class="inline-block overflow-hidden align-top"><span class="footer-word inline-block italic text-primary-fixed font-light">bisnis.</span></span>
          </h2>

          <p class="footer-desc font-body-lg text-body-lg text-white/75 mb-10 max-w-2xl mx-auto leading-relaxed">
            Ceritakan tantangan operasional bisnismu. Kami siap bantu rancang sistem yang pas — tanpa ribet, tanpa mahal.
          </p>
        </div>

        <!-- Magnetic CTA (data-depth="foreground") -->
        <div data-depth="foreground" class="footer-wa-btn">
          <a
            use:magneticButton={{ strength: 16 }}
            href="https://wa.me/6285158418944?text=Halo%20Svralabs,%20saya%20ingin%20konsultasi%20mengenai%20sistem%20digitalisasi%20bisnis."
            target="_blank"
            rel="noopener noreferrer"
            class="bg-primary text-on-primary font-label-bold text-base py-4 px-10 rounded-full transition-all duration-300 shadow-xl hover:shadow-primary/30 inline-flex items-center gap-2.5 hover:bg-primary-container cursor-pointer"
          >
            <span class="material-symbols-outlined text-[20px]">chat</span>
            Jadwalkan Konsultasi Gratis
          </a>
        </div>
      </div>
    </div>

    <!-- Navigation & Newsletter (data-depth="content") -->
    <div data-depth="content" class="footer-nav-section w-full flex flex-col lg:flex-row justify-between gap-12 lg:gap-24 mb-8">
      
      <!-- Brand Info & Newsletter -->
      <div class="flex flex-col gap-6 max-w-sm">
        <a
          aria-label="svralabs Home"
          class="flex items-center"
          href="/#hero"
          onclick={(e) => navigateOrScroll(e, 'hero')}
        >
          <img src="/logo.webp" alt="svralabs" class="h-8 w-auto object-contain" />
        </a>

        <p class="font-body-md text-sm text-text-muted leading-relaxed">
          Software house untuk bisnis yang mau tumbuh. Sistem kasir POS, rekam medis EMR, laundry, dan custom software di Pekalongan.
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
            <button
              use:magneticButton={{ strength: 8 }}
              class="flex-none rounded-full bg-on-surface px-5 py-2.5 text-sm font-semibold text-surface hover:bg-primary transition-colors duration-200 font-inter cursor-pointer"
              type="submit"
            >
              Kirim
            </button>
          </form>
        </div>
      </div>

      <!-- Navigation Columns -->
      <div class="grid grid-cols-2 sm:grid-cols-3 gap-8 md:gap-16">
        <div>
          <h3 class="font-inter text-sm font-semibold uppercase tracking-wider text-on-surface mb-4">Navigasi</h3>
          <ul class="space-y-3 font-body-md text-sm">
            <li><a class="text-text-muted hover:text-primary transition-colors" href="/#hero" onclick={(e) => navigateOrScroll(e, 'hero')}>Beranda</a></li>
            <li><a class="text-text-muted hover:text-primary transition-colors" href="/#solusi" onclick={(e) => navigateOrScroll(e, 'solusi')}>Solusi</a></li>
            <li><a class="text-text-muted hover:text-primary transition-colors" href="/#layanan" onclick={(e) => navigateOrScroll(e, 'layanan')}>Layanan</a></li>
            <li><a class="text-text-muted hover:text-primary transition-colors" href="/#portofolio" onclick={(e) => navigateOrScroll(e, 'portofolio')}>Studi Kasus</a></li>
            <li><a class="text-text-muted hover:text-primary transition-colors" href="/#harga" onclick={(e) => navigateOrScroll(e, 'harga')}>Harga &amp; Paket</a></li>
            <li><a class="text-text-muted hover:text-primary transition-colors" href="/#tentang-kami" onclick={(e) => navigateOrScroll(e, 'tentang-kami')}>Tentang Kami</a></li>
          </ul>
        </div>

        <div>
          <h3 class="font-inter text-sm font-semibold uppercase tracking-wider text-on-surface mb-4">Studi Kasus</h3>
          <ul class="space-y-3 font-body-md text-sm">
            <li><a class="text-text-muted hover:text-primary transition-colors" href="/studi-kasus/puskesmas-wonokerto">Puskesmas Wonokerto</a></li>
            <li><a class="text-text-muted hover:text-primary transition-colors" href="/studi-kasus/pos-wonopringgo">POS Wonopringgo</a></li>
          </ul>
        </div>

        <div>
          <h3 class="font-inter text-sm font-semibold uppercase tracking-wider text-on-surface mb-4">Kontak</h3>
          <ul class="space-y-3 font-body-md text-sm">
            <li><a class="text-text-muted hover:text-primary transition-colors" href="https://wa.me/6285158418944" target="_blank" rel="noopener noreferrer">WhatsApp</a></li>
            <li><a class="text-text-muted hover:text-primary transition-colors" href="mailto:svralabs@gmail.com">svralabs@gmail.com</a></li>
            <li class="text-text-muted text-xs leading-relaxed mt-2">Pekalongan, Jawa Tengah, Indonesia</li>
          </ul>
        </div>
      </div>

    </div>

    <!-- Bottom Legal Strip -->
    <div class="w-full pt-8 border-t border-border-hairline/70 flex flex-col sm:flex-row justify-between items-center text-xs text-text-muted gap-4">
      <p>&copy; {new Date().getFullYear()} Svralabs. Hak cipta dilindungi.</p>
      <div class="flex gap-6">
        <a href="#kontak" class="hover:text-on-surface transition-colors">Privasi &amp; Syarat Ketentuan</a>
      </div>
    </div>

  </div>
</footer>
