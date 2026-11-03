import type {
  Education,
  Experience,
  Locale,
  Resume,
} from "../../src/data/resume.schema";

const LABELS = {
  es: {
    profile: "Perfil",
    experience: "Experiencia profesional",
    education: "Formación",
    skills: "Tecnologías",
    languages: "Idiomas",
    client: "Cliente",
    project: "Proyecto",
    tech: "Tecnologías",
    present: "Actualidad",
  },
  en: {
    profile: "Profile",
    experience: "Professional experience",
    education: "Education",
    skills: "Technologies",
    languages: "Languages",
    client: "Client",
    project: "Project",
    tech: "Technologies",
    present: "Present",
  },
} as const;

const BULLET_LIMIT: Record<string, number> = {
  darwoft: 5,
  odea: 4,
};

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[character] ?? character;
  });
}

function formatMonth(value: string, locale: Locale) {
  const [year, month] = value.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, 1));
  return new Intl.DateTimeFormat(locale === "es" ? "es-AR" : "en-US", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  })
    .format(date)
    .replace(".", "");
}

function formatPeriod(job: Experience, locale: Locale) {
  const start = formatMonth(job.start, locale);
  const end = job.end ? formatMonth(job.end, locale) : LABELS[locale].present;
  return `${start} — ${end}`;
}

function formatEducationYears(item: Education) {
  if (item.start && item.end && item.start !== item.end) {
    return `${item.start} — ${item.end}`;
  }
  if (item.end) {
    return item.end;
  }
  if (item.start) {
    return item.start;
  }
  return "";
}

function displayUrl(url: string) {
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

function renderExperience(job: Experience, locale: Locale) {
  const labels = LABELS[locale];
  const limit = BULLET_LIMIT[job.id] ?? 4;
  const bullets = job.bullets[locale].slice(0, limit);
  const client = job.cvOnly
    ? `<p class="client"><strong>${labels.client}:</strong> ${escapeHtml(
        job.cvOnly.client,
      )} · <strong>${labels.project}:</strong> ${escapeHtml(
        job.cvOnly.project,
      )}</p>`
    : "";

  return `
    <article class="job">
      <div class="job-head">
        <div>
          <h3>${escapeHtml(job.company)}</h3>
          <p class="role">${escapeHtml(job.role[locale])}</p>
        </div>
        <span class="period">${escapeHtml(formatPeriod(job, locale))}</span>
      </div>
      ${client}
      <p class="job-desc">${escapeHtml(job.description[locale])}</p>
      <ul>
        ${bullets.map((bullet) => `<li>${escapeHtml(bullet)}</li>`).join("")}
      </ul>
      <p class="tech"><strong>${labels.tech}:</strong> ${job.tech
        .map(escapeHtml)
        .join(" · ")}</p>
    </article>
  `;
}

function renderEducation(item: Education, locale: Locale) {
  const years = formatEducationYears(item);
  return `
    <div class="edu">
      <div class="edu-head">
        <h3>${escapeHtml(item.institution)}</h3>
        ${years ? `<span class="period">${years}</span>` : ""}
      </div>
      <p>${escapeHtml(item.degree[locale])}</p>
      ${
        item.details
          ? `<p class="muted">${escapeHtml(item.details[locale])}</p>`
          : ""
      }
    </div>
  `;
}

export function renderCvHtml(resume: Resume, locale: Locale) {
  const labels = LABELS[locale];
  const translation = resume.translations[locale];
  const personal = resume.personal;
  const education = resume.education;

  return `<!doctype html>
<html lang="${locale}">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(personal.name)} — CV ${locale.toUpperCase()}</title>
    <style>
      @page { size: A4; margin: 0; }
      * { box-sizing: border-box; }
      html, body { margin: 0; padding: 0; background: #ffffff; color: #111827; }
      body {
        font-family: "Segoe UI", Arial, Helvetica, sans-serif;
        font-size: 8.6pt;
        line-height: 1.38;
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }
      .page { padding: 12mm 14mm 11mm; }
      header {
        display: flex;
        justify-content: space-between;
        gap: 24px;
        border-bottom: 1.5px solid #0f766e;
        padding-bottom: 9px;
        margin-bottom: 11px;
      }
      h1 {
        margin: 0;
        font-size: 24pt;
        line-height: 1;
        letter-spacing: -0.02em;
        color: #0b1220;
      }
      .headline {
        margin: 4px 0 0;
        color: #0f766e;
        font-size: 10pt;
        font-weight: 600;
      }
      .contact {
        text-align: right;
        color: #374151;
        font-size: 7.6pt;
        line-height: 1.55;
      }
      .contact p { margin: 0; }
      a { color: #0f766e; text-decoration: none; }
      .summary {
        margin: 0 0 11px;
        color: #1f2937;
        font-size: 8.7pt;
      }
      .columns {
        display: grid;
        grid-template-columns: 1.65fr 1fr;
        gap: 16px;
      }
      h2 {
        margin: 0 0 6px;
        padding-bottom: 3px;
        border-bottom: 1px solid #d1d5db;
        color: #0f766e;
        font-size: 8.2pt;
        letter-spacing: 0.03em;
        text-transform: uppercase;
      }
      section { margin-bottom: 11px; break-inside: avoid; }
      .job { margin-bottom: 9px; break-inside: avoid; }
      .job:last-child { margin-bottom: 0; }
      .job-head {
        display: flex;
        justify-content: space-between;
        gap: 12px;
        align-items: baseline;
      }
      h3 { margin: 0; color: #0b1220; font-size: 9.8pt; }
      .role {
        margin: 1px 0 0;
        color: #374151;
        font-size: 8.4pt;
        font-weight: 600;
      }
      .period {
        color: #6b7280;
        font-size: 7.6pt;
        white-space: nowrap;
      }
      .client {
        margin: 3px 0 0;
        color: #0f766e;
        font-size: 7.8pt;
      }
      .job-desc { margin: 3px 0 0; color: #374151; }
      ul { margin: 3px 0 0; padding-left: 14px; }
      li { margin: 0 0 1.5px; color: #1f2937; }
      .tech { margin: 3px 0 0; color: #6b7280; font-size: 7.4pt; }
      .edu { margin-bottom: 7px; }
      .edu:last-child { margin-bottom: 0; }
      .edu-head {
        display: flex;
        justify-content: space-between;
        gap: 10px;
        align-items: baseline;
      }
      .edu p { margin: 1px 0 0; }
      .muted { color: #6b7280; }
      .skill-group { margin-bottom: 7px; }
      .skill-group:last-child { margin-bottom: 0; }
      .skill-label {
        display: block;
        color: #0b1220;
        font-size: 8pt;
        font-weight: 600;
      }
      .skill-items { color: #374151; font-size: 7.7pt; }
      .lang {
        display: flex;
        justify-content: space-between;
        gap: 8px;
        margin-bottom: 4px;
      }
      .lang strong { color: #0b1220; }
      .lang-note { color: #6b7280; font-size: 7.4pt; }
    </style>
  </head>
  <body>
    <div class="page">
      <header>
        <div>
          <h1>${escapeHtml(personal.name)}</h1>
          <p class="headline">${escapeHtml(translation.title)}</p>
        </div>
        <div class="contact">
          <p><a href="mailto:${escapeHtml(personal.email)}">${escapeHtml(
            personal.email,
          )}</a> · ${escapeHtml(personal.location[locale])}</p>
          <p><a href="${personal.links.github}">${escapeHtml(
            displayUrl(personal.links.github),
          )}</a> · <a href="${personal.links.linkedin}">${escapeHtml(
            displayUrl(personal.links.linkedin),
          )}</a></p>
          <p><a href="${personal.links.portfolio}">${escapeHtml(
            displayUrl(personal.links.portfolio),
          )}</a></p>
        </div>
      </header>

      <p class="summary">${escapeHtml(translation.summary)}</p>

      <div class="columns">
        <main>
          <section>
            <h2>${labels.experience}</h2>
            ${resume.experience
              .map((job) => renderExperience(job, locale))
              .join("")}
          </section>

          <section>
            <h2>${labels.education}</h2>
            ${education
              .map((item) => renderEducation(item, locale))
              .join("")}
          </section>
        </main>

        <aside>
          <section>
            <h2>${labels.skills}</h2>
            ${resume.skills
              .map(
                (category) => `
                  <div class="skill-group">
                    <span class="skill-label">${escapeHtml(
                      category.label[locale],
                    )}</span>
                    <span class="skill-items">${category.items
                      .map(escapeHtml)
                      .join(" · ")}</span>
                  </div>
                `,
              )
              .join("")}
          </section>

          <section>
            <h2>${labels.languages}</h2>
            ${resume.languages
              .map(
                (language) => `
                  <div class="lang">
                    <strong>${escapeHtml(language.name[locale])}</strong>
                    <span>${escapeHtml(language.level[locale])}</span>
                  </div>
                  <p class="lang-note">${escapeHtml(
                    language.note[locale],
                  )}</p>
                `,
              )
              .join("")}
          </section>
        </aside>
      </div>
    </div>
  </body>
</html>`;
}
