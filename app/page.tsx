import Image from "next/image";
import Link from "next/link";
import profile from "@/data/profile.json";
import { Icon, Torus } from "@/components/icons";
import { Publication } from "@/components/publication";

export default function Home() {
  return (
    <main id="main">
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

      <section id="research" className="research-section">
        <div className="container research-inner">
          <div className="research-intro">
            <div className="eyebrow">
              <span className="section-marker">01</span> RESEARCH INTERESTS
            </div>
            <h2>
              The mathematics
              <br />
              I like to
              <em> explore.</em>
            </h2>
            <Torus className="research-torus" />
          </div>
          <div className="interest-list">
            {profile.interests.map((interest, i) => (
              <div className="interest" key={interest}>
                <h3>{interest}</h3>
                <span className="interest-symbol" aria-hidden="true">
                  {/* TODO: fix the Z exponent n later */}
                  {["ω", "Δ", "ξ", "∂", "ℤ"][i]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="papers" className="section container">
        <div className="section-heading">
          <div>
            <div className="eyebrow">
              <span className="section-marker">02</span> SELECTED WORK
            </div>
            <h2>
              Publications
            </h2>
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

      <section id="talks" className="talks-section container">
        <div className="section-heading">
          <div>
            <div className="eyebrow">
              <span className="section-marker">03</span> SHARING IDEAS
            </div>
            <h2>Talks</h2>
          </div>
        </div>
        <a
          className="talk-row"
          href="https://lebanesemathday-2026.netlify.app/"
          target="_blank"
          rel="noreferrer"
        >
          <div className="talk-date">
            <span>JUL</span>
            <strong>25</strong>
            <span>2026</span>
          </div>
          <div className="talk-copy">
            <span className="eyebrow">CONFERENCE TALK</span>
            <h3>Lebanese Math Day 2026</h3>
            <p>
              I present the result of my paper on the period collapse of Markov
              triangles.
            </p>
          </div>
          <span className="circle-arrow">
            <Icon name="arrow" size={24} />
          </span>
        </a>
      </section>

      <section id="background" className="section container background-section">
        <div className="section-heading">
          <div>
            <div className="eyebrow">
              <span className="section-marker">04</span> THE JOURNEY SO FAR
            </div>
            <h2>Learning. Teaching. Growing.</h2>
          </div>
        </div>
        <div className="background-grid">
          <div>
            <h3 className="column-heading">
              Education <span>01 — 03</span>
            </h3>
            <div className="timeline">
              {profile.education.map((education, i) => (
                <article
                  className={`timeline-item ${i === 0 ? "current" : ""}`}
                  key={education.degree}
                >
                  <span className="timeline-dot" />
                  <p className="timeline-date">
                    {education.start.replace(/\s*-$/, "")} —{" "}
                    {education.end === "present" ? "Present" : education.end}
                  </p>
                  <h4>{education.degree}</h4>
                  <p>{education.institution}</p>
                  {i === 0 && <span className="current-label">CURRENT</span>}
                </article>
              ))}
            </div>
          </div>
          <div>
            <h3 className="column-heading">
              Experience <span>01 — 04</span>
            </h3>
            <div className="experience-list">
              {profile.experience.map((experience) => (
                <article key={experience.org}>
                  <p className="timeline-date">
                    {formatDate(experience.start)} —{" "}
                    {"end" in experience && experience.end
                      ? formatDate(experience.end)
                      : "Present"}
                  </p>
                  <h4>{experience.role}</h4>
                  <p>{experience.org}</p>
                  {experience.summary && (
                    <p className="experience-summary">{experience.summary}</p>
                  )}
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="details-section">
        <div className="container details-grid">
          <div id="skills-hobbies">
            <div className="eyebrow">THE TOOLKIT</div>
            <h2>Technical skills</h2>
            <div className="skill-list">
              {profile.skills[0].items.map((skill) => (
                <div className="skill" key={skill.label}>
                  <span>{skill.label}</span>
                  <span
                    className="skill-meter"
                    role="img"
                    aria-label={`${skill.level} out of 5`}
                  >
                    {Array.from({ length: 5 }, (_, i) => (
                      <i
                        key={i}
                        style={
                          {
                            "--fill": `${Math.max(0, Math.min(1, skill.level - i)) * 100}%`,
                          } as React.CSSProperties
                        }
                      />
                    ))}
                  </span>
                </div>
              ))}
            </div>
            <p className="meter-caption">Proficiency on a five-point scale</p>
          </div>
          <div id="languages">
            <div className="eyebrow">ACROSS BORDERS</div>
            <h2>Languages</h2>
            <div className="language-list">
              {profile.languages.map((language, i) => (
                <div key={language.name}>
                  <span
                    className="language-native"
                    lang={["ar", "fr", "en", "de"][i]}
                  >
                    {["ع", "Fr", "En", "De"][i]}
                  </span>
                  <h3>{language.name}</h3>
                  <span title={`${language.level} out of 5`}>
                    {language.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div id="awards" className="award-panel">
            <span className="award-symbol" aria-hidden="true">
              ✳
            </span>
            <div className="eyebrow">RECOGNITION · 2023</div>
            <h2>
              General Khalil
              <br />
              Kanaan Award
            </h2>
            <p>{profile.awards[0].summary}</p>
            <span className="award-byline">
              Awarded by {profile.awards[0].awarder}
            </span>
          </div>
        </div>
      </section>

      <section className="archive-teaser container">
        <div>
          <span className="eyebrow">NOTES & MORE</span>
          <h2>A place for everything else.</h2>
          <p>
            Explore the original blog, projects, number theory notes, and
            template collection.
          </p>
        </div>
        <Link className="button button-secondary" href="/archive">
          Browse the archive <Icon name="arrow" size={17} />
        </Link>
      </section>

      <section id="contact" className="contact-section container">
        <div className="eyebrow">
          <span className="status-dot" /> LET’S CONNECT
        </div>
        <div className="contact-main">
          <h2>
            Good mathematics starts
            <br />
            with a <em>conversation.</em>
          </h2>
          <a
            className="contact-arrow"
            href="mailto:me@mjfares.com"
            aria-label="Email Marc Fares"
          >
            <Icon name="arrow" size={42} />
          </a>
        </div>
        <a className="contact-email" href="mailto:me@mjfares.com">
          me@mjfares.com
        </a>
      </section>
    </main>
  );
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(date));
}
