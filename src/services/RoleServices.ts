import i18n from "../config/i18nConfig";
import { BadRequestException } from "../exceptions/bad-requests";
import { NotFoundException } from "../exceptions/not-found-exception";
import { ErrorCodes } from "../exceptions/root";
import { IRole } from "../models/Role";
import RoleRepository from "../repositories/RoleRepository";
import { convertFieldsToLowerCase, FormObject } from "../utils/custom-functions";
import BaseService from "./BaseService";

class RoleService extends BaseService<IRole> {
  private roleRepository: RoleRepository;

  constructor(roleRepository: RoleRepository) {
    super(roleRepository);
    this.roleRepository = roleRepository;
  }

  async findByName(key: string, name: string): Promise<IRole | null> {
    return this.roleRepository.findRoleByName(key, name);
  }
  async createRole(data: Partial<IRole> | any, locale: string) {
    const { name } = data;
    const existingRole = await this.findByName(`name.en`, name[locale]);

    if (existingRole) {
      throw new BadRequestException(i18n.__(" duplicate"), ErrorCodes.DUPLICATE);
    }
    data = convertFieldsToLowerCase(data as FormObject, ["name.en"]);
    const createOperation = await this.create(data);
    return {
      success: true,
      code: 201,
      result: {
        ...createOperation.toJSON(),
        name: createOperation.name[locale],
      },
    };
  }

  async updateRole(_id: string, data: Partial<IRole> | any, locale: string) {
    data = convertFieldsToLowerCase(data as FormObject, ["name.en"]);

    const updateOperation = await this.update(_id, data);
    if (!updateOperation) {
      throw new NotFoundException(i18n.__(" notFound"), ErrorCodes.NOT_FOUND);
    }
    return {
      success: true,
      code: 200,
      result: updateOperation,
    };
  }
}

export default RoleService;
