import passport from 'passport'
import {Strategy as LocalStrategy} from 'passport-local'
import {Strategy as GithubStrategy} from 'passport-github2'
import { usuariosManager } from '../dao/index.js'
import { GITHUB_CALLBACK_URL, GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from '../config.js'

async function verificationCallback(username, password, done) {
try {
    const datosUsuario = await usuariosManager.login(username, password)
    done(null, datosUsuario )
} catch (error) {
    done(error)
}
}
//Cuando nos logueamos con github
//- si es la primera vez, le creamos una cuenta
//- si ya existe, lo retornamos..
async function verificationCallbackGithub(_,__,profile, done){
    let user = await usuariosManager.findOne({email: profile._json.email})
    if(!user){
        let newUser = {
          nombre: profile._json.name,
          apellido: '',
          email: profile._json.email,
          password: profile._json.node_id
        }
        let result = await usuariosManager.create(newUser)
        done(null, result)
    }else{
        done(null,user)
    }    
}


passport.use('loginLocal', new LocalStrategy({usernameField: 'email'}, verificationCallback))

passport.use('loginGithub', new GithubStrategy({
    clientID:GITHUB_CLIENT_ID, 
    clientSecret:GITHUB_CLIENT_SECRET,
    callbackURL: GITHUB_CALLBACK_URL
}, verificationCallbackGithub))




passport.serializeUser((user,next)=>{next(null,user)})
passport.deserializeUser((user,next)=>{next(null,user)})

export const passportInitialize = passport.initialize()
export const passportSession = passport.session()

