import express from 'express'
import { apiRouter } from './routers/api.router.js'
import handlebars from 'express-handlebars'
import { webRouter } from './routers/web.Router.js'
import {Server} from 'socket.io'
import connectMongo from 'connect-mongo'
// import { productsManager } from './dao/productsManager.js'
import { productsManager, messagesManager } from './dao/index.js'
import session from 'express-session'
import { MONGODB_CNX_STR, SESSION_SECRET } from './config.js'
import { sesiones } from './middlewares/sesiones.js'

// import {  } from './midlewares/midlewares.js'

const store = connectMongo.create({
    mongoUrl: MONGODB_CNX_STR,
    ttl:60
})

const app = express()

//motor de plantillas
app.engine('handlebars', handlebars.engine())
app.set('views', './views')

//middlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(express.static('./public'))
app.use(express.static('./views'))
app.use('/static', express.static('./static'))

const server = app.listen(8080, ()=> {console.log('conectado')})

const webSocketServer = new Server(server)

app.use((req,res,next)=>{
    res['newProduct'] = async()=>{
        // const products = await productsManager.findAll()
        const products = await productsManager.find().lean()
        webSocketServer.emit('newProduct', {products} )
    }
    next()
})

app.use(sesiones)

//Routers
app.use('/api',apiRouter)
app.use('/',webRouter)



app.use((req, res, next) => {
    res.status(404).send('Not Found');
});


webSocketServer.on('connection', async (socket) => {
    console.log({socket:socket.id})
    console.log({user: socket.handshake.auth.username})
    socket.broadcast.emit('nuevoUsuario', socket.handshake.auth.username)

    socket.emit('mensajes', await messagesManager.find().lean())

    socket.on('mensaje', async mensaje => {
        console.log({mensaje, usuario:socket.handshake.auth.username})

    try {
        await messagesManager.create({ 
            user: socket.handshake.auth.username, 
            message: mensaje.mensaje 
        })
    } catch (error) {
        console.error('Error creating message:', error.message);
    }

        webSocketServer.emit('mensajes', await messagesManager.find().lean())
    })


    socket.on('disconnecting', () => {
        socket.broadcast.emit('usuarioDesconectado', socket.handshake.auth.username)
    })
})