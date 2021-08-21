import jwt, { decode } from "jsonwebtoken";
import User from "../models/userModel.js";

export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = decode(token);

      const user = await User.findById(decoded.id).select("-password");

      if(user.isAdmin){
        next()
      }

      throw new Error("Unauthorized Route for this user.")
    } catch (error) {

      res.status(401);
      throw new Error("Not authorized token failed");
    }
  } else {
    res.status(404).json({ message: "Not authorized" });
  }
};
