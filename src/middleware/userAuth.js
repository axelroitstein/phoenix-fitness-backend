import jwt from 'jsonwebtoken'
export const authUserId = async (req, res, next) => {
  try {
    console.log('authuser execute')
    const headers = req.headers
    const { authorization } = headers
    const token = authorization.split(' ')[1]
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY)
    const { userID } = decodedToken
    req.userID = userID
    console.log(userID)
    next()
  } catch (error) {
    next(error)
  }
}

// Middleware que recoge del token el userId para ser usado en todo lo que le concierne.
