import express from "express";
import dotenv from "dotenv";
import { StartDB } from "./src/config/db.js";
import userRouter from "./src/routers/user.router.js";
import taskRouter from "./src/routers/task.router.js";

StartDB();
const app = express();
dotenv.config();
const PORT = process.env.PORT;

app.use(express.json());
app.use("/api", userRouter);
app.use("/api", taskRouter);

app.listen(PORT || 3000, () => {
    console.log(`escuchando servidor en el puerto ${PORT}`);
});