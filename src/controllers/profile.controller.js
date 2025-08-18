import { ProfileModel } from "../models/profile.model.js";
import { TagModel } from "../models/tag.model.js";
import { TaskModel } from "../models/task.model.js";
import { UserModel } from "../models/user.model.js";


export const getAllProfiles = async (req,res) => {
    try {
        const profiles = await ProfileModel.findAll({
            attributes:{
                exclude: ['user_id']
            },
            include: [
                {
                    model: UserModel,
                    as: 'user',
                    attributes: ['name', 'email'],
                    include:[
                        {
                            model: TaskModel,
                            as: 'tasks',
                            attributes: ['title', 'description', 'is_complete'],
                            include:[
                                {
                                    model: TagModel,
                                    attributes: ['name', 'color'],
                                    as: 'tag',
                                    through: {
                                        attributes:[]
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        });

        res.status(200).json(profiles);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener todos los perfiles', error})
    }
};

export const createProfile = async (req,res) => {
    const {nick_name, description, profile_picture, user_id} = req.body;
    try {
         const createProfile = await ProfileModel.create({nick_name, description, profile_picture, user_id});
                if(createProfile) {
                    res.status(201).json(createProfile)
                };
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el perfil', error})
    }
};