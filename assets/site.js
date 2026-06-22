(function () {
  'use strict';

  // ── detect language + page ────────────────────────────────────────────────
  var path = location.pathname;
  var lang = 'en', langBase = '';
  if (path.startsWith('/ru')) { lang = 'ru'; langBase = '/ru'; }
  else if (path.startsWith('/de')) { lang = 'de'; langBase = '/de'; }
  else if (path.startsWith('/fr')) { lang = 'fr'; langBase = '/fr'; }
  else if (path.startsWith('/it')) { lang = 'it'; langBase = '/it'; }

  var SLUGS = ['privacy', 'terms', 'safety', 'support', 'changelog', 'roadmap'];
  var segs = path.split('/').filter(Boolean);
  var pageSlug = segs.find(function(s) { return SLUGS.indexOf(s) > -1; }) || 'home';

  // ── i18n ──────────────────────────────────────────────────────────────────
  var T = {
    en: {
      features: 'Features', compare: 'Compare', hardware: 'Hardware',
      privacy: 'Privacy', support: 'Support', cta: 'Coming Soon',
      open: 'Open menu', close: 'Close menu', lang: 'Language', skip: 'Skip to main content',
      footer: { privacy: 'Privacy', support: 'Support', terms: 'Terms',
        safety: 'Safety', changelog: 'Changelog', roadmap: 'Roadmap' },
      copy: '&copy; 2026 VeloRadar &middot; Built in the Czech Republic &middot; Not affiliated with Bafang, Garmin, or Apple.',
      names: { en: 'English', fr: 'Fran&ccedil;ais', de: 'Deutsch', ru: '&#1056;&#1091;&#1089;&#1089;&#1082;&#1080;&#1081;', it: 'Italiano' }
    },
    ru: {
      features: '&#1042;&#1086;&#1079;&#1084;&#1086;&#1078;&#1085;&#1086;&#1089;&#1090;&#1080;',
      compare: '&#1057;&#1088;&#1072;&#1074;&#1085;&#1077;&#1085;&#1080;&#1077;',
      hardware: '&#1057;&#1086;&#1074;&#1084;&#1077;&#1089;&#1090;&#1080;&#1084;&#1086;&#1089;&#1090;&#1100;',
      privacy: '&#1055;&#1088;&#1080;&#1074;&#1072;&#1090;&#1085;&#1086;&#1089;&#1090;&#1100;',
      support: '&#1055;&#1086;&#1076;&#1076;&#1077;&#1088;&#1078;&#1082;&#1072;',
      cta: 'Coming Soon',
      open: '&#1054;&#1090;&#1082;&#1088;&#1099;&#1090;&#1100; &#1084;&#1077;&#1085;&#1102;',
      close: '&#1047;&#1072;&#1082;&#1088;&#1099;&#1090;&#1100; &#1084;&#1077;&#1085;&#1102;',
      lang: '&#1071;&#1079;&#1099;&#1082;', skip: '&#1055;&#1077;&#1088;&#1077;&#1081;&#1090;&#1080; &#1082; &#1086;&#1089;&#1085;&#1086;&#1074;&#1085;&#1086;&#1084;&#1091; &#1089;&#1086;&#1076;&#1077;&#1088;&#1078;&#1080;&#1084;&#1086;&#1084;&#1091;',
      footer: {
        privacy: '&#1050;&#1086;&#1085;&#1092;&#1080;&#1076;&#1077;&#1085;&#1094;&#1080;&#1072;&#1083;&#1100;&#1085;&#1086;&#1089;&#1090;&#1100;',
        support: '&#1055;&#1086;&#1076;&#1076;&#1077;&#1088;&#1078;&#1082;&#1072;',
        terms: '&#1059;&#1089;&#1083;&#1086;&#1074;&#1080;&#1103;',
        safety: '&#1041;&#1077;&#1079;&#1086;&#1087;&#1072;&#1089;&#1085;&#1086;&#1089;&#1090;&#1100;',
        changelog: '&#1048;&#1089;&#1090;&#1086;&#1088;&#1080;&#1103;',
        roadmap: '&#1055;&#1083;&#1072;&#1085;&#1099;'
      },
      copy: '&copy; 2026 VeloRadar &middot; &#1056;&#1072;&#1079;&#1088;&#1072;&#1073;&#1086;&#1090;&#1072;&#1085;&#1086; &#1074; &#1063;&#1077;&#1093;&#1080;&#1080;',
      names: { en: 'English', fr: 'Fran&ccedil;ais', de: 'Deutsch', ru: '&#1056;&#1091;&#1089;&#1089;&#1082;&#1080;&#1081;', it: 'Italiano' }
    },
    de: {
      features: 'Funktionen', compare: 'Vergleich', hardware: 'Hardware',
      privacy: 'Datenschutz', support: 'Support', cta: 'Coming Soon',
      open: 'Men&uuml; &ouml;ffnen', close: 'Men&uuml; schlie&szlig;en', lang: 'Sprache', skip: 'Zum Hauptinhalt springen',
      footer: { privacy: 'Datenschutz', support: 'Support', terms: 'Nutzungsbedingungen',
        safety: 'Sicherheit', changelog: 'Changelog', roadmap: 'Roadmap' },
      copy: '&copy; 2026 VeloRadar &middot; Entwickelt in Tschechien &middot; Nicht mit Bafang, Garmin oder Apple verbunden.',
      names: { en: 'English', fr: 'Fran&ccedil;ais', de: 'Deutsch', ru: '&#1056;&#1091;&#1089;&#1089;&#1082;&#1080;&#1081;', it: 'Italiano' }
    },
    fr: {
      features: 'Fonctionnalit&eacute;s', compare: 'Comparer', hardware: 'Mat&eacute;riel',
      privacy: 'Confidentialit&eacute;', support: 'Assistance', cta: 'Coming Soon',
      open: 'Ouvrir le menu', close: 'Fermer le menu', lang: 'Langue', skip: 'Aller au contenu principal',
      footer: { privacy: 'Confidentialit&eacute;', support: 'Assistance', terms: 'Conditions',
        safety: 'S&eacute;curit&eacute;', changelog: 'Historique', roadmap: 'Feuille de route' },
      copy: '&copy; 2026 VeloRadar &middot; D&eacute;velopp&eacute; en R&eacute;publique tch&egrave;que &middot; Non affili&eacute; &agrave; Bafang, Garmin ou Apple.',
      names: { en: 'English', fr: 'Fran&ccedil;ais', de: 'Deutsch', ru: '&#1056;&#1091;&#1089;&#1089;&#1082;&#1080;&#1081;', it: 'Italiano' }
    },
    it: {
      features: 'Funzionalit&agrave;', compare: 'Confronto', hardware: 'Hardware',
      privacy: 'Privacy', support: 'Supporto', cta: 'Coming Soon',
      open: 'Apri menu', close: 'Chiudi menu', lang: 'Lingua', skip: 'Vai al contenuto principale',
      footer: { privacy: 'Privacy', support: 'Supporto', terms: 'Termini',
        safety: 'Sicurezza', changelog: 'Changelog', roadmap: 'Roadmap' },
      copy: '&copy; 2026 VeloRadar &middot; Sviluppato in Repubblica Ceca &middot; Non affiliato con Bafang, Garmin o Apple.',
      names: { en: 'English', fr: 'Fran&ccedil;ais', de: 'Deutsch', ru: '&#1056;&#1091;&#1089;&#1089;&#1082;&#1080;&#1081;', it: 'Italiano' }
    }
  };

  var t = T[lang];
  var BASES = { en: '', fr: '/fr', de: '/de', ru: '/ru', it: '/it' };

  function langLink(l) {
    return pageSlug === 'home' ? BASES[l] + '/' : BASES[l] + '/' + pageSlug + '/';
  }

  // ── language switcher HTML ────────────────────────────────────────────────
  function switcher(extraCls) {
    var cls = 'lang-switch' + (extraCls ? ' ' + extraCls : '');
    return '<div class="' + cls + '" role="navigation" aria-label="' + t.lang + '">' +
      ['en', 'fr', 'de', 'ru', 'it'].map(function(l) {
        var active = l === lang ? ' class="active" aria-current="true"' : '';
        return '<a href="' + langLink(l) + '"' + active + ' lang="' + l + '" hreflang="' + l + '">' + l.toUpperCase() + '</a>';
      }).join('') + '</div>';
  }

  // ── build nav ─────────────────────────────────────────────────────────────
  function buildNav() {
    var home = langBase + '/';
    var priv = langBase + '/privacy/';
    var supp = langBase + '/support/';

    function li(href, slug, label) {
      var active = pageSlug === slug ? ' class="active" aria-current="page"' : '';
      return '<li><a href="' + href + '"' + active + '>' + label + '</a></li>';
    }

    return '<a class="skip-nav" href="#main-content">' + t.skip + '</a>' +
      '<nav role="navigation" aria-label="Main navigation">' +
      '<a class="nav-logo" href="' + home + '" aria-label="VeloRadar">' +
      '<img src="/assets/icon.png" alt="" width="28" height="28"><span>VeloRadar</span></a>' +
      '<ul class="nav-links" role="list">' +
      li(home + '#features', '_s', t.features) +
      li(home + '#compare', '_s', t.compare) +
      li(home + '#compatibility', '_s', t.hardware) +
      li(priv, 'privacy', t.privacy) +
      li(supp, 'support', t.support) +
      '</ul>' +
      '<a class="nav-cta" href="' + home + '#download">' + t.cta + '</a>' +
      switcher('') +
      '<button class="nav-burger" aria-label="' + t.open + '" aria-expanded="false" aria-controls="vr-mobile-menu">' +
      '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>' +
      '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true" class="close-icon"><path d="M6 18L18 6M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>' +
      '</button></nav>' +
      '<div class="mobile-menu" id="vr-mobile-menu" aria-hidden="true">' +
      '<ul role="list">' +
      '<li><a href="' + home + '#features">' + t.features + '</a></li>' +
      '<li><a href="' + home + '#compare">' + t.compare + '</a></li>' +
      '<li><a href="' + home + '#compatibility">' + t.hardware + '</a></li>' +
      '<li><a href="' + priv + '"' + (pageSlug === 'privacy' ? ' class="active"' : '') + '>' + t.privacy + '</a></li>' +
      '<li><a href="' + supp + '"' + (pageSlug === 'support' ? ' class="active"' : '') + '>' + t.support + '</a></li>' +
      '<li><a href="' + langBase + '/changelog/"' + (pageSlug === 'changelog' ? ' class="active"' : '') + '>' + t.footer.changelog + '</a></li>' +
      '<li><a href="' + langBase + '/roadmap/"' + (pageSlug === 'roadmap' ? ' class="active"' : '') + '>' + t.footer.roadmap + '</a></li>' +
      '<li><a class="mobile-cta" href="' + home + '#download">' + t.cta + '</a></li>' +
      '<li class="lang-divider" role="separator"><span>' + t.lang + '</span></li>' +
      ['en', 'fr', 'de', 'ru', 'it'].map(function(l) {
        return '<li><a href="' + langLink(l) + '" lang="' + l + '" hreflang="' + l + '">' + t.names[l] + '</a></li>';
      }).join('') +
      '</ul></div>';
  }

  // ── build footer ──────────────────────────────────────────────────────────
  function buildFooter() {
    var b = langBase;
    var fl = t.footer;
    return '<footer role="contentinfo"><div class="footer-inner">' +
      '<a class="f-logo" href="' + b + '/"><img src="/assets/icon.png" alt="" width="32" height="32"><span>VeloRadar</span></a>' +
      '<nav aria-label="Footer links"><ul class="f-links" role="list">' +
      '<li><a href="' + b + '/privacy/">' + fl.privacy + '</a></li>' +
      '<li><a href="' + b + '/support/">' + fl.support + '</a></li>' +
      '<li><a href="' + b + '/terms/">' + fl.terms + '</a></li>' +
      '<li><a href="' + b + '/safety/">' + fl.safety + '</a></li>' +
      '<li><a href="' + b + '/changelog/">' + fl.changelog + '</a></li>' +
      '<li><a href="' + b + '/roadmap/">' + fl.roadmap + '</a></li>' +
      '<li><a href="mailto:support@veloradar.app">support@veloradar.app</a></li>' +
      '</ul></nav>' +
      switcher('f-lang') +
      '<p class="f-copy">' + t.copy + '</p>' +
      '</div></footer>';
  }

  // ── inject ────────────────────────────────────────────────────────────────
  function inject(id, html) {
    var el = document.getElementById(id);
    if (!el) return;
    var tpl = document.createElement('template');
    tpl.innerHTML = html;
    el.parentNode.insertBefore(tpl.content, el);
    el.parentNode.removeChild(el);
  }

  inject('vr-nav', buildNav());
  inject('vr-footer', buildFooter());

  // ── mobile menu ───────────────────────────────────────────────────────────
  var menu = document.getElementById('vr-mobile-menu');
  var burger = document.querySelector('.nav-burger');
  var menuOpen = false;

  function toggleMenu(open) {
    menuOpen = (open !== undefined) ? open : !menuOpen;
    if (menu) {
      menu.classList.toggle('open', menuOpen);
      menu.setAttribute('aria-hidden', String(!menuOpen));
    }
    if (burger) {
      burger.setAttribute('aria-expanded', String(menuOpen));
      burger.setAttribute('aria-label', menuOpen ? t.close : t.open);
    }
    document.body.style.overflow = menuOpen ? 'hidden' : '';
  }

  if (burger) burger.addEventListener('click', function() { toggleMenu(); });
  if (menu) menu.addEventListener('click', function(e) {
    if (e.target.tagName === 'A') toggleMenu(false);
  });
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && menuOpen) { toggleMenu(false); if (burger) burger.focus(); }
  });
  document.addEventListener('click', function(e) {
    if (menuOpen && menu && burger && !menu.contains(e.target) && !burger.contains(e.target)) {
      toggleMenu(false);
    }
  });

  // ── nav scroll shadow ─────────────────────────────────────────────────────
  var navEl = document.querySelector('nav');
  if (navEl) {
    function onScroll() { navEl.classList.toggle('scrolled', window.scrollY > 10); }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ── TOC active highlight (legal pages) ───────────────────────────────────
  var tocLinks = document.querySelectorAll('.toc a[href^="#"]');
  if (tocLinks.length && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        var link = document.querySelector('.toc a[href="#' + entry.target.id + '"]');
        if (link) link.classList.toggle('active', entry.isIntersecting);
      });
    }, { rootMargin: '-20% 0px -65% 0px' });
    tocLinks.forEach(function(a) {
      var id = a.getAttribute('href').slice(1);
      var section = document.getElementById(id);
      if (section) io.observe(section);
    });
  }

})();
