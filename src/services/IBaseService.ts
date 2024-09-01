import { Document } from "mongoose";
import { FilterQuery, ProjectionType, QueryOptions } from "mongoose";

interface IBaseService<T extends Document> {
  create(formObject: Partial<T>): Promise<T>;
}

export default IBaseService;
