import express from "express"
import * as authController from "../controllers/auth.controller.js"
import { loginSchema, registerSchema, validate } from "../validations/validator.js"
// import {login, register, getMe} from "../controllers/auth.controller.js"
import tryCatch from "../utills/try-catch.util.js"

const authRoute = express.Router()

authRoute.post('/login', validate(loginSchema), tryCatch(authController.login))
authRoute.post('/register',validate(registerSchema), authController.registerYup)
authRoute.get('/me', authController.getMe)


export default authRoute