import express from "express";
import PermissionController from "../../controllers/PermissionController";

const router = express.Router();
const permissionController = new PermissionController();

router.get("/list", permissionController.listPermissions);

export default router;
