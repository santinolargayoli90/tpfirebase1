import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyARuii9degEwPho-tr1KsNxAX3GonKPXyY",
    authDomain: "sl-phones.firebaseapp.com",
    databaseURL: "https://sl-phones-default-rtdb.firebaseio.com",
    projectId: "sl-phones",
    storageBucket: "sl-phones.firebasestorage.app",
    messagingSenderId: "604989841007",
    appId: "1:604989841007:web:b729584585a2bd6da7b79a",
    measurementId: "G-V37H2ZWWQH"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const inputCodigo = document.querySelector("#codigo");
const inputMarca = document.querySelector("#marca");
const inputModelo = document.querySelector("#modelo");
const inputAlmacenamiento = document.querySelector("#almacenamiento");
const inputPrecio = document.querySelector("#precio");

const btnAgregar = document.querySelector("#agregar");
const mensaje = document.querySelector("#mensaje");

btnAgregar.onclick = () => {
    const codigo = inputCodigo.value.toUpperCase().trim();
    if (!codigo) {
        mensaje.textContent = "Debe ingresar un código válido.";
        return;
    }

    const celularesRef = ref(db, "celulares/" + codigo);

    set(celularesRef, {
        codigo: codigo,
        marca: inputMarca.value.trim(),
        modelo: inputModelo.value.trim(),
        almacenamiento: inputAlmacenamiento.value.trim(),
        precio: Number(inputPrecio.value)
    })
        .then(() => {
            mensaje.style.color = "green";
            mensaje.textContent = "Celular agregado correctamente";
            document.querySelector("#formulario-celular").reset();
        })
        .catch((error) => {
            mensaje.style.color = "red";
            mensaje.textContent = "Error al agregar celular: " + error.message;
        });
};

const tabla = document.querySelector("#lista-celulares");
const refCelulares = ref(db, "celulares");

onValue(refCelulares, (snapshot) => {
    const celulares = snapshot.val() || {};
    tabla.innerHTML = "";

    for (const codigo in celulares) {
        tabla.innerHTML += `
      <tr>
        <td>${celulares[codigo].codigo}</td>
        <td>${celulares[codigo].marca}</td>
        <td>${celulares[codigo].modelo}</td>
        <td>${celulares[codigo].almacenamiento}</td>
        <td>$ ${celulares[codigo].precio.toFixed(2)}</td>
      </tr>
    `;
    }
});
