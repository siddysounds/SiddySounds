// Firebase SDK Script
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-analytics.js";
import { getFirestore, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBuzAqahAhfKEeDSq_ap_1M5GkxlkMXM3o",
    authDomain: "sidxsuri1986.firebaseapp.com",
    databaseURL: "https://sidxsuri1986-default-rtdb.firebaseio.com",
    projectId: "sidxsuri1986",
    storageBucket: "sidxsuri1986.firebasestorage.app",
    messagingSenderId: "65985778635",
    appId: "1:65985778635:web:c78b95e54f8eaa4917dc4e",
    measurementId: "G-TKWXVL5930"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

async function trackVisitors() {
    try {
        const countRef = doc(db, "visitorCount", "counter");
        const countSnap = await getDoc(countRef);
        let uniqueVisitors = countSnap.exists() ? countSnap.data().unique || 0 : 0;
        let totalVisits = countSnap.exists() ? countSnap.data().total || 0 : 0;

        const userKey = localStorage.getItem("visitorKey");
        if (!userKey) {
            uniqueVisitors++;
            localStorage.setItem("visitorKey", "true");
        }
        totalVisits++;
        await setDoc(countRef, { unique: uniqueVisitors, total: totalVisits }, { merge: true });
        document.getElementById("unique-visitors").innerText = uniqueVisitors;
        document.getElementById("total-visits").innerText = totalVisits;
    } catch (error) {
        console.error("Error tracking visitors:", error);
        document.getElementById("unique-visitors").innerText = "Error";
        document.getElementById("total-visits").innerText = "Error";
    }
}

trackVisitors();
