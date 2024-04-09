import jwt from "jsonwebtoken";
import { ApiError } from "../util/apiError.js";
import { requestHandeller } from "../util/requestHandeller.js";
import { User } from "../models/user.model.js";

export const verifyToken = requestHandeller(async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      throw new ApiError(401, "Unauthorized request");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decodedToken?._id).select(
      "-password -__v"
    );
    if (!user) {
      throw new ApiError(401, "Invalid Token");
    }

    req.user = user;
    next();
  } catch (err) {
    throw new ApiError(401, err?.message || "Invalid Token");
  }
});
