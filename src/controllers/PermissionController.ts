import i18n from "../config/i18nConfig";
import { Request, Response, NextFunction } from "express";
import { permissions } from "../helper/permissionHelper";
class PermissionController {
  listPermissions = async (req: Request, res: Response, next: NextFunction) => {
    // Convert permissions to the desired format
    const convertedPermissions: { [key: string]: string[] } = {};
    for (const [key, value] of permissions) {
      convertedPermissions[key] = Array.from(value);
    }

    return res.status(200).json({
      success: true,
      code: 200,
      result: convertedPermissions,
    });
  };
}

export default PermissionController;
