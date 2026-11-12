/* Optional analytics is blocked until an explicit, unexpired choice. */
(function () {
  'use strict';
  const key = 'siddysounds-privacy-v2';
  const lifetime = 180 * 24 * 60 * 60 * 1000;
  const analyticsPage = document.currentScript.hasAttribute('data-analytics');
  let loaded = false;
  let choice = null;
  try {
    const saved = JSON.parse(localStorage.getItem(key));
    if (saved && saved.version === 2 && typeof saved.analytics === 'boolean' &&
        Number.isFinite(saved.savedAt) && saved.savedAt <= Date.now() && Date.now() - saved.savedAt < lifetime) choice = saved;
  } catch (_) { /* Storage can be unavailable in private browsing. */ }
  const privacySignal = navigator.globalPrivacyControl === true || navigator.doNotTrack === '1';

  function clearAnalyticsCookies() {
    document.cookie.split(';').forEach(pair => {
      const name = pair.split('=')[0].trim();
      if (!/^(_ga(?:_|$)|_gid$|_gat|_clck$|_clsk$)/.test(name)) return;
      const host = location.hostname;
      const domains = ['', host, '.' + host, '.siddysounds.com'];
      domains.forEach(domain => {
        document.cookie = name + '=; Max-Age=0; Path=/; SameSite=Lax' + (domain ? '; Domain=' + domain : '');
      });
    });
  }

  function startAnalytics() {
    if (loaded || !analyticsPage || privacySignal || !choice || !choice.analytics) return;
    loaded = true;
    window['ga-disable-G-25HPYYD2GT'] = false;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('consent', 'default', { analytics_storage: 'granted', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
    window.gtag('js', new Date());
    window.gtag('config', 'G-25HPYYD2GT', { allow_google_signals: false, allow_ad_personalization_signals: false });
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-25HPYYD2GT';
    document.head.appendChild(script);
  }

  function save(analytics) {
    const mustReload = loaded && !analytics;
    choice = { version: 2, analytics: Boolean(analytics) && !privacySignal, savedAt: Date.now() };
    try { localStorage.setItem(key, JSON.stringify(choice)); } catch (_) { /* The current-page choice still applies. */ }
    banner.hidden = true;
    if (!choice.analytics) {
      window['ga-disable-G-25HPYYD2GT'] = true;
      clearAnalyticsCookies();
    }
    if (mustReload) location.reload();
    else startAnalytics();
  }

  const banner = document.createElement('section');
  banner.className = 'privacy-banner';
  banner.setAttribute('aria-label', 'Privacy choices');
  banner.innerHTML = '<h2>Your privacy choices</h2><p>Optional Google Analytics helps improve the main website pages. It stays off unless you accept. No advertising tags or session recordings are loaded. Read our <a href="/privacy.html">Privacy Policy</a> and <a href="/cookies.html">Cookie Policy</a>.</p><div class="privacy-actions"><button type="button" data-choice="reject">Reject optional</button><button type="button" data-choice="accept">Accept analytics</button><button type="button" data-choice="settings">Settings</button></div>';
  document.body.appendChild(banner);
  const dialog = document.createElement('dialog');
  dialog.className = 'privacy-dialog';
  dialog.setAttribute('aria-labelledby', 'privacy-dialog-title');
  dialog.innerHTML = '<h2 id="privacy-dialog-title">Privacy settings</h2><p>Essential hosting, requested game features, and your saved choice work without analytics.</p><label><input type="checkbox" id="privacy-analytics"> Allow optional Google Analytics on the main pages</label><p class="privacy-signal" hidden>Your browser sends a privacy signal. Analytics is disabled.</p><div class="privacy-actions"><button type="button" data-save>Save settings</button><button type="button" data-close>Cancel</button></div>';
  document.body.appendChild(dialog);
  const checkbox = dialog.querySelector('input');
  checkbox.disabled = privacySignal;
  dialog.querySelector('.privacy-signal').hidden = !privacySignal;
  function openSettings() {
    checkbox.checked = Boolean(choice && choice.analytics && !privacySignal);
    if (typeof dialog.showModal === 'function') dialog.showModal();
    else { dialog.setAttribute('open', ''); checkbox.focus(); }
  }
  function closeSettings() {
    if (typeof dialog.close === 'function') dialog.close();
    else dialog.removeAttribute('open');
  }
  banner.querySelector('[data-choice="reject"]').addEventListener('click', () => save(false));
  banner.querySelector('[data-choice="accept"]').addEventListener('click', () => save(true));
  banner.querySelector('[data-choice="settings"]').addEventListener('click', openSettings);
  dialog.querySelector('[data-save]').addEventListener('click', () => { save(checkbox.checked); closeSettings(); });
  dialog.querySelector('[data-close]').addEventListener('click', closeSettings);
  const settings = document.createElement('button');
  settings.type = 'button';
  settings.className = 'privacy-settings';
  settings.textContent = 'Privacy settings';
  settings.addEventListener('click', openSettings);
  document.body.appendChild(settings);
  banner.hidden = Boolean(choice) || privacySignal || !analyticsPage;
  if (!choice || !choice.analytics || privacySignal) clearAnalyticsCookies();
  window.addEventListener('storage', event => {
    if (event.key !== key) return;
    let updated;
    try { updated = JSON.parse(event.newValue); } catch (_) { updated = null; }
    if (loaded && (!updated || !updated.analytics)) {
      window['ga-disable-G-25HPYYD2GT'] = true;
      clearAnalyticsCookies();
      location.reload();
    }
  });
  startAnalytics();
})();
