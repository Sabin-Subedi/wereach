import express from 'express'
import { getAllMessage, sendMessage } from '../controllers/messageController.js'
import { isAdmin } from '../middlewares/adminMiddleware.js'
import { protect } from '../middlewares/authMiddleware.js'



const router = express.Router()

router.route('/').post(sendMessage).get(protect,isAdmin,getAllMessage)


export default router