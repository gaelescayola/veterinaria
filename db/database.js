import sqlite3 from "sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuración de la base de datos SQLite
const dbPath = path.join(__dirname, "veterinaria.db");
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error("Error al conectar con la base de datos:", err.message);
    } else {
        console.log("Conectado a la base de datos SQLite");
    }
});

// Crear tablas
export default db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS clients (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            phone TEXT NOT NULL,
            address TEXT
        );
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS pets (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            species TEXT NOT NULL,
            breed TEXT,
            age INTEGER,
            client_id INTEGER NOT NULL,
            FOREIGN KEY (client_id) REFERENCES clients (id) ON DELETE CASCADE
        );
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS services (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            description TEXT,
            price REAL NOT NULL
        );
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS appointments (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            date TEXT NOT NULL,
            time TEXT NOT NULL,
            pet_id INTEGER NOT NULL,
            service_id INTEGER NOT NULL,
            FOREIGN KEY (pet_id) REFERENCES pets (id) ON DELETE CASCADE,
            FOREIGN KEY (service_id) REFERENCES services (id) ON DELETE CASCADE
        );
    `);
});
