import Donation from "../models/donationModel.js";
import Project from "../models/projectModel.js";
import Volunteer from "../models/volunteerModel.js";

// ! @route POST /project
// ? @desc Login User
// * @acess Public
export const getAllProjects = async (req, res) => {
  try {
    const project = await Project.find({ isVerified: true })
      .populate("user")
      .populate({
        path: "volunteerList",
        populate: { path: "volunteers.user" },
      })
      .populate({
        path: "donationList",
        populate: { path: "donation.user" },
      })
      .sort({ createdAt: -1 });

    if (project) {
      return res.status(200).json({
        success: true,
        message: "Projects fetched successfully",
        data: project,
      });
    }

    res.status(400).json({ message: "Internal Error" });
  } catch (err) {
    res.status(400).json({ message: err.message, stack: err.stack });
  }
};

export const getProjects = async (req, res) => {
  try {
    const project = await Project.find()
      .populate("user")
      .populate({
        path: "volunteerList",
        populate: { path: "volunteers.user" },
      })
      .populate({
        path: "donationList",
        populate: { path: "donation.user" },
      })
      .sort({ createdAt: -1 });

    if (project) {
      return res.status(200).json({
        success: true,
        message: "Projects fetched successfully",
        data: project,
      });
    }

    res.status(400).json({ message: "Internal Error" });
  } catch (err) {
    res.status(400).json({ message: err.message, stack: err.stack });
  }
};

export const getAllProjectByUser = async (req, res) => {
  try {
    const project = await Project.find({ user: req.user.id, isVerified: true })
      .populate("user")
      .populate({
        path: "volunteerList",
        populate: { path: "volunteers.user" },
      })
      .populate({
        path: "donationList",
        populate: { path: "donation.user" },
      })
      .sort({ createdAt: -1 });

    if (project) {
      return res.status(200).json({
        success: true,
        message: "Projects fetched successfully",
        data: project,
      });
    }

    res.status(400).json({ message: "Internal Error" });
  } catch (err) {
    res.status(400).json({ message: err.message, stack: err.stack });
  }
};

// ! @route POST /project/create
// ? @desc Login User
// * @acess Public
export const createProject = async (req, res) => {
  try {
    const {
      title,
      description,
      videoLink,
      category,
      openedFor,
      donationAmount,
      sponsored,
      volunteerNumber,
      location,
      imageLink,
      volunteerCommunityLink,
    } = req.body;

    if (
      !title ||
      !description ||
      !category ||
      !openedFor ||
      !location ||
      !imageLink
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    if (openedFor.includes("donate") && !donationAmount) {
      return res.status(400).json({
        message: "Donation amount is required to make a funraising project.",
      });
    } else if (openedFor.includes("volunteer") && !volunteerNumber) {
      return res.status(400).json({
        message: "Volunteer no required to open project for volunteering.",
      });
    }

    const volunteer = await Volunteer.create({});
    const donate = await Donation.create({});

    const newProject = await Project.create({
      user: req.user._id,
      title,
      description,
      videoLink,
      category,
      openedFor,
      donationAmount,
      sponsored,
      volunteerNumber,
      location,
      imageLink,
      volunteerCommunityLink,
      volunteerList: volunteer.id,
      donationList: donate.id,
    });

    if (newProject) {
      return res.status(200).json({
        success: true,
        message:
          "Project was created and is under review by our team. Your project will appear only after our team verifies the project within 72hours. Thank You",
      });

      return res.status(400).json({ message: "Invalid Data" });
    }

    res.status(500).json({ message: "Internal Error" });
  } catch (err) {
    res.status(400).json({ message: err.message, stack: err.stack });
  }
};

// ! @route POST /project/getProject
// ? @desc Login User
// * @acess Public
export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate("user")
      .populate({
        path: "volunteerList",
        populate: { path: "volunteers.user" },
      })
      .populate({
        path: "donationList",
        populate: { path: "donation.user" },
      });

    if (project) {
      return res.status(200).json({
        success: true,
        message: "Projects fetched successfully",
        data: project,
      });
    }

    res.status(400).json({ message: "Internal Error" });
  } catch (err) {
    res.status(400).json({ message: err.message, stack: err.stack });
  }
};

// ! @route POST /project/donate/:id
// ? @desc Login User
// * @acess Public
export const donateMoney = async (req, res) => {
  try {
    const { paymentResults } = req.body;
    const user = req.user;
    const project = await Project.findById(req.params.id)
      .populate("user")
      .populate({
        path: "volunteerList",
        populate: { path: "volunteers.user" },
      })
      .populate({
        path: "donationList",
        populate: { path: "donation.user" },
      });
    const donationList = await Donation.findById(project.donationList);

    if (donationList) {
      donationList.donation.push({
        user: user.id,
        amount: Number(paymentResults.purchase_units[0].amount.value),
      });
      project.donatedAmount =
        project.donatedAmount +
        Number(paymentResults.purchase_units[0].amount.value);

      await donationList.save();

      await project.save();

      return res.status(200).json({
        message: "Donation successful",
        status: "success",
        data: project,
      });
    }

    res.status(400).json({ message: "Internal Error" });
  } catch (err) {
    res.status(400).json({ message: err.message, stack: err.stack });
  }
};

// ! @route POST /project/verify/:id
// ? @desc Login User
// * @acess Adm
export const verifyProject = async (req, res) => {
  try {
    const user = req.user;
    const project = await Project.findById(req.params.id)
      .populate("user")
      .populate("user")
      .populate({
        path: "volunteerList",
        populate: { path: "volunteers.user" },
      })
      .populate({
        path: "donationList",
        populate: { path: "donation.user" },
      });

    if (user.isAdmin) {
      project.isVerified = true;

      await project.save();

      const verifiedProjects = await Project.find({ isVerified: true })
        .populate("user")
        .populate({
          path: "volunteerList",
          populate: { path: "volunteers.user" },
        })
        .populate({
          path: "donationList",
          populate: { path: "donation.user" },
        })
        .sort({ createdAt: -1 });

      const projects = await Project.find()
        .populate("user")
        .populate({
          path: "volunteerList",
          populate: { path: "volunteers.user" },
        })
        .populate({
          path: "donationList",
          populate: { path: "donation.user" },
        })
        .sort({ createdAt: -1 });

      return res.status(200).json({
        success: true,
        message: "Project verified successfully",
        data: verifiedProjects,
        project: project,
        all: projects,
      });
    }

    res.status(400).json({ message: "Internal Error" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message, stack: err.stack });
  }
};

// ! @route POST /project/verify/:id
// ? @desc Login User
// * @acess protected
export const addVolunteerToProject = async (req, res) => {
  try {
    const user = req.user;
    const projectId = req.params.id;
    const project = await Project.findById(projectId)
      .populate("user")
      .populate({
        path: "volunteerList",
        populate: { path: "volunteers.user" },
      })
      .populate({
        path: "donationList",
        populate: { path: "donation.user" },
      });
    const volunteerList = await Volunteer.findById(project.volunteerList);

    if (!volunteerList) {
      return res
        .status(400)
        .json({ message: "This projet doesn't requires volunteer." });
    }

    if (
      volunteerList.volunteers.filter((a) => user.id == a.user).length === 0
    ) {
      volunteerList.volunteers.push({ user: user.id });

      await volunteerList.save();

      const updatedProject = await await Project.findById(projectId)
        .populate("user")
        .populate({
          path: "volunteerList",
          populate: { path: "volunteers.user" },
        })
        .populate({
          path: "donationList",
          populate: { path: "donation.user" },
        });

      return res.status(201).json({
        success: true,
        message: "You are successfully added as a volunteer",
        data: updatedProject,
      });
    }

    return res.status(400).json({ message: "You are already a volunteer." });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message, stack: err.stack });
  }
};
