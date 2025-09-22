import express from "express";
import { updateCar, getAllCars, getCarById, createCar, deleteCar } from "../controllers/Controller.js";

const router = express.Router();

router.get("/", getAllCars);
router.get("/:id", getCarById);
router.post("/", createCar);
router.delete("/:id", deleteCar);
router.put("/:id", updateCar);

export default router;
