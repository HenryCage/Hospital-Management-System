import express from "express";
import { createHospital } from "../controllers/hospital.controller.js";

const router = express.Router();

// Step 1 onboarding: create hospital
router.post("/hospital", createHospital);

export default router;
