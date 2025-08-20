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

export const createTasksTags = async (req,res) => {
    const {task_id, tag_id} = req.body;
    try {
        const createTaskTag = await TaskTagModel.create({task_id, tag_id});
        res.status(201).json(createTaskTag);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear relación', error})
    }
};