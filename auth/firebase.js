
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
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";

// Configuración de tu proyecto
const firebaseConfig = {
    apiKey: "AIzaSyB9esL15TwcRXYjp7Om7Ph8bOx_tjd26Yo",
    authDomain: "tp-2-8f6cf.firebaseapp.com",
    databaseURL: "https://tp-2-8f6cf-default-rtdb.firebaseio.com",
    projectId: "tp-2-8f6cf",
    storageBucket: "tp-2-8f6cf.firebasestorage.app",
    messagingSenderId: "822150210622",
    appId: "1:822150210622:web:b64714d5499dac7bc91d6f",
    measurementId: "G-CLVQDZ6VHF"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

set(ref(db, "test"), { ok: true })
    .then(() => console.log("✔ Test de escritura OK"))
    .catch((error) => console.error("❌ Error en test:", error));



console.log("Base de datos conectada:", db);

/* ==========================
    REGISTRO
========================== */
const btnRegister = document.getElementById("buttonregister");
if (btnRegister) {
    btnRegister.addEventListener("click", (e) => {
        e.preventDefault();

        const email = document.getElementById("email").value;
        const nombre = document.getElementById("nombre").value;
        const apellido = document.getElementById("apellido").value;
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
                    nombre: nombre,
                    apellido: apellido,
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
