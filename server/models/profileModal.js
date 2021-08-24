import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const profileSchema = mongoose.Schema(
  {
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    bio:{
        type: String,
    },
  },
  {
    timestamps: true,
  }
);



const Profile = mongoose.model("Profile", profileSchema);
w
export default Profile;
