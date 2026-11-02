"use client";

import { useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger, useGSAP, whenReady, prefersReducedMotion } from "@/lib/gsap";

/** Wrap each text node's words (or chars) in masked spans, keeping inline elements like <em>/<br>. */
function split(el: HTMLElement, mode: "words" | "chars") {
  if (el.dataset.splitDone) return;
  el.dataset.splitDone = "1";
  const walk = (node: Node) => {
    Array.from(node.childNodes).forEach((child) => {
      if (child.nodeType === Node.TEXT_NODE) {
        const frag = document.createDocumentFragment();
        (child.textContent || "").split(/(\s+)/).forEach((part) => {
          if (!part) return;
          if (/^\s+$/.test(part)) return frag.append(" ");
          if (mode === "chars") {
            [...part].forEach((c) => {
              const s = document.createElement("span");
              s.className = "ch";
              s.textContent = c;
              frag.append(s);
            });
          } else {
            const w = document.createElement("span");
            w.className = "w";
            const inner = document.createElement("span");
            inner.textContent = part;
            w.append(inner);
            frag.append(w);
          }
        });
        child.replaceWith(frag);
      } else if (child.nodeType === Node.ELEMENT_NODE && (child as Element).tagName !== "BR") {
        walk(child);
      }
    });
  };
  walk(el);
}

/**
 * Declarative scroll animations for a page. Opt in with data attributes:
 *  data-split="load|scroll"  masked word-by-word reveal
 *  data-reveal[="fade|scale"] fade/slide in on scroll (data-delay for offset)
 *  data-count="25"           count up (data-decimals)
 *  data-words                words light up as you scroll (scrubbed)
 *  data-letters              chars rise in on scroll
 *  data-parallax="0.2"       scrubbed vertical drift
 *  data-magnetic             element follows the cursor slightly
 */
export default function Animations({ children }: { children: ReactNode }) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current!;
      const q = <T extends HTMLElement>(s: string) => Array.from(root.querySelectorAll<T>(s));

      if (prefersReducedMotion()) {
        q("[data-split]").forEach((el) => el.classList.add("is-split"));
        return;
      }

      // Masked word reveals
      q("[data-split]").forEach((el) => {
        split(el, "words");
        el.classList.add("is-split");
        const inners = el.querySelectorAll(".w > span");
        gsap.set(inners, { yPercent: 115 });
        const play = () =>
          gsap.to(inners, { yPercent: 0, duration: 1.2, stagger: 0.045, ease: "expo.out", delay: Number(el.dataset.delay || 0) });
        if (el.dataset.split === "load") whenReady().then(play);
        else ScrollTrigger.create({ trigger: el, start: "top 88%", once: true, onEnter: play });
      });

      // Generic reveals
      q("[data-reveal]").forEach((el) => {
        const type = el.dataset.reveal;
        const from = type === "scale" ? { scale: 0.92 } : type === "fade" ? {} : { y: 40 };
        gsap.fromTo(
          el,
          { opacity: 0, ...from },
          {
            opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "expo.out", delay: Number(el.dataset.delay || 0),
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
          }
        );
      });

      // Count-ups
      q("[data-count]").forEach((el) => {
        const target = Number(el.dataset.count);
        const decimals = Number(el.dataset.decimals || 0);
        const obj = { v: 0 };
        el.textContent = (0).toFixed(decimals);
        gsap.to(obj, {
          v: target, duration: 2.2, ease: "power3.out",
          onUpdate: () => (el.textContent = obj.v.toFixed(decimals)),
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
        });
      });

      // Scroll-scrubbed word highlight
      q("[data-words]").forEach((el) => {
        if (!el.dataset.splitDone) {
          el.dataset.splitDone = "1";
          el.innerHTML = el.innerHTML
            .split(/(<[^>]+>|\s+)/)
            .map((t) => (!t || t.startsWith("<") || /^\s+$/.test(t) ? t : `<span class="word">${t}</span>`))
            .join("");
        }
        gsap.to(el.querySelectorAll(".word"), {
          opacity: 1, stagger: 0.1, ease: "none",
          scrollTrigger: { trigger: el, start: "top 80%", end: "bottom 45%", scrub: true },
        });
      });

      // Letter rise
      q("[data-letters]").forEach((el) => {
        split(el, "chars");
        gsap.from(el.querySelectorAll(".ch"), {
          yPercent: 100, opacity: 0, rotate: 8, duration: 1.2, stagger: 0.04, ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 95%", once: true },
        });
      });

      // Parallax
      q("[data-parallax]").forEach((el) => {
        const speed = Number(el.dataset.parallax || 0.2);
        gsap.fromTo(el, { yPercent: -speed * 100 }, {
          yPercent: speed * 100, ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
        });
      });

      // Magnetic
      const cleanups: (() => void)[] = [];
      if (window.matchMedia("(hover: hover)").matches) {
        q("[data-magnetic]").forEach((el) => {
          const xTo = gsap.quickTo(el, "x", { duration: 0.6, ease: "elastic.out(1, 0.4)" });
          const yTo = gsap.quickTo(el, "y", { duration: 0.6, ease: "elastic.out(1, 0.4)" });
          const move = (e: MouseEvent) => {
            const r = el.getBoundingClientRect();
            xTo((e.clientX - r.left - r.width / 2) * 0.35);
            yTo((e.clientY - r.top - r.height / 2) * 0.35);
          };
          const leave = () => { xTo(0); yTo(0); };
          el.addEventListener("mousemove", move);
          el.addEventListener("mouseleave", leave);
          cleanups.push(() => {
            el.removeEventListener("mousemove", move);
            el.removeEventListener("mouseleave", leave);
          });
        });
      }

      // Recalculate once fonts settle
      document.fonts?.ready.then(() => ScrollTrigger.refresh());
      return () => cleanups.forEach((fn) => fn());
    },
    { scope }
  );

  return <div ref={scope}>{children}</div>;
}
