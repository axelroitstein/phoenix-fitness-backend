import { Router } from 'express'
import { exerciseController } from '../controllers/exerciseController.js'
export const exerciseRoutes = () => {
  const {
    createExercise,
    deleteExercise,
    getExerciseById,
    updateExercise,
    getExercises
  } = exerciseController()
  const exerciseRouter = Router()

  exerciseRouter.route('/exercises').get(getExercises).post(createExercise)

  exerciseRouter
    .route('/exercises/:id')
    .get(getExerciseById)
    .delete(deleteExercise)
    .put(updateExercise)
  return exerciseRouter
}
