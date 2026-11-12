'use strict';

// Scripts start downloading together and execute in dependency order.
function loadScript(src, type = 'text/javascript', ordered = false) {
  const script = document.createElement('script');
  script.src = src;
  script.type = type;
  script.async = !ordered;
  document.head.appendChild(script);
}

// Discover critical backgrounds before waiting for any JavaScript libraries.
const backgroundObserver = 'IntersectionObserver' in window
  ? new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          applyBackground(entry.target);
          backgroundObserver.unobserve(entry.target);
        }
      });
    }, { rootMargin: '300px' })
  : null;
function applyBackground(element) {
  element.style.backgroundImage = 'url("' + element.dataset.setbg + '")';
}
document.querySelectorAll('.set-bg').forEach(element => {
  // Carousel clones must inherit their backgrounds.
  if (!backgroundObserver || element.closest('.owl-carousel') ||
      element.getBoundingClientRect().top < window.innerHeight) {
    applyBackground(element);
  } else {
    backgroundObserver.observe(element);
  }
});

loadScript('https://code.jquery.com/jquery-3.6.0.min.js', 'text/javascript', true);
const plugins = [
  ['.mobile-menu', 'js/jquery.slicknav.js'],
  ['.video-popup', 'js/jquery.magnific-popup.min.js'],
  ['.owl-carousel', 'js/owl.carousel.min.js'],
  ['.nice-scroll', 'js/jquery.nicescroll.min.js'],
  ['#bar1, #bar2, #bar3', 'js/jquery.barfiller.js']
];
plugins.forEach(([selector, src]) => {
  if (document.querySelector(selector)) loadScript(src, 'text/javascript', true);
});
loadScript('js/main.js', 'text/javascript', true);
if (document.querySelector('.jplayer')) {
  loadScript('js/jquery.jplayer.min.js', 'text/javascript', true);
  loadScript('js/jplayerInit.js', 'text/javascript', true);
}
if (document.querySelector('#countdown-time')) {
  loadScript('js/firebase_script.js', 'module');
}

// The consent manager keeps its configuration ahead of its implementation.
loadScript('js/config.js', 'text/javascript', true);
loadScript('https://cdn.kiprotect.com/klaro/v0.7.22/klaro.js', 'text/javascript', true);

// Clarity tracking
(function (c, l, a, r, i, t, y) {
  c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
  t = l.createElement(r);
  t.async = 1;
  t.src = "https://www.clarity.ms/tag/" + i;
  y = l.getElementsByTagName(r)[0];
  y.parentNode.insertBefore(t, y);
})(window, document, "clarity", "script", "qtg8lvylx4");


// Google Tag Manager
loadScript("https://www.googletagmanager.com/gtag/js?id=G-25HPYYD2GT");
window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }
gtag('js', new Date());
gtag('config', 'G-25HPYYD2GT');

