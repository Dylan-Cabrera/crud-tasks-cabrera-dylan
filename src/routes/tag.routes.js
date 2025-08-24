import { Router } from "express";
import { getAllTags, createTag,GetTagByPk, updateTag, deleteTag } from "../controllers/tag.controller.js";

const router = Router();

router.get('/tags', getAllTags);
router.get('/tags/:id', GetTagByPk);
router.post('/tags', createTag);
router.put('/tags/:id', updateTag);
router.delete('/tags/:id', deleteTag);

export default router;