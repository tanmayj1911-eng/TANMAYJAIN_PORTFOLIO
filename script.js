/**
 * ==========================================================================
 * PORTFOLIO JAVASCRIPT (Minimal Vanilla JS)
 * Author: Tanmay Jain
 * Description: Lightweight utility scripts for mobile menu toggle,
 *              smooth navigation scrollspy, and interactive touches.
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // --------------------------------------------------------------------------
  // 1. MOBILE NAVIGATION TOGGLE & AUTO-CLOSE
  // --------------------------------------------------------------------------
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (navToggle && navMenu) {
    // Click toggle button to open / close mobile menu
    navToggle.addEventListener('click', (event) => {
      event.stopPropagation();
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', !isExpanded);
      navMenu.classList.toggle('open');
    });

    // Close menu when clicking any nav link (crucial for single-page scrolling)
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close menu when clicking outside of it
    document.addEventListener('click', (event) => {
      if (!navMenu.contains(event.target) && !navToggle.contains(event.target)) {
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });

    // Close menu when pressing Escape key
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // --------------------------------------------------------------------------
  // 2. SCROLLSPY: HIGHLIGHT ACTIVE NAVBAR LINK ON SCROLL
  // Uses IntersectionObserver to detect which section is in the viewport
  // --------------------------------------------------------------------------
  const sections = document.querySelectorAll('section[id]');

  if (sections.length > 0 && navLinks.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px', // Triggers when section is in upper-mid viewport
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const currentId = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            const href = link.getAttribute('href');
            if (href === `#${currentId}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, observerOptions);

    sections.forEach((section) => observer.observe(section));
  }

  // --------------------------------------------------------------------------
  // 3. DYNAMIC FOOTER YEAR
  // Automatically keeps the copyright year current
  // --------------------------------------------------------------------------
  const currentYearSpan = document.getElementById('current-year');
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  // --------------------------------------------------------------------------
  // 4. CONTACT FORM SUBMISSION DEMO (For static sites)
  // Shows a friendly confirmation when submitted without needing a live backend
  // --------------------------------------------------------------------------
  const contactForm = document.getElementById('portfolio-contact-form');
  const formStatus = document.getElementById('form-status');

  if (contactForm && formStatus) {
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault(); // Prevents page reload

      const name = document.getElementById('name')?.value || 'Friend';
      const email = document.getElementById('email')?.value || '';
      const subject = document.getElementById('subject')?.value || 'Portfolio Inquiry';
      const message = document.getElementById('message')?.value || '';

      // Display friendly success notice
      formStatus.textContent = `Thank you, ${name}! Your message has been received. I will reply to ${email} shortly.`;
      formStatus.className = 'form-status success';

      // Reset form fields
      contactForm.reset();

      // Clear the message after 6 seconds
      setTimeout(() => {
        formStatus.textContent = '';
        formStatus.className = 'form-status';
      }, 6000);
    });
  }
});
