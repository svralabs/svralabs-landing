<script lang="ts">
  import HeroSection from '$lib/components/HeroSection.svelte';
  import TrustBrandSection from '$lib/components/TrustBrandSection.svelte';
  import SolutionCategorySection from '$lib/components/SolutionCategorySection.svelte';
  import MissionSection from '$lib/components/MissionSection.svelte';
  import FeaturesSection from '$lib/components/FeaturesSection.svelte';
  import PlatformWorkflowSection from '$lib/components/PlatformWorkflowSection.svelte';
  import PlatformSecuritySection from '$lib/components/PlatformSecuritySection.svelte';
  import CoreServicesSection from '$lib/components/CoreServicesSection.svelte';
  import PricingSection from '$lib/components/PricingSection.svelte';
  import TestimonialSection from '$lib/components/TestimonialSection.svelte';
  import BlogSection from '$lib/components/BlogSection.svelte';
  import Footer from '$lib/components/Footer.svelte';
</script>

<svelte:head>
  <title>Svralabs — Software House &amp; Sistem Bisnis Digital | Pekalongan</title>
  <meta name="description" content="Svralabs adalah software house di Pekalongan spesialis sistem operasional bisnis: Sistem Kasir POS, Rekam Medis EMR Faskes, Manajemen Stok Gudang, dan Custom Software Development." />
  <meta property="og:title" content="Svralabs — Software House &amp; Sistem Bisnis Digital" />
  <meta property="og:description" content="Digitalisasi usaha gak perlu mahal dan ribet. Sistem siap pakai dan custom development teruji untuk bisnis lokal hingga enterprise." />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://www.svralabs.com/" />
  <meta property="og:image" content="https://www.svralabs.com/logo.png" />
  <link rel="canonical" href="https://www.svralabs.com/" />
  {@html `<script type="application/ld+json">${JSON.stringify({
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Svralabs",
    "description": "Software house di Pekalongan spesialis sistem kasir POS, rekam medis EMR faskes, manajemen stok gudang, dan custom software.",
    "url": "https://www.svralabs.com",
    "telephone": "+6285158418944",
    "email": "svralabs@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Pekalongan",
      "addressRegion": "Jawa Tengah",
      "addressCountry": "ID"
    },
    "sameAs": []
  })}<\/script>`}
</svelte:head>

<div class="bg-surface text-on-surface antialiased min-h-screen font-body-md selection:bg-primary-container selection:text-on-primary-container">
  <main>
    <HeroSection />
    <TrustBrandSection />
    <SolutionCategorySection />
    <MissionSection />
    <FeaturesSection />
    <PlatformWorkflowSection />
    <PlatformSecuritySection />
    <CoreServicesSection />
    <PricingSection />
    <TestimonialSection />
    <BlogSection />
  </main>
  <Footer />
</div>
