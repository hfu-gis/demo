import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBX_J8tsYxFeTpX4RL1sJeYrs_Fti9QI-U",
  authDomain: "grasshoppers-cd34e.firebaseapp.com",
  databaseURL: "https://grasshoppers-cd34e.firebaseio.com",
  projectId: "grasshoppers-cd34e",
  storageBucket: "grasshoppers-cd34e.appspot.com",
  messagingSenderId: "593907011991",
  appId: "1:593907011991:web:b8508d375c11c6f8c5f4d2",
  measurementId: "G-L62LQEF4J1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db
