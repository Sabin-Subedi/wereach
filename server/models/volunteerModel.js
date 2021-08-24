import mongoose from "mongoose";

const volunteerSchema = mongoose.Schema(
  {
    
    volunteers: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        role:{
          type: String,
          default:'volunteer'
        }
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Volunteer = mongoose.model("volunteer", volunteerSchema);

export default Volunteer;
