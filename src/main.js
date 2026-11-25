import "./style.css";
import { TODAY, person, experience, projects, skills, education } from "./data.js";

const months = (ym) => {
  const [y, m] = ym.split("-").map(Number);
  return y * 12 + (m - 1);
};
const fmt = (ym) => {
  if (!ym) return "Present";
  const [y, m] = ym.split("-").map(Number);
  return new Date(y, m - 1).toLocaleDateString("en-US", { month: "short", year: "numeric" });
};
const range = (s, e) => `${fmt(s)} – ${fmt(e)}`;
const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

// Every logo sits on a square tile in its brand color, so marks of different
// shapes and file types look like one consistent set.
function logo(e, cls = "logo") {
  const { src, bg, pad } = e.logo;
  return `<span class="${cls}" style="--logo-bg:${bg};--logo-pad:${pad}" aria-hidden="true"><img src="${src}" alt="" loading="lazy" decoding="async"></span>`;
}

/* ---------- Header ---------- */
function header() {
  return `
  <header class="hero">
    <h1>${esc(person.name)}</h1>
    <div class="hero-meta">
      <p class="hero-title">${esc(person.title)} · ${esc(person.location)}</p>
      <nav class="hero-links" aria-label="Profiles">
        ${person.links.map((l) => `<a href="${l.href}">${esc(l.label)}</a>`).join("")}
      </nav>
    </div>
    <p class="hero-summary">${esc(person.summary)}</p>
  </header>`;
}

/* ---------- Timeline: one track, overlapping roles stack into rows ---------- */
const ENTRIES = [...experience, { ...education, role: education.degree, org: education.school, kind: "school" }];
// Equal breathing room on both ends: a few months before the first start and after today.
const FROM = Math.min(...ENTRIES.map((e) => months(e.start))) - 3;
const TO = months(TODAY) + 3;
const pct = (m) => ((m - FROM) / (TO - FROM)) * 100;

function pack(items, gap) {
  const rows = [];
  for (const it of [...items].sort((a, b) => a.lo - b.lo)) {
    let row = rows.find((r) => r.every((o) => it.lo >= o.hi + gap || it.hi <= o.lo - gap));
    if (!row) rows.push((row = []));
    row.push(it);
  }
  return rows;
}

// Two layouts from the same data:
// - "full": names and logos, for wide screens (scrolls sideways if the page is narrow).
// - "compact": logos only, always fits its container; used on phones and in the sticky bar.
function timelineTrack(variant) {
  const compact = variant === "compact";
  // Width a label needs, in % of the track at the full timeline's minimum width (44rem, minus padding).
  const labelPct = (text) => ((text.length * 0.5 + 2.6) / 41.5) * 100;

  const items = ENTRIES.map((e) => {
    const left = pct(months(e.start));
    const right = pct(months(e.end ?? TODAY) + 1);
    const width = right - left;
    const need = compact ? 0 : labelPct(e.short);
    const side = width >= need ? "in" : right + need > 100 ? "left" : "right";
    return { e, left, width, side, lo: side === "left" ? left - need : left, hi: side === "right" ? right + need : right };
  });

  const bar = ({ e, left, width, side }) => {
    const ongoing = e.end === null ? " is-ongoing" : "";
    const title = `${e.role}, ${e.org}: ${e.years ?? range(e.start, e.end)}`;
    const label = compact ? logo(e, "tl-logo") : `${logo(e, "tl-logo")}<span class="tl-name">${esc(e.short)}</span>`;
    const outside =
      side === "in"
        ? ""
        : `<span class="tl-ext" aria-hidden="true" style="${side === "left" ? `right:${100 - left}%` : `left:${left + width}%`}">${label}</span>`;
    const kind = e.kind === "school" ? " is-school" : "";
    return `<a class="tl-bar${ongoing}${kind}" data-ref="${e.id}" href="#${e.id}" style="left:${left}%;width:${width}%" title="${esc(title)}" aria-label="${esc(title)}">
        <span class="seg-part"></span>${side === "in" ? `<span class="tl-inner">${label}</span>` : ""}</a>${outside}`;
  };

  const years = [];
  for (let y = Math.ceil(FROM / 12); y * 12 < TO; y++) years.push(y);
  // Compact tracks label every other year so the numbers don't collide.
  const labeled = compact ? years.filter((y) => y % 2 === 0) : years;

  return `
      <div class="tl tl-${variant}">
        <div class="tl-axis">${labeled.map((y) => `<span style="left:${pct(y * 12)}%">${y}</span>`).join("")}</div>
        <div class="tl-body">
          ${years.map((y) => `<span class="tl-gridline" style="left:${pct(y * 12)}%"></span>`).join("")}
          <span class="tl-today" style="left:${pct(months(TODAY) + 1)}%">${compact ? "" : "<span>Today</span>"}</span>
          ${pack(items, compact ? 0.6 : 0.4).map((row) => `<div class="tl-row">${row.map(bar).join("")}</div>`).join("")}
        </div>
      </div>`;
}

// The full timeline scrolls away normally. Right after it sits a zero-height sticky
// "dock": it takes no space in the page, so nothing ever resizes while you scroll.
// Once the timeline has scrolled past, the dock shows a slim copy at the top that
// highlights the role being read.
function timeline() {
  return `
  <section id="timeline" class="tl-section" aria-labelledby="timeline-h">
    <div class="section-head">
      <h2 id="timeline-h">Timeline</h2>
      <ul class="tl-legend" aria-label="Legend">
        <li><span class="key is-school" aria-hidden="true"></span>School</li>
        <li><span class="key" aria-hidden="true"></span>Work</li>
      </ul>
    </div>
    <div class="tl-scroll tl-wide" tabindex="0" role="region" aria-label="Career timeline">
      ${timelineTrack("full")}
    </div>
    <div class="tl-frame tl-narrow">${timelineTrack("compact")}</div>
  </section>
  <div class="tl-dock" aria-hidden="true">
    <div class="tl-dock-bar">
      <div class="tl-dock-inner">
        <p class="tl-now"><span class="tl-now-role"></span><span class="tl-now-dates"></span></p>
        ${timelineTrack("compact")}
      </div>
    </div>
  </div>`;
}

/* ---------- Projects (rendered inside the Guayaba Games card) ---------- */
function projectCard(p) {
  return `
  <article class="card" id="${p.id}">
    ${
      p.media.length
        ? `<div class="carousel">
      <button type="button" class="car-btn prev" aria-label="Previous ${esc(p.name)} screenshots" hidden>‹</button>
      <ul class="strip strip-${p.shape}" aria-label="${esc(p.name)} screenshots">
        ${p.media
          .map(
            (m, i) => `<li><button type="button" class="thumb" data-project="${p.id}" data-index="${i}" aria-label="Open screenshot: ${esc(m.alt)}">
              <img src="${m.src}" alt="${esc(m.alt)}" loading="lazy" decoding="async"></button></li>`
          )
          .join("")}
      </ul>
      <button type="button" class="car-btn next" aria-label="More ${esc(p.name)} screenshots" hidden>›</button>
    </div>`
        : ""
    }
    <header>
      <p class="kind">${esc(p.kind)}</p>
      <h4>${esc(p.name)}</h4>
    </header>
    <div>
      <p>${esc(p.summary)}</p>
      ${p.bullets.length ? `<ul>${p.bullets.map((b) => `<li>${esc(b)}</li>`).join("")}</ul>` : ""}
      <ul class="chips">${p.stack.map((s) => `<li>${esc(s)}</li>`).join("")}</ul>
    </div>
    ${
      p.links.length
        ? `<footer>${p.links.map((l) => `<a href="${l.href}" target="_blank" rel="noopener">${esc(l.label)}</a>`).join("")}</footer>`
        : ""
    }
  </article>`;
}

/* ---------- Experience ---------- */
function experienceSection() {
  return `
  <section aria-labelledby="exp-h">
    <h2 id="exp-h">Experience</h2>
    <div class="exp-list">
      ${experience
        .map(
          (e) => `
        <article class="exp${e.id === "guayaba" ? " has-projects" : ""}" id="${e.id}">
          <header>
            ${logo(e)}
            <div class="exp-title">
              <h3>${esc(e.role)}, <span class="org">${esc(e.org)}</span></h3>
              <p class="dates">${range(e.start, e.end)}</p>
            </div>
          </header>
          <div class="exp-body">
            <p class="blurb">${esc(e.blurb)}</p>
            ${e.bullets.length ? `<ul>${e.bullets.map((b) => `<li>${esc(b)}</li>`).join("")}</ul>` : ""}
            ${e.stack.length ? `<ul class="chips">${e.stack.map((s) => `<li>${esc(s)}</li>`).join("")}</ul>` : ""}
          </div>
          ${e.id === "guayaba" ? `<div class="cards">${projects.map(projectCard).join("")}</div>` : ""}
        </article>`
        )
        .join("")}
    </div>
  </section>`;
}

/* ---------- Skills & education ---------- */
function skillsSection() {
  return `
  <section aria-labelledby="skills-h" class="two-col">
    <div>
      <h2 id="skills-h">Skills</h2>
      <dl class="skills">
        ${skills.map((s) => `<dt>${esc(s.group)}</dt><dd>${s.items.map(esc).join(" · ")}</dd>`).join("")}
      </dl>
    </div>
    <div id="education">
      <h2>Education</h2>
      <div class="edu">
        ${logo(education)}
        <p><strong>${esc(education.degree)}</strong><br>${esc(education.school)} · ${esc(education.years)}<br>
        <span class="muted">${esc(education.societies)}</span></p>
      </div>
    </div>
  </section>`;
}

/* ---------- Lightbox ---------- */
function lightbox() {
  return `
  <dialog id="lightbox" closedby="any" aria-labelledby="lb-caption">
    <figure>
      <img id="lb-img" alt="">
      <figcaption id="lb-caption"></figcaption>
    </figure>
    <div class="lb-controls">
      <button type="button" data-step="-1" aria-label="Previous screenshot">‹</button>
      <span id="lb-count"></span>
      <button type="button" data-step="1" aria-label="Next screenshot">›</button>
      <form method="dialog"><button aria-label="Close">Close</button></form>
    </div>
  </dialog>`;
}

/* ---------- Render ---------- */
document.querySelector("#app").innerHTML = `
  ${header()}
  <main>
    ${timeline()}
    ${experienceSection()}
    ${skillsSection()}
  </main>
  <footer class="site-footer"><p>© ${new Date().getFullYear()} ${esc(person.name)}</p></footer>
  ${lightbox()}
`;

// On narrow screens the timeline scrolls sideways; start at the most recent work.
const sc = document.querySelector(".tl-scroll");
sc.scrollLeft = sc.scrollWidth;

/* Show the docked strip once the full timeline has scrolled off the top. */
const section = document.querySelector(".tl-section");
const dock = document.querySelector(".tl-dock");
const nowRole = dock.querySelector(".tl-now-role");
const nowDates = dock.querySelector(".tl-now-dates");
// The dock is for pointer users; keyboard and screen-reader users have the full timeline.
dock.querySelectorAll("a").forEach((a) => (a.tabIndex = -1));
new IntersectionObserver(([entry]) => {
  dock.classList.toggle("is-visible", !entry.isIntersecting && entry.boundingClientRect.bottom <= 0);
}).observe(section);

const byId = Object.fromEntries(ENTRIES.map((e) => [e.id, e]));
function setActive(id) {
  document.querySelectorAll(".tl-bar").forEach((b) => b.classList.toggle("is-active", b.dataset.ref === id));
  document.body.classList.toggle("has-active", Boolean(id));
  const e = byId[id];
  nowRole.textContent = e ? `${e.role}, ${e.org}` : "";
  nowDates.textContent = e ? (e.years ?? range(e.start, e.end)) : "";
}
// The current section is the last one whose top has passed a line just under the
// sticky bar. Anchor jumps land a card right at that line (see scroll-margin-top),
// so clicking a bar always highlights the card you jumped to, however short it is.
const sections = ENTRIES.map((e) => document.getElementById(e.id))
  .filter(Boolean)
  .sort((x, y) => (x.compareDocumentPosition(y) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1));
const LINE = 150; // px from the top of the viewport; scroll-margin-top is 7.5rem (120px)
let ticking = false;
// A bar click near the bottom of the page can't scroll its card up to the line,
// so remember what was clicked and keep it highlighted until the reader scrolls on.
let pinned = null;
addEventListener("hashchange", () => {
  const id = location.hash.slice(1);
  if (!sections.some((el) => el.id === id)) return;
  setTimeout(() => { pinned = { id, y: scrollY }; updateActive(); }, 50);
});
function updateActive() {
  ticking = false;
  if (pinned && Math.abs(scrollY - pinned.y) < 40) return setActive(pinned.id);
  pinned = null;
  let current = null;
  for (const el of sections) if (el.getBoundingClientRect().top <= LINE) current = el;
  // At the very bottom, short last sections never reach the line: pick the last one on screen.
  const atBottom = innerHeight + scrollY >= document.documentElement.scrollHeight - 2;
  if (atBottom) {
    const onScreen = sections.filter((el) => el.getBoundingClientRect().top < innerHeight);
    current = onScreen.at(-1) ?? current;
  }
  // Above the experience section nothing is "current".
  setActive(current?.id ?? null);
}
addEventListener("scroll", () => {
  if (!ticking) { ticking = true; requestAnimationFrame(updateActive); }
}, { passive: true });
addEventListener("resize", updateActive);
updateActive();

/* Carousel arrows: shown only when there is more to scroll in that direction. */
document.querySelectorAll(".carousel").forEach((car) => {
  const strip = car.querySelector(".strip");
  const prev = car.querySelector(".prev");
  const next = car.querySelector(".next");
  const update = () => {
    const max = strip.scrollWidth - strip.clientWidth;
    prev.hidden = strip.scrollLeft <= 8;
    next.hidden = strip.scrollLeft >= max - 8;
  };
  const reduce = matchMedia("(prefers-reduced-motion: reduce)");
  const step = (dir) => {
    const from = strip.scrollLeft;
    const left = dir * strip.clientWidth * 0.8;
    strip.scrollBy({ left, behavior: reduce.matches ? "instant" : "smooth" });
    // If the browser skipped the animation (e.g. a throttled tab), jump instead.
    setTimeout(() => {
      if (strip.scrollLeft === from) strip.scrollBy({ left, behavior: "instant" });
      update();
    }, 350);
  };
  prev.addEventListener("click", () => step(-1));
  next.addEventListener("click", () => step(1));
  strip.addEventListener("scroll", update, { passive: true });
  strip.addEventListener("scrollend", update);
  new ResizeObserver(update).observe(strip);
  strip.querySelectorAll("img").forEach((i) => i.addEventListener("load", update));
  update();
});

/* Lightbox behavior */
const dlg = document.querySelector("#lightbox");
const img = document.querySelector("#lb-img");
const cap = document.querySelector("#lb-caption");
const count = document.querySelector("#lb-count");
const current = { list: [], i: 0 };

function show(i) {
  const { list } = current;
  current.i = (i + list.length) % list.length;
  const m = list[current.i];
  img.src = m.src;
  img.alt = m.alt;
  cap.textContent = m.alt;
  count.textContent = `${current.i + 1} / ${list.length}`;
}

document.addEventListener("click", (e) => {
  const t = e.target.closest(".thumb");
  if (!t) return;
  current.list = projects.find((p) => p.id === t.dataset.project).media;
  show(Number(t.dataset.index));
  dlg.showModal();
});
dlg.querySelectorAll("[data-step]").forEach((b) =>
  b.addEventListener("click", () => show(current.i + Number(b.dataset.step)))
);
dlg.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") show(current.i + 1);
  if (e.key === "ArrowLeft") show(current.i - 1);
});

// Light-dismiss fallback for browsers without <dialog closedby> (Safari).
if (!("closedBy" in HTMLDialogElement.prototype)) {
  dlg.addEventListener("click", (event) => {
    if (event.target !== dlg) return;
    const r = dlg.getBoundingClientRect();
    const inside = r.top <= event.clientY && event.clientY <= r.bottom && r.left <= event.clientX && event.clientX <= r.right;
    if (!inside) dlg.close();
  });
}
