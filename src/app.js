import express from "express";
import path from "path";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";
import expressLayouts from "express-ejs-layouts";

import clientsRoutes from "./routes/clientsRoutes.js";
import petsRoutes from "./routes/petsRoutes.js";
import servicesRoutes from "./routes/servicesRoutes.js";
import appointmentsRoutes from "./routes/appointmentsRoutes.js";



const app = express();



// Resuelve el directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



// Configuración de EJS y layouts
app.use(expressLayouts);
app.set("layout", "layouts/layout");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));



// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../public")));



// Rutas
app.use("/clients", clientsRoutes);
app.use("/pets", petsRoutes);
app.use("/services", servicesRoutes);
app.use("/appointments", appointmentsRoutes);




export default app;
