import httpStatus from '../helpers/httpsStatus.js'
import prisma from '../database/prisma.js'

export const exerciseDayController = () => {
  const createExerciseDay = async (req, res, next) => {
    try {
      const { day, exercisesPlanId } = req.body
      const ExerciseDayCreated = await prisma.exercisesDay.create({
        data: {
          day,
          exercisesPlanId,
          Exercise: { create: {} }
        },
        include: {
          Exercise: true
        }
      })
      console.log(ExerciseDayCreated)
      console.log(ExerciseDayCreated)
      return res.status(httpStatus.OK).json({
        success: true,
        message: 'Exercises day is created',
        data: ExerciseDayCreated
      })
    } catch (error) {
      console.log(error)
      next(error)
    } finally {
      prisma.$disconnect()
    }
  }

  const deleteExerciseDay = async (req, res, next) => {
    try {
      console.log('Deleting exercise day')
      const { id } = req.params
      console.log('Request id que llego por params', id)
      const exerciseDayDeleted = await prisma.exercisesDay.delete({
        where: {
          id
        }
      })
      return res.status(httpStatus.OK).json({
        success: true,
        message: 'Exercise day is deleted',
        data: exerciseDayDeleted
      })
    } catch (error) {
      next(error)
    } finally {
      prisma.$disconnect()
    }
  }

  const updateExerciseDay = async (req, res, next) => {
    try {
      console.log('Updatign exercise day')
      const { id } = req.params
      const { day } = req.body
      console.log('Request id que llego por params', id)
      const exerciseDayUpdated = await prisma.exercisesDay.update({
        where: {
          id
        },
        data: {
          day
        }
      })
      return res.status(httpStatus.OK).json({
        success: true,
        message: 'Exercise day is updated',
        data: exerciseDayUpdated
      })
    } catch (error) {
      next(error)
    } finally {
      prisma.$disconnect()
    }
  }
  const getExerciseDayById = async (req, res, next) => {
    try {
      console.log('Get ExerciseDay By  id')
      const { id } = req.params
      console.log('Request id que llego por params', id)
      const exerciseDayById = await prisma.exercisesDay.findUnique({
        where: {
          id
        },
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
      })
      return res.status(httpStatus.OK).json({
        success: true,
        message: 'Exercise by id',
        data: exerciseDayById
      })
    } catch (error) {
      next(error)
    } finally {
      prisma.$disconnect()
    }
  }

  return {
    createExerciseDay,
    deleteExerciseDay,
    updateExerciseDay,
    getExerciseDayById
  }
}
