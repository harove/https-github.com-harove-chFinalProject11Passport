import { Schema, model } from 'mongoose'


const cartsSchema = new Schema({
    products: [{
        _id: {
            type: Schema.Types.ObjectId,
            ref: 'products', // Reference to the 'products' collection
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
            default: 1,
        },
    }],
}, 
{
    strict: 'throw',
    versionKey: false,
})

cartsSchema.pre('find', function (next) {
    this.populate('products._id')
    next()
})

export const manager = model('carts', cartsSchema)