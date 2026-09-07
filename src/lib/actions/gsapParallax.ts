import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function isReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function isTouchDevice(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
}

export interface ScrollParallaxOptions {
  /** Speed factor: negative values move up faster than scroll (closer foreground) */
  speed?: number;
  /** Direct Y travel in pixels or percent, e.g. -120 or "-20%" */
  y?: number | string;
  /** Direct X travel in pixels */
  x?: number | string;
  /** Scrub smoothing in seconds, default 1.0 */
  scrub?: boolean | number;
  /** ScrollTrigger start position, default "top bottom" */
  start?: string;
  /** ScrollTrigger end position, default "bottom top" */
  end?: string;
  /** Optional rotation in degrees during scroll */
  rotate?: number;
  /** Optional scale change */
  scale?: number;
  /** Trigger element selector or node, defaults to the element itself */
  trigger?: HTMLElement | string;
  /** Whether to disable on mobile touch devices */
  disableOnMobile?: boolean;
}

/**
 * Svelte Action: scrollParallax
 * Smoothly scrubs transform properties based on scroll position using GSAP ScrollTrigger.
 */
export function scrollParallax(node: HTMLElement, options: ScrollParallaxOptions = {}) {
  if (typeof window === 'undefined' || isReducedMotion()) return;
  if (options.disableOnMobile && isTouchDevice()) return;

  const speed = options.speed ?? -0.25;
  const scrub = options.scrub ?? 1.0;
  const start = options.start ?? 'top bottom';
  const end = options.end ?? 'bottom top';
  const trigger = options.trigger ?? node;

  const travelY = options.y !== undefined
    ? (typeof options.y === 'number' ? options.y : parseFloat(options.y))
    : (speed * 300);

  node.style.willChange = 'transform';

  const ctx = gsap.context(() => {
    if (start === 'top top') {
      const vars: gsap.TweenVars = {
        y: travelY,
        ease: 'none',
        scrollTrigger: {
          trigger,
          start,
          end,
          scrub,
          invalidateOnRefresh: true,
        }
      };
      if (options.x !== undefined) vars.x = options.x;
      if (options.rotate !== undefined) vars.rotate = options.rotate;
      if (options.scale !== undefined) vars.scale = options.scale;

      gsap.to(node, vars);
    } else {
      const startY = -travelY * 0.5;
      const endY = travelY * 0.5;

      const vars: gsap.TweenVars = {
        y: endY,
        ease: 'none',
        scrollTrigger: {
          trigger,
          start,
          end,
          scrub,
          invalidateOnRefresh: true,
        }
      };
      if (options.x !== undefined) vars.x = options.x;
      if (options.rotate !== undefined) vars.rotate = options.rotate;
      if (options.scale !== undefined) vars.scale = options.scale;

      gsap.fromTo(node, { y: startY }, vars);
    }
  }, node);

  return {
    update(newOptions: ScrollParallaxOptions) {
      ctx.revert();
      scrollParallax(node, newOptions);
    },
    destroy() {
      ctx.revert();
    }
  };
}

export interface MouseParallaxOptions {
  /** Maximum pixel travel on X axis, default 20 */
  strengthX?: number;
  /** Maximum pixel travel on Y axis, default 15 */
  strengthY?: number;
  /** Invert movement direction */
  inverted?: boolean;
}

/**
 * Svelte Action: mouseParallax
 * Tracks pointer movement across the viewport with fluid spring interpolation.
 */
export function mouseParallax(node: HTMLElement, options: MouseParallaxOptions = {}) {
  if (typeof window === 'undefined' || isReducedMotion() || isTouchDevice()) return;

  const strengthX = options.strengthX ?? 20;
  const strengthY = options.strengthY ?? 15;
  const mult = options.inverted ? -1 : 1;

  node.style.willChange = 'transform';

  const setX = gsap.quickTo(node, 'x', { duration: 0.8, ease: 'power2.out' });
  const setY = gsap.quickTo(node, 'y', { duration: 0.8, ease: 'power2.out' });

  const handleMouseMove = (e: MouseEvent) => {
    const normX = (e.clientX / window.innerWidth) * 2 - 1;
    const normY = (e.clientY / window.innerHeight) * 2 - 1;
    setX(normX * strengthX * mult);
    setY(normY * strengthY * mult);
  };

  window.addEventListener('mousemove', handleMouseMove, { passive: true });

  return {
    destroy() {
      window.removeEventListener('mousemove', handleMouseMove);
    }
  };
}

export interface Tilt3DOptions {
  /** Max degrees of rotation, default 10 */
  maxTilt?: number;
  /** Perspective distance in px, default 1000 */
  perspective?: number;
  /** Scale card up slightly on hover, default 1.02 */
  scale?: number;
  /** Enable dynamic specular light glare, default true */
  glare?: boolean;
  /** Extra trigger buffer padding in px around element (prevents edge glitching), default 40 */
  triggerPadding?: number;
}

/**
 * Svelte Action: tilt3D
 * Realistic 3D card tilt tracking cursor over the card with generous trigger padding,
 * auto-reset, and optional specular glare to prevent edge jitter/glitching.
 */
export function tilt3D(node: HTMLElement, options: Tilt3DOptions = {}) {
  if (typeof window === 'undefined' || isReducedMotion() || isTouchDevice()) return;

  const maxTilt = options.maxTilt ?? 10;
  const perspective = options.perspective ?? 1000;
  const scaleHover = options.scale ?? 1.02;
  const withGlare = options.glare ?? true;
  const padding = options.triggerPadding ?? 40;

  node.style.transformStyle = 'preserve-3d';
  node.style.perspective = `${perspective}px`;
  node.style.willChange = 'transform';

  let glareEl: HTMLElement | null = null;
  if (withGlare) {
    glareEl = document.createElement('div');
    glareEl.className = 'tilt-glare-overlay pointer-events-none absolute inset-0 rounded-[inherit] overflow-hidden opacity-0 transition-opacity duration-300';
    glareEl.style.background = 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 80%)';
    glareEl.style.zIndex = '5';
    const currentPos = window.getComputedStyle(node).position;
    if (currentPos === 'static') {
      node.style.position = 'relative';
    }
    node.appendChild(glareEl);
  }

  gsap.set(node, { rotateX: 0, rotateY: 0, scale: 1 });

  let isHovered = false;

  const handleMouseMove = (e: MouseEvent) => {
    const rect = node.getBoundingClientRect();
    const extendedLeft = rect.left - padding;
    const extendedRight = rect.right + padding;
    const extendedTop = rect.top - padding;
    const extendedBottom = rect.bottom + padding;

    const insideTrigger = (
      e.clientX >= extendedLeft &&
      e.clientX <= extendedRight &&
      e.clientY >= extendedTop &&
      e.clientY <= extendedBottom
    );

    if (insideTrigger) {
      isHovered = true;
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const maxDistX = (rect.width / 2) + padding;
      const maxDistY = (rect.height / 2) + padding;

      const normX = Math.max(-1, Math.min(1, (e.clientX - centerX) / maxDistX));
      const normY = Math.max(-1, Math.min(1, (e.clientY - centerY) / maxDistY));

      const rotX = -normY * maxTilt;
      const rotY = normX * maxTilt;

      gsap.to(node, {
        rotateX: rotX,
        rotateY: rotY,
        scale: scaleHover,
        duration: 0.35,
        ease: 'power2.out',
        overwrite: 'auto'
      });

      if (glareEl) {
        const localX = e.clientX - rect.left;
        const localY = e.clientY - rect.top;
        glareEl.style.opacity = '0.4';
        glareEl.style.background = `radial-gradient(circle at ${(localX / rect.width) * 100}% ${(localY / rect.height) * 100}%, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 70%)`;
      }
    } else if (isHovered) {
      isHovered = false;
      gsap.to(node, {
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        duration: 0.6,
        ease: 'power2.out',
        overwrite: 'auto'
      });
      if (glareEl) {
        glareEl.style.opacity = '0';
      }
    }
  };

  window.addEventListener('mousemove', handleMouseMove, { passive: true });

  return {
    destroy() {
      window.removeEventListener('mousemove', handleMouseMove);
      glareEl?.remove();
    }
  };
}

export interface MagneticOptions {
  /** Maximum pull distance in pixels, default 14 */
  strength?: number;
}

/**
 * Svelte Action: magneticButton
 * Soft magnetic attraction towards pointer when hovering buttons or controls.
 */
export function magneticButton(node: HTMLElement, options: MagneticOptions = {}) {
  if (typeof window === 'undefined' || isReducedMotion() || isTouchDevice()) return;

  const strength = options.strength ?? 14;
  node.style.willChange = 'transform';

  const setX = gsap.quickTo(node, 'x', { duration: 0.35, ease: 'power2.out' });
  const setY = gsap.quickTo(node, 'y', { duration: 0.35, ease: 'power2.out' });

  const onMouseMove = (e: MouseEvent) => {
    const rect = node.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distX = e.clientX - centerX;
    const distY = e.clientY - centerY;

    setX(distX * (strength / (rect.width / 2)));
    setY(distY * (strength / (rect.height / 2)));
  };

  const onMouseLeave = () => {
    gsap.to(node, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.4)' });
  };

  node.addEventListener('mousemove', onMouseMove, { passive: true });
  node.addEventListener('mouseleave', onMouseLeave, { passive: true });

  return {
    destroy() {
      node.removeEventListener('mousemove', onMouseMove);
      node.removeEventListener('mouseleave', onMouseLeave);
    }
  };
}

/**
 * Svelte Action: idleFloat
 * Continuous organic breathing / bobbing animation for floating cards and badges.
 */
export function idleFloat(node: HTMLElement, options: { y?: number; duration?: number; delay?: number } = {}) {
  if (typeof window === 'undefined' || isReducedMotion()) return;

  const yDist = options.y ?? 10;
  const duration = options.duration ?? 3.5;
  const delay = options.delay ?? 0;

  node.style.willChange = 'transform';

  const tween = gsap.to(node, {
    y: `+=${yDist}`,
    duration,
    delay,
    ease: 'sine.inOut',
    yoyo: true,
    repeat: -1
  });

  return {
    destroy() {
      tween.kill();
    }
  };
}

export interface SectionLayeredParallaxOptions {
  /** Speed multiplier for data-depth="bg", default ~1.0 (~200px travel) */
  bgSpeed?: number;
  /** Speed multiplier for data-depth="content", default ~1.0 (~60px travel) */
  contentSpeed?: number;
  /** Speed multiplier for data-depth="foreground", default ~-1.0 (~-140px travel) */
  fgSpeed?: number;
  /** Scrub smoothing in seconds, default true (1:1 locked) */
  scrub?: boolean | number;
}

/**
 * Svelte Action: sectionLayeredParallax
 * Orchestrates amplified multi-depth 3D parallax on the whole section:
 * - [data-depth="bg"]: moves slower (~180-240px travel), subtle scale (1.0 -> 1.08), translateZ(-80px)
 * - [data-depth="content"]: anchors the narrative (~50-80px travel), translateZ(0px)
 * - [data-depth="foreground"]: responsive forward motion (~ -100 to -160px travel), subtle rotation (-1.2° -> 1.2°), translateZ(60px)
 * - Native 3D browser projection with perspective: 1200px and transform-style: preserve-3d
 * - Proportional mobile damping (~45%) for smooth, safe performance on touch devices
 */
export function sectionLayeredParallax(node: HTMLElement, options: SectionLayeredParallaxOptions = {}) {
  if (typeof window === 'undefined' || isReducedMotion()) return;

  const isTouch = isTouchDevice();
  const mobileDamp = isTouch ? 0.45 : 1.0;

  // Support both fractional legacy speeds (e.g. 0.18) and unit multipliers (e.g. 1.0)
  const bgMult = options.bgSpeed !== undefined
    ? (options.bgSpeed < 0.5 ? options.bgSpeed * 5.5 : options.bgSpeed)
    : 1.0;
  const contentMult = options.contentSpeed !== undefined
    ? (options.contentSpeed < 0.2 ? options.contentSpeed * 15 : options.contentSpeed)
    : 1.0;
  const fgMult = options.fgSpeed !== undefined
    ? (Math.abs(options.fgSpeed) < 0.5 ? options.fgSpeed * 5.5 : options.fgSpeed)
    : -1.0;

  const travelBg = bgMult * 200 * mobileDamp;
  const travelContent = contentMult * 65 * mobileDamp;
  const travelFg = fgMult * 140 * mobileDamp;
  const scrub = options.scrub ?? true;

  const isTopSection = node.id === 'hero' || node.offsetTop < 100;
  const startPos = isTopSection ? 'top top' : 'top bottom';
  const endPos = 'bottom top';

  const bgLayers = node.querySelectorAll('[data-depth="bg"]') as NodeListOf<HTMLElement>;
  const contentLayers = node.querySelectorAll('[data-depth="content"]') as NodeListOf<HTMLElement>;
  const fgLayers = node.querySelectorAll('[data-depth="foreground"]') as NodeListOf<HTMLElement>;

  const ctx = gsap.context(() => {
    // 1 unified timeline per section for all depth layers = 1 ScrollTrigger instead of 3
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: node,
        start: startPos,
        end: endPos,
        scrub,
        invalidateOnRefresh: true,
      }
    });

    if (isTopSection) {
      // Top/Hero Section: Continuous Horizon Flow starting at scroll 0
      // 1. Background sky drifts gently downwards (+travelBg)
      if (bgLayers.length > 0) {
        tl.fromTo(
          bgLayers,
          { y: 0, scale: 1.0 },
          {
            y: travelBg * 0.6,
            scale: isTouch ? 1.02 : 1.05,
            ease: 'none',
          },
          0
        );
      }

      // 2. Content typography rises gently
      if (contentLayers.length > 0) {
        tl.fromTo(
          contentLayers,
          { y: 0 },
          {
            y: -travelContent * 0.5,
            ease: 'none',
          },
          0
        );
      }

      // 3. Foreground 3D Dashboard carries subtle weighted inertia
      if (fgLayers.length > 0) {
        const isReverse = fgMult < 0;
        tl.fromTo(
          fgLayers,
          {
            y: 0,
            rotateX: 0,
            scale: 1.0,
          },
          {
            y: travelFg * 0.6,
            rotateX: isReverse && !isTouch ? -1.8 : 0,
            scale: isReverse && !isTouch ? 1.015 : 1.0,
            ease: 'none',
          },
          0
        );
      }
    } else {
      // Middle & Lower sections: Enter from bottom, exit through top
      // 1. Background atmospheric parallax
      if (bgLayers.length > 0) {
        tl.fromTo(
          bgLayers,
          { y: -travelBg * 0.5, scale: 1.0 },
          {
            y: travelBg * 0.5,
            scale: isTouch ? 1.03 : 1.06,
            ease: 'none',
          },
          0
        );
      }

      // 2. Content layer parallax
      if (contentLayers.length > 0) {
        tl.fromTo(
          contentLayers,
          { y: -travelContent * 0.5 },
          {
            y: travelContent * 0.5,
            ease: 'none',
          },
          0
        );
      }

      // 3. Foreground layer parallax
      if (fgLayers.length > 0) {
        const isReverse = fgMult < 0;
        tl.fromTo(
          fgLayers,
          {
            y: -travelFg * 0.5,
            rotateX: isReverse && !isTouch ? 1.5 : 0,
            scale: isReverse && !isTouch ? 0.985 : 1.0,
          },
          {
            y: travelFg * 0.5,
            rotateX: isReverse && !isTouch ? -2.5 : 0,
            scale: isReverse && !isTouch ? 1.018 : 1.0,
            ease: 'none',
          },
          0
        );
      }
    }
  }, node);

  return {
    destroy() {
      ctx.revert();
    }
  };
}

export interface StageTiltOptions {
  /** Maximum tilt degrees, default 1.8 */
  maxTilt?: number;
}

/**
 * Svelte Action: stageTilt3D
 * Subtle 3D tilt on a whole section stage following pointer coordinates (max 1.5° - 2°).
 */
export function stageTilt3D(node: HTMLElement, options: StageTiltOptions = {}) {
  if (typeof window === 'undefined' || isReducedMotion() || isTouchDevice()) return;

  const maxTilt = options.maxTilt ?? 1.8;
  node.style.willChange = 'transform';
  node.style.transformStyle = 'preserve-3d';

  gsap.set(node, { rotateX: 0, rotateY: 0 });

  const handleMouseMove = (e: MouseEvent) => {
    const rect = node.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const normX = (e.clientX - centerX) / (window.innerWidth / 2);
    const normY = (e.clientY - centerY) / (window.innerHeight / 2);

    gsap.to(node, {
      rotateX: -normY * maxTilt,
      rotateY: normX * maxTilt,
      duration: 0.35,
      ease: 'power2.out',
      overwrite: 'auto'
    });
  };

  const handleMouseLeave = () => {
    gsap.to(node, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: 'power2.out',
      overwrite: 'auto'
    });
  };

  window.addEventListener('mousemove', handleMouseMove, { passive: true });
  window.addEventListener('mouseleave', handleMouseLeave);

  return {
    destroy() {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    }
  };
}


