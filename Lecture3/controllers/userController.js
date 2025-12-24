const User = require("../models/User");
const { errorResponse, successResponse } = require("../utils/responseHandler");
exports.createUser = async (req, res) => {
  try {
    const { username, email, age } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return errorResponse(res, "email already exists", 400);
    }
    const newUser = await User.create({
      username,
      email,
      age,
    });
    return successResponse(res, "user added successfully", newUser, 200);
  } catch (error) {
    return errorResponse(res, error.message, 400);
  }
};

exports.findUser = async (req, res) => {
  const { id } = req.params;
  const exist = await User.findById(id);
  if (exist) {
    return successResponse(res, "user find succcessfully", exist, 200);
  }
  return errorResponse(res, "user not found", 400);
};
const mongoose = require("mongoose");

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return errorResponse(res, "Invalid user ID", 400);
    }

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return errorResponse(res, "User not found", 404);
    }

    return successResponse(res, "User deleted successfully", deletedUser, 200);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  try {
    const { username, email, age } = req.body;
    const user = await User.findById(id);
    if (!user) {
      return errorResponse(res, "user not found", 404);
    }

    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true, // return updated document
      runValidates: true, // validate schema rules (email, minlength, etc.)
    });
    return successResponse(res, "used updated successfully", updatedUser, 200);
  } catch (error) {
    return errorResponse(res, "failed to update user", error.message, 500);
  }
};
