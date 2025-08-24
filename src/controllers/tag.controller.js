import { ProfileModel } from "../models/profile.model.js";
import { TagModel } from "../models/tag.model.js";
import { TaskModel } from "../models/task.model.js";
import { UserModel } from "../models/user.model.js";

//obtener todas las etiquetas

export const getAllTags = async (req,res) => {
    try {
        const tags = await TagModel.findAll({
            include: [{
                model: TaskModel,
                attributes: {
                            exclude: ['user_id']
                        },
                through: {
                    attributes:[],
                },
                as: 'tasks',
                include: [
                    {
                        model: UserModel,
                        as: 'user',
                        attributes: {
                            exclude: ['password']
                        },
                        include: [
                            {
                                model: ProfileModel,
                                as: 'profile',
                                attributes: {
                                exclude: ['user_id']},
                            }
                        ]
                    }
                ]
            }]
        })
        res.status(200).json(tags);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener las etiquetas", error})
    }
};

//obtener etiqueta por id
export const GetTagByPk = async (req,res) => {
    try {
        const tag = await TagModel.findByPk(req.params.id);

        res.status(200).json(tag);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la etiqueta', error})
    }
};

//añadir una nueva etiqueta
export const createTag = async (req,res) => {
   
    try {
        const createTag = await TagModel.create(req.body);
        if(createTag) {
            res.status(201).json(createTag);
        };
    } catch (error) {
        res.status(500).json({ message: "Error al crear etiqueta", error})
    }
};

//actualizar etiqueta 
export const updateTag = async (req,res) => {
    try {
        const updateTag = await TagModel.update(req.body, {where: {
            id: req.params.id
        }});
        if(updateTag) {
            const tag = await TagModel.findByPk(req.params.id);
            res.status(200).json(tag, { message: "Etiqueta actualizada con exito"})

        }
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la etiqueta', error})
        
    }
};


//eliminar una etiqueta
export const deleteTag = async (req,res) => {
    try {
        const deleteTag = await TagModel.destroy({where: {
            id: req.params.id
        }});
        res.status(200).json({ message: "Etiqueta eliminada con exito"})
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la etiqueta', error})
    }
};