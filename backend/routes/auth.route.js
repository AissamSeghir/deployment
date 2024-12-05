import express from 'express'
import { getMe, login, logout } from '../controllers/auth.controller.js'
import { authMiddleware } from '../middelwares/authMiddleware.js'

const router = express.Router()

router.post('/login',login)
router.get('/me',authMiddleware,getMe)
router.post("/logout",logout);

export default router