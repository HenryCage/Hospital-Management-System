import express from 'express';
import { verifyToken } from '../middlewares/authMiddleware.js';
import { getAVisit, getPendingVisits, startVisit } from '../controllers/visits.controller.js';
const router = express.Router();

router.post('/start/:patientId', verifyToken, startVisit);

router.get('/pending/:patientId', verifyToken, getPendingVisits);

router.get('/patient/:patientId', verifyToken, getAVisit)

export default router