// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier, PhoneAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyD8MbiQ4xkopDmqiX-GO2ATG9jvnBq2HAM",
  authDomain: "college-project-507d8.firebaseapp.com",
  projectId: "college-project-507d8",
  storageBucket: "college-project-507d8.appspot.com",
  messagingSenderId: "206990854973",
  appId: "1:206990854973:web:878e07e05ff3608a489354",
  measurementId: "G-9Y8PZ2V15L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);  // Firebase Authentication
const db = getFirestore(app); // Firestore Database

// Initialize reCAPTCHA verifier
const setupRecaptcha = (containerId) => {
  const recaptchaVerifier = new RecaptchaVerifier(containerId, {
    size: "invisible",  // Invisible reCAPTCHA
    callback: (response) => {
      console.log("reCAPTCHA resolved", response);
    },
  }, auth);

  recaptchaVerifier.render(); // Render reCAPTCHA
};

// Export Firebase auth, db, and setupRecaptcha
export { auth, db, setupRecaptcha, RecaptchaVerifier, PhoneAuthProvider };
