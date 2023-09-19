import { Router } from 'express'
import { mealPlanController } from '../controllers/mealPlanController.js'
import { getPayloadId } from '../middleware/getPayloadId.js'
export const mealPlanRoutes = () => {
  const mealPlanRouter = Router()

  const {
    createMealPlanForUser,
    getMealPlanForTheUser,
    deleteMealPlan,
    getAllMealPlan,
    adminDeleteMealPlan,
    adminCreateMealPlan
  } = mealPlanController()

  mealPlanRouter
    .route('/mealPlans')
    .post(getPayloadId, createMealPlanForUser)
    .get(getPayloadId, getMealPlanForTheUser)
    .delete(getPayloadId, deleteMealPlan)

  mealPlanRouter.route('/allMealPlans').get(getAllMealPlan)

  mealPlanRouter.route('/mealPlans/:id').delete(adminDeleteMealPlan)

  mealPlanRouter.route('/mealPlans/:userId').post(adminCreateMealPlan)
  return mealPlanRouter
}
