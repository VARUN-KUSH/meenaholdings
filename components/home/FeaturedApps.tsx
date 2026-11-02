"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { apps } from "@/lib/data";
import Phone from "../Phone";
import TLink from "../TLink";
import { Arrow } from "../Icons";

const featured = apps.slice(0, 6);

export default function FeaturedApps() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 861px) and (prefers-reduced-motion: no-preference)", () => {
        const distance = () => track.current!.scrollWidth - window.innerWidth;
        const tween = gsap.to(track.current, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
        gsap.to(".h-progress i", {
          scaleX: 1, ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: () => `+=${distance()}`, scrub: true },
        });
        // Each phone straightens up as its slide crosses the viewport
        gsap.utils.toArray<HTMLElement>(".app-slide").forEach((slide) => {
          gsap.fromTo(
            slide.querySelector(".phone"),
            { rotate: -14, yPercent: 30 },
            {
              rotate: 4, yPercent: 8, ease: "none",
              scrollTrigger: { trigger: slide, containerAnimation: tween, start: "left right", end: "right left", scrub: true },
            }
          );
          gsap.from(slide.querySelector("h3"), {
            xPercent: 20, opacity: 0, ease: "none",
            scrollTrigger: { trigger: slide, containerAnimation: tween, start: "left right", end: "left 40%", scrub: true },
          });
        });
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} className="featured">
      <div className="container">
        <div className="section-head">
          <div>
            <span className="eyebrow">Featured apps</span>
            <h2 className="h-1" data-split="scroll" style={{ marginTop: 20 }}>
              Made with <span className="serif">care</span>, loved by millions.
            </h2>
          </div>
          <TLink href="/apps" className="btn btn-ghost" data-magnetic>
            <span>All apps</span>
            <span><Arrow /></span>
          </TLink>
        </div>
      </div>
      <div className="h-scroll">
        <div ref={track} className="h-track">
          {featured.map((app, i) => (
            <TLink href="/apps" key={app.id} className="app-slide" style={{ ["--c" as string]: app.color }} data-cursor="Explore">
              <span className="app-slide-index">0{i + 1} / 0{featured.length}</span>
              <div className="app-slide-info">
                <div>
                  <span className="tag">{app.niche}</span>
                  <h3>{app.name}</h3>
                  <p>{app.tagline} {app.description}</p>
                </div>
                <div className="app-meta">
                  <div><b>{app.downloads}</b><span>Downloads</span></div>
                  <div><b>{app.rating}★</b><span>Rating</span></div>
                  <div><b>{app.launched}</b><span>Launched</span></div>
                </div>
              </div>
              <div className="app-slide-visual">
                <Phone app={app} />
              </div>
            </TLink>
          ))}
        </div>
      </div>
      <div className="h-progress"><i /></div>
    </section>
  );
}
