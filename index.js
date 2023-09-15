//Dependencies
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { expressjwt as jwt } from 'express-jwt'
//Helpers
import errorHandler from './src/middleware/errorHandler.js'
//Routes
import { authRoutes } from './src/routes/authRouter.js'

dotenv.config()
const PORT = process.env.PORT || 3000

const app = express()

app.use(express.json())
app.use(
  cors({
    origin: '*'
  })
)
app.use(
  jwt({
    secret: process.env.SECRET_KEY,
    algorithms: ['HS256']
  }).unless({
    path: ['/api/auth/register', '/api/auth/login', '/api/auth/refresh']
  })
)

app.use('/api',
 authRoutes()
 )
 //Middleware de error handler 
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Listening in port ${PORT}`)
})
