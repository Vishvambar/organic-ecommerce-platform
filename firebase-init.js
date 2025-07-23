import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCfQoSWrD3MgszZk7bUKVuOQGrHm8lQNgY",
    authDomain: "finalyearproject-c903e.firebaseapp.com",
    projectId: "finalyearproject-c903e",
    storageBucket: "finalyearproject-c903e.appspot.com",
    messagingSenderId: "973186077279",
    appId: "1:973186077279:web:ee54875cad164d43d841ea",
    measurementId: "G-MQK78X673M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
