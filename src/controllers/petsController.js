import petsModel from "../models/petsModel.js";
import clientsModel from "../models/clientsModel.js";

const getPets = async (req, res) => {
    try {
        const pets = await petsModel.getAllPets();
        res.render("pets/index", { pets });
    } catch (error) {
        console.error("Error al obtener mascotas:", error);
        res.status(500).send("Error al obtener mascotas");
    }
};

const showCreateForm = async (req, res) => {
    try {
        const clients = await clientsModel.getAllClients();
        res.render("pets/form", { pet: null, clients });
    } catch (error) {
        console.error("Error al cargar el formulario de creación:", error);
        res.status(500).send("Error al cargar el formulario de creación");
    }
};

const createPet = async (req, res) => {
    try {
        await petsModel.addPet(req.body);
        res.redirect("/pets");
    } catch (error) {
        console.error("Error al agregar mascota:", error);
        res.status(500).send("Error al agregar mascota");
    }
};

const showEditForm = async (req, res) => {
    try {
        const pet = await petsModel.getPetById(req.params.id);
        const clients = await clientsModel.getAllClients();
        if (!pet) {
            return res.status(404).send("Mascota no encontrada");
        }
        res.render("pets/form", { pet, clients });
    } catch (error) {
        console.error("Error al cargar formulario de edición:", error);
        res.status(500).send("Error al cargar formulario de edición");
    }
};

const editPet = async (req, res) => {
    try {
        await petsModel.updatePet(req.params.id, req.body);
        res.redirect("/pets");
    } catch (error) {
        console.error("Error al actualizar mascota:", error);
        res.status(500).send("Error al actualizar mascota");
    }
};

const deletePet = async (req, res) => {
    try {
        await petsModel.deletePet(req.params.id);
        res.redirect("/pets");
    } catch (error) {
        console.error("Error al eliminar mascota:", error);
        res.status(500).send("Error al eliminar mascota");
    }
};

export default { getPets, showCreateForm, createPet, showEditForm, editPet, deletePet };