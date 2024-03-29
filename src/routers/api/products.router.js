import { Router } from 'express';
import { getController, postController, getByIdController, updateController, deleteController } from '../../controllers/rest/products.controller.js';
import { soloLogueadosApi } from '../../middlewares/autorizacion.js';


export const productsRouter = Router()
productsRouter.get('/:id', getByIdController)
productsRouter.get('',soloLogueadosApi, getController)
productsRouter.post('', postController)
productsRouter.put('/:id', updateController)
productsRouter.delete('/:id', deleteController)
productsRouter.post('/:id/actualizaciones', updateController)