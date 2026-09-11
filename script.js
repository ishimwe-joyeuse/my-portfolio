/* ==========================================================================
   Interactive Functions, Dynamic Theme & Motion - Ishimwe Joyeuse
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const navToggle = document.querySelector('.nav-toggle');
  const navLinksContainer = document.querySelector('.nav-links');
  const navLinks = document.querySelectorAll('.nav-links a');
  const navbar = document.querySelector('.navbar');
  const sections = document.querySelectorAll('section');
  const themeToggleBtn = document.querySelector('.icon-btn'); // Theme toggle button

  /* ------------------------------------------------------------------------
     1. Light Blue & Deep Black Theme Toggle System
     ------------------------------------------------------------------------ */
  const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('portfolio-theme', newTheme);
      updateThemeIcon(newTheme);
    });
  }

  function updateThemeIcon(theme) {
    if (!themeToggleBtn) return;
    const icon = themeToggleBtn.querySelector('i');
    if (icon) {
      if (theme === 'light') {
        icon.className = 'fa-solid fa-moon';
      } else {
        icon.className = 'fa-solid fa-sun';
      }
    }
  }

  /* ------------------------------------------------------------------------
     2. Canvas Animated Motion Background (Glowing Blue Floating Nodes)
     ------------------------------------------------------------------------ */
  const canvas = document.createElement('canvas');
  canvas.id = 'bg-motion-canvas';
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '-1';
  canvas.style.opacity = '0.4';
  document.body.prepend(canvas);

  const ctx = canvas.getContext('2d');
  let particles = [];

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 1;
      this.speedX = (Math.random() - 0.5) * 0.8;
      this.speedY = (Math.random() - 0.5) * 0.8;
      this.alpha = Math.random() * 0.5 + 0.2;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
        this.reset();
      }
    }

    draw() {
      ctx.fillStyle = `rgba(59, 130, 246, ${this.alpha})`; // Highlighted Blue (#3b82f6)
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function initParticles() {
    particles = [];
    const count = Math.min(Math.floor(window.innerWidth / 20), 60);
    for (let i = 0; i < count; i++) {
      particles.push(new Particle());
    }
  }
  initParticles();

  function animateCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animateCanvas);
  }
  animateCanvas();

  /* ------------------------------------------------------------------------
     3. Mobile Navigation Menu Toggle
     ------------------------------------------------------------------------ */
  if (navToggle && navLinksContainer) {
    navToggle.addEventListener('click', () => {
      navLinksContainer.classList.toggle('active');
      const isExpanded = navLinksContainer.classList.contains('active');
      navToggle.setAttribute('aria-expanded', isExpanded);
      
      const icon = navToggle.querySelector('i');
      if (icon) {
        icon.className = isExpanded ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
      }
    });
  }

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navLinksContainer.classList.contains('active')) {
        navLinksContainer.classList.remove('active');
        if (navToggle) {
          navToggle.setAttribute('aria-expanded', 'false');
          const icon = navToggle.querySelector('i');
          if (icon) icon.className = 'fa-solid fa-bars';
        }
      }
    });
  });

  /* ------------------------------------------------------------------------
     4. Intersection Observer: Scroll Reveal Motion & Section Highlighting
     ------------------------------------------------------------------------ */
  const revealElements = document.querySelectorAll('.skill-card, .project-card, .experience-card, .section-title');
  
  revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(25px)';
    el.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
  });

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  revealElements.forEach(el => revealObserver.observe(el));

  // Highlight active menu item on scroll
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
            link.style.color = '#3b82f6'; // Highlighted Blue
          } else {
            link.classList.remove('active');
            link.style.color = '';
          }
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(section => sectionObserver.observe(section));

  /* ------------------------------------------------------------------------
     5. Navbar Shadow on Scroll
     ------------------------------------------------------------------------ */
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar.style.boxShadow = '0 10px 30px -10px rgba(0, 0, 0, 0.3)';
    } else {
      navbar.style.boxShadow = 'none';
    }
  });

  /* ------------------------------------------------------------------------
     6. Smooth Scroll with Offset
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
});