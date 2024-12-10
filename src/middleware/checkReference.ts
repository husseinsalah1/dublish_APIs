import { Request, Response, NextFunction } from "express";
import mongoose, { Model, Document } from "mongoose";
import { NotFoundException } from "../exceptions/not-found-exception";
import i18n from "../config/i18nConfig";
import { ErrorCodes } from "../exceptions/root";
import { BadRequestException } from "../exceptions/bad-requests";
import InternalException from "../exceptions/internal-exception";

const checkReference = <T extends Document>(model: Model<T>, fieldName: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const id = req.body[fieldName];

    if (!mongoose.Types.ObjectId.isValid(id)) return next(new BadRequestException(i18n.__("errors.invalidReferenceId"), ErrorCodes.INVALID_REFERENCE));

    if (!id) {
      return next(new BadRequestException(i18n.__("errors.invalidReferenceId"), ErrorCodes.INVALID_REFERENCE));
    }

    try {
      const reference = await model.findById(id).exec();
      if (!reference) {
        return next(new NotFoundException(i18n.__("errors.referenceIdNotFound"), ErrorCodes.NOT_FOUND));
      }
      next();
    } catch (err: any) {
      return next(new InternalException(i18n.__("errors.internalServerError"), err.message, ErrorCodes.INTERNAL_EXCEPTION));
    }
  };
};

export default checkReference;
