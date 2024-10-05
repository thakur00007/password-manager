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

  //res.status(200).json(new apiResponse(200, "User created", { createdUser }));

  loginUser(req, res, next);
});

const loginUser = requestHandeller(async (req, res, next) => {
  const { email, password } = req.body.user;
  if (!email && !password) {
    throw new ApiError(400, "eamil and password is required to login");
  }

  const foundUser = await User.findOne({ email });

  if (!foundUser) {
    throw new ApiError(404, "No user found with this email!");
  }

  if (!(await foundUser.isPasswordCorrect(password))) {
    throw new ApiError(401, "Wrong Password!");
  }

  const loggedInUser = await User.findById(foundUser._id).select(
    "-password -__v"
  );

  const token = await foundUser.generateAccessToken();

  res
    .status(200)
    .json(new apiResponse(200, "login success", { loggedInUser, token }));
});

const getUserProfile = requestHandeller(async (req, res) => {
  const loggedInUser = await User.findById(req.user._id).select(
    "-password -__v"
  );
  res.status(200).json(new apiResponse(200, "User profile", { loggedInUser }));
});

const changeUserPassword = requestHandeller(async (req, res) => {
  const { oldPassword, newPassword } = req.body?.data;
  if (!oldPassword && !newPassword) {
    throw new ApiError(400, "Old password and new password is required");
  }

  const user = await User.findById(req.user._id);
  if (!(await user.isPasswordCorrect(oldPassword))) {
    throw new ApiError(401, "Old password is wrong");
  }

  user.password = newPassword;
  await user.save();

  res.status(200).json(new apiResponse(200, "Password changed successfully"));
});

const updateUserProfile = requestHandeller(async (req, res) => {
  const { username, email } = req.body?.data;
  if (!username && !email) {
    throw new ApiError(400, "Username and email is required");
  }

  const currentUser = await User.findById(req.user?._id).select("email");

  if (email && email !== currentUser.email) {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new ApiError(400, "Email is already in use");
    }
  }

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        username,
        email,
      },
    },
    {
      new: true,
    }
  ).select("-password -__v");

  res
    .status(200)
    .json(new apiResponse(200, "Profile updated successfully", { user }));
});

export {
  registerUser,
  loginUser,
  getUserProfile,
  changeUserPassword,
  updateUserProfile,
};
