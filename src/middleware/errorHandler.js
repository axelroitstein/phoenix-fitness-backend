import httpStatus from '../helpers/httpsStatus.js'
import { Prisma } from '@prisma/client'
const ERROR_HANDLERS = {
  ValidationError: (res, err) => {
    res.status(httpStatus.UNPROCESSABLE_CONTENT).json({
      successs: false,
      message: 'Validation error on request',
      error: err.message
    })
  },
  P2002: (res, err) => {
    res.status(httpStatus.BAD_REQUEST).json({
      successs: false,
      message: 'Intentaste crear un campo unico ya existente',
      error: err.message
    })
  },
  defaultError: (res, err) => {
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ successs: false, message: err.message })
  }
}

const errorHandler = (err, _, res, next) => {
  let option = err.name
  if (err.isJoi) {
    option = 'ValidationError'
  }
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    option = 'P2002'
  }
  const handler = ERROR_HANDLERS[option] ?? ERROR_HANDLERS.defaultError
  handler(res, err)
}

export default errorHandler
