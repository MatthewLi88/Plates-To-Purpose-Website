/* ==========================================================================
   PLATES TO PURPOSE — SHARED LAYOUT (header + footer)
   --------------------------------------------------------------------------
   The navigation bar and footer live here in ONE place, so you only ever
   edit them once instead of in every HTML file.

   HOW IT WORKS
   - Each page has <div id="site-header"></div> and <div id="site-footer"></div>.
   - This script fills those in when the page loads.
   - Each page's <body> tag has a data-page attribute (e.g. data-page="team")
     which is used to highlight the current page in the nav.

   COMMON EDITS
   - Swap in the real logo:   change LOGO_SRC below.
   - Add/remove a nav link:   edit the NAV html string below.
   - Update contact details:  edit CONTACT below (used in the footer).
   ========================================================================== */

// The official PTP logo (transparent background)
const LOGO_SRC = "assets/images/logo.png";

// Contact details shown in the footer (and reused on the Contact page)
const CONTACT = {
  email: "platestopurpose@gmail.com",
  phone: "+1 (682) 706-7960",
  instagram: "@platestopurpose",
  instagramUrl: "https://www.instagram.com/platestopurpose",
};

/* ----- Header --------------------------------------------------------- */

function buildHeader(currentPage) {
  // Helper: adds the highlight class when a link matches the current page
  const active = (page) => (page === currentPage ? " is-active" : "");
  const aboutPages = ["mission", "team", "press"];
  const chapterPages = ["chapters", "start-a-chapter"];

  return `
  <div class="container header-inner">
    <a class="brand" href="index.html">
      <img src="${LOGO_SRC}" alt="Plates to Purpose logo">
      <span class="brand-name">Plates to <span>Purpose</span></span>
    </a>

    <button class="nav-toggle" aria-label="Open menu" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>

    <nav class="main-nav" aria-label="Main navigation">
      <a href="index.html" class="${active("home")}">Home</a>

      <div class="nav-item">
        <button type="button" class="${aboutPages.includes(currentPage) ? "is-active" : ""}" aria-expanded="false">About</button>
        <div class="dropdown">
          <a href="mission.html" class="${active("mission")}">Our Mission</a>
          <a href="team.html" class="${active("team")}">Our Team</a>
          <a href="press.html" class="${active("press")}">Our Press</a>
        </div>
      </div>

      <div class="nav-item">
        <button type="button" class="${chapterPages.includes(currentPage) ? "is-active" : ""}" aria-expanded="false">Chapters</button>
        <div class="dropdown">
          <a href="chapters.html" class="${active("chapters")}">Our Chapters</a>
          <a href="start-a-chapter.html" class="${active("start-a-chapter")}">Start a Chapter</a>
        </div>
      </div>

      <a href="partners.html" class="${active("partners")}">Partners &amp; Sponsors</a>
      <a href="impact.html" class="${active("impact")}">Our Impact</a>
      <a href="contact.html" class="${active("contact")}">Contact Us</a>

      <a href="contact.html" class="btn btn--green nav-cta">Get Involved</a>
    </nav>
  </div>`;
}

/* ----- Footer --------------------------------------------------------- */

function buildFooter() {
  const year = new Date().getFullYear();
  return `
  <div class="container">
    <div class="footer-grid">
      <div>
        <a class="brand" href="index.html" style="color:#fff">
          <img src="${LOGO_SRC}" alt="Plates to Purpose logo">
          <span class="brand-name">Plates to <span style="color:#8FD65C">Purpose</span></span>
        </a>
        <p class="footer-tagline" style="margin-top:14px">
          Youth-led 501(c)(3) dedicated to reducing food waste and food
          insecurity simultaneously.
        </p>
      </div>
      <div>
        <h4>Explore</h4>
        <ul>
          <li><a href="mission.html">Our Mission</a></li>
          <li><a href="team.html">Our Team</a></li>
          <li><a href="chapters.html">Our Chapters</a></li>
          <li><a href="impact.html">Our Impact</a></li>
        </ul>
      </div>
      <div>
        <h4>Connect</h4>
        <ul>
          <li><a href="mailto:${CONTACT.email}">${CONTACT.email}</a></li>
          <li><a href="tel:${CONTACT.phone.replace(/[^+\d]/g, "")}">${CONTACT.phone}</a></li>
          <li><a href="${CONTACT.instagramUrl}" target="_blank" rel="noopener">Instagram ${CONTACT.instagram}</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <span>&copy; ${year} Plates to Purpose. All rights reserved.</span>
      <span>A 501(c)(3) nonprofit organization</span>
    </div>
  </div>`;
}

/* ----- Wire it all up -------------------------------------------------- */

document.addEventListener("DOMContentLoaded", () => {
  const currentPage = document.body.dataset.page || "";

  const headerMount = document.getElementById("site-header");
  const footerMount = document.getElementById("site-footer");
  if (headerMount) headerMount.innerHTML = buildHeader(currentPage);
  if (footerMount) footerMount.innerHTML = buildFooter();

  // Mobile menu open/close
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".main-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open);
    });
  }

  // Dropdowns: click-to-open (helps on touch devices; hover works on desktop)
  document.querySelectorAll(".nav-item > button").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const item = btn.parentElement;
      const open = item.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", open);
    });
  });
  document.addEventListener("click", () => {
    document.querySelectorAll(".nav-item.is-open").forEach((item) => {
      item.classList.remove("is-open");
      item.querySelector("button").setAttribute("aria-expanded", "false");
    });
  });
});
