import express from "express";
import customErrorHandler from "../../error-handler";
import AdminController from "./../../controllers/AdminController";
import roleModel from "../../models/Role";
import checkReference from "../../middleware/checkReference";
import validationSchema from "../../middleware/validationSchema";
import { createAdminValidation, updateAdminValidation } from "../../validations/adminValidation";
import AdminService from "../../services/AdminService";
import AdminRepository from "../../repositories/AdminRepository";

const router = express.Router();

const adminService = new AdminService(new AdminRepository());
const adminController = new AdminController(adminService);
router.post("/create", [validationSchema(createAdminValidation), checkReference(roleModel, "permissions")], customErrorHandler(adminController.createAdmin));

router.get("/get", customErrorHandler(adminController.findOne));
router.get("/list", customErrorHandler(adminController.findAll({ path: "permissions", select: "" })));
router.put("/update", [validationSchema(updateAdminValidation)], customErrorHandler(adminController.updateAdmin));
router.delete("/delete", customErrorHandler(adminController.delete));

export default router;
