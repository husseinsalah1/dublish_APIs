import studentModel, { IStudent } from "../models/Student";
import BaseRepository from "./BaseRepository";

class StudentRepository extends BaseRepository<IStudent> {
  constructor() {
    super(studentModel);
  }

  async findStudentByEmail(email: string): Promise<IStudent | null> {
    return this.findOne({ email });
  }
}

export default StudentRepository;
