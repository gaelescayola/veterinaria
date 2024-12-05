import db from "../../db/database.js";

const getAllAppointments = () => {
    return new Promise((resolve, reject) => {
        db.all(
            `
            SELECT 
                appointments.*, 
                pets.name AS pet_name, 
                clients.name AS client_name, 
                services.name AS service_name
            FROM appointments
            JOIN pets ON appointments.pet_id = pets.id
            JOIN clients ON pets.client_id = clients.id
            JOIN services ON appointments.service_id = services.id
            ORDER BY appointments.date, appointments.time
            `,
            [],
            (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            }
        );
    });
};

const getAppointmentById = (id) => {
    return new Promise((resolve, reject) => {
        db.get(
            `
            SELECT * 
            FROM appointments 
            WHERE id = ?
            `,
            [id],
            (err, row) => {
                if (err) reject(err);
                else resolve(row);
            }
        );
    });
};

const addAppointment = (appointment) => {
    return new Promise((resolve, reject) => {
        const { date, time, pet_id, service_id } = appointment;
        db.run(
            `
            INSERT INTO appointments (date, time, pet_id, service_id) 
            VALUES (?, ?, ?, ?)
            `,
            [date, time, pet_id, service_id],
            function (err) {
                if (err) reject(err);
                else resolve(this.lastID);
            }
        );
    });
};

const updateAppointment = (id, appointment) => {
    return new Promise((resolve, reject) => {
        const { date, time, pet_id, service_id } = appointment;
        db.run(
            `
            UPDATE appointments 
            SET date = ?, time = ?, pet_id = ?, service_id = ?
            WHERE id = ?
            `,
            [date, time, pet_id, service_id, id],
            function (err) {
                if (err) reject(err);
                else resolve(this.changes);
            }
        );
    });
};

const deleteAppointment = (id) => {
    return new Promise((resolve, reject) => {
        db.run("DELETE FROM appointments WHERE id = ?", [id], function (err) {
            if (err) reject(err);
            else resolve(this.changes);
        });
    });
};

export default { getAllAppointments, getAppointmentById, addAppointment, updateAppointment, deleteAppointment };
