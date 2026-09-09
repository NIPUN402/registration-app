import { initializeApp } from
    "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import { getAuth } from
    "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


const firebaseConfig = {
    apiKey: "AIzaSyADs7Fi1KErMJaxqHt9uLNYBr1TIwjb8Sc",
    authDomain: "registration-app-15f8f.firebaseapp.com",
    projectId: "registration-app-15f8f",
    storageBucket: "registration-app-15f8f.firebasestorage.app",
    messagingSenderId: "194654756429",
    appId: "1:194654756429:web:5d6b253410fa98842c0604",
    measurementId: "G-9C4C1P32GH"
};


const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { auth };