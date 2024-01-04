import fs from 'fs/promises'
import { randomUUID } from 'node:crypto'
import { Cart } from './models/Cart.js'

export class CartsManager {
    #path
    constructor(path) {
        this.#path = path
    }
    async create(datos) {
        const pojos = JSON.parse(await fs.readFile(this.#path, 'utf-8'))
        datos.id = randomUUID()
        const instance = new Cart(datos)
        pojos.push(instance.asPOJO())
        await fs.writeFile(this.#path, JSON.stringify(pojos, null, 2))
        return instance.asPOJO()
    }

    async listProductsInCart(cartId) {
        const pojosCarts = JSON.parse(await fs.readFile(this.#path, 'utf-8'))
        const pojoCart = pojosCarts.find(pojoCart => {
            return pojoCart.id = cartId
        })
        return pojoCart.products
    }

    async addProductToCart({ cid, pid }) {
        const pojosCarts = JSON.parse(await fs.readFile(this.#path, 'utf-8'))
        const pojoCartIndex = pojosCarts.findIndex(pojoCart => {
            return pojoCart.id = cid
        })
    
        const productIndex = pojosCarts[pojoCartIndex].products.findIndex(obj => {
            return obj.product === pid
        })
        if (productIndex !== -1) {
            pojosCarts[pojoCartIndex].products[productIndex] = { ...pojosCarts[pojoCartIndex].products[productIndex], quantity: pojosCarts[pojoCartIndex].products[productIndex].quantity + 1 }
        } else {
            pojosCarts[pojoCartIndex].products.push({ product:pid, quantity: 1 })
        }
        await fs.writeFile(this.#path, JSON.stringify(pojosCarts, null, 2))
        return { product: pid, quantity: pojosCarts[pojoCartIndex].products[productIndex].quantity }
    }





    //*****  funciones adicionales para la adminstracion de los carts */


    async findAll({ limit } = {}) {
        let pojos = JSON.parse(await fs.readFile(this.#path, 'utf-8'))
        if (limit) {
            pojos = pojos.slice(0, limit)
        }
        return pojos
    }

    async getById(id) {
        const pojos = JSON.parse(await fs.readFile(this.#path, 'utf-8'))
        const pojo = pojos.find(product => product.id === id)
        if (pojo)
            return pojo
        else
            throw new Error(`no se encuentra pojo con el id: ${id}`)
    }

    async delete(id) {
        const products = JSON.parse(await fs.readFile(this.#path, 'utf-8'))
        const productIndex = products.findIndex(product => product.id === id)
        products.splice(productIndex, 1)
        await fs.writeFile(this.#path, JSON.stringify(products, null, 2))
        return products
    }

    async update(id, fieldsToUpdate) {
        const pojos = JSON.parse(await fs.readFile(this.#path, 'utf-8'))
        const productIndex = pojos.findIndex(product => product.id === id)
        pojos[productIndex] = { ...pojos[productIndex], ...fieldsToUpdate }
        await fs.writeFile(this.#path, JSON.stringify(pojos, null, 2))
        return pojos
    }


}

export const cartsManager = new CartsManager('./db/carts.json')

