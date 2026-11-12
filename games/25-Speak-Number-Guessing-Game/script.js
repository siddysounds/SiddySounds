const messageElement = document.getElementById('msg');
const randomNumber = Math.floor(Math.random() * 100) + 1;
const input = document.createElement('input');
input.type = 'number'; input.min = '1'; input.max = '100'; input.required = true;
input.setAttribute('aria-label', 'Guess a number from 1 to 100');
const form = document.createElement('form');
const submit = document.createElement('button'); submit.type = 'submit'; submit.textContent = 'Check guess';
form.append(input, submit); messageElement.before(form);
const speechButton = document.createElement('button'); speechButton.type = 'button'; speechButton.textContent = 'Use microphone';
const notice = document.createElement('p'); notice.textContent = 'Microphone input is optional. Your browser’s speech provider may process audio remotely. You can type instead.';
form.after(notice, speechButton);
let won = false;
function checkGuess(message) {
  if (won) return;
  const number = Number(message.trim());
  messageElement.textContent = !Number.isInteger(number) || number < 1 || number > 100 ? 'Enter a whole number between 1 and 100.' : number === randomNumber ? 'You guessed it! The number was ' + number + '. Refresh to play again.' : number > randomNumber ? 'You said ' + number + '. Go lower.' : 'You said ' + number + '. Go higher.';
  if (number === randomNumber) { won = true; input.disabled = true; submit.disabled = true; speechButton.disabled = true; }
}
form.addEventListener('submit', event => { event.preventDefault(); if (form.reportValidity()) checkGuess(input.value); });
const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
if (!Recognition) { speechButton.disabled = true; notice.textContent = 'Speech recognition is unavailable in this browser. Type a guess above.'; }
else {
  const recognition = new Recognition(); recognition.lang = 'en-US'; recognition.continuous = false;
  speechButton.addEventListener('click', () => { try { recognition.start(); speechButton.disabled = true; } catch (_) { messageElement.textContent = 'Microphone is unavailable. Type a guess instead.'; } });
  recognition.addEventListener('result', event => checkGuess(event.results[0][0].transcript));
  recognition.addEventListener('error', () => { messageElement.textContent = 'Microphone was not available or permission was declined. Type a guess instead.'; });
  recognition.addEventListener('end', () => { speechButton.disabled = won; });
  window.addEventListener('pagehide', () => recognition.abort());
}
