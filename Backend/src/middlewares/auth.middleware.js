import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asynchHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"

export const verifyJWT =  asynchHandler(async (req, res, next)=>{
    try {
        const token = req.cookies?.acessToken || req.header("Authorization")?.replace("bearer", "")
    
        if(!token ) throw new ApiError(401, "Unauthorized req")
        const decodeToken = jwt.verify(token, process.env.ACESS_TOKEN)
        const user = await User.findById(decodeToken?._id).select("-password -refreshToken")
        if(!user) throw new ApiError(401, "invalid acess token")
        
        req.user = user;
        next()
    } catch (error) {
        console.log(error)
        throw new ApiError(401, "invalid acess token")
    }
})