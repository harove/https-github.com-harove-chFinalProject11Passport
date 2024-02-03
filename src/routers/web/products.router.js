import { Router } from 'express'
import { getByIdController, getController } from '../../controllers/web/products.controller.js';
import { soloLogueadosApi } from '../../middlewares/autorizacion.js';

export const productsRouter = Router()

productsRouter.get('/products',soloLogueadosApi, getController);
productsRouter.get('/products/:id', getByIdController);

