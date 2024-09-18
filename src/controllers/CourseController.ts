import { NextFunction, Request, Response } from "express";
import BaseController from "./BaseController";
import CourseService from "./../services/CourseService";
import { ICourse } from "../models/Course";
import CourseRepository from "../repositories/CourseRepository";

class CourseController extends BaseController<ICourse> {
  constructor(service: CourseService) {
    super(service);
  }

  createCourse = async (req: Request & { tokenData: { _id: string } }, res: Response, next: NextFunction) => {
    const locale = req.locale;
    const formObject = {
      ...req.body,
      createdBy: req.tokenData._id,
    };
    const result = await (this.service as CourseService).createCourse(formObject, locale);
    res.status(result.code).json(result);
  };

  updateCourse = async (req: Request & { tokenData: { _id: string } }, res: Response, next: NextFunction) => {
    const result = await (this.service as CourseService).updateCourse(req.query._id as string, req.body, req.locale);
    res.status(result.code).json(result);
  };
}

export default new CourseController(new CourseService(new CourseRepository()));
