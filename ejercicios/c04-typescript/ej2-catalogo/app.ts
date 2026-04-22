//Obtención de elementos HTML
const inputAutor = document.getElementById("filtroAutor") as HTMLInputElement;
const botonFiltrar = document.getElementById("filtrar") as HTMLButtonElement;
const botonDisponibles = document.getElementById("mostrarDisponibles") as HTMLButtonElement;
const botonTodos = document.getElementById("mostrarTodos") as HTMLButtonElement;
const listaLibros = document.getElementById("listado") as HTMLUListElement;
const estadisticas  = document.getElementById("stats") as HTMLParagraphElement;

//Estructura del libro
interface Libro {
    isbn: string;
    titulo: string;
    autor: string;
    precio: number;
    disponible: boolean;
    genero?: string; //opcional
}

//Creación del catálogo con libros de prueba
let catalogo: Libro[] = [
    { isbn: "1234", titulo: "Crimen y castigo", autor: "Fiodor Dostoyevski", precio: 25000, disponible: true, genero: "Novela psicológica"},
    { isbn: "4567", titulo: "El conde de Montecristo", autor: "Alexandre Dumas", precio: 36000, disponible: false, genero: "Aventura"},
    { isbn: "8910", titulo: "Anna Karenina", autor: "Leon Tolstoi", precio: 33500, disponible: true, genero: "Novela realista"},
    { isbn: "1112", titulo: "Los hermanos Karamazov", autor: "Fiodor Dostoyevski", precio: 50000, disponible: true, genero: "Novela filosófica"},
    { isbn: "1314", titulo: "Orgullo y prejuicio", autor: "Jane Austen", precio: 20000, disponible: true, genero: "Novela romántica"},
    { isbn: "1516", titulo: "Memorias del subsuelo", autor: "Fiodor Dostoyevski", precio: 13500, disponible: false, genero: "Novela psicológica"},
    { isbn: "1718", titulo: "Sentido y sensibilidad", autor: "Jane Austen", precio: 30000, disponible: false, genero: "Novela romántica"},
    { isbn: "1920", titulo: "Demian", autor: "Herman Hesse", precio: 31000, disponible: true, genero: "Novela filosófica"}
];


//Agregar libros, mostrar cantidad total y promedio
function renderizar(libros: Libro[]): void {
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

        listaLibros.appendChild(lib);
    });

    //mostrar cantidad total de libros y precio promedio
    const cantidad = libros.length;
    const promedio = precioPromedio(libros).toFixed(2);

    estadisticas.textContent = `${cantidad} libros en el catálogo | Precio promedio: $${promedio}`;
}

//Filtrar libros según autor
function buscarPorAutor(autorFiltro: string): Libro[] {
    return catalogo.filter(libro => 
        libro.autor.toLowerCase().includes(autorFiltro.toLowerCase().trim())
    );
}

//Mostrar libros disponibles
function librosDisponibles(): Libro[] {
    return catalogo.filter(libro => libro.disponible);
}

//Calcular precio promedio de todos los libros
function precioPromedio(libros: Libro[]): number {
    if (libros.length === 0){
        return 0;
    }
    else {
        let precioTotal: number = libros.reduce((acumulador, libro) => {
            return acumulador + libro.precio;
        },0);

        return precioTotal / libros.length;
    }   
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


//Mostrar todos los libros al cargar la página
renderizar(catalogo);