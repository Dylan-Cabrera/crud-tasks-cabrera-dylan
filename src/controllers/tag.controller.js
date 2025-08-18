import { ProfileModel } from "../models/profile.model.js";
import { TagModel } from "../models/tag.model.js";
import { TaskModel } from "../models/task.model.js";
import { UserModel } from "../models/user.model.js";

//obtener todas las etiquetas

export const getAllTags = async (req,res) => {
    try {
        const getAllTags = await TagModel.findAll({
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
        res.status(200).json(getAllTags);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener las etiquetas", error})
    }
};

//añadir una nueva etiqueta
export const createTag = async (req,res) => {
    try {
        
    } catch (error) {
        res.status(500).json({ message: "Error al crear etiqueta", error})
    }
};