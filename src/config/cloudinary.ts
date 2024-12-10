import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary with environment variables
cloudinary.config({
  cloud_name: "duafafiyr",
  api_key: "175733912985125",
  api_secret: "XhTZZVN9w0PpJe88G3N-ct_xkpU",
});

// Export the configured Cloudinary instance
export default cloudinary;
