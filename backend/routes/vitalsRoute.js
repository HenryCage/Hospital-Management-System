import express from 'express'
import { verifyToken } from '../middlewares/authMiddleware.js'
import { createVitals, getVitals } from '../controllers/vitals.controller.js'
import { verifyRole } from '../middlewares/roleMiddleware.js'

const router = express.Router()

router.post('/:visitId', verifyToken, verifyRole(['doctor', 'nurse', 'receptionist']), createVitals)
router.get('/:visitId', verifyToken, verifyRole(['doctor', 'nurse', 'receptionist']), getVitals)

export default router