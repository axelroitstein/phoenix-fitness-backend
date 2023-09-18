import { Router } from 'express'
import { exercisePlanController } from '../controllers/exercisePlanController.js'
import { authUserId } from '../middleware/userAuth.js'
export const exercisePlanRoutes = () => {
  const exercisePlanRouter = Router()

  const { createExercisePlan, deleteExercisePlan, getExercisePlanForTheUser } =
    exercisePlanController()

  exercisePlanRouter
    .route('/exercisePlans/myExercisePlan')
    .get(authUserId, getExercisePlanForTheUser)
  exercisePlanRouter
    .route('/exercisePlans/createPlan')
    .post(authUserId, createExercisePlan)
  exercisePlanRouter
    .route('/exercisePlans/editPlan')
    .delete(authUserId, deleteExercisePlan)

  return exercisePlanRouter
}
