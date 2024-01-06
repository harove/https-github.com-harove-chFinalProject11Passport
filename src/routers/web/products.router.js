import { Router } from 'express'
import { getByIdController, getController } from '../../controllers/web/products.controller.js';

export const productsRouter = Router()

productsRouter.get('/products', getController);
productsRouter.get('/products/:id', getByIdController);

