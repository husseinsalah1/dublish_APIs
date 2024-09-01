import i18n from "../config/i18nConfig";
import { NotFoundException } from "../exceptions/not-found-exception";
import { ErrorCodes } from "../exceptions/root";
import { adminModel, IAdmin } from "../models/Admin";
import AdminRepository from "../repositories/AdminRepository";
import bcrypt from "bcrypt";
import { FilterQuery, ProjectionType, QueryOptions } from "mongoose";

class AdminService {
  public adminRepository: AdminRepository;

  constructor() {
    this.adminRepository = new AdminRepository();
  }
  async findByEmail(email: string): Promise<IAdmin | null> {
    const admin = await this.adminRepository.findByEmail(email);
    return admin;
  }

  async findByUsername(username: string): Promise<IAdmin | null> {
    const admin = await this.adminRepository.findByUsername(username);
    return admin;
  }

  async findByPhone(phone: string): Promise<IAdmin | null> {
    const admin = await this.adminRepository.findByPhone(phone);
    return admin;
  }

  async comparePassword(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    const isMatch = await bcrypt.compare(password, hashedPassword);

    return isMatch;
  }

  async login(email: string, password: string, locale: string) {
    // Login logic here
    const admin = await this.findByEmail(email);
    if (!admin) {
      throw new NotFoundException(
        i18n.__("errors.notFound"),
        ErrorCodes.NOT_FOUND
      );
    }

    const isMatch = await this.comparePassword(password, admin.password);
    if (!isMatch) {
      throw new NotFoundException(
        i18n.__("errors.invalidPassword"),
        ErrorCodes.NOT_FOUND
      );
    }

    const token = await admin.generateAuthToken();

    return {
      success: true,
      code: 200,
      result: {
        ...admin.toJSON(),
        name: admin.name[locale],
      },
      token,
    };
  }

  async createAdmin(formObject: IAdmin, locale: string) {
    await this.checkUniqueFields(formObject);

    const newAdmin = await this.adminRepository.create(formObject);

    return {
      success: true,
      code: 200,
      result: {
        ...newAdmin.toJSON(),
        name: newAdmin.name[locale],
      },
    };
  }
  async checkUniqueFields(formObject: IAdmin) {
    const emailAdmin = await this.findByEmail(formObject.email);
    if (emailAdmin) {
      throw new NotFoundException(
        i18n.__("errors.duplicate"),
        ErrorCodes.DUPLICATE
      );
    }

    const usernameAdmin = await this.findByUsername(formObject.username);
    if (usernameAdmin) {
      throw new NotFoundException(
        i18n.__("errors.duplicate"),
        ErrorCodes.DUPLICATE
      );
    }

    const phoneAdmin = await this.findByPhone(formObject.phone);
    if (phoneAdmin) {
      throw new NotFoundException(
        i18n.__("errors.duplicate"),
        ErrorCodes.DUPLICATE
      );
    }
  }
  async listAdmins(
    filterObject: FilterQuery<IAdmin>,
    projectionObject?: ProjectionType<IAdmin> | null,
    optionsObject?: QueryOptions
  ): Promise<{ success: boolean; code: number; result: IAdmin[] }> {
    const resultObject = await this.adminRepository.findAll(
      filterObject,
      projectionObject,
      optionsObject,
      "permissions"
    );

    return {
      success: true,
      code: 200,
      result: resultObject,
    };
  }

  async getAdmin(filterObject: FilterQuery<IAdmin>) {
    const resultObject = await this.adminRepository.findOne(
      filterObject,
      "permissions"
    );

    if (!resultObject) {
      throw new NotFoundException(
        i18n.__("errors.notFound"),
        ErrorCodes.NOT_FOUND
      );
    }

    return {
      success: true,
      code: 200,
      result: resultObject,
    };
  }
}

export default AdminService;
