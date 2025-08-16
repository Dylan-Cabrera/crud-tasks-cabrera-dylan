import { TaskModel } from "../models/task.model.js";
import { UserModel } from "../models/user.model.js";
import { Sequelize, where, Op } from "sequelize";


//Obtener todos los usuarios
export const getAllUsers = async (req, res) => {
    try {
        const getAllUsers = await UserModel.findAll({
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
        res.status(200).json(getAllUsers);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los usuarios"});
    }
};

//Obtener por id
export const getUserById = async (req, res) => {
    const id = await req.params.id;
    try {
        const getById = await UserModel.findByPk(id, {
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
        res.status(200).json(getById);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el id"});
    }
};

//Crear usuario
export const createUser = async (req, res) => {
    const { name, email, password } = await req.body;

    const verifyUniqueEmail = await UserModel.findOne({
         where: {email:email} });
    if(verifyUniqueEmail) {
        return res.status(400).json({ message: "Ya existe un usuario con ese email"})
    }
    
    const nameLength = await name.length;
    if(nameLength > 100){
        return res.status(400).json({ message: "El nombre no puede tener más de 100 carácteres"})
    };
    const emailLength = await email.length;
    if(emailLength > 100){
        return res.status(400).json({ message: "El email no puede tener más de 100 carácteres"})
    };
    const passwordLength = await password.length;
    if(passwordLength > 100){
        return res.status(400).json({ message: "La contraseña no puede tener más de 100 carácteres"})
    };

    if(name.trim() === "") {
        res.status(400).json({ message: "El nombre no puede estar vacío"});
    };
    if(email.trim() === "") {
        res.status(400).json({ message: "El email no puede estar vacío"});
    };
    if(password.trim() === "") {
        res.status(400).json({ message: "La contraseña no puede estar vacía"});
    };

    try {
        const createUser = await User.create({name, email, password});
        res.status(201).json(createUser);
    } catch (error) {
        res.status(500).json({ message: "Error al crear el usuario"});
    }
};

//Actualizar usuario
export const updateUser = async (req, res) => {
    const id = req.params.id;
    const { name, email, password} = await req.body;
    const verifyUniqueEmail = await UserModel.findOne({ where: {email:email, id: {[Op.ne]: id}} });
    if(verifyUniqueEmail) {
        return res.status(400).json({ message: "Ya existe un usuario con ese email"})
    }
    
    const nameLength = await name.length;
    if(nameLength > 100){
        return res.status(400).json({ message: "El nombre no puede tener más de 100 carácteres"})
    };
    const emailLength = await email.length;
    if(emailLength > 100){
        return res.status(400).json({ message: "El email no puede tener más de 100 carácteres"})
    };
    const passwordLength = await password.length;
    if(passwordLength > 100){
        return res.status(400).json({ message: "La contraseña no puede tener más de 100 carácteres"})
    };

    if(name.trim() === "") {
        res.status(400).json({ message: "El nombre no puede estar vacío"});
    };
    if(email.trim() === "") {
        res.status(400).json({ message: "El email no puede estar vacío"});
    };
    if(password.trim() === "") {
        res.status(400).json({ message: "La contraseña no puede estar vacía"});
    };
    try {
        const updateUser = await UserModel.update({ name, email, password }, { where: {id: id}});
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
        const verifyExistence = await UserModel.findByPk(id);
                if(verifyExistence) {
                    const deleteUser = await UserModel.destroy({ where: {id:id}});
                    return res.status(200).json({ message: "tarea eliminada con éxito"});
                    
                } else {
                    res.status(404).json({ message: 'No existe una tarea con ese id'})
                }
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el usuario"});
    }
};