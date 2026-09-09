// Firebase Authentication import
import { createUserWithEmailAndPassword } from
    "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import { auth } from "./firebase.js";


// Registration form
const registrationForm =
    document.getElementById("registrationForm");


registrationForm.addEventListener("submit", async function (event) {

    // Page reload ko rokna
    event.preventDefault();


    // =========================
    // GET INPUT VALUES
    // =========================

    const name =
        document.getElementById("name").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const password =
        document.getElementById("password").value;

    const mobile =
        document.getElementById("mobile").value.trim();

    const username =
        document.getElementById("username").value.trim();


    // =========================
    // ERROR ELEMENTS
    // =========================

    const nameError =
        document.getElementById("nameError");

    const emailError =
        document.getElementById("emailError");

    const passwordError =
        document.getElementById("passwordError");

    const mobileError =
        document.getElementById("mobileError");

    const usernameError =
        document.getElementById("usernameError");


    // Purane errors clear
    nameError.textContent = "";
    emailError.textContent = "";
    passwordError.textContent = "";
    mobileError.textContent = "";
    usernameError.textContent = "";


    let isValid = true;


    // =========================
    // NAME VALIDATION
    // =========================

    const namePattern = /^[A-Za-z ]+$/;

    if (name === "") {

        nameError.textContent =
            "Name is required";

        isValid = false;

    } else if (!namePattern.test(name)) {

        nameError.textContent =
            "Name should contain only letters and spaces";

        isValid = false;
    }


    // =========================
    // EMAIL VALIDATION
    // =========================

const emailPattern =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === "") {

        emailError.textContent =
            "Email is required";

        isValid = false;

    } else if (!emailPattern.test(email)) {

        emailError.textContent =
            "Please enter a valid email";

        isValid = false;
    }


    // =========================
    // PASSWORD VALIDATION
    // =========================
const passwordPattern =
    /^(?=.*[A-Za-z])(?=.*\d).+$/;

    if (password === "") {

        passwordError.textContent =
            "Password is required";

        isValid = false;

    } else if (!passwordPattern.test(password)) {

        passwordError.textContent =
            "Password must contain at least one letter and one number";

        isValid = false;
    }


    // =========================
    // MOBILE VALIDATION
    // =========================

    const mobilePattern = /^[0-9]{10}$/;

    if (mobile === "") {

        mobileError.textContent =
            "Mobile number is required";

        isValid = false;

    } else if (!mobilePattern.test(mobile)) {

        mobileError.textContent =
            "Mobile number must contain exactly 10 digits";

        isValid = false;
    }


    // =========================
    // USERNAME VALIDATION
    // =========================

    // Alphanumeric + maximum one special character
    const usernamePattern =
        /^[A-Za-z0-9]+[._-]?[A-Za-z0-9]+$/;

    if (username === "") {

        usernameError.textContent =
            "Username is required";

        isValid = false;

    } else if (!usernamePattern.test(username)) {

        usernameError.textContent =
            "Username can contain letters, numbers and one special character";

        isValid = false;
    }


    // =========================
    // FIREBASE REGISTRATION
    // =========================

    if (isValid) {

        try {

            const userCredential =
                await createUserWithEmailAndPassword(
                    auth,
                    email,
                    password
                );


            const user = userCredential.user;


            console.log(
                "Registration successful!"
            );

            console.log(
                "User ID:",
                user.uid
            );


            // User information temporarily save
            // kar rahe hain profile page ke liye
            const userData = {

                name: name,
                email: email,
                password: password,
                mobile: mobile,
                username: username

            };


            localStorage.setItem(
                "userData",
                JSON.stringify(userData)
            );


            alert(
                "Registration successful!"
            );


            // Profile page par bhejna
            window.location.href =
                "profile.html";


        } catch (error) {

            console.log(error);


            // =========================
            // FIREBASE ERRORS
            // =========================

            if (
                error.code ===
                "auth/email-already-in-use"
            ) {

                emailError.textContent =
                    "This email is already registered.";

            } else if (
                error.code ===
                "auth/invalid-email"
            ) {

                emailError.textContent =
                    "Invalid email address.";

            } else if (
                error.code ===
                "auth/weak-password"
            ) {

                passwordError.textContent =
                    "Password should be at least 6 characters.";

            } else {

                alert(
                    "Registration failed. Please try again."
                );
            }
        }
    }

});