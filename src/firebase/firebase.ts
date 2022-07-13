import {initializeApp} from 'firebase/app'
import {getAuth} from 'firebase/auth'
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAqFeUxF1a6vJgLdexy1_rbR38s1qXDrIY",
  authDomain: "booking-office-angular.firebaseapp.com",
  databaseURL: "https://booking-office-angular-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "booking-office-angular",
  storageBucket: "booking-office-angular.appspot.com",
  messagingSenderId: "554865105035",
  appId: "1:554865105035:web:906a32a8d503e4cf1d1c8e",
  measurementId: "G-JETHFBH6T0"
}

const app = initializeApp(firebaseConfig)

const auth = getAuth();
const db = getFirestore(app);

export {auth, db}