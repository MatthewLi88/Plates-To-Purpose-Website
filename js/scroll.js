/* ==========================================================================
   PLATES TO PURPOSE — SCROLL EFFECTS
   --------------------------------------------------------------------------
   Three gentle, professional scroll behaviors:

   1. REVEAL: elements with class="reveal" fade up when scrolled into view.
   2. COUNTERS: elements with data-count="45000" count up from 0 when seen.
      Optional attributes: data-prefix="$"  data-suffix="+"
   3. RESCUE ROUTE: on the home page, the dashed path inside .route-svg
      "draws" itself as you scroll — echoing the swoosh in the PTP logo
      (food moving from surplus to need).

   All three are skipped for visitors who prefer reduced motion.
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  // Signal that JS is running, which turns on the reveal animations in CSS.
  document.documentElement.classList.add("js");

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ----- Scroll progress bar (thin green line under the header) ------- */
  const progressBar = document.createElement("div");
  progressBar.className = "scroll-progress";
  document.body.appendChild(progressBar);
  const updateProgress = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = max > 0 ? window.scrollY / max : 0;
    progressBar.style.transform = `scaleX(${Math.min(Math.max(ratio, 0), 1)})`;
  };
  window.addEventListener("scroll", updateProgress, { passive: true });
  window.addEventListener("resize", updateProgress);
  updateProgress();

  /* ----- Sticky header shadow once the page scrolls ------------------- */
  const header = document.querySelector(".site-header");
  const setHeaderState = () => {
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 8);
  };
  window.addEventListener("scroll", setHeaderState, { passive: true });
  setHeaderState();

  /* ----- 1. Fade-up reveals ------------------------------------------- */
  const revealEls = document.querySelectorAll(".reveal, .reveal-left, .reveal-right");
  if (reducedMotion) {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  } else if (revealEls.length) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target); // animate once
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach((el) => revealObserver.observe(el));
  }

  /* ----- 2. Count-up statistics --------------------------------------- */
  const formatNumber = (n) => n.toLocaleString("en-US");

  const runCounter = (el) => {
    const target = parseInt(el.dataset.count, 10);
    const prefix = el.dataset.prefix || "";
    const suffix = el.dataset.suffix || "";
    const duration = 1600; // ms
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      // ease-out so the count slows as it lands on the final number
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = prefix + formatNumber(Math.round(target * eased)) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  const counterEls = document.querySelectorAll("[data-count]");
  if (reducedMotion) {
    counterEls.forEach((el) => {
      el.textContent =
        (el.dataset.prefix || "") +
        formatNumber(parseInt(el.dataset.count, 10)) +
        (el.dataset.suffix || "");
    });
  } else if (counterEls.length) {
    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            runCounter(entry.target);
            counterObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    counterEls.forEach((el) => counterObserver.observe(el));
  }

  /* ----- 3. Rescue route path drawing (home page only) ----------------- */
  /* A faint dashed guide line is always visible; this draws a solid green
     line over it as you scroll, like a route being traced on a map.      */
  const routePath = document.querySelector(".route-path");
  const routeSection = document.querySelector(".route-track") || document.querySelector(".route-section");

  if (routePath && routeSection) {
    const pathLength = routePath.getTotalLength();
    routePath.style.strokeDasharray = `${pathLength}`;

    if (reducedMotion) {
      // No animation: show the completed route.
      routePath.style.strokeDashoffset = "0";
    } else {
      // Start fully "undrawn": offset the dash pattern by the full length.
      routePath.style.strokeDashoffset = `${pathLength}`;

      const drawRoute = () => {
        const rect = routeSection.getBoundingClientRect();
        const viewH = window.innerHeight;
        // 0 when the section enters the viewport, 1 shortly before it leaves
        const progress = Math.min(
          Math.max((viewH - rect.top) / (rect.height + viewH * 0.5), 0),
          1
        );
        routePath.style.strokeDashoffset = `${pathLength * (1 - progress)}`;
      };

      window.addEventListener("scroll", drawRoute, { passive: true });
      window.addEventListener("resize", drawRoute);
      drawRoute();
    }
  }
});
