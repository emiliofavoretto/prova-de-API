import express from "express";
import dotenv from "dotenv";

import monstersRoutes from "./src/routes/Routes.js"

const app = express();
app.use(express.json());

dotenv.config();
const serverPort = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("Servidor funcionando...");
});

app.use("/monsters", monstersRoutes)

app.listen(serverPort, () => {
    console.log("Servidor funcionando.");
});