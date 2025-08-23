import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";
import { TaskModel } from "./task.model.js";
import { TagModel } from "./tag.model.js";

export const TaskTagModel = sequelize.define(
    'task_tags', {
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
    through: TaskTagModel,
    foreignKey: 'task_id',
    as: 'tags',
    onDelete: "CASCADE"
});

TagModel.belongsToMany(TaskModel, {
    through: TaskTagModel,
    foreignKey: 'tag_id',
    as: 'tasks',
    onDelete: "CASCADE"
});

TaskTagModel.belongsTo(TaskModel, {
    foreignKey: 'task_id',
    as: 'tasks',
    onDelete: "CASCADE"
});

TaskTagModel.belongsTo(TagModel, {
    foreignKey: 'tag_id',
    as: 'tags',
    onDelete: "CASCADE"
});