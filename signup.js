// // Import the functions you need from the SDKs you need
// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-analytics.js";
// import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js"

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//     apiKey: "AIzaSyA5Q-hcTc9A7hOdjjNYmsCCE2xEx6vMV2g",
//     authDomain: "vnorganics-1d15f.firebaseapp.com",
//     projectId: "vnorganics-1d15f",
//     storageBucket: "vnorganics-1d15f.appspot.com",
//     messagingSenderId: "361168920551",
//     appId: "1:361168920551:web:5aa692ce9c72e4bd892742",
//     measurementId: "G-NHNG1XM0NC"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// const auth = getAuth();

// const submitButton = document.getElementById("submit");
// const signupButton = document.getElementById("sign-up");
// const emailInput = document.getElementById("email");
// const passwordInput = document.getElementById("password");
// const main = document.getElementById("main");
// const createacct = document.getElementById("create-acct")

// const signupEmailIn = document.getElementById("email-signup");
// // const confirmSignupEmailIn = document.getElementById("confirm-email-signup");
// const signupPasswordIn = document.getElementById("password-signup");
// // const confirmSignUpPasswordIn = document.getElementById("confirm-password-signup");
// const createacctbtn = document.getElementById("create-acct-btn");

// const returnBtn = document.getElementById("return-btn");

// var email, password, signupEmail, signupPassword, confirmSignupEmail, confirmSignUpPassword;

// createacctbtn.addEventListener("click", function () {
//     var isVerified = true;

//     signupEmail = signupEmailIn.value;
//     confirmSignupEmail = confirmSignupEmailIn.value;
//     if (signupEmail != confirmSignupEmail) {
//         window.alert("Email fields do not match. Try again.")
//         isVerified = false;
//     }

//     signupPassword = signupPasswordIn.value;
//     confirmSignUpPassword = confirmSignUpPasswordIn.value;
//     if (signupPassword != confirmSignUpPassword) {
//         window.alert("Password fields do not match. Try again.")
//         isVerified = false;
//     }

//     if (signupEmail == null ||  signupPassword == null  ) {
//         window.alert("Please fill out all required fields.");
//         isVerified = false;
//     }

//     if (isVerified) {
//         createUserWithEmailAndPassword(auth, signupEmail, signupPassword)
//             .then((userCredential) => {
//                 // Signed in 
//                 const user = userCredential.user;
//                 // ...
//                 window.alert("Success! Account created.");
//             })
//             .catch((error) => {
//                 const errorCode = error.code;
//                 const errorMessage = error.message;
//                 // ..
//                 window.alert("Error occurred. Try again.");
//             });
//     }
// });

// submitButton.addEventListener("click", function () {
//     email = emailInput.value;
//     console.log(email);
//     password = passwordInput.value;
//     console.log(password);

//     signInWithEmailAndPassword(auth, email, password)
//         .then((userCredential) => {
//             // Signed in
//             const user = userCredential.user;
//             console.log("Success! Welcome back!");
//             window.alert("Success! Welcome back!");
//             // ...
//         })
//         .catch((error) => {
//             const errorCode = error.code;
//             const errorMessage = error.message;
//             console.log("Error occurred. Try again.");
//             window.alert("Error occurred. Try again.");
//         });
// });

// signupButton.addEventListener("click", function () {
//     main.style.display = "none";
//     createacct.style.display = "block";
// });

// returnBtn.addEventListener("click", function () {
//     main.style.display = "block";
//     createacct.style.display = "none";
// });

// Import the functions you need from the SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA5Q-hcTc9A7hOdjjNYmsCCE2xEx6vMV2g",
    authDomain: "vnorganics-1d15f.firebaseapp.com",
    projectId: "vnorganics-1d15f",
    storageBucket: "vnorganics-1d15f.appspot.com",
    messagingSenderId: "361168920551",
    appId: "1:361168920551:web:5aa692ce9c72e4bd892742",
    measurementId: "G-NHNG1XM0NC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();

// Get references to HTML elements
const submitButton = document.getElementById("submit");
const signupButton = document.getElementById("sign-up");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const main = document.getElementById("main");
const createacct = document.getElementById("create-acct");

const signupEmailIn = document.getElementById("email-signup");
const signupPasswordIn = document.getElementById("password-signup");
const createacctbtn = document.getElementById("create-acct-btn");
const returnBtn = document.getElementById("return-btn");

// Handle account creation
createacctbtn.addEventListener("click", function (e) {
    e.preventDefault(); // Prevent form from submitting

    const signupEmail = signupEmailIn.value;
    const signupPassword = signupPasswordIn.value;

    if (signupEmail && signupPassword) {
        createUserWithEmailAndPassword(auth, signupEmail, signupPassword)
            .then((userCredential) => {
                const user = userCredential.user;
                window.alert("Success! Account created.");
                main.style.display = "block";
                createacct.style.display = "none";

            })
            .catch((error) => {
                window.alert("Error occurred: " + error.message);
            });
    } else {
        window.alert("Please fill out all fields.");
    }
});

// Handle login
submitButton.addEventListener("click", function (e) {
    e.preventDefault(); // Prevent form from submitting

    const email = emailInput.value;
    const password = passwordInput.value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            window.alert("Success! Welcome back!");
            window.location.href="index.html";
        })
        .catch((error) => {
            window.alert("Error occurred: " + error.message);
        });
});

// Show signup form
signupButton?.addEventListener("click", function () {
    main.style.display = "none";
    createacct.style.display = "block";
});

// Return to login form
returnBtn.addEventListener("click", function () {
    main.style.display = "block";
    createacct.style.display = "none";
});
