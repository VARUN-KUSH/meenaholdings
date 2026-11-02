"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

export default function Cursor() {
  const ring = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("View");

  useEffect(() => {
    if (window.matchMedia("(hover: none), (pointer: coarse)").matches) return;
    const r = ring.current!;
    const d = dot.current!;
    gsap.set([r, d], { opacity: 0 });
    const rx = gsap.quickTo(r, "x", { duration: 0.5, ease: "power3" });
    const ry = gsap.quickTo(r, "y", { duration: 0.5, ease: "power3" });
    const dx = gsap.quickTo(d, "x", { duration: 0.1 });
    const dy = gsap.quickTo(d, "y", { duration: 0.1 });

    const move = (e: MouseEvent) => {
      gsap.to([r, d], { opacity: 1, duration: 0.3, overwrite: "auto" });
      rx(e.clientX); ry(e.clientY); dx(e.clientX); dy(e.clientY);
    };
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const view = t.closest<HTMLElement>("[data-cursor]");
      r.classList.toggle("is-view", !!view);
      if (view) setLabel(view.dataset.cursor || "View");
      r.classList.toggle("is-hover", !view && !!t.closest("a, button, label, input, textarea"));
    };
    const leave = () => gsap.to([r, d], { opacity: 0, duration: 0.3 });

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseover", over);
    document.documentElement.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", over);
      document.documentElement.removeEventListener("mouseleave", leave);
    };
  }, []);

  return (
    <>
      <div ref={ring} className="cursor" aria-hidden>
        <span className="cursor-label">{label}</span>
      </div>
      <div ref={dot} className="cursor-dot" aria-hidden />
    </>
  );
}
