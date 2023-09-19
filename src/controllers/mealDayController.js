import httpStatus from '../helpers/httpsStatus.js'
import prisma from '../database/prisma.js'

export const mealDayController = () => {
  const createMealDay = async (req, res, next) => {
    try {
      console.log('Exuciting create mealDay')
      const { day, mealPlanId } = req.body
      const mealDay = await prisma.mealDay.create({
        data: {
          day,
          mealPlanId
        }
      })
      res.status(httpStatus.CREATED).json({
        succes: true,
        message: 'Meal Day created',
        data: mealDay
      })
    } catch (error) {
      next(error)
    } finally {
      prisma.$disconnect()
    }
  }

  const deleteMealDay = async (req, res, next) => {
    try {
      const { id } = req.params
      const mealDayDeleted = await prisma.mealDay.delete({
        where: {
          id
        }
      })
      res.status(httpStatus.OK).json({
        succes: true,
        message: 'meal day deleted',
        data: mealDayDeleted
      })
    } catch (error) {
      next(error)
    } finally {
      prisma.$disconnect()
    }
  }

  const updateMealDay = async (req, res, next) => {
    try {
      const { id } = req.params
      const { day, breakfast, brunch, lunch, snack, drunch, dinner } = req.body
      const mealDayUpdated = await prisma.mealDay.update({
        where: {
          id
        },
        data: {
          day,
          breakfast,
          brunch,
          lunch,
          snack,
          drunch,
          dinner
        }
      })
      res.status(httpStatus.OK).json({
        succes: true,
        message: 'Exercise has updated',
        data: mealDayUpdated
      })
    } catch (error) {
      next(error)
    } finally {
      prisma.$disconnect()
    }
  }

  const getMealDays = async (req, res, next) => {
    try {
      const mealDays = await prisma.mealDay.findMany({})
      res.status(httpStatus.OK).json({
        succes: true,
        message: 'Get all exercises',
        data: mealDays
      })
    } catch (error) {
      next(error)
    } finally {
      prisma.$disconnect()
    }
  }

  const getMealDayById = async (req, res, next) => {
    try {
      const { id } = req.params
      const mealDay = await prisma.mealDay.findUnique({
        where: {
          id
        }
      })
      res.status(httpStatus.OK).json({
        succes: true,
        message: 'Meal Day',
        data: mealDay
      })
    } catch (error) {
      next(error)
    } finally {
      prisma.$disconnect()
    }
  }

  return {
    createMealDay,
    deleteMealDay,
    updateMealDay,
    getMealDayById,
    getMealDays
  }
}
