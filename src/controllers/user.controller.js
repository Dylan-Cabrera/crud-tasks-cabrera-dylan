import { TaskModel } from "../models/task.model.js";
import { UserModel } from "../models/user.model.js";
import { Sequelize, where, Op } from "sequelize";


//Obtener todos los usuarios
export const getAllUsers = async (req, res) => {
    try {
        const users = await UserModel.findAll({
            attributes: {
                exclude: ['password']
            },
            include: {
                model: TaskModel,
                as: 'tasks',
                attributes: {
                    exclude: ['id', 'user_id']
                }
        }
        });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los usuarios"});
    }
};

//Obtener por id
export const getUserById = async (req, res) => {
    try {
        const user = await UserModel.findByPk(req.params.id, {
            attributes: {
                exclude: ['password']
            },
            include: {
                model: TaskModel,
                as: 'tasks',
                attributes: {
                    exclude: ['id', 'user_id']
                }
            }
        });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el id"});
    }
};

//Crear usuario
export const createUser = async (req, res) => {
    try {
        const createUser = await UserModel.create(req.body);
        res.status(201).json(createUser);
    } catch (error) {
        res.status(500).json({ message: "Error al crear el usuario", error});
    }
};

//Actualizar usuario
export const updateUser = async (req, res) => {
    try {
        const updateUser = await UserModel.update(req.body, { where: {id: req.params.id}});
        if(updateUser) {
            const userUpdated = await UserModel.findByPk(id);
            res.status(200).json(userUpdated);
        };
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar el usuario"});
    }
};

//Eliminar usuario
export const deleteUser = async (req, res) => {
    try {
        const deleteUser = await UserModel.destroy({ where: {id:req.params.id}});
        return res.status(200).json({ message: "tarea eliminada con éxito"});
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el usuario"});
    }
};