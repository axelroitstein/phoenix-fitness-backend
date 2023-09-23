import jwt from 'jsonwebtoken'
import HTTP_STATUS from '../helpers/httpsStatus.js'
export const authAdminOrTrainer = async (req, res, next) => {
  try {
    const headers = req.headers
    const { authorization } = headers
    const token = authorization.split(' ')[1]
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY)
    console.log(process.env.SECRET_KEY)
    const { role } = decodedToken
    const ADMIN_ROLE = 'admin'
    const TRAINER_ROLE = 'trainer'
    console.log('ROL DEL TOKEN ES:', role)
    console.log('STRING DEL ADMIN ROLE', ADMIN_ROLE)
    const trueornot = ADMIN_ROLE === role
    console.log('ES VERDADERO O FALSO QUE DA', trueornot)
    if (role !== ADMIN_ROLE && role !== TRAINER_ROLE) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({
        success: false,
        message: 'You are not authorized to access this resource'
      })
    }
    next()
  } catch (error) {
    next(error)
  }
}

// Middleware que revisa en cada solicitud si su rol es administrador.
