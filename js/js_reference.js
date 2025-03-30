// Load external scripts dynamically
function loadScript(src, type = "text/javascript", async = false, defer = false) {
  let script = document.createElement("script");
  script.src = src;
  script.type = type;
  script.async = async;
  script.defer = defer;
  document.head.appendChild(script);
}

// JS Plugins
loadScript("https://code.jquery.com/jquery-3.6.0.min.js");
loadScript("https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/js/bootstrap.bundle.min.js");
loadScript("js/jquery.magnific-popup.min.js");
loadScript("js/jquery.nicescroll.min.js");
loadScript("js/jquery.barfiller.js");
loadScript("js/jquery.countdown.min.js");
loadScript("js/jquery.slicknav.js");
loadScript("js/owl.carousel.min.js");
loadScript("js/main.js");

// Music Plugin
loadScript("js/jquery.jplayer.min.js");
loadScript("js/jplayerInit.js");

// Firebase Script
loadScript("js/firebase_script.js", "module");

// Clarity tracking
(function (c, l, a, r, i, t, y) {
  c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
  t = l.createElement(r);
  t.async = 1;
  t.src = "https://www.clarity.ms/tag/" + i;
  y = l.getElementsByTagName(r)[0];
  y.parentNode.insertBefore(t, y);
})(window, document, "clarity", "script", "qtg8lvylx4");

// Klaro Consent Manager
loadScript("js/config.js", "text/javascript", false, true);
loadScript("https://cdn.kiprotect.com/klaro/v0.7.22/klaro.js", "text/javascript", false, true);

// Google Tag Manager
loadScript("https://www.googletagmanager.com/gtag/js?id=G-25HPYYD2GT", "text/javascript", true);
window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }
gtag('js', new Date());
gtag('config', 'G-25HPYYD2GT');