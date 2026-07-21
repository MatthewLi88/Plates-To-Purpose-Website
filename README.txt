PLATES TO PURPOSE — WEBSITE
============================================================

A simple static website: no build tools, no frameworks. Open
index.html in a browser to view it, or upload the whole folder
to any static host (GitHub Pages, Netlify, Vercel, etc.).

FOLDER MAP
------------------------------------------------------------
index.html            Home
mission.html          About > Our Mission (with DFW stats visual)
team.html             About > Our Team
press.html            About > Our Press (article preview cards)
chapters.html         Chapters > Our Chapters (interactive US map)
start-a-chapter.html  Chapters > Start a Chapter (6 steps)
partners.html         Partners & Sponsors
impact.html           Our Impact (counters + photo gallery)
contact.html          Contact Us (form + contact info)

css/styles.css        All styling. Brand colors and fonts are
                      defined as variables at the very top —
                      change them there to re-theme everything.
js/layout.js          The shared nav bar and footer. Edit once,
                      updates every page.
js/scroll.js          Scroll animations (fade-ups, count-up
                      stats, the "rescue route" path on Home).
assets/images/        All photos and logos.

COMMON EDITS
------------------------------------------------------------
1. LOGO
   The official logo lives at assets/images/logo.png (white
   background removed). To replace it, save a new file and
   update LOGO_SRC at the top of js/layout.js.

2. UPDATE IMPACT NUMBERS (from your spreadsheet)
   In impact.html, find the stat cards and change the
   data-count values. data-prefix="$" and data-suffix="+"
   control the symbols around the number.

3. ADD A PRESS ARTICLE
   In press.html, copy an existing <article class="card
   press-card"> block and update the image, source, title,
   excerpt, and link.

4. ADD A NEW CHAPTER TO THE MAP
   In chapters.html, copy an existing <circle class="map-dot">,
   set its data-name, and adjust cx/cy (the comment above the
   map explains the coordinates). Also add the city to the
   "Every chapter, at a glance" cards below the map.

5. ADD PARTNER LOGOS
   In partners.html, each partner is a plain list item. When
   you collect logos, replace the text with an <img> tag
   (a comment in the file shows how).

6. CONNECT THE CONTACT FORM
   The form currently opens the visitor's email app with the
   message pre-filled (works with no backend). To collect
   submissions automatically, sign up for a free form service
   (e.g. Formspree) and follow the comment in contact.html.

NOTES
------------------------------------------------------------
- The color scheme is PTP green only, with warm cream neutrals.
  All colors live at the top of css/styles.css.
- Fonts load from Google Fonts (Bricolage Grotesque + Figtree).
- All scroll animations are disabled automatically for visitors
  whose devices are set to "reduce motion".
- Because the nav/footer are inserted by JavaScript, view the
  site over http(s) or by double-clicking the files — both work —
  but JavaScript must be enabled.
