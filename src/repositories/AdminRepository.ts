import { adminModel, IAdmin } from "../models/Admin";
import BaseRepository from "./BaseRepository";

class AdminRepository extends BaseRepository<IAdmin> {
  constructor() {
    super(adminModel);
  }

  async findByEmail(email: string) {
    return this.findOne({ email });
  }

  async findByUsername(username: string) {
    return this.findOne({ username });
  }

  async findByPhone(phone: string) {
    return this.findOne({ phone });
  }
}

export default AdminRepository;
