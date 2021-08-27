import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const messageSchema = mongoose.Schema(
  {
    fullname: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    }
  },
  {
    timestamps: true,
  }
);



const Message = mongoose.model("Message", messageSchema);

export default Message;
