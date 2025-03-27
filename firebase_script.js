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
      // Stop the countdown but don't hide the timer
      clearInterval(interval);

      // Set the timer to 00 if time is over, and keep the elements visible
      document.querySelector("#countdown-time .countdown__item:nth-child(1) span").innerText = "00";
      document.querySelector("#countdown-time .countdown__item:nth-child(2) span").innerText = "00";
      document.querySelector("#countdown-time .countdown__item:nth-child(3) span").innerText = "00";
      document.querySelector("#countdown-time .countdown__item:nth-child(4) span").innerText = "00";
      
      return; // Stop updating the timer
    }

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    // Display the countdown in the HTML element, ensuring it remains visible
    document.querySelector("#countdown-time .countdown__item:nth-child(1) span").innerText = days < 10 ? "0" + days : days;
    document.querySelector("#countdown-time .countdown__item:nth-child(2) span").innerText = hours < 10 ? "0" + hours : hours;
    document.querySelector("#countdown-time .countdown__item:nth-child(3) span").innerText = minutes < 10 ? "0" + minutes : minutes;
    document.querySelector("#countdown-time .countdown__item:nth-child(4) span").innerText = seconds < 10 ? "0" + seconds : seconds;
  }

  // Update the timer every second
  updateTimer();
  const interval = setInterval(updateTimer, 1000);
}

// Start the countdown when the page loads
startCountdown();