 /* ============================================================
   PURACERÂMICA – Partial Includes + Header Init
   Lädt geteilte Bausteine (Header/Footer) über data-include.
   Nur über http (Live Server / Live-Seite), nicht per file://.
   ============================================================ */
(function () {

  async function loadIncludes() {
    const nodes = document.querySelectorAll('[data-include]');
    await Promise.all([...nodes].map(async (el) => {
      const url = el.getAttribute('data-include');
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(res.status + ' – ' + url);
        let html = await res.text();

        // Live Server spritzt einen Reload-Block in ausgelieferte HTML-Dateien.
        // Nur genau diesen Block entfernen (Kommentar bis zum schließenden
        // </script>), NICHT bis zum Ende der Datei.
        html = html.replace(/<!--\s*Code injected by live-server[\s\S]*?<\/script>/gi, '');

        // Sauber parsen, restliche <script> und Kommentare rauswerfen.
        const tpl = document.createElement('template');
        tpl.innerHTML = html;
        tpl.content.querySelectorAll('script').forEach(s => s.remove());

        el.replaceWith(tpl.content);
      } catch (e) {
        console.error('Include fehlgeschlagen:', url, e);
      }
    }));
    initHeader();
    document.dispatchEvent(new CustomEvent('partials:loaded'));
  }

  function initHeader() {
    const nav = document.getElementById('nav');
    if (!nav) return;

    const file = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.lang-pt').forEach(a => a.setAttribute('href', '/pt/' + file));
    document.querySelectorAll('.lang-en').forEach(a => a.setAttribute('href', '/en/' + file));

    const hamburger = document.getElementById('hamburger');
    if (hamburger) {
      hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        nav.classList.toggle('active');
        document.body.classList.toggle('menu-open');
      });
    }

    nav.querySelectorAll('.dropdown > .dropdown-toggle').forEach(toggle => {
      toggle.addEventListener('click', (e) => {
        if (window.innerWidth <= 768 && !toggle.closest('.lang-switcher')) {
          e.preventDefault();
          toggle.parentElement.classList.toggle('open');
        }
      });
    });

    const mLangToggle = document.querySelector('.mobile-lang-toggle');
    const mLangWrap = document.querySelector('.mobile-lang-switcher');
    if (mLangToggle && mLangWrap) {
      mLangToggle.addEventListener('click', () => mLangWrap.classList.toggle('open'));
    }

    nav.querySelectorAll('a').forEach(a => {
      const href = a.getAttribute('href');
      if (href && href !== '#' && href.split('/').pop() === file) {
        a.classList.add('active-nav');
        const dd = a.closest('.dropdown');
        if (dd) { const t = dd.querySelector('.dropdown-toggle'); if (t) t.classList.add('active-nav'); }
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadIncludes);
  } else {
    loadIncludes();
  }

})();