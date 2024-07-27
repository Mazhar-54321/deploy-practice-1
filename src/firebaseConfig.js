import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';

// Your web app’s Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDg8Ppzk4037I7upHCBfuq8E16Gn6NOIYU",
    authDomain: "miya-huzoor.firebaseapp.com",
    projectId: "miya-huzoor",
    storageBucket: "miya-huzoor.appspot.com",
    messagingSenderId: "771930209257",
    appId: "1:771930209257:web:eef09e8cff6ebfe8daa978"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
console.log('Firebase App Initialized:', db,app);
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: 'select_account',
  });
export { auth,app,db,googleProvider };