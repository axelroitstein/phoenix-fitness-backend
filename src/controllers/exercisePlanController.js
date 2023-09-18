import httpStatus from '../helpers/httpsStatus.js'
import prisma from '../database/prisma.js'

export const exercisePlanController = () => {
  const createExercisePlan = async (req, res, next) => {
    try {
      console.log('Creating exercisePlan')
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
        succes: true,
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
      const userId = req.userID
      const id = userId
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
        succes: true,
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
      const userId = req.userID
      console.log('user in req.userId', userId)
      const id = userId
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
        succes: true,
        message: 'Exercises plan is eliminated',
        data: ExercisePlanDeleted
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
    getExercisePlanForTheUser
  }
}
