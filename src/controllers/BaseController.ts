import { NextFunction, Request, Response } from "express";
import BaseService from "../services/BaseService";
import { Document } from "mongoose";
import { NotFoundException } from "../exceptions/not-found-exception";
import i18n from "../config/i18nConfig";
import { ErrorCodes } from "../exceptions/root";

abstract class BaseController<T extends Document> {
  protected service: BaseService<T>;

  constructor(service: BaseService<T>) {
    this.service = service;
  }

  findAll = async (req: Request, res: Response) => {
    const findObject = req.query.findObject ? JSON.parse(req.query.findObject as string) : {};
    const selectionObject = req.query.selectionObject ? JSON.parse(req.query.selectionObject as string) : {};
    const sortObject = req.query.sortObject ? JSON.parse(req.query.sortObject as string) : {};
    const pageNumber = parseInt(req.query.page as string, 10) || 1;
    const limitNumber = parseInt(req.query.limit as string, 10) || 10;
    const options = {
      selectionObject,
      sortObject,
      pageNumber,
      limitNumber,
    };
    const result = (await this.service.findAll(findObject, options)) as any;

    return res.status(result.code).json(result);
  };

  findOne = async (req: Request, res: Response, next: NextFunction) => {
    const result = (await this.service.findOne({ _id: req.query._id })) as any;
    if (!result) {
      return next(new NotFoundException(i18n.__("errors.notFound"), ErrorCodes.NOT_FOUND));
    }
    return res.status(result.code).json(result);
  };

  async update(req: Request, res: Response): Promise<Response> {
    const data = await this.service.update(req.params.id, req.body);
    if (!data) {
      return res.status(404).json({ message: "Not found" });
    }
    return res.status(200).json(data);
  }

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const data = await this.service.create(req.body);
      return res.status(201).json(data);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  delete = async (req: Request, res: Response, next: NextFunction) => {
    const result = (await this.service.delete(req.query._id as string)) as any;
    if (!result) {
      return next(new NotFoundException(i18n.__("errors.notFound"), ErrorCodes.NOT_FOUND));
    }
    return res.status(result.code).json(result);
  };
}

export default BaseController;
