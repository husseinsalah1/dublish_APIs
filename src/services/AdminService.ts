import AdminRepository from "../repositories/AdminRepository";
import BaseService from "./BaseService";
import { IAdmin } from "../models/Admin";
import bcrypt from "bcrypt";
import { NotFoundException } from "../exceptions/not-found-exception";
import { ErrorCodes } from "../exceptions/root";
import i18n from "../config/i18nConfig";
import { convertFieldsToLowerCase, FormObject } from "../utils/custom-functions";

// AdminService class extending BaseService
class AdminService extends BaseService<IAdmin> {
  private adminRepository: AdminRepository;

  constructor(adminRepository: AdminRepository) {
    super(adminRepository);
    this.adminRepository = adminRepository;
  }

  // ===================== Helper Methods ===================== //
  async findByEmail(email: string): Promise<IAdmin | null> {
    return this.adminRepository.findByEmail(email);
  }

  async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
  }

  // ===================== Authentication ===================== //
  /**
   * Authenticates an admin user by email and password.
   *
   * @param {string} email - The email address of the admin user attempting to log in.
   * @param {string} password - The plain text password provided by the admin user.
   * @param {string} locale - The locale used to localize the admin user's name in the response.
   * @returns {Promise<{ success: boolean; code: number; result: object; token: string }>}
   * An object containing a success flag, HTTP status code, admin user details, and authentication token.
   * @throws {NotFoundException} Throws an error if the admin user is not found or if the password is invalid.
   */
  async login(email: string, password: string, locale: string) {
    const admin = await this.findByEmail(email);
    if (!admin) {
      throw new NotFoundException(i18n.__("notFound"), ErrorCodes.NOT_FOUND);
    }
    const isMatch = await this.comparePassword(password, admin.password);
    if (!isMatch) {
      throw new NotFoundException(i18n.__("invalidPassword"), ErrorCodes.INVALID_PASSWORD);
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

  // ===================== Admins Methods ===================== //

  /**
   * Creates a new admin user with the provided data.
   *
   * @param {Partial<IAdmin>} data - The data for the new admin user, including email, username, and other optional fields.
   * @param {string} locale - The locale used to localize the admin user's name in the response.
   * @returns {Promise<{ success: boolean; code: number; result: object }>}
   * An object containing a success flag, HTTP status code, and details of the newly created admin user.
   * @throws {NotFoundException} Throws an error if the email or username is already in use.
   */
  async createAdmin(data: Partial<IAdmin>, locale: string) {
    const { email, username } = data;

    const existingAdmin = await this.findByEmail(email?.toLocaleLowerCase() as string);
    console.log(existingAdmin);
    const existingUsername = await this.adminRepository.findByUsername(username?.toLocaleLowerCase() as string);
    if (existingAdmin || existingUsername) {
      throw new NotFoundException(i18n.__("duplicate"), ErrorCodes.DUPLICATE);
    }

    data = convertFieldsToLowerCase(data as FormObject, ["email", "username"]);
    const createOperation = await this.create(data);
    return {
      success: true,
      code: 200,
      result: {
        ...createOperation.toJSON(),
        name: createOperation.name[locale],
      },
    };
  }

  /**
   * Updates an existing admin user's information based on the provided data.
   *
   * This method performs the following steps:
   * 1. Converts the email and username fields to lowercase to ensure consistency.
   * 2. If an email is provided, checks if another admin user with the same email already exists.
   *    - If a different admin user with the same email exists, throws a `NotFoundException` with a duplicate error message and code.
   * 3. If a username is provided, checks if another admin user with the same username already exists.
   *    - If a different admin user with the same username exists, throws a `NotFoundException` with a duplicate error message and code.
   * 4. Updates the admin user's information in the database.
   * 5. Returns a success response with the updated admin user details.
   *
   * @param {string} _id - The unique identifier of the admin user to update.
   * @param {Partial<IAdmin>} data - The updated data for the admin user, including optional fields like email and username.
   * @param {string} locale - The locale used to localize any required fields in the response.
   * @returns {Promise<{ success: boolean; code: number; result: object }>}
   * An object containing a success flag, HTTP status code, and the updated admin user details.
   * @throws {NotFoundException} Throws an error if a different admin user with the same email or username already exists.
   */
  async updateAdmin(_id: string, data: Partial<IAdmin>, locale: string) {
    data = convertFieldsToLowerCase(data as FormObject, ["email", "username"]);
    const { email, username } = data;

    if (email) {
      const existingAdmin = await this.findByEmail(email as string);
      if (existingAdmin && existingAdmin._id.toString() !== _id) {
        throw new NotFoundException(i18n.__("duplicate"), ErrorCodes.DUPLICATE);
      }
    }

    if (username) {
      const existingUsername = await this.adminRepository.findByUsername(username as string);
      if (existingUsername && existingUsername._id.toString() !== _id) {
        throw new NotFoundException(i18n.__("duplicate"), ErrorCodes.DUPLICATE);
      }
    }

    const updateOperation = await this.update(_id, data);

    return {
      success: true,
      code: 200,
      result: updateOperation,
    };
  }
}

export default AdminService;
