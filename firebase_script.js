// Initialize Firebase
const app = firebase.initializeApp({
  apiKey: "AIzaSyCxEbW9TRG4SrjPyoOmsgezjvq0HkADj04",
  authDomain: "siddy-sounds.firebaseapp.com",
  projectId: "siddy-sounds",
  storageBucket: "siddy-sounds.firebasestorage.app",
  messagingSenderId: "710437474568",
  appId: "1:710437474568:web:35d3af84205338b933dcbd",
  measurementId: "G-NSP8CP2Q7Y"
});

// Firestore Database
const db = firebase.firestore();

console.log(firebase.apps.length ? "Firebase Loaded" : "Firebase Not Loaded");