import type { Metadata } from "next";
import Values from "@/components/pages/Values";
import Timeline from "@/components/pages/Timeline";
import Marquee from "@/components/Marquee";
import Cta from "@/components/home/Cta";
import { stats, team } from "@/lib/data";

export const metadata: Metadata = { title: "Studio", description: "The people, principles and story behind meenaholdings." };

export default function StudioPage() {
  return (
    <>
      <section className="page-hero">
        <div className="hero-bg" aria-hidden>
          <div className="blob blob-1" />
        </div>
        <div className="container">
          <span className="eyebrow" data-reveal="fade">About the studio</span>
          <h1 className="h-display" data-split="load">
            Small teams.
            <br />
            <span className="serif accent">Big</span> ambitions.
          </h1>
          <p className="lead" data-reveal data-delay="0.3">
            meenaholdings is a home for people who love building products. We run a portfolio of apps, each owned by a
            focused squad with the freedom to move fast and the support of a whole studio behind them.
          </p>
        </div>
      </section>

      <Marquee items={["Curious", "Craft-obsessed", "Data-led", "User-first", "Kind"]} light />

      <section className="section">
        <div className="container">
          <div className="intro-grid">
            <span className="eyebrow">Our mission</span>
            <p className="intro-text" data-words>
              To build the most useful app in every niche we enter — and to prove that a studio of small, independent teams
              can outbuild companies a hundred times our size.
            </p>
          </div>
          <div className="stats">
            {stats.map((s, i) => (
              <div className="stat" key={s.label} data-reveal data-delay={i * 0.08}>
                <div className="stat-num">
                  <span data-count={s.value} data-decimals={s.decimals ?? 0}>{s.value}</span>
                  <sup>{s.suffix}</sup>
                </div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">What we value</span>
              <h2 className="h-1" data-split="scroll" style={{ marginTop: 20 }}>
                Principles we <span className="serif">actually</span> use.
              </h2>
            </div>
          </div>
          <Values />
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">Our story</span>
              <h2 className="h-1" data-split="scroll" style={{ marginTop: 20 }}>
                How we <span className="serif">got</span> here.
              </h2>
            </div>
          </div>
          <Timeline />
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">The team</span>
              <h2 className="h-1" data-split="scroll" style={{ marginTop: 20 }}>
                The people <span className="serif">behind</span> the pixels.
              </h2>
            </div>
          </div>
          <div className="team">
            {team.map((m, i) => (
              <article className="member" key={m.name} data-reveal data-delay={(i % 4) * 0.08}>
                <div className="member-photo" style={{ background: m.color }}>
                  <span>{m.initials}</span>
                </div>
                <div className="member-info">
                  <b>{m.name}</b>
                  <div>{m.role}</div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Cta title={<>Come build <span className="serif accent">with us.</span></>} sub="We're hiring" />
    </>
  );
}
