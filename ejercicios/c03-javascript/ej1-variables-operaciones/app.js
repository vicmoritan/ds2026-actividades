//Declaraciones
const nombre = "Victoria Sofía Moritán";
const edad = 19;
const materia = "Desarrollo de Software";

//Mostrar info personal en consola
console.log(`Me llamo ${nombre}, tengo ${edad} años y estoy cursando ${materia}.`);

//Declarar contador en 0
let contador = 0;

//Sumarle 1 tres veces al contador
for(let i = 0; i < 3; i++ ) {
    contador++;
}

//Mostrar valor final
console.log(`Valor final: ${contador}`);