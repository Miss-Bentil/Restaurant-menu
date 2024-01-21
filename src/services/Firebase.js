import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBXMW15pvL-IwFGWySZgh1YxmgGi6NuqE4',
  authDomain: 'restaurant-menu-eg1.firebaseapp.com',
  projectId: 'restaurant-menu-eg1',
  storageBucket: 'restaurant-menu-eg1.appspot.com',
  messagingSenderId: '626256359381',
  appId: '1:626256359381:web:f0d5202b8cc23834a8d75c',


};

// Initialise firebase
const app = initializeApp(firebaseConfig);

// Initialise Firebase services
const storage = getStorage(app);
const db = getFirestore(app);

//collection reference

export { storage, db };
