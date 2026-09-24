export function Footer() {
  return (
    <footer className="site-footer container">
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
