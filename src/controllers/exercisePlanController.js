import httpStatus from '../helpers/httpsStatus.js'
import prisma from '../database/prisma.js'

export const exercisePlanController = () => {
  const createExercisePlan = async (req, res, next) => {
    try {
      // Metodo que usa el id del usuario del middleware, y crea un plan de ejercicio para el usuario
      const userId = req.userID
      const exercisePlan = await prisma.exercisesPlan.create({
        data: {
          userId,
          ExercisesDay: {
            create: {
              Exercise: { create: {} }
            }
          }
        }
      })
      res.status(httpStatus.CREATED).json({
        success: true,
        message: 'Exercise Plan is created',
        data: exercisePlan
      })
    } catch (error) {
      next(error)
    } finally {
      prisma.$disconnect()
    }
  }

  const getExercisePlanForTheUser = async (req, res, next) => {
    try {
      console.log('Execute exercisePlan for the user')
      const id = req.userID
      // Utilizando el id sacado del middleware busca ese usuario y trae su informacion completa para usar en el gym
      const user = await prisma.user.findUnique({
        where: {
          id
        },
        select: {
          firstName: true,
          ExercisesPlan: {
            select: {
              id: true,
              ExercisesDay: {
                select: {
                  id: true,
                  day: true,
                  Exercise: {
                    select: {
                      id: true,
                      exerciseName: true
                    }
                  }
                }
              }
            }
          }
        }
      })
      res.status(httpStatus.OK).json({
        success: true,
        message: 'Exercise plan for the user',
        data: user
      })
    } catch (error) {
      next(error)
    } finally {
      prisma.$disconnect()
    }
  }

  const deleteExercisePlan = async (req, res, next) => {
    try {
      // Metodo que buscando el id del middleware borra su plan de ejercicios
      const id = req.userID
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
      const ExercisePlanID = user.ExercisesPlan.id
      const ExercisePlanDeleted = await prisma.exercisesPlan.delete({
        where: {
          id: ExercisePlanID
        }
      })
      res.status(httpStatus.OK).json({
        success: true,
        message: 'Exercises plan is eliminated',
        data: ExercisePlanDeleted
      })
    } catch (error) {
      next(error)
    } finally {
      prisma.$disconnect()
    }
  }

  const adminCreateExercisePlan = async (req, res, next) => {
    try {
      // Metodo que usa el req params, para crearle a un usuario el plan de ejercicios
      const { userId } = req.params
      const exercisePlan = await prisma.exercisesPlan.create({
        data: {
          userId,
          ExercisesDay: {
            create: {
              Exercise: { create: {} }
            }
          }
        }
      })
      res.status(httpStatus.CREATED).json({
        success: true,
        message: 'Exercise plan created, for admin',
        data: exercisePlan
      })
    } catch (error) {
      next(error)
    } finally {
      prisma.$disconnect()
    }
  }
  const adminDeleteExercisePlan = async (req, res, next) => {
    try {
      // Metodo que usa el  req params, para borrar el plan de ejercicios, este solo disponible para administradores
      const { id } = req.params
      const ExercisePlanDeleted = await prisma.exercisesPlan.delete({
        where: {
          id
        }
      })
      res.status(httpStatus.OK).json({
        success: true,
        message: 'Exercises plan is eliminated',
        data: ExercisePlanDeleted
      })
    } catch (error) {
      next(error)
    } finally {
      prisma.$disconnect()
    }
  }

  const getAllExercisePlan = async (req, res, next) => {
    try {
      // Metodo que usa el  req params, para borrar el plan de ejercicios, este solo disponible para administradores
      const ExercisesPlans = await prisma.exercisesPlan.findMany({})
      res.status(httpStatus.OK).json({
        success: true,
        message: 'All exercises plans from users',
        data: ExercisesPlans
      })
    } catch (error) {
      next(error)
    } finally {
      prisma.$disconnect()
    }
  }

  return {
    createExercisePlan,
    deleteExercisePlan,
    getExercisePlanForTheUser,
    adminDeleteExercisePlan,
    adminCreateExercisePlan,
    getAllExercisePlan
  }
}
