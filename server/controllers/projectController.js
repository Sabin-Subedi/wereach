import Project from "../models/projectModel.js";

// ! @route POST /project/getAll
// ? @desc Login User
// * @acess Public
export const getAllProjects = async (req, res) => {
  try {
    const project = await Project.find().populate("user");

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
    } = req.body;

    if (!title || !description || !category || !openedFor) {
      return res.status(400).json({ message: "Missing required fields" });
    }

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
    });

    if (newProject) {
      const project = await Project.find();

      if (project) {
        return res.status(200).json({
          success: true,
          message: "Project created successfully",
          data: project,
        });
      }
    }

    res.status(400).json({ message: "Invalid Data" });
  } catch (err) {
    res.status(400).json({ message: err.message, stack: err.stack });
  }
};

// ! @route POST /project/getAll
// ? @desc Login User
// * @acess Public
export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate("user");

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
    const project = await Project.findById(req.params.id).populate("user");

    if (project) {
      project.donatedAmount =
        project.donatedAmount +
        Number(paymentResults.purchase_units[0].amount.value);

      project.donationUser.push(req.user.id);

      await project.save();

      const projects = await Project.find().populate("user");

      return res.status(200).json({
        message: "Donation successful",
        status: "success",
        data: projects,
      });
    }

    res.status(400).json({ message: "Internal Error" });
  } catch (err) {
    res.status(400).json({ message: err.message, stack: err.stack });
  }
};
