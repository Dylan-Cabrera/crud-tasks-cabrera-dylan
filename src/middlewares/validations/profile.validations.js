import { ProfileModel } from "../../models/profile.model.js";

import { param,body } from "express-validator"

export const getProfileByPkValidations = [
    param('id')
        .isInt().withMessage('El id debe ser un entero')
        .custom(async (value)=> {
            const profile = ProfileModel.findByPk(value);
            if(!profile) {
                throw new Error('No existe un perfil con ese id')
            }
        })

]

export const createProfileValidation = [
    body("nick_name").notEmpty().withMessage('El nick no puede estar vacío')
    .isLength({min: 3, max: 100}).withMessage('El nick de debe tener entre 3 y 100 caracteres')
    ,
    body("desciption").notEmpty().withMessage('El nick no puede estar vacío')
    .isLength({min: 3, max: 100}).withMessage('El nick debe tener máximo 100 caracteres')
    ,
    body("profile_picture").notEmpty().withMessage('La foto de perfil no puede estar vacía')
    .optional()
];

export const updateProfileValidation = [
    param('id')
        .isInt().withMessage('El id debe ser un entero')
        .custom(async (value)=> {
            const profile = ProfileModel.findByPk(value);
            if(!profile) {
                throw new Error('No existe un perfil con ese id')
            }
        }),
   body("nick_name").notEmpty().withMessage('El nick no puede estar vacío')
    .isLength({min: 3, max: 100}).withMessage('El nick de debe tener entre 3 y 100 caracteres')
    .optional()
    ,
    body("desciption").notEmpty().withMessage('El nick no puede estar vacío')
    .isLength({min: 3, max: 100}).withMessage('El nick debe tener máximo 100 caracteres')
    .optional()
    ,
    body("profile_picture").notEmpty().withMessage('La foto de perfil no puede estar vacía')
    .optional()

];

export const deleteProfileValidation = [
    param('id')
        .isInt().withMessage('El id debe ser un entero')
        .custom(async (value)=> {
            const profile = ProfileModel.findByPk(value);
            if(!profile) {
                throw new Error('No existe un perfil con ese id')
            }
        })
]