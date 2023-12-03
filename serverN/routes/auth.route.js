import express from 'express'
import AuthController  from '../controller/auth.controller.js'

const authRoutes = express.Router()

authRoutes.get('/', AuthController.verifyToken)
authRoutes.post('/signin', AuthController.login)
authRoutes.post('/signup', AuthController.userRegister)
// usersRoutes.post("/", UsersController.save)
// usersRoutes.put("/", UsersController.update)
// usersRoutes.delete("/:id", UsersController.delete)
export  default authRoutes