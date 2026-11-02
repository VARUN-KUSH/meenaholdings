"use client";

import { useLayoutEffect, useRef, useState, type MouseEvent } from "react";
import { gsap, Flip, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { apps, niches } from "@/lib/data";
import Phone from "../Phone";
import { Apple, Play, Star } from "../Icons";

export default function AppsGrid() {
  const root = useRef<HTMLDivElement>(null);
  const flipState = useRef<Flip.FlipState>(null);
  const [filter, setFilter] = useState("All");

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.from(".app-card", {
        y: 80, opacity: 0, duration: 1.2, ease: "expo.out", stagger: { each: 0.08 },
        scrollTrigger: { trigger: ".apps-grid", start: "top 85%", once: true },
      });
    },
    { scope: root }
  );

  useLayoutEffect(() => {
    if (!flipState.current) return;
    Flip.from(flipState.current, {
      duration: 0.8,
      ease: "expo.out",
      scale: true,
      absolute: true,
      stagger: 0.03,
      onEnter: (els) => gsap.fromTo(els, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.7, ease: "expo.out" }),
    });
    flipState.current = null;
  }, [filter]);

  const choose = (f: string) => {
    if (f === filter) return;
    if (!prefersReducedMotion()) flipState.current = Flip.getState(root.current!.querySelectorAll(".app-card"));
    setFilter(f);
  };

  const tilt = (e: MouseEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    gsap.to(el, { rotateY: x * 10, rotateX: -y * 10, transformPerspective: 900, duration: 0.6, ease: "power3.out" });
  };
  const untilt = (e: MouseEvent<HTMLElement>) =>
    gsap.to(e.currentTarget, { rotateX: 0, rotateY: 0, duration: 1, ease: "elastic.out(1, 0.5)" });

  return (
    <div ref={root}>
      <div className="filters" role="group" aria-label="Filter by niche">
        {["All", ...niches].map((n) => (
          <button key={n} className={`filter${filter === n ? " is-active" : ""}`} onClick={() => choose(n)} aria-pressed={filter === n}>
            {n}
            <sup>{n === "All" ? apps.length : apps.filter((a) => a.niche === n).length}</sup>
          </button>
        ))}
      </div>
      <div className="apps-grid">
        {apps.map((app) => (
          <article
            key={app.id}
            className={`app-card${filter !== "All" && app.niche !== filter ? " is-hidden" : ""}`}
            style={{ ["--c" as string]: app.color }}
            onMouseMove={tilt}
            onMouseLeave={untilt}
          >
            <div className="app-card-visual">
              <Phone app={app} />
            </div>
            <div className="app-card-body">
              <div className="app-card-top">
                <span className="app-icon">{app.name[0]}</span>
                <div>
                  <h3>{app.name}</h3>
                  <span className="niche-tag">{app.niche}</span>
                </div>
              </div>
              <p>{app.description}</p>
              <div className="app-card-foot">
                <span className="rating"><Star /> {app.rating} · {app.downloads} downloads</span>
                <span className="store-links">
                  <a href="#" aria-label={`${app.name} on the App Store`}><Apple /></a>
                  <a href="#" aria-label={`${app.name} on Google Play`}><Play /></a>
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
