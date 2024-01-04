import { Router } from 'express';
import { getController, postController, getByIdController, updateController, deleteController, addProductToCartController, deleteProductFromCartController, updateQuantityOfProductFromCartController, deleteAllProductsFromCartController } from '../controllers/rest/carts.controller.js';
export const cartsRouter = Router()
cartsRouter.get('/:id', getByIdController)
cartsRouter.get('/', getController)
cartsRouter.post('/:cid/products/:pid', addProductToCartController)
cartsRouter.delete('/:cid/products/:pid', deleteProductFromCartController)
cartsRouter.put('/:cid/products/:pid', updateQuantityOfProductFromCartController)
cartsRouter.delete('/:cid/products', deleteAllProductsFromCartController)
cartsRouter.post('/', postController)
cartsRouter.put('/:id', updateController)
cartsRouter.delete('/:id', deleteController)