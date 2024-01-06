import mongoose from "mongoose"
import { randomUUID } from "node:crypto"
import { hasheadasSonIguales } from '../utils/criptografia.js'

const collection = 'usuarios'

const schema = new mongoose.Schema({
  _id: { type: String, default: randomUUID },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  nombre: { type: String, required: true },
  apellido: { type: String, required: false }, // En github puede no venir
}, {
  strict: 'throw',
  versionKey: false,
  statics: {
    login: async function (email, password) {
      let datosUsuario

      if (email === 'adminCoder@coder.com' && password === 'adminCod3r123') {
        datosUsuario = {
          email: 'admin',
          nombre: 'admin',
          apellido: 'admin',
          rol: 'admin'
        }
      } else {
        const usuario = await mongoose.model(collection).findOne({ email }).lean()

        if (!usuario) {
          throw new Error('login failed')
        }

        if (!hasheadasSonIguales(password, usuario['password'])) {
          throw new Error('login failed because hashed are not equals')
        }

        datosUsuario = {
          email: usuario['email'],
          nombre: usuario['nombre'],
          apellido: usuario['apellido'],
          rol: 'usuario'
        }
      }
      return datosUsuario
    }
  }
})

//Con esto eliminamos el password para que no se vea
//cuando se hace toObject
schema.options.toObject ={
  transform: function (doc, ret){
    delete ret.password
  }
}

export const manager = mongoose.model(collection, schema)