import mongoose, { Schema } from "mongoose";
import { SecurityQuestion } from "./securityQuestion.model.js";

const questionAnswerScheme = new Schema(
  {
    question: {
      type: Schema.Types.ObjectId,
      ref: SecurityQuestion,
      required: true,
    },
    answer: {
      type: String,
      trim: true,
      required: true,
    },
  },
  { timestamps: true }
);

export const QuestionAnswer = mongoose.model(
  "QuestionAnswer",
  questionAnswerScheme
);
