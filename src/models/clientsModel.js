import db from "../../db/database.js";

const getAllClients = () => {
    return new Promise((resolve, reject) => {
        db.all("SELECT * FROM clients", [], (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
};

const getClientById = (id) => {
    return new Promise((resolve, reject) => {
        db.get("SELECT * FROM clients WHERE id = ?", [id], (err, row) => {
            if (err) reject(err);
            else resolve(row);
        });
    });
};

const addClient = (client) => {
    return new Promise((resolve, reject) => {
        const { name, email, phone, address } = client;
        db.run(
            "INSERT INTO clients (name, email, phone, address) VALUES (?, ?, ?, ?)",
            [name, email, phone, address],
            function (err) {
                if (err) reject(err);
                else resolve(this.lastID);
            }
        );
    });
};

const updateClient = (id, client) => {
    return new Promise((resolve, reject) => {
        const { name, email, phone, address } = client;
        db.run(
            "UPDATE clients SET name = ?, email = ?, phone = ?, address = ? WHERE id = ?",
            [name, email, phone, address, id],
            function (err) {
                if (err) reject(err);
                else resolve(this.changes);
            }
        );
    });
};

const deleteClient = (id) => {
    return new Promise((resolve, reject) => {
        db.run("DELETE FROM clients WHERE id = ?", [id], function (err) {
            if (err) reject(err);
            else resolve(this.changes);
        });
    });
};

export default { getAllClients, getClientById, addClient, updateClient, deleteClient };
