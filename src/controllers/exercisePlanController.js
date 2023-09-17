import httpStatus from '../helpers/httpsStatus.js'
import prisma from '../database/prisma.js'

export const exercisePlanController = () => {
  const createExercisePlan = (req, res, next) => {
    try {
      console.log('creating exercise plan')
      console.log('me llego este')
      const userId = req.userID
      console.log(userId)
      res.status(httpStatus.CREATED).json({ message: 'hola' })
    } catch (error) {
      next(error)
    } finally {
      prisma.$disconnect()
    }
  }

  const editExercisePlan = (req, res, next) => {
    try {
      const userId = req.userId
      console.log(userId)
      res.status(httpStatus.CREATED)
    } catch (error) {
      next(error)
    } finally {
      prisma.$disconnect()
    }
  }

  return {
    createExercisePlan,
    editExercisePlan
  }
}
