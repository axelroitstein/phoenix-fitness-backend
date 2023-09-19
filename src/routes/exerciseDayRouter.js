import { Router } from 'express'
import { exerciseDayController } from '../controllers/exerciseDayController.js'
export const exerciseDayRoutes = () => {
  const exerciseDayRouter = Router()

  const {
    createExerciseDay,
    deleteExerciseDay,
    updateExerciseDay,
    getExerciseDayById
  } = exerciseDayController()
  // Crear, y traer van sin id
  // Eliminar traer con id y updatear con Id
  exerciseDayRouter.route('/exerciseDays').post(createExerciseDay)
  exerciseDayRouter
    .route('/exerciseDays/:id')
    .delete(deleteExerciseDay)
    .put(updateExerciseDay)
    .get(getExerciseDayById)
  return exerciseDayRouter
}
