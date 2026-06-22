// Header shadow/shrink on scroll
const siteHeader = document.getElementById('header');
window.addEventListener('scroll', () => {
  siteHeader.classList.toggle('scrolled', window.scrollY > 40);
});

// Scroll-reveal animations
const revealEls = document.querySelectorAll('[data-reveal]');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = entry.target.dataset.revealDelay;
      if (delay) entry.target.style.transitionDelay = `${delay}s`;
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
revealEls.forEach(el => revealObserver.observe(el));

// Mobile nav toggle
const navToggle = document.getElementById('nav-toggle');
const mainNav = document.getElementById('main-nav');
navToggle.addEventListener('click', () => {
  mainNav.classList.toggle('open');
});
mainNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => mainNav.classList.remove('open'));
});

// Back to top button
const backToTop = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
  backToTop.classList.toggle('show', window.scrollY > 400);
});
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Lazy-load reservation widget only when scrolled into view
const resMount = document.getElementById('reservation-widget-mount');
if (resMount) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const iframe = document.createElement('iframe');
        iframe.src = resMount.dataset.src;
        iframe.allow = 'payment *';
        iframe.loading = 'lazy';
        iframe.title = 'Table Reservation Widget';
        iframe.style.width = '100%';
        iframe.style.minHeight = '800px';
        iframe.style.border = 'none';
        iframe.style.overflow = 'scroll';
        resMount.appendChild(iframe);
        observer.disconnect();
      }
    });
  }, { rootMargin: '200px' });
  observer.observe(resMount);
}

// Testimonial slider
const testimonials = document.querySelectorAll('.testimonial');
let current = 0;
function showTestimonial(index) {
  testimonials.forEach(t => t.classList.remove('active'));
  current = (index + testimonials.length) % testimonials.length;
  testimonials[current].classList.add('active');
}
document.getElementById('t-prev').addEventListener('click', () => showTestimonial(current - 1));
document.getElementById('t-next').addEventListener('click', () => showTestimonial(current + 1));
