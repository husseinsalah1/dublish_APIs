import i18n from "../config/i18nConfig";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import UnauthorizedException from "../exceptions/unauthorized";
import { ErrorCodes } from "../exceptions/root";

const JWT_SECRET = process.env.JWT_SECRET || "dublish-secret-key";

interface TokenData {
  role?: string;
  [key: string]: any;
}

interface CustomRequest extends Request {
  tokenData?: TokenData;
}

const extractToken = (authHeader: string | undefined): string | null => {
  if (!authHeader) return null;
  const parts = authHeader.split(" ");
  return parts.length === 2 ? parts[1] : null;
};

const verifyToken = (token: string): TokenData | null => {
  try {
    return jwt.verify(token, JWT_SECRET) as TokenData;
  } catch (err) {
    return null;
  }
};

const authMiddleware = (roles: string[]) => {
  return async (req: CustomRequest, res: Response, next: NextFunction) => {
    const token = extractToken(req.headers["authorization"]);
    if (!token) {
      console.log("No token found");

      return next(new UnauthorizedException(i18n.__("errors.unauthorized"), ErrorCodes.UNAUTHORIZED_ACCESS));
    }

    const tokenData = verifyToken(token);
    if (!tokenData) {
      console.log("Invalid token");
      return next(new UnauthorizedException(i18n.__("errors.invalidToken"), ErrorCodes.UNAUTHORIZED_ACCESS));
    }

    if (!roles.includes(tokenData.role ?? "")) {
      console.log("Invalid role");
      return next(new UnauthorizedException(i18n.__("errors.unauthorized"), ErrorCodes.UNAUTHORIZED_ACCESS));
    }

    req.tokenData = tokenData;
    return next();
  };
};

export const verifyPermissions = (req: CustomRequest, res: Response, next: NextFunction) => {
  if (req.tokenData?.role === "superAdmin") {
    return next();
  }
  if (!req.tokenData) {
    return next(new UnauthorizedException(i18n.__("errors.unauthorized"), ErrorCodes.UNAUTHORIZED_ACCESS));
  }
  try {
    let requesterId = req.query._id || req.body._id;
    let allowedEndPoints = ["/admin/get", "/admin/password", "/admin/image"];
    const endPoint = req.originalUrl.split("?").shift()?.slice(7);

    const adminPermissions = req.tokenData.permissions.permissions;

    let isFound = false;
    if (allowedEndPoints.includes(endPoint as string) && req.tokenData._id == requesterId) return next();

    for (let key in adminPermissions) {
      if (adminPermissions[key].includes(endPoint)) {
        isFound = true;
        return next();
      }
    }
    if (!isFound)
      return res.status(403).json({
        success: false,
        error: i18n.__("errors.unauthorized"),
        code: 403,
      });

    return res.status(403).json({
      success: false,
      error: i18n.__("errors.unauthorized"),
      code: 403,
    });
  } catch (error) {
    return next(new UnauthorizedException(i18n.__("errors.unauthorized"), ErrorCodes.UNAUTHORIZED_ACCESS));
  }
};

export default authMiddleware;
