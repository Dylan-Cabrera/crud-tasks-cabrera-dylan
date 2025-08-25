import { sequelize } from "../config/database.js";
import { DataTypes, where } from "sequelize";
import { ProfileModel } from "./profile.model.js";
import { TaskModel } from "./task.model.js";

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
        paranoid: true
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
});


//no funca ;-;
UserModel.addHook("afterDestroy", async (user, options) => {
    
    try {
        const transaction = options.transaction; 
         
        const profile = await ProfileModel.findOne({  //despues de eliminar el usuario
            where: {user_id: user.dataValues.id}, //busca el perfil de ese usuario por su clave foranea
            transaction //pasa a la siguiente 
        });
        if(profile) {
            await profile.destroy({transaction}/*el transaction va dentro de un objeto*/ ); //elimina el perfil del usuario eliminado
        }

        const tasks = await TaskModel.findAll({
            where: {user_id: user.dataValues.id},
            transaction //al mismo nivel que el where
        });

        for (const task of tasks) { //son varios tasks, borra uno por uno 
            await task.destroy({
                transaction
            })
        };


    } catch (error) {
        console.log("Error al eliminar el usuario con su perfil y tareas")
    }
});



