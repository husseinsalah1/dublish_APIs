import express from "express";
import RoleController from "../../controllers/RoleController";
import RoleRepository from "../../repositories/RoleRepository";
import RoleService from "./../../services/RoleServices";
import customErrorHandler from "../../error-handler";

const router = express.Router();
const roleService = new RoleService(new RoleRepository());
const roleController = new RoleController(roleService);

router.post("/create", customErrorHandler(roleController.createRole));
router.get("/get", customErrorHandler(roleController.findOne));
router.get("/list", customErrorHandler(roleController.findAll));
router.put("/update", customErrorHandler(roleController.updateRole));
export default router;
