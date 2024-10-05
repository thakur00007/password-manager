import { Password } from "../models/password.model.js";
import { QuestionAnswer } from "../models/questionAnswer.model.js";
import { SecurityQuestion } from "../models/securityQuestion.model.js";
import { ApiError } from "../util/apiError.js";
import { apiResponse } from "../util/apiResponse.js";
import { requestHandeller } from "../util/requestHandeller.js";
import mongoose from "mongoose";

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

//fetch all passwords
const fetchAllPasswords = requestHandeller(async (req, res) => {
  const allPasswords = await Password.aggregate([
    {
      $match: {
        owner: req.user._id,
      },
    },
    {
      $lookup: {
        from: "questionanswers",
        localField: "securityQuestionAnswer",
        foreignField: "_id",
        as: "securityQuestion",
        pipeline: [
          {
            $lookup: {
              from: "securityquestions",
              localField: "question",
              foreignField: "_id",
              as: "securityQuestion",
            },
          },
          {
            $unwind: "$securityQuestion",
          },
          {
            $project: {
              question: "$securityQuestion.question",
            },
          },
        ],
      },
    },
    {
      $unwind: "$securityQuestion",
    },
    {
      $project: {
        about: 1,
        createdAt: 1,
        securityQuestion: "$securityQuestion.question",
      },
    },
  ]);

  res
    .status(200)
    .json(
      new apiResponse(200, "Passwords fetched successfully!", allPasswords)
    );
});

//fetch password
const fetchPassword = requestHandeller(async (req, res) => {
  const { passwordId, answer } = req.body.data;

  if (!passwordId || !answer) {
    throw new ApiError(400, "All fields are required!");
  }

  const [foundPassword] = await Password.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(passwordId),
        owner: req.user._id,
      },
    },
  ]);

  if (!foundPassword) {
    throw new ApiError(404, "Password not found!");
  }

  const securityQuestionAnswerId = foundPassword.securityQuestionAnswer;

  const foundQNA = await QuestionAnswer.findById(securityQuestionAnswerId);

  if (!foundQNA) {
    throw new ApiError(404, "Question and answer not found!");
  }

  const isAnswerCorrect = await foundQNA.isAnswerCorrect(answer);

  if (!isAnswerCorrect) {
    throw new ApiError(400, "Incorrect answer!");
  }

  const newFoundPassword = await Password.findById(passwordId);

  const password = await newFoundPassword.decryptData();

  res
    .status(200)
    .json(new apiResponse(200, "Password fetched successfully!", { password }));
});

const deletePassword = requestHandeller(async (req, res) => {
  const { passwordId } = req.body?.data;

  if (!passwordId) {
    throw new ApiError(400, "All fields are required!");
  }

  const foundPassword = await Password.findById(passwordId).populate(
    "securityQuestionAnswer"
  );

  if (!foundPassword) {
    throw new ApiError(404, "Password not found!");
  }

  try {
    await QuestionAnswer.findByIdAndDelete(foundPassword.securityQuestionAnswer._id);
  } catch (error) {}

  const deletedPassword = await Password.deleteOne({
    _id: passwordId,
    owner: req.user._id,
  });

  if (!deletedPassword) {
    throw new ApiError(
      404,
      "Something went wrong while deleting the password!"
    );
  }

  res.status(200).json(new apiResponse(200, "Password deleted successfully!"));
});

export { savePassword, fetchAllPasswords, fetchPassword, deletePassword };
