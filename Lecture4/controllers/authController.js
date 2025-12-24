const User = require("../models/User");
const { errorResponse, successResponse } = require("../utils/responseHandler");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");
const cookieParser = require("cookie-parser");

exports.registerUser = async (req, res) => {
  try {
    const { username, password, email, age } = req.body;
    if (!password || password.length < 6) {
      return errorResponse(
        res,
        "password must needed and length should be 6 digit or character",
        401
      );
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return errorResponse(res, "email already exist", 400); //400 bad request
    }

    //hash the pasword using bcryptjs

    const hashPassword = await bcrypt.hash(password, 10); // 10 is the salt round It defines how many times the hashing algorithm runs

    const newUser = await User.create({
      username,
      email,
      password: hashPassword,
      age,
    });

    const token = generateToken(newUser?._id, newUser.email);
    console.log("This is my auth Token", token);
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000, //7 days
    });
    return successResponse(
      res,
      "user registerred succesfully",
      { token, newUser },
      201
    );
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { password, email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return errorResponse(res, "Invalid email user not found", 401); //400 bad request
    }

    //compare password using bcrypt which we have hashed
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return errorResponse(res, "Invalid password please try again", 401);
    }

    const token = generateToken(user?._id, user.email);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // false because required only https
      maxAge: 7 * 24 * 60 * 60 * 1000, //7 days
    });
    return successResponse(
      res,
      "user login successfully",
      { token, user },
      201
    );
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

exports.logoutUser = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: false,
    });
    return successResponse(res, "Logout successfully", null, 201);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

exports.checkAuth = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return errorResponse(res, "user not found", 404, null);
    }
    return successResponse(res, "user is authorized to access", user, 201);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};
