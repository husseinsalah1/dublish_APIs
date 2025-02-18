import { adminSwagger } from "./admin/admin.swagger";
import { authSwagger } from "./admin/auth.swagger";
import { courseSwagger } from "./admin/course.swagger";
import { studentSwagger } from "./admin/student.swagger";

export const swaggerDefinitions = {
  paths: {
    ...authSwagger,
    ...adminSwagger,
    ...courseSwagger,
    ...studentSwagger,
  },
};
