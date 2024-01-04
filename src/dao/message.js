import { Schema, model } from 'mongoose'

const messageSchema = new Schema({
    user: {type: String, required: true},
    message: {type: String, required: true},
}, 
{
    strict: 'throw',
    versionKey: false,
})

export const managerMessage = model('messages', messageSchema)

