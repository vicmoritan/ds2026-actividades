"use strict";
//Obtención de elementos HTML
const inputAutor = document.getElementById("filtroAutor");
const botonFiltrar = document.getElementById("filtrar");
const botonDisponibles = document.getElementById("mostrarDisponibles");
const botonTodos = document.getElementById("mostrarTodos");
const listaLibros = document.getElementById("listado");
const estadisticas = document.getElementById("stats");
const formulario = document.getElementById("form");
const error = document.getElementById("errorForm");
const botonAgregar = document.getElementById("agregar");
//Creación del catálogo con libros de prueba
let catalogo = [
    { isbn: "1234", titulo: "Crimen y castigo", autor: "Fiodor Dostoyevski", precio: 25000, disponible: true, genero: "Novela psicológica" },
    { isbn: "4567", titulo: "El conde de Montecristo", autor: "Alexandre Dumas", precio: 36000, disponible: false, genero: "Aventura" },
    { isbn: "8910", titulo: "Anna Karenina", autor: "Leon Tolstoi", precio: 33500, disponible: true, genero: "Novela realista" },
    { isbn: "1112", titulo: "Los hermanos Karamazov", autor: "Fiodor Dostoyevski", precio: 50000, disponible: true, genero: "Novela filosófica" },
    { isbn: "1314", titulo: "Orgullo y prejuicio", autor: "Jane Austen", precio: 20000, disponible: true, genero: "Novela romántica" },
    { isbn: "1516", titulo: "Memorias del subsuelo", autor: "Fiodor Dostoyevski", precio: 13500, disponible: false, genero: "Novela psicológica" },
    { isbn: "1718", titulo: "Sentido y sensibilidad", autor: "Jane Austen", precio: 30000, disponible: false, genero: "Novela romántica" },
    { isbn: "1920", titulo: "Demian", autor: "Herman Hesse", precio: 31000, disponible: true, genero: "Novela filosófica" }
];
//Agregar libros, mostrar cantidad total y promedio
function renderizar(libros) {
    //limpiar lista
    listaLibros.textContent = "";
    //agregar libro a la lista
    libros.forEach(libro => {
        const lib = document.createElement("li");
        const titulo = document.createElement("strong");
        titulo.textContent = `📚 ${libro.titulo}`;
        const info = document.createElement("div");
        info.textContent = `Autor: ${libro.autor} | Género: ${libro.genero ?? "No definido"} | Precio: $${libro.precio} `;
        lib.appendChild(titulo);
        lib.appendChild(info);
        //agregar botón para eliminar
        const botonEliminar = document.createElement("button");
        botonEliminar.textContent = "Eliminar";
        lib.appendChild(botonEliminar);
        listaLibros.appendChild(lib);
        //eliminar libro si se hace click en el botón
        botonEliminar.addEventListener("click", () => {
            eliminarLibro(libro.isbn);
        });
    });
    //mostrar cantidad total de libros y precio promedio
    const cantidad = libros.length;
    const promedio = precioPromedio(libros).toFixed(2);
    estadisticas.textContent = `${cantidad} libros en el catálogo | Precio promedio: $${promedio}`;
}
//Filtrar libros según autor
function buscarPorAutor(autorFiltro) {
    return catalogo.filter(libro => libro.autor.toLowerCase().includes(autorFiltro.toLowerCase().trim()));
}
//Mostrar libros disponibles
function librosDisponibles() {
    return catalogo.filter(libro => libro.disponible);
}
//Calcular precio promedio de todos los libros
function precioPromedio(libros) {
    if (libros.length === 0) {
        return 0;
    }
    else {
        let precioTotal = libros.reduce((acumulador, libro) => {
            return acumulador + libro.precio;
        }, 0);
        return precioTotal / libros.length;
    }
}
//Agregar libro
function agregarLibro(libro) {
    catalogo.push(libro);
    renderizar(catalogo);
}
//Validar formulario
function validarFormulario() {
    //generar isbn único
    const isbn = "AUTO-" + Date.now();
    const infoFormulario = new FormData(formulario);
    //extraer datos del formulario
    const titulo = infoFormulario.get('titulo');
    const autor = infoFormulario.get('autor');
    const precio = Number(infoFormulario.get('precio'));
    const disponible = infoFormulario.get('disponible') !== null;
    const genero = infoFormulario.get('genero').trim() || "No definido";
    //validar 
    if (!titulo || !autor || isNaN(precio) || precio <= 0) {
        return null;
    }
    else
        return {
            isbn,
            titulo,
            autor,
            precio,
            disponible,
            genero
        };
}
//Eliminar libro
function eliminarLibro(isbn) {
    catalogo = catalogo.filter(libro => libro.isbn !== isbn);
    renderizar(catalogo);
}
//Botones
botonFiltrar.addEventListener("click", () => {
    const autorFiltro = inputAutor.value.trim();
    renderizar(buscarPorAutor(autorFiltro));
    inputAutor.value = ""; //limpiar input
});
botonDisponibles.addEventListener("click", () => {
    renderizar(librosDisponibles());
});
botonTodos.addEventListener("click", () => {
    renderizar(catalogo);
});
botonAgregar.addEventListener("click", () => {
    const libro = validarFormulario();
    if (libro === null) {
        error.textContent = "Error: datos ingresados inválidos. Excepto el género, no pueden estar vacíos y el precio debe ser mayor a 0.";
        return;
    }
    ;
    error.textContent = "";
    agregarLibro(libro);
    formulario.reset();
});
//Mostrar todos los libros al cargar la página
renderizar(catalogo);
