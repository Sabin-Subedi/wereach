import express from "express";

import {
  addVolunteerToProject,
  createProject,
  donateMoney,
  getAllProjects,
  getProjectById,
} from "../controllers/projectController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/create").post(protect, createProject);
router.get("/", getAllProjects);
router.get("/getproject/:id", getProjectById);
router.post("/donate/:id", protect, donateMoney);

router.put("/add/volunteer/:id",protect,addVolunteerToProject)

export default router;
