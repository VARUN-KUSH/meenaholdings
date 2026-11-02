"use client";

import { useState } from "react";

export default function Newsletter() {
  const [done, setDone] = useState(false);
  return (
    <form
      className="newsletter"
      onSubmit={(e) => {
        e.preventDefault();
        // TODO: connect to your email provider
        setDone(true);
      }}
    >
      <input type="email" required placeholder={done ? "Thanks — you're on the list!" : "Your email"} aria-label="Email address" disabled={done} />
      <button type="submit" disabled={done}>{done ? "✓" : "Subscribe"}</button>
    </form>
  );
}
