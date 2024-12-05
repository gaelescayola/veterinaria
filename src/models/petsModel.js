import db from "../../db/database.js";

const getAllPets = () => {
    return new Promise((resolve, reject) => {
        db.all(
            `
            SELECT pets.*, clients.name AS client_name
            FROM pets
            JOIN clients ON pets.client_id = clients.id
            ORDER BY pets.name ASC
            `,
            [],
            (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            }
        );
    });
};

const getPetById = (id) => {
    return new Promise((resolve, reject) => {
        db.get(
            `
            SELECT pets.*, clients.name AS client_name
            FROM pets
            JOIN clients ON pets.client_id = clients.id
            WHERE pets.id = ?
            `,
            [id],
            (err, row) => {
                if (err) reject(err);
                else resolve(row);
            }
        );
    });
};

const addPet = (pet) => {
    return new Promise((resolve, reject) => {
        const { name, species, breed, age, client_id } = pet;
        db.run(
            "INSERT INTO pets (name, species, breed, age, client_id) VALUES (?, ?, ?, ?, ?)",
            [name, species, breed, age, client_id],
            function (err) {
                if (err) reject(err);
                else resolve(this.lastID);
            }
        );
    });
};

const updatePet = (id, pet) => {
    return new Promise((resolve, reject) => {
        const { name, species, breed, age, client_id } = pet;
        db.run(
            `
            UPDATE pets
            SET name = ?, species = ?, breed = ?, age = ?, client_id = ?
            WHERE id = ?
            `,
            [name, species, breed, age, client_id, id],
            function (err) {
                if (err) reject(err);
                else resolve(this.changes);
            }
        );
    });
};

const deletePet = (id) => {
    return new Promise((resolve, reject) => {
        db.run("DELETE FROM pets WHERE id = ?", [id], function (err) {
            if (err) reject(err);
            else resolve(this.changes);
        });
    });
};

export default { getAllPets, getPetById, addPet, updatePet, deletePet };
