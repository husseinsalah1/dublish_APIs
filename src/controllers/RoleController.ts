import RoleService from "../services/RoleService";
import { Request, Response } from "express";
class RoleController {
  public roleService: RoleService;

  constructor() {
    this.roleService = new RoleService();
  }

  // Create a new role
  public createRole = async (req: Request, res: Response) => {
    const result = await this.roleService.createRole(req.body, req.locale);
    res.status(200).json(result);
  };
}

export default RoleController;
