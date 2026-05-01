"use strict";
//Obtención de elementos HTML
const msjCargando = document.getElementById("cargando");
const msjError = document.getElementById("error");
const UsersList = document.getElementById("lista");
//Función para obtener lista de usuarios desde API
async function obtenerUsuarios() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        const usuarios = await response.json();
        return usuarios;
    }
    catch (error) {
        if (msjError) {
            msjError.textContent = "Error al obtener usuarios";
        }
        return [];
    }
    finally {
        if (msjCargando) {
            msjCargando.textContent = "";
        }
    }
}
//Función para mostrar los nombres y emails de usuarios obtenidos
async function mostrarUsuarios() {
    const listaUsuarios = await obtenerUsuarios();
    listaUsuarios.forEach(usuario => {
        const user = document.createElement("li");
        user.textContent = `Nombre: ${usuario.name} - Email: ${usuario.email}`;
        UsersList?.append(user);
    });
}
//Llamada a la función para mostrar
mostrarUsuarios();
