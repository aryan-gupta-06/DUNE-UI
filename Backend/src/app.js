import express from "express"
const app = express()
import cors from "cors"
import cookieParser from "cookie-parser"

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credential: true
}))

app.use(express.json({limit:"48kb"}))
app.use(express.urlencoded({extended:true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())



import userRouter from "./routes/user_routes.js"

app.use("/api/routers", userRouter)
export {app}