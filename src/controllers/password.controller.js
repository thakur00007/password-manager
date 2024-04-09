import { Password } from "../models/password.model.js";
import { QuestionAnswer } from "../models/questionAnswer.model.js";
import { SecurityQuestion } from "../models/securityQuestion.model.js";
import { ApiError } from "../util/apiError.js";
import { apiResponse } from "../util/apiResponse.js";
import { requestHandeller } from "../util/requestHandeller.js";

const savePassword = requestHandeller(async (req, res) => {
  const { about, password, questionId, answer } = req.body?.data;

  if (!about || !password || !questionId || !answer) {
    throw new ApiError(400, "All fields are required!");
  }

  const foundSecurityQuestion = await SecurityQuestion.findById(questionId);

  const savedQNA = await QuestionAnswer.create({
    question: foundSecurityQuestion._id,
    answer,
  });

  if (!savedQNA) {
    throw new ApiError(
      500,
      "Something went wrong while saving the Question and answer"
    );
  }

  // TODO encrypt the password before saving it

  const savedPassword = await Password.create({
    about,
    storePassword: password,
    securityQuestionAnswer: savedQNA._id,
    owner: req.user._id,
  });

  if (!savedPassword) {
    throw new ApiError(500, "Something went wrong while saving the password");
  }

  res.status(200).json(new apiResponse(200, "Password saved successfully!"));
});

export { savePassword };
