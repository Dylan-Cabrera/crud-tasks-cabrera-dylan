import { sequelize } from "../config/database.js"

export const StartDB = async () => {
    try {
        sequelize.authenticate();
        console.log("Se conecto a la base de datos")
        sequelize.sync({force: true});
    } catch (error) {
        console.log("Error al conectar con la base de datos")
        process.exit(1);
    }
}