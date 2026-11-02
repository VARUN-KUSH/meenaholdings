import type { Metadata } from "next";
import Roles from "@/components/pages/Roles";
import Marquee from "@/components/Marquee";
import Cta from "@/components/home/Cta";
import { perks, roles } from "@/lib/data";

export const metadata: Metadata = { title: "Careers", description: "Join meenaholdings and build apps used by millions." };

export default function CareersPage() {
  return (
    <>
      <section className="page-hero">
        <div className="hero-bg" aria-hidden>
          <div className="blob blob-1" style={{ background: "#3ddc97", opacity: 0.3 }} />
        </div>
        <div className="container">
          <span className="eyebrow" data-reveal="fade">Careers · {roles.length} open roles</span>
          <h1 className="h-display" data-split="load">
            Do the <span className="serif accent">best</span> work of your career.
          </h1>
          <p className="lead" data-reveal data-delay="0.3">
            Join a studio where your ideas ship in weeks, your work reaches millions, and you own what you build.
          </p>
        </div>
      </section>

      <Marquee items={["Ship fast", "Own it", "Stay curious", "Sweat the details"]} light />

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">Life at meenaholdings</span>
              <h2 className="h-1" data-split="scroll" style={{ marginTop: 20 }}>
                Perks that <span className="serif">matter.</span>
              </h2>
            </div>
          </div>
          <div className="perks" data-reveal>
            {perks.map((p) => (
              <div className="perk" key={p.title}>
                <span className="perk-emoji" aria-hidden>{p.icon}</span>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">Open roles</span>
              <h2 className="h-1" data-split="scroll" style={{ marginTop: 20 }}>
                Find your <span className="serif">seat.</span>
              </h2>
            </div>
            <p className="lead" data-reveal>
              Don&apos;t see a fit? Send us a note at{" "}
              <a href="mailto:careers@meenaholdings.com" className="accent">careers@meenaholdings.com</a>.
            </p>
          </div>
          <Roles />
        </div>
      </section>

      <Cta title={<>Questions? <span className="serif accent">Ask away.</span></>} />
    </>
  );
}
