import { Schema, Document, model } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const saltrounds = 10;

type MultiLangName = {
  en: string;
  ar: string;
  [key: string]: string;
};

export interface IStudent extends Document {
  name: MultiLangName;
  email: string;
  password: string;
  phone: string;
  role: string;
  birthDate: Date;
  token: string;
  generateAuthToken(): Promise<string>;
}

const studentSchema: Schema<IStudent> = new Schema({
  name: {
    en: { type: String, required: true },
    ar: { type: String, required: true },
  },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  role: {
    type: String,
    enum: ["student"],
    default: "student",
    required: true,
  },
  birthDate: { type: Date, required: true },
  token: { type: String },
});

studentSchema.methods.toJSON = function () {
  const student = this;
  const studentObject = student.toObject();
  delete studentObject.password;
  return studentObject;
};
const JWT_SECRET = process.env.JWT_SECRET || "dublish";

studentSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, saltrounds);
  }
  next();
});

studentSchema.methods.generateAuthToken = async function () {
  const user = this;
  const payload = {
    id: user._id,
    email: user.email,
    role: user.role,
  };
  const token = jwt.sign(payload, JWT_SECRET);
  user.token = token;

  await user.save();
  return token;
};
const studentModel = model<IStudent>("students", studentSchema);

export default studentModel;
