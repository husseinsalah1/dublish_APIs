import express from "express";
import customErrorHandler from "../../error-handler";
import StudentController from "../../controllers/StudentController";
import StudentService from "../../services/StudentService";
import StudentRepository from "../../repositories/StudentRepository";
const studentService = new StudentService(new StudentRepository());
const studentController = new StudentController(studentService);

const router = express.Router();

router.post("/create", customErrorHandler(studentController.createStudent));
router.route("/update").put(customErrorHandler(studentController.updateStudent));
router.route("/list").get(customErrorHandler(studentController.findAll({ path: "", select: "" })));
router.route("/get").get(customErrorHandler(studentController.findOne));
router.delete("/delete", customErrorHandler(studentController.delete));
export default router;
