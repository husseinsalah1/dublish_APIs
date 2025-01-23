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
      filePath = req.file.path;
      uploadResult = await cloudinary.uploader.upload(filePath, {
        public_id: req.file.originalname.split(".")[0],
      });
    }
    const formObject = {
      ...req.body,
      image: {
        url: uploadResult?.url || "",
        publicId: uploadResult?.public_id || "",
      },
      createdBy: req.tokenData._id,
    };
    let image = formObject.image;
    delete formObject.image;

    for (const key in formObject) {
      if (formObject[key] === "true") {
        formObject[key] = true;
      } else if (formObject[key] === "false") {
        formObject[key] = false;
      } else if (!isNaN(Number(formObject[key]))) {
        formObject[key] = Number(formObject[key]);
      }
    }

    formObject.name = typeof formObject.name === "string" ? JSON.parse(formObject.name) : formObject.name;
    formObject.description = typeof formObject.description === "string" ? JSON.parse(formObject.description) : formObject.description;
    formObject.about = typeof formObject.about === "string" ? JSON.parse(formObject.about) : formObject.about;
    formObject.duration = typeof formObject.duration === "string" ? JSON.parse(formObject.duration) : formObject.duration;
    formObject.category = typeof formObject.category === "string" ? JSON.parse(formObject.category) : formObject.category;
    formObject.hours = typeof formObject.hours === "string" ? JSON.parse(formObject.hours) : formObject.hours;
    formObject.classes = typeof formObject.classes === "string" ? JSON.parse(formObject.classes) : formObject.classes;
    formObject.price = typeof formObject.price === "string" ? JSON.parse(formObject.price) : formObject.price;

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
    const { isHasOffer } = req.body;
    if (isHasOffer === "false" || isHasOffer === false) {
      console.log("isHasOffer", isHasOffer);
      req.body.offerPercentage = 0;
      req.body.offerDuration = { start: null, end: null };
    }
    let filePath: string;
    let uploadResult;
    let updatedData = {
      ...req.body,
    };

    if (req.file) {
      filePath = req.file.path;
      uploadResult = await cloudinary.uploader.upload(filePath, {
        public_id: req.file.originalname.split(".")[0],
      });
      updatedData = {
        ...req.body,
        image: {
          url: uploadResult?.url || "",
          publicId: uploadResult?.public_id || "",
        },
      };
    }

    const result = await (this.service as CourseService).updateCourse(req.query._id as string, updatedData, req.locale);
    res.status(result.code).json(result);
  };
}

export default new CourseController(new CourseService(new CourseRepository()));
