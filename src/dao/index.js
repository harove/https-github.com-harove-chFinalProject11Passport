import mongoose from "mongoose";
import { MONGODB_CNX_STR } from "../config.js";


try {
    await mongoose.connect(MONGODB_CNX_STR)
    console.log('Connected to MongoDB!');
} catch (error) {
    console.error('error connecting to mongo', error.message)
}


export {manager as productsManager} from './product.js'
export {manager as cartsManager} from './carts.js'
export {managerMessage as messagesManager} from './message.js'
export {manager as usuariosManager} from './Usuario.js'