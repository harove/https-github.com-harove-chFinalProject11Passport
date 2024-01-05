import { Router } from 'express';
// import { productsManager as manager } from '../dao/productsManager.js';
import { productsManager as manager } from '../dao/index.js';
import { getByIdController, getController } from '../controllers/web/products.controller.js';
import { cartsWebRouter } from './carts.web.router.js';
import { onlyLogueadosWeb } from '../middlewares/autorizacion.js';

export const webRouter = Router();
webRouter.get('/products', getController);
webRouter.get('/products/:id', getByIdController);

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
    res.render('profile.handlebars', {
      pageTitle: 'Perfil',
      ...req.user
    })
  })