import Message from "../models/messageModel.js";

export const sendMessage = async (req, res) => {
  try {
    const data = req.body;

    const message = await Message.create(data);

    if (message) {
      return res.status(201).json({
          success: true,
        message:
          "Thank you for your feedback. We will get back to you in your email.",
      });
    }

    res.status(404).json({ message: "Internal error" });
  } catch (err) {
    res.status(400).json({ message: err.message, stack: err.stack });
  }
};

export const getAllMessage = async (req, res) => {
  try {
    const message = await Message.find().sort({ createdAt: -1 });

    if (message) {
      return res.status(201).json({
        sucess: true,
        message: "Message Fetched Successfully",
        data: message,
      });
    }

    res.status(404).json({ message: "Internal error" });
  } catch (err) {
    res.status(400).json({ message: err.message, stack: err.stack });
  }
};
