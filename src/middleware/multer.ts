import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { UploadApiOptions } from "cloudinary";
import cloudinary from "./../config/cloudinary";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req: Request, file: Express.Multer.File): Promise<UploadApiOptions> => ({
    folder: "uploads",
    formats: ["jpg", "png"], // Specify file format (e.g., 'png', 'jpg')
    public_id: `computed-filename-using-request-${Date.now()}`, // Customize public_id
  }),
});
const upload = multer({ storage: storage });

export default upload;
