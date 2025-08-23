import { Router } from "express";
import { getAllProfiles, createProfile, GetProfileByPk, updateProfile, deleteProfile} from "../controllers/profile.controller.js";

const router = Router();

router.get('/profiles', getAllProfiles);
router.get('/profiles/:id', GetProfileByPk);
router.post('/profiles', createProfile);
router.put('/profiles/:id', updateProfile);
router.delete('/profiles/:id', deleteProfile);

export default router;