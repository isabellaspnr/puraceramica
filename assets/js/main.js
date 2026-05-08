 /* =========================================
   PURACERÂMICA - Main JavaScript
   ========================================= */

// ── HERO SLIDESHOW (only runs if hero exists) ──
const heroSlides = document.querySelectorAll('.hero-slide');
const heroDots   = document.querySelectorAll('.hero-dot');
const heroCounter = document.getElementById('heroCounter');
let current = 0;
let timer;

function goToSlide(n) {
  if (!heroSlides.length || !heroCounter) return; // Guard: no hero on this page
  heroSlides[current].classList.remove('active');
  heroDots[current].classList.remove('active');
  current = (n + heroSlides.length) % heroSlides.length;
  heroSlides[current].classList.add('active');
  heroDots[current].classList.add('active');
  heroCounter.innerHTML = `<span>${String(current + 1).padStart(2,'0')}</span> / 0${heroSlides.length}`;
  resetTimer();
}

function resetTimer() {
  clearInterval(timer);
  if (heroSlides.length) {
    timer = setInterval(() => goToSlide(current + 1), 5000);
  }
}

if (heroSlides.length) resetTimer();

// ── MOBILE LANG ──
function toggleMobileLang(btn) {
  const switcher = btn.closest('.mobile-lang-switcher');
  const isOpen = switcher.classList.toggle('open');
  btn.querySelector('.mobile-lang-arrow').textContent = isOpen ? '↓' : '↑';
}

// ── MONTH TABS (workshop pages) ──
function switchMonth(month, btn) {
  document.querySelectorAll('.month-panel').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.month-tab').forEach(el => el.classList.remove('active'));
  document.getElementById('month-' + month).classList.add('active');
  btn.classList.add('active');
}

document.addEventListener("DOMContentLoaded", () => {

  // ── MOBILE NAVIGATION ──
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.querySelector('.nav-links');
  const body = document.body;

  function toggleMenu() {
    const isOpen = navLinks.classList.contains('active');
    if (isOpen) {
      navLinks.classList.remove('active');
      hamburger.classList.remove('active');
      body.classList.remove('menu-open');
      body.style.overflow = '';
    } else {
      navLinks.classList.add('active');
      hamburger.classList.add('active');
      body.classList.add('menu-open');
      body.style.overflow = 'hidden';
    }
  }

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', toggleMenu);

    document.querySelectorAll('.dropdown-toggle').forEach(link => {
      link.addEventListener('click', e => {
        if (window.innerWidth <= 768) {
          e.preventDefault();
          const parent = link.parentElement;
          if (parent) {
            document.querySelectorAll('.dropdown.open').forEach(dropdown => {
              if (dropdown !== parent) dropdown.classList.remove('open');
            });
            parent.classList.toggle('open');
          }
        }
      });
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 768 && body.classList.contains('menu-open')) {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
        body.classList.remove('menu-open');
        body.style.overflow = '';
      }
    });
  }

  // ── SLIDESHOW (for .slideshow-container based slideshows) ──
  const slides = Array.from(document.getElementsByClassName("slide"));
  const dots = Array.from(document.getElementsByClassName("slide-dot"));
  const slideshowContainer = document.querySelector(".slideshow-container");

  let slideIndex = 0;
  let slideTimer;
  let touchStartX = 0;
  let touchEndX = 0;
  let touchStartTime = 0;
  let isAutoplayPaused = false;

  function showSlide(index) {
    if (!slides.length) return;
    if (index >= slides.length) slideIndex = 0;
    else if (index < 0) slideIndex = slides.length - 1;
    else slideIndex = index;
    slides.forEach(s => s.classList.remove("active"));
    slides[slideIndex].classList.add("active");
    if (dots.length) {
      dots.forEach(d => d.classList.remove("active"));
      dots[slideIndex].classList.add("active");
    }
  }

  function nextSlide() { slideIndex++; showSlide(slideIndex); }
  function prevSlide() { slideIndex--; showSlide(slideIndex); }

  function resetSlideTimer() {
    if (isAutoplayPaused) return;
    clearInterval(slideTimer);
    slideTimer = setInterval(nextSlide, 6000);
  }

  function pauseAutoplay() { isAutoplayPaused = true; clearInterval(slideTimer); }
  function resumeAutoplay() { isAutoplayPaused = false; resetSlideTimer(); }

  function handleTouchStart(e) {
    touchStartX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
    touchStartTime = Date.now();
    pauseAutoplay();
  }

  function handleTouchMove(e) {
    const touchCurrentX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
    if (Math.abs(touchStartX - touchCurrentX) > 10) e.preventDefault();
  }

  function handleTouchEnd(e) {
    touchEndX = e.type.includes('mouse') ? e.clientX : e.changedTouches[0].clientX;
    const touchDuration = Date.now() - touchStartTime;
    const swipeDistance = touchStartX - touchEndX;
    if (Math.abs(swipeDistance) > 50 && touchDuration < 500) {
      if (swipeDistance > 0) nextSlide(); else prevSlide();
      resetSlideTimer();
    }
    setTimeout(resumeAutoplay, 3000);
  }

  if (slides.length) {
    showSlide(slideIndex);
    slideTimer = setInterval(nextSlide, 6000);
    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        pauseAutoplay();
        slideIndex = index;
        showSlide(slideIndex);
        resetSlideTimer();
        setTimeout(resumeAutoplay, 3000);
      });
    });
  }

  if (slideshowContainer) {
    slideshowContainer.addEventListener("touchstart", handleTouchStart, { passive: true });
    slideshowContainer.addEventListener("touchmove", handleTouchMove, { passive: false });
    slideshowContainer.addEventListener("touchend", handleTouchEnd, { passive: true });

    let isDragging = false;
    slideshowContainer.addEventListener("mousedown", (e) => { isDragging = true; handleTouchStart(e); });
    slideshowContainer.addEventListener("mousemove", (e) => { if (isDragging) handleTouchMove(e); });
    slideshowContainer.addEventListener("mouseup", (e) => { if (isDragging) { isDragging = false; handleTouchEnd(e); } });
    slideshowContainer.addEventListener("mouseleave", () => { isDragging = false; });

    if (!('ontouchstart' in window)) {
      slideshowContainer.addEventListener("mouseenter", pauseAutoplay);
      slideshowContainer.addEventListener("mouseleave", () => setTimeout(resumeAutoplay, 1000));
    }
  }

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) pauseAutoplay(); else resumeAutoplay();
  });

  // ── STEPS SLIDESHOW (mobile) ──
  const stepsContainers = document.querySelectorAll('.steps, .steps-grid');
  stepsContainers.forEach(container => {
    if (window.innerWidth > 768) return;
    const steps = container.querySelectorAll('.step');
    const indicators = container.parentElement.querySelectorAll('.step-indicator');
    if (steps.length === 0) return;

    let currentStep = 0;
    let startX = 0, startY = 0, isDragging = false, isHorizontalSwipe = false;

    function showStep(index) {
      steps.forEach(step => step.classList.remove('active'));
      indicators.forEach(indicator => indicator.classList.remove('active'));
      if (steps[index]) steps[index].classList.add('active');
      if (indicators[index]) indicators[index].classList.add('active');
      currentStep = index;
    }

    function handleStart(e) {
      isDragging = true; isHorizontalSwipe = false;
      startX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
      startY = e.type.includes('mouse') ? e.clientY : e.touches[0].clientY;
    }

    function handleMove(e) {
      if (!isDragging) return;
      const currentX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
      const currentY = e.type.includes('mouse') ? e.clientY : e.touches[0].clientY;
      const diffX = Math.abs(currentX - startX), diffY = Math.abs(currentY - startY);
      if (!isHorizontalSwipe && (diffX > 10 || diffY > 10)) isHorizontalSwipe = diffX > diffY;
      if (isHorizontalSwipe) e.preventDefault();
    }

    function handleEnd(e) {
      if (!isDragging) return;
      isDragging = false;
      if (!isHorizontalSwipe) return;
      const endX = e.type.includes('mouse') ? e.clientX : e.changedTouches[0].clientX;
      const diffX = startX - endX;
      if (Math.abs(diffX) > 50) {
        if (diffX > 0) currentStep = (currentStep + 1) % steps.length;
        else currentStep = (currentStep - 1 + steps.length) % steps.length;
        showStep(currentStep);
      }
    }

    indicators.forEach((indicator, index) => indicator.addEventListener('click', () => showStep(index)));
    container.addEventListener('touchstart', handleStart, { passive: true });
    container.addEventListener('touchmove', handleMove, { passive: false });
    container.addEventListener('touchend', handleEnd, { passive: true });
    container.addEventListener('mousedown', handleStart);
    container.addEventListener('mousemove', handleMove);
    container.addEventListener('mouseup', handleEnd);
    container.addEventListener('mouseleave', () => { if (isDragging) isDragging = false; });
    showStep(0);
  });

  // ── FAQ TEASER ANIMATION ──
  (function () {
    const el = document.querySelector('.faq-teaser');
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add('is-visible'); io.disconnect(); }
    }, { threshold: 0.2 });
    io.observe(el);
  })();

  // ── FAQ ACCORDION ──
  const faqItems = Array.from(document.querySelectorAll('.faq-item'));

  function closeItem(item) {
    if (!item.classList.contains('open')) return;
    const ans = item.querySelector('.answer');
    if (ans) { ans.style.maxHeight = ans.scrollHeight + 'px'; requestAnimationFrame(() => { ans.style.maxHeight = '0px'; }); }
    item.classList.remove('open');
  }

  function openItem(item) {
    const ans = item.querySelector('.answer');
    if (ans) ans.style.maxHeight = ans.scrollHeight + 'px';
    item.classList.add('open');
  }

  faqItems.forEach(item => {
    const btn = item.querySelector('.question');
    const ans = item.querySelector('.answer');
    if (!btn || !ans) return;
    ans.style.maxHeight = '0px';
    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      faqItems.forEach(other => { if (other !== item) closeItem(other); });
      if (isOpen) closeItem(item); else openItem(item);
    });
    window.addEventListener('resize', () => {
      if (item.classList.contains('open')) ans.style.maxHeight = ans.scrollHeight + 'px';
    });
  });

  // ── LIGHTBOX ──
  const lightboxElement = document.getElementById("lightbox");
  const angebotImages = document.querySelectorAll(".angebot-bild");
  const inspoImages = document.querySelectorAll(".media img");

  if (lightboxElement) {
    [...angebotImages, ...inspoImages].forEach(img => {
      img.addEventListener("click", () => {
        const lightboxImg = lightboxElement.querySelector("img");
        if (lightboxImg) {
          lightboxElement.classList.add("active");
          lightboxImg.src = img.src;
          lightboxImg.alt = img.alt;
        }
      });
    });
    lightboxElement.addEventListener("click", () => lightboxElement.classList.remove("active"));
  }

  // ── WORKSHOP BOOKING ──
  disablePastDates();
  initMonthSwitcher();

  // Event delegation on container — more reliable than change on individual radios
  const monthSwitcher = document.querySelector('.month-switcher');
  if (monthSwitcher) {
    monthSwitcher.addEventListener('click', (e) => {
      const block = e.target.closest('.date-block');
      if (block && block.classList.contains('available')) {
        setTimeout(updateBookingLink, 0); // wait for radio state to settle
      }
    });
  }

  // Fallback: direct radio change listeners
  document.querySelectorAll('input[name="workshop-date"]').forEach(radio => {
    radio.addEventListener('change', updateBookingLink);
  });

  updateBookingLink();
});

// ── WORKSHOP FUNCTIONS ──
function incrementQty() {
  const input = document.getElementById('quantity');
  if (!input) return;
  if (parseInt(input.value) < 10) { input.value = parseInt(input.value) + 1; updateBookingLink(); }
}

function decrementQty() {
  const input = document.getElementById('quantity');
  if (!input) return;
  if (parseInt(input.value) > 1) { input.value = parseInt(input.value) - 1; updateBookingLink(); }
}

function isPastDate(dateString) {
  try {
    const parts = dateString.split('-');
    const workshopDate = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    workshopDate.setHours(0, 0, 0, 0);
    return workshopDate < today;
  } catch (error) { return false; }
}

function disablePastDates() {
  document.querySelectorAll('.date-block.available').forEach(block => {
    const radioInput = block.querySelector('input[type="radio"]');
    if (!radioInput) return;
    if (isPastDate(radioInput.value)) {
      block.classList.remove('available');
      block.classList.add('sold-out', 'past-date');
      radioInput.disabled = true;
      radioInput.checked = false;
      const dateText = block.querySelector('.date-text');
      if (dateText) dateText.style.textDecoration = 'line-through';
    }
  });

  const checkedDate = document.querySelector('input[name="workshop-date"]:checked');
  if (!checkedDate) {
    const firstAvailable = document.querySelector('input[name="workshop-date"]:not(:disabled)');
    if (firstAvailable) { firstAvailable.checked = true; updateBookingLink(); }
  }
}

// ── AUTO-HIDE PAST MONTHS ──
function initMonthSwitcher() {
  const monthMap = {
    january: 0, february: 1, march: 2, april: 3,
    may: 4, june: 5, july: 6, august: 7,
    september: 8, october: 9, november: 10, december: 11
  };
  const currentMonth = new Date().getMonth();
  const tabs = document.querySelectorAll('.month-tab');
  if (!tabs.length) return; // Guard: no month switcher on this page

  let firstVisible = null;

  tabs.forEach(tab => {
    const match = tab.getAttribute('onclick')?.match(/switchMonth\('(\w+)'/);
    if (!match) return;
    const monthName = match[1].toLowerCase();
    const monthIndex = monthMap[monthName];
    if (monthIndex === undefined) return;

    if (monthIndex < currentMonth) {
      tab.style.display = 'none';
      const panel = document.getElementById('month-' + monthName);
      if (panel) panel.style.display = 'none';
    } else if (!firstVisible) {
      firstVisible = { tab, name: monthName };
    }
  });

  if (firstVisible) {
    document.querySelectorAll('.month-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.month-panel').forEach(p => p.classList.remove('active'));
    firstVisible.tab.classList.add('active');
    const panel = document.getElementById('month-' + firstVisible.name);
    if (panel) panel.classList.add('active');
  }
}

function updateBookingLink() {
  const quantity = document.getElementById('quantity');
  const selectedDate = document.querySelector('input[name="workshop-date"]:checked');
  const bookingBtn = document.getElementById('booking-btn');
  const floatingLink = document.getElementById('floating-book-link');

  if (!selectedDate || !bookingBtn || selectedDate.disabled) return;

  const dateValue = selectedDate.value;
  const timeValue = selectedDate.getAttribute('data-time');
  if (!timeValue) return;

  const serviceMatch = bookingBtn.getAttribute('href').match(/service\/(\d+)/);
  const serviceId = serviceMatch ? serviceMatch[1] : '26';
  const category = bookingBtn.getAttribute('data-category') || '2';
  const provider = bookingBtn.getAttribute('data-provider') || '9';
  const count = quantity ? quantity.value : '1';

  const url = `https://puraceramicalisboa.simplybook.it/v2/#book/category/${category}/service/${serviceId}/count/${count}/provider/${provider}/date/${dateValue}/time/${timeValue}/`;
  bookingBtn.href = url;
  if (floatingLink) floatingLink.href = url;
}

// ── FORM HANDLING ──
const form = document.querySelector('.event-form');
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const response = await fetch(form.action, { method: form.method, body: data, headers: { 'Accept': 'application/json' } });
    if (response.ok) {
      form.innerHTML = `<div style="text-align:center;padding:60px 20px;color:#134E9D;"><h2>Thank you!</h2><p>Your request has been sent. We'll get back to you within 72 hours.</p></div>`;
    } else {
      alert('Oops! Something went wrong. Please try again later.');
    }
  });
}

const vipForm = document.querySelector('.vip-form');
if (vipForm) {
  vipForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(vipForm);
    const response = await fetch(vipForm.action, { method: vipForm.method, body: data, headers: { 'Accept': 'application/json' } });
    if (response.ok) {
      vipForm.innerHTML = `<div style="text-align:center;padding:60px 20px;"><h2>Thank you!</h2><p>Your VIP request has been sent successfully.</p></div>`;
    } else {
      alert('Oops! Something went wrong. Please try again later.');
    }
  });
}

// ── ACCORDION ──
function toggleAccordion(header) {
  const content = header.nextElementSibling;
  const isActive = header.classList.contains('active');
  document.querySelectorAll('.accordion-header').forEach(h => {
    h.classList.remove('active');
    h.nextElementSibling.classList.remove('active');
  });
  if (!isActive) { header.classList.add('active'); content.classList.add('active'); }
}

function toggleFaqAccordion(header) {
  const content = header.nextElementSibling;
  const isActive = header.classList.contains('active');
  document.querySelectorAll('.faq-accordion-header').forEach(h => {
    h.classList.remove('active');
    h.nextElementSibling.classList.remove('active');
  });
  if (!isActive) { header.classList.add('active'); content.classList.add('active'); }
}