// EmailJS credentials. Replace with your own values.
const EMAILJS_PUBLIC_KEY  = '8HNbOBPx8jyL-1iih';
const EMAILJS_SERVICE_ID  = 'service_mpkpfy4';
const EMAILJS_TEMPLATE_ID = 'template_25l6zfo';

// Function stubs for DOMContentLoaded handler
function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
      document.getElementById('navLinks').classList.remove('open');
      document.getElementById('hamburger').classList.remove('open');
    });
  });
}

function initHamburger() {
  const btn   = document.getElementById('hamburger');
  const links = document.getElementById('navLinks');
  if (!btn) return;
  btn.addEventListener('click', () => {
    const isOpen = btn.classList.toggle('open');
    links.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(isOpen));
  });
}

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

function initContactForm() {
  const form      = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  const feedback  = document.getElementById('formFeedback');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    feedback.textContent = '';
    feedback.className = 'contact__feedback';

    if (!form.from_name.value.trim() || !form.from_email.value.trim() || !form.message.value.trim()) {
      feedback.textContent = 'Please fill in all fields.';
      feedback.classList.add('error');
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send message \u2192';
      return;
    }

    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        from_name:  form.from_name.value,
        from_email: form.from_email.value,
        message:    form.message.value,
      });
      feedback.textContent = '✓ Message sent! I will reply within 24 hours.';
      feedback.classList.add('success');
      form.reset();
    } catch {
      feedback.textContent = '✗ Could not send. Please email me directly.';
      feedback.classList.add('error');
    } finally {
      submitBtn.textContent = 'Send message →';
      submitBtn.disabled = false;
    }
  });
}

function initFooterYear() {
  const el = document.getElementById('footerYear');
  if (el) el.textContent = String(new Date().getFullYear());
}

function initCarousels() {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.querySelectorAll('[data-carousel]').forEach(carousel => {
    const track  = carousel.querySelector('[data-carousel-track]');
    const slides = Array.from(track.children);
    const prev   = carousel.querySelector('[data-carousel-prev]');
    const next   = carousel.querySelector('[data-carousel-next]');
    const dotsEl = carousel.querySelector('[data-carousel-dots]');
    if (!track || slides.length <= 1) return;

    let index = 0;
    let timer = null;

    const dots = slides.map((_, i) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'carousel__dot';
      dot.setAttribute('role', 'tab');
      dot.setAttribute('aria-label', `Go to screenshot ${i + 1}`);
      dot.addEventListener('click', () => goTo(i, true));
      dotsEl.appendChild(dot);
      return dot;
    });

    function render() {
      track.style.transform = `translateX(-${index * 100}%)`;
      dots.forEach((d, i) => d.setAttribute('aria-selected', String(i === index)));
    }

    function goTo(i, userTriggered) {
      index = (i + slides.length) % slides.length;
      render();
      if (userTriggered) restart();
    }

    function start() {
      if (reduceMotion) return;
      timer = setInterval(() => goTo(index + 1), 8000);
    }

    function stop() {
      if (timer) { clearInterval(timer); timer = null; }
    }

    function restart() { stop(); start(); }

    prev.addEventListener('click', () => goTo(index - 1, true));
    next.addEventListener('click', () => goTo(index + 1, true));
    carousel.addEventListener('mouseenter', stop);
    carousel.addEventListener('mouseleave', start);
    carousel.addEventListener('focusin', stop);
    carousel.addEventListener('focusout', start);

    render();
    start();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  if (typeof emailjs !== 'undefined') {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }
  initNavbarScroll();
  initSmoothScroll();
  initHamburger();
  initAnimations();
  initContactForm();
  initCarousels();
  initFooterYear();
});
