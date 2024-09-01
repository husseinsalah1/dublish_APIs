import roleModel, { IRole } from "../models/Role";
import BaseRepository from "./BaseRepository";

class RoleRepository extends BaseRepository<IRole> {
  constructor() {
    super(roleModel);
  }
}

export default RoleRepository;
