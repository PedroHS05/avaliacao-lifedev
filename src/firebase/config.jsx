import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyDg1ZfRLeoxdOm6gXXzabhMxg8coiEElg8",
    authDomain: "avaliacao-lifedev-dc6e9.firebaseapp.com",
    projectId: "avaliacao-lifedev-dc6e9",
    storageBucket: "avaliacao-lifedev-dc6e9.firebasestorage.app",
    messagingSenderId: "3053068456",
    appId: "1:3053068456:web:aaf19a7671b9750332629d",
    measurementId: "G-PW2853VN0S"
};

const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
const db = getFirestore(app)
const auth = getAuth(app)

export { db, auth }