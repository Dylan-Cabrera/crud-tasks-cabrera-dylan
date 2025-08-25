import { Router } from "express";
import { getAllTasks, getTaskById, createTask, updateTask, deleteTask } from "../controllers/task.controller.js";
import { createTaskValidation, deleteTaskValidation, getTaskByPkValidations, updateTasksValidation } from "../middlewares/validations/task.valitations.js";
import { validator } from "../middlewares/validator.js";

const router = Router();

router.post("/tasks", createTaskValidation, validator, createTask);
router.get("/tasks", getAllTasks);
router.get("/tasks/:id", getTaskByPkValidations, validator, getTaskById);
router.put("/tasks/:id",updateTasksValidation, validator, updateTask);
router.delete("/tasks/:id", deleteTaskValidation, validator, deleteTask);

export default router;