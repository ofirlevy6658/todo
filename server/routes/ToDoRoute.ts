import { Router } from "express";

import { getToDo, saveToDo, deleteToDo, updateToDo } from "../controllers/ToDoController";

const router = Router();

router.get("/", getToDo);

router.post("/save", saveToDo);

router.put("/update", updateToDo);

router.delete("/delete", deleteToDo);

export default router;
