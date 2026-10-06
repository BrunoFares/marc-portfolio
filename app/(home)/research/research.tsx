import "./research.css";
import profile from "@/data/profile.json";
import { Torus } from "@/components/icons/icons";

export function Research() {
  return (
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
  );
}
