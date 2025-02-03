import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup,RecaptchaVerifier, GoogleAuthProvider, signOut } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyD8MbiQ4xkopDmqiX-GO2ATG9jvnBq2HAM",
    authDomain: "college-project-507d8.firebaseapp.com",
    projectId: "college-project-507d8",
    storageBucket: "college-project-507d8.appspot.com",
    messagingSenderId: "206990854973",
    appId: "1:206990854973:web:878e07e05ff3608a489354",
    measurementId: "G-9Y8PZ2V15L"
  };

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);        
const db = getFirestore(app);   


const setupRecaptcha = (containerId) => {
  const recaptchaVerifier = new RecaptchaVerifier(containerId, {
    size: "invisible",
    callback: (response) => {
      console.log("reCAPTCHA solved", response);
    },
  }, auth);
  recaptchaVerifier.render().then(() => {
    console.log("reCAPTCHA rendered");
  }).catch((error) => {
    console.error("Error rendering reCAPTCHA", error);
  });
};

export { auth, signInWithPopup,setupRecaptcha, GoogleAuthProvider, signOut,db };
