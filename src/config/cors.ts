import { Request, Response, NextFunction } from "express";
import i18n from "i18n";
import path from "path";

const allowedMethods = ["GET", "PUT", "PATCH", "POST", "DELETE"];

// Global i18n configuration
i18n.configure({
  directory: path.join(__dirname, "..", "locales"),
  defaultLocale: "en",
  autoReload: true, // Optional: reload when json files are updated
  updateFiles: false, // Optional: prevent writing to locale files
});

interface CustomRequest extends Request {
  lang?: string;
}

const corsMiddleware = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    // Allow CORS
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, x-app-token");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Vary", "Origin");

    // Set locale based on accept-language header
    const preferredLanguage = (req.headers["accept-language"] as string) || "en";
    req.lang = preferredLanguage;
    i18n.setLocale(req, preferredLanguage);
    i18n.setLocale(res, preferredLanguage);

    // Handle OPTIONS requests
    if (req.method === "OPTIONS") {
      res.header("Access-Control-Allow-Methods", allowedMethods.join(","));
      return res.status(200).json({});
    }

    // Allow access to the root route
    if (req.url === "/" || req.url === "") {
      return next();
    }

    // Validate x-app-token for API routes
    if (req.url.startsWith("/api") && req.headers["x-app-token"] === "Blue-202") {
      return next();
    }

    // Respond with forbidden for API routes without valid token
    if (req.url.startsWith("/api")) {
      return res.status(403).json({ success: false, error: i18n.__("forbidden"), code: 403 });
    }

    // Allow all other routes

    return next();
  } catch (err) {
    console.log(`err.message`, (err as Error).message);
    return res.status(500).json({ success: false, error: i18n.__("internalServerError"), code: 500 });
  }
};

export default corsMiddleware;
