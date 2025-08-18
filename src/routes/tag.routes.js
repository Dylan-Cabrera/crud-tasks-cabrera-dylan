import { Router } from "express";
import { getAllTags, createTag } from "../controllers/tag.controller.js";

const router = Router();

router.get('/tags', getAllTags);
router.post('/tags', createTag);

export default router;