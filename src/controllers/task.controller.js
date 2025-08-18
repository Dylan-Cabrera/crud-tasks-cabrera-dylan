import { TaskModel } from "../models/task.model.js";
import { Sequelize, where,Op, Model } from "sequelize";
import { UserModel } from "../models/user.model.js";

//Obtener todas las tareas
export const getAllTasks = async (req, res) => {
    try {
        const tasks = await TaskModel.findAll({
            attributes:{
                exclude: ['user_id']
            },
            include: {
                model: UserModel,
                as: 'user',
                attributes: ['name', 'email']
            }
        });
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener las tareas", error});
    }
};

//Obtener por id
export const getTaskById = async (req, res) => {
    const id = await req.params.id;
    try {
        const task = await TaskModel.findByPk(id, {
            attributes: {
                exclude: ['user_id']
            },
            include: {
                model: UserModel,
                as: 'user',
                attributes: ['name', 'email']
            }
        });
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el id"});
    }
};

//Crear tarea
export const createTask = async (req, res) => {
    const { title, description, is_complete, user_id} = await req.body;

    
    if(!user_id) {
        return res.status(400).json({ message: "No se pueden crear tareas sin usuario"});
    };

    const  searchUser = await UserModel.findByPk(user_id);
    if (!searchUser) {
        return res.status(404).json({ message: "No existe un usuario con ese id"});
    };

    const verifyUniqueTask = await TaskModel.findOne({ where: {title:title} });
    if(verifyUniqueTask) {
        return res.status(400).json({ message: "No pueden existir dos tareas con el mismo título"});
    };

    const titleLength = title.length;
    const descriptionLength = description.length;
    if(titleLength > 100) {
        return res.status(400).json({ message: "El título no puede tener más de 100 carácteres"});
    };
    if(descriptionLength > 100) {
        return res.status(400).json({ message: "La descripción no puede tener más de 100 carácteres"});
    };

    if(title.trim() === "") {
        return res.status(400).json({ message: "El título no puede estar vacío"});
    };
    if(description.trim() === "") {
        return res.status(400).json({ message: "La descriopción no pude estar vacía"});
    };

    if(typeof is_complete != "boolean" ) {
        return res.status(400).json({ message: "is_complete solo admite valores booleanos"});
    };

    try {
        const createTask = await TaskModel.create({title, description, is_complete, user_id});
        res.status(201).json(createTask);
    } catch (error) {
        res.status(500).json({ message: "Error al crear la tarea", error});
    }
};

//Actualizar tarea
export const updateTask = async (req, res) => {
    const id = req.params.id;
    const { title, description, is_complete, user_id} = await req.body;

    //busca si el usuario ya tiene una tarea con ese titulo
    const verifyUniqueTask = await TaskModel.findOne({ where: {title:title, id: {[Op.eq]: id}} });
    if(verifyUniqueTask) {
        return res.status(400).json({ message: "Un usuario no puede tener dos tareas con el mismo título"});
    };

    const titleLength = title.length;
    const descriptionLength = description.length;
    if(titleLength > 100) {
        return res.status(400).json({ message: "El título no puede tener más de 100 carácteres"});
    };
    if(descriptionLength > 100) {
        return res.status(400).json({ message: "La descripción no puede tener más de 100 carácteres"});
    };

    if(title.trim() === "") {
        return res.status(400).json({ message: "El título no puede estar vacío"});
    };
    if(description.trim() === "") {
        return res.status(400).json({ message: "La descriopción no pude estar vacía"});
    };

    if(typeof is_complete != "boolean" ) {
        return res.status(400).json({ message: "is_complete solo admite valores booleanos"});
    };
    try {
        const updateTask = await TaskModel.update({ title, description, is_complete, user_id}, { where: {id: id}});
        if(updateTask) {
            const TaskUpdated = await Task.findByPk(id);
            res.status(200).json(TaskUpdated);
        };
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar la tarea"});
    }
};

//Eliminar tarea
export const deleteTask = async (req, res) => {
    const id = req.params.id;
    try {
        const verifyExistence = await TaskModel.findByPk(id);
        if(verifyExistence) {
            const deleteTask = await TaskModel.destroy({ where: {id:id}});
            return res.status(200).json({ message: "tarea eliminada con éxito"});
            
        } else {
            res.status(404).json({ message: 'No existe una tarea con ese id'})
        }

    } catch (error) {
        res.status(500).json({ message: "Error al eliminar la tarea"});
    }
};