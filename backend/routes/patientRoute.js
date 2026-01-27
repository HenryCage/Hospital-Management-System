import express from 'express';
import { createPatient, getAllPatients, getPatientCount } from '../controllers/patient.controller.js';
import { verifyToken } from '../middlewares/authMiddleware.js';
import { verifyRole } from '../middlewares/roleMiddleware.js';
const router = express.Router();

router.post('/create', verifyToken, verifyRole(['receptionist']), createPatient)
router.get('/count', verifyToken, verifyRole(['receptionist', 'admin']), getPatientCount)
router.get('/getpatients', verifyToken, verifyRole(['receptionist', 'admin', 'doctor']), getAllPatients)

export default router