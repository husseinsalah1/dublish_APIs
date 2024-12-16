import { Document, Schema, model } from "mongoose";
interface MultiLangName {
  en: string;
  ar: string;
}
export interface ICourse extends Document {
  name: MultiLangName;
  description: MultiLangName;
  about: {
    en: string[];
    ar: string[];
  };
  image: Object;
  category: MultiLangName;
  hours: number;
  duration: MultiLangName;
  classes: number;
  attends: number;
  price: number;
  isHasOffer: boolean;
  offerPercentage: number;
  offerDuration: { start: Date; end: Date };
  createdBy: Schema.Types.ObjectId;
  creationDate: Date;
}

const CourseSchema: Schema<ICourse> = new Schema<ICourse>({
  name: {
    en: { type: String, required: true },
    ar: { type: String, required: true },
  },
  description: {
    en: { type: String, required: true },
    ar: { type: String, required: true },
  },
  about: {
    en: [{ type: String, required: true }],
    ar: [{ type: String, required: true }],
  },

  image: { type: Object },
  category: {
    en: { type: String, required: true },
    ar: { type: String, required: true },
  },
  hours: {
    type: Number,
    required: true,
  },
  duration: {
    en: { type: String, required: true },
    ar: { type: String, required: true },
  },
  classes: { type: Number, required: true },
  attends: { type: Number, required: true, default: 0 },
  price: { type: Number, required: true },
  isHasOffer: { type: Boolean, required: true },
  offerPercentage: {
    type: Number,
    required: function () {
      return this.isHasOffer;
    },
  },
  offerDuration: {
    start: {
      type: Date,
      required: function () {
        return this.isHasOffer;
      },
    },
    end: {
      type: Date,
      required: function () {
        return this.isHasOffer;
      },
    },
  },

  createdBy: { type: Schema.Types.ObjectId, ref: "admins", required: true },
  creationDate: { type: Date, default: Date.now },
});

const courseModel = model<ICourse>("Course", CourseSchema);
export default courseModel;
