import "./personal-details.css";
import type { CSSProperties } from "react";
import profile from "@/data/profile.json";

export function PersonalDetails() {
  return (
    <section className="details-section">
      <div className="container details-grid">
        <div id="skills-hobbies">
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
                        } as CSSProperties
                      }
                    />
                  ))}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div id="languages">
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
          <h2>
            General Khalil
            <br />
            Kanaan Award
          </h2>
          <p>{profile.awards[0].summary}</p>
        </div>
      </div>
    </section>
  );
}
