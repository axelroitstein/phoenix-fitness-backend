import jwt from 'jsonwebtoken'
import HTTP_STATUS from '../helpers/httpStatus.js'
export const auth = async (req, res, next) => {
  try {
    const headers = req.headers
    const { authorization } = headers
    const token = authorization.split(' ')[1]
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY)
    const { role } = decodedToken
    const ADMIN_ROLE = 'admin'

    if (role !== ADMIN_ROLE) {
      res.status(HTTP_STATUS.UNAUTHORIZED).json({
        success: false,
        message: 'You are not authorized to acces this resource'
      })
    }
    next()
  } catch (error) {
    next(error)
  }
}

// Middleware que revisa en cada solicitud si su rol es administrador.
