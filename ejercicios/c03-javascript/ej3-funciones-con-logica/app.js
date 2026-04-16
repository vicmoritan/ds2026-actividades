//Función para calcular el precio final con/sin descuento según el monto
function calcularPrecioFinal(monto, medioPago){
    if (monto > 400){
        return monto - (monto * 0.4);
    }
    else if (monto >= 200 && monto <= 400){
        switch(medioPago){
            case "E": return monto - (monto * 0.3);
            case "D": return monto - (monto * 0.2);
            case "C": return monto - (monto * 0.1);
            default: return "Medio de pago inválido";
        }
    }
    else {
        return monto;
    }
}

//Datos de prueba

//Monto final: 210
const monto1 = 300;
const medioPago1 = "E";
const montoFinal1 = calcularPrecioFinal(monto1, medioPago1);
console.log(`Monto: ${monto1} | Pago: ${medioPago1} | Final: ${montoFinal1}`);

//Monto final: 100
const monto2 = 100;
const medioPago2 = "C";
const montoFinal2 = calcularPrecioFinal(monto2, medioPago2);
console.log(`Monto: ${monto2} | Pago: ${medioPago2} | Final: ${montoFinal2}`);

//Monto final: 300
const monto3 = 500;
const medioPago3 = "E";
const montoFinal3 = calcularPrecioFinal(monto3, medioPago3);
console.log(`Monto: ${monto3} | Pago: ${medioPago3} | Final: ${montoFinal3}`);

//Monto final: 160
const monto4 = 200;
const medioPago4 = "D"; 
const montoFinal4 = calcularPrecioFinal(monto4, medioPago4);
console.log(`Monto: ${monto4} | Pago: ${medioPago4} | Final: ${montoFinal4}`);

//Monto final: 360
const monto5 = 400;
const medioPago5 = "C"; 
const montoFinal5 = calcularPrecioFinal(monto5, medioPago5);
console.log(`Monto: ${monto5} | Pago: ${medioPago5} | Final: ${montoFinal5}`);