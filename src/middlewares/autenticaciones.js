import passport from 'passport'
import {Strategy as LocalStrategy} from 'passport-local'
import { usuariosManager } from '../dao/index.js'

async function verificationCallback(username, password, done) {
try {
    const datosUsuario = await usuariosManager.login(username, password)
    done(null, datosUsuario )
} catch (error) {
    done(error)
}
}

const loginLocal = new LocalStrategy({usernameField: 'email'}, verificationCallback)

passport.use('loginLocal', loginLocal)

passport.serializeUser((user,next)=>{next(null,user)})
passport.deserializeUser((user,next)=>{next(null,user)})

export const passportInitialize = passport.initialize()
export const passportSession = passport.session()

