import Joi from 'joi'
import {
  onlyLettersRegExp,
  passwordRegExp,
  onlyNumbersRegExp,
  lettersNumbersCommasExp
} from '../helpers/regExpressions.js'
export const userSchema = Joi.object({
  firstName: Joi.string().min(2).max(50).pattern(onlyLettersRegExp).required(),
  lastName: Joi.string().min(2).max(50).pattern(onlyLettersRegExp).required(),
  email: Joi.string().email().min(5).max(254).required(),
  password: Joi.string().min(8).max(128).pattern(passwordRegExp).required(),
  phone: Joi.string().min(10).max(10).pattern(onlyNumbersRegExp).required(),
  address: Joi.string()
    .regex(lettersNumbersCommasExp)
    .min(5)
    .max(100)
    .required()
})

export const userParamsSchema = Joi.object({
  id: Joi.string().pattern(onlyNumbersRegExp)
})
