import express from 'express'
import { addResource, deleteResource, getResources, updateResource } from '../controllers/resource.controller.js'
import { authMiddleware } from '../middelwares/authMiddleware.js'

const router = express.Router()

router.post('/',authMiddleware,addResource)
router.get('/',authMiddleware,getResources)
router.delete('/:id',authMiddleware,deleteResource)
router.put('/:id',authMiddleware,updateResource)

export default router