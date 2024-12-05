import db from "../../db/database.js";

const getAllServices = () => {
    return new Promise((resolve, reject) => {
        db.all(
            "SELECT * FROM services ORDER BY name ASC",
            [],
            (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            }
        );
    });
};

const getServiceById = (id) => {
    return new Promise((resolve, reject) => {
        db.get(
            "SELECT * FROM services WHERE id = ?",
            [id],
            (err, row) => {
                if (err) reject(err);
                else resolve(row);
            }
        );
    });
};

const addService = (service) => {
    return new Promise((resolve, reject) => {
        const { name, description, price } = service;
        db.run(
            "INSERT INTO services (name, description, price) VALUES (?, ?, ?)",
            [name, description, price],
            function (err) {
                if (err) reject(err);
                else resolve(this.lastID);
            }
        );
    });
};

const updateService = (id, service) => {
    return new Promise((resolve, reject) => {
        const { name, description, price } = service;
        db.run(
            "UPDATE services SET name = ?, description = ?, price = ? WHERE id = ?",
            [name, description, price, id],
            function (err) {
                if (err) reject(err);
                else resolve(this.changes);
            }
        );
    });
};

const deleteService = (id) => {
    return new Promise((resolve, reject) => {
        db.run("DELETE FROM services WHERE id = ?", [id], function (err) {
            if (err) reject(err);
            else resolve(this.changes);
        });
    });
};

export default { getAllServices, getServiceById, addService, updateService, deleteService };
