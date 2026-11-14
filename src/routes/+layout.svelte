<script lang="ts">
  import '../app.css';
  import { onMount, onDestroy } from 'svelte';
  import { afterNavigate } from '$app/navigation';
  import { page } from '$app/state';
  import Navbar from '$lib/components/Navbar.svelte';
  import { pageTransition } from '$lib/actions/motion';
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';

  let { children } = $props();

  afterNavigate(() => {
    if (typeof window === 'undefined') return;
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      ScrollTrigger.refresh();
    }, 50);
  });

  onMount(() => {
    if (typeof window === 'undefined') return;
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    gsap.registerPlugin(ScrollTrigger);
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

<div use:pageTransition class="w-full min-h-screen">
  {@render children()}
</div>

