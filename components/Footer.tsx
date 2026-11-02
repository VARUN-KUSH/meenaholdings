import TLink from "./TLink";
import Newsletter from "./Newsletter";
import { apps } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <h4>Stay in the loop</h4>
            <p className="muted" style={{ maxWidth: "36ch" }}>
              New launches, behind-the-scenes and open roles. One email a month, no spam.
            </p>
            <Newsletter />
          </div>
          <div>
            <h4>Studio</h4>
            <ul>
              <li><TLink href="/apps">Our apps</TLink></li>
              <li><TLink href="/studio">About</TLink></li>
              <li><TLink href="/careers">Careers</TLink></li>
              <li><TLink href="/contact">Contact</TLink></li>
            </ul>
          </div>
          <div>
            <h4>Apps</h4>
            <ul>
              {apps.slice(0, 5).map((a) => (
                <li key={a.id}><TLink href="/apps">{a.name}</TLink></li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Social</h4>
            <ul>
              <li><a href="#" target="_blank" rel="noreferrer">LinkedIn</a></li>
              <li><a href="#" target="_blank" rel="noreferrer">Instagram</a></li>
              <li><a href="#" target="_blank" rel="noreferrer">X / Twitter</a></li>
              <li><a href="mailto:hello@meenaholdings.com">Email</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-word" data-letters aria-hidden>meenaholdings</div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} meenaholdings. All rights reserved.</span>
          <span>Built for people who live on their phones.</span>
        </div>
      </div>
    </footer>
  );
}
