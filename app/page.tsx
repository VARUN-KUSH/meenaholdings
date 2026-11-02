import Hero from "@/components/home/Hero";
import FeaturedApps from "@/components/home/FeaturedApps";
import Process from "@/components/home/Process";
import Niches from "@/components/home/Niches";
import Cta from "@/components/home/Cta";
import Marquee from "@/components/Marquee";
import { niches, stats } from "@/lib/data";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee items={niches} />

      <section className="section">
        <div className="container">
          <div className="intro-grid">
            <span className="eyebrow">Who we are</span>
            <p className="intro-text" data-words>
              We&apos;re a studio of designers, engineers and growth nerds. We find niches where people deserve better tools,
              then build the app we wish existed — and keep making it better every week.
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

      <FeaturedApps />

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">How we build</span>
              <h2 className="h-1" data-split="scroll" style={{ marginTop: 20 }}>
                From hunch to <span className="serif">hit</span>, on repeat.
              </h2>
            </div>
            <p className="lead" data-reveal>
              A repeatable playbook that lets small teams launch quickly, learn honestly and scale the apps people love.
            </p>
          </div>
          <Process />
        </div>
      </section>

      <Marquee items={["Design", "Engineering", "Growth", "Data", "Craft"]} light reverse />

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">Our niches</span>
              <h2 className="h-1" data-split="scroll" style={{ marginTop: 20 }}>
                Many niches. <span className="serif">One</span> standard.
              </h2>
            </div>
          </div>
          <Niches />
        </div>
      </section>

      <section className="section manifesto">
        <div className="container">
          <span className="eyebrow" style={{ marginBottom: 40 }}>Our belief</span>
          <p data-words>
            The best apps feel small, personal and made just for you. So that&apos;s exactly how we build them.
          </p>
        </div>
      </section>

      <Cta />
    </>
  );
}
