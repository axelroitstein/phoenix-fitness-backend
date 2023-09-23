import prisma from '../database/prisma.js'
import httpStatus from '../helpers/httpsStatus.js'
import MealPlan from '../models/mealPlan.js'
export const mealPlanController = () => {
  const createMealPlanForUser = async (req, res, next) => {
    try {
      // Metodo que usa el id del usuario del middleware, y crea un plan de dietas para el usuario
      const userId = req.userID
      const mealPlan = await MealPlan.create(prisma, userId)
      return res.status(httpStatus.CREATED).json({
        success: true,
        message: 'Meal Plan is created',
        data: mealPlan
      })
    } catch (error) {
      next(error)
    } finally {
      prisma.$disconnect()
    }
  }

  const getMealPlanForTheUser = async (req, res, next) => {
    try {
      const id = req.userID
      // Utilizando el id sacado del middleware busca ese usuario y trae su informacion completa para usar en el gym
      const user = await MealPlan.find(prisma, id)
      if (!user?.MealPlan) {
        console.log('No tiene meal plan')
        await MealPlan.create(prisma, id)
        const mealPlan = await MealPlan.find(prisma, id)
        return res.status(httpStatus.OK).json({
          success: true,
          message: 'Meal plan for the user',
          data: mealPlan
        })
      }
      return res.status(httpStatus.OK).json({
        success: true,
        message: 'Meal plan for the user',
        data: user
      })
    } catch (error) {
      next(error)
    } finally {
      prisma.$disconnect()
    }
  }

  const deleteMealPlan = async (req, res, next) => {
    try {
      // Metodo que buscando el id del middleware borra su plan de dietas
      const id = req.userID
      const user = await prisma.user.findUnique({
        where: {
          id
        },
        include: {
          MealPlan: {
            include: {
              mealDay: true
            }
          }
        }
      })
      const MealPlanID = user.MealPlan.id
      const MealPlanDeleted = await prisma.mealPlan.delete({
        where: {
          id: MealPlanID
        }
      })
      return res.status(httpStatus.OK).json({
        success: true,
        message: 'Meal plan is eliminated',
        data: MealPlanDeleted
      })
    } catch (error) {
      next(error)
    } finally {
      prisma.$disconnect()
    }
  }

  const adminCreateMealPlan = async (req, res, next) => {
    try {
      // Metodo que usa el req params, para crearle a un usuario el plan de dietas
      const { userId } = req.params
      const mealPlan = await prisma.mealPlan.create({
        data: {
          userId,
          mealDay: {
            create: {}
          }
        }
      })
      return res.status(httpStatus.CREATED).json({
        success: true,
        message: 'Meal plan created, for admin',
        data: mealPlan
      })
    } catch (error) {
      next(error)
    } finally {
      prisma.$disconnect()
    }
  }

  const adminDeleteMealPlan = async (req, res, next) => {
    try {
      // Metodo que usa el  req params, para borrar el plan de ejercicios, este solo disponible para administradores
      const { id } = req.params
      const MealPlanDeleted = await prisma.mealPlan.delete({
        where: {
          id
        }
      })
      return res.status(httpStatus.OK).json({
        success: true,
        message: 'Meal plan is eliminated',
        data: MealPlanDeleted
      })
    } catch (error) {
      next(error)
    } finally {
      prisma.$disconnect()
    }
  }

  const getAllMealPlan = async (req, res, next) => {
    try {
      // Metodo que usa traer todos los planes de dieta, este solo disponible para administradores
      const MealPlans = await prisma.mealPlan.findMany({})
      return res.status(httpStatus.OK).json({
        success: true,
        message: 'All exercises plans from users',
        data: MealPlans
      })
    } catch (error) {
      next(error)
    } finally {
      prisma.$disconnect()
    }
  }

  return {
    createMealPlanForUser,
    getMealPlanForTheUser,
    deleteMealPlan,
    adminCreateMealPlan,
    adminDeleteMealPlan,
    getAllMealPlan
  }
}
