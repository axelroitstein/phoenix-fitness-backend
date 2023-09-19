import { Router } from 'express'
import { mealDayController } from '../controllers/mealDayController.js'
export const mealDayRoutes = () => {
  const {
    createMealDay,
    deleteMealDay,
    getMealDayById,
    getMealDays,
    updateMealDay
  } = mealDayController()
  const mealDayRouter = Router()

  mealDayRouter.route('/mealDays').post(createMealDay).get(getMealDays)

  mealDayRouter
    .route('/mealDays/:id')
    .delete(deleteMealDay)
    .get(getMealDayById)
    .put(updateMealDay)
  return mealDayRouter
}
