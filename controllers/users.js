import { User } from "../models/users.js";
import bcrypt from "bcrypt";
import errorhandler from "../middlewares/error.js";
import { sendCookies } from "../utils/features.js";

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email }).select("+password");
    if (!user) return next(errorhandler("Invalid email or password", 404));
    const ismatch = bcrypt.compare(password, user.password);
    if (!ismatch) return next(errorhandler("Invalid email or password", 404));
    sendCookies(user, res, `welcome back,${user.name}`, 200);
  } catch (error) {
    next(error);
  }
};
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) return next(errorhandler("user already exists", 404));
    const hashedpassword = await bcrypt.hash(password, 10);
    user = await User.create({ name, email, password: hashedpassword });
    sendCookies(user, res, "registered successfully", 201);
  } catch (error) {
    next(error);
  }
};

export const getmyprofile = async (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};
export const logout = (req, res) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      sameSite: process.env.NODE_ENV === "development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "development" ? false : true,
    })
    .json({
      success: true,
      user: req.user,
    });
};
