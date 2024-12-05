import express from "express";
import appointmentsController from "../controllers/appointmentsController.js";

const router = express.Router();

// Listar citas
router.get("/", appointmentsController.getAppointments);
router.get("/create", appointmentsController.showCreateForm);
router.post("/create", appointmentsController.createAppointment);
router.get("/edit/:id", appointmentsController.showEditForm);
router.post("/edit/:id", appointmentsController.editAppointment);
router.get("/delete/:id", appointmentsController.deleteAppointment);






export default router;
