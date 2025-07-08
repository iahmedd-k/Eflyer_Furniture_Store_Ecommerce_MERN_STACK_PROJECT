
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../Utils/Cloudinary.js";
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "eflyer_products",
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
  },
});

const upload = multer({ storage });

export default upload;