import jwt, { decode } from "jsonwebtoken";
import User from "../models/userModel.js";

export const isAdmin = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = decode(token);

      const user = await User.findById(decoded.id).select("-password");

      if(!user.isAdmin){
        return res.status(400).json({message:"Unauthorized Route for this user."})
      }

      next();
    } catch (error) {

      res.status(401);
      res.json({message:"Not authorized token failed"})

    }
  } else {
    return res.status(404).json({ message: "Not authorized" });
  }
};
