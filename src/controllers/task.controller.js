import { TaskModel } from "../models/task.model.js";
import { Sequelize, where,Op } from "sequelize";

//Obtener todas las tareas
export const getAllTasks = async (req, res) => {
    try {
        const getAllTasks = await TaskModel.findAll();
        res.status(200).json(getAllTasks);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener las tareas"});
    }
};

//Obtener por id
export const getTaskById = async (req, res) => {
    const id = await req.params.id;
    try {
        const getById = await TaskModel.findByPk(id);
        res.status(200).json(getById);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el id"});
    }
};

//Crear tarea
export const createTask = async (req, res) => {
    const { title, description, is_complete} = await req.body;
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
        const createTask = await TaskModel.create({title, description, is_complete});
        res.status(201).json(createTask);
    } catch (error) {
        res.status(500).json({ message: "Error al crear la tarea"});
    }
};

//Actualizar tarea
export const updateTask = async (req, res) => {
    const id = req.params.id;
    const { title, description, is_complete} = await req.body;
    const verifyUniqueTask = await TaskModel.findOne({ where: {title:title, id: {[Op.ne]: id}} });
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
        const updateTask = await TaskModel.update({ title, description, is_complete }, { where: {id: id}});
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
        const deleteTask = await TaskModel.destroy({ where: {id:id}});
        if(deleteTask) {
            res.status(200).json({ message: "tarea eliminada con éxito"});
        };
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar la tarea"});
    }
};