import util from 'node:util'
// import { productsManager as manager } from "../dao/productsManager.js"
import { cartsManager as manager } from "../../dao/index.js"


export async function getByIdController(req, res) {
    const {id} = req.params
    try {
        const pojo = await manager.findById(id).populate('products._id').lean()
        res.render('cart.handlebars', {
            payload:pojo.products,
            titulo: 'Cart',
        });
    } catch (error) {
        res.send(error.message)
    }
}


