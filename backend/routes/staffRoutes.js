import express from "express"
import { verifyToken } from "../middlewares/authMiddleware.js";
import { verifyRole } from "../middlewares/roleMiddleware.js";
import { getAllUsers, staffCount } from "../controllers/user.controller.js";
const router = express.Router();

router.get('/staffs', verifyToken, verifyRole(['admin']), getAllUsers)
router.get('/staffs/count', staffCount)

export default router