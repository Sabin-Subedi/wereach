import express from 'express'
import { getUserData, loginUser, registerUser } from '../controllers/authControllers.js'


const router = express.Router()

router.route('/login').post(loginUser)
router.route('/register').post(registerUser)
router.post('/user',getUserData)

export default router