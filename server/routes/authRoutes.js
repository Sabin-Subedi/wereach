import express from 'express'
import { getUserData, loginUser, registerUser, resendCode, verifyEmail } from '../controllers/authControllers.js'
import { protect } from '../middlewares/authMiddleware.js'


const router = express.Router()

router.route('/login').post(loginUser)
router.route('/register').post(registerUser)
router.post('/user',getUserData)
router.post('/verify',protect,verifyEmail)
router.get('/resend',protect,resendCode)

export default router