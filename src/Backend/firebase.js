// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore";
import { getAnalytics,setUserProperties } from "firebase/analytics";

import { getAuth, updateProfile } from "firebase/auth";

    // TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries
    
    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
      apiKey: "AIzaSyBPkMcmZBENRkWro7DqBGceQJ4uxnHGcrA",
      authDomain: "olaacademy-8f947.firebaseapp.com",
      projectId: "olaacademy-8f947",
      storageBucket: "olaacademy-8f947.appspot.com",
      messagingSenderId: "913036329219",
      appId: "1:913036329219:web:12ac4b5e585c32c230a936",
      measurementId: "G-04SXWCL979"
    };
    
    // Initialize Firebase
    
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
    
    export const db=getFirestore(app);
    export const auth = getAuth()
    
    
    
    