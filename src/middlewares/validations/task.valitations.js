import { TaskModel } from "../../models/task.model.js";
import { param,body } from "express-validator"

export const getTaskByPkValidations = [
    param('id')
        .isInt().withMessage('El id debe ser un entero') //msg si no es entero
        .custom(async (value)=> {
            const user = UserModel.findByPk(value);
            if(!user) {
                throw new Error('No existe una tarea con ese id')
            }
        })

]


export const createTaskValidation = [
    body("title").notEmpty().withMessage('El título no puede estar vacío')
    .isLength({min: 3, max: 100}).withMessage('El title debe tener máximo 100 caracteres')
    .custom( async (value) => {
        const task = TaskModel.findOne({
            where: {title: value}
        });
        if(task) {
            throw new Error('Ya existe una tarea con ese título')
        }
    }),
    body("description").notEmpty().withMessage('La descripción no puede estar vacía')
    .isLength({min: 3, max: 100}).withMessage('La descripción de debe tener entre 3 y 100 caracteres')
    ,
    body("is_complete").isBoolean().withMessage('is_complete solo admite valores booleanos')
];



export const updateTasksValidation = [
    param('id')
        .isInt().withMessage('El id debe ser un entero') //msg si no es entero
        .custom(async (value)=> {
            const user = UserModel.findByPk(value);
            if(!user) {
                throw new Error('No existe una tarea con ese id')
            }
        }),
       body("title").notEmpty().withMessage('El título no puede estar vacío')
    .isLength({min: 3, max: 100}).withMessage('El title debe tener máximo 100 caracteres')
    .custom( async (value) => {
        const task = TaskModel.findOne({
            where: {title: value}
        });
        if(task) {
            throw new Error('Ya existe una tarea con ese título')
        }
    })
    .optional(),
    body("description").notEmpty().withMessage('La descripción no puede estar vacía')
    .isLength({min: 3, max: 100}).withMessage('La descripción de debe tener entre 3 y 100 caracteres')
    .optional()
    ,
    body("is_complete").isBoolean().withMessage('is_complete solo admite valores booleanos')
    .optional()

];


export const deleteTaskValidation = [
     param('id')
        .isInt().withMessage('El id debe ser un entero') //msg si no es entero
        .custom(async (value)=> {
            const user = UserModel.findByPk(value);
            if(!user) {
                throw new Error('No existe un usuario con ese id')
            }
        })
]
