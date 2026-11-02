"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { process } from "@/lib/data";

export default function Process() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const cards = gsap.utils.toArray<HTMLElement>(".stack-card");
        cards.forEach((card, i) => {
          const next = cards[i + 1];
          if (!next) return;
          gsap.to(card, {
            scale: 0.9 + i * 0.02,
            filter: "brightness(0.55)",
            ease: "none",
            scrollTrigger: { trigger: next, start: "top bottom", end: "top 25%", scrub: true },
          });
        });
        gsap.utils.toArray<HTMLElement>(".stack-num").forEach((n) => {
          gsap.from(n, { yPercent: 60, opacity: 0, duration: 1.2, ease: "expo.out", scrollTrigger: { trigger: n, start: "top 85%" } });
        });
      });
    },
    { scope: root }
  );

  return (
    <div ref={root} className="stack">
      {process.map((step, i) => (
        <article key={step.title} className="stack-card">
          <div className="stack-num">0{i + 1}</div>
          <div className="stack-right">
            <h3 className="h-2">{step.title}</h3>
            <p className="lead muted">{step.text}</p>
            <ul>{step.tags.map((t) => <li key={t}>{t}</li>)}</ul>
          </div>
        </article>
      ))}
    </div>
  );
}
