// EmailJS credentials — replace with your own values
const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY';
const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';

// Function stubs for DOMContentLoaded handler
function initNavbarScroll() {
  // To be implemented in subsequent tasks
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
  // To be implemented in subsequent tasks
}

document.addEventListener('DOMContentLoaded', () => {
  emailjs.init(EMAILJS_PUBLIC_KEY);
  initNavbarScroll();
  initSmoothScroll();
  initHamburger();
  initAnimations();
  initContactForm();
});
