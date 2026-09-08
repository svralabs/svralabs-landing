<script lang="ts">
  import '../app.css';
  import { onMount, onDestroy } from 'svelte';
  import { afterNavigate } from '$app/navigation';
  import { page } from '$app/state';
  import Navbar from '$lib/components/Navbar.svelte';
  import { pageTransition } from '$lib/actions/motion';
  import { isReducedMotion, isTouchDevice } from '$lib/actions/gsapParallax';
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  import { ScrollSmoother } from 'gsap/ScrollSmoother';

  let { children } = $props();
  let smoother: ScrollSmoother | null = null;
  let ctx: gsap.Context | null = null;

  afterNavigate(() => {
    if (typeof window === 'undefined') return;
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    if (smoother) {
      smoother.scrollTo(0, false);
      smoother.scrollTop(0);
    }
    setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      if (smoother) {
        smoother.scrollTo(0, false);
      }
      ScrollTrigger.refresh();
    }, 50);
  });

  onMount(() => {
    if (typeof window === 'undefined') return;
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
    (window as any).ScrollTrigger = ScrollTrigger;
    (window as any).ScrollSmoother = ScrollSmoother;
    (window as any).gsap = gsap;

    ctx = gsap.context(() => {
      // Enable ScrollSmoother on desktop devices for buttery smooth momentum
      if (!isReducedMotion() && !isTouchDevice()) {
        try {
          smoother = ScrollSmoother.create({
            wrapper: '#smooth-wrapper',
            content: '#smooth-content',
            smooth: 1.15,
            effects: true,
            normalizeScroll: false,
          });
        } catch (err) {
          console.warn('ScrollSmoother fallback to native scrolling:', err);
        }
      }
    });

    return () => {
      ctx?.revert();
      if (smoother) {
        smoother.kill();
        smoother = null;
      }
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  });

  onDestroy(() => {
    ctx?.revert();
    if (smoother) {
      smoother.kill();
      smoother = null;
    }
    ScrollTrigger.getAll().forEach((t) => t.kill());
  });
</script>

<svelte:head>
  <link rel="icon" type="image/png" href="/logowotext.webp" />
  <link rel="apple-touch-icon" href="/logowotext.webp" />
</svelte:head>

<!-- Global Navbar for Home Page placed outside transformed ScrollSmoother container -->
{#if page.url.pathname === '/'}
  <Navbar />
{/if}

<div id="smooth-wrapper" class="w-full min-h-screen">
  <div id="smooth-content" class="w-full">
    <div use:pageTransition class="w-full min-h-screen">
      {@render children()}
    </div>
  </div>
</div>

