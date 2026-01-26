import express from 'express'
import { verifyToken } from '../middlewares/authMiddleware.js'
import { createVitals, getVitals } from '../controllers/vitals.controller.js'

const router = express.Router()

router.post('/:visitId', verifyToken, createVitals)
router.get('/:visitId', verifyToken, getVitals)

export default router