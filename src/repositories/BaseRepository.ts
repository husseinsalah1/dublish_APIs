import { Model, Document, FilterQuery, UpdateQuery, SortOrder } from "mongoose";
export interface FindAllOptions {
  selectionObject?: string | string[] | Record<string, number | boolean | object>; // The fields to select
  sortObject?: object; // The sort criteria
  pageNumber?: number; // The page number for pagination
  limitNumber?: number; // The limit of documents per page
}
class BaseRepository<T extends Document> {
  private model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  async create(data: Partial<T>): Promise<T> {
    const newData = new this.model(data);
    return newData.save();
  }

  async findOne(findObject: FilterQuery<T>): Promise<T | null> {
    return this.model.findOne(findObject).exec();
  }

  async findAll(findObject: FilterQuery<T> = {}, options: FindAllOptions = {}) {
    const { selectionObject = {}, sortObject = {}, pageNumber = 1, limitNumber = 10 } = options;

    const results = await this.model
      .find(findObject)
      .lean()
      .sort(sortObject as string | { [key: string]: SortOrder | { $meta: any } } | [string, SortOrder][] | null | undefined)
      .select(selectionObject)
      .limit(limitNumber)
      .skip((pageNumber - 1) * limitNumber);

    return results;
  }

  async update(findObject: FilterQuery<T>, updatedData: UpdateQuery<T>): Promise<T | null> {
    return this.model.findOneAndUpdate(findObject, updatedData, { new: true }).exec();
  }

  async delete(findObject: FilterQuery<T>): Promise<boolean> {
    const result = await this.model.deleteOne(findObject).exec();
    return result.deletedCount === 1;
  }

  async save(data: T): Promise<T> {
    return data.save();
  }

  async count(findObject: FilterQuery<T>): Promise<number> {
    return this.model.countDocuments(findObject).exec();
  }
}

export default BaseRepository;
