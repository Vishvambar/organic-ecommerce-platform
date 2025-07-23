import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import {
    getAnalytics
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-analytics.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import {
    getFirestore,
    doc,
    setDoc
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

document.addEventListener('contextmenu', (event) => {
    event.preventDefault(); // Prevent default right-click menu
});
const isLocalhost = window.location.hostname === 'localhost';


// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyCfQoSWrD3MgszZk7bUKVuOQGrHm8lQNgY",
    authDomain: isLocalhost ? "localhost" : "finalyearproject-c903e.firebaseapp.com",
    projectId: "finalyearproject-c903e",
    storageBucket: "finalyearproject-c903e.appspot.com",
    messagingSenderId: "973186077279",
    appId: "1:973186077279:web:ee54875cad164d43d841ea",
    measurementId: "G-MQK78X673M"
};


const provider = new GoogleAuthProvider();
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

// DOM Elements
const loginBox = document.getElementById('login-box');
const signupBox = document.getElementById('signup-box');
const displaySignUp = document.getElementById('display-sign-up');
const displaySignIn = document.getElementById('display-sign-in');
const container = document.querySelector('.container');
const logoutButton = document.querySelector('.logout');
const loginSuccessAnimation = document.getElementById('login-success');
const googleLoginButton = document.getElementById('google-login');



// Show Animation Function
function showLoginSuccessAnimation() {
    loginSuccessAnimation.style.display = "flex"; // Make the animation container visible
    loginSuccessAnimation.classList.add("active");

    // Hide the animation after 3 seconds
    setTimeout(() => {
        loginSuccessAnimation.classList.remove("active");
        loginSuccessAnimation.style.display = "none";
    }, 3000);
}

// Toggle to Sign Up form
displaySignUp.addEventListener('click', (e) => {
    e.preventDefault();
    loginBox.style.display = 'none';
    signupBox.style.display = 'block';
    container.style.top = '20%';
});

// Toggle to Login form
displaySignIn.addEventListener('click', (e) => {
    e.preventDefault();
    signupBox.style.display = 'none';
    loginBox.style.display = 'block';
    container.style.top = '27%';
});

// Sign Up Function
document.querySelector('#signup-box form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = event.target.name.value.trim();
    const email = event.target.email.value.trim();
    const address = event.target.address.value.trim();
    const password = event.target.password.value.trim();
    const confirmPassword = event.target.confirm_password.value.trim();
    const mobileno = event.target.mobileno.value.trim();
    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Save additional user data to Firestore
        await setDoc(doc(db, "users", user.uid), { name, email, address, mobileno });
        alert("Sign Up Successful!");
        console.log("User data saved to Firestore.");
        signupBox.style.display = 'none';
        loginBox.style.display = 'block';
    } catch (error) {
        alert(error.message);
        console.error("Error during sign up:", error);
    }
});

// Login Function
document.querySelector('#login-box form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = event.target.email.value.trim();
    const password = event.target.password.value.trim();

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);

        // Show Login Success Animation
        showLoginSuccessAnimation();

        console.log("User logged in:", userCredential.user);

        // Redirect after animation
        setTimeout(() => {
            window.location.href = "home.html";
        }, 3000);
    } catch (error) {
        alert(error.message);
        console.error("Error during login:", error);
    }
});

// Google Sign-In Function
googleLoginButton.addEventListener('click', async () => {
    const provider = new GoogleAuthProvider();

    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;

        // Save user data to Firestore if it's their first login
        const userDocRef = doc(db, "users", user.uid);
        const userData = {
            name: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
        };

        await setDoc(userDocRef, userData, { merge: true });

        console.log("User signed in with Google:", user);
        alert("Login Successful!");

        // Redirect after login
        window.location.href = "home.html";
    } catch (error) {
        console.error("Error during Google Sign-In:", error);
        alert(error.message);
    }
});

// Logout Function
if (logoutButton) {
    logoutButton.addEventListener('click', async () => {
        try {
            await signOut(auth);
            clearBrowserData();
            alert("You have been signed out and all data has been cleared.");
            console.log("Signout Successful");
        } catch (error) {
            console.error("Error during sign out:", error);
        }
    });
}

// Auth State Change Listener
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("User logged in:", user);
    } else {
        console.log("User logged out");
        // Optionally redirect to login page
    }
});

// Clear Browser Data Function
function clearBrowserData() {
    localStorage.clear();
    sessionStorage.clear();
    document.cookie.split(";").forEach((cookie) => {
        const cookieName = cookie.split("=")[0].trim();
        document.cookie = `${cookieName}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/`;
    });
    console.log("All user data cleared from the browser.");
}

