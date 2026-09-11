/* ==========================================================================
   Interactive Functions & Navigation - Ishimwe Joyeuse
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Select DOM Elements
  const navToggle = document.querySelector('.nav-toggle');
  const navLinksContainer = document.querySelector('.nav-links');
  const navLinks = document.querySelectorAll('.nav-links a');
  const navbar = document.querySelector('.navbar');
  const sections = document.querySelectorAll('section');

  /* ------------------------------------------------------------------------
     1. Mobile Navigation Toggle
     ------------------------------------------------------------------------ */
  if (navToggle && navLinksContainer) {
    navToggle.addEventListener('click', () => {
      navLinksContainer.classList.toggle('active');
      const isExpanded = navLinksContainer.classList.contains('active');
      navToggle.setAttribute('aria-expanded', isExpanded);
      
      // Toggle Hamburger Icon appearance
      const icon = navToggle.querySelector('i');
      if (icon) {
        if (isExpanded) {
          icon.classList.remove('fa-bars');
          icon.classList.add('fa-xmark');
        } else {
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-bars');
        }
      }
    });
  }

  // Close mobile menu when clicking any nav link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navLinksContainer.classList.contains('active')) {
        navLinksContainer.classList.remove('active');
        if (navToggle) {
          navToggle.setAttribute('aria-expanded', 'false');
          const icon = navToggle.querySelector('i');
          if (icon) {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
          }
        }
      }
    });
  });

  /* ------------------------------------------------------------------------
     2. Navbar Elevation on Scroll
     ------------------------------------------------------------------------ */
  const handleNavbarScroll = () => {
    if (window.scrollY > 30) {
      navbar.style.boxShadow = '0 10px 30px -10px rgba(0, 0, 0, 0.1)';
    } else {
      navbar.style.boxShadow = 'none';
    }
  };

  window.addEventListener('scroll', handleNavbarScroll);

  /* ------------------------------------------------------------------------
     3. Active Scroll Indicator (Highlight Current Section in Nav)
     ------------------------------------------------------------------------ */
  const highlightActiveSection = () => {
    let currentSectionId = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', highlightActiveSection);

  /* ------------------------------------------------------------------------
     4. Smooth Scroll for Anchor Links (Fallback support)
     ------------------------------------------------------------------------ */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  /* ------------------------------------------------------------------------
     5. Card Hover Lift & Glow Effect
     ------------------------------------------------------------------------ */
  const cards = document.querySelectorAll('.skill-card, .project-card, .experience-card');
  
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transition = 'transform 0.25s ease, box-shadow 0.25s ease';
    });
  });
});