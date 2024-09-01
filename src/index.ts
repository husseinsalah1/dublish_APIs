import express, { Express } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
dotenv.config();
import connection from "./config/connection";
import errorMiddleware from "./middleware/errorMiddleware";
import rootRoutes from "./routes";
import i18n from "./config/i18nConfig"; // Adjust the path to your i18nConfig file
import localeMiddleware from "./middleware/localeMiddleware";

connection.connect();

const app: Express = express();
// Constants
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(morgan("dev"));

// Initialize i18n for localization

app.use(i18n.init);
app.use(localeMiddleware);

// Routes
app.use("/v1/api", rootRoutes);

//Global Error handling middleware
app.use(errorMiddleware);

// Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
