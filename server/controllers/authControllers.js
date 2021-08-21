import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";

// ! @route POST /v1/auth/login
// ? @desc Login User
// * @acess Public
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      const matchPassword = await bcrypt.compare(password, user.password);

      if (matchPassword) {
        return res.status(200).json({
          success: true,
          message: "Login Successful",
          data: {
            id: user.id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            isAdmin: user.isAdmin,
          },
          token: jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: "12h",
          }),
        });
      } else {
        return res.status(400).json({ message: "Invalid Email or Password" });
      }
    }

    res.status(400).json({ message: "Invalid Email or Password" });
  } catch (err) {
    res.status(400).json({ message: err.message, stack: err.stack });
  }
};

// ! @route POST /v1/auth/register
// ? @desc Register
// * @acess Public
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "User Already Exists" });
    }

    const newUser = await User.create({
      name,
      email,
      password,
    });

    if (newUser) {
      res.status(201).json({
        success: true,
        message: "User Created Successfully",
        data: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          date: newUser.date,
          avatar: newUser.avatar,
          isAdmin: newUser.isAdmin,
        },
        token: jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, {
          expiresIn: "12h",
        }),
      });
    } else {
      res.status(400).json({ message: "Invalid User Data" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message, stack: err.stack });
  }
};

// ! @route POST /v1/auth/register
// ? @desc Register
// * @acess Public
export const getUserData = async (req, res) => {
  try {
    const { token } = req.body;
    const decoded = jwt.decode(token);
    const user = await User.findById(decoded.id);

    if (Math.floor(new Date().getTime() / 1000) - decoded.exp > 0) {
      return res.status(402).json({ message: "Token Expired" });
    }

    if (user) {
      return res.status(200).json({
        success: true,
        message: "User Found",
        data: {
          id: user.id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          isAdmin: user.isAdmin,
        },
      });
    }

    res.status(404).json({ message: "Damaged Token" });
  } catch (err) {
    res.status(400).json({ message: err.message, stack: err.stack });
  }
};
