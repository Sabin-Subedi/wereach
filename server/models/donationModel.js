import mongoose from "mongoose";

const donationSchema = mongoose.Schema(
  {
    donation: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        amount:{
          type: Number,
        }
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Donation = mongoose.model("donation", donationSchema);

export default Donation;
