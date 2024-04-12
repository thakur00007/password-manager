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

  const foundPassword = await Password.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(passwordId),
        owner: req.user._id,
      },
    },
    //TODO match question answer
  ]);
  console.log(foundPassword);

  res
    .status(200)
    .json(
      new apiResponse(200, "Password fetched successfully!", foundPassword)
    );
});

export { savePassword, fetchAllPasswords, fetchPassword };
