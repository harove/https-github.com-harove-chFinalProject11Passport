import { Schema, model } from 'mongoose'
import {randomUUID} from 'node:crypto'
import mongoosePaginate from 'mongoose-paginate-v2'


const productsSchema = new Schema({
    // _id: {type: String, default: randomUUID()},
    title: {type: String, required: true},
    description: {type: String, required: true},
    code: {type: String, required: true, unique:true},
    price: {type: Number, required: true},
    status: { type: Boolean, default: true },
    stock: {type: Number, required: true},
    category: {type: String, default: false},
    thumbnails: { type: [String], default: [] },
}, 
{
    strict: 'throw',
    versionKey: false,
})


productsSchema.plugin(mongoosePaginate)

export const manager = model('products', productsSchema)

