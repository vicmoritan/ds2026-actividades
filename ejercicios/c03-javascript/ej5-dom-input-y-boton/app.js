//Obtención de elementos de HTML
const altura = document.getElementById("numAltura");
const boton = document.getElementById("botonGen");
const resultado = document.getElementById("resultado");

//Cuando el usuario hace click, se ejecuta la función
boton.addEventListener("click", generarMedioArbol);

//Función para generar un medio árbol compuesto por asteriscos
function generarMedioArbol(){

    const valorAltura = altura.value;

    //Ingreso de número vacío o 1 = ERROR
    if (valorAltura === "" || valorAltura < 1) {
        resultado.textContent = "Error. Ingrese un número mayor o igual a 1.";
        return;
    }

    let arbol = "";

    for(let i=1; i <= valorAltura; i++){
        for(let j=0; j < i; j++){
            arbol += "*";
        }
        arbol += "\n";
    }
    resultado.textContent = arbol;
}