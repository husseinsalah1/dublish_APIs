import BaseRepository from "../repositories/BaseRepository"; // Adjust the path as needed
import IBaseService from "./IBaseService"; // Adjust the path as needed
import { Document } from "mongoose";

class BaseService<T extends Document> implements IBaseService<T> {
  protected repository: BaseRepository<T>;

  constructor(repository: BaseRepository<T>) {
    this.repository = repository;
  }

  async create(data: Partial<T>): Promise<T> {
    return this.repository.create(data);
  }
}

export default BaseService;
