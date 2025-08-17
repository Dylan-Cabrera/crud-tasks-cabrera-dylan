import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";
import { ProfileModel } from "./profile.model.js";

export const UserModel = sequelize.define(
    "User", {
        "id": {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        "name": {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        "email": {
            type: DataTypes.STRING(100),
            unique:true,
            allowNull: false
        },
        "password": {
            type: DataTypes.STRING(100),
            allowNull: false
        }
    },{
        timestamps:false
    }
);

//relación uno a uno

ProfileModel.belongsTo(UserModel, {
    foreignKey: 'user_id',
    as: 'user'
});

UserModel.hasOne(ProfileModel, {
    foreignKey: 'user_id',
    as: 'profile'
})