import { Router } from 'express'
import { userController } from '../controllers/userController.js'

import { getPayloadId } from '../middleware/getPayloadId.js'
// import { authAdminOrTrainer } from '../middleware/authAdminOrTrainer.js'
export const userRoutes = () => {
  const userRouter = Router()
  const { getUsers, getUserById, deleteUser, updateUser, changePassword } =
    userController()

  // Solo admin podrian
  userRouter.route('/users').get(getUsers)

  userRouter.route('/users/changePassword').put(getPayloadId, changePassword)

  userRouter
    .route('/users/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser)

  return userRouter
}
