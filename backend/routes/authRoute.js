import express from 'express';
import { login, createStaff } from "../controllers/auth.controller.js";
import { verifyToken } from '../middlewares/authMiddleware.js';
import { adminOnly } from '../middlewares/roleMiddleware.js';
import { adminSignup } from '../controllers/admin.controller.js';
const router = express.Router()

router.post('/admin/signup', adminSignup)
router.post('/create', verifyToken, adminOnly, createStaff)
router.post('/login', login)

export default router