import prisma from '../database/prisma.js'
import httpStatus from '../helpers/httpsStatus.js'
import bcrypt from 'bcrypt'
export const userController = () => {
  const deleteUser = async (req, res, next) => {
    try {
      const { id } = req.params
      const deletedUser = await prisma.user.delete({
        where: {
          id
        }
      })
      res.status(httpStatus.OK).json({
        success: true,
        message: 'User has been deleted',
        data: deletedUser
      })
    } catch (error) {
      next(error)
    } finally {
      prisma.$disconnect()
    }
  }

  const getUsers = async (_req, res, next) => {
    try {
      const users = await prisma.user.findMany({
        include: {
          ExercisesPlan: {
            include: {
              ExercisesDay: {
                include: {
                  Exercise: true
                }
              }
            }
          }
        }
      })

      return res.status(httpStatus.OK).json({
        success: true,
        data: users
      })
    } catch (error) {
      next(error)
    } finally {
      prisma.$disconnect()
    }
  }

  const getUserById = async (req, res, next) => {
    try {
      const { id } = req.params
      const user = await prisma.user.findUnique({
        where: {
          id
        },
        include: {
          ExercisesPlan: {
            include: {
              ExercisesDay: {
                include: {
                  Exercise: true
                }
              }
            }
          }
        }
      })
      res.status(httpStatus.OK).json({
        success: true,
        data: user
      })
    } catch (error) {
      next(error)
    } finally {
      prisma.$disconnect()
    }
  }

  const updateUser = async (req, res, next) => {
    try {
      const { id } = req.params
      const { firstName, lastName, email, password, phone, address, birthDay } =
        req.body
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password, salt)
      const userUpdated = await prisma.user.update({
        where: {
          id
        },
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
      res.status(httpStatus.OK).json({
        success: true,
        message: 'User has been updated',
        data: userUpdated
      })
    } catch (error) {
      next(error)
    } finally {
      prisma.$disconnect()
    }
  }

  const changePassword = async (req, res, next) => {
    try {
      const { password, newPassword } = req.body
      const id = req.userID
      const salt = await bcrypt.genSalt(10)
      const newHashedPassword = await bcrypt.hash(newPassword, salt)
      const userPass = await prisma.user.findUnique({
        where: {
          id
        }
      })
      const isPasswordValid = await bcrypt.compare(password, userPass.password)

      // Si no existe le envio credenciales invalidas.
      if (!isPasswordValid) {
        return res
          .status(httpStatus.NOT_FOUND)
          .json({ message: ' Invalid credentials ', success: false })
      }
      const userUpdated = await prisma.user.update({
        where: {
          id
        },
        data: {
          password: newHashedPassword
        }
      })
      res.status(httpStatus.OK).json({
        success: true,
        message: 'Password is updating',
        data: userUpdated
      })
    } catch (error) {
      next(error)
    } finally {
      prisma.$disconnect()
    }
  }
  return {
    deleteUser,
    getUsers,
    getUserById,
    updateUser,
    changePassword
  }
}
