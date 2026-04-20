# Landing Page — Rafaela Santos Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a complete professional freelancer landing page in pure HTML/CSS/JS with dark theme, cobalt blue accent, 7 sections and EmailJS contact form.

**Architecture:** Single `index.html` with all sections, one CSS file using custom properties for theming, one JS file for all behaviors. No build tools, no frameworks — opens directly in browser.

**Tech Stack:** HTML5, CSS3 (custom properties + grid + flexbox), Vanilla JS (ES6+), EmailJS SDK via CDN.

---

## File Map

| File | Responsibility |
|---|---|
| `index.html` | All HTML structure, section markup, CDN scripts |
| `styles/main.css` | CSS variables, reset, layout, components, responsive |
| `js/main.js` | Navbar scroll, smooth scroll, hamburger menu, IntersectionObserver animations, EmailJS form |

---

### Task 1: Scaffold — index.html + CSS variables + JS skeleton

**Files:**
- Create: `index.html`
- Create: `styles/main.css`
- Create: `js/main.js`

- [ ] **Step 1: Create `index.html`**

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Rafaela Santos — Web Developer</title>
  <link rel="stylesheet" href="styles/main.css" />
</head>
<body>
  <!-- sections will be added in subsequent tasks -->
  <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"></script>
  <script src="js/main.js"></script>
</body>
</html>
```

- [ ] **Step 2: Create `styles/main.css` com reset e variáveis**

```css
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

:root {
  --bg:        #070b14;
  --bg2:       #0a1020;
  --bg-card:   #0d1525;
  --accent:    #60a5fa;
  --accent-dim:    #60a5fa1a;
  --accent-border: #60a5fa44;
  --border:    #1a2540;
  --text:      #e0e8ff;
  --muted:     #6a7fa8;
  --faint:     #3a4a68;
  --font:      'Segoe UI', system-ui, -apple-system, sans-serif;
  --font-mono: 'Courier New', Courier, monospace;
  --radius:    10px;
  --transition: 0.2s ease;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: var(--font);
  background: var(--bg);
  color: var(--text);
  line-height: 1.6;
}

img { display: block; max-width: 100%; }
a  { text-decoration: none; color: inherit; }
button { cursor: pointer; font-family: var(--font); }
```

- [ ] **Step 3: Criar `js/main.js` com skeleton**

```js
// EmailJS credentials — replace with your own values
const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY';
const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';

document.addEventListener('DOMContentLoaded', () => {
  emailjs.init(EMAILJS_PUBLIC_KEY);
  initNavbarScroll();
  initSmoothScroll();
  initHamburger();
  initAnimations();
  initContactForm();
});
```

- [ ] **Step 4: Verificar no browser**

Abra `index.html` diretamente no navegador (File → Open). Deve mostrar página em branco sem erros no console.

- [ ] **Step 5: Commit**

```bash
git add index.html styles/main.css js/main.js
git commit -m "feat: scaffold html, css variables and js skeleton"
```

---

### Task 2: Navbar

**Files:**
- Modify: `index.html` — adicionar `<header>` com nav
- Modify: `styles/main.css` — estilos do header/nav
- Modify: `js/main.js` — função `initNavbarScroll()`

- [ ] **Step 1: Adicionar markup do header em `index.html` (dentro de `<body>`, antes dos scripts)**

```html
<header class="navbar" id="navbar">
  <div class="navbar__inner">
    <a href="#hero" class="navbar__logo">&lt;rafaela.dev /&gt;</a>
    <nav class="navbar__links" id="navLinks">
      <a href="#services">Serviços</a>
      <a href="#about">Sobre</a>
      <a href="#testimonials">Depoimentos</a>
      <a href="#contact">Contato</a>
    </nav>
    <a href="#contact" class="btn btn--outline navbar__cta">Hire me</a>
    <button class="navbar__hamburger" id="hamburger" aria-label="Menu">
      <span></span><span></span><span></span>
    </button>
  </div>
</header>
```

- [ ] **Step 2: Adicionar estilos do navbar em `styles/main.css`**

```css
/* ── Navbar ── */
.navbar {
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--bg);
  border-bottom: 1px solid transparent;
  transition: border-color var(--transition), backdrop-filter var(--transition);
}

.navbar.scrolled {
  border-bottom-color: var(--border);
  backdrop-filter: blur(12px);
  background: rgba(7, 11, 20, 0.85);
}

.navbar__inner {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 24px;
  height: 64px;
  display: flex;
  align-items: center;
  gap: 32px;
}

.navbar__logo {
  font-family: var(--font-mono);
  font-size: 15px;
  color: var(--accent);
  flex-shrink: 0;
}

.navbar__links {
  display: flex;
  gap: 28px;
  flex: 1;
}

.navbar__links a {
  font-size: 14px;
  color: var(--muted);
  transition: color var(--transition);
}

.navbar__links a:hover { color: var(--text); }

.navbar__cta { margin-left: auto; flex-shrink: 0; }

.navbar__hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  padding: 4px;
  margin-left: auto;
}

.navbar__hamburger span {
  display: block;
  width: 22px;
  height: 2px;
  background: var(--text);
  border-radius: 2px;
  transition: transform var(--transition), opacity var(--transition);
}

/* ── Shared button styles ── */
.btn {
  display: inline-block;
  padding: 9px 22px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
  transition: opacity var(--transition), box-shadow var(--transition);
}

.btn--primary {
  background: var(--accent);
  color: var(--bg);
  border: none;
}

.btn--outline {
  background: transparent;
  border: 1px solid var(--accent-border);
  color: var(--accent);
}

.btn:hover { opacity: 0.85; }
```

- [ ] **Step 3: Implementar `initNavbarScroll()` em `js/main.js`**

```js
function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });
}
```

- [ ] **Step 4: Verificar no browser**

Abra `index.html`. Deve ver navbar no topo com logo `<rafaela.dev />` em azul, links e botão "Hire me". Role a página — a navbar deve ganhar borda e blur após 50px. Sem erros no console.

- [ ] **Step 5: Commit**

```bash
git add index.html styles/main.css js/main.js
git commit -m "feat: add sticky navbar with scroll effect"
```

---

### Task 3: Hero Section

**Files:**
- Modify: `index.html` — adicionar `<section id="hero">`
- Modify: `styles/main.css` — estilos do hero

- [ ] **Step 1: Adicionar markup do hero em `index.html` (após `<header>`)**

```html
<section id="hero" class="hero">
  <div class="hero__glow"></div>
  <div class="container">
    <span class="hero__badge">● Disponível para novos projetos</span>
    <h1 class="hero__title">Olá, sou <span class="accent">Rafaela Santos</span></h1>
    <p class="hero__subtitle">Web Developer — practical web apps &amp; AI integrations for small businesses</p>
    <p class="hero__desc">Construo aplicações web que resolvem problemas reais para pequenos negócios. Do banco de dados à interface, entrego soluções completas, bem documentadas e no prazo.</p>
    <div class="hero__btns">
      <a href="#services" class="btn btn--primary">Ver meus projetos</a>
      <a href="#contact" class="btn btn--outline">Entrar em contato →</a>
    </div>
    <div class="hero__stats">
      <div class="hero__stat">
        <span class="hero__stat-num accent">5+</span>
        <span class="hero__stat-label">Projects</span>
      </div>
      <div class="hero__stat">
        <span class="hero__stat-num accent">Full Stack</span>
        <span class="hero__stat-label">Frontend & Backend</span>
      </div>
      <div class="hero__stat">
        <span class="hero__stat-num accent">Available now</span>
        <span class="hero__stat-label">Remote worldwide</span>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Adicionar estilos do hero e helpers em `styles/main.css`**

```css
/* ── Helpers ── */
.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 24px;
}

.accent { color: var(--accent); }

.section-label {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--accent);
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-bottom: 8px;
  display: block;
}

.section-title {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 8px;
}

.section-sub {
  font-size: 14px;
  color: var(--muted);
  margin-bottom: 40px;
}

/* ── Hero ── */
.hero {
  position: relative;
  overflow: hidden;
  padding: 96px 0 80px;
  background: linear-gradient(135deg, var(--bg) 0%, #0d1a38 60%, #0a1228 100%);
}

.hero__glow {
  position: absolute;
  top: -40px;
  right: 80px;
  width: 320px;
  height: 320px;
  background: radial-gradient(circle, #60a5fa14 0%, transparent 70%);
  border-radius: 50%;
  pointer-events: none;
}

.hero__badge {
  display: inline-block;
  background: var(--accent-dim);
  border: 1px solid var(--accent-border);
  color: var(--accent);
  padding: 5px 16px;
  border-radius: 20px;
  font-size: 12px;
  font-family: var(--font-mono);
  margin-bottom: 24px;
}

.hero__title {
  font-size: 52px;
  font-weight: 800;
  line-height: 1.15;
  margin-bottom: 12px;
}

.hero__subtitle {
  font-size: 18px;
  color: var(--muted);
  margin-bottom: 16px;
  max-width: 560px;
}

.hero__desc {
  font-size: 15px;
  color: var(--faint);
  max-width: 520px;
  line-height: 1.75;
  margin-bottom: 36px;
}

.hero__btns {
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
  margin-bottom: 52px;
}

.hero__stats {
  display: flex;
  gap: 48px;
  padding-top: 32px;
  border-top: 1px solid var(--border);
}

.hero__stat {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.hero__stat-num {
  font-size: 22px;
  font-weight: 700;
}

.hero__stat-label {
  font-size: 11px;
  color: var(--faint);
}
```

- [ ] **Step 3: Verificar no browser**

Hero deve mostrar badge azul, título grande com "Rafaela Santos" em azul, subtítulo em inglês, dois botões e 3 estatísticas separadas por linha horizontal. O glow decorativo deve estar visível no canto direito.

- [ ] **Step 4: Commit**

```bash
git add index.html styles/main.css
git commit -m "feat: add hero section"
```

---

### Task 4: Serviços

**Files:**
- Modify: `index.html` — adicionar `<section id="services">`
- Modify: `styles/main.css` — estilos dos cards de serviço

- [ ] **Step 1: Adicionar markup de serviços em `index.html` (após a seção hero)**

```html
<section id="services" class="section">
  <div class="container">
    <span class="section-label">// o que eu faço</span>
    <h2 class="section-title">Serviços</h2>
    <p class="section-sub">Soluções full stack do conceito ao deploy</p>
    <div class="services-grid">

      <div class="service-card animate-on-scroll">
        <div class="service-card__icon">⚛️</div>
        <h3 class="service-card__title">Frontend com React</h3>
        <p class="service-card__desc">Interfaces modernas, responsivas e performáticas com React e Next.js. Design limpo que converte visitantes em clientes.</p>
        <div class="service-card__tags">
          <span class="tag">React</span>
          <span class="tag">Next.js</span>
        </div>
      </div>

      <div class="service-card animate-on-scroll">
        <div class="service-card__icon">⚙️</div>
        <h3 class="service-card__title">Backend &amp; APIs</h3>
        <p class="service-card__desc">APIs REST robustas com Node.js ou Python. Autenticação, integrações com IA e lógica de negócio escalável.</p>
        <div class="service-card__tags">
          <span class="tag">Node.js</span>
          <span class="tag">Python</span>
        </div>
      </div>

      <div class="service-card animate-on-scroll">
        <div class="service-card__icon">🗄️</div>
        <h3 class="service-card__title">Banco de Dados</h3>
        <p class="service-card__desc">Modelagem e otimização de banco de dados relacionais e NoSQL. Dados organizados, rápidos e seguros.</p>
        <div class="service-card__tags">
          <span class="tag">PostgreSQL</span>
          <span class="tag">MongoDB</span>
        </div>
      </div>

      <div class="service-card animate-on-scroll">
        <div class="service-card__icon">🚀</div>
        <h3 class="service-card__title">Deploy &amp; DevOps</h3>
        <p class="service-card__desc">Seu projeto no ar de forma rápida e confiável. Deploy automatizado na nuvem com zero downtime.</p>
        <div class="service-card__tags">
          <span class="tag">Vercel</span>
          <span class="tag">Railway</span>
        </div>
      </div>

    </div>
  </div>
</section>
```

- [ ] **Step 2: Adicionar estilos em `styles/main.css`**

```css
/* ── Section wrapper ── */
.section {
  padding: 96px 0;
}

/* ── Services ── */
.services-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.service-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 28px;
  transition: border-color var(--transition);
}

.service-card:hover {
  border-color: var(--accent-border);
}

.service-card__icon {
  font-size: 28px;
  margin-bottom: 14px;
}

.service-card__title {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 8px;
}

.service-card__desc {
  font-size: 13px;
  color: var(--muted);
  line-height: 1.65;
}

.service-card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 16px;
}

.tag {
  background: var(--accent-dim);
  border: 1px solid var(--accent-border);
  color: var(--accent);
  font-size: 11px;
  padding: 3px 10px;
  border-radius: 4px;
  font-family: var(--font-mono);
}
```

- [ ] **Step 3: Verificar no browser**

Role até a seção Serviços. Deve mostrar grid 2×2 com 4 cards, cada um com ícone, título, descrição e tags azuis. Hover em cada card deve acender a borda azul.

- [ ] **Step 4: Commit**

```bash
git add index.html styles/main.css
git commit -m "feat: add services section"
```

---

### Task 5: Sobre

**Files:**
- Modify: `index.html` — adicionar `<section id="about">`
- Modify: `styles/main.css` — estilos da seção sobre

- [ ] **Step 1: Adicionar markup em `index.html` (após seção services)**

```html
<section id="about" class="about">
  <div class="container">
    <span class="section-label">// quem sou eu</span>
    <h2 class="section-title">Sobre mim</h2>
    <div class="about__inner">
      <div class="about__avatar" aria-label="Avatar">👩‍💻</div>
      <div class="about__content animate-on-scroll">
        <h3 class="about__name">Rafaela Santos</h3>
        <p class="about__bio">
          Sou desenvolvedora web especializada em ajudar <strong>pequenos negócios a resolver problemas reais</strong> com web apps práticos e integrações de IA. Transformo ideias em produtos funcionais — do banco de dados à interface, de forma remota, com código limpo e entrega no prazo.
        </p>
        <p class="about__bio" style="margin-top: 12px;">
          Gosto de entender o problema antes de escrever a primeira linha de código. Para mim, a melhor solução é a mais simples que funciona.
        </p>
        <div class="about__skills">
          <span class="skill-pill">React</span>
          <span class="skill-pill">Node.js</span>
          <span class="skill-pill">Python</span>
          <span class="skill-pill">PostgreSQL</span>
          <span class="skill-pill">Vercel</span>
          <span class="skill-pill">AI Integrations</span>
        </div>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Adicionar estilos em `styles/main.css`**

```css
/* ── About ── */
.about {
  background: var(--bg2);
  padding: 96px 0;
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
}

.about__inner {
  display: flex;
  gap: 48px;
  align-items: flex-start;
}

.about__avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: linear-gradient(135deg, #0d1a38, #1a3060);
  border: 2px solid var(--accent-border);
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
}

.about__name {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 12px;
}

.about__bio {
  font-size: 14px;
  color: var(--muted);
  line-height: 1.75;
  max-width: 580px;
}

.about__skills {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 20px;
}

.skill-pill {
  background: var(--bg-card);
  border: 1px solid var(--border);
  color: var(--text);
  font-size: 12px;
  padding: 5px 14px;
  border-radius: 20px;
}
```

- [ ] **Step 3: Verificar no browser**

Seção Sobre deve mostrar avatar circular com emoji, nome, dois parágrafos de bio e pills de habilidades. Fundo deve ser levemente mais claro que o hero (`#0a1020`).

- [ ] **Step 4: Commit**

```bash
git add index.html styles/main.css
git commit -m "feat: add about section"
```

---

### Task 6: Depoimentos

**Files:**
- Modify: `index.html` — adicionar `<section id="testimonials">`
- Modify: `styles/main.css` — estilos dos cards de depoimento

- [ ] **Step 1: Adicionar markup em `index.html` (após seção about)**

```html
<section id="testimonials" class="section">
  <div class="container">
    <span class="section-label">// o que dizem</span>
    <h2 class="section-title">Depoimentos</h2>
    <p class="section-sub">Clientes reais, resultados reais</p>
    <div class="testimonials-grid">

      <div class="t-card animate-on-scroll">
        <div class="t-card__stars">★★★★★</div>
        <p class="t-card__text">"Rafaela delivered the project ahead of schedule with clean code and excellent communication throughout. She understood our needs immediately and suggested improvements I hadn't even considered. Will definitely hire again."</p>
        <div class="t-card__author">
          <div class="t-card__avatar">🇺🇸</div>
          <div>
            <div class="t-card__name">John Smith</div>
            <div class="t-card__role">CEO, TechStart — United States</div>
          </div>
        </div>
      </div>

      <div class="t-card animate-on-scroll">
        <div class="t-card__stars">★★★★★</div>
        <p class="t-card__text">"Best developer I've hired on Upwork. She built our internal web tool with an AI integration that saved our team hours every week. Professional, fast and the code is actually readable."</p>
        <div class="t-card__author">
          <div class="t-card__avatar">🇬🇧</div>
          <div>
            <div class="t-card__name">Emma Clarke</div>
            <div class="t-card__role">Product Manager — United Kingdom</div>
          </div>
        </div>
      </div>

    </div>
  </div>
</section>
```

- [ ] **Step 2: Adicionar estilos em `styles/main.css`**

```css
/* ── Testimonials ── */
.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.t-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 28px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.t-card__stars {
  color: var(--accent);
  font-size: 14px;
  letter-spacing: 3px;
}

.t-card__text {
  font-size: 14px;
  color: var(--muted);
  line-height: 1.7;
  font-style: italic;
  flex: 1;
}

.t-card__author {
  display: flex;
  align-items: center;
  gap: 12px;
}

.t-card__avatar {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: linear-gradient(135deg, #1a2a4a, var(--accent-dim));
  border: 1px solid var(--accent-border);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  flex-shrink: 0;
}

.t-card__name {
  font-size: 13px;
  font-weight: 600;
}

.t-card__role {
  font-size: 12px;
  color: var(--faint);
  margin-top: 2px;
}
```

- [ ] **Step 3: Verificar no browser**

Dois cards de depoimento em inglês, grid 2 colunas, com estrelas em azul cobalto, texto em itálico e autor com bandeira + cargo.

- [ ] **Step 4: Commit**

```bash
git add index.html styles/main.css
git commit -m "feat: add testimonials section"
```

---

### Task 7: Contato + EmailJS

**Files:**
- Modify: `index.html` — adicionar `<section id="contact">`
- Modify: `styles/main.css` — estilos da seção contato
- Modify: `js/main.js` — função `initContactForm()`

- [ ] **Step 1: Adicionar markup em `index.html` (após seção testimonials)**

```html
<section id="contact" class="contact">
  <div class="container">
    <span class="section-label">// vamos trabalhar juntos</span>
    <h2 class="section-title">Contato</h2>
    <div class="contact__inner">

      <div class="contact__info animate-on-scroll">
        <h3 class="contact__heading">Tem um projeto em mente?</h3>
        <p class="contact__text">Estou disponível para projetos freelance remotos. Me manda uma mensagem e respondo em até 24h.</p>
        <ul class="contact__links">
          <li>
            <span class="contact__link-icon">✉</span>
            <a href="mailto:rafaelasantosfeitosa@gmail.com">rafaelasantosfeitosa@gmail.com</a>
          </li>
          <li>
            <span class="contact__link-icon">in</span>
            <a href="https://linkedin.com/in/rafaela-santos" target="_blank" rel="noopener">linkedin.com/in/rafaela-santos</a>
          </li>
          <li>
            <span class="contact__link-icon">↑</span>
            <a href="https://upwork.com" target="_blank" rel="noopener">upwork.com/fl/rafaelasantos</a>
          </li>
        </ul>
      </div>

      <form class="contact__form animate-on-scroll" id="contactForm" novalidate>
        <div class="form-group">
          <label for="from_name">Nome</label>
          <input type="text" id="from_name" name="from_name" placeholder="Seu nome" required />
        </div>
        <div class="form-group">
          <label for="from_email">Email</label>
          <input type="email" id="from_email" name="from_email" placeholder="seu@email.com" required />
        </div>
        <div class="form-group">
          <label for="message">Mensagem</label>
          <textarea id="message" name="message" placeholder="Descreva seu projeto..." required></textarea>
        </div>
        <button type="submit" class="btn btn--primary contact__submit" id="submitBtn">
          Enviar mensagem →
        </button>
        <p class="contact__feedback" id="formFeedback"></p>
      </form>

    </div>
  </div>
</section>
```

- [ ] **Step 2: Adicionar estilos em `styles/main.css`**

```css
/* ── Contact ── */
.contact {
  background: var(--bg2);
  padding: 96px 0;
  border-top: 1px solid var(--border);
}

.contact__inner {
  display: grid;
  grid-template-columns: 1fr 1.3fr;
  gap: 64px;
  align-items: start;
}

.contact__heading {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 12px;
}

.contact__text {
  font-size: 14px;
  color: var(--muted);
  line-height: 1.7;
  margin-bottom: 28px;
}

.contact__links {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.contact__links li {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
  color: var(--muted);
}

.contact__link-icon {
  color: var(--accent);
  width: 18px;
  text-align: center;
  flex-shrink: 0;
}

.contact__links a:hover { color: var(--text); }

.form-group {
  margin-bottom: 16px;
}

.form-group label {
  display: block;
  font-size: 11px;
  color: var(--faint);
  font-family: var(--font-mono);
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 6px;
}

.form-group input,
.form-group textarea {
  width: 100%;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 6px;
  color: var(--text);
  padding: 11px 14px;
  font-size: 14px;
  font-family: var(--font);
  outline: none;
  transition: border-color var(--transition);
}

.form-group input:focus,
.form-group textarea:focus {
  border-color: var(--accent-border);
}

.form-group textarea {
  height: 120px;
  resize: vertical;
}

.contact__submit {
  width: 100%;
  padding: 13px;
  font-size: 15px;
  margin-top: 4px;
}

.contact__feedback {
  margin-top: 12px;
  font-size: 13px;
  min-height: 20px;
  text-align: center;
}

.contact__feedback.success { color: #4ade80; }
.contact__feedback.error   { color: #f87171; }
```

- [ ] **Step 3: Implementar `initContactForm()` em `js/main.js`**

```js
function initContactForm() {
  const form      = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  const feedback  = document.getElementById('formFeedback');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    submitBtn.textContent = 'Enviando...';
    submitBtn.disabled = true;
    feedback.textContent = '';
    feedback.className = 'contact__feedback';

    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        from_name:  form.from_name.value,
        from_email: form.from_email.value,
        message:    form.message.value,
      });
      feedback.textContent = '✓ Mensagem enviada! Responderei em até 24h.';
      feedback.classList.add('success');
      form.reset();
    } catch {
      feedback.textContent = '✗ Erro ao enviar. Tente pelo email diretamente.';
      feedback.classList.add('error');
    } finally {
      submitBtn.textContent = 'Enviar mensagem →';
      submitBtn.disabled = false;
    }
  });
}
```

- [ ] **Step 4: Verificar no browser**

Seção contato deve mostrar info à esquerda (título, texto, 3 links) e formulário à direita (Nome, Email, Mensagem, botão). Clicar no botão sem preencher não deve enviar (campo `required`). Com EmailJS não configurado, o catch deve mostrar a mensagem de erro em vermelho.

- [ ] **Step 5: Commit**

```bash
git add index.html styles/main.css js/main.js
git commit -m "feat: add contact section with emailjs integration"
```

---

### Task 8: Footer

**Files:**
- Modify: `index.html` — adicionar `<footer>`
- Modify: `styles/main.css` — estilos do footer

- [ ] **Step 1: Adicionar markup em `index.html` (após seção contact, antes dos scripts)**

```html
<footer class="footer">
  <div class="container footer__inner">
    <p class="footer__copy">© 2026 Rafaela Santos. Todos os direitos reservados.</p>
    <div class="footer__links">
      <a href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      <a href="https://linkedin.com" target="_blank" rel="noopener">LinkedIn</a>
      <a href="https://upwork.com" target="_blank" rel="noopener">Upwork</a>
    </div>
  </div>
</footer>
```

- [ ] **Step 2: Adicionar estilos em `styles/main.css`**

```css
/* ── Footer ── */
.footer {
  padding: 28px 0;
  border-top: 1px solid var(--border);
}

.footer__inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer__copy {
  font-size: 12px;
  color: var(--faint);
}

.footer__links {
  display: flex;
  gap: 20px;
}

.footer__links a {
  font-size: 12px;
  color: var(--faint);
  transition: color var(--transition);
}

.footer__links a:hover { color: var(--accent); }
```

- [ ] **Step 3: Verificar no browser**

Footer deve mostrar copyright à esquerda e links GitHub/LinkedIn/Upwork à direita, ambos em tom acinzentado.

- [ ] **Step 4: Commit**

```bash
git add index.html styles/main.css
git commit -m "feat: add footer"
```

---

### Task 9: JavaScript — smooth scroll, hamburger e animações

**Files:**
- Modify: `js/main.js` — implementar funções restantes
- Modify: `styles/main.css` — estilos de animação e hamburger mobile

- [ ] **Step 1: Implementar `initSmoothScroll()` em `js/main.js`**

```js
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
      // close mobile menu if open
      document.getElementById('navLinks').classList.remove('open');
      document.getElementById('hamburger').classList.remove('open');
    });
  });
}
```

- [ ] **Step 2: Implementar `initHamburger()` em `js/main.js`**

```js
function initHamburger() {
  const btn   = document.getElementById('hamburger');
  const links = document.getElementById('navLinks');
  if (!btn) return;
  btn.addEventListener('click', () => {
    btn.classList.toggle('open');
    links.classList.toggle('open');
  });
}
```

- [ ] **Step 3: Implementar `initAnimations()` em `js/main.js`**

```js
function initAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
}
```

- [ ] **Step 4: Adicionar CSS das animações e hamburger mobile em `styles/main.css`**

```css
/* ── Animations ── */
.animate-on-scroll {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.animate-on-scroll.visible {
  opacity: 1;
  transform: translateY(0);
}

/* ── Hamburger open state ── */
.navbar__hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
.navbar__hamburger.open span:nth-child(2) { opacity: 0; }
.navbar__hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
```

- [ ] **Step 5: Verificar no browser**

Role a página — service cards, testimonials e about text devem aparecer com fade-in suave. Clicar em "Serviços" na navbar deve rolar suavemente até a seção correta.

- [ ] **Step 6: Commit**

```bash
git add js/main.js styles/main.css
git commit -m "feat: add smooth scroll, hamburger and scroll animations"
```

---

### Task 10: Responsividade Mobile

**Files:**
- Modify: `styles/main.css` — media queries `@media (max-width: 768px)`

- [ ] **Step 1: Adicionar bloco de responsividade ao final de `styles/main.css`**

```css
/* ── Responsive ── */
@media (max-width: 768px) {
  /* Navbar */
  .navbar__links {
    display: none;
    flex-direction: column;
    gap: 0;
    position: absolute;
    top: 64px;
    left: 0;
    right: 0;
    background: var(--bg);
    border-bottom: 1px solid var(--border);
    padding: 12px 0;
  }

  .navbar__links.open { display: flex; }

  .navbar__links a {
    padding: 12px 24px;
    font-size: 15px;
  }

  .navbar__cta { display: none; }

  .navbar__hamburger { display: flex; }

  /* Hero */
  .hero { padding: 64px 0 56px; }

  .hero__title { font-size: 34px; }

  .hero__subtitle { font-size: 15px; }

  .hero__stats {
    flex-direction: column;
    gap: 20px;
  }

  /* Services */
  .services-grid { grid-template-columns: 1fr; }

  /* About */
  .about__inner {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .about__skills { justify-content: center; }

  /* Testimonials */
  .testimonials-grid { grid-template-columns: 1fr; }

  /* Contact */
  .contact__inner {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  /* Footer */
  .footer__inner {
    flex-direction: column;
    gap: 12px;
    text-align: center;
  }
}
```

- [ ] **Step 2: Verificar responsividade**

No DevTools do browser (F12), ative a view mobile (ícone de celular) com largura 375px. Verifique:
- Hamburger aparece no canto direito da navbar
- Links somem e reaparecem ao clicar no hamburger
- Hero título cabe em 2-3 linhas sem overflow
- Services em 1 coluna
- Contato empilhado verticalmente

- [ ] **Step 3: Commit**

```bash
git add styles/main.css
git commit -m "feat: add mobile responsive layout"
```

---

### Task 11: Polimento final e `.gitignore`

**Files:**
- Create: `.gitignore`
- Modify: `index.html` — meta tags SEO + favicon fallback

- [ ] **Step 1: Criar `.gitignore`**

```
.superpowers/
assets/
*.DS_Store
```

- [ ] **Step 2: Adicionar meta tags SEO em `index.html` (dentro de `<head>`)**

```html
<meta name="description" content="Rafaela Santos — Web Developer specializing in practical web apps and AI integrations for small businesses. Available for freelance projects." />
<meta name="author" content="Rafaela Santos" />
<meta property="og:title" content="Rafaela Santos — Web Developer" />
<meta property="og:description" content="Practical web apps & AI integrations for small businesses." />
<meta property="og:type" content="website" />
```

- [ ] **Step 3: Verificar aparência final**

Percorra todas as seções e confirme:
- [ ] Navbar sticky funciona ao rolar
- [ ] Hero com badge, título, stats e glow
- [ ] 4 cards de serviços com hover azul
- [ ] Seção sobre com avatar e pills
- [ ] 2 depoimentos com estrelas
- [ ] Formulário de contato com feedback
- [ ] Footer com links
- [ ] Mobile sem quebras de layout (DevTools 375px)

- [ ] **Step 4: Commit final**

```bash
git add .gitignore index.html
git commit -m "chore: add gitignore and seo meta tags"
```
