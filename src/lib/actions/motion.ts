import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export interface MotionOptions {
  duration?: number;
  delay?: number;
  easing?: string;
  amount?: number | 'some' | 'all';
}

const DEFAULT_EASE = 'power2.out';
const DEFAULT_DURATION = 0.55;

export function isReducedMotion() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function fadeUp(node: HTMLElement, options: MotionOptions = {}) {
  if (typeof window === 'undefined') return { destroy() {} };
  const reduced = isReducedMotion();
  const isDepthLayer = node.hasAttribute('data-depth');

  if (reduced) {
    node.style.opacity = '1';
    return { destroy() {} };
  }

  const ctx = gsap.context(() => {
    gsap.fromTo(
      node,
      {
        opacity: 0,
        y: isDepthLayer ? 0 : 25,
      },
      {
        opacity: 1,
        y: 0,
        duration: options.duration ?? DEFAULT_DURATION,
        delay: options.delay ?? 0,
        ease: options.easing ?? DEFAULT_EASE,
        scrollTrigger: {
          trigger: node,
          start: 'top 90%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, node);

  return {
    destroy() {
      ctx.revert();
    },
  };
}

export function fadeIn(node: HTMLElement, options: MotionOptions = {}) {
  if (typeof window === 'undefined') return { destroy() {} };
  if (isReducedMotion()) {
    node.style.opacity = '1';
    return { destroy() {} };
  }

  const ctx = gsap.context(() => {
    gsap.fromTo(
      node,
      { opacity: 0 },
      {
        opacity: 1,
        duration: options.duration ?? DEFAULT_DURATION,
        delay: options.delay ?? 0,
        ease: options.easing ?? DEFAULT_EASE,
        scrollTrigger: {
          trigger: node,
          start: 'top 90%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, node);

  return {
    destroy() {
      ctx.revert();
    },
  };
}

export function fadeDown(node: HTMLElement, options: MotionOptions = {}) {
  if (typeof window === 'undefined') return { destroy() {} };
  if (isReducedMotion()) {
    node.style.opacity = '1';
    return { destroy() {} };
  }

  const ctx = gsap.context(() => {
    gsap.fromTo(
      node,
      { opacity: 0, y: -20 },
      {
        opacity: 1,
        y: 0,
        duration: options.duration ?? DEFAULT_DURATION,
        delay: options.delay ?? 0,
        ease: options.easing ?? DEFAULT_EASE,
        scrollTrigger: {
          trigger: node,
          start: 'top 90%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, node);

  return {
    destroy() {
      ctx.revert();
    },
  };
}

export function scaleIn(node: HTMLElement, options: MotionOptions = {}) {
  if (typeof window === 'undefined') return { destroy() {} };
  if (isReducedMotion()) {
    node.style.opacity = '1';
    return { destroy() {} };
  }

  const ctx = gsap.context(() => {
    gsap.fromTo(
      node,
      { opacity: 0, scale: 0.95 },
      {
        opacity: 1,
        scale: 1,
        duration: options.duration ?? 0.6,
        delay: options.delay ?? 0,
        ease: options.easing ?? DEFAULT_EASE,
        scrollTrigger: {
          trigger: node,
          start: 'top 90%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, node);

  return {
    destroy() {
      ctx.revert();
    },
  };
}

export function slideFromLeft(node: HTMLElement, options: MotionOptions = {}) {
  if (typeof window === 'undefined') return { destroy() {} };
  if (isReducedMotion()) {
    node.style.opacity = '1';
    return { destroy() {} };
  }

  const ctx = gsap.context(() => {
    gsap.fromTo(
      node,
      { opacity: 0, x: -25 },
      {
        opacity: 1,
        x: 0,
        duration: options.duration ?? DEFAULT_DURATION,
        delay: options.delay ?? 0,
        ease: options.easing ?? DEFAULT_EASE,
        scrollTrigger: {
          trigger: node,
          start: 'top 90%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, node);

  return {
    destroy() {
      ctx.revert();
    },
  };
}

export function slideFromRight(node: HTMLElement, options: MotionOptions = {}) {
  if (typeof window === 'undefined') return { destroy() {} };
  if (isReducedMotion()) {
    node.style.opacity = '1';
    return { destroy() {} };
  }

  const ctx = gsap.context(() => {
    gsap.fromTo(
      node,
      { opacity: 0, x: 25 },
      {
        opacity: 1,
        x: 0,
        duration: options.duration ?? DEFAULT_DURATION,
        delay: options.delay ?? 0,
        ease: options.easing ?? DEFAULT_EASE,
        scrollTrigger: {
          trigger: node,
          start: 'top 90%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, node);

  return {
    destroy() {
      ctx.revert();
    },
  };
}

export function staggerFadeUp(
  node: HTMLElement,
  options: { selector?: string; staggerDelay?: number } & MotionOptions = {}
) {
  if (typeof window === 'undefined') return { destroy() {} };
  const selector = options.selector ?? ':scope > *';
  const elements = Array.from(node.querySelectorAll(selector)) as HTMLElement[];
  if (elements.length === 0) return { destroy() {} };

  if (isReducedMotion()) {
    elements.forEach((el) => {
      el.style.opacity = '1';
    });
    return { destroy() {} };
  }

  const ctx = gsap.context(() => {
    gsap.fromTo(
      elements,
      { opacity: 0, y: 25 },
      {
        opacity: 1,
        y: 0,
        duration: options.duration ?? DEFAULT_DURATION,
        delay: options.delay ?? 0,
        stagger: options.staggerDelay ?? 0.08,
        ease: options.easing ?? DEFAULT_EASE,
        scrollTrigger: {
          trigger: node,
          start: 'top 88%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, node);

  return {
    destroy() {
      ctx.revert();
    },
  };
}

export function staggerScaleIn(
  node: HTMLElement,
  options: { selector?: string; staggerDelay?: number } & MotionOptions = {}
) {
  if (typeof window === 'undefined') return { destroy() {} };
  const selector = options.selector ?? ':scope > *';
  const elements = Array.from(node.querySelectorAll(selector)) as HTMLElement[];
  if (elements.length === 0) return { destroy() {} };

  if (isReducedMotion()) {
    elements.forEach((el) => {
      el.style.opacity = '1';
    });
    return { destroy() {} };
  }

  const ctx = gsap.context(() => {
    gsap.fromTo(
      elements,
      { opacity: 0, scale: 0.95 },
      {
        opacity: 1,
        scale: 1,
        duration: options.duration ?? 0.6,
        delay: options.delay ?? 0,
        stagger: options.staggerDelay ?? 0.08,
        ease: options.easing ?? DEFAULT_EASE,
        scrollTrigger: {
          trigger: node,
          start: 'top 88%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, node);

  return {
    destroy() {
      ctx.revert();
    },
  };
}

export function countUp(node: HTMLElement, options: { from?: number; to: number; duration?: number }) {
  if (typeof window === 'undefined') return { destroy() {} };
  const from = options.from ?? 0;
  node.textContent = String(from);

  if (isReducedMotion()) {
    node.textContent = String(options.to);
    return { destroy() {} };
  }

  const obj = { val: from };
  const ctx = gsap.context(() => {
    gsap.to(obj, {
      val: options.to,
      duration: options.duration ?? 1.4,
      ease: 'power1.out',
      scrollTrigger: {
        trigger: node,
        start: 'top 90%',
        toggleActions: 'play none none reverse',
      },
      onUpdate: () => {
        node.textContent = Math.round(obj.val).toLocaleString('id-ID');
      },
    });
  }, node);

  return {
    destroy() {
      ctx.revert();
    },
  };
}

export function hoverSpring(node: HTMLElement) {
  if (typeof window === 'undefined' || isReducedMotion()) return { destroy() {} };

  const enter = () => gsap.to(node, { scale: 1.02, duration: 0.3, ease: 'back.out(2)' });
  const leave = () => gsap.to(node, { scale: 1, duration: 0.3, ease: 'power2.out' });

  node.addEventListener('mouseenter', enter);
  node.addEventListener('mouseleave', leave);

  return {
    destroy() {
      node.removeEventListener('mouseenter', enter);
      node.removeEventListener('mouseleave', leave);
    },
  };
}

export function pageTransition(node: HTMLElement) {
  if (typeof window === 'undefined') return { destroy() {} };
  if (isReducedMotion()) {
    node.style.opacity = '1';
    return { destroy() {} };
  }

  gsap.fromTo(node, { opacity: 0 }, { opacity: 1, duration: 0.35, ease: 'power2.out' });
  return { destroy() {} };
}

/**
 * MAGNETIC BUTTON — Primary CTAs (Apple/Linear style)
 */
export function magneticButton(node: HTMLElement) {
  if (typeof window === 'undefined' || isReducedMotion()) return { destroy() {} };

  node.style.position = 'relative';
  node.style.display = 'inline-flex';

  const setX = gsap.quickTo(node, 'x', { duration: 0.35, ease: 'power2.out' });
  const setY = gsap.quickTo(node, 'y', { duration: 0.35, ease: 'power2.out' });

  const handleMouseMove = (e: MouseEvent) => {
    const rect = node.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    setX((e.clientX - centerX) * 0.35);
    setY((e.clientY - centerY) * 0.35);
  };

  const handleMouseLeave = () => {
    gsap.to(node, { x: 0, y: 0, scale: 1, duration: 0.5, ease: 'elastic.out(1, 0.4)' });
  };

  const handleMouseDown = () => {
    gsap.to(node, { scale: 0.94, duration: 0.1 });
  };

  const handleMouseUp = () => {
    gsap.to(node, { scale: 1.04, duration: 0.2 });
  };

  node.addEventListener('mousemove', handleMouseMove, { passive: true });
  node.addEventListener('mouseleave', handleMouseLeave, { passive: true });
  node.addEventListener('mousedown', handleMouseDown);
  node.addEventListener('mouseup', handleMouseUp);

  return {
    destroy() {
      node.removeEventListener('mousemove', handleMouseMove);
      node.removeEventListener('mouseleave', handleMouseLeave);
      node.removeEventListener('mousedown', handleMouseDown);
      node.removeEventListener('mouseup', handleMouseUp);
    },
  };
}

/**
 * SHIMMER BUTTON — Secondary/outline buttons
 */
export function shimmerButton(node: HTMLElement) {
  if (typeof window === 'undefined' || isReducedMotion()) return { destroy() {} };

  node.style.overflow = 'hidden';
  node.style.position = 'relative';

  const shimmer = document.createElement('span');
  shimmer.style.cssText = `
    position: absolute;
    top: 0; left: -100%;
    width: 60%;
    height: 100%;
    background: linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.55) 50%, transparent 70%);
    pointer-events: none;
    transform: skewX(-20deg);
    opacity: 0;
  `;
  node.appendChild(shimmer);

  let tween: gsap.core.Tween | null = null;

  const handleMouseEnter = () => {
    gsap.to(node, { scale: 1.03, y: -1, duration: 0.25, ease: 'power2.out' });
    tween?.kill();
    tween = gsap.fromTo(
      shimmer,
      { left: '-100%', opacity: 0 },
      { left: '160%', opacity: 1, duration: 0.6, ease: 'none', onComplete: () => { shimmer.style.opacity = '0'; } }
    );
  };

  const handleMouseLeave = () => {
    gsap.to(node, { scale: 1, y: 0, duration: 0.3, ease: 'power2.out' });
  };

  node.addEventListener('mouseenter', handleMouseEnter);
  node.addEventListener('mouseleave', handleMouseLeave);

  return {
    destroy() {
      node.removeEventListener('mouseenter', handleMouseEnter);
      node.removeEventListener('mouseleave', handleMouseLeave);
      shimmer.remove();
    },
  };
}

export { shimmerButton as buttonMotion };

/**
 * SPOTLIGHT BUTTON — Card CTAs
 */
export function spotlightButton(node: HTMLElement) {
  if (typeof window === 'undefined' || isReducedMotion()) return { destroy() {} };

  node.style.position = 'relative';
  node.style.overflow = 'hidden';

  const spotlight = document.createElement('span');
  spotlight.style.cssText = `
    position: absolute;
    width: 120px; height: 120px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%);
    pointer-events: none;
    transform: translate(-50%, -50%);
    opacity: 0;
    transition: opacity 0.2s;
  `;
  node.appendChild(spotlight);

  const handleMouseMove = (e: MouseEvent) => {
    const rect = node.getBoundingClientRect();
    spotlight.style.left = e.clientX - rect.left + 'px';
    spotlight.style.top = e.clientY - rect.top + 'px';
    spotlight.style.opacity = '1';
  };

  const handleMouseLeave = () => {
    spotlight.style.opacity = '0';
    gsap.to(node, { scale: 1, duration: 0.2, ease: 'power2.out' });
  };

  const handleMouseEnter = () => {
    gsap.to(node, { scale: 1.04, y: -1, duration: 0.2, ease: 'power2.out' });
  };

  node.addEventListener('mousemove', handleMouseMove, { passive: true });
  node.addEventListener('mouseleave', handleMouseLeave);
  node.addEventListener('mouseenter', handleMouseEnter);

  return {
    destroy() {
      node.removeEventListener('mousemove', handleMouseMove);
      node.removeEventListener('mouseleave', handleMouseLeave);
      node.removeEventListener('mouseenter', handleMouseEnter);
      spotlight.remove();
    },
  };
}

/**
 * TILT CARD — 3D perspective tilt
 */
export function tiltCard(node: HTMLElement, options: { maxTilt?: number; scale?: number } = {}) {
  if (typeof window === 'undefined' || isReducedMotion()) return { destroy() {} };

  const maxTilt = options.maxTilt ?? 12;
  const scaleAmt = options.scale ?? 1.03;

  node.style.transformStyle = 'preserve-3d';
  node.style.willChange = 'transform';
  node.style.transition = 'box-shadow 0.3s ease';

  const handleMouseMove = (e: MouseEvent) => {
    const rect = node.getBoundingClientRect();
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotX = ((e.clientY - rect.top - cy) / cy) * -maxTilt;
    const rotY = ((e.clientX - rect.left - cx) / cx) * maxTilt;

    gsap.to(node, {
      rotateX: rotX,
      rotateY: rotY,
      scale: scaleAmt,
      duration: 0.2,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    gsap.to(node, { rotateX: 0, rotateY: 0, scale: 1, duration: 0.5, ease: 'power2.out' });
  };

  node.addEventListener('mousemove', handleMouseMove, { passive: true });
  node.addEventListener('mouseleave', handleMouseLeave);

  return {
    destroy() {
      node.removeEventListener('mousemove', handleMouseMove);
      node.removeEventListener('mouseleave', handleMouseLeave);
    },
  };
}

/**
 * GLARE CARD — Holographic glare + tilt
 */
export function glareCard(node: HTMLElement) {
  if (typeof window === 'undefined' || isReducedMotion()) return { destroy() {} };

  const maxTilt = 10;
  node.style.transformStyle = 'preserve-3d';
  node.style.position = 'relative';
  node.style.willChange = 'transform';
  node.style.overflow = 'hidden';

  const glare = document.createElement('div');
  glare.style.cssText = `
    position: absolute;
    inset: 0;
    pointer-events: none;
    border-radius: inherit;
    z-index: 10;
    opacity: 0;
    background: radial-gradient(circle at 50% 50%, rgba(255,255,255,0.35) 0%, transparent 65%);
    transition: opacity 0.25s ease;
  `;
  node.appendChild(glare);

  const handleMouseMove = (e: MouseEvent) => {
    const rect = node.getBoundingClientRect();
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotX = ((e.clientY - rect.top - cy) / cy) * -maxTilt;
    const rotY = ((e.clientX - rect.left - cx) / cx) * maxTilt;
    const glareX = ((e.clientX - rect.left) / rect.width) * 100;
    const glareY = ((e.clientY - rect.top) / rect.height) * 100;

    gsap.to(node, { rotateX: rotX, rotateY: rotY, scale: 1.04, duration: 0.2, ease: 'power2.out' });
    glare.style.opacity = '1';
    glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.3) 0%, transparent 60%)`;
  };

  const handleMouseLeave = () => {
    gsap.to(node, { rotateX: 0, rotateY: 0, scale: 1, duration: 0.5, ease: 'power2.out' });
    glare.style.opacity = '0';
  };

  node.addEventListener('mousemove', handleMouseMove, { passive: true });
  node.addEventListener('mouseleave', handleMouseLeave);

  return {
    destroy() {
      node.removeEventListener('mousemove', handleMouseMove);
      node.removeEventListener('mouseleave', handleMouseLeave);
      glare.remove();
    },
  };
}

/**
 * FLOAT CARD — Subtle hover float with depth shadow
 */
export function floatCard(node: HTMLElement) {
  if (typeof window === 'undefined' || isReducedMotion()) return { destroy() {} };

  node.style.willChange = 'transform, box-shadow';
  node.style.transition = 'box-shadow 0.35s ease';

  const handleMouseEnter = () => {
    gsap.to(node, { y: -8, scale: 1.015, duration: 0.35, ease: 'power2.out' });
    node.style.boxShadow = '0 20px 50px rgba(0,0,0,0.1), 0 8px 20px rgba(0,0,0,0.06)';
  };

  const handleMouseLeave = () => {
    gsap.to(node, { y: 0, scale: 1, duration: 0.4, ease: 'power2.out' });
    node.style.boxShadow = '';
  };

  node.addEventListener('mouseenter', handleMouseEnter);
  node.addEventListener('mouseleave', handleMouseLeave);

  return {
    destroy() {
      node.removeEventListener('mouseenter', handleMouseEnter);
      node.removeEventListener('mouseleave', handleMouseLeave);
    },
  };
}

function wrapWordsForBokeh(node: Node, wordNodes: HTMLElement[]) {
  const children = Array.from(node.childNodes);
  for (const child of children) {
    if (child.nodeType === Node.TEXT_NODE) {
      const text = child.textContent || '';
      if (!text.trim()) continue;

      const fragment = document.createDocumentFragment();
      const parts = text.split(/(\s+)/);
      for (const part of parts) {
        if (/^\s+$/.test(part)) {
          fragment.appendChild(document.createTextNode(part));
        } else if (part.length > 0) {
          const span = document.createElement('span');
          span.className = 'motion-bokeh-word';
          span.style.display = 'inline-block';
          span.style.verticalAlign = 'baseline';
          span.style.opacity = '0';
          span.style.filter = 'blur(14px) brightness(1.2)';
          span.style.willChange = 'opacity, filter';
          span.textContent = part;

          fragment.appendChild(span);
          wordNodes.push(span);
        }
      }
      node.replaceChild(fragment, child);
    } else if (child.nodeType === Node.ELEMENT_NODE) {
      if ((child as HTMLElement).tagName.toLowerCase() === 'br') {
        continue;
      }
      wrapWordsForBokeh(child, wordNodes);
    }
  }
}

/**
 * BOKEH REVEAL — Luxury Apple/Studio Optical Focus & Bloom Materialization
 * Words materialize in-place from pure optical bokeh blur & soft light bloom (blur: 14px -> 0px, brightness: 1.2 -> 1.0).
 * Completely gapless & jitter-free: 0 scale distortion, 0 letter-spacing reflow, 100% stable typography layout.
 */
export function bokehReveal(
  node: HTMLElement,
  options: { delay?: number; staggerDelay?: number; duration?: number; ease?: string } = {}
) {
  if (typeof window === 'undefined' || isReducedMotion()) return { destroy() {} };

  const originalHTML = node.innerHTML;
  const wordNodes: HTMLElement[] = [];
  wrapWordsForBokeh(node, wordNodes);

  if (wordNodes.length === 0) return { destroy() {} };

  const ctx = gsap.context(() => {
    gsap.fromTo(
      wordNodes,
      {
        opacity: 0,
        filter: 'blur(14px) brightness(1.2)',
      },
      {
        opacity: 1,
        filter: 'blur(0px) brightness(1)',
        duration: options.duration ?? 0.95,
        delay: options.delay ?? 0.08,
        stagger: options.staggerDelay ?? 0.055,
        ease: options.ease ?? 'power2.out',
        scrollTrigger: {
          trigger: node,
          start: 'top 92%',
          toggleActions: 'play none none reverse',
        },
        onComplete: () => {
          wordNodes.forEach((el) => {
            el.style.filter = '';
            el.style.willChange = '';
          });
        },
      }
    );
  }, node);

  return {
    destroy() {
      ctx.revert();
      node.innerHTML = originalHTML;
    },
  };
}

function wrapWordsPreservingHTML(node: Node, wordNodes: HTMLElement[]) {
  const children = Array.from(node.childNodes);
  for (const child of children) {
    if (child.nodeType === Node.TEXT_NODE) {
      const text = child.textContent || '';
      if (!text.trim()) continue;

      const fragment = document.createDocumentFragment();
      const parts = text.split(/(\s+)/);
      for (const part of parts) {
        if (/^\s+$/.test(part)) {
          fragment.appendChild(document.createTextNode(part));
        } else if (part.length > 0) {
          const outer = document.createElement('span');
          outer.className = 'motion-word-mask';
          outer.style.display = 'inline-block';
          outer.style.overflow = 'hidden';
          outer.style.verticalAlign = 'bottom';
          outer.style.lineHeight = '1.18';
          outer.style.paddingBottom = '0.08em';
          outer.style.marginBottom = '-0.08em';

          const inner = document.createElement('span');
          inner.className = 'motion-word';
          inner.style.display = 'inline-block';
          inner.style.opacity = '0';
          inner.style.transform = 'translateY(115%) rotate(1.5deg)';
          inner.style.transformOrigin = '50% 100%';
          inner.style.filter = 'blur(8px)';
          inner.style.willChange = 'transform, opacity, filter';
          inner.textContent = part;

          outer.appendChild(inner);
          fragment.appendChild(outer);
          wordNodes.push(inner);
        }
      }
      node.replaceChild(fragment, child);
    } else if (child.nodeType === Node.ELEMENT_NODE) {
      if ((child as HTMLElement).tagName.toLowerCase() === 'br') {
        continue;
      }
      wrapWordsPreservingHTML(child, wordNodes);
    }
  }
}

/**
 * WORD REVEAL — Kinetic split-word entrance with baseline mask & optical blur
 */
export function wordReveal(
  node: HTMLElement,
  options: { delay?: number; staggerDelay?: number; duration?: number; ease?: string } = {}
) {
  if (typeof window === 'undefined' || isReducedMotion()) return { destroy() {} };

  const originalHTML = node.innerHTML;
  const wordNodes: HTMLElement[] = [];
  wrapWordsPreservingHTML(node, wordNodes);

  if (wordNodes.length === 0) return { destroy() {} };

  const ctx = gsap.context(() => {
    gsap.fromTo(
      wordNodes,
      {
        opacity: 0,
        y: '115%',
        rotate: 1.5,
        filter: 'blur(8px)',
      },
      {
        opacity: 1,
        y: '0%',
        rotate: 0,
        filter: 'blur(0px)',
        duration: options.duration ?? 0.95,
        delay: options.delay ?? 0.08,
        stagger: options.staggerDelay ?? 0.04,
        ease: options.ease ?? 'power3.out',
        scrollTrigger: {
          trigger: node,
          start: 'top 92%',
          toggleActions: 'play none none reverse',
        },
        onComplete: () => {
          wordNodes.forEach((el) => {
            el.style.filter = '';
            el.style.transform = '';
            el.style.willChange = '';
          });
        },
      }
    );
  }, node);

  return {
    destroy() {
      ctx.revert();
      node.innerHTML = originalHTML;
    },
  };
}

/**
 * BLUR REVEAL — Smooth blur-to-focus entrance with natural line height and sharp typography
 */
export function blurReveal(
  node: HTMLElement,
  options: { delay?: number; duration?: number; y?: number; ease?: string } = {}
) {
  if (typeof window === 'undefined') return { destroy() {} };
  if (isReducedMotion()) {
    node.style.opacity = '1';
    return { destroy() {} };
  }

  const ctx = gsap.context(() => {
    gsap.fromTo(
      node,
      {
        opacity: 0,
        y: options.y ?? 20,
        filter: 'blur(10px)',
      },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: options.duration ?? 0.85,
        delay: options.delay ?? 0.25,
        ease: options.ease ?? 'power3.out',
        scrollTrigger: {
          trigger: node,
          start: 'top 92%',
          toggleActions: 'play none none reverse',
        },
        onComplete: () => {
          node.style.filter = '';
          node.style.transform = '';
          node.style.willChange = '';
        },
      }
    );
  }, node);

  return {
    destroy() {
      ctx.revert();
    },
  };
}

/**
 * HEADLINE MASK REVEAL — 3D Perspective Line Tilt Reveal
 */
export function headlineMaskReveal(node: HTMLElement, options: { delay?: number } = {}) {
  if (typeof window === 'undefined') return { destroy() {} };
  if (isReducedMotion()) {
    node.style.opacity = '1';
    return { destroy() {} };
  }

  const ctx = gsap.context(() => {
    gsap.fromTo(
      node,
      { opacity: 0, y: 30, rotateX: -20 },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 0.75,
        delay: options.delay ?? 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: node,
          start: 'top 88%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, node);

  return {
    destroy() {
      ctx.revert();
    },
  };
}

/**
 * DRAW CHART BAR — Progressive width draw-in for metric charts and progress bars
 */
export function drawChartBar(
  node: HTMLElement,
  options: { targetWidth: string | number; delay?: number; duration?: number } = { targetWidth: '100%' }
) {
  if (typeof window === 'undefined') return { destroy() {} };
  const widthVal = typeof options.targetWidth === 'number' ? `${options.targetWidth}%` : options.targetWidth;

  if (isReducedMotion()) {
    node.style.width = widthVal;
    return { destroy() {} };
  }

  const ctx = gsap.context(() => {
    gsap.fromTo(
      node,
      { width: '0%' },
      {
        width: widthVal,
        duration: options.duration ?? 0.9,
        delay: options.delay ?? 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: node,
          start: 'top 90%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, node);

  return {
    destroy() {
      ctx.revert();
    },
  };
}

/**
 * HERO BADGE ENTRANCE — Bouncy spring pop entrance matching Hero section small floating cards
 */
export function heroBadgeEntrance(
  node: HTMLElement,
  options: { delay?: number; duration?: number; fromLeft?: boolean; ease?: string } = {}
) {
  if (typeof window === 'undefined') return { destroy() {} };
  if (isReducedMotion()) {
    node.style.opacity = '1';
    node.style.transform = 'none';
    node.style.filter = 'none';
    return { destroy() {} };
  }

  const isLeft = options.fromLeft ?? true;
  const initialX = isLeft ? -60 : 60;
  const initialRotate = isLeft ? -10 : 10;

  const ctx = gsap.context(() => {
    gsap.fromTo(
      node,
      {
        opacity: 0,
        x: initialX,
        y: 35,
        scale: 0.7,
        rotate: initialRotate,
        filter: 'blur(6px)',
      },
      {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        rotate: 0,
        filter: 'blur(0px)',
        duration: options.duration ?? 0.95,
        delay: options.delay ?? 0.8,
        ease: options.ease ?? 'back.out(1.6)',
        scrollTrigger: {
          trigger: node,
          start: 'top 88%',
          toggleActions: 'play none none reverse',
        },
        onComplete: () => {
          node.style.filter = '';
          node.style.willChange = '';
        },
      }
    );
  }, node);

  return {
    destroy() {
      ctx.revert();
    },
  };
}
