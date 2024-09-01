import express from "express";
import AdminController from "../../controllers/AdminController";
import customErrorHandler from "../../error-handler";

const router = express.Router();
// const adminController = new AdminController();

// router.post("/login", customErrorHandler(adminController.login));

export default router;
