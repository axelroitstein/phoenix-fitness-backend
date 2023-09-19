import { Router } from 'express'
import { exercisePlanController } from '../controllers/exercisePlanController.js'
import { getPayloadId } from '../middleware/getPayloadId.js'
export const exercisePlanRoutes = () => {
  const exercisePlanRouter = Router()

  const {
    createExercisePlan,
    deleteExercisePlan,
    getExercisePlanForTheUser,
    adminDeleteExercisePlan,
    adminCreateExercisePlan,
    getAllExercisePlan
  } = exercisePlanController()

  exercisePlanRouter
    .route('/exercisePlans')
    .get(getPayloadId, getExercisePlanForTheUser)
    .post(getPayloadId, createExercisePlan)
    .delete(getPayloadId, deleteExercisePlan)

  // Ruta para que administrador o trainer pueda traer todos los planes de ejercicios
  exercisePlanRouter.route('/allExercisePlans').get(getAllExercisePlan)

  // Ruta para que administrador le borre a un usuario su plan de ejercicios
  exercisePlanRouter.route('/exercisePlans/:id').delete(adminDeleteExercisePlan)

  // Ruta para que el administrador le cree a un usuario un plan de ejercicios por las dudas
  exercisePlanRouter
    .route('/exercisePlans/:userId')
    .post(adminCreateExercisePlan)
  return exercisePlanRouter
}
