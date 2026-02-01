import mongoose, {Schema} from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

const UserSchema = new Schema(
    {
    email: {
            type: String,
            required: true,
            unique: true,
            lowecase: true,
            trim: true,
            index: true
        },
    fullName: {
        type: String,
        // required: true,
        trim: true, 
        index: true
    },
    password: {
        type: String,
        // required: [true, 'Password is required']
    },
    familyId: {
        type : String,
    },
    role: {
        type: String,
        // required : true, 
        default : "user"
    },
    firebaseuid: {
        type: String,
        unique:true,
    },
    refreshToken:{
        type: String
    },
    
    }
)

UserSchema.pre("save", async function(next){
    
    if(!this.isModified("password")) return ;

    this.password = await bcrypt.hash(this.password, 10) 
    // next()
})

UserSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

UserSchema.methods.generateAccessToken = function(){

    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            fullName: this.fullName
        },
        process.env.ACESS_TOKEN,
        {
            expiresIn: process.env.ACESS_EXPIRY
        }
    )
}

UserSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            
        },
        process.env.REFRESH_TOKEN,
        {
            expiresIn: process.env.REFRESH_EXPIRY
        }
    )
}
export const User = mongoose.model("User", UserSchema)