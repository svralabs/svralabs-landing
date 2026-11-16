<script lang="ts">
  import '../app.css';
  import { onMount, onDestroy } from 'svelte';
  import { beforeNavigate, afterNavigate } from '$app/navigation';
  import { page } from '$app/state';
  import Navbar from '$lib/components/Navbar.svelte';
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';

  let { children } = $props();

  beforeNavigate(() => {
    if (typeof window === 'undefined') return;
    try {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    } catch (_) {}
  });

  afterNavigate(() => {
    if (typeof window === 'undefined') return;
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    setTimeout(() => {
      try {
        ScrollTrigger.refresh();
      } catch (_) {}
    }, 60);
  });

  onMount(() => {
    if (typeof window === 'undefined') return;
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    gsap.registerPlugin(ScrollTrigger);
    try {
      ScrollTrigger.clearScrollMemory('manual');
    } catch (_) {}
    (window as any).ScrollTrigger = ScrollTrigger;
    (window as any).gsap = gsap;

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  });

  onDestroy(() => {
    ScrollTrigger.getAll().forEach((t) => t.kill());
  });
</script>

<svelte:head>
  <link rel="icon" type="image/png" href="/logowotext.webp" />
  <link rel="apple-touch-icon" href="/logowotext.webp" />
</svelte:head>

<!-- Global Navbar for Home Page -->
{#if page.url.pathname === '/'}
  <Navbar />
{/if}

<div class="w-full min-h-screen">
  {@render children()}
</div>

<!-- Floating WhatsApp Quick Consultation Button (Conversion Anchor) -->
<aside aria-label="Kontak Cepat WhatsApp" class="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 pointer-events-auto">
  <a
    href="https://wa.me/6285158418944?text=Halo%20Svralabs%2C%20saya%20ingin%20konsultasi%20mengenai%20sistem%20operasional%20bisnis"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Konsultasi WA Svralabs"
    class="group flex items-center gap-2 bg-[#075E54] hover:bg-[#128C7E] text-white px-3.5 py-2.5 sm:px-4.5 sm:py-3 rounded-full shadow-[0_10px_25px_-5px_rgba(7,94,84,0.5)] hover:shadow-[0_15px_30px_-5px_rgba(7,94,84,0.65)] hover:scale-105 active:scale-95 transition-all duration-300 font-label-bold text-xs sm:text-sm cursor-pointer border border-white/20"
  >
    <span class="relative flex h-2 w-2">
      <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
      <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
    </span>
    <svg class="w-4 h-4 sm:w-4.5 sm:h-4.5 fill-white shrink-0" viewBox="0 0 24 24">
      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.699c.96.541 1.961.828 3.003.828 3.18 0 5.767-2.587 5.768-5.767 0-3.18-2.587-5.768-5.768-5.768zm3.364 8.163c-.144.405-.837.774-1.17.824-.312.045-.634.074-1.849-.427-1.442-.596-2.368-2.072-2.439-2.167-.072-.095-.579-.771-.579-1.47 0-.699.366-1.042.497-1.185.131-.143.286-.179.382-.179.095 0 .191.002.274.006.088.004.205-.034.32.245.119.29.407.994.443 1.066.036.072.06.155.012.25-.048.096-.072.155-.144.239-.071.083-.151.186-.216.25-.072.072-.147.15-.063.294.084.144.373.615.8 1 .552.496 1.016.65 1.16.721.144.072.227.06.31-.036.084-.096.358-.417.454-.56.096-.144.191-.12.323-.072.131.048.835.394.979.465.144.072.239.108.274.168.036.06.036.347-.108.752zM12 2C6.477 2 2 6.477 2 12c0 1.891.524 3.66 1.434 5.176L2 22l4.981-1.306C8.441 21.536 10.16 22 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2z"/>
    </svg>
    <span class="tracking-wide">Konsultasi WA</span>
  </a>
</aside>

