import { User } from "../models/user.model.js";
import { Sequelize, where } from "sequelize";

//Obtener todos los usuarios
export const getAllUsers = async (req, res) => {
    try {
        const getAllUsers = await User.findAll();
        res.status(200).json(getAllUsers);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los usuarios"});
    }
};

//Obtener por id
export const getById = async (req, res) => {
    const id = await req.params.id;
    try {
        const getById = await User.findByPk(id);
        res.status(200).json(getById);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el id"});
    }
};

//Crear usuario
export const createUser = async (req, res) => {
    const { name, email, password } = await req.body;
    try {
        const createUser = await User.create(name, email, password);
        res.status(201).json(createUser);
    } catch (error) {
        res.status(500).json({ message: "Error al crear el usuario"});
    }
};

//Actualizar usuario
export const updateUser = async (req, res) => {
    const id = req.params.id;
    const { name, email, password} = await req.body;
    try {
        const updateUser = await User.update({ name, email, password }, { where: {id: id}});
        if(updateUser) {
            const userUpdated = await User.findByPk(id);
            res.status(200).json(userUpdated);
        };
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar el usuario"});
    }
};

//Eliminar usuario
export const deleteUser = async (req, res) => {
    const id = req.params.id;
    try {
        const deleteUser = await User.destroy(id);
        if(deleteUser) {
            res.status(200).json({ message: "Usuario eliminado con éxito"});
        };
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el usuario"});
    }
};