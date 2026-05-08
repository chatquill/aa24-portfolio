/* AA24 portfolio — main script
   handles: theme toggle, hamburger menu, scroll fade-ins, contact form validation
*/


// ============================================
// THEME TOGGLE (light / dark)
// ============================================
const themeBtn = document.getElementById('themeBtn');

// load saved theme on page load
if (localStorage.getItem('theme') === 'light') {
  document.body.classList.add('light');
}

themeBtn.addEventListener('click', function() {
  document.body.classList.toggle('light');

  // save the choice so it stays across pages
  if (document.body.classList.contains('light')) {
    localStorage.setItem('theme', 'light');
  } else {
    localStorage.setItem('theme', 'dark');
  }
});


// ============================================
// HAMBURGER MENU (mobile)
// ============================================
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', function() {
  navLinks.classList.toggle('open');
});

// close menu when a link is clicked
const links = navLinks.querySelectorAll('a');
for (let i = 0; i < links.length; i++) {
  links[i].addEventListener('click', function() {
    navLinks.classList.remove('open');
  });
}


// ============================================
// FADE-IN ON SCROLL
// ============================================
// uses IntersectionObserver to add .visible when element enters viewport
const fadeElements = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.15 });

fadeElements.forEach(function(el) {
  observer.observe(el);
});


// ============================================
// CONTACT FORM VALIDATION
// ============================================
// only runs on the contact page (where the form exists)
const form = document.getElementById('contactForm');

if (form) {

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    // get values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    // clear old errors
    document.getElementById('errName').textContent = '';
    document.getElementById('errEmail').textContent = '';
    document.getElementById('errSubject').textContent = '';
    document.getElementById('errMessage').textContent = '';

    let ok = true;

    // check name
    if (name.length < 2) {
      document.getElementById('errName').textContent = 'please enter your name';
      ok = false;
    }

    // check email (simple regex)
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      document.getElementById('errEmail').textContent = 'please enter a valid email';
      ok = false;
    }

    // check subject
    if (subject.length < 2) {
      document.getElementById('errSubject').textContent = 'subject is required';
      ok = false;
    }

    // check message
    if (message.length < 5) {
      document.getElementById('errMessage').textContent = 'message is too short';
      ok = false;
    }

    // all good!
    if (ok) {
      document.getElementById('successMsg').classList.add('show');
      form.reset();

      // hide the message after a few seconds
      setTimeout(function() {
        document.getElementById('successMsg').classList.remove('show');
      }, 4000);
    }
  });
}


// ============================================
// NAVBAR shrinks a tiny bit on scroll
// ============================================
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', function() {
  if (window.scrollY > 30) {
    navbar.style.top = '10px';
  } else {
    navbar.style.top = '18px';
  }
});
