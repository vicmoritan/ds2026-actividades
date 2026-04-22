//Obtención de elementos de HTML
const inputAltura = document.getElementById("numAltura") as HTMLInputElement;
const botonGenerar = document.getElementById("botonGen") as HTMLButtonElement;
const resultadoObtenido = document.getElementById("resultado") as HTMLPreElement;

//Cuando el usuario hace click, se ejecuta la función
botonGenerar.addEventListener("click", () => {
       const valorAltura = Number(inputAltura.value);

    //Ingreso de número vacío o 1 = ERROR
    if (isNaN(valorAltura) || valorAltura < 1) {
        resultadoObtenido.textContent = "Error. Ingrese un número mayor o igual a 1.";
        return;
    }

    resultadoObtenido.textContent = generarAsteriscos(valorAltura);
}
);

//Función para generar un medio árbol compuesto por asteriscos
function generarAsteriscos(valorAltura: number): string{
    let arbol: string = "";

    for(let i=1; i <= valorAltura; i++){
        for(let j=0; j < i; j++){
            arbol += "*";
        }
        arbol += "\n";
    }
    return arbol;
}