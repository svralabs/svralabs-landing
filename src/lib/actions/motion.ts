import { animate, inView, stagger } from "motion";

interface MotionOptions {
  duration?: number;
  delay?: number;
  easing?: any;
  amount?: number | "some" | "all";
}

// Snappy, Apple/Linear style bezier curve
const DEFAULT_EASE = [0.32, 0.72, 0, 1];
const DEFAULT_DURATION = 0.5;

function isReducedMotion() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function fadeUp(node: HTMLElement, options: MotionOptions = {}) {
  const reduced = isReducedMotion();
  node.style.opacity = '0';
  if (!reduced) node.style.transform = 'translateY(20px)';
  
  const unobserve = inView(node, () => {
    animate(node, 
      reduced ? { opacity: [0, 1] } : { opacity: [0, 1], y: [20, 0] },
      { 
        duration: reduced ? 0.01 : (options.duration ?? DEFAULT_DURATION), 
        delay: options.delay ?? 0,
        ease: options.easing ?? DEFAULT_EASE
      }
    );
  }, { amount: options.amount ?? 0.1, margin: "0px 0px -15% 0px" });

  return { destroy: unobserve };
}

export function fadeIn(node: HTMLElement, options: MotionOptions = {}) {
  const reduced = isReducedMotion();
  node.style.opacity = '0';
  
  const unobserve = inView(node, () => {
    animate(node, 
      { opacity: [0, 1] },
      { 
        duration: reduced ? 0.01 : (options.duration ?? DEFAULT_DURATION), 
        delay: options.delay ?? 0,
        ease: options.easing ?? DEFAULT_EASE
      }
    );
  }, { amount: options.amount ?? 0.1, margin: "0px 0px -15% 0px" });

  return { destroy: unobserve };
}

export function fadeDown(node: HTMLElement, options: MotionOptions = {}) {
  const reduced = isReducedMotion();
  node.style.opacity = '0';
  if (!reduced) node.style.transform = 'translateY(-20px)';
  
  const unobserve = inView(node, () => {
    animate(node, 
      reduced ? { opacity: [0, 1] } : { opacity: [0, 1], y: [-20, 0] },
      { 
        duration: reduced ? 0.01 : (options.duration ?? DEFAULT_DURATION), 
        delay: options.delay ?? 0,
        ease: options.easing ?? DEFAULT_EASE
      }
    );
  }, { amount: options.amount ?? 0.2, margin: "0px 0px -15% 0px" });

  return { destroy: unobserve };
}

export function scaleIn(node: HTMLElement, options: MotionOptions = {}) {
  const reduced = isReducedMotion();
  node.style.opacity = '0';
  if (!reduced) node.style.transform = 'scale(0.95)';
  
  const unobserve = inView(node, () => {
    animate(node, 
      reduced ? { opacity: [0, 1] } : { opacity: [0, 1], scale: [0.95, 1] },
      { 
        duration: reduced ? 0.01 : (options.duration ?? 0.6), 
        delay: options.delay ?? 0,
        ease: options.easing ?? DEFAULT_EASE 
      }
    );
  }, { amount: options.amount ?? 0.2, margin: "0px 0px -15% 0px" });

  return { destroy: unobserve };
}

export function slideFromLeft(node: HTMLElement, options: MotionOptions = {}) {
  const reduced = isReducedMotion();
  node.style.opacity = '0';
  if (!reduced) node.style.transform = 'translateX(-20px)';
  
  const unobserve = inView(node, () => {
    animate(node, 
      reduced ? { opacity: [0, 1] } : { opacity: [0, 1], x: [-20, 0] },
      { 
        duration: reduced ? 0.01 : (options.duration ?? DEFAULT_DURATION), 
        delay: options.delay ?? 0,
        ease: options.easing ?? DEFAULT_EASE
      }
    );
  }, { amount: options.amount ?? 0.2, margin: "0px 0px -15% 0px" });

  return { destroy: unobserve };
}

export function slideFromRight(node: HTMLElement, options: MotionOptions = {}) {
  const reduced = isReducedMotion();
  node.style.opacity = '0';
  if (!reduced) node.style.transform = 'translateX(20px)';
  
  const unobserve = inView(node, () => {
    animate(node, 
      reduced ? { opacity: [0, 1] } : { opacity: [0, 1], x: [20, 0] },
      { 
        duration: reduced ? 0.01 : (options.duration ?? DEFAULT_DURATION), 
        delay: options.delay ?? 0,
        ease: options.easing ?? DEFAULT_EASE
      }
    );
  }, { amount: options.amount ?? 0.2, margin: "0px 0px -15% 0px" });

  return { destroy: unobserve };
}

export function staggerFadeUp(node: HTMLElement, options: { selector?: string, staggerDelay?: number } & MotionOptions = {}) {
  const reduced = isReducedMotion();
  const selector = options.selector ?? ":scope > *";
  const elements = Array.from(node.querySelectorAll(selector)) as HTMLElement[];
  
  elements.forEach((el) => {
    el.style.opacity = '0';
    if (!reduced) el.style.transform = 'translateY(20px)';
  });
  
  const unobserve = inView(node, () => {
    if (elements.length > 0) {
        animate(elements, 
          reduced ? { opacity: [0, 1] } : { opacity: [0, 1], y: [20, 0] },
          { 
            duration: reduced ? 0.01 : (options.duration ?? DEFAULT_DURATION), 
            delay: reduced ? 0 : stagger(options.staggerDelay ?? 0.05, { startDelay: options.delay ?? 0 }),
            ease: options.easing ?? DEFAULT_EASE
          }
        );
    }
  }, { amount: options.amount ?? 0.1, margin: "0px 0px -15% 0px" });

  return { destroy: unobserve };
}

export function staggerScaleIn(node: HTMLElement, options: { selector?: string, staggerDelay?: number } & MotionOptions = {}) {
  const reduced = isReducedMotion();
  const selector = options.selector ?? ":scope > *";
  const elements = Array.from(node.querySelectorAll(selector)) as HTMLElement[];
  
  elements.forEach((el) => {
    el.style.opacity = '0';
    if (!reduced) el.style.transform = 'scale(0.95)';
  });
  
  const unobserve = inView(node, () => {
    if (elements.length > 0) {
        animate(elements, 
          reduced ? { opacity: [0, 1] } : { opacity: [0, 1], scale: [0.95, 1] },
          { 
            duration: reduced ? 0.01 : (options.duration ?? 0.6), 
            delay: reduced ? 0 : stagger(options.staggerDelay ?? 0.05, { startDelay: options.delay ?? 0 }),
            ease: options.easing ?? DEFAULT_EASE
          }
        );
    }
  }, { amount: options.amount ?? 0.1, margin: "0px 0px -15% 0px" });

  return { destroy: unobserve };
}

export function countUp(node: HTMLElement, options: { from?: number, to: number, duration?: number }) {
  const reduced = isReducedMotion();
  const from = options.from ?? 0;
  
  node.textContent = String(from);
  
  const unobserve = inView(node, () => {
    if (reduced) {
      node.textContent = String(options.to);
      return;
    }
    animate(from, options.to, {
      duration: options.duration ?? 1.5,
      ease: "easeOut",
      onUpdate: (latest) => {
        node.textContent = Math.round(latest).toString();
      }
    });
  }, { amount: 0.5, margin: "0px 0px -15% 0px" });

  return { destroy: unobserve };
}

export function hoverSpring(node: HTMLElement) {
  const reduced = isReducedMotion();
  if (reduced) return;

  const handleMouseEnter = () => {
    animate(node, { scale: 1.02 }, { type: "spring", stiffness: 400, damping: 25 });
  };
  
  const handleMouseLeave = () => {
    animate(node, { scale: 1 }, { type: "spring", stiffness: 400, damping: 25 });
  };

  node.addEventListener('mouseenter', handleMouseEnter);
  node.addEventListener('mouseleave', handleMouseLeave);

  return {
    destroy() {
      node.removeEventListener('mouseenter', handleMouseEnter);
      node.removeEventListener('mouseleave', handleMouseLeave);
    }
  }
}

export function pageTransition(node: HTMLElement) {
    const reduced = isReducedMotion();
    node.style.opacity = '0';
    
    animate(node, 
        { opacity: [0, 1] },
        { duration: reduced ? 0.01 : 0.3, ease: DEFAULT_EASE }
    );
    
    return {
        destroy() {}
    };
}

/**
 * MAGNETIC BUTTON — Primary CTAs (Apple/Linear style)
 * Button physically follows the cursor within a radius.
 * On mousedown: snap inward. On release: snap back.
 */
export function magneticButton(node: HTMLElement) {
  const reduced = isReducedMotion();
  if (reduced) return;

  node.style.position = 'relative';
  node.style.display = 'inline-flex';

  const handleMouseMove = (e: MouseEvent) => {
    const rect = node.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distX = (e.clientX - centerX) * 0.35;
    const distY = (e.clientY - centerY) * 0.35;
    animate(node, { x: distX, y: distY, scale: 1.04 }, { duration: 0.35, ease: DEFAULT_EASE });
  };

  const handleMouseLeave = () => {
    animate(node, { x: 0, y: 0, scale: 1 }, { duration: 0.5, ease: DEFAULT_EASE });
  };

  const handleMouseDown = () => {
    animate(node, { scale: 0.94 }, { duration: 0.1, ease: DEFAULT_EASE });
  };

  const handleMouseUp = () => {
    animate(node, { scale: 1.04 }, { duration: 0.2, ease: DEFAULT_EASE });
  };

  node.addEventListener('mousemove', handleMouseMove);
  node.addEventListener('mouseleave', handleMouseLeave);
  node.addEventListener('mousedown', handleMouseDown);
  node.addEventListener('mouseup', handleMouseUp);

  return {
    destroy() {
      node.removeEventListener('mousemove', handleMouseMove);
      node.removeEventListener('mouseleave', handleMouseLeave);
      node.removeEventListener('mousedown', handleMouseDown);
      node.removeEventListener('mouseup', handleMouseUp);
    }
  };
}

/**
 * SHIMMER BUTTON — Secondary/outline buttons
 * A bright light sweeps across the button on hover.
 * On click: fast squeeze then release.
 */
export function shimmerButton(node: HTMLElement) {
  const reduced = isReducedMotion();
  if (reduced) return;

  node.style.overflow = 'hidden';
  node.style.position = 'relative';

  // Create shimmer layer
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

  let shimmerAnim: any = null;

  const handleMouseEnter = () => {
    animate(node, { scale: 1.03, y: -1 }, { duration: 0.25, ease: DEFAULT_EASE });
    if (shimmerAnim) shimmerAnim.stop?.();
    shimmerAnim = animate(shimmer, 
      { left: ['-100%', '160%'], opacity: [0, 1, 0] },
      { duration: 0.6, ease: 'linear' }
    );
  };

  const handleMouseLeave = () => {
    animate(node, { scale: 1, y: 0 }, { duration: 0.3, ease: DEFAULT_EASE });
  };

  const handleMouseDown = () => {
    animate(node, { scale: 0.96 }, { duration: 0.08, ease: DEFAULT_EASE });
  };

  const handleMouseUp = () => {
    animate(node, { scale: 1.02 }, { duration: 0.15, ease: DEFAULT_EASE });
  };

  node.addEventListener('mouseenter', handleMouseEnter);
  node.addEventListener('mouseleave', handleMouseLeave);
  node.addEventListener('mousedown', handleMouseDown);
  node.addEventListener('mouseup', handleMouseUp);

  return {
    destroy() {
      node.removeEventListener('mouseenter', handleMouseEnter);
      node.removeEventListener('mouseleave', handleMouseLeave);
      node.removeEventListener('mousedown', handleMouseDown);
      node.removeEventListener('mouseup', handleMouseUp);
      shimmer.remove();
    }
  };
}

/**
 * SPOTLIGHT BUTTON — Card CTAs (small links/arrows)
 * A radial spotlight follows the cursor inside the button.
 * Simple, elegant, works great on dark pill buttons.
 */
export function spotlightButton(node: HTMLElement) {
  const reduced = isReducedMotion();
  if (reduced) return;

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
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    spotlight.style.left = x + 'px';
    spotlight.style.top = y + 'px';
    spotlight.style.opacity = '1';
  };

  const handleMouseLeave = () => {
    spotlight.style.opacity = '0';
    animate(node, { scale: 1 }, { duration: 0.2, ease: DEFAULT_EASE });
  };

  const handleMouseEnter = () => {
    animate(node, { scale: 1.04, y: -1 }, { duration: 0.2, ease: DEFAULT_EASE });
  };

  const handleMouseDown = () => {
    animate(node, { scale: 0.96 }, { duration: 0.08, ease: DEFAULT_EASE });
  };

  const handleMouseUp = () => {
    animate(node, { scale: 1.04 }, { duration: 0.15, ease: DEFAULT_EASE });
  };

  node.addEventListener('mousemove', handleMouseMove);
  node.addEventListener('mouseleave', handleMouseLeave);
  node.addEventListener('mouseenter', handleMouseEnter);
  node.addEventListener('mousedown', handleMouseDown);
  node.addEventListener('mouseup', handleMouseUp);

  return {
    destroy() {
      node.removeEventListener('mousemove', handleMouseMove);
      node.removeEventListener('mouseleave', handleMouseLeave);
      node.removeEventListener('mouseenter', handleMouseEnter);
      node.removeEventListener('mousedown', handleMouseDown);
      node.removeEventListener('mouseup', handleMouseUp);
      spotlight.remove();
    }
  };
}

// Keep basic buttonMotion as alias for shimmer for any legacy references
export { shimmerButton as buttonMotion };

/**
 * TILT CARD — 3D perspective tilt following cursor
 * Card physically rotates toward the cursor direction.
 * Shadow dynamically shifts in the opposite direction.
 * Used for: feature cards, service cards.
 */
export function tiltCard(node: HTMLElement, options: { maxTilt?: number; scale?: number } = {}) {
  const reduced = isReducedMotion();
  if (reduced) return;

  const maxTilt = options.maxTilt ?? 12;
  const scaleAmt = options.scale ?? 1.03;

  node.style.transformStyle = 'preserve-3d';
  node.style.willChange = 'transform';
  node.style.transition = 'box-shadow 0.3s ease';

  const handleMouseMove = (e: MouseEvent) => {
    const rect = node.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotX = ((y - cy) / cy) * -maxTilt;
    const rotY = ((x - cx) / cx) * maxTilt;

    // Shadow follows opposite direction of tilt
    const shadowX = (rotY / maxTilt) * -16;
    const shadowY = (rotX / maxTilt) * -16;

    animate(
      node,
      {
        rotateX: rotX,
        rotateY: rotY,
        scale: scaleAmt,
      } as any,
      { duration: 0.15, ease: DEFAULT_EASE }
    );
    node.style.boxShadow = `${shadowX}px ${shadowY}px 40px rgba(0,0,0,0.10), ${shadowX/2}px ${shadowY/2}px 15px rgba(0,0,0,0.06)`;
  };

  const handleMouseLeave = () => {
    animate(
      node,
      { rotateX: 0, rotateY: 0, scale: 1 } as any,
      { duration: 0.5, ease: DEFAULT_EASE }
    );
    node.style.boxShadow = '';
  };

  node.addEventListener('mousemove', handleMouseMove);
  node.addEventListener('mouseleave', handleMouseLeave);

  return {
    destroy() {
      node.removeEventListener('mousemove', handleMouseMove);
      node.removeEventListener('mouseleave', handleMouseLeave);
    }
  };
}

/**
 * GLARE CARD — Holographic glare + tilt
 * Combines 3D tilt with a bright specular highlight
 * that moves like light reflecting off a surface.
 * Used for: pricing cards, case study cards.
 */
export function glareCard(node: HTMLElement) {
  const reduced = isReducedMotion();
  if (reduced) return;

  const maxTilt = 10;
  node.style.transformStyle = 'preserve-3d';
  node.style.position = 'relative';
  node.style.willChange = 'transform';
  node.style.overflow = 'hidden';

  // Glare element
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
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotX = ((y - cy) / cy) * -maxTilt;
    const rotY = ((x - cx) / cx) * maxTilt;

    // Move glare to cursor position
    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;

    animate(node, { rotateX: rotX, rotateY: rotY, scale: 1.04 } as any, { duration: 0.2, ease: DEFAULT_EASE });
    glare.style.opacity = '1';
    glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.3) 0%, transparent 60%)`;
  };

  const handleMouseLeave = () => {
    animate(node, { rotateX: 0, rotateY: 0, scale: 1 } as any, { duration: 0.5, ease: DEFAULT_EASE });
    glare.style.opacity = '0';
  };

  node.addEventListener('mousemove', handleMouseMove);
  node.addEventListener('mouseleave', handleMouseLeave);

  return {
    destroy() {
      node.removeEventListener('mousemove', handleMouseMove);
      node.removeEventListener('mouseleave', handleMouseLeave);
      glare.remove();
    }
  };
}

/**
 * FLOAT CARD — Subtle hover float with depth shadow
 * Card smoothly lifts on hover with a deepening shadow.
 * Used for: blog articles, testimonial cards.
 */
export function floatCard(node: HTMLElement) {
  const reduced = isReducedMotion();
  if (reduced) return;

  node.style.willChange = 'transform, box-shadow';
  node.style.transition = 'box-shadow 0.4s ease';

  const handleMouseEnter = () => {
    animate(node, { y: -8, scale: 1.015 } as any, { duration: 0.4, ease: DEFAULT_EASE });
    node.style.boxShadow = '0 20px 50px rgba(0,0,0,0.1), 0 8px 20px rgba(0,0,0,0.06)';
  };

  const handleMouseLeave = () => {
    animate(node, { y: 0, scale: 1 } as any, { duration: 0.45, ease: DEFAULT_EASE });
    node.style.boxShadow = '';
  };

  node.addEventListener('mouseenter', handleMouseEnter);
  node.addEventListener('mouseleave', handleMouseLeave);

  return {
    destroy() {
      node.removeEventListener('mouseenter', handleMouseEnter);
      node.removeEventListener('mouseleave', handleMouseLeave);
    }
  };
}

/**
 * WORD REVEAL — Apple/Linear style split-word entrance.
 * Splits text node into word wrappers and animates each word sliding up from an invisible baseline mask with staggered delays.
 */
export function wordReveal(node: HTMLElement, options: { delay?: number; staggerDelay?: number } = {}) {
  const reduced = isReducedMotion();
  if (reduced) return;

  // Process text nodes inside element into word spans
  const originalHTML = node.innerHTML;
  const words = node.innerText.split(/\s+/).filter(Boolean);
  
  if (words.length === 0) return;

  // Build masked word HTML wrapper
  node.innerHTML = words.map(word => `
    <span style="display: inline-block; overflow: hidden; vertical-align: top; margin-right: 0.28em;">
      <span class="motion-word" style="display: inline-block; opacity: 0; transform: translateY(110%) rotate(3deg); transform-origin: left bottom; will-change: transform, opacity;">${word}</span>
    </span>
  `).join('');

  const wordNodes = Array.from(node.querySelectorAll('.motion-word')) as HTMLElement[];

  const unobserve = inView(node, () => {
    animate(
      wordNodes,
      { opacity: [0, 1], y: ['110%', '0%'], rotate: ['3deg', '0deg'] },
      {
        duration: 0.65,
        delay: stagger(options.staggerDelay ?? 0.035, { startDelay: options.delay ?? 0.1 }),
        ease: DEFAULT_EASE
      }
    );
  }, { amount: 0.2, margin: "0px 0px -10% 0px" });

  return {
    destroy() {
      unobserve();
      node.innerHTML = originalHTML;
    }
  };
}

/**
 * BLUR REVEAL — Linear style blur-to-sharp focus text entrance.
 * Text smoothly comes into focus from blur(12px) as it slides up into view.
 */
export function blurReveal(node: HTMLElement, options: { delay?: number; duration?: number } = {}) {
  const reduced = isReducedMotion();
  node.style.opacity = '0';
  if (!reduced) {
    node.style.transform = 'translateY(16px)';
    node.style.filter = 'blur(12px)';
  }

  const unobserve = inView(node, () => {
    animate(
      node,
      reduced 
        ? { opacity: [0, 1] } 
        : { opacity: [0, 1], y: [16, 0], filter: ['blur(12px)', 'blur(0px)'] } as any,
      {
        duration: reduced ? 0.01 : (options.duration ?? 0.7),
        delay: options.delay ?? 0.1,
        ease: DEFAULT_EASE
      }
    );
  }, { amount: 0.2, margin: "0px 0px -10% 0px" });

  return { destroy: unobserve };
}

/**
 * HEADLINE MASK REVEAL — 3D Perspective Line Tilt Reveal
 * Rotates text around X axis as it rises from behind a mask.
 */
export function headlineMaskReveal(node: HTMLElement, options: { delay?: number } = {}) {
  const reduced = isReducedMotion();
  node.style.opacity = '0';
  if (!reduced) {
    node.style.transform = 'translateY(30px) rotateX(-20deg)';
    node.style.transformOrigin = 'center top';
  }

  const unobserve = inView(node, () => {
    animate(
      node,
      reduced 
        ? { opacity: [0, 1] } 
        : { opacity: [0, 1], y: [30, 0], rotateX: [-20, 0] } as any,
      {
        duration: reduced ? 0.01 : 0.75,
        delay: options.delay ?? 0.1,
        ease: DEFAULT_EASE
      }
    );
  }, { amount: 0.2, margin: "0px 0px -10% 0px" });

  return { destroy: unobserve };
}
