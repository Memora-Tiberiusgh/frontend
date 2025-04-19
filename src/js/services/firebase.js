// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyArCvSQyJlSbl5AJ2x-g9L6hZ_SJ84uE18",
  authDomain: "memora-f7ad3.firebaseapp.com",
  projectId: "memora-f7ad3",
  storageBucket: "memora-f7ad3.firebasestorage.app",
  messagingSenderId: "1014870842554",
  appId: "1:1014870842554:web:9cfb15eb7d3506c0a7b683",
  measurementId: "G-NRQBWK0GS1",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

export { app, auth }
