import fs from 'fs/promises'
import { randomUUID } from 'node:crypto'
import { Product } from './models/Product.js'
export let id = 0

export class ProductsManager{
    #path
    constructor(path){
        this.#path = path
    }
    async create(datos){
        const pojos = JSON.parse(await fs.readFile(this.#path,'utf-8'))
        if (pojos.find(pojo => pojo.code === datos.code))
            throw new Error(`Ya existe un producto con el codigo ${datos.code}`)
        datos.id = randomUUID()
        const instance = new Product(datos)
        pojos.push(instance.asPOJO())
        await fs.writeFile(this.#path, JSON.stringify(pojos, null, 2))
        return instance.asPOJO()
    }

    async findAll({limit}={}){
        let pojos = JSON.parse(await fs.readFile(this.#path,'utf-8'))
        if (limit){
            pojos = pojos.slice(0,limit)
        }
        return pojos
    }

    async getById(id){
        const pojos = JSON.parse(await fs.readFile(this.#path,'utf-8'))
        const pojo = pojos.find(product => product.id === id)
        if (pojo) 
            return pojo
        else 
            throw new Error(`no se encuentra pojo con el id: ${id}`)
    }

    async delete(id){
        const products = JSON.parse(await fs.readFile(this.#path,'utf-8'))
        const productIndex = products.findIndex(product => product.id === id)
        products.splice(productIndex,1)
        await fs.writeFile(this.#path, JSON.stringify(products, null, 2))
        return products
    }

    async update(id,fieldsToUpdate){
        const pojos = JSON.parse(await fs.readFile(this.#path,'utf-8'))
        const productIndex = pojos.findIndex(product => product.id === id)
        pojos[productIndex] = {...pojos[productIndex], ...fieldsToUpdate}
        await fs.writeFile(this.#path, JSON.stringify(pojos, null, 2))
        return pojos
    }
}

export const productsManager = new ProductsManager('./db/products.json')

