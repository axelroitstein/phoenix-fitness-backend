import { Router } from 'express'
import { exercisePlanController } from '../controllers/exercisePlanController.js'
import { authUserId } from '../middleware/userAuth.js'
export const exercisePlanRoutes = () => {
  const exercisePlanRouter = Router()

  const { createExercisePlan, editExercisePlan } = exercisePlanController()

  exercisePlanRouter
    .route('/exercisePlans/createPlan')
    .post(authUserId, createExercisePlan)
  exercisePlanRouter
    .route('exercisePlans/editPlan')
    .post(authUserId, editExercisePlan)

  return exercisePlanRouter
}
