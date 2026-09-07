import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { isReducedMotion, isTouchDevice } from '$lib/actions/gsapParallax';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export interface SectionTransitionOptions {
  isHero?: boolean;
  isFooter?: boolean;
  stageSelector?: string;
}

/**
 * Svelte Action: initBoundaryTransitions
 * – 1 ScrollTrigger timeline per section boundary
 * – Solusi→Tentang Kami: Card 3 content morphs into the tablet simulation component
 */
export function initBoundaryTransitions(container: HTMLElement) {
  if (typeof window === 'undefined' || isReducedMotion()) return;

  const isMobile   = isTouchDevice();
  const enterScale = isMobile ? 1.015 : 1.025;
  const exitScale  = isMobile ? 0.985 : 0.975;
  const yTravel    = isMobile ? 10 : 20;

  let ctx: gsap.Context | null = null;
  let timerId: ReturnType<typeof setTimeout> | null = null;

  // Defer slightly so pinned sections have registered their own ScrollTriggers first
  timerId = setTimeout(() => {
    const stages = Array.from(
      container.querySelectorAll('.section-depth-stage')
    ) as HTMLElement[];
    if (stages.length < 2) return;

    const sections = stages
      .map(st => st.closest('section, footer') as HTMLElement)
      .filter(Boolean);
    if (sections.length !== stages.length) return;

    // Natural document flow: only assign z-index where genuine layer overlay is required
    sections.forEach((sec) => {
      if (!sec.style.position) sec.style.position = 'relative';
      if (sec.id === 'fitur') sec.style.zIndex = '15';
      else if (sec.id === 'kontak') sec.style.zIndex = '25';
      else sec.style.zIndex = '1';
    });

    stages.forEach(stage => {
      stage.style.willChange      = 'transform, opacity';
      stage.style.transformOrigin = 'center center';
    });

    ctx = gsap.context(() => {
      for (let i = 0; i < sections.length - 1; i++) {
        const currentSec   = sections[i];
        const currentStage = stages[i];
        const nextSec      = sections[i + 1];
        const nextStage    = stages[i + 1];

        // ─── Specialized Continuity Morph: Solusi Kami → Tentang Kami ───
        if (currentSec.id === 'solusi' && nextSec.id === 'tentang-kami') {
          const solusiHeader = currentSec.querySelector('.solusi-header-group')  as HTMLElement | null;
          const card3Text    = currentSec.querySelector('.card3-text-group')     as HTMLElement | null;
          const card3Mockup  = currentSec.querySelector('.card3-mockup-group')   as HTMLElement | null;
          const card3        = currentSec.querySelector('.solusi-card-3')         as HTMLElement | null;
          const missionText  = nextSec.querySelector('.mission-text-wrapper')    as HTMLElement | null;
          const tabletStage  = nextSec.querySelector('.tablet-morph-stage')      as HTMLElement | null;

          // ── Hide Tentang Kami pieces so the reveal is actually felt ──
          if (tabletStage) gsap.set(tabletStage, { opacity: 0, y: isMobile ? 25 : 40, scale: isMobile ? 0.96 : 0.90 });
          if (missionText) gsap.set(missionText, { opacity: 0, y: isMobile ? 15 : 28 });

          const morphTl = gsap.timeline({
            scrollTrigger: {
              id: 'boundary-solusi-to-tentang',
              trigger: nextSec,
              start: 'top 85%',
              end: 'top 5%',
              scrub: 0.8,
              invalidateOnRefresh: true,
            }
          });

          // OUT: Solusi header flies up fast
          if (solusiHeader) {
            morphTl.to(solusiHeader, { y: isMobile ? -40 : -70, opacity: 0, ease: 'power2.in', duration: 0.35 }, 0);
          }

          // OUT: Card 3 text slides left
          if (card3Text) {
            morphTl.to(card3Text, { x: isMobile ? -30 : -55, opacity: 0, ease: 'power2.in', duration: 0.35 }, 0);
          }

          // OUT: Card 3 mockup expands + fades — morphs into the tablet
          if (card3Mockup) {
            morphTl.to(card3Mockup, { scale: 1.08, opacity: 0, ease: 'power2.in', duration: 0.35 }, 0);
          }

          // OUT: Card 3 container dissolves
          if (card3) {
            morphTl.to(card3, { scale: exitScale, y: -yTravel, autoAlpha: 0, ease: 'power2.in', duration: 0.4 }, 0);
          }

          // OUT: Whole Solusi stage recedes
          morphTl.to(currentStage, { scale: exitScale, y: isMobile ? -8 : -yTravel, opacity: 0, ease: 'power2.in', duration: 0.4 }, 0);

          // IN: Tentang Kami stage arrives with confident scale-up
          morphTl.fromTo(
            nextStage,
            { opacity: 0, scale: isMobile ? 0.97 : enterScale, y: isMobile ? 12 : yTravel },
            { opacity: 1, scale: 1, y: 0, ease: 'power2.out', duration: 0.6 },
            0.1
          );

          // IN: Tablet simulation — main morph payoff
          if (tabletStage) {
            morphTl.to(
              tabletStage,
              { scale: 1, y: 0, opacity: 1, ease: 'power2.out', duration: 0.65 },
              0.15
            );
          }

          // IN: Mission text enters right after tablet lands
          if (missionText) {
            morphTl.to(
              missionText,
              { y: 0, opacity: 1, ease: 'power2.out', duration: 0.55 },
              0.28
            );
          }

          continue;
        }

        // ─── Specialized Reverse Parallax: Tentang Kami → Fitur ───
        if (currentSec.id === 'tentang-kami' && nextSec.id === 'fitur') {
          const tabletStage   = currentSec.querySelector('.tablet-morph-stage')         as HTMLElement | null;
          const floatingCard  = currentSec.querySelector('.mission-floating-card-wrap') as HTMLElement | null;
          const missionText   = currentSec.querySelector('.mission-text-wrapper')        as HTMLElement | null;
          const bgGlow        = currentSec.querySelector('[data-depth="bg"]')            as HTMLElement | null;

          const reverseParallaxTl = gsap.timeline({
            scrollTrigger: {
              id: 'boundary-tentang-to-fitur',
              trigger: nextSec,
              start: 'top 50%',
              end: 'top top',
              scrub: 1,
              pin: currentSec,
              pinSpacing: true,
              invalidateOnRefresh: true,
            }
          });

          // OUT: Overall stage recedes
          reverseParallaxTl.to(
            currentStage,
            { y: isMobile ? 30 : 60, scale: isMobile ? 0.94 : 0.88, opacity: 0, ease: 'power1.inOut', duration: 1.0 },
            0
          );

          // OUT: Tablet chassis sinks with blur
          if (tabletStage) {
            reverseParallaxTl.to(
              tabletStage,
              {
                y: isMobile ? 80 : 180,
                rotateX: isMobile ? 3 : 7,
                scale: isMobile ? 0.90 : 0.82,
                filter: 'blur(8px)',
                opacity: 0,
                ease: 'power1.in',
                duration: 0.95
              },
              0
            );
          }

          // OUT: Floating card drifts down-left
          if (floatingCard) {
            reverseParallaxTl.to(
              floatingCard,
              {
                y: isMobile ? 100 : 220,
                x: isMobile ? -20 : -45,
                scale: 0.72,
                filter: 'blur(9px)',
                opacity: 0,
                ease: 'power1.in',
                duration: 0.9
              },
              0
            );
          }

          // OUT: Mission text counter-drifts downward
          if (missionText) {
            reverseParallaxTl.to(
              missionText,
              {
                y: isMobile ? 40 : 90,
                scale: 0.90,
                opacity: 0,
                ease: 'power1.in',
                duration: 0.85
              },
              0
            );
          }

          // OUT: Background glow drifts away
          if (bgGlow) {
            reverseParallaxTl.to(
              bgGlow,
              { y: isMobile ? 120 : 250, opacity: 0, ease: 'none', duration: 0.5 },
              0
            );
          }

          // IN: Fitur glides up — delayed so tentang-kami is mostly gone first
          reverseParallaxTl.fromTo(
            nextStage,
            { scale: isMobile ? 0.96 : 0.92, opacity: 0 },
            { scale: 1, opacity: 1, ease: 'power2.out', duration: 0.65 },
            0.35
          );

          continue;
        }

        // ─── 1. Fitur → Workflow: Seamless Tech Stream & Cinematic Dolly Zoom ───
        if (currentSec.id === 'fitur' && nextSec.id === 'workflow') {
          const fiturCards    = currentSec.querySelectorAll('.fitur-card') as NodeListOf<HTMLElement>;
          const contentLayer  = currentSec.querySelector('[data-depth="content"]') as HTMLElement | null;
          const workflowFg    = nextSec.querySelector('[data-depth="foreground"]') as HTMLElement | null;

          const apertureTl = gsap.timeline({
            scrollTrigger: {
              id: 'boundary-fitur-to-workflow',
              trigger: nextSec,
              start: 'top 85%',
              end: 'top 20%',
              scrub: 1,
              invalidateOnRefresh: true,
            }
          });

          // Header & cards exit with upward momentum
          if (contentLayer) {
            apertureTl.to(contentLayer, { y: isMobile ? -25 : -50, opacity: 0.25, ease: 'power1.in', duration: 0.6 }, 0);
          }

          // Lateral Aperture: Cards diverge slightly outward as you scroll through
          if (fiturCards.length >= 4) {
            apertureTl.to([fiturCards[0], fiturCards[1]], { x: isMobile ? -20 : -50, opacity: 0.3, filter: 'blur(3px)', ease: 'power1.in', duration: 0.7 }, 0);
            apertureTl.to([fiturCards[2], fiturCards[3]], { x: isMobile ? 20 : 50, opacity: 0.3, filter: 'blur(3px)', ease: 'power1.in', duration: 0.7 }, 0);
          }

          // Workflow zooms into view with camera dolly zoom (natural scroll, NO pin)
          if (nextStage) {
            apertureTl.fromTo(nextStage,
              { scale: isMobile ? 0.94 : 0.88, y: isMobile ? 40 : 80, opacity: 0.2 },
              { scale: 1, y: 0, opacity: 1, ease: 'power2.out', duration: 0.85 },
              0.1
            );
          }

          if (workflowFg) {
            apertureTl.fromTo(workflowFg,
              { y: isMobile ? 50 : 100, opacity: 0.3 },
              { y: 0, opacity: 1, ease: 'power2.out', duration: 0.85 },
              0.15
            );
          }

          continue;
        }

        // ─── 2. Workflow → Platform Security: Cybernetic Dual-Sided Docking Assembly ───
        if (currentSec.id === 'workflow' && nextSec.id === 'platform-security') {
          const secDoor1      = nextSec.querySelector('.security-door-1') as HTMLElement | null;
          const secDoor2      = nextSec.querySelector('.security-door-2') as HTMLElement | null;
          const secContent    = nextSec.querySelector('[data-depth="content"]') as HTMLElement | null;
          const secBgGlow     = nextSec.querySelector('[data-depth="bg"]') as HTMLElement | null;
          const workflowFg    = currentSec.querySelector('[data-depth="foreground"]') as HTMLElement | null;

          const assemblyTl = gsap.timeline({
            scrollTrigger: {
              id: 'boundary-workflow-to-security',
              trigger: nextSec,
              start: 'top 85%',
              end: 'top 20%',
              scrub: 1,
              invalidateOnRefresh: true,
            }
          });

          // Workflow simulator recedes smoothly
          if (workflowFg) {
            assemblyTl.to(workflowFg, { scale: 0.92, opacity: 0.25, filter: 'blur(4px)', ease: 'power1.in', duration: 0.6 }, 0);
          }

          // Header drops in from top with confidence
          if (secContent) {
            assemblyTl.fromTo(secContent,
              { y: -40, opacity: 0 },
              { y: 0, opacity: 1, ease: 'power2.out', duration: 0.6 },
              0.1
            );
          }

          // DUAL-SIDED DOCKING: Left card flies from left, Right card flies from right to meet in center!
          if (secDoor1) {
            assemblyTl.fromTo(secDoor1,
              { x: isMobile ? -40 : -100, rotateY: -8, opacity: 0 },
              { x: 0, rotateY: 0, opacity: 1, ease: 'power2.out', duration: 0.85 },
              0.15
            );
          }
          if (secDoor2) {
            assemblyTl.fromTo(secDoor2,
              { x: isMobile ? 40 : 100, rotateY: 8, opacity: 0 },
              { x: 0, rotateY: 0, opacity: 1, ease: 'power2.out', duration: 0.85 },
              0.15
            );
          }

          // Security Shield Aura blooms
          if (secBgGlow) {
            assemblyTl.fromTo(secBgGlow,
              { scale: 0.7, opacity: 0 },
              { scale: 1.2, opacity: 0.45, ease: 'power2.out', duration: 0.8 },
              0.1
            );
          }

          continue;
        }

        // ─── 3. Platform Security → Layanan Kami: Editorial Hairline & Service Column Cascade ───
        if (currentSec.id === 'platform-security' && nextSec.id === 'layanan') {
          const serviceCards   = nextSec.querySelectorAll('.service-card') as NodeListOf<HTMLElement>;
          const serviceContent = nextSec.querySelector('[data-depth="content"]') as HTMLElement | null;
          const secStage       = currentStage;

          const cascadeTl = gsap.timeline({
            scrollTrigger: {
              id: 'boundary-security-to-layanan',
              trigger: nextSec,
              start: 'top 85%',
              end: 'top 20%',
              scrub: 1,
              invalidateOnRefresh: true,
            }
          });

          // Security stage smoothly moves up
          if (secStage) {
            cascadeTl.to(secStage, { y: -30, opacity: 0.3, ease: 'power1.in', duration: 0.5 }, 0);
          }

          if (serviceContent) {
            cascadeTl.fromTo(serviceContent,
              { y: 40, opacity: 0 },
              { y: 0, opacity: 1, ease: 'power2.out', duration: 0.6 },
              0.1
            );
          }

          // 3 Service Columns cascade in vertically with sequential offsets
          if (serviceCards.length >= 3) {
            cascadeTl.fromTo(serviceCards[0],
              { y: isMobile ? 40 : 80, opacity: 0 },
              { y: 0, opacity: 1, ease: 'power2.out', duration: 0.7 },
              0.15
            );
            cascadeTl.fromTo(serviceCards[1],
              { y: isMobile ? 60 : 120, opacity: 0 },
              { y: 0, opacity: 1, ease: 'power2.out', duration: 0.7 },
              0.25
            );
            cascadeTl.fromTo(serviceCards[2],
              { y: isMobile ? 80 : 160, opacity: 0 },
              { y: 0, opacity: 1, ease: 'power2.out', duration: 0.7 },
              0.35
            );
          }

          continue;
        }

        // ─── 4. Layanan Kami → Harga & Paket: Tier Cascade & Recommended 3D Elevation Pop ───
        if (currentSec.id === 'layanan' && nextSec.id === 'harga') {
          const pricingCards   = nextSec.querySelectorAll('.pricing-card') as NodeListOf<HTMLElement>;
          const pricingContent = nextSec.querySelector('[data-depth="content"]') as HTMLElement | null;
          const servicesFg     = currentSec.querySelector('[data-depth="foreground"]') as HTMLElement | null;

          const tierTl = gsap.timeline({
            scrollTrigger: {
              id: 'boundary-layanan-to-harga',
              trigger: nextSec,
              start: 'top 85%',
              end: 'top 20%',
              scrub: 1,
              invalidateOnRefresh: true,
            }
          });

          if (servicesFg) {
            tierTl.to(servicesFg, { y: -40, opacity: 0.3, ease: 'power1.in', duration: 0.5 }, 0);
          }

          if (pricingContent) {
            tierTl.fromTo(pricingContent,
              { y: 35, opacity: 0 },
              { y: 0, opacity: 1, ease: 'power2.out', duration: 0.6 },
              0.1
            );
          }

          // TIER UNFOLD: Left & Right cards fold in, Center RECOMMENDED card elevates prominently!
          if (pricingCards.length >= 3) {
            tierTl.fromTo(pricingCards[0],
              { y: isMobile ? 50 : 90, rotateZ: -2.5, opacity: 0 },
              { y: 0, rotateZ: 0, opacity: 1, ease: 'power2.out', duration: 0.75 },
              0.15
            );
            tierTl.fromTo(pricingCards[2],
              { y: isMobile ? 50 : 90, rotateZ: 2.5, opacity: 0 },
              { y: 0, rotateZ: 0, opacity: 1, ease: 'power2.out', duration: 0.75 },
              0.15
            );
            // Center Recommended card lifts forward with scale pop
            tierTl.fromTo(pricingCards[1],
              { y: isMobile ? 70 : 130, scale: 0.90, opacity: 0 },
              { y: 0, scale: 1.03, opacity: 1, ease: 'back.out(1.4)', duration: 0.85 },
              0.25
            );
          }

          continue;
        }

        // ─── 5. Harga & Paket → Portofolio: Asymmetrical Split-Track Parallax Glide ───
        if (currentSec.id === 'harga' && nextSec.id === 'portofolio') {
          const hargaCards   = currentSec.querySelectorAll('.pricing-card') as NodeListOf<HTMLElement>;
          const caseCards    = nextSec.querySelectorAll('.case-card') as NodeListOf<HTMLElement>;
          const caseContent  = nextSec.querySelector('[data-depth="content"]') as HTMLElement | null;

          const splitTrackTl = gsap.timeline({
            scrollTrigger: {
              id: 'boundary-harga-to-portofolio',
              trigger: nextSec,
              start: 'top 85%',
              end: 'top 20%',
              scrub: 1,
              invalidateOnRefresh: true,
            }
          });

          // Pricing cards compress slightly
          if (hargaCards.length > 0) {
            splitTrackTl.to(hargaCards, { y: -30, opacity: 0.25, stagger: 0.05, ease: 'power1.in', duration: 0.5 }, 0);
          }

          if (caseContent) {
            splitTrackTl.fromTo(caseContent,
              { y: 35, opacity: 0 },
              { y: 0, opacity: 1, ease: 'power2.out', duration: 0.6 },
              0.1
            );
          }

          // ASYMMETRICAL SPLIT-TRACK GLIDE: Card 1 from lower-left, Card 2 from lower-right
          if (caseCards.length >= 2) {
            splitTrackTl.fromTo(caseCards[0],
              { x: isMobile ? -30 : -80, y: isMobile ? 40 : 80, opacity: 0 },
              { x: 0, y: 0, opacity: 1, ease: 'power2.out', duration: 0.8 },
              0.15
            );
            splitTrackTl.fromTo(caseCards[1],
              { x: isMobile ? 30 : 80, y: isMobile ? 60 : 120, opacity: 0 },
              { x: 0, y: 0, opacity: 1, ease: 'power2.out', duration: 0.85 },
              0.25
            );
          }

          continue;
        }

        // ─── 6. Portofolio → Blog: Card Deck Deal & Rotational Fan-In ───
        if (currentSec.id === 'portofolio' && nextSec.id === 'blog') {
          const blogCards    = nextSec.querySelectorAll('.blog-card') as NodeListOf<HTMLElement>;
          const blogContent  = nextSec.querySelector('[data-depth="content"]') as HTMLElement | null;
          const caseFg       = currentSec.querySelector('[data-depth="foreground"]') as HTMLElement | null;

          const deckTl = gsap.timeline({
            scrollTrigger: {
              id: 'boundary-portofolio-to-blog',
              trigger: nextSec,
              start: 'top 85%',
              end: 'top 20%',
              scrub: 1,
              invalidateOnRefresh: true,
            }
          });

          if (caseFg) {
            deckTl.to(caseFg, { y: -35, opacity: 0.3, ease: 'power1.in', duration: 0.5 }, 0);
          }

          if (blogContent) {
            deckTl.fromTo(blogContent,
              { y: 35, opacity: 0 },
              { y: 0, opacity: 1, ease: 'power2.out', duration: 0.6 },
              0.1
            );
          }

          // CARD DECK DEAL: Cards enter with playful magazine rotation and settle straight
          if (blogCards.length >= 3) {
            deckTl.fromTo(blogCards[0],
              { y: isMobile ? 50 : 90, rotate: -4.5, opacity: 0 },
              { y: 0, rotate: 0, opacity: 1, ease: 'power2.out', duration: 0.75 },
              0.15
            );
            deckTl.fromTo(blogCards[1],
              { y: isMobile ? 70 : 120, scale: 0.92, opacity: 0 },
              { y: 0, scale: 1, opacity: 1, ease: 'power2.out', duration: 0.8 },
              0.22
            );
            deckTl.fromTo(blogCards[2],
              { y: isMobile ? 50 : 90, rotate: 4.5, opacity: 0 },
              { y: 0, rotate: 0, opacity: 1, ease: 'power2.out', duration: 0.75 },
              0.3
            );
          }

          continue;
        }

        // ─── 7. Blog → Kontak / Footer: The Grand Dark Obsidian Finale (The ONE Drawer Rise) ───
        if (currentSec.id === 'blog' && nextSec.id === 'kontak') {
          const footerCta = nextSec.querySelector('.footer-cta-card') as HTMLElement | null;

          nextSec.style.zIndex = '30';
          currentSec.style.zIndex = '10';

          const eclipseTl = gsap.timeline({
            scrollTrigger: {
              id: 'boundary-blog-to-kontak',
              trigger: nextSec,
              start: 'top bottom',
              end: 'top top',
              scrub: 1,
              pin: currentSec,
              pinSpacing: false,
              invalidateOnRefresh: true,
            }
          });

          // Blog section recedes into optical depth blur
          if (currentStage) {
            eclipseTl.fromTo(currentStage,
              { scale: 1, y: 0, opacity: 1, filter: 'blur(0px)' },
              { scale: 0.88, y: isMobile ? 25 : 50, opacity: 0, filter: 'blur(8px)', ease: 'power1.in', duration: 0.85 },
              0
            );
          }

          // Dark luxury CTA card glides up with expanding emerald bloom
          if (footerCta) {
            eclipseTl.fromTo(footerCta,
              {
                y: isMobile ? 60 : 120,
                scale: 0.92,
                filter: 'drop-shadow(0 -5px 15px rgba(0,105,72,0.1))',
              },
              {
                y: 0,
                scale: 1,
                filter: 'drop-shadow(0 -20px 45px rgba(0,105,72,0.45))',
                ease: 'power2.out',
                duration: 0.95,
              },
              0.1
            );
          }

          if (nextStage) {
            eclipseTl.fromTo(nextStage,
              { opacity: 0.3 },
              { opacity: 1, ease: 'power2.out', duration: 0.85 },
              0.15
            );
          }

          continue;
        }

        // ─── Generic boundary transition (Zero Snap, Smooth Fluid Scrub) ───
        const tl = gsap.timeline({
          scrollTrigger: {
            id: `boundary-${nextSec.id || i + 1}`,
            trigger: nextSec,
            start: 'top bottom',
            end: 'top top',
            scrub: 1,
            invalidateOnRefresh: true,
          }
        });

        tl.to(currentStage,  { scale: exitScale,  y: -yTravel, opacity: 0.85, ease: 'power1.out' }, 0);
        tl.fromTo(nextStage,
          { scale: enterScale, y: yTravel,  opacity: 0.85 },
          { scale: 1,          y: 0,        opacity: 1,    ease: 'power1.out' },
          0
        );
      }

      ScrollTrigger.refresh();
    }, container);
  }, 50);

  return {
    destroy() {
      if (timerId !== null) clearTimeout(timerId);
      ctx?.revert();
    }
  };
}

/**
 * Backward-compatible stub — boundary transitions are orchestrated by initBoundaryTransitions.
 */
export function sectionTransition(_node: HTMLElement, _options: SectionTransitionOptions = {}) {
  return { destroy() {} };
}
