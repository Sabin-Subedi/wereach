import Project from "../models/projectModel.js";

// ! @route POST /project
// ? @desc Login User
// * @acess Public
export const getAllProjects = async (req, res) => {
  try {
    const project = await Project.find().populate("user").sort({createdAt: -1});

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
      imageLink
    } = req.body;


    if (!title || !description || !category || !openedFor || !location || !imageLink) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    if(openedFor.includes('donate') && !donationAmount){
      return res.status(400).json({ message: "Donation amount is required to make a funraising project." });
    }else if(openedFor.includes('volunteer') && !volunteerNumber){
      return res.status(400).json({ message: "Volunteer no required to open project for volunteering." });
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
      location,
      imageLink,
    });

    if (newProject) {
      const project = await Project.find();

      if (project) {
        return res.status(200).json({
          success: true,
          message: "Project was created and is under review by our team. Your project will appear only after our team verifies the project within 72hours. Thank You",
         
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


// ! @route POST /project/verify/:id
// ? @desc Login User
// * @acess Adm
export const verifyProject = async (req, res) => {
  try {
    const user = req.user
    const project =  await Project.findById(req.params.id).populate('user')
    
    if(user.isAdmin){
      project.isVerified = true

      await project.save()

      res.status(200).json({
        success: true,
        message: "Project verified successfully",
        data: project,
      })
    }

    res.status(400).json({ message: "Internal Error" });
  } catch (err) {
    res.status(400).json({ message: err.message, stack: err.stack });
  }
};

