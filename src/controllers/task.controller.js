import { Task } from "../models/task.model.js";
import { Sequelize, where } from "sequelize";

//Obtener todas las tareas
export const getAllTasks = async (req, res) => {
    try {
        const getAllTasks = await Task.findAll();
        res.status(200).json(getAllTasks);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener las tareas"});
    }
};

//Obtener por id
export const getTaskById = async (req, res) => {
    const id = await req.params.id;
    try {
        const getById = await Task.findByPk(id);
        res.status(200).json(getById);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el id"});
    }
};

//Crear tarea
export const createTask = async (req, res) => {
    const { title, description, isComplete} = await req.body;
    const verifyUniqueTask = await Task.findOne({ where: {title:title} });
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

    if(typeof isComplete != "boolean" ) {
        return res.status(400).json({ message: "IsComplete solo admite valores booleanos"});
    };

    try {
        const createTask = await Task.create({title, description, isComplete});
        res.status(201).json(createTask);
    } catch (error) {
        res.status(500).json({ message: "Error al crear la tarea"});
    }
};

//Actualizar tarea
export const updateTask = async (req, res) => {
    const id = req.params.id;
    const { title, description, isComplete} = await req.body;
    const verifyUniqueTask = await Task.findOne({ where: {title:title} });
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

    if(typeof isComplete != "boolean" ) {
        return res.status(400).json({ message: "IsComplete solo admite valores booleanos"});
    };
    try {
        const updateTask = await Task.update({ title, description, isComplete }, { where: {id: id}});
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
        const deleteTask = await Task.destroy({ where: {id:id}});
        if(deleteTask) {
            res.status(200).json({ message: "tarea eliminada con éxito"});
        };
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar la tarea"});
    }
};