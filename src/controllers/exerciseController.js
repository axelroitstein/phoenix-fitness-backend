import httpStatus from '../helpers/httpsStatus.js'
import prisma from '../database/prisma.js'

export const exerciseController = () => {
  const createExercise = async (req, res, next) => {
    try {
      console.log('Exercise creating')
      const { exerciseName, exerciseDayId } = req.body
      const exercise = await prisma.exercise.create({
        data: {
          exerciseName,
          exerciseDayId
        }
      })
      res.status(httpStatus.CREATED).json({
        succes: true,
        message: 'Exercise created',
        data: exercise
      })
    } catch (error) {
      next(error)
    } finally {
      prisma.$disconnect()
    }
  }

  const deleteExercise = async (req, res, next) => {
    try {
      const { id } = req.params
      const exerciseDeleted = await prisma.exercise.delete({
        where: {
          id
        }
      })
      res.status(httpStatus.CREATED).json({
        succes: true,
        message: 'Exercise deleted',
        data: exerciseDeleted
      })
    } catch (error) {
      next(error)
    } finally {
      prisma.$disconnect()
    }
  }

  const updateExercise = async (req, res, next) => {
    try {
      const { id } = req.params
      const { exerciseName } = req.body
      const exerciseUpdated = await prisma.exercise.update({
        where: {
          id
        },
        data: {
          exerciseName
        }
      })
      res.status(httpStatus.CREATED).json({
        succes: true,
        message: 'Exercise has updated',
        data: exerciseUpdated
      })
    } catch (error) {
      next(error)
    } finally {
      prisma.$disconnect()
    }
  }

  const getExercises = async (req, res, next) => {
    try {
      const exercises = await prisma.exercise.findMany({})
      res.status(httpStatus.CREATED).json({
        succes: true,
        message: 'Get all exercises',
        data: exercises
      })
    } catch (error) {
      next(error)
    } finally {
      prisma.$disconnect()
    }
  }

  const getExerciseById = async (req, res, next) => {
    try {
      const { id } = req.params
      const exercise = await prisma.exercise.findUnique({
        where: {
          id
        }
      })
      res.status(httpStatus.CREATED).json({
        succes: true,
        message: 'Exercise',
        data: exercise
      })
    } catch (error) {
      next(error)
    } finally {
      prisma.$disconnect()
    }
  }

  return {
    createExercise,
    deleteExercise,
    updateExercise,
    getExercises,
    getExerciseById
  }
}
