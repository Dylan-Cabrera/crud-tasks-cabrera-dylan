import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";
import { TaskModel } from "./task.model.js";
import { TagModel } from "./tag.model.js";

export const task_tag = sequelize.define(
    'task_tag', {
        'id': {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }
    } ,
    {
        timestamps: false
    }
);

//relación muchos a muchos

TaskModel.belongsToMany(TagModel, {
    through: task_tag,
    foreignKey: 'task_id',
    as: 'tag'
});

TagModel.belongsToMany(TaskModel, {
    through: task_tag,
    foreignKey: 'tag_id',
    as: 'tasks'
});