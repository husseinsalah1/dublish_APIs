import i18n from "../config/i18nConfig";
import { NotFoundException } from "../exceptions/not-found-exception";
import { ErrorCodes } from "../exceptions/root";
import { ICourse } from "../models/Course";
import CourseRepository from "../repositories/CourseRepository";
import {
  convertFieldsToLowerCase,
  FormObject,
} from "../utils/custom-functions";
import BaseService from "./BaseService";

class CourseService extends BaseService<ICourse> {
  private courseRepository: CourseRepository;

  constructor(courseRepository: CourseRepository) {
    super(courseRepository);
    this.courseRepository = courseRepository;
  }

  async findCourseByName(key: string, name: string) {
    return this.courseRepository.findCourseByName(key, name);
  }

  // ===================== Courses Methods ===================== //
  /**
   * Creates a new course with the provided data.
   *
   * @param {Partial<ICourse>} data - The data for the new course, including localized name fields.
   * @param {string} locale - The locale used for any language-specific operations or localization.
   * @returns {Promise<{ success: boolean; code: number; result: object }>}
   * An object containing a success flag, HTTP status code, and the newly created course details.
   * @throws {NotFoundException} Throws an error if a course with the same name already exists.
   */
  async createCourse(data: Partial<ICourse>, locale: string) {
    data = convertFieldsToLowerCase(data as FormObject, ["name.en"]);
    const { name } = data;
    const existingCourse = await this.findCourseByName("name.en", name!.en);

    if (existingCourse) {
      throw new NotFoundException(
        i18n.__("errors.duplicate"),
        ErrorCodes.DUPLICATE
      );
    }

    const createOperation = await this.create(data);
    return {
      success: true,
      code: 200,
      result: {
        ...createOperation.toJSON(),
      },
    };
  }

  /**
   * Updates an existing course with the provided data.
   *
   * @param {string} _id - The unique identifier of the course to update.
   * @param {Partial<ICourse>} data - The updated data for the course, including localized name fields.
   * @param {string} locale - The locale used for any language-specific operations or localization.
   * @returns {Promise<{ success: boolean; code: number; result: object }>}
   * An object containing a success flag, HTTP status code, and the updated course details.
   * @throws {NotFoundException} Throws an error if a course with the same name exists and is not the course being updated.
   */
  async updateCourse(_id: string, data: Partial<ICourse>, locale: string) {
    data = convertFieldsToLowerCase(data as FormObject, ["name.en"]);
    const { name } = data;

    if (name) {
      const existingAdmin = await this.findCourseByName("name.en", name.en);
      if (existingAdmin && existingAdmin._id.toString() !== _id) {
        throw new NotFoundException(
          i18n.__("errors.duplicate"),
          ErrorCodes.DUPLICATE
        );
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

export default CourseService;
