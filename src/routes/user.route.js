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

userRouter.route("/register").post(registerUser);
userRouter.route("/login").post(loginUser);

//lgooedin routes
userRouter.route("/changepassword").post(verifyToken, changeUserPassword);
userRouter.route("/updateprofile").patch(verifyToken, updateUserProfile);
userRouter.route("/getuserprofile").get(verifyToken, getUserProfile);

export default userRouter;
