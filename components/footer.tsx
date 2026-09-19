import Link from "next/link";
import { Icon } from "./icons";
export function Footer() {
  return (
    <footer className="site-footer container">
      <div>
        <Link className="footer-name" href="/">
          Marc Fares<span>.</span>
        </Link>
        <p>Mathematics. A continuing exploration.</p>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Marc Fares</span>
        <a
          href="https://creativecommons.org/licenses/by-nc-nd/4.0/"
          target="_blank"
          rel="noreferrer"
        >
          CC BY-NC-ND 4.0
        </a>
        <a href="#top">Back to top ↑</a>
      </div>
    </footer>
  );
}
