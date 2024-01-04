// import { cartsManager as manager } from "../dao/cartsManager.js"
import { cartsManager as manager } from "../../dao/index.js"
import mongoose from 'mongoose';
import util from 'node:util'

//creating cart
export async function postController(req, res) {
    const pojo = req.body
    try {
        const document = await manager.create(pojo)
        // const pojos = await manager.findAll()
        const pojos = await manager.find().lean()
        pojos.push(pojo)
        res.json(document.toObject())
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

//listing products in cart x
export async function getByIdController(req, res) {
    const id = req.params.id
    try {
        // const pojo = await manager.listProductsInCart(id)
        const pojo = await manager.find({_id: id})
        // res.json(pojo)
        res.json(pojo)
    } catch (error) {
        res.status(404).json({
            mensaje: error.message
        })
    }
}

//add product to cart
export async function addProductToCartController(req, res) {
    const cid = req.params.cid
    const pid = req.params.pid
    try {
        // const pojo = await manager.addProductToCart({cid,pid})
        const cart = await manager.findById(cid)
        const pidIndex = cart.products.findIndex(product=> new mongoose.Types.ObjectId(product._id).equals(pid))
        if (pidIndex === -1){
            cart.products.push({_id:pid, quantity:1})
        }else{
            cart.products[pidIndex].quantity += 1;
        }
        await cart.save()
        res.json(cart)
    } catch (error) {
        res.status(400).json({
            mensaje: error.message
        })
    }
}

//uptade the quantity of a product in the cart
export async function updateQuantityOfProductFromCartController(req, res) {
    const cid = req.params.cid
    const pid = req.params.pid
    const {quantity} = req.body
    try {
        // const pojo = await manager.addProductToCart({cid,pid})
        const cart = await manager.findById(cid)
        const pidIndex = cart.products.findIndex(product=>product.id === pid)
        if (pidIndex === -1){
            throw new Error('Product not found')
        }else{
            cart.products[pidIndex] = {...cart.products[pidIndex], quantity}
        }
        await cart.save()
        res.json(cart)
    } catch (error) {
        res.status(404).json({
            mensaje: error.message
        })
    }
}

//delete all the products in the cart
export async function deleteAllProductsFromCartController(req, res) {
    const cid = req.params.cid
    try {
        // const pojo = await manager.addProductToCart({cid,pid})
        const cart = await manager.findById(cid)
        if (cart === null){
            throw new Error('Cart not found')
        }else{
            cart.products = []
            await cart.save()
            res.json(cart)
        }
    } catch (error) {
        res.status(404).json({
            mensaje: error.message
        })
    }
}



//delete product from cart
export async function deleteProductFromCartController(req, res) {
    const cid = req.params.cid
    const pid = req.params.pid
    try {
        const cart = await manager.findById(cid)
        const productIndex = cart.products.findIndex(product=>product.id===pid)
        if(productIndex !== -1){
            cart.products.splice(productIndex, 1);
        }else{
            throw new Error('Producto no encontrado')
        }        
        await cart.save()
        res.json(cart)
    } catch (error) {
        res.status(404).json({
            mensaje: error.message
        })
    }
}




//additional to the challenge. 

//listing carts

export async function getController(req, res) {
    const {limit} = req.query
    // const pojos = await manager.findAll({limit})
    const pojos = await manager.find().limit(limit)
    res.json(pojos)
}

export async function updateController(req, res) {
    const id = req.params.id
    const fields = req.body
    try {
        const pojos = await manager.updatePojo(id,fields)
        res.json(pojos)
    } catch (error) {
        res.status(404).json({
            mensaje: error.message
        })
    }
}

export async function deleteController(req, res) {
    const id = req.params.id
    try {
        // const pojos = await manager.delete(id)
        const pojo = await manager.findByIdAndDelete(id)
        res.json(pojo)
    } catch (error) {
        res.status(404).json({
            mensaje: error.message
        })
    }
}