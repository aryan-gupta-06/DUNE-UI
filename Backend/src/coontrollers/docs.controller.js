import { asynchHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Docs } from "../models/docs.model.js"
import { upload } from '../middlewares/multer.js';

export const uploadDocs = async(req, res) =>{
    if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  console.log(req.file) 

  res.status(200).json({
    message: "File uploaded successfully",
    file: {
      filename: req.file.filename,
      path: req.file.path,
      size : req.file.size,
    },
  }); 

} 
