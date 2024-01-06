import { Router } from 'express'
import { soloLogueadosApi } from '../../middlewares/autorizacion.js'
import passport from 'passport'

export const sesionesRouter = Router()

sesionesRouter.post('/',
  passport.authenticate('loginLocal', {
    failWithError: true
  }),
  async (req, res, next) => {
    res.status(201).json({ status: 'success', message: 'login success' })
  },
  (error, req, res, next) => {
    res.status(401).json({ status: 'error', message: error.message })
  }
)

sesionesRouter.get('/current', soloLogueadosApi, (req, res) => {
  res.json(req.user)
})

sesionesRouter.delete('/current', async (req, res) => {
  req.session.destroy(err => {
    res.status(204).json({ status: 'success' })
  })
})