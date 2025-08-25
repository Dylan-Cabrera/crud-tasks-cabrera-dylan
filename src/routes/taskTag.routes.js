import { Router } from "express";
import { getAllTasksTags, createTasksTags,GetTaskTagByPk, updateTaskTag, deleteTaskTag } from "../controllers/taskTag.controller.js";
import { createTaskTagValidation, deleteTaskTagValidation, getTaskTagByPkValidations, updateTaskTagValidation } from "../middlewares/validations/taskTag.validations.js";


const router = Router();

router.get('/taskstags', getAllTasksTags);
router.get('/taskstags/:id', getTaskTagByPkValidations, validator, GetTaskTagByPk);
router.post('/taskstags', createTaskTagValidation, validator, createTasksTags);
router.put('/taskstags/:id', updateTaskTagValidation, validator, updateTaskTag);
router.delete('/taskstags/:id',deleteTaskTagValidation , validator ,deleteTaskTag);

export default router;


