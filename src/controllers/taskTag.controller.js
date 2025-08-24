//tabla intermedia controladores get y post, rutas

import { TagModel } from "../models/tag.model.js";
import { TaskModel } from "../models/task.model.js";
import { TaskTagModel } from "../models/taskTag.model.js";

export const getAllTasksTags = async (req,res) => {
    try {
        const tasksTags = await TaskTagModel.findAll({
            attributes: {
                exclude: ['task_id', 'tag_id']
            },
            include: [
                {
                    model: TaskModel,
                    as: 'tasks',
                    attributes: ['title', 'description', 'is_complete']
                },
                {
                    model: TagModel,
                    as: 'tags',
                    attributes: ['name', 'color']
                }
            ]
           
        });
        res.status(200).json(tasksTags);

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error al obtener las tareas con sus etiquetas', error})
    }
};

//obtener por id
export const GetTaskTagByPk = async (req,res) => {
    try {
        const taskTag = await TaskTagModel.findByPk(req.params.id, {
            attributes: {
                exclude: ['task_id', 'tag_id']
            },
            include: [
                {
                    model: TaskModel,
                    as: 'tasks',
                    attributes: ['title', 'description', 'is_complete']
                },
                {
                    model: TagModel,
                    as: 'tags',
                    attributes: ['name', 'color']
                }
            ]
           
        });

        res.status(200).json(taskTag);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la tarea con sus etiquetas', error})
    }
};

//crear
export const createTasksTags = async (req,res) => {
    try {
        const createTaskTag = await TaskTagModel.create(req.body);
        if(createTaskTag) {
            const taskTag = await TaskTagModel.findByPk(createTaskTag.id ,{
            
            include: [
                {
                    model: TaskModel,
                    as: 'tasks',
                    attributes: ['title', 'description', 'is_complete']
                },
                {
                    model: TagModel,
                    as: 'tags',
                    attributes: ['name', 'color']
                }
            ]
           
        } )
        return res.status(201).json(taskTag);
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al crear relación', error})
    }
};

//actualizar
export const updateTaskTag= async (req,res) => {
    try {
        const updateTaskTag= await TaskTagModel.update(req.body, {where: {
            id: req.params.id
        }});
        if(updateTaskTag) {
            const taskTag = await TaskTagModel.findByPk(req.params.id, {
            attributes: {
                exclude: ['task_id', 'tag_id']
            },
            include: [
                {
                    model: TaskModel,
                    as: 'tasks',
                    attributes: ['title', 'description', 'is_complete']
                },
                {
                    model: TagModel,
                    as: 'tags',
                    attributes: ['name', 'color']
                }
            ]
           
        });
            res.status(200).json(taskTag, { message: "Relación actualizada con exito"})
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la relación', error})
        console.error(error)
    }
};


//eliminar
export const deleteTaskTag = async (req,res) => {
    try {
        const deleteTaskTag = await TaskTagModel.destroy({where: {
            id: req.params.id
        }});
        return res.status(200).json({ message: "Relación eliminada con exito"})
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar relación', error})
    }
};