import { Router } from "express";
import { getAllUsers, getUserById, createUser, updateUser, deleteUser } from "../controllers/user.controller.js";
import { createUserValidation, deleteUserValidation, getUserByPkValidations, updateUserValidation } from "../middlewares/validations/user.validations.js";
import { validator } from "../middlewares/validator.js";

const router = Router();

router.post("/users", createUserValidation, validator, createUser);
router.get("/users", getAllUsers);
router.get("/users/:id",getUserByPkValidations, validator, getUserById);
router.put("/users/:id", updateUserValidation, validator, updateUser);
router.delete("/users/:id", deleteUserValidation, validator, deleteUser);

export default router;