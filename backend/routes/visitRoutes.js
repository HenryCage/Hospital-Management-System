import express from 'express';
import { verifyToken } from '../middlewares/authMiddleware.js';
import { doctorNotes, getAdmittedVisits, getAVisitbyId, getPendingVisits, getVisitCounts, getVisitHistory, startVisit, updateVisitStatus } from '../controllers/visits.controller.js';
import { verifyRole } from '../middlewares/roleMiddleware.js';
const router = express.Router();

router.post('/start/:patientId', verifyToken, startVisit);

router.get('/pending', verifyToken, getPendingVisits);

router.get('/admitted', verifyToken, verifyRole(['nurse', 'doctor', 'receptionist']), getAdmittedVisits)

router.get('/count', verifyToken, verifyRole(['doctor', 'nurse', 'receptionist']), getVisitCounts)

router.get('/patient/:patientId', verifyToken, getVisitHistory)

router.patch('/:visitId/doctor', verifyToken, doctorNotes)

router.patch('/:visitId/status', verifyToken, verifyRole(['doctor']), updateVisitStatus)

router.get('/:visitId', verifyToken, getAVisitbyId)


export default router 