import { param,body } from "express-validator"
import { UserModel } from "../../models/user.model.js"
import { Op } from "sequelize";

export const getUserByPkValidations = [
    param('id')
        .isInt().withMessage('El id debe ser un entero') //msg si no es entero
        .custom(async (value)=> {
            const user = UserModel.findByPk(value);
            if(!user) {
                throw new Error('No existe un usuario con ese id')
            }
        })

]

export const createUserValidation = [
    body("name").notEmpty().withMessage('El nombre no puede estar vacío')
    .isLength({min: 3, max: 100}).withMessage('El nombre de debe tener entre 3 y 100 caracteres')
    ,
    body("email").notEmpty().withMessage('El email no puede estar vacío')
    .isLength({min: 3, max: 100}).withMessage('El email debe tener máximo 100 caracteres')
    .isEmail().withMessage('Email invalido')
    .custom( async (value) => {
        const emailUser = UserModel.findOne({
            where: {email: value}
        });
        if(emailUser) {
            throw new Error('Ya existe un usuario con ese email')
        }
    }),
    body("is_complete").isBoolean().withMessage('is_complete solo admite valores booleanos')
];

export const updateUserValidation = [
    param('id')
        .isInt().withMessage('El id debe ser un entero') //msg si no es entero
        .custom(async (value)=> {
            const user = UserModel.findByPk(value);
            if(!user) {
                throw new Error('No existe un usuario con ese id')
            }
        }),
    body("name").notEmpty().withMessage('El nombre no puede estar vacío')
    .isLength({min: 3, max: 100}).withMessage('El nombre de debe tener entre 3 y 100 caracteres')
    .optional(),
    body("email").notEmpty().withMessage('El email no puede estar vacío')
    .isLength({min: 3, max: 100}).withMessage('El email debe tener máximo 100 caracteres')
    .isEmail().withMessage('Email invalido')
    .custom( async (value) => {
        const user = UserModel.findOne({
            where: {email: value, id: { [Op.ne]: req.params.id}}
        });
        if(user) {
            throw new Error('Ya existe un usuario con ese email')
        }
    })
    .optional(),
    body("is_complete").isBoolean().withMessage('is_complete solo admite valores booleanos')
    .optional()

];

export const deleteUserValidation = [
     param('id')
        .isInt().withMessage('El id debe ser un entero') //msg si no es entero
        .custom(async (value)=> {
            const user = UserModel.findByPk(value);
            if(!user) {
                throw new Error('No existe un usuario con ese id')
            }
        })
]