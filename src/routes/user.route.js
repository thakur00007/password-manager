import { Router } from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";

const userRouter = Router();

import {
  changeUserPassword,
  getUserProfile,
  loginUser,
  registerUser,
  updateUserProfile,
} from "../controllers/user.controller.js";
import { verifyRecaptcha } from "../middlewares/recaptcha.middleware.js";

//captcha protected routes
userRouter.route("/register").post(verifyRecaptcha("register"), registerUser);
userRouter.route("/login").post(verifyRecaptcha("login"), loginUser);

//lgooedin routes
userRouter.route("/changepassword").post(verifyToken, changeUserPassword);
userRouter.route("/updateprofile").patch(verifyToken, updateUserProfile);
userRouter.route("/getuserprofile").get(verifyToken, getUserProfile);

export default userRouter;
