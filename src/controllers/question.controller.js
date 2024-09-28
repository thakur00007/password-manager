import { SecurityQuestion } from "../models/securityQuestion.model.js";
import { apiResponse } from "../util/apiResponse.js";
import { requestHandeller } from "../util/requestHandeller.js";

const saveQuestion = requestHandeller(async (req, res) => {
  const { question } = req.body.data;

  const createQuestion = await SecurityQuestion.create({
    question,
  });

  res.status(200).json(new apiResponse(200, "Question saved successfully!"));
});

const fetchAllQuestions = requestHandeller(async (req, res) => {
  const questions = await SecurityQuestion.find().select("-__v -createdAt -updatedAt");

  res
    .status(200)
    .json(new apiResponse(200, "Questions fetched", { questions }));
});

export { saveQuestion, fetchAllQuestions };
