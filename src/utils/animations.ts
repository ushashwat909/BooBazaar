import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin with GSAP
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Configure global GSAP defaults inspired by fluid physics
gsap.defaults({
  ease: 'power3.out',
  duration: 0.6,
});

export { gsap, ScrollTrigger };

/**
 * Animate element entrance with fluid spring-like physics
 */
export const animateFadeUp = (
  target: gsap.TweenTarget,
  vars: gsap.TweenVars = {}
) => {
  return gsap.fromTo(
    target,
    {
      opacity: 0,
      y: 28,
      ...vars.from,
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
      clearProps: 'transform',
      ...vars,
    }
  );
};

/**
 * Staggered fluid reveal for lists and cards
 */
export const animateStaggerFade = (
  targets: gsap.TweenTarget,
  stagger: number = 0.08,
  vars: gsap.TweenVars = {}
) => {
  return gsap.fromTo(
    targets,
    {
      opacity: 0,
      y: 24,
      scale: 0.98,
      ...vars.from,
    },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      stagger,
      duration: 0.65,
      ease: 'power3.out',
      clearProps: 'transform',
      ...vars,
    }
  );
};

