
import { param,body } from "express-validator"
import { TagModel } from "../../models/tag.model.js";

export const getTagByPkValidations = [
    param('id')
        .isInt().withMessage('El id debe ser un entero')
        .custom(async (value)=> {
            const tag = TagModel.findByPk(value);
            if(!tag) {
                throw new Error('No existe una etiqueta con ese id')
            }
        })

]

export const createTagValidation = [
    body("name").notEmpty().withMessage('El color no puede estar vacío')
    .isLength({min: 3, max: 50}).withMessage('El color de debe tener entre 3 y 50 caracteres')
    ,
    body("color").notEmpty().withMessage('El color no puede estar vacío')
    .isLength({min: 3, max: 100}).withMessage('El color debe tener máximo 50 caracteres')
    .isHexadecimal().withMessage('El color debe ser en formato hexadecimal')
];

export const updateTagValidation = [
    param('id')
        .isInt().withMessage('El id debe ser un entero')
        .custom(async (value)=> {
            const tag = TagModel.findByPk(value);
            if(!tag) {
                throw new Error('No existe una etiqueta con ese id')
            }
        }),
   body("name").notEmpty().withMessage('El color no puede estar vacío')
    .isLength({min: 3, max: 50}).withMessage('El color de debe tener entre 3 y 50 caracteres')
    .optional()
    ,
    body("color").notEmpty().withMessage('El color no puede estar vacío')
    .isLength({min: 3, max: 100}).withMessage('El color debe tener máximo 50 caracteres')
    .isHexadecimal().withMessage('El color debe ser en formato hexadecimal')
        .optional()
];

export const deleteTagValidation = [
    param('id')
        .isInt().withMessage('El id debe ser un entero')
        .custom(async (value)=> {
            const tag = TagModel.findByPk(value);
            if(!tag) {
                throw new Error('No existe una etiqueta con ese id')
            }
        })
]