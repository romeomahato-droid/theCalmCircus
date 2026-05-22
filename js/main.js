/* ===== THE CALM CIRCUS — MAIN JS ===== */

// ── Navbar scroll ──────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ── Mobile nav toggle ──────────────────────────
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen);
  // Animate hamburger → X
  navToggle.querySelectorAll('span').forEach((s, i) => {
    if (isOpen) {
      if (i === 0) s.style.transform = 'translateY(7px) rotate(45deg)';
      if (i === 1) s.style.opacity = '0';
      if (i === 2) s.style.transform = 'translateY(-7px) rotate(-45deg)';
    } else {
      s.style.transform = '';
      s.style.opacity = '';
    }
  });
});

// Close nav on link click
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.querySelectorAll('span').forEach(s => {
      s.style.transform = '';
      s.style.opacity = '';
    });
  });
});

// ── Smooth active nav links ────────────────────
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAnchors.forEach(a => {
        a.classList.remove('active');
        if (a.getAttribute('href') === '#' + entry.target.id) {
          a.classList.add('active');
        }
      });
    }
  });
}, { threshold: 0.3 });

sections.forEach(s => observer.observe(s));

// ── FAQ accordion ──────────────────────────────
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    // Close all
    document.querySelectorAll('.faq-q').forEach(b => {
      b.setAttribute('aria-expanded', 'false');
      b.nextElementSibling.classList.remove('open');
    });
    // Open clicked (unless it was open)
    if (!expanded) {
      btn.setAttribute('aria-expanded', 'true');
      btn.nextElementSibling.classList.add('open');
    }
  });
});

// ── Payment tab toggle ─────────────────────────
document.querySelectorAll('.pay-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.pay-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.pay-panel').forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById(tab.dataset.tab + '-panel').classList.add('active');
  });
});

// ── Booking form multi-step ─────────────────────
const bookingForm  = document.getElementById('bookingForm');
const bookFormStep = document.getElementById('bookFormStep');
const paymentStep  = document.getElementById('paymentStep');
const confirmStep  = document.getElementById('confirmStep');

// Simple validation helper
function validateField(el) {
  if (!el.value.trim()) {
    el.classList.add('error');
    return false;
  }
  if (el.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value)) {
    el.classList.add('error');
    return false;
  }
  el.classList.remove('error');
  return true;
}

bookingForm && bookingForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const fname  = document.getElementById('fname');
  const femail = document.getElementById('femail');
  const fphone = document.getElementById('fphone');
  const fdate  = document.getElementById('fdate');

  const valid = [
    validateField(fname),
    validateField(femail),
    validateField(fphone),
    validateField(fdate),
  ].every(Boolean);

  if (!valid) return;

  // Determine price multiplier
  const people = document.getElementById('fpeople').value;
  const numPeople = parseInt(people) || 1;
  const total = numPeople >= 5 ? '₹4,250+' : '₹' + (4250 * numPeople).toLocaleString('en-IN');

  // Populate payment step
  document.getElementById('payName').textContent  = fname.value.split(' ')[0];
  document.getElementById('payDate').textContent   = fdate.value;
  document.getElementById('payPeople').textContent = people === '1'
    ? ''
    : `· ${people} ${people === '5+' ? 'or more' : ''} people · ${total}`;

  // Save email for confirmation
  document.getElementById('confirmDate').textContent  = fdate.value;
  document.getElementById('confirmEmail').textContent = femail.value;

  // Try to save booking to table API
  try {
    await fetch('tables/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name:   fname.value,
        email:  femail.value,
        phone:  fphone.value,
        date:   fdate.value,
        people: people,
        message: document.getElementById('fmsg').value,
        status: 'pending_payment'
      })
    });
  } catch (_) { /* silently fail — form still proceeds */ }

  // Transition to payment step
  bookFormStep.classList.add('hidden');
  paymentStep.classList.remove('hidden');
  paymentStep.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

// Confirm payment button
document.getElementById('confirmPayBtn') && document.getElementById('confirmPayBtn').addEventListener('click', async () => {
  // Mark as paid in table
  try {
    const resp = await fetch('tables/bookings?sort=created_at&limit=1');
    if (resp.ok) {
      const data = await resp.json();
      if (data.data && data.data.length > 0) {
        const lastId = data.data[data.data.length - 1].id;
        await fetch(`tables/bookings/${lastId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: 'payment_claimed' })
        });
      }
    }
  } catch (_) { /* silently fail */ }

  paymentStep.classList.add('hidden');
  confirmStep.classList.remove('hidden');
  confirmStep.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

// Input error removal on typing
document.querySelectorAll('.form-group input, .form-group select').forEach(el => {
  el.addEventListener('input', () => el.classList.remove('error'));
});

// ── Scroll reveal animation ────────────────────
const revealEls = document.querySelectorAll(
  '.who-card, .included-item, .testi-card, .flow-step, .corp-opt, .outcome-item, .schedule-table tr, .way-pill'
);

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = entry.target.style.transform
          .replace('translateY(30px)', 'translateY(0)');
      }, i * 60);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealEls.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = (el.style.transform || '') + ' translateY(30px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  revealObserver.observe(el);
});

// ── Gallery scroll drag ────────────────────────
const galleryScroll = document.querySelector('.gallery-scroll');
if (galleryScroll) {
  let isDown = false, startX, scrollLeft;
  galleryScroll.addEventListener('mousedown', e => {
    isDown = true;
    galleryScroll.style.cursor = 'grabbing';
    startX = e.pageX - galleryScroll.offsetLeft;
    scrollLeft = galleryScroll.scrollLeft;
  });
  galleryScroll.addEventListener('mouseleave', () => { isDown = false; galleryScroll.style.cursor = 'grab'; });
  galleryScroll.addEventListener('mouseup', () => { isDown = false; galleryScroll.style.cursor = 'grab'; });
  galleryScroll.addEventListener('mousemove', e => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - galleryScroll.offsetLeft;
    const walk = (x - startX) * 2;
    galleryScroll.scrollLeft = scrollLeft - walk;
  });
  galleryScroll.style.cursor = 'grab';
}

// ── Schedule date pre-fill from URL ────────────
const urlParams = new URLSearchParams(window.location.search);
const dateParam = urlParams.get('date');
if (dateParam) {
  const sel = document.getElementById('fdate');
  if (sel) {
    for (let o of sel.options) {
      if (o.value.toLowerCase().includes(dateParam.toLowerCase())) {
        o.selected = true;
        break;
      }
    }
  }
}

// ── Schedule "Book →" pre-selects date ────────
document.querySelectorAll('.btn-table').forEach(btn => {
  btn.addEventListener('click', e => {
    e.preventDefault();
    const row = btn.closest('tr');
    const dateCell = row ? row.cells[1] : null;
    if (dateCell) {
      const dateText = dateCell.querySelector('strong')?.textContent?.trim();
      const sel = document.getElementById('fdate');
      if (sel && dateText) {
        for (let o of sel.options) {
          if (o.value === dateText) { o.selected = true; break; }
        }
      }
    }
    document.getElementById('book').scrollIntoView({ behavior: 'smooth' });
  });
});

// ── Hero parallax (subtle) ────────────────────
const heroImg = document.querySelector('.hero-img');
window.addEventListener('scroll', () => {
  if (heroImg) {
    const y = window.scrollY * 0.25;
    heroImg.style.transform = `translateY(${y}px)`;
  }
}, { passive: true });

// ── Init table schema ─────────────────────────
(async function initSchema() {
  try {
    await fetch('tables/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        __schema_check: true,
        name: '',
        email: '',
        phone: '',
        date: '',
        people: '',
        message: '',
        status: ''
      })
    });
  } catch (_) {}
})();
/* =====================
HERO IMAGE SLIDER
===================== */


/* =====================
HERO IMAGE SLIDER
===================== */

document.addEventListener(
"DOMContentLoaded",
()=>{

const slides =
document.querySelectorAll(
".hero-slide"
);

if(slides.length===0) return;

let current = 0;

setInterval(()=>{

slides[current]
.classList.remove(
"active"
);

current =
(current + 1)
%
slides.length;

slides[current]
.classList.add(
"active"
);

},5000);

});
