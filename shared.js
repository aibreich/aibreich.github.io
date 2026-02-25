// shared.js — cursor & scroll reveal for all portfolio pages
(function() {

  // ══════════════════════════════════════════════
  // SCROLL REVEAL — always runs on every device
  // Must be outside any early-return guard
  // ══════════════════════════════════════════════
  var revealObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry, i) {
      if (entry.isIntersecting) {
        setTimeout(function() {
          entry.target.classList.add('visible');
        }, i * 70);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll('.reveal').forEach(function(el) {
    revealObserver.observe(el);
  });

  // ══════════════════════════════════════════════
  // CUSTOM CURSOR — desktop/mouse only
  // ══════════════════════════════════════════════
  var isTouch = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
  if (isTouch) return; // touch device — scroll reveal already set up above, safe to exit

  var cursor = document.getElementById('cursor');
  var ring   = document.getElementById('cursorRing');
  if (!cursor || !ring) return;

  var mx = 0, my = 0, rx = 0, ry = 0;
  var active = false;

  window.addEventListener('mousemove', function(e) {
    mx = e.clientX;
    my = e.clientY;
    if (!active) {
      active = true;
      document.documentElement.classList.add('has-mouse');
    }
    cursor.style.transform = 'translate(calc(' + mx + 'px - 50%), calc(' + my + 'px - 50%))';
  }, { passive: true });

  (function animateRing() {
    rx += (mx - rx) * 0.11;
    ry += (my - ry) * 0.11;
    ring.style.transform = 'translate(calc(' + rx + 'px - 50%), calc(' + ry + 'px - 50%))';
    requestAnimationFrame(animateRing);
  })();

  document.querySelectorAll('a, button').forEach(function(el) {
    el.addEventListener('mouseenter', function() { cursor.classList.add('hovered'); });
    el.addEventListener('mouseleave', function() { cursor.classList.remove('hovered'); });
  });

  window.addEventListener('touchstart', function() {
    document.documentElement.classList.remove('has-mouse');
    active = false;
  }, { passive: true });

})();

// ══════════════════════════════════════════════
// MOBILE HAMBURGER NAV — runs on all pages
// ══════════════════════════════════════════════
(function() {
  var btn    = document.getElementById('nav-hamburger');
  var drawer = document.getElementById('nav-drawer');
  if (!btn || !drawer) return;

  function closeDrawer() {
    drawer.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-label', 'Open navigation menu');
  }

  btn.addEventListener('click', function() {
    var open = drawer.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(open));
    btn.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
  });

  drawer.querySelectorAll('a').forEach(function(a) {
    a.addEventListener('click', closeDrawer);
  });

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      closeDrawer();
      btn.focus();
    }
  });
})();
