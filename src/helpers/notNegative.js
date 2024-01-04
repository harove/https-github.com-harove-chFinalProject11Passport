export function notNegative(valor, variable) {
    if (valor < 0) throw new Error(`valor de ${variable} no puede ser negativo`);
    return valor;
}
