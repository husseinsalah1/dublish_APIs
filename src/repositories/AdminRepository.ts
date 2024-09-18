import BaseRepository from "./BaseRepository";
import { IAdmin } from "../models/Admin";
import { adminModel } from "./../models/Admin";

// Create the AdminRepository class
class AdminRepository extends BaseRepository<IAdmin> {
  constructor() {
    super(adminModel);
  }

  async findByEmail(email: string): Promise<IAdmin | null> {
    return this.findOne({ email });
  }
  async findByUsername(username: string): Promise<IAdmin | null> {
    return this.findOne({ username });
  }
  async findAdminsByRole(role: string): Promise<IAdmin[]> {
    return this.findAll({ role });
  }
}

export default AdminRepository;
