//un usuario solo puede tener un perfil y un perfil solo puede tener un usuario
import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";

export const ProfileModel = sequelize.define(
    'Profile', {
        'nick_name': {
            type: DataTypes.STRING(50),
            allowNull: false
        }, 
        'description': { 
            type: DataTypes.STRING(100),
            allowNull: true
        },
        'profile_picture': {
            type: DataTypes.STRING,
            allowNull: true
        }
    } ,
    {
        timestamps: false
    }
);