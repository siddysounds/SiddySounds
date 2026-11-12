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


if (document.querySelector('.owl-carousel, #bar1, #bar2, #bar3')) {
  loadScript('js/jquery-3.7.1.min.js', 'text/javascript', true);
  if (document.querySelector('.owl-carousel')) loadScript('js/owl.carousel.min.js', 'text/javascript', true);
  if (document.querySelector('#bar1, #bar2, #bar3')) loadScript('js/jquery.barfiller.js', 'text/javascript', true);
  loadScript('js/main.js', 'text/javascript', true);
}
const countdown = document.querySelector('#countdown-time');
if (countdown) {
  let requested = false;
  const loadCountdown = () => {
    if (!requested) { requested = true; loadScript('js/firebase_script.js', 'module'); }
  };
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) { observer.disconnect(); loadCountdown(); }
    }, { rootMargin: '300px' });
    observer.observe(countdown);
  } else loadCountdown();
}
