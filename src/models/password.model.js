import { mongoose, Schema } from "mongoose";

const passwordSchema = new Schema(
  {
    about: {
      type: String,
      trim: true,
    },
    securityQuestion: {
      type: Schema.Types.ObjectId,
      ref: SecurityQuestion,
      required: [true, "Sequrity question is required to store a password."],
    },
    securityAnswer: {
      type: String,
      trim: true,
      required: [true, "Answer the Security question"],
    },
    storePassword: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

passwordSchema.pre("save", async function (next) {
  if (!this.isModified("securityAnswer")) return next();

  this.securityAnswer = await bcrypt.hash(this.securityAnswer, 10);
  next();
});

export const Password = mongoose.Model("Password", passwordSchema);
