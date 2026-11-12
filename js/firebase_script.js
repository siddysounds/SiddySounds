import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';
import { getFirestore, doc, getDoc } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js';
const firebaseConfig = {
  apiKey: 'AIzaSyCxEbW9TRG4SrjPyoOmsgezjvq0HkADj04',
  authDomain: 'siddy-sounds.firebaseapp.com',
  projectId: 'siddy-sounds',
  appId: '1:710437474568:web:35d3af84205338b933dcbd'
};
const container = document.getElementById('countdown-time');
let interval;
function unavailable() {
  if (interval) clearInterval(interval);
  container.textContent = 'Follow YouTube for the latest releases.';
}
async function startCountdown() {
  const db = getFirestore(initializeApp(firebaseConfig));
  const snapshot = await Promise.race([
    getDoc(doc(db, 'launch', 'countdown')),
    new Promise((_, reject) => setTimeout(() => reject(new Error('Countdown timeout')), 10000))
  ]);
  const value = snapshot.exists() && snapshot.data().launchTime;
  const date = value && typeof value.toDate === 'function' ? value.toDate() : null;
  if (!date || !Number.isFinite(date.getTime()) || date.getTime() <= Date.now()) { unavailable(); return; }
  const spans = container.querySelectorAll('.countdown__item span');
  function update() {
    const left = date.getTime() - Date.now();
    if (left <= 0) { unavailable(); return; }
    const values = [Math.floor(left / 86400000), Math.floor(left / 3600000) % 24, Math.floor(left / 60000) % 60, Math.floor(left / 1000) % 60];
    spans.forEach((span, index) => { span.textContent = String(values[index]).padStart(2, '0'); });
  }
  update(); interval = setInterval(update, 1000);
  window.addEventListener('pagehide', () => clearInterval(interval), {once:true});
}
if (container) startCountdown().catch(unavailable);
