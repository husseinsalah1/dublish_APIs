import express from "express";
import adminRoutes from "./admin";
import studentRoutes from "./student";
import courseRoutes from "./course";
const router = express.Router();

router.use("/admin", adminRoutes);
router.use("/student", studentRoutes);
router.use("/course", courseRoutes);

export default router;
