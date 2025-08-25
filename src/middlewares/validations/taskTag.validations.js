
import { param,body } from "express-validator"
import { TaskTagModel } from "../../models/taskTag.model.js";
import { TaskModel } from "../../models/task.model.js";
import { TagModel } from "../../models/tag.model.js";

export const getTaskTagByPkValidations = [
    param('id')
        .isInt().withMessage('El id debe ser un entero')
        .custom(async (value)=> {
            const taskTag = TaskTagModel.findByPk(value);
            if(!taskTag) {
                throw new Error('No existe una relación con ese id')
            }
        })

]

export const createTaskTagValidation = [
    body("task_id").notEmpty().withMessage('El campo task_id no puede estar vacío')
    .isInt().withMessage('La clave foranea debe ser un entero')
    .custom(
        async (value) => {
            const task = await TaskModel.findByPk(value);
            if(!task) {
                throw new Error('No existe una tarea con ese id')
            }
        }
    )
    ,
    body("tag_id").notEmpty().withMessage('El campo tag_id  puede estar vacío')
    .isInt().withMessage('La clave foranea debe ser un entero')
    .custom(
        async (value) => {
            const tag = await TagModel.findByPk(value);
            if(!tag) {
                throw new Error('No existe una etiqueta con ese id')
            }
        }
    )
];

export const updateTaskTagValidation = [
    param('id')
        .isInt().withMessage('El id debe ser un entero')
        .custom(async (value)=> {
            const taskTag = TaskTagModel.findByPk(value);
            if(!taskTag) {
                throw new Error('No existe una relación con ese id')
            }
        })
    ,
    body("task_id").notEmpty().withMessage('El campo task_id no puede estar vacío')
    .isInt().withMessage('La clave foranea debe ser un entero')
    .custom(
        async (value) => {
            const task = await TaskModel.findByPk(value);
            if(!task) {
                throw new Error('No existe una tarea con ese id')
            }
        }
    )
    .optional()
    ,
    body("tag_id").notEmpty().withMessage('El campo tag_id  puede estar vacío')
    .isInt().withMessage('La clave foranea debe ser un entero')
    .custom(
        async (value) => {
            const tag = await TagModel.findByPk(value);
            if(!tag) {
                throw new Error('No existe una etiqueta con ese id')
            }
        }
    )
    .optional()
];

export const deleteTaskTagValidation = [
    param('id')
        .isInt().withMessage('El id debe ser un entero')
        .custom(async (value)=> {
            const taskTag = TaskTagModel.findByPk(value);
            if(!taskTag) {
                throw new Error('No existe una relación con ese id')
            }
        })
]