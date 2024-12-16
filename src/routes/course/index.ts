import express from "express";
import CourseController from "../../controllers/CourseController";
import customErrorHandler from "../../error-handler";
import authMiddleware, { verifyPermissions } from "../../middleware/authorizeMiddleware";
import { createCourseValidation } from "../../validations/courseValidation";
import validationSchema from "../../middleware/validationSchema";
import upload from "../../middleware/multer";

const router = express.Router();
const allowedRoles = ["superAdmin", "admin"];

router.route("/get").get(customErrorHandler(CourseController.findOne));
router.route("/list").get(customErrorHandler(CourseController.findAll({ path: "createdBy", select: "" })));
router.route("/update").put([authMiddleware(allowedRoles), verifyPermissions, upload.single("image")], customErrorHandler(CourseController.updateCourse));
router.route("/delete").delete([authMiddleware(allowedRoles), verifyPermissions], customErrorHandler(CourseController.delete));
router.route("/create").post([authMiddleware(allowedRoles), verifyPermissions, upload.single("image")], customErrorHandler(CourseController.createCourse));

export default router;
