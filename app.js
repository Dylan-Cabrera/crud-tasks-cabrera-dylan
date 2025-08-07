import express from "express";
import dotenv from "dotenv";
import { StartDB } from "./src/config/db.js";

StartDB();
const app = express();
dotenv.config();
const PORT = process.env.PORT;
app.use(express.json());

app.listen(PORT || 3000, () => {
    console.log(`escuchando servidor en el puerto ${PORT}`);
});