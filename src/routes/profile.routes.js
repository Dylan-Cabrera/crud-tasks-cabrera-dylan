import { Router } from "express";
import { getAllProfiles, createProfile, GetProfileByPk, updateProfile, deleteProfile} from "../controllers/profile.controller.js";
import { validator } from "../middlewares/validator.js";
import { createProfileValidation, deleteProfileValidation, getProfileByPkValidations, updateProfileValidation } from "../middlewares/validations/profile.validations.js";

const router = Router();

router.get('/profiles',  getAllProfiles);
router.get('/profiles/:id', getProfileByPkValidations, validator, GetProfileByPk);
router.post('/profiles', createProfileValidation, validator, createProfile);
router.put('/profiles/:id', updateProfileValidation, validator, updateProfile);
router.delete('/profiles/:id', deleteProfileValidation, validator, deleteProfile);

export default router;