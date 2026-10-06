import "./background.css";
import profile from "@/data/profile.json";

export function Background() {
  return (
    <section id="background" className="section container background-section">
      <div className="section-heading">
        <div>
          <div className="eyebrow">
            <span className="section-marker">04</span> ACADEMIC JOURNEY
          </div>
          <h2>Timeline</h2>
        </div>
      </div>
      <div className="background-grid">
        <div>
          <h3 className="column-heading">
            Education
          </h3>
          <div className="timeline">
            {profile.education.map((education, i) => (
              <article
                className={["timeline-item", (i === 0 ? "current" : "")].join(" ")}
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
            Experience
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
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(date));
}
