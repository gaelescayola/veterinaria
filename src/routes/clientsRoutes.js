import express from "express";
import clientsController from "../controllers/clientsController.js";

const router = express.Router();

// Listar clientes
router.get("/", clientsController.getClients);
router.get("/create", clientsController.showCreateForm);
router.post("/create", clientsController.createClient);
router.get("/edit/:id", clientsController.showEditForm);
router.post("/edit/:id", clientsController.editClient);
router.get("/delete/:id", clientsController.deleteClient);


export default router;
