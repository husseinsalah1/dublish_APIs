import express from "express";
import authRoutes from "./authRoutes";
import adminRoutes from "./adminRoutes";
import roleRoutes from "./roleRoutes";
import studentRoutes from "./studentRoutes";
import permissionRoutes from "./permissionRoutes";
import authMiddleware, { verifyPermissions } from "./../../middleware/authorizeMiddleware";

const router = express.Router();
const allowedRoles = ["superAdmin", "admin"];

router.use(authRoutes);
router.use([authMiddleware(allowedRoles), verifyPermissions], adminRoutes);
router.use("/roles", [authMiddleware(allowedRoles), verifyPermissions], roleRoutes); // Add this line
router.use("/students", [authMiddleware(allowedRoles), verifyPermissions], studentRoutes);
router.use("/permissions", [authMiddleware(allowedRoles), verifyPermissions], permissionRoutes);

export default router;
