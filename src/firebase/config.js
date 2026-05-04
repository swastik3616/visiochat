import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDVUV-mH7Z5XCFV5nZnh_sPzZgMDQJzvM8",
    authDomain: "visiochat-aecfd.firebaseapp.com",
    projectId: "visiochat-aecfd",
    storageBucket: "visiochat-aecfd.firebasestorage.app",
    messagingSenderId: "75252536700",
    appId: "1:75252536700:web:50fcc8246b6c261e8900f9",
    measurementId: "G-XFF26721NG"
};

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export default app