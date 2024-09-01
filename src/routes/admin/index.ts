import express from "express";
import authRoutes from "./authRoutes";
import roleRoutes from "./roleRoutes";
import adminRoutes from "./adminRoutes";
import authMiddleware, {
  verifyPermissions,
} from "./../../middleware/authorizeMiddleware";

const router = express.Router();
const allowedRoles = ["superAdmin", "admin"];

router.use(authRoutes);
router.use([authMiddleware(allowedRoles), verifyPermissions], adminRoutes);
router.use(
  "/roles",
  [authMiddleware(allowedRoles), verifyPermissions],
  roleRoutes
);

export default router;
