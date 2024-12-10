import { NextFunction, Request, Response } from "express";
import BaseController from "./BaseController";
import AdminService from "../services/AdminService";
import { IAdmin } from "../models/Admin";
import { NotFoundException } from "../exceptions/not-found-exception";
import { ErrorCodes } from "../exceptions/root";

class AdminController extends BaseController<IAdmin> {
  constructor(service: AdminService) {
    super(service);
  }

  login = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const locale = req.locale;
    const result = await (this.service as AdminService).login(email, password, locale);
    res.status(result.code).json(result);
  };

  createAdmin = async (req: Request, res: Response, next: NextFunction) => {
    const locale = req.locale;
    const result = await (this.service as AdminService).createAdmin(req.body, locale);
    res.status(result.code).json(result);
  };

  updateAdmin = async (req: Request, res: Response, next: NextFunction) => {
    const locale = req.locale;
    console.log(req.body);
    const result = await (this.service as AdminService).updateAdmin(req.query._id as string, req.body, locale);
    res.status(result.code).json(result);
  };
}

export default AdminController;
