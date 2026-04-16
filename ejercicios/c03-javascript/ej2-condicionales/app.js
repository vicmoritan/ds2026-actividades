//Función para determinar si un alumno promocionó, aprobó o desaprobó
function clasificarNota(nota){
    if (nota < 4){
        return "Desaprobado";
    } else if (nota >=4 && nota <= 7){
        return "Aprobado";
    }   else {
        return "Promocionado";
    }
}

//Datos de prueba para clasificarNota
console.log(clasificarNota(3)) //Desaprobado
console.log(clasificarNota(5)) //Aprobado
console.log(clasificarNota(9)) //Promocionado

//Función para determinar qué dia de la semana es según el número
function diaDeLaSemana(numero){
    switch (numero){
        case 1: return "Lunes";
        case 2: return "Martes";
        case 3: return "Miércoles";
        case 4: return "Jueves";
        case 5: return "Viernes";
        case 6: return "Sábado (fin de semana)";
        case 7: return "Domingo (fin de semana)";
        default: return "Día inválido";
    }
}  

//Datos de prueba para diaDeLaSemana
console.log(diaDeLaSemana(2)) //Martes
console.log(diaDeLaSemana(6)) //Sábado (fin de semana)
console.log(diaDeLaSemana(10)) //Día inválido