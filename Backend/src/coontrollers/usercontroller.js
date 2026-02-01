import { asynchHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js"
import { User } from "../models/user.model.js";
import admin from "../firebaseverify.js";
import jwt from 'jsonwebtoken'

const generateAcessRefreshToken =async (userId)=>{
    try{
        const user = await User.findById(userId)
        const acessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()
        user.refreshToken = refreshToken

        await user.save({validateBeforeSave : false})
        return {acessToken, refreshToken}

    }catch(error){
        console.log(error)
        throw new ApiError(500, "Something went wrong")
    }

} 


const registerUser = asynchHandler( async (req , res , next) => {
    res.status(200).json({
        message : "ok"
    })
    const {email, password} = req.body
    if(email == ""){
        throw new ApiError(400, "email is required")
    }
    if(!email.includes("@")){
        throw new ApiError(400, "@ is required")
    }

    const userExist = await User.findOne({
        $or : [{email}]
    })
    if(userExist){
        throw new ApiError(409, "user already exist")
    }

    User.create({
        email, password
    })
}

)

const loginUser = asynchHandler(async (req,res)=>{
    
    const {email,password} = req.body

    if(!(password || email)) throw new ApiError(400,"email and password required")

    const user = await User.findOne({email})

    if(!user) throw new ApiError(404, "no such user")

    if(! await user.isPasswordCorrect(password)) throw new ApiError(401, "Wrong Password")

    const {acessToken, refreshToken} = await generateAcessRefreshToken(user._id)
    const loggeinUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpsOnly : true,
        secure : true,
    }

    return res.status(200).cookie("acessToken", acessToken, options)
    .cookie("refreshToken" , refreshToken, options)
    .json(
        new ApiResponse(
            200,
            {
                user: loggeinUser, acessToken, refreshToken
            },
            "User LoggedIn Succesfully"
        )
    )

})

const LogoutUser = async (req,res)=>{
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set : {
                refreshToken : undefined
            }
        },
        {
            new: true
        }
    )
    const options = {
        httpsOnly : true,
        secure : true,
    }
    return res.status(200)
    .clearCookie("acessToken", options)
    .clearCookie("refreshToken", options)
    .json(
        new ApiResponse(200, "", "Userlogged out")
    )
}

const RefreshAccessToken = asynchHandler(async (req,res)=>{
    const incomrefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if(!incomrefreshToken) throw new ApiError(401, "unauthorized req")

    const decodedToken = jwt.verify(incomrefreshToken, 
        process.env.REFRESH_TOKEN
    )
    const user = await User.findById(decodedToken?._id)
    if(!user) throw new ApiError(401, "invalid refresh token")

    if(incomrefreshToken!=user.refreshToken) throw new ApiError(401, "refresh token expired")
    
    const options = {
            httpOnly: true,
            secure: true
    }
    
    const {acessToken, newrefreshToken} = await generateAcessRefreshToken(user._id)

    return res
    .status(200)
    .cookie("accessToken", acessToken, options)
    .cookie("refreshToken", newrefreshToken, options)
    .json(
        new ApiResponse(
            200, 
            {acessToken, newrefreshToken},
            "Access token refreshed"
        )
    )
    
})

const firebaseAuth = asynchHandler(async (req, res) => {
  const authHeader = await  req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    throw new ApiError(401, "No Firebase token provided");
  }

  const token = authHeader.split(" ")[1];

  // Verify Firebase token
  const decoded = await admin.auth().verifyIdToken(token);

  const { uid, email, } = decoded;

  if (!email) {
    throw new ApiError(400, "Firebase email not found");
  }

  // Check MongoDB user
  let user = await User.findOne({ firebaseUid: uid });
  console.log(firebaseUid)
  // Create user if not exists
  if (!user) {
    user = await User.create({
      firebaseUid: uid,
      email,
    //   fullName: name || "Google User",
    //   avatar: picture,
    //   authProvider: "google",
    });
  }

  res.status(200).json(user);
});

 

 
export {registerUser, loginUser, LogoutUser, firebaseAuth, RefreshAccessToken}