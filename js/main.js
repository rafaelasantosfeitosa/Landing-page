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
  // To be implemented in subsequent tasks
}

function initHamburger() {
  // To be implemented in subsequent tasks
}

function initAnimations() {
  // To be implemented in subsequent tasks
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
  emailjs.init(EMAILJS_PUBLIC_KEY);
  initNavbarScroll();
  initSmoothScroll();
  initHamburger();
  initAnimations();
  initContactForm();
});
