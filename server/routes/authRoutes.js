import express from 'express'
import { deleteUser, getAllUsers, getUserData, loginUser, registerUser, resendCode, verifyEmail } from '../controllers/authControllers.js'
import { isAdmin } from '../middlewares/adminMiddleware.js'
import { protect } from '../middlewares/authMiddleware.js'


const router = express.Router()

router.route('/login').post(loginUser)
router.route('/register').post(registerUser)
router.post('/user',getUserData)
router.delete('/user/:id',protect,isAdmin,deleteUser)
router.get('/users',protect,isAdmin,getAllUsers)
router.post('/verify',protect,verifyEmail)
router.get('/resend',protect,resendCode)

export default router