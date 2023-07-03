import { User } from "../models/users.js";
import jwt from "jsonwebtoken";

export const isauthenticated = async (req, res, next) => {
  const { token } = req.cookies;
  console.log(token);

  if (!token)
    return res.status(404).json({
      success: false,
      message: "Login first",
    });
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decoded._id);
  next();
};
