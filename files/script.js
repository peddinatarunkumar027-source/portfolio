/* =============================================
   PORTFOLIO — PEDDINA TARUN KUMAR
   JavaScript: Interactions & Animations
   ============================================= */

/* ---- Navbar scroll effect ---- */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

/* ---- Mobile hamburger menu ---- */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('open');
});

// Close menu on nav link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('open');
  });
});

/* ---- Smooth scroll for all anchor links ---- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ---- Scroll Reveal Animation ---- */
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      // Stagger elements within the same parent
      const siblings = Array.from(entry.target.parentElement.querySelectorAll('.reveal'));
      const i = siblings.indexOf(entry.target);
      entry.target.style.transitionDelay = `${Math.min(i * 0.08, 0.4)}s`;

      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target); // fire once
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

/* ---- Active nav link highlight on scroll ---- */
const sections = document.querySelectorAll('section[id]');

const activeLinkObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.querySelectorAll('a').forEach(a => {
        a.style.color = '';
      });
      const activeLink = navLinks.querySelector(`a[href="#${id}"]`);
      if (activeLink) activeLink.style.color = 'var(--blue)';
    }
  });
}, {
  rootMargin: '-40% 0px -55% 0px'
});

sections.forEach(s => activeLinkObserver.observe(s));

/* ---- Contact Form Submission ---- */
const form    = document.getElementById('contactForm');
const success = document.getElementById('formSuccess');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  // Basic validation
  const name    = form.querySelector('#name').value.trim();
  const email   = form.querySelector('#email').value.trim();
  const message = form.querySelector('#message').value.trim();

  if (!name || !email || !message) {
    shakeForm();
    return;
  }
  if (!isValidEmail(email)) {
    shakeField(form.querySelector('#email'));
    return;
  }

  // Simulate sending (replace with real API call / EmailJS etc.)
  const submitBtn = form.querySelector('button[type="submit"]');
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<i class="ph ph-circle-notch ph-spin"></i> Sending...';

  setTimeout(() => {
    submitBtn.disabled = false;
    submitBtn.innerHTML = '<i class="ph ph-paper-plane-tilt"></i> Send Message';
    success.classList.add('show');
    form.reset();
    setTimeout(() => success.classList.remove('show'), 5000);
  }, 1600);
});

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function shakeForm() {
  form.style.animation = 'shake 0.4s ease';
  setTimeout(() => form.style.animation = '', 400);
}

function shakeField(field) {
  field.style.borderColor = '#f87171';
  field.style.animation = 'shake 0.4s ease';
  setTimeout(() => {
    field.style.borderColor = '';
    field.style.animation = '';
  }, 1000);
}

/* Add shake keyframes dynamically */
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    20%       { transform: translateX(-8px); }
    40%       { transform: translateX(8px); }
    60%       { transform: translateX(-5px); }
    80%       { transform: translateX(5px); }
  }
  @keyframes ph-spin {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
  .ph-spin { display: inline-block; animation: ph-spin 0.8s linear infinite; }
`;
document.head.appendChild(shakeStyle);

/* ---- Typed text effect in hero subtitle ---- */
const subtitleEl = document.querySelector('.hero-subtitle');
if (subtitleEl) {
  const phrases = [
    'B.Tech CSE (AI & ML) Student',
    'Python Developer',
    'ML Enthusiast',
    'Problem Solver'
  ];
  let pi = 0, ci = 0, deleting = false;

  function type() {
    const current = phrases[pi];
    if (deleting) {
      ci--;
    } else {
      ci++;
    }

    subtitleEl.innerHTML = `<span class="typed-text">${current.substring(0, ci)}<span class="typed-cursor">|</span></span>`;

    let speed = deleting ? 50 : 90;

    if (!deleting && ci === current.length) {
      speed = 1800; // pause at end
      deleting = true;
    } else if (deleting && ci === 0) {
      deleting = false;
      pi = (pi + 1) % phrases.length;
      speed = 400;
    }

    setTimeout(type, speed);
  }

  // Add cursor style
  const cursorStyle = document.createElement('style');
  cursorStyle.textContent = `
    .typed-cursor {
      display: inline-block;
      color: var(--blue);
      animation: blink 0.7s step-end infinite;
      font-weight: 300;
    }
    @keyframes blink {
      0%, 100% { opacity: 1; }
      50%       { opacity: 0; }
    }
  `;
  document.head.appendChild(cursorStyle);

  setTimeout(type, 1000);
}

/* ---- Parallax blob movement on mousemove ---- */
const blobs = document.querySelectorAll('.blob');
document.addEventListener('mousemove', (e) => {
  const mx = (e.clientX / window.innerWidth - 0.5) * 30;
  const my = (e.clientY / window.innerHeight - 0.5) * 30;

  blobs.forEach((blob, i) => {
    const depth = (i + 1) * 0.4;
    blob.style.transform = `translate(${mx * depth}px, ${my * depth}px)`;
  });
});

/* ---- Pill hover glow effect ---- */
document.querySelectorAll('.pill').forEach(pill => {
  pill.addEventListener('mouseover', () => {
    const color = getComputedStyle(pill).color;
    pill.style.boxShadow = `0 0 16px ${color.replace('rgb', 'rgba').replace(')', ', 0.3)')}`;
  });
  pill.addEventListener('mouseout', () => {
    pill.style.boxShadow = '';
  });
});

/* ---- Navbar logo smooth return to top ---- */
document.querySelector('.nav-logo').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

console.log('%c👋 Hey there!', 'color:#4f8ef7;font-size:18px;font-weight:bold;');
console.log('%cPortfolio by Peddina Tarun Kumar — B.Tech CSE (AI & ML)', 'color:#8b5cf6;font-size:13px;');
