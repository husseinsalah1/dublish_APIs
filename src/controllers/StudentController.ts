import StudentService from "../services/StudentService";
import { Request, Response } from "express";
import { ErrorCodes } from "../exceptions/root";
import studentModel, { IStudent } from "../models/Student";
import BaseController from "./BaseController";
import StudentRepository from "../repositories/StudentRepository";

class StudentController extends BaseController<IStudent> {
  constructor(service: StudentService) {
    super(service);
  }

  register = async (req: Request, res: Response) => {
    const locale = req.locale;
    const result = await (this.service as StudentService).register(req.body, locale);
    res.status(result.code).json(result);
  };

  login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const locale = req.locale;
    const result = await (this.service as StudentService).login(email, password, locale);
    res.status(result.code).json(result);
  };

  createStudent = async (req: Request, res: Response) => {
    const locale = req.locale;
    const result = await (this.service as StudentService).createStudent(req.body, locale);
    res.status(201).json(result);
  };

  updateStudent = async (req: Request, res: Response) => {
    const locale = req.locale;
    const result = await (this.service as StudentService).updateStudent(req.query._id as string, req.body, locale);
    res.status(result.code).json(result);
  };
}

export default StudentController;
