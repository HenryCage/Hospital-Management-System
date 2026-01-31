import express from 'express'
import { verifyToken } from '../middlewares/authMiddleware.js'
import { verifyRole } from '../middlewares/roleMiddleware.js'
import { dispensePrescription, getAPrescription, getDispensedRecordById, getDispensedRecords, getPrescriptions } from '../controllers/pharmacist.controller.js'
const router = express.Router() 

router.get('/prescriptions', verifyToken, verifyRole(['pharmacist']), getPrescriptions);
router.get('/prescriptions/:id', verifyToken, verifyRole(['pharmacist']), getAPrescription);
router.post('/dispense/:prescriptionId', verifyToken, verifyRole(['pharmacist']), dispensePrescription);
router.get("/dispensed-records", verifyToken, getDispensedRecords);
router.get("/dispensed-records/:recordId", verifyToken, getDispensedRecordById);


export default router