import { Response, Request, NextFunction } from "express";
import { ZodError } from "zod";
import HttpException, { ErrorCodes } from "./exceptions/root";
import { UnprocessableEntityException } from "./exceptions/validation";
import InternalException from "./exceptions/internal-exception";

const customErrorHandler = (method: Function) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await method(req, res, next);
    } catch (error: any) {
      let exception: HttpException;
      if (error instanceof HttpException) {
        exception = error;
      } else if (error instanceof ZodError) {
        exception = new UnprocessableEntityException(
          "Unprocessable Entity",
          error?.issues,
          ErrorCodes.UNPROCESSABLE_ENTITY
        );
      } else {
        exception = new InternalException(
          "Internal Exception",
          error.message,
          ErrorCodes.INTERNAL_EXCEPTION
        );
      }

      next(exception);
    }
  };
};

export default customErrorHandler;
