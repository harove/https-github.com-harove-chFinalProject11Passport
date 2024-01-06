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

async function verificationCallbackGithub(_,__,profile, done){
    done(null,profile)
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

