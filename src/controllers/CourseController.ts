import { NextFunction, Request, Response } from "express";
import BaseController from "./BaseController";
import CourseService from "./../services/CourseService";
import { ICourse } from "../models/Course";
import CourseRepository from "../repositories/CourseRepository";
import cloudinary from "../config/cloudinary";
import validationSchema from "../middleware/validationSchema";
import { createCourseValidation } from "../validations/courseValidation";

class CourseController extends BaseController<ICourse> {
  constructor(service: CourseService) {
    super(service);
  }

  createCourse = async (req: Request & { tokenData: { _id: string } }, res: Response, next: NextFunction) => {
    const locale = req.locale;
    let filePath: string;
    let uploadResult;
    if (req.file) {
      filePath = req.file.path; // Path of the uploaded image on the server
      uploadResult = await cloudinary.uploader.upload(filePath, {
        public_id: req.file.originalname.split(".")[0], // Use the file name as public ID
      });
    }

    const formObject = {
      ...req.body,
      image: {
        url: uploadResult?.url || "",
        publicId: uploadResult?.public_id || "",
      },
    };
    let image = formObject.image; // Store the image field from the formObject
    delete formObject.image; // Remove the image field from the formObject

    // Parsed all formObject values
    for (const key in formObject) {
      if (formObject[key] === "true") {
        formObject[key] = true;
      } else if (formObject[key] === "false") {
        formObject[key] = false;
      } else if (!isNaN(Number(formObject[key]))) {
        formObject[key] = Number(formObject[key]);
      }
    }
    formObject.name = JSON.parse(formObject.name);
    formObject.description = JSON.parse(formObject.description);
    formObject.about = JSON.parse(formObject.about);
    formObject.duration = JSON.parse(formObject.duration);
    formObject.category = JSON.parse(formObject.category);
    formObject.createdBy = req.tokenData._id;

    const result = await (this.service as CourseService).createCourse(
      {
        ...formObject,
        image,
      },
      locale
    );
    res.status(result.code).json(result);
  };

  updateCourse = async (req: Request & { tokenData: { _id: string } }, res: Response, next: NextFunction) => {
    const result = await (this.service as CourseService).updateCourse(req.query._id as string, req.body, req.locale);
    res.status(result.code).json(result);
  };
}

export default new CourseController(new CourseService(new CourseRepository()));
