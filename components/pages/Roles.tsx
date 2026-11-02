"use client";

import { useRef, useState } from "react";
import { roles } from "@/lib/data";

export default function Roles() {
  const [open, setOpen] = useState<number | null>(null);
  const bodies = useRef<(HTMLDivElement | null)[]>([]);

  return (
    <div className="roles">
      {roles.map((r, i) => {
        const isOpen = open === i;
        const h = isOpen ? bodies.current[i]?.scrollHeight ?? 0 : 0;
        return (
          <div key={r.title} className={`role${isOpen ? " is-open" : ""}`} data-reveal data-delay={i * 0.05}>
            <button className="role-head" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? null : i)}>
              <span className="role-title">{r.title}</span>
              <span>{r.team}</span>
              <span>{r.location}</span>
              <span className="role-plus" aria-hidden />
            </button>
            <div className="role-body" style={{ height: h }} ref={(el) => { bodies.current[i] = el; }}>
              <div className="role-body-inner">
                <div>
                  <h5>The role</h5>
                  <p>{r.about}</p>
                  <a
                    className="btn btn-primary"
                    style={{ marginTop: 24 }}
                    href={`mailto:careers@meenaholdings.com?subject=${encodeURIComponent(`Application: ${r.title}`)}`}
                  >
                    <span>Apply now</span>
                  </a>
                </div>
                <div>
                  <h5>We&apos;re looking for</h5>
                  <ul>{r.looking.map((l) => <li key={l}>{l}</li>)}</ul>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
