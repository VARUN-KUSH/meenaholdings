import type { Metadata } from "next";
import ContactForm from "@/components/pages/ContactForm";

export const metadata: Metadata = { title: "Contact", description: "Get in touch with meenaholdings." };

export default function ContactPage() {
  return (
    <>
      <section className="page-hero" style={{ paddingBottom: 60 }}>
        <div className="hero-bg" aria-hidden>
          <div className="blob blob-1" style={{ opacity: 0.3 }} />
          <div className="blob blob-2" />
        </div>
        <div className="container">
          <span className="eyebrow" data-reveal="fade">Contact</span>
          <h1 className="h-display" data-split="load">
            Let&apos;s <span className="serif accent">talk.</span>
          </h1>
        </div>
      </section>
      <section style={{ paddingBottom: 160 }}>
        <div className="container contact-grid">
          <div className="contact-info" data-reveal>
            <p className="lead">
              Partnerships, acquisitions, press or just a great idea — we read every message and reply within two working days.
            </p>
            <div>
              <h4>General</h4>
              <a className="big" href="mailto:hello@meenaholdings.com">hello@meenaholdings.com</a>
            </div>
            <div>
              <h4>Careers</h4>
              <a className="big" href="mailto:careers@meenaholdings.com">careers@meenaholdings.com</a>
            </div>
            <div>
              <h4>App support</h4>
              <a className="big" href="mailto:support@meenaholdings.com">support@meenaholdings.com</a>
            </div>
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
