"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { Spark } from "./Icons";

/** Infinite marquee that speeds up and flips direction with scroll velocity. */
export default function Marquee({ items, light = false, reverse = false }: { items: string[]; light?: boolean; reverse?: boolean }) {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const tween = gsap.fromTo(track.current, { xPercent: reverse ? -50 : 0 }, {
        xPercent: reverse ? 0 : -50, duration: 28, ease: "none", repeat: -1,
      });
      // Start deep into the loop so negative timeScale (scrolling up) never hits time 0
      tween.totalTime(tween.duration() * 500);
      let dir = 1;
      ScrollTrigger.create({
        trigger: root.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          dir = self.direction;
          const boost = Math.min(Math.abs(self.getVelocity()) / 300, 6);
          gsap.to(tween, { timeScale: dir * (1 + boost), duration: 0.2, overwrite: true });
          gsap.to(tween, { timeScale: dir, duration: 1.2, delay: 0.25, overwrite: false });
        },
      });
    },
    { scope: root }
  );

  const row = (
    <div className="marquee-item">
      {items.map((t, i) => (
        <span key={i} style={{ display: "contents" }}>
          <span className={i % 2 ? "serif" : ""}>{t}</span>
          <Spark />
        </span>
      ))}
    </div>
  );

  return (
    <div ref={root} className={`marquee${light ? " is-light" : ""}`} aria-hidden>
      <div ref={track} className="marquee-track">
        {row}
        {row}
      </div>
    </div>
  );
}
