import { Router } from 'express';
import { getByIdController } from '../controllers/web/carts.controller.js';


export const cartsWebRouter = Router()

cartsWebRouter.get('/:id', getByIdController)