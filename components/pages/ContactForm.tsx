"use client";

import { useState, type FormEvent } from "react";
import { Arrow } from "../Icons";

const topics = ["Partnership", "Acquire / sell an app", "Press", "Careers", "App support", "Something else"];

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const body = [
      `Name: ${data.get("name")}`,
      `Email: ${data.get("email")}`,
      `Company: ${data.get("company") || "-"}`,
      `Topics: ${data.getAll("topic").join(", ") || "-"}`,
      "",
      String(data.get("message")),
    ].join("\n");
    // No backend yet: hand off to the visitor's mail client. Swap for an API route when ready.
    window.location.href = `mailto:hello@meenaholdings.com?subject=${encodeURIComponent("New enquiry from meenaholdings.com")}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <form className={`form${sent ? " is-sent" : ""}`} onSubmit={submit} data-reveal>
      <div>
        <div className="chips-label">What&apos;s this about?</div>
        <div className="chips">
          {topics.map((t) => (
            <label className="chip" key={t}>
              <input type="checkbox" name="topic" value={t} />
              <span>{t}</span>
            </label>
          ))}
        </div>
      </div>
      <div className="field">
        <input id="name" name="name" placeholder=" " required />
        <label htmlFor="name">Your name</label>
      </div>
      <div className="field">
        <input id="email" name="email" type="email" placeholder=" " required />
        <label htmlFor="email">Email</label>
      </div>
      <div className="field">
        <input id="company" name="company" placeholder=" " />
        <label htmlFor="company">Company (optional)</label>
      </div>
      <div className="field">
        <textarea id="message" name="message" rows={4} placeholder=" " required />
        <label htmlFor="message">Tell us a bit more</label>
      </div>
      <div>
        <button type="submit" className="btn btn-primary" data-magnetic>
          <span>Send message</span>
          <span><Arrow /></span>
        </button>
      </div>
      <div className="form-success" role="status">Thanks! Your email app should open with your message ready to send.</div>
    </form>
  );
}
