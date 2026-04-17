//Obtención de elementos de HTML
const botonAgregar = document.getElementById("botonAgregar");
const lista = document.getElementById("lista");
const producto = document.getElementById("nomProducto");
const contador = document.getElementById("contador");
const error = document.getElementById("error");

//Inicialización de contador
let totalProd = 0;

//Agregar producto al hacer click en el botón
botonAgregar.addEventListener("click", agregarProd);

function agregarProd(){
    const nombreProd = producto.value.trim();

    //No se puede ingresar un nombre de producto vacío
    if (nombreProd === ""){
        error.textContent = "Error: ingrese un nombre de producto válido.";
        return;
    }

    //Limpiar mensaje de error
    error.textContent = "";

    //Crear producto y agregarlo a la lista
    const prodLista = document.createElement("li");
    prodLista.textContent = nombreProd + " ";
    lista.appendChild(prodLista);

    //Crear botón para eliminar
    const botonEliminar = document.createElement("button");
    botonEliminar.textContent = "Eliminar";
    prodLista.appendChild(botonEliminar);

    //Sumar el producto al contador
    totalProd++;
    actualizarTotal();

    //Eliminar producto al hacer click en el botón
    botonEliminar.addEventListener("click", function(){
        eliminarProd(prodLista);
    });

    //Limpiar nombre de producto escrito en la casilla después de agregarlo
    producto.value = "";
}

//Actualizar el contador cuando se agrega o elimina un producto
function actualizarTotal(){
    contador.textContent = `${totalProd} productos en la lista`;
}

//Eliminar producto
function eliminarProd(productoElim){
    lista.removeChild(productoElim);
    totalProd--;
    actualizarTotal();
}