import { BadRequestException } from "../exceptions/bad-requests";
import studentModel, { IStudent } from "../models/Student";
import StudentRepository from "../repositories/StudentRepository";
import { convertFieldsToLowerCase, FormObject } from "../utils/custom-functions";
import BaseService from "./BaseService";
import { ErrorCodes } from "../exceptions/root";
import i18n from "../config/i18nConfig";
import { NotFoundException } from "../exceptions/not-found-exception";

class StudentService extends BaseService<IStudent> {
  private studentRepository: StudentRepository;
  constructor(studentRepository: StudentRepository) {
    super(studentRepository);
    this.studentRepository = studentRepository;
  }

  async findStudentByEmail(email: string): Promise<IStudent | null> {
    return this.studentRepository.findStudentByEmail(email);
  }

  async register(data: Partial<IStudent>, locale: string) {
    data = convertFieldsToLowerCase(data as FormObject, ["name.en"]);
    const existingStudent = await this.findStudentByEmail(data.email as string);

    if (existingStudent) {
      throw new BadRequestException(i18n.__(" duplicate"), ErrorCodes.DUPLICATE);
    }

    const createOperation = await this.create(data);
    return {
      success: true,
      code: 201,
      result: createOperation,
    };
  }

  async login(email: string, password: string, locale: string) {
    const student = await this.findStudentByEmail(email);
    if (!student) {
      throw new NotFoundException(i18n.__("notFound"), ErrorCodes.NOT_FOUND);
    }
    const isMatch = await this.comparePassword(password, student.password);
    if (!isMatch) {
      throw new NotFoundException(i18n.__("invalidPassword"), ErrorCodes.INVALID_PASSWORD);
    }

    const token = await student.generateAuthToken();
    return {
      success: true,
      code: 200,
      result: {
        ...student.toJSON(),
        name: student.name[locale],
      },
      token,
    };
  }

  async createStudent(data: Partial<IStudent>, locale: string) {
    data = convertFieldsToLowerCase(data as FormObject, ["name.en"]);

    const existingStudent = await this.findStudentByEmail(data.email as string);
    if (existingStudent) {
      throw new BadRequestException(i18n.__(" duplicate"), ErrorCodes.DUPLICATE);
    }

    const createOperation = await this.create(data);
    return {
      success: true,
      code: 201,
      result: createOperation,
    };
  }

  async updateStudent(_id: string, data: Partial<IStudent>, locale: string) {
    data = convertFieldsToLowerCase(data as FormObject, ["name.en"]);
    const { email } = data;
    if (email) {
      const existingStudent = await this.findStudentByEmail(email);
      if (existingStudent && existingStudent._id !== _id) {
        throw new BadRequestException(i18n.__(" duplicate"), ErrorCodes.DUPLICATE);
      }
    }

    const updateOperation = await this.update(_id, data);
    await updateOperation?.save();
    return {
      success: true,
      code: 200,
      result: updateOperation,
    };
  }
}

export default StudentService;
