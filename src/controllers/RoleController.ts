import { IRole } from "../models/Role";
import RoleService from "../services/RoleServices";
import BaseController from "./BaseController";
import { Request, Response } from "express";
class RoleController extends BaseController<IRole> {
  constructor(service: RoleService) {
    super(service);
  }

  createRole = async (req: Request, res: Response) => {
    const locale = req.locale;
    const result = await (this.service as RoleService).createRole(
      req.body,
      locale
    );
    res.status(201).json(result);
  };

  updateRole = async (req: Request, res: Response) => {
    const locale = req.locale;
    const result = await (this.service as RoleService).updateRole(
      req.query._id as string,
      req.body,
      locale
    );
    res.status(200).json(result);
  };
}

export default RoleController;
