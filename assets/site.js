/* AceXL Academy site behavior: theme toggle, mobile menu, header shadow, back to top */
(function () {
  var root = document.documentElement;
  var KEY = 'acexl-theme';

  // Theme toggle
  var toggle = document.querySelector('.theme-toggle');
  function label() {
    if (!toggle) return;
    var dark = root.getAttribute('data-theme') === 'dark';
    toggle.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
    toggle.setAttribute('aria-pressed', dark ? 'true' : 'false');
  }
  label();
  if (toggle) {
    toggle.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem(KEY, next); } catch (e) {}
      label();
    });
  }
  // Follow the device setting until the visitor picks one
  if (window.matchMedia) {
    var mq = window.matchMedia('(prefers-color-scheme: dark)');
    var onChange = function (e) {
      var saved = null;
      try { saved = localStorage.getItem(KEY); } catch (err) {}
      if (saved !== 'light' && saved !== 'dark') {
        root.setAttribute('data-theme', e.matches ? 'dark' : 'light');
        label();
      }
    };
    if (mq.addEventListener) mq.addEventListener('change', onChange);
  }

  // Mobile menu
  var nav = document.getElementById('mainNav');
  var btn = document.querySelector('.nav-toggle');
  function setMenu(open) {
    if (!nav || !btn) return;
    nav.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }
  if (btn) {
    btn.addEventListener('click', function () { setMenu(!nav.classList.contains('open')); });
  }
  if (nav) {
    nav.addEventListener('click', function (e) { if (e.target.tagName === 'A') setMenu(false); });
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && nav && nav.classList.contains('open')) { setMenu(false); btn.focus(); }
  });
  document.addEventListener('click', function (e) {
    if (nav && nav.classList.contains('open') && !nav.contains(e.target) && !btn.contains(e.target)) setMenu(false);
  });

  // Header shadow and back to top button
  var header = document.querySelector('header.site');
  var top = document.querySelector('.to-top');
  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    if (header) header.classList.toggle('scrolled', y > 8);
    if (top) top.classList.toggle('show', y > 600);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  if (top) {
    top.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      var main = document.getElementById('main');
      if (main) main.focus({ preventScroll: true });
    });
  }
})();
