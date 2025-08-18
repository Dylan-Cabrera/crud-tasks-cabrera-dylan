import { Router } from "express";
import { getAllTasksTags, createTasksTags } from "../controllers/taskTag.controller.js";

const router = Router();

router.get('/taskstags', getAllTasksTags);
router.post('/taskstags', createTasksTags);

export default router;


