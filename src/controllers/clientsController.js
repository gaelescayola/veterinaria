import clientsModel from "../models/clientsModel.js";

const getClients = async (req, res) => {
    try {
        const clients = await clientsModel.getAllClients();
        res.render("clients/index", { clients });
    } catch (error) {
        console.error("Error al obtener clientes:", error);
        res.status(500).send("Error al obtener clientes");
    }
};

const showCreateForm = (req, res) => {
    res.render("clients/form", { client: null }); // Enviar `client` como null para un nuevo cliente
};


const createClient = async (req, res) => {
    try {
        await clientsModel.addClient(req.body);
        res.redirect("/clients");
    } catch (error) {
        console.error("Error al agregar cliente:", error);
        res.status(500).send("Error al agregar cliente");
    }
};

const showEditForm = async (req, res) => {
    try {
        const client = await clientsModel.getClientById(req.params.id);
        res.render("clients/form", { client });
    } catch (error) {
        console.error("Error al cargar formulario de edición:", error);
        res.status(500).send("Error al cargar formulario de edición");
    }
};

const editClient = async (req, res) => {
    try {
        await clientsModel.updateClient(req.params.id, req.body);
        res.redirect("/clients");
    } catch (error) {
        console.error("Error al actualizar cliente:", error);
        res.status(500).send("Error al actualizar cliente");
    }
};

const deleteClient = async (req, res) => {
    try {
        await clientsModel.deleteClient(req.params.id);
        res.redirect("/clients");
    } catch (error) {
        console.error("Error al eliminar cliente:", error);
        res.status(500).send("Error al eliminar cliente");
    }
};

export default { getClients, showCreateForm, createClient, showEditForm, editClient, deleteClient };
