// ─── CURSOR ANIMATION ───
const cursor = document.getElementById('cursor');
const trail = document.getElementById('cursorTrail');
let mx = 0, my = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; 
  my = e.clientY;
  cursor.style.left = mx - 6 + 'px';
  cursor.style.top = my - 6 + 'px';
  setTimeout(() => {
    trail.style.left = mx - 15 + 'px';
    trail.style.top = my - 15 + 'px';
  }, 60);
});

document.addEventListener('mousedown', () => cursor.style.transform = 'scale(1.8)');
document.addEventListener('mouseup', () => cursor.style.transform = 'scale(1)');

// ─── HAMBURGER / MOBILE MENU ───
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('active');
  document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
});

document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('active');
    document.body.style.overflow = '';
  });
});

// ─── SCROLL REVEAL EFFECT ───
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

reveals.forEach(el => observer.observe(el));

// ─── SCROLL TO TOP ───
const scrollTop = document.getElementById('scrollTop');
window.addEventListener('scroll', () => {
  scrollTop.classList.toggle('visible', window.scrollY > 400);
});
scrollTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ─── FIXED NAVIGATION ACTIVE STATE FALLBACK ───
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 100) current = s.id;
  });
  
  // Fallback default state for page headers
  if (window.scrollY < 200) current = 'hero';

  navLinks.forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + current ? 'var(--text)' : '';
  });
});

// ─── CONTACT FORM ACTIONS ───
document.getElementById('sendBtn').addEventListener('click', () => {
  const fname = document.getElementById('fname').value.trim();
  const lname = document.getElementById('lname').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  const msg = document.getElementById('formMsg');

  if (!fname || !email || !message) {
    msg.className = 'form-msg error';
    msg.textContent = '⚠ Please fill in your name, email, and message.';
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    msg.className = 'form-msg error';
    msg.textContent = '⚠ Please enter a valid email address.';
    return;
  }
  
  msg.className = 'form-msg success';
  msg.textContent = `✓ Thanks ${fname}! Your message has been sent. Gulam will be in touch soon.`;
  
  // Clear fields
  ['fname','lname','email','subject','message'].forEach(id => document.getElementById(id).value = '');
  setTimeout(() => msg.className = 'form-msg', 6000);
});

// ─── TYPING EFFECT FOR HERO ROLE ───
const roles = ['Full-Stack Developer', 'React.js Developer', 'Frontend Engineer', 'MCA Student'];
let ri = 0, ci = 0, del = false;
const roleEl = document.querySelector('.hero-role');

if (roleEl) {
  setInterval(() => {
    const current = roles[ri];
    if (!del) {
      roleEl.textContent = current.slice(0, ++ci);
      if (ci === current.length) { del = true; }
    } else {
      roleEl.textContent = current.slice(0, --ci);
      if (ci === 0) { del = false; ri = (ri + 1) % roles.length; }
    }
  }, 80);
}