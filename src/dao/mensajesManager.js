import fs from 'fs/promises'
import {Mensaje} from './models/Mensaje.js'

class MensajesManager{
    #route
    constructor(route){
        this.#route = route
    }

    async create({usuario, texto}){
        const entity = new Mensaje({timestamp: new Date().toLocaleString(), usuario, texto} )
        console.log({entity})
        const pojos = JSON.parse(await fs.readFile(this.#route,'utf-8'))
        console.log({pojos})
        pojos.push(entity)
        await fs.writeFile(this.#route, JSON.stringify(pojos, null, 2))
        return pojos
    }

    async findAll(){
        const pojos = JSON.parse(await fs.readFile(this.#route,'utf-8'))
        return pojos
    }
}

export const mensajesManager = new MensajesManager('./chat/mensajes.json')