import courseModel, { ICourse } from "../models/Course";
import BaseRepository from "./BaseRepository";

class CourseRepository extends BaseRepository<ICourse> {
  constructor() {
    super(courseModel);
  }

  async findCourseByName(key: string, name: string): Promise<ICourse | null> {
    return this.findOne({ [key]: name });
  }
}

export default CourseRepository;
