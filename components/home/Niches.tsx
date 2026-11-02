"use client";

import { useRef, useState, type MouseEvent } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { apps, niches } from "@/lib/data";
import Phone from "../Phone";
import TLink from "../TLink";

export default function Niches() {
  const root = useRef<HTMLDivElement>(null);
  const preview = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);

  const { contextSafe } = useGSAP(
    () => {
      gsap.set(preview.current, { xPercent: -50, yPercent: -50 });
    },
    { scope: root }
  );

  const xTo = useRef<gsap.QuickToFunc>(null);
  const yTo = useRef<gsap.QuickToFunc>(null);
  const onMove = contextSafe((e: MouseEvent) => {
    if (!xTo.current) {
      xTo.current = gsap.quickTo(preview.current, "x", { duration: 0.6, ease: "power3" });
      yTo.current = gsap.quickTo(preview.current, "y", { duration: 0.6, ease: "power3" });
      gsap.set(preview.current, { x: e.clientX, y: e.clientY });
    }
    xTo.current(e.clientX);
    yTo.current!(e.clientY);
    gsap.to(preview.current, { rotate: gsap.utils.clamp(-12, 12, e.movementX * 0.8), duration: 0.6, overwrite: "auto" });
  });

  const appFor = (n: string) => apps.find((a) => a.niche === n)!;

  return (
    <div ref={root} className="niches" onMouseMove={onMove} onMouseLeave={() => setActive(null)}>
      {niches.map((n, i) => (
        <TLink href="/apps" key={n} className="niche" onMouseEnter={() => setActive(i)} data-reveal="fade">
          <span className="niche-idx">0{i + 1}</span>
          <span className="niche-name">{n}</span>
          <span className="niche-count">{appFor(n).name} + more</span>
        </TLink>
      ))}
      <div ref={preview} className={`niche-preview${active !== null ? " is-on" : ""}`} aria-hidden>
        {active !== null && <Phone app={appFor(niches[active])} width={150} />}
      </div>
    </div>
  );
}
