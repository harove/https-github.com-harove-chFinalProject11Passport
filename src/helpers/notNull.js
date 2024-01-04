export function notNull(valor, variable) {
    if (!valor) throw new Error(`null value ${variable} = ${valor} `);
    return valor;
}

