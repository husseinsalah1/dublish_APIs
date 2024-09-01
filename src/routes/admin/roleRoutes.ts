import express from "express";
import RoleController from "../../controllers/RoleController";
import customErrorHandler from "../../error-handler";

const router = express.Router();

const roleController = new RoleController();

router.post("/create", customErrorHandler(roleController.createRole));
export default router;
