import express from "express";
import dotenv from "dotenv";
import { StartDB } from "./src/config/db.js";
import userRoutes from "./src/routes/user.routes.js";
import taskRoutes from "./src/routes/task.routes.js";
import tagRouter from "./src/routes/tag.routes.js";
import './src/models/profile.model.js';
import './src/models/tag.model.js';
import './src/models/task_tag.model.js';


StartDB();
const app = express();
dotenv.config();
const PORT = process.env.PORT;

app.use(express.json());
app.use("/api", userRoutes);
app.use("/api", taskRoutes);
app.use("/api", tagRouter);

app.listen(PORT || 3000, () => {
    console.log(`escuchando servidor en el puerto ${PORT}`);
});