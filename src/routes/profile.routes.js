import { Router } from "express";
import { getAllProfiles, createProfile } from "../controllers/profile.controller.js";

const router = Router();

router.get('/profiles', getAllProfiles);
router.post('/profiles', createProfile);

export default router;