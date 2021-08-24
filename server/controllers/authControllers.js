import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { sendEmail } from "../utils/email.js";

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
            emailVerified: user.emailVerified,
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

    const otpCode = Math.floor(Math.random()*1000000)

    const newUser = await User.create({
      name,
      email,
      password,
      otpCode,
    });

    if (newUser) {
      sendEmail(newUser.email,newUser.otpCode,newUser.name)
      res.status(201).json({
        success: true,
        message: "User Created Successfully.Please check your email for the verification code to verify your email.",
        data: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          date: newUser.date,
          avatar: newUser.avatar,
          isAdmin: newUser.isAdmin,
          emailVerified: newUser.emailVerified,
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
export const verifyEmail = async (req, res) => {
  try {
    const user = req.user;
    const { otpCode } = req.body;
    const profile = await User.findById(user.id);

    if(profile.emailVerified) {
      return res.status(404).json({
        success: true,
        message: "Email has already been verified.",
        
      });
    }

    if (profile.otpCode.toString() === otpCode.toString()) {
      profile.emailVerified = true;
      await profile.save();
      const updatedProfile = await User.findById(user.id).select(['-password','-otpCode'])

      return res.status(200).json({
        success: true,
        message: "Your email has been verified",
        data: updatedProfile,
      });
    }

    res.status(404).json({ message: "Invalid Otp Code" });
  } catch (err) {
    res.status(400).json({ message: err.message, stack: err.stack });
  }
};

export const resendCode = async (req, res) => {
  try {
    const user = req.user;
    const profile = await User.findById(user.id);
    const otpCode = Math.floor(Math.random()*1000000)
    
    if(profile.emailVerified) {
      return res.status(404).json({
        success: true,
        message: "Email has already been verified.",
        
      });
    }


    if (profile) {
      profile.otpCode = otpCode;

      await profile.save();

      sendEmail(profile.email,otpCode,profile.name)
      const updatedProfile = await User.findById(user.id).select(['-password','-otpCode'])
      return res.status(200).json({
        success: true,
        message: "We have resend verification code to your email.",
        data: updatedProfile,
      });
    }

    res.status(404).json({ message: "Intenal Error" });
  } catch (err) {
    res.status(400).json({ message: err.message, stack: err.stack });
  }
};

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
          emailVerified: user.emailVerified,
        },
      });
    }

    res.status(404).json({ message: "Damaged Token" });
  } catch (err) {
    res.status(400).json({ message: err.message, stack: err.stack });
  }
};


export const getAllUsers = async (req, res) => {
  try {
    const user = await User.find().select('-password').sort({ createdAt: -1 });

    if (user) {
      return res.status(200).json({
        success: true,
        message: "Users List Found",
        data: user
      });
    }

    res.status(404).json({ message: "Internal error" });
  } catch (err) {
    res.status(400).json({ message: err.message, stack: err.stack });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ _id: req.params.id })

    if (user) {
      const users = await User.find().select('-password').sort({ createdAt: -1 });
      return res.status(200).json({
        success: true,
        message: "User was successfully deleted.",
        data: users
      });
    }

    res.status(404).json({ message: "Internal error" });
  } catch (err) {
    res.status(400).json({ message: err.message, stack: err.stack });
  }
};