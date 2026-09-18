import Link from "next/link";
import { Icon } from "./icons";
export function Footer() {
  return <footer className="site-footer container"><div><Link className="footer-name" href="/">Marc Fares<span>.</span></Link><p>Mathematics. A continuing exploration.</p></div><div className="footer-links"><Link href="/archive">Content archive <Icon name="arrow" size={13} /></Link><a href="https://orcid.org/0009-0006-3976-4747" target="_blank" rel="noreferrer">ORCID <Icon name="arrow" size={13} /></a><a href="mailto:me@mjfares.com">Email <Icon name="arrow" size={13} /></a></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Marc Fares</span><a href="https://creativecommons.org/licenses/by-nc-nd/4.0/" target="_blank" rel="noreferrer">CC BY-NC-ND 4.0</a><a href="#top">Back to top ↑</a></div></footer>;
}
