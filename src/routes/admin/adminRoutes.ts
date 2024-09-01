import express from "express";
import customErrorHandler from "../../error-handler";
import AdminController from "./../../controllers/AdminController";
import roleModel from "../../models/Role";
import checkReference from "../../middleware/checkReference";
import validationSchema from "../../middleware/validationSchema";
import localeMiddleware from "../../middleware/localeMiddleware";
import i18n from "../../config/i18nConfig";
import { createAdminValidation } from "../../validations/adminValidation";

const router = express.Router();

const adminController = new AdminController();

router.post(
  "/create",
  checkReference(roleModel, "permissions"),
  validationSchema(createAdminValidation),
  customErrorHandler(adminController.createAdmin)
);

router.get("/list", customErrorHandler(adminController.getAdmins));
router.get("/get", customErrorHandler(adminController.getAdmin));
export default router;
