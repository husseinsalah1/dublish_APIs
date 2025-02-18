import express from "express";
import AdminController from "../../controllers/AdminController";
import customErrorHandler from "../../error-handler";
import AdminService from "../../services/AdminService";
import AdminRepository from "../../repositories/AdminRepository";
import { swaggerDefinitions } from "./../../docs/swagger-docs";

const router = express.Router();

const adminService = new AdminService(new AdminRepository());
const adminController = new AdminController(adminService);

router.post("/login", customErrorHandler(adminController.login));

export default router;
