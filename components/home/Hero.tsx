"use client";

import { useRef } from "react";
import { gsap, useGSAP, whenReady, prefersReducedMotion } from "@/lib/gsap";
import { apps, stats } from "@/lib/data";
import Phone from "../Phone";
import TLink from "../TLink";
import { Arrow } from "../Icons";

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    (_, contextSafe) => {
      if (prefersReducedMotion()) return;
      const phones = gsap.utils.toArray<HTMLElement>(".hero-phones .phone");
      gsap.set(phones, { yPercent: 120, opacity: 0 });
      whenReady().then(() => {
        gsap.to(phones, { yPercent: 0, opacity: 1, duration: 1.6, stagger: 0.12, ease: "expo.out", delay: 0.3 });
        gsap.from(".hero-fade", { y: 30, opacity: 0, duration: 1.2, stagger: 0.1, ease: "expo.out", delay: 0.6 });
      });

      // Phones drift away on scroll
      gsap.to(".hero-phones", {
        y: -160, ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(".hero-title", {
        yPercent: 30, opacity: 0.2, ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });

      // Mouse parallax, each phone at a different depth
      const movers = phones.map((p, i) => ({
        x: gsap.quickTo(p, "x", { duration: 1.2, ease: "power3" }),
        y: gsap.quickTo(p, "y", { duration: 1.2, ease: "power3" }),
        depth: [40, 70, 25][i] ?? 30,
      }));
      const blobs = gsap.utils.toArray<HTMLElement>(".blob");
      const onMove = contextSafe!((e: MouseEvent) => {
        const nx = e.clientX / window.innerWidth - 0.5;
        const ny = e.clientY / window.innerHeight - 0.5;
        movers.forEach((m) => { m.x(nx * m.depth); m.y(ny * m.depth); });
        gsap.to(blobs, { x: nx * 60, y: ny * 60, duration: 2, ease: "power2.out", overwrite: "auto" });
      });
      window.addEventListener("mousemove", onMove);
      return () => window.removeEventListener("mousemove", onMove);
    },
    { scope: root }
  );

  return (
    <section ref={root} className="hero">
      <div className="hero-bg" aria-hidden>
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
      </div>
      <div className="hero-grid" aria-hidden />
      <div className="hero-phones" aria-hidden>
        <Phone app={apps[3]} width={200} />
        <Phone app={apps[0]} width={230} />
        <Phone app={apps[2]} width={170} />
      </div>
      <div className="container">
        <span className="eyebrow hero-fade">Independent app studio · {stats[0].value}+ apps live</span>
        <h1 className="h-display hero-title" data-split="load" style={{ marginTop: 28 }}>
          We build apps
          <br />
          people <span className="serif">can&apos;t</span>
          <br />
          put down.
        </h1>
        <div className="hero-top">
          <p className="lead hero-fade">
            meenaholdings designs, launches and scales mobile apps across health, finance, productivity, education and more —
            each one crafted by a small team obsessed with a single niche.
          </p>
          <div className="hero-actions hero-fade">
            <TLink href="/apps" className="btn btn-primary" data-magnetic>
              <span>Explore our apps</span>
              <span><Arrow /></span>
            </TLink>
            <TLink href="/careers" className="btn btn-ghost" data-magnetic>
              <span>Join the studio</span>
            </TLink>
          </div>
        </div>
        <div className="scroll-hint hero-fade" style={{ marginTop: 56 }}>
          <span className="mouse" /> Scroll to explore
        </div>
      </div>
    </section>
  );
}
