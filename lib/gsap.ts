import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";
import { useGSAP } from "@gsap/react";
import type Lenis from "lenis";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, Flip, useGSAP);
}

declare global {
  interface Window {
    __lenis?: Lenis;
    __mhReady?: boolean;
  }
}

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Resolves once the preloader has finished (immediately on client-side navigations). */
export const whenReady = () =>
  new Promise<void>((resolve) => {
    if (window.__mhReady) return resolve();
    window.addEventListener("mh:ready", () => resolve(), { once: true });
  });

export { gsap, ScrollTrigger, Flip, useGSAP };
