import express from "express";
import petsController from "../controllers/petsController.js";

const router = express.Router();

router.get("/", petsController.getPets);

router.get("/create", petsController.showCreateForm);

router.post("/create", petsController.createPet);
router.get("/edit/:id", petsController.showEditForm);
router.post("/edit/:id", petsController.editPet);
router.get("/delete/:id", petsController.deletePet);

export default router;
