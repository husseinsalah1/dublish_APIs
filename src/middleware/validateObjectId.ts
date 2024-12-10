// src/middlewares/validateObjectId.ts

import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import i18n from "../config/i18nConfig";
import { BadRequestException } from "../exceptions/bad-requests";
import { ErrorCodes } from "../exceptions/root";

/**
 * Middleware to validate MongoDB ObjectId in request parameters, body, or query.
 *
 * @param idPath - The key path to extract the ObjectId from (default: '_id').
 * @returns Express middleware function.
 */
const validateObjectId = (idPath: string = "_id") => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const _id: string | undefined = req.params[idPath] || req.body[idPath] || (req.query[idPath] as string | undefined);

    if (_id && !mongoose.Types.ObjectId.isValid(_id)) {
      return next(new BadRequestException(i18n.__("errors.invalidObjectId"), ErrorCodes.INVALID_OBJECT_ID));
    }

    next();
  };
};

export default validateObjectId;
