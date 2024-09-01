import { Request, Response, NextFunction } from "express";
import i18n from "../config/i18nConfig";

function localeMiddleware(req: Request, res: Response, next: NextFunction) {
  const locale = req.headers["accept-language"] || "en";
  i18n.setLocale(locale);
  req.locale = locale;
  next();
}

export default localeMiddleware;
