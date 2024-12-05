import express from "express";
import servicesController from "../controllers/servicesController.js";

const router = express.Router();

// Listar servicios
router.get("/", servicesController.getServices);

router.get("/create", servicesController.showCreateForm);

router.post("/create", servicesController.createService);

router.get("/edit/:id", servicesController.showEditForm);

router.post("/edit/:id", servicesController.editService);

router.get("/delete/:id", servicesController.deleteService);

export default router;
