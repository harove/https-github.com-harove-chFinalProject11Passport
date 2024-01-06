import { Router } from 'express';
// import { productsManager as manager } from '../dao/productsManager.js';
import { productsManager as manager } from '../../dao/index.js';
import { cartsWebRouter } from './carts.web.router.js';
import { onlyLogueadosWeb } from '../../middlewares/autorizacion.js';
import { sesionesRouter } from './sesiones.router.js';
import { productsRouter } from './products.router.js';

export const webRouter = Router();

webRouter.use(sesionesRouter)
webRouter.use(productsRouter)


webRouter.get('/realtimeproducts', async (req, res) => {
    // const products = await manager.findAll();
    const products = await manager.find().lean()
    res.render('realTimeProducts.handlebars', {
        products,
        titulo: 'Realtime Products'
    });
});

webRouter.get('/chat', (req,res)=>{
    res.render('chat.handlebars', {titulo:'Chat'})
})

webRouter.use('/carts', cartsWebRouter)

webRouter.get('/', (req, res) => {
    res.redirect('/profile')
  })
  
webRouter.get('/register', (req, res) => {
res.render('register.handlebars', { pageTitle: 'Registro' })
})

webRouter.get('/login', (req, res) => {
res.render('login.handlebars', { pageTitle: 'Login' })
})

webRouter.get('/profile', onlyLogueadosWeb, (req, res) => {
  console.log('logeado web profile')
    res.render('profile.handlebars', {
      pageTitle: 'Perfil',
      ...req.user
    })
  })