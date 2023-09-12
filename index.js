//Dependencies
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { expressjwt as jwt } from 'express-jwt'

//Helpers
// import errorHandler from '../middlewares/errorHandler.js'

//Routes

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

// app.use('/api')
// app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Listening in port ${PORT}`)
})
