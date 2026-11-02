"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { apps } from "@/lib/data";
import TLink from "../TLink";
import { Arrow } from "../Icons";

/** Closing call-to-action with app icons orbiting the headline. */
export default function Cta({ title, sub }: { title?: ReactNode; sub?: string }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const icons = gsap.utils.toArray<HTMLElement>(".cta-orbit span");
      const place = (t: number) => {
        const w = root.current!.offsetWidth;
        const h = root.current!.offsetHeight;
        icons.forEach((el, i) => {
          const a = t + (i / icons.length) * Math.PI * 2;
          const depth = (Math.sin(a) + 1) / 2;
          gsap.set(el, {
            x: Math.cos(a) * w * 0.42 - 32,
            y: Math.sin(a) * h * 0.32 - 32,
            scale: 0.6 + depth * 0.6,
            opacity: 0.25 + depth * 0.75,
            zIndex: Math.round(depth * 10),
          });
        });
      };
      if (prefersReducedMotion()) return place(0);
      let t = 0;
      let speed = 0.0025;
      const tick = () => { t += speed; place(t); };
      gsap.ticker.add(tick);
      gsap.from(".cta-circle", { scale: 0.3, opacity: 0, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "center center", scrub: true } });
      const st = { v: 0 };
      const boost = () => gsap.to(st, { v: 1, duration: 0.4, onUpdate: () => (speed = 0.0025 + st.v * 0.01) });
      const calm = () => gsap.to(st, { v: 0, duration: 1.2, onUpdate: () => (speed = 0.0025 + st.v * 0.01) });
      const btn = root.current!.querySelector(".btn")!;
      btn.addEventListener("mouseenter", boost);
      btn.addEventListener("mouseleave", calm);
      return () => {
        gsap.ticker.remove(tick);
        btn.removeEventListener("mouseenter", boost);
        btn.removeEventListener("mouseleave", calm);
      };
    },
    { scope: root }
  );

  return (
    <section ref={root} className="cta">
      <div className="cta-circle" aria-hidden />
      <div className="cta-orbit" aria-hidden>
        {apps.map((a) => (
          <span key={a.id} style={{ background: a.color }}>{a.name[0]}</span>
        ))}
      </div>
      <div className="container">
        <span className="eyebrow">{sub ?? "Let's build together"}</span>
        <h2 className="h-display" data-split="scroll">
          {title ?? (<>Got an <span className="serif accent">idea?</span></>)}
        </h2>
        <TLink href="/contact" className="btn btn-primary" data-magnetic>
          <span>Start a conversation</span>
          <span><Arrow /></span>
        </TLink>
      </div>
    </section>
  );
}
