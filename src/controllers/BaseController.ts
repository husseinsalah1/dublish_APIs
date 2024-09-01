import { Request, Response, NextFunction } from "express";
import BaseService from "../services/BaseService"; // Adjust the path as needed

import { Document } from "mongoose"; // Add this import statement

class BaseController<T extends Document<any, any, any>> {
  protected service: BaseService<T>;

  constructor(service: BaseService<T>) {
    this.service = service;
  }

  // Create a new record
  public create = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const data = req.body;
      const result = await this.service.create(data);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  };
}

export default BaseController;
