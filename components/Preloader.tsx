"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

const ready = () => {
  window.__mhReady = true;
  window.dispatchEvent(new Event("mh:ready"));
};

export default function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const count = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLElement>(null);
  const [done, setDone] = useState(false);

  useGSAP(
    () => {
      if (prefersReducedMotion()) {
        ready();
        setDone(true);
        return;
      }
      const progress = { v: 0 };
      gsap
        .timeline({ onComplete: () => setDone(true) })
        .to(progress, {
          v: 100,
          duration: 1.6,
          ease: "power2.inOut",
          onUpdate: () => {
            count.current!.textContent = String(Math.round(progress.v)).padStart(2, "0");
            bar.current!.style.width = `${progress.v}%`;
          },
        })
        .to(".preloader-top, .preloader-count", { yPercent: -40, opacity: 0, duration: 0.6, ease: "power3.in" }, "+=0.1")
        .call(ready)
        .to(root.current, { clipPath: "inset(0 0 100% 0)", duration: 1.1, ease: "expo.inOut" }, "<0.1");
    },
    { scope: root }
  );

  if (done) return null;

  return (
    <div ref={root} className="preloader" style={{ clipPath: "inset(0 0 0% 0)" }} aria-hidden>
      <div className="preloader-top">
        <span>meenaholdings®</span>
        <span>App studio — est. 2021</span>
      </div>
      <div>
        <div ref={count} className="preloader-count">00</div>
        <div className="preloader-bar">
          <i ref={bar} />
        </div>
      </div>
    </div>
  );
}
