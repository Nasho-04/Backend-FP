import express from 'express'
import { registerUserController, verifyMailValidationTokenController, loginController, forgotPasswordController, resetTokenController} from '../controllers/authController.js'
import { verifyApikeyMiddleware } from '../middlewares/auth.middlewares.js'

const authRouter = express.Router()

authRouter.post('/register', registerUserController)

authRouter.get('/verify/:verification_token', verifyMailValidationTokenController)

authRouter.post('/login', verifyApikeyMiddleware, loginController)
authRouter.post('/forgot-password', forgotPasswordController)
authRouter.put('/reset-password/:reset_token', resetTokenController)


export default authRouter