// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCqKQfXXp-l8Hq0ndseu7sJGbatN_wl94I',
  authDomain: 'tagmates-42c3a.firebaseapp.com',
  projectId: 'tagmates-42c3a',
  storageBucket: 'tagmates-42c3a.appspot.com',
  messagingSenderId: '896938202608',
  appId: '1:896938202608:web:0e6f62312c4c57e6637935',
  measurementId: 'G-JNVY7H5F8H',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getFirestore(app);

export { app, auth, database };
