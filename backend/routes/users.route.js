import express from 'express'
import { addUser, deleteUser, updateUser } from "../controllers/user.controller.js";
import { authMiddleware } from '../middelwares/authMiddleware.js';
const router = express.Router()

router.post('/',addUser)
router.delete('/:id',deleteUser)
router.put('/:id',authMiddleware,updateUser)

export default router