
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({

    cloud_name: "dsfscypwv",
    api_key: "641645262887677",
    api_secret: "YrNIZDQzP2fHthHuyLMsRaQMncY",
    
  /*cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,*/
});

export default cloudinary;

