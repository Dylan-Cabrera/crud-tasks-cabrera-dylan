import { Router } from "express";
import { getAllTasksTags, createTasksTags,GetTaskTagByPk, updateTaskTag, deleteTaskTag } from "../controllers/taskTag.controller.js";

const router = Router();

router.get('/taskstags', getAllTasksTags);
router.get('/taskstags/:id', GetTaskTagByPk);
router.post('/taskstags', createTasksTags);
router.put('/taskstags/:id', updateTaskTag);
router.delete('/taskstags/:id', deleteTaskTag);

export default router;


