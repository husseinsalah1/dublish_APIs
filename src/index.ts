import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
dotenv.config();
import connection from "./config/connection";
import errorMiddleware from "./middleware/errorMiddleware";
import rootRoutes from "./routes";
import i18n from "./config/i18nConfig"; // Adjust the path to your i18nConfig file
import localeMiddleware from "./middleware/localeMiddleware";
import validateObjectId from "./middleware/validateObjectId";
import corsMiddleware from "./config/cors";
import path from "path";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { swaggerOptions } from "./config/swagger";

connection.connect();

const app: Express = express();
// Constants
const PORT = process.env.PORT || 3000;
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Middlewares
app.use(corsMiddleware);
app.use(express.json());
app.use(morgan("dev"));

// Initialize i18n for localization
app.use(i18n.init);
app.use(localeMiddleware);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Configure Cloudinary Storage

app.use("/v1/api", validateObjectId("_id"), rootRoutes);

//Global Error handling middleware
app.use(errorMiddleware);
// Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
