import { permission } from "process";
import { NotFoundException } from "../exceptions/not-found-exception";
import { ErrorCodes } from "../exceptions/root";
import { IRole } from "../models/Role";
import AdminService from "../services/AdminService";
import { NextFunction, Request, Response } from "express";
const i18n = require("i18n");

class AdminController {
  private adminService: AdminService;

  constructor() {
    this.adminService = new AdminService();
  }

  login = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { email, password } = req.body;

    const result = await this.adminService.login(email, password, req.locale);
    res.status(result.code).json(result);
  };

  createAdmin = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const result = await this.adminService.createAdmin(req.body, req.locale);
    res.status(200).json(result);
  };

  getAdmins = async (req: Request, res: Response): Promise<Response> => {
    const filterObject = req.query.filter
      ? JSON.parse(req.query.filter as string)
      : {};
    const projectionObject = req.query.projection
      ? JSON.parse(req.query.projection as string)
      : null;
    const optionsObject = req.query.options
      ? JSON.parse(req.query.options as string)
      : {};

    const result = await this.adminService.listAdmins(
      filterObject,
      projectionObject,
      optionsObject
    );

    const localizedResult = result.result.map((admin) => ({
      ...admin.toJSON(),
      name: admin.name[req.locale] || admin.name["en"],
      permissions: admin.permissions && {
        ...admin.permissions.toJSON(),
        name:
          admin.permissions.name[req.locale] || admin.permissions.name["en"],
      },
    }));

    // Send the response back to the client
    return res.status(result.code).json(localizedResult);
  };

  getAdmin = async (req: Request, res: Response): Promise<Response> => {
    const filterObject = req.query;
    const result = await this.adminService.getAdmin(filterObject);

    const localizedResult = {
      ...result.result.toJSON(),
      name: result.result.name[req.locale] || result.result.name["en"],
      permissions: {
        ...result.result.permissions.toJSON(),
        name:
          result.result.permissions.name[req.locale] ||
          result.result.permissions.name["en"],
      },
    };

    return res.status(200).json(localizedResult);
  };
}

export default AdminController;
