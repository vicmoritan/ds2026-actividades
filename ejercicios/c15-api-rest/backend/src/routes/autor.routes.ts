import { Router } from "express";
import * as autorController from "../controllers/autor.controller";

const router = Router();

router.get("/", autorController.getAll);
router.get("/:id", autorController.getById);
router.post("/", autorController.create);
router.patch("/:id", autorController.update);
router.delete("/:id", autorController.remove);

export default router;