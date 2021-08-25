import express from "express";

import {
  addVolunteerToProject,
  createProject,
  donateMoney,
  getAllProjects,
  getProjectById,
  getProjects,
  verifyProject,
} from "../controllers/projectController.js";
import { isAdmin } from "../middlewares/adminMiddleware.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/create").post(protect, createProject);
router.get("/verified", getAllProjects);
router.get("/", protect, isAdmin, getProjects);
router.get("/getproject/:id", getProjectById);
router.post("/donate/:id", protect, donateMoney);
router.get("/verify/:id", protect, isAdmin, verifyProject);
router.put("/add/volunteer/:id", protect, addVolunteerToProject);

export default router;
