<script lang="ts">
  import Navbar from '$lib/components/Navbar.svelte';
  import HeroSection from '$lib/components/HeroSection.svelte';
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
  <title>Svralabs - Digitalisasi UMKM</title>
</svelte:head>

<div class="bg-surface text-on-surface antialiased min-h-screen font-body-md selection:bg-primary-container selection:text-on-primary-container">
  <Navbar />
  <main>
    <HeroSection />
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
