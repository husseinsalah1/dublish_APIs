import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import { UnprocessableEntityException } from "../exceptions/validation";
import { ErrorCodes } from "../exceptions/root";
import InternalException from "../exceptions/internal-exception";
import i18n from "./../config/i18nConfig";

interface ValidationError {
  field: string;
  message: string;
}

const validationSchema = (schema: { [key: string]: Joi.ObjectSchema }) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      i18n.setLocale(req.headers["accept-language"] || "en");

      const validationErrors: ValidationError[] = [];
      if (schema.body) {
        const { error } = schema.body.validate(req.body, {
          abortEarly: false,
          allowUnknown: true,
          stripUnknown: true,
        });

        if (error) {
          validationErrors.push(
            ...error.details.map((detail) => ({
              field: detail.context?.label || "unknown",
              message: i18n.__(detail.message),
            }))
          );
        }
      }
      if (validationErrors.length) {
        return next(new UnprocessableEntityException(i18n.__("errors.validationFieldsError"), validationErrors, ErrorCodes.UNPROCESSABLE_ENTITY));
      }
      return next();
    } catch (err: any) {
      return next(new InternalException(i18n.__("errors.internalServerError"), err.message, ErrorCodes.INTERNAL_EXCEPTION));
    }
  };
};

export default validationSchema;
