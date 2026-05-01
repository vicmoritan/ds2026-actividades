//Obtención de elementos HTML
const input = document.getElementById("textoInput") as HTMLInputElement;
const botonBuscar = document.getElementById("buscar") as HTMLButtonElement;
const result = document.getElementById("resultados") as HTMLDivElement;
const msjError = document.getElementById("error") as HTMLParagraphElement;
const msjCargando = document.getElementById("cargando") as HTMLParagraphElement;

//Estructura del libro
interface LibroOL {
    title: string;
    author_name?: string[];
    first_publish_year?: number;
}

//Función para buscar libros
async function buscarLibros(q: string): Promise<LibroOL[]> {
    try {
        const response = await fetch(`https://openlibrary.org/search.json?q=${q}`);

        if (!response.ok) {
            throw new Error (`HTTP ${response.status}`);
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
        return;
    }

    msjError.textContent = "";
    result.textContent = "";

    msjCargando.textContent = "Cargando...";

    const listaLibros = await buscarLibros(q);

    msjCargando.textContent = "";

    if (listaLibros.length === 0) {
        msjError.textContent = "No se encontraron libros";
        return;
    }

    listaLibros.slice(0,10).forEach(libro =>{
        const tarjeta = document.createElement("div");

        const titulo = document.createElement("h3");
        titulo.textContent = libro.title;

        const autor = document.createElement("p");
        autor.textContent = `Autor: ${libro.author_name ? libro.author_name[0] : "Desconocido"}`;

        const anio = document.createElement("p");
        anio.textContent = `Año: ${libro.first_publish_year ?? "Desconocido"}`;

        tarjeta.append(titulo);
        tarjeta.append(autor);
        tarjeta.append(anio);

        result.append(tarjeta);
    }
    )
}


//Click en botón para buscar
botonBuscar?.addEventListener("click", () => {
    mostrarLibros();
})