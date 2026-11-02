"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { timeline } from "@/lib/data";

export default function Timeline() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      gsap.to(".timeline-line i", {
        scaleY: 1, ease: "none",
        scrollTrigger: { trigger: root.current, start: "top 70%", end: "bottom 70%", scrub: true },
      });
      gsap.utils.toArray<HTMLElement>(".tl-item").forEach((item) => {
        gsap.from(item.children, {
          x: 60, opacity: 0, duration: 1.1, stagger: 0.1, ease: "expo.out",
          scrollTrigger: { trigger: item, start: "top 80%", once: true },
        });
      });
    },
    { scope: root }
  );
  return (
    <div ref={root} className="timeline">
      <div className="timeline-line"><i /></div>
      {timeline.map((t) => (
        <div key={t.year} className="tl-item">
          <div className="tl-year">{t.year}</div>
          <div>
            <h3 className="h-3">{t.title}</h3>
            <p>{t.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
