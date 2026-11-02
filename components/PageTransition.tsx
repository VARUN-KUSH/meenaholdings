"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";

/** Column wipe between routes. Triggered by <TLink> via the `mh:navigate` event. */
export default function PageTransition() {
  const root = useRef<HTMLDivElement>(null);
  const covering = useRef(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const onNavigate = (e: Event) => {
      const href = (e as CustomEvent<string>).detail;
      if (prefersReducedMotion()) return router.push(href);
      if (covering.current) return;
      covering.current = true;
      router.prefetch(href);
      gsap.fromTo(
        root.current!.children,
        { scaleY: 0, transformOrigin: "bottom" },
        { scaleY: 1, duration: 0.65, stagger: 0.05, ease: "power4.inOut", onComplete: () => router.push(href) }
      );
    };
    window.addEventListener("mh:navigate", onNavigate);
    return () => window.removeEventListener("mh:navigate", onNavigate);
  }, [router]);

  useEffect(() => {
    window.__lenis?.scrollTo(0, { immediate: true, force: true });
    window.scrollTo(0, 0);
    ScrollTrigger.refresh();
    if (!covering.current) return;
    gsap.to(root.current!.children, {
      scaleY: 0,
      transformOrigin: "top",
      duration: 0.75,
      stagger: 0.05,
      delay: 0.1,
      ease: "power4.inOut",
      onComplete: () => {
        covering.current = false;
      },
    });
  }, [pathname]);

  return (
    <div ref={root} className="transition" aria-hidden>
      <i /><i /><i /><i /><i />
    </div>
  );
}
