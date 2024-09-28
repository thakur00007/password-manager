import { Router } from "express";

const questionRouter = Router();

import {
  saveQuestion,
  fetchAllQuestions,
} from "../controllers/question.controller.js";

questionRouter.route("/save-question").post(saveQuestion);
questionRouter.route("/fetch-questions").get(fetchAllQuestions);
export default questionRouter;
