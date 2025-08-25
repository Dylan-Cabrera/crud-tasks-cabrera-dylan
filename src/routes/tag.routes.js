import { Router } from "express";
import { getAllTags, createTag,GetTagByPk, updateTag, deleteTag } from "../controllers/tag.controller.js";
import { createTagValidation, deleteTagValidation, getTagByPkValidations, updateTagValidation } from "../middlewares/validations/tag.validations.js";

const router = Router();

router.get('/tags', getAllTags);
router.get('/tags/:id', getTagByPkValidations, validator, GetTagByPk);
router.post('/tags', createTagValidation, validator, createTag);
router.put('/tags/:id', updateTagValidation, validator, updateTag);
router.delete('/tags/:id', deleteTagValidation, validator, deleteTag);

export default router;