# Rafaela Santos — Landing Page

Personal landing page for Rafaela Santos — Web Developer. Hand-coded in HTML, CSS and vanilla JavaScript — no framework, no build step.

🔗 **[Live site](https://rafaelasantosfeitosa.github.io/Landing-page/)**

![Screenshot](docs/screenshot.png)

---

## Features

- **Responsive design** — fluid layout optimized for mobile, tablet and desktop
- **Dark theme** with an accent-blue palette defined through CSS custom properties
- **Smooth scroll** between sections and a navbar with dynamic blur on scroll
- **Accessible hamburger menu** on smaller screens
- **Performant on-scroll animations** using `IntersectionObserver` (no animation libraries)
- **Working contact form** integrated with EmailJS, including client-side validation and `aria-live` feedback
- **Accessibility** — `aria-expanded`, `aria-controls`, `aria-live`, `aria-hidden` on decorative elements
- **SEO ready** — meta description, Open Graph and Twitter Card tags for social sharing

---

## Stack

- **HTML5** semantic markup
- **CSS3** with custom properties and a BEM-ish naming convention (`navbar__inner`, `service-card__title`)
- **Vanilla JavaScript** ES6+ (no dependencies beyond the EmailJS SDK loaded via CDN)
- **EmailJS** for browser-side contact form submission

> **No framework. No build step. No node_modules.** A deliberate choice: for a static landing page, the best solution is the simplest one that works. Fast load times, easy to maintain, deploys anywhere that serves static files.

---

## Architecture

The whole project lives in three files:

```
├── index.html         # All markup: navbar, hero, services, projects, about, contact, footer
├── styles/main.css    # All styles, with theme variables in :root
└── js/main.js         # Behaviors organized into initX functions, wired on DOMContentLoaded
```

JavaScript follows a **progressive enhancement** pattern: each behavior lives in its own function (`initNavbarScroll`, `initSmoothScroll`, `initHamburger`, `initAnimations`, `initContactForm`) and everything is plugged into the `DOMContentLoaded` event. If one script fails, the rest keeps working.

---

## Running locally

Just open `index.html` in a browser. For HTTP serving (recommended when testing the contact form):

```sh
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

To make the contact form actually send, replace the credentials at the top of `js/main.js`:

```js
const EMAILJS_PUBLIC_KEY  = '...';
const EMAILJS_SERVICE_ID  = '...';
const EMAILJS_TEMPLATE_ID = '...';
```

---

## Technical decisions

- **Vanilla JS over a framework** — the site is static and doesn't need state management, routing or a virtual DOM. Skipping a framework cuts ~150KB of JavaScript, removes the build step, and keeps the code readable by any developer at any level.
- **CSS custom properties for theming** — the entire palette (`--bg`, `--accent`, `--text`, `--border`, etc.) lives in `:root`. Changing the whole theme is a matter of tweaking a few lines, no hex-code hunting across the CSS.
- **Accessibility from the start** — `aria-expanded` synced on the hamburger, `aria-live="polite"` on form feedback, `aria-hidden` on decorative icons, and labels associated with every input. Accessibility isn't a feature added later — it's part of the markup.
- **Defensive EmailJS loading** — init checks `typeof emailjs !== 'undefined'` in case the CDN fails to load, and the submit handler falls back to an error message directing the user to email directly.

---

## Author

**Rafaela Santos** — Freelance Web Developer, available for remote work worldwide.

- Email: [rafaelasantosfeitosa@gmail.com](mailto:rafaelasantosfeitosa@gmail.com)
- GitHub: [@rafaelasantosfeitosa](https://github.com/rafaelasantosfeitosa)

© 2026 Rafaela Santos.
