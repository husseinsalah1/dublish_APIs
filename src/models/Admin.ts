import mongoose, { Document, Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { permission } from "process";
const saltrounds = 10;

type MultiLangName = {
  en: string;
  ar: string;
  [key: string]: string; // Allow additional languages if needed
};
export enum AdminRole {
  SUPER_ADMIN = "superAdmin",
  ADMIN = "admin",
}

interface IPermissions extends Document {
  name: Record<string, string>; // Locale-based names
  permissions: {
    admins: string[];
    roles: string[];
  };
}

export interface IAdmin extends Document {
  name: MultiLangName;
  username: string;
  password: string;
  email: string;
  phone: string;
  permissions: IPermissions;
  role: string;
  creationDate: Date;
  token: string;
  generateAuthToken(): Promise<string>;
}

const adminSchema: Schema<IAdmin> = new Schema<IAdmin>({
  name: {
    en: { type: String, required: true },
    ar: { type: String, required: true },
  },
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  permissions: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "roles",
    index: true,
  },
  role: {
    type: String,
    enum: Object.values(AdminRole),
    required: true,
  },
  token: { type: String },
  creationDate: { type: Date, default: Date.now },
});

adminSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, saltrounds);
  }
  next();
});

adminSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  return userObject;
};

const JWT_SECRET = process.env.JWT_SECRET || "dublish";

adminSchema.methods.generateAuthToken = async function () {
  const user = this;
  const payload = {
    _id: user._id.toString(),
    role: user.role,
    permissions: user.permissions,
    name: user.name,
    email: user.email,
  };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "2h" });
  user.token = token;
  await user.save();
  return token;
};
export const adminModel = model<IAdmin>("admins", adminSchema);
