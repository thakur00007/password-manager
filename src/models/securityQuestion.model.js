import mongoose, { Schema } from "mongoose";

const securityQuestionSchema = new Schema(
  {
    question: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

export const SecurityQuestion = mongoose.model(
  "SecurityQuestion",
  securityQuestionSchema
);
