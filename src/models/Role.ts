import mongoose, { Schema, Document, model } from "mongoose";

type MultiLangName = {
  en: string;
  ar: string;
  [key: string]: string; // Allow additional languages if needed
};

export interface IRole extends Document {
  name: MultiLangName;
  permissions: Object;
}

const roleSchema: Schema<IRole> = new Schema({
  name: {
    en: { type: String, required: true },
    ar: { type: String, required: true },
  },
  permissions: { type: Object },
});

roleSchema.methods.toJSON = function () {
  const role = this;
  const roleObject = role.toObject();

  return roleObject;
};
const roleModel = model<IRole>("roles", roleSchema);

export default roleModel;
