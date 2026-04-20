// EmailJS credentials — replace with your own values
const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY';
const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';

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
    submitBtn.textContent = 'Enviando...';
    submitBtn.disabled = true;
    feedback.textContent = '';
    feedback.className = 'contact__feedback';

    if (!form.from_name.value.trim() || !form.from_email.value.trim() || !form.message.value.trim()) {
      feedback.textContent = 'Por favor, preencha todos os campos.';
      feedback.classList.add('error');
      submitBtn.disabled = false;
      submitBtn.textContent = 'Enviar mensagem \u2192';
      return;
    }

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

document.addEventListener('DOMContentLoaded', () => {
  if (typeof emailjs !== 'undefined') {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }
  initNavbarScroll();
  initSmoothScroll();
  initHamburger();
  initAnimations();
  initContactForm();
});
