//una tarea puede tener más de una etiqueta y una etiqueta puede pertenecer a más de una tarea
import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";

export const TagModel = sequelize.define(
    'Tag', {
        'name': {
            type: DataTypes.STRING,
            allowNull: false
        }, 
        'color': {
            type: DataTypes.STRING(50),
            allowNull: false
        },
    } ,
    {
        timestamps: false
    }
);