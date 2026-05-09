"use strict";
//Obtención de elementos HTML
const input = document.getElementById("textoInput");
const botonBuscar = document.getElementById("buscar");
const result = document.getElementById("resultados");
const msjError = document.getElementById("error");
const msjCargando = document.getElementById("cargando");
//Función para buscar libros
async function buscarLibros(q) {
    try {
        const response = await fetch(`https://openlibrary.org/search.json?q=${q}`);
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        const data = await response.json();
        return data.docs;
    }
    catch (error) {
        msjError.textContent = "Error en la búsqueda del libro";
        return [];
    }
}
//Mostrar 10 primeros resultados de libro buscado
async function mostrarLibros() {
    const q = input.value.trim();
    if (q === "") {
        msjError.textContent = "Ingrese un libro";
        result.textContent = "";
        return;
    }
    msjError.textContent = "";
    result.textContent = "";
    msjCargando.textContent = "Cargando...";
    const listaLibros = await buscarLibros(q);
    msjCargando.textContent = "";
    if (listaLibros.length === 0) {
        msjError.textContent = "No se encontraron libros";
        result.textContent = "";
        return;
    }

    listaLibros.slice(0, 12).forEach(libro => {

        const col = document.createElement("div");
        col.className = "col-md-2 mb-3";

        const tarjeta = document.createElement("div");
        tarjeta.className = "card";

        const cuerpo = document.createElement("div");
        cuerpo.className = "card-body";

        const portada = document.createElement("img");
        portada.className = "card-img-top";

        if (libro.cover_i) {
            portada.src = `https://covers.openlibrary.org/b/id/${libro.cover_i}-L.jpg`;
        } else {
            portada.src = "imagenes/sinImagen.jpg";
        }

        const titulo = document.createElement("h5");
        titulo.className = "card-title";
        titulo.textContent = libro.title;

        const autor = document.createElement("p");
        autor.className = "card-text";
        autor.innerHTML = `<strong>Autor:</strong> ${libro.author_name ? libro.author_name[0] : "Desconocido"}`;

        cuerpo.append(titulo, autor);
        tarjeta.append(portada, cuerpo);
        col.append(tarjeta);
        result.append(col);
    });
}

//Click en botón para buscar
botonBuscar?.addEventListener("click", () => {
    mostrarLibros();
});