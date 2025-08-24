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
    try {
        const task = await TaskModel.findByPk(req.params.id, {
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
    try {
        const createTask = await TaskModel.create(req.body);
        res.status(201).json(createTask);
    } catch (error) {
        res.status(500).json({ message: "Error al crear la tarea", error});
    }
};

//Actualizar tarea
export const updateTask = async (req, res) => {
    try {
        const updateTask = await TaskModel.update(req.body, { where: {id: req.params.id}});
        if(updateTask) {
            const TaskUpdated = await TaskModel.findByPk(req.params.id);
            res.status(200).json(TaskUpdated);
        };
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar la tarea"});
        console.error(error)
    }
};

//Eliminar tarea
export const deleteTask = async (req, res) => {
    try {
        const deleteTask = await TaskModel.destroy({ where: {id:req.params.id}});
        return res.status(200).json({ message: "tarea eliminada con éxito"});

    } catch (error) {
        res.status(500).json({ message: "Error al eliminar la tarea"});
    }
};