"use client";

import type { MouseEvent } from "react";
import { values } from "@/lib/data";

const icons = [
  <path key="0" d="M12 21s-7-4.5-9.5-9A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.5 6c-2.5 4.5-9.5 9-9.5 9z" />,
  <path key="1" d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8" />,
  <path key="2" d="M12 2l3 7 7 .6-5.3 4.6L18.4 21 12 17.3 5.6 21l1.7-6.8L2 9.6 9 9z" />,
  <path key="3" d="M3 3v18h18M7 15l4-4 3 3 6-6" />,
];

export default function Values() {
  const spot = (e: MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return (
    <div className="values">
      {values.map((v, i) => (
        <article key={v.title} className="value" onMouseMove={spot} data-reveal data-delay={(i % 2) * 0.1}>
          <span className="value-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              {icons[i]}
            </svg>
          </span>
          <div>
            <h3 className="h-3">{v.title}</h3>
            <p>{v.text}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
