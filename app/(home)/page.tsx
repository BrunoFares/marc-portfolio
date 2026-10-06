import "./home.css";
import { Icon } from "@/components/icons/icons";
import { Publication } from "@/components/publication/publication";
import { ArchiveBrowser } from "@/components/archive-browser/archive-browser";
import { archiveIndex } from "@/lib/archive";
import { Biography } from "./biography/biography";
import { Research } from "./research/research";
import { Talks } from "./talks/talks";
import { Background } from "./background/background";
import { PersonalDetails } from "./personal-details/personal-details";

export default function HomePage() {
  return (
    <main id="main">
      <Biography />

      <Research />

      <section id="papers" className="section container">
        <div className="section-heading">
          <div>
            <div className="eyebrow">
              <span className="section-marker">02</span> SELECTED WORKS
            </div>
            <h2>Publications</h2>
          </div>
          <a
            className="text-link"
            href="https://arxiv.org/search/math?query=Fares%2C+Marc&searchtype=author&abstracts=show&order=-announced_date_first&size=50"
            target="_blank"
            rel="noreferrer"
          >
            View on arXiv <Icon name="arrow" size={15} />
          </a>
        </div>
        <Publication />
      </section>

      <Talks />

      <Background />

      <PersonalDetails />

      <section id="extracurriculars" className="archive-teaser container">
        <span className="eyebrow">NOTES & MORE</span>
        <h2>A place for everything else.</h2>
        <p>
          Explore the original blog, projects, number theory notes, and
          template collection.
        </p>
      </section>
      <ArchiveBrowser entries={archiveIndex} />

      <section id="contact" className="contact-section container">
        <div className="eyebrow">
          <span className="status-dot" /> CONTACT
        </div>
        <div className="contact-main">
          <h2>
            Get in
            <em> Touch!</em>
          </h2>
          <a
            className="contact-arrow"
            href="mailto:me@mjfares.com"
            aria-label="Email Marc Fares"
          >
            <Icon name="arrow" size={42} />
          </a>
        </div>
      </section>
    </main>
  );
}
