import express from 'express';
import { login, createStaff } from "../controllers/auth.controller.js";
import { verifyToken } from '../middlewares/authMiddleware.js';
import { verifyRole } from '../middlewares/roleMiddleware.js';
import { adminSignup } from '../controllers/admin.controller.js';
const router = express.Router()

router.post('/admin/signup', adminSignup)
router.post('/create', verifyToken, verifyRole(['admin']), createStaff)
router.post('/login', login)

export default router