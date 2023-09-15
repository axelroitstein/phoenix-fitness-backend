import httpStatus from '../helpers/httpsStatus.js'
import prisma from '../database/prisma.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { generateToken } from '../helpers/token.js'

// import jwt from 'jsonwebtoken'

export const authController = () => {
  const login = async (req, res, next) => {
    try {
      //Obtengo mail,pass de req
      const {email,password} = req.body
      const user = await prisma.user.findUnique({
        where:{
          email
        }
      })

      //Si no existe le envio credenciales invalidas.
      if (!user) {
        return res
          .status(httpStatus.NOT_FOUND)
          .json({ message: ' Invalid credentials ' })
      }

      //Comparo contrasenas
      const isPasswordValid = await bcrypt.compare(password, user.password)
      
      //Si no existe le envio credenciales invalidas.
      if (!isPasswordValid) {
        return res
          .status(httpStatus.NOT_FOUND)
          .json({ message: ' Invalid credentials ', succes: true })
      }
      //Funcion en helpers que genera los tokens pasandole el user.
      const {token,refreshToken} = generateToken(user)
      res.status(httpStatus.OK).json({
        succes: true,
        message: 'login successful',
        token,
        refreshToken
      })

    } catch (error) {
      next(error)
    } finally {
      prisma.$disconnect()
    }
  }

  const register = async (req, res, next) => {
    try {
      const {
        firstName,
        lastName,
        email,
        password,
        phone,
        address,
        gender,
        birthDay
      } = req.body
       const salt = await bcrypt.genSalt(10)
       const hashedPassword = await bcrypt.hash(password, salt)
      const user = await prisma.user.create({
        data:{
            firstName,
            lastName,
            email,
            password:hashedPassword,
            phone,
            address,
            gender,
            birthDay
        }
      })
      res.status(httpStatus.CREATED).json({
        succes:true,
        message:'User created',
        data:user
      })
    } catch (error) {
      next(error)
    } finally {
      prisma.$disconnect()
    }
  }

  return {
    login,
    register
  }
}
