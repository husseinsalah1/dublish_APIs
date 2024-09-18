import express from "express";
import StudentController from "../../controllers/StudentController";
import customErrorHandler from "../../error-handler";
import StudentService from "./../../services/StudentService";
import StudentRepository from "./../../repositories/StudentRepository";

const router = express.Router();

const studentService = new StudentService(new StudentRepository());
const studentController = new StudentController(studentService);

router.post("/auth/register", customErrorHandler(studentController.register));
router.post("/auth/login", customErrorHandler(studentController.login));

export default router;
