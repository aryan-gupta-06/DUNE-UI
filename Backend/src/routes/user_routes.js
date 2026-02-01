import {Router} from 'express';
const router = Router();

import {firebaseAuth, loginUser, LogoutUser, registerUser, RefreshAccessToken, } from "../coontrollers/usercontroller.js"
import { uploadDocs } from '../coontrollers/docs.controller.js';

import { upload } from '../middlewares/multer.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

router.route("/register").post(
    // upload.fields([
    //     {
    //         name : "docs"
    //     },
    //     {
    //         name: "thumbnails"
    //     }
    registerUser
)

// router.route("/login").post
    // ]),(loginUser)
router.route("/logout").post(verifyJWT, LogoutUser)
// router.route("/firebaseauth").post(firebaseAuth)
router.route("refresh-token").post(RefreshAccessToken)
router.route("/uploade").post(upload.single("docs"), uploadDocs)


export default router;