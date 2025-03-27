// Importing Firebase SDK modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";

// Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyCxEbW9TRG4SrjPyoOmsgezjvq0HkADj04",
  authDomain: "siddy-sounds.firebaseapp.com",
  projectId: "siddy-sounds",
  storageBucket: "siddy-sounds.firebasestorage.app",
  messagingSenderId: "710437474568",
  appId: "1:710437474568:web:35d3af84205338b933dcbd",
  measurementId: "G-NSP8CP2Q7Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Fetch the launch time from Firestore
async function getLaunchTime() {
  const docRef = doc(db, "launch", "countdown");
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const launchTime = docSnap.data().launchTime.toDate(); // Convert Firestore timestamp to JavaScript Date
    return launchTime;
  } else {
    console.error("No such document!");
    return null;
  }
}

// Start the countdown
async function startCountdown() {
  const launchTime = await getLaunchTime();
  if (!launchTime) return;

  function updateTimer() {
    const now = new Date().getTime();
    const timeLeft = launchTime - now;

    if (timeLeft < 0) {
      document.getElementById("timer").innerHTML = "Launched!";
      clearInterval(interval);
      return;
    }

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    // Display the countdown in the HTML element with id "timer"
    document.getElementById("timer").innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s left`;
    document.querySelector("#countdown-time .countdown__item:nth-child(1) span").innerText = days;
    document.querySelector("#countdown-time .countdown__item:nth-child(2) span").innerText = hours;
    document.querySelector("#countdown-time .countdown__item:nth-child(3) span").innerText = minutes;
    document.querySelector("#countdown-time .countdown__item:nth-child(4) span").innerText = seconds;
  }

  // Update the timer every second
  updateTimer();
  const interval = setInterval(updateTimer, 1000);
}

// Start the countdown when the page loads
startCountdown();