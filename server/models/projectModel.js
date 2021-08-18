import mongoose from "mongoose";

const projectSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    videoLink: {
      type: String,
    },
    category: {
      type: String,

      enum: [
        "Health and Disease",
        "Rural Development",
        "Environmental Conservation",
        "Natural Disaster",
        "Animals",
        "Women Empowerment",
        "Emergencies",
        "Education",
        "Protest",
      ],
    },
    openedFor: {
      type: Array,
    },
    donationAmount: {
      type: Number,
    },
    donationUser: {
      type: Array,
    },
    donatedAmount: {
      type: Number,
      default: 0,
    },
    sponsored: {
      type: Boolean,
      default: false,
    },
    volunteerNumber: {
      type: Number,
      default: 0,
    },
    projectImage: {
      type: String,
    },
    volunteeredNumber: {
      type: Number,
      default: 0,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model("Project", projectSchema);

export default Project;
