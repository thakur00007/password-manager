import { mongoose, Schema } from "mongoose";
import { QuestionAnswer } from "./questionAnswer.model.js";
const passwordSchema = new Schema(
  {
    about: {
      type: String,
      trim: true,
    },
    securityQuestionAnswer: {
      type: Schema.Types.ObjectId,
      ref: QuestionAnswer,
      required: true,
    },
    storePassword: {
      type: String,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);
export const Password = mongoose.model("Password", passwordSchema);
