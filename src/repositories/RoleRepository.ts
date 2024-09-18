import BaseRepository from "./BaseRepository";
import roleModel, { IRole } from "./../models/Role";

class RoleRepository extends BaseRepository<IRole> {
  constructor() {
    super(roleModel);
  }

  async findRoleByName(key: string, name: string): Promise<IRole | null> {
    return this.findOne({ [key]: name });
  }
}

export default RoleRepository;
