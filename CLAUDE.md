# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Static personal landing page for Rafaela Santos (freelance web developer). Pure HTML/CSS/vanilla JS — no build step, no framework, no package manager. Content is in Portuguese (pt-BR) with some English.

## Running locally

Open `index.html` directly in a browser, or serve the directory over HTTP (needed if testing things that break on `file://`):

```sh
python3 -m http.server 8000
```

There is no build, lint, or test tooling. Changes are verified visually in the browser.

## Architecture

Single-page site with anchor-linked sections. Three files hold everything:

- `index.html` — all markup: `navbar` → `main` (sections: `hero`, `services`, `about`, `testimonials`, `contact`) → `footer`. Section IDs match the navbar anchor links.
- `styles/main.css` — all styles. Uses CSS custom properties in `:root` for the dark theme palette (`--bg`, `--accent`, `--text`, etc.); prefer updating those variables over hard-coding colors. BEM-ish class naming (`navbar__inner`, `service-card__title`).
- `js/main.js` — progressive-enhancement behaviors, each isolated in an `init*` function wired up on `DOMContentLoaded`: `initNavbarScroll`, `initSmoothScroll`, `initHamburger`, `initAnimations` (IntersectionObserver adds `.visible` to `.animate-on-scroll` elements), `initContactForm`.

### Contact form (EmailJS)

The contact form submits via the EmailJS browser SDK loaded from a CDN in `index.html`. Credentials are placeholder constants at the top of `js/main.js` (`EMAILJS_PUBLIC_KEY`, `EMAILJS_SERVICE_ID`, `EMAILJS_TEMPLATE_ID`) — replace with real values to make the form send. `initContactForm` guards against the CDN failing to load (the `typeof emailjs !== 'undefined'` check at init; a send failure falls back to an error message directing the user to email directly).

### Accessibility conventions already in place

- Hamburger button uses `aria-expanded`/`aria-controls`; decorative spans inside it are `aria-hidden`.
- Form feedback uses `aria-live="polite"`.
- Decorative emoji/glyphs are marked `aria-hidden="true"`.
  Keep these when editing — prior commits specifically added them.
