import express from "express";
import dotenv from "dotenv";

import carsRoutes from "./src/routes/Routes.js";

const app = express();
app.use(express.json());

dotenv.config();
const serverPort = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("Servidor funcionando...");
});

app.use("/cars", carsRoutes);

app.listen(serverPort, () => {
    console.log(`Servidor funcionando na porta http://localhost:${serverPort}.`);
});
