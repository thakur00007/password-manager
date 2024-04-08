import { User } from "../models/user.model.js";
import { ApiError } from "../util/apiError.js";
import { apiResponse } from "../util/apiResponse.js";
import { requestHandeller } from "../util/requestHandeller.js";
const registerUser = requestHandeller(async (req, res, next) => {
  const { username, email, password } = req.body.user;

  if (!username && !email && !password) {
    throw new ApiError(
      400,
      "Username, eamil and password is required to register"
    );
  }

  const checkUser = await User.findOne({ email });
  if (checkUser) {
    throw new ApiError(400, "User with this email is already exists!");
  }

  const user = await User.create({
    username,
    email,
    password,
  });

  const createdUser = await User.findById(user._id).select("-password -__v");

  res.status(200).json(new apiResponse(200, "User created", [{ createdUser }]));
});

const loginUser = requestHandeller(async (req, res, next) => {
  const { email, password } = req.body.user;
  if (!email && !password) {
    throw new ApiError(400, "eamil and password is required to login");
  }

  const foundUser = await User.findOne({ email });
  if (!(await foundUser.isPasswordCorrect(password))) {
    throw new ApiError(401, "Wrong Password!");
  }

  const loggedInUser = await User.findById(foundUser._id).select(
    "-password -__v"
  );

  const token = await foundUser.generateAccessToken();

  res
    .status(200)
    .json(new apiResponse(200, "login success", [{ loggedInUser, token }]));
});

export { registerUser, loginUser };
