// Importar Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

import {
    getDatabase,
    ref,
    set,
    push,
    onValue,
    get,
    child
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";

// Configuración de tu proyecto
const firebaseConfig = {
    apiKey: "AIzaSyC2BSFYZBvIF7cxUr7xUvZKmlhg0ACk504",
    authDomain: "tp-js-48675.firebaseapp.com",
    databaseURL: "https://tp-js-48675-default-rtdb.firebaseio.com", // 👈 IMPORTANTE agregar esta línea
    projectId: "tp-js-48675",
    storageBucket: "tp-js-48675.firebasestorage.app",
    messagingSenderId: "930594601481",
    appId: "1:930594601481:web:d67813a0ffdd977144d6d8",
    measurementId: "G-GN0C2S2GSS"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);


console.log("Base de datos conectada:", db);

/* ==========================
    REGISTRO
========================== */
const btnRegister = document.getElementById("buttonregister");
if (btnRegister) {
    btnRegister.addEventListener("click", (e) => {
        e.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const password2 = document.getElementById("password2").value;

        if (password !== password2) {
            alert("Las contraseñas no coinciden");
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;

                // 📦 Guardar datos en Realtime Database
                set(ref(db, "usuarios/" + user.uid), {
                    email: email,
                creadoEl: new Date().toISOString()
                })
                .then(() => {
                    console.log("✅ Datos guardados correctamente en la BD");
                })
                .catch((error) => {
                    console.error("❌ Error al guardar en la BD:", error);
                });


                alert("Usuario creado con éxito");
                window.location.href = "login.html";
            })
            .catch((error) => {
                alert("Error: " + error.message);
            });
    });
}


/* ==========================
    LOGIN
========================== */
const btnLogin = document.getElementById("buttonlogin");
if (btnLogin) {
    btnLogin.addEventListener("click", (e) => {
        e.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                window.location.href = "../paginas/principal.html";
            })
            .catch((error) => {
                alert("Error: " + error.message);
            });
    });
}
