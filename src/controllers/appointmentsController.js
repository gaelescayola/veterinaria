import appointmentsModel from "../models/appointmentsModel.js";
import petsModel from "../models/petsModel.js";
import servicesModel from "../models/servicesModel.js";

const getAppointments = async (req, res) => {
    try {
        const appointments = await appointmentsModel.getAllAppointments();
        res.render("appointments/index", { appointments });
    } catch (error) {
        console.error("Error al obtener citas:", error);
        res.status(500).send("Error al obtener citas");
    }
};

const showCreateForm = async (req, res) => {
    try {
        const pets = await petsModel.getAllPets();
        const services = await servicesModel.getAllServices();
        res.render("appointments/form", { appointment: null, pets, services });
    } catch (error) {
        console.error("Error al cargar formulario de creación:", error);
        res.status(500).send("Error al cargar formulario de creación");
    }
};

const createAppointment = async (req, res) => {
    try {
        await appointmentsModel.addAppointment(req.body);
        res.redirect("/appointments");
    } catch (error) {
        console.error("Error al agregar cita:", error);
        res.status(500).send("Error al agregar cita");
    }
};

const showEditForm = async (req, res) => {
    try {
        const appointment = await appointmentsModel.getAppointmentById(req.params.id);
        const pets = await petsModel.getAllPets();
        const services = await servicesModel.getAllServices();
        if (!appointment) {
            return res.status(404).send("Cita no encontrada");
        }
        res.render("appointments/form", { appointment, pets, services });
    } catch (error) {
        console.error("Error al cargar formulario de edición:", error);
        res.status(500).send("Error al cargar formulario de edición");
    }
};

const editAppointment = async (req, res) => {
    try {
        await appointmentsModel.updateAppointment(req.params.id, req.body);
        res.redirect("/appointments");
    } catch (error) {
        console.error("Error al actualizar cita:", error);
        res.status(500).send("Error al actualizar cita");
    }
};

const deleteAppointment = async (req, res) => {
    try {
        await appointmentsModel.deleteAppointment(req.params.id);
        res.redirect("/appointments");
    } catch (error) {
        console.error("Error al eliminar cita:", error);
        res.status(500).send("Error al eliminar cita");
    }
};

export default { getAppointments, showCreateForm, createAppointment, showEditForm, editAppointment, deleteAppointment };
