(function () {
  'use strict';
  const menu = document.querySelector('.mobile-menu');
  const mobileWrap = document.getElementById('mobile-menu-wrap');
  if (menu && mobileWrap) {
    const details = document.createElement('details');
    details.className = 'mobile-navigation';
    const summary = document.createElement('summary');
    summary.textContent = 'Menu';
    details.append(summary, menu.querySelector('ul').cloneNode(true));
    mobileWrap.appendChild(details);
  }
  document.querySelectorAll('audio').forEach(audio => {
    audio.addEventListener('play', () => {
      document.querySelectorAll('audio').forEach(other => { if (other !== audio) other.pause(); });
    });
    audio.addEventListener('error', () => {
      if (audio.nextElementSibling && audio.nextElementSibling.className === 'audio-error') return;
      const error = document.createElement('p');
      error.className = 'audio-error';
      error.textContent = 'This track could not load. Please try again later or listen on YouTube.';
      audio.insertAdjacentElement('afterend', error);
    });
  });
  document.querySelectorAll('[data-email-form]').forEach(form => {
    form.addEventListener('submit', event => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const message = form.querySelector('[name="message"]').value.trim();
      if (!message) return;
      location.href = 'mailto:mail@siddysounds.com?subject=' + encodeURIComponent('Website enquiry') + '&body=' + encodeURIComponent(message);
      form.querySelector('[role="status"]').textContent = 'Your email app will open. Send the message there to contact me.';
    });
  });
  document.querySelectorAll('[data-year]').forEach(node => { node.textContent = new Date().getFullYear(); });
})();
