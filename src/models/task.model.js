import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";
import { UserModel } from "./user.model.js";


export const TaskModel = sequelize.define(
    "Task", {
        "id": {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        "title": {
            type: DataTypes.STRING(100),
            unique: true,
            allowNull: false
        },
        "description": {
            type: DataTypes.STRING(100),
            allowNull:false
        },
        "is_complete": {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        } 
    },
    {
        timestamps: false
    }
)

//relación uno a muchos

TaskModel.belongsTo(UserModel, {foreignKey: "user_id", as: "user"});
UserModel.hasMany(TaskModel, {foreignKey: "user_id", as: "tasks"});


