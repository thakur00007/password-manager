import mongoose, { Schema } from "mongoose";
import { SecurityQuestion } from "./securityQuestion.model.js";
import bcrypt from "bcrypt";

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

questionAnswerScheme.pre("save", async function (next) {
  if (!this.isModified("answer")) return next();

  this.answer = await bcrypt.hash(this.answer, 10);
});

questionAnswerScheme.methods.isAnswerCorrect = async function (answer) {
  return await bcrypt.compare(answer, this.answer);
};

export const QuestionAnswer = mongoose.model(
  "QuestionAnswer",
  questionAnswerScheme
);
