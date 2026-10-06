import "./talks.css";
import { Icon } from "@/components/icons/icons";

export function Talks() {
  return (
    <section id="talks" className="talks-section container">
      <div className="section-heading">
        <div>
          <div className="eyebrow">
            <span className="section-marker">03</span> ACADEMIC PRESENTATIONS
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
          <span className="eyebrow">SEMINAR TALK</span>
          <h3>Lebanese Math Day 2026</h3>
          <p>
            I presented the result of my paper on the period collapse of Markov
            triangles.
          </p>
        </div>
        <span className="circle-arrow">
          <Icon name="arrow" size={24} />
        </span>
      </a>
      <a
        className="talk-row"
        target="_blank"
        rel="noreferrer"
      >
        <div className="talk-date">
          <span>OCT</span>
          <strong>29</strong>
          <span>2024</span>
        </div>
        <div className="talk-copy">
          <span className="eyebrow">SEMINAR TALK</span>
          <h3>Oberseminar Symplectic Geometry</h3>
          <p>
            I gave an introduction to Hofer geometry and its application to the rigidity of the Poisson bracket.
          </p>
        </div>
      </a>
    </section>
  );
}
