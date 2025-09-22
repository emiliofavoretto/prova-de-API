import express from "express";
import { updateMonster, getAllMonsters, getMonsterByld, createMonster, deleteMonster } from "../Controllers/Controller.js";

const router = express.Router();
router.get("/", getAllMonsters);
router.get("/:id", getMonsterByld);
router.post("/", createMonster);
router.delete("/:id", deleteMonster);
router.put("/:id", updateMonster);

export default router;