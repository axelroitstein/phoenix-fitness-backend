import { Router } from 'express'
import { authController } from '../controllers/authController.js'


export const authRoutes = () => {
  const authRouter = Router()

  const { register, login } = authController()

  authRouter.route('/auth/register').post(register)
  authRouter.route('/auth/login').post(login)

  return authRouter
}
