import jwt from 'jsonwebtoken'

const generateToken = (user) => {
  const token = jwt.sign(
    { name: user.firstName, role: user.role },
    process.env.SECRET_KEY,
    {
      expiresIn: '5m'
    }
  )
  
  const refreshToken = jwt.sign(
    { name: user.firstName, refresh: 'Es un rt !', role: user.role },
    process.env.SECRET_REFRESH_KEY,
    {
      expiresIn: '1h'
    }
  )

  return{
    token,
    refreshToken
  }
}

const getTokenData = (token) => {
  let data = null
  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      console.log('Error al obtener data del token', err)
    } else {
      data = decoded
    }
  })
  return data
}

export { generateToken, getTokenData }