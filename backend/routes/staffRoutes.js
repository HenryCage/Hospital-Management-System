import express from "express"
import { verifyToken } from "../middlewares/authMiddleware.js";
import { verifyRole } from "../middlewares/roleMiddleware.js";
import { deleteUserById, getAllUsers, getOneUser, patientCount, staffCount, updateStaff } from "../controllers/user.controller.js";
const router = express.Router();

router.get('/staffs', verifyToken, verifyRole(['admin']), getAllUsers)
router.get('/staffs/count', verifyToken, verifyRole(['admin']), staffCount)
router.get('/patients/count', patientCount)
router.get('/staffs/:id', verifyToken, verifyRole(['admin']), getOneUser)
router.patch('/staffs/:id', verifyToken, verifyRole(['admin']), updateStaff)
router.delete('/staffs/:id', verifyToken, verifyRole(['admin']), deleteUserById)

export default router