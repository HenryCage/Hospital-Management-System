import express from 'express';
import { verifyToken } from '../middlewares/authMiddleware.js';
import { getAVisitbyId, getLatestVisit, getPendingVisits, startVisit } from '../controllers/visits.controller.js';
const router = express.Router();

router.post('/start/:patientId', verifyToken, startVisit);

router.get('/pending', verifyToken, getPendingVisits);

router.get('/:visitId', verifyToken, getAVisitbyId)

router.get('latest/:patientId', verifyToken, getLatestVisit)

export default router 