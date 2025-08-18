import { Router } from "express";
import { getAllTags } from "../controllers/tag.controller.js";

const router = Router();

router.get('/tags', getAllTags);

export default router;