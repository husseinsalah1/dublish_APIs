import { join } from "path";
import i18n from "i18n";

// Configure i18n
i18n.configure({
  locales: ["en", "ar"],
  directory: join(__dirname, "../locales"),
  defaultLocale: "en",
  objectNotation: true,
  autoReload: true,
});

export default i18n;
