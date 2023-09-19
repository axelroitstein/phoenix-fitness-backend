// Dependencies
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { expressjwt as jwt } from 'express-jwt'
// Helpers
import errorHandler from './src/middleware/errorHandler.js'

// Routes
import { authRoutes } from './src/routes/authRouter.js'
import { exercisePlanRoutes } from './src/routes/exercisePlanRouter.js'
import { exerciseDayRoutes } from './src/routes/exerciseDayRouter.js'
import { userRoutes } from './src/routes/userRouter.js'
dotenv.config()
const PORT = process.env.PORT || 3000

const app = express()
// Middleware que permite el uso de json
app.use(express.json())
// Middleware que permite de donde se pueden mandar las solicitudes
app.use(
  cors({
    origin: '*'
  })
)
// Middleware que pide el jwt en todas las rutas
app.use(
  jwt({
    secret: process.env.SECRET_KEY,
    algorithms: ['HS256']
  }).unless({
    path: ['/api/auth/register', '/api/auth/login', '/api/auth/refresh']
  })
)
app.use(
  '/api',
  authRoutes(),
  exercisePlanRoutes(),
  exerciseDayRoutes(),
  userRoutes()
)
// Middleware de error handler
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Listening in port ${PORT}`)
})
