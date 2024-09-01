import i18n from "../config/i18nConfig";
import { BadRequestException } from "../exceptions/bad-requests";
import { ErrorCodes } from "../exceptions/root";
import roleModel, { IRole } from "../models/Role";
import RoleRepository from "../repositories/RoleRepository";
import validatePermission from "./../helper/permissionHelper";

class RoleService {
  public roleRepository: RoleRepository;

  constructor() {
    this.roleRepository = new RoleRepository();
  }

  // Create a new role
  async createRole(formObject: IRole, locale: string) {
    const validatePermissionResult = validatePermission(
      formObject.permissions as Record<string, string[]>
    );
    if (!validatePermissionResult) {
      throw new BadRequestException(
        i18n.__("errors.InvalidPermission"),
        ErrorCodes.INVALID_PERMISSIONS
      );
    }

    const role = await this.roleRepository.findOne({ name: formObject.name });
    if (role) {
      throw new BadRequestException(
        i18n.__("errors.duplicate"),
        ErrorCodes.DUPLICATE
      );
    }

    const newRole = await this.roleRepository.create(formObject);

    return {
      success: true,
      code: 200,
      result: {
        ...newRole.toJSON(),
        name: newRole.name[locale],
      },
    };
  }
}

export default RoleService;
