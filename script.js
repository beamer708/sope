/**
 * Sopes Auto Detailing — Site Interactivity
 */

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initSmoothScroll();
  initHeaderScroll();
});

/**
 * Mobile navigation toggle
 */
function initNav() {
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (!toggle || !navLinks) return;

  toggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close nav when clicking a link (for anchor links)
  navLinks.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });
}

/**
 * Smooth scroll for anchor links
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

/**
 * Header background on scroll
 */
function initHeaderScroll() {
  const header = document.querySelector('.header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 50) {
      header.style.background = 'rgba(10, 10, 11, 0.95)';
    } else {
      header.style.background = 'rgba(10, 10, 11, 0.85)';
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
}
