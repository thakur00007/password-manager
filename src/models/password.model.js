import { mongoose, Schema } from "mongoose";
import { QuestionAnswer } from "./questionAnswer.model.js";
import { encryptData, decryptData } from "../util/encryptDecrypt.js";
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
      type: Buffer,
      required: true,
    },
    storeIv: {
      type: Buffer,
      // required: true
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

passwordSchema.pre("save", async function (next) {
  if (!this.isModified("storePassword")) return next();

  const { encryptedData, iv } = encryptData(this.storePassword);
  this.storePassword = encryptedData;
  this.storeIv = iv;
  next();
});

//decrypt data
passwordSchema.methods.decryptData = async function () {
  return decryptData(this.storePassword, this.storeIv);
};

export const Password = mongoose.model("Password", passwordSchema);
