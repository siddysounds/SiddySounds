import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc } from "firebase/firestore";

// 🔹 Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyCxEbW9TRG4SrjPyoOmsgezjvq0HkADj04",
  authDomain: "siddy-sounds.firebaseapp.com",
  projectId: "siddy-sounds",
  storageBucket: "siddy-sounds.firebasestorage.app",
  messagingSenderId: "710437474568",
  appId: "1:710437474568:web:35d3af84205338b933dcbd",
  measurementId: "G-NSP8CP2Q7Y"
};

// 🔹 Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 🔹 Function to get launch time from Firestore
async function getLaunchTime() {
  try {
    const docRef = doc(db, "launch", "countdown");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Launch Time Found:", docSnap.data().launchTime);
      return new Date(docSnap.data().launchTime.toDate()); // Convert Firestore Timestamp
    } else {
      console.error("No launch time found in Firestore!");
      document.getElementById("timer").innerHTML = "⏳ No launch time set!";
      return null;
    }
  } catch (error) {
    console.error("Error fetching Firestore document:", error);
    document.getElementById("timer").innerHTML = "Error fetching timer!";
    return null;
  }
}

// 🔹 Function to start the countdown
async function startCountdown() {
  const launchTime = await getLaunchTime();
  if (!launchTime) return;

  function updateTimer() {
    const now = new Date().getTime();
    const timeLeft = launchTime - now;

    if (timeLeft < 0) {
      document.getElementById("timer").innerHTML = "🚀 Launched!";
      return;
    }

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    document.getElementById("timer").innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s left`;
    requestAnimationFrame(updateTimer);
  }

  updateTimer();
}

// 🔹 Start the countdown on page load
startCountdown();