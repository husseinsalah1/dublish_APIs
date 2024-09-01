import {
  FilterQuery,
  Document,
  Model,
  QueryOptions,
  ProjectionType,
} from "mongoose";

class BaseRepository<T extends Document> {
  protected model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  async create(data: Partial<T>): Promise<T> {
    const newData = new this.model(data);
    return newData.save();
  }

  async findOne(query: FilterQuery<T>, populateField: string = "") {
    return this.model.findOne(query).populate(populateField).exec();
  }

  async findAll(
    query: FilterQuery<T>,
    projection?: ProjectionType<T> | null,
    options?: QueryOptions,
    populateField: string = ""
  ): Promise<T[]> {
    return this.model
      .find(query, projection, options)
      .populate(populateField)
      .exec();
  }

  async delete(id: string): Promise<{ deletedCount?: number }> {
    return this.model.deleteOne({ _id: id }).exec();
  }
}

export default BaseRepository;
