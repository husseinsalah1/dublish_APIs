import { NextFunction, Request, Response } from "express";
import HttpException, { ErrorCodes } from "./exceptions/root";
import InternalException from "./exceptions/internal-exception";
import { ZodError } from "zod";
import { UnprocessableEntityException } from "./exceptions/validation";

const customErrorHandler = (method: Function) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await method(req, res, next);
    } catch (error: any) {
      let exception: HttpException;
      if (error instanceof HttpException) {
        exception = error;
      } else if (error instanceof ZodError) {
        exception = new UnprocessableEntityException("Unprocessable Entity", error?.issues, ErrorCodes.UNPROCESSABLE_ENTITY);
      } else {
        exception = new InternalException("Internal Server Error", error?.message, ErrorCodes.INTERNAL_EXCEPTION);
      }

      next(exception);
    }
  };
};

export default customErrorHandler;
