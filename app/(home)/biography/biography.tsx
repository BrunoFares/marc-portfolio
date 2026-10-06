import "./biography.css";
import Image from "next/image";
import { Icon } from "@/components/icons/icons";

export function Biography() {
  return (
    <section id="bio" className="hero container">
      <div className="hero-copy">
        <div className="eyebrow">
          <span className="status-dot" /> PHD STUDENT IN MATHEMATICS
        </div>
        <h1>
          Marc Fares<span>.</span>
        </h1>
        <p className="hero-description">
          I’m a PhD student in symplectic geometry at{" "}
          <a
            href="https://www.unine.ch/math"
            target="_blank"
            rel="noreferrer"
          >
            Université de Neuchâtel
          </a>.
        </p>
        <div className="hero-buttons">
          <a className="button button-primary" href="#research">
            Explore my research <Icon name="arrow" size={17} />
          </a>
          <a
            className="button button-secondary"
            href="/uploads/resume.pdf"
            download="Marc-Fares-CV.pdf"
          >
            Download CV <Icon name="download" size={17} />
          </a>
        </div>
        <div className="hero-bottom">
          <a
            href="https://www.linkedin.com/in/marc-j-fares/"
            target="_blank"
            rel="noreferrer"
          >
            <Image
              src="/images/linkedin-logo.png"
              alt=""
              width={12}
              height={12}
            />
            LinkedIn{" "}
            <Icon name="arrow" size={12} />
          </a>
          <a
            href="https://orcid.org/0009-0006-3976-4747"
            target="_blank"
            rel="noreferrer"
            id="orcid"
          >
            <span className="orcid-icon">iD</span> ORCID{" "}
            <Icon name="arrow" size={12} />
          </a>
        </div>
      </div>
    </section>
  );
}
