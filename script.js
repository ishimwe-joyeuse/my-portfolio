document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. Animated Typing Effect in Hero
  // ==========================================
  const subtitleElement = document.querySelector('.hero .subtitle');
  if (subtitleElement) {
    const roles = [
      "IT Student & Researcher",
      "Information Management Specialist",
      "Data Analytics & Power BI Practitioner",
      "Web & Database Developer"
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
      const currentRole = roles[roleIndex];
      
      if (isDeleting) {
        subtitleElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
      } else {
        subtitleElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
      }

      let typingSpeed = isDeleting ? 40 : 80;

      if (!isDeleting && charIndex === currentRole.length) {
        typingSpeed = 2000; // Pause at full text
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingSpeed = 500; // Pause before typing next word
      }

      setTimeout(typeEffect, typingSpeed);
    }

    typeEffect();
  }

  // ==========================================
  // 2. Scroll Reveal Animations
  // ==========================================
  const revealElements = document.querySelectorAll('.section, .skill-card, .project-card, .experience-card, .contact-card');
  
  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    revealElements.forEach(el => {
      const elementTop = el.getBoundingClientRect().top;
      const revealPoint = 100;

      if (elementTop < windowHeight - revealPoint) {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }
    });
  };

  // Initial styling for reveal animation
  revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
  });

  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll(); // Trigger once on load

  // ==========================================
  // 3. Highlight Active Navigation Link on Scroll
  // ==========================================
  const sections = document.querySelectorAll('section, header');
  const navLinks = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let currentSectionId = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  });

  // ==========================================
  // 4. Mobile Menu Navigation Toggle
  // ==========================================
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-links');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('nav-active');
    });

    // Close menu when clicking links
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('nav-active');
      });
    });
  }

  // ==========================================
  // 5. Dark/Light Theme Switcher
  // ==========================================
  const themeToggleBtn = document.querySelector('#theme-toggle');
  const themeIcon = themeToggleBtn ? themeToggleBtn.querySelector('i') : null;

  if (themeToggleBtn) {
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark') {
      document.body.classList.add('dark-theme');
      if (themeIcon) themeIcon.className = 'fa-solid fa-sun';
    }

    themeToggleBtn.addEventListener('click', () => {
      document.body.classList.toggle('dark-theme');
      const isDark = document.body.classList.contains('dark-theme');

      if (themeIcon) {
        themeIcon.className = isDark ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
      }

      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
  }

  // ==========================================
  // 6. Floating Back-to-Top Button
  // ==========================================
  const scrollTopBtn = document.createElement('button');
  scrollTopBtn.id = 'scrollTopBtn';
  scrollTopBtn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
  scrollTopBtn.setAttribute('aria-label', 'Scroll to Top');
  document.body.appendChild(scrollTopBtn);

  // Apply button styling dynamically
  Object.assign(scrollTopBtn.style, {
    position: 'fixed',
    bottom: '30px',
    right: '30px',
    width: '45px',
    height: '45px',
    borderRadius: '50%',
    backgroundColor: 'var(--primary-color, #2563eb)',
    color: '#ffffff',
    border: 'none',
    cursor: 'pointer',
    display: 'none',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '1.1rem',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
    zIndex: '1000',
    transition: 'opacity 0.3s ease, transform 0.3s ease'
  });

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      scrollTopBtn.style.display = 'flex';
    } else {
      scrollTopBtn.style.display = 'none';
    }
  });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

});