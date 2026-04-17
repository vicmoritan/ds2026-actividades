//Creación de array
const numeros = [5, 15, 25, 10, 12, 9, 13, 58]

//Declaración de variables
let suma = 0;
let numMayor = numeros[0];
let numMenor = numeros[0];

for (const num of numeros) {
    suma += num;

    if (num > numMayor){
        numMayor = num;
    }
    
    if (num < numMenor){
        numMenor = num;
    }
}

const promedio = suma / numeros.length;

//Resultados
console.log(`Suma : ${suma}`);
console.log(`Promedio: ${promedio}`);
console.log(`Número mayor: ${numMayor}`);
console.log(`Número menor: ${numMenor}`);

//Función que retorna un string de asteriscos con la cantidad de números ingresada
function generarAsteriscos(n){
    let asteriscos = "";

    for (let i = 0; i < n; i++){
        asteriscos += "*";
    }
    return asteriscos;
}

//Dato de prueba
console.log(generarAsteriscos(5));