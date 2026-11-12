(function () {
  'use strict';
  const button = document.getElementById('load-video');
  button.addEventListener('click', () => {
    const frame = document.createElement('iframe');
    frame.src = 'https://www.youtube-nocookie.com/embed/kiPCEWfPmG4?autoplay=1&loop=1&playlist=kiPCEWfPmG4';
    frame.title = 'Shri Radhe Radhe — YouTube video';
    frame.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
    frame.referrerPolicy = 'strict-origin-when-cross-origin';
    frame.allowFullscreen = true;
    document.getElementById('video-container').replaceChildren(frame);
  });
})();
