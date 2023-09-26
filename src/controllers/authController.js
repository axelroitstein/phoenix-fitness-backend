import httpStatus from '../helpers/httpsStatus.js'
import prisma from '../database/prisma.js'
import bcrypt from 'bcrypt'

import { generateToken } from '../helpers/token.js'

export const authController = () => {
  // Logeo basico que devuelve token firmado
  const login = async (req, res, next) => {
    try {
      // Obtengo mail,pass de req
      const { email, password } = req.body
      console.log('lO QUE ME LLEGO EN BACKEND', email, password)
      const user = await prisma.user.findUnique({
        where: {
          email
        }
      })

      // Si no existe le envio credenciales invalidas.
      if (!user) {
        return res
          .status(httpStatus.FORBIDDEN)
          .json({ message: ' Invalid credentials ' })
      }

      // Comparo contrasenas
      const isPasswordValid = await bcrypt.compare(password, user.password)

      // Si no existe le envio credenciales invalidas.
      if (!isPasswordValid) {
        return res
          .status(httpStatus.FORBIDDEN)
          .json({ message: ' Invalid credentials ', success: false })
      }
      // Funcion en helpers que genera los tokens pasandole el user.
      const { token, refreshToken } = generateToken(user)
      return res.status(httpStatus.OK).json({
        success: true,
        message: 'login successsful',
        token,
        refreshToken
      })
    } catch (error) {
      next(error)
    } finally {
      prisma.$disconnect()
    }
  }
  // Registro basico que recibe parametros por body
  const register = async (req, res, next) => {
    try {
      console.log('use register')
      const { firstName, lastName, email, password, phone, address, birthDay } =
        req.body
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password, salt)
      const user = await prisma.user.create({
        data: {
          firstName,
          lastName,
          email,
          password: hashedPassword,
          phone,
          address,
          birthDay
        }
      })
      return res.status(httpStatus.CREATED).json({
        success: true,
        message: 'User created',
        data: user
      })
    } catch (error) {
      console.log(error)
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
