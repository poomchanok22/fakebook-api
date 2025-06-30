import express from "express";
import authRoute from "./routes/auth.route.js";
import notFoundMiddleware from "./middlewares/not-found.middleware.js";
import errorMiddlware from "./middlewares/error.middlware.js";
import cors from "cors"
import postRoute from "./routes/post.route.js";
import authenticate from "./middlewares/authenticate.middleware.js";

const app = express()

app.use(cors({
  origin : "http://localhost:5173"
}))

app.use(express.json())

app.use("/api/auth", authRoute)
app.use("/api/post", authenticate, postRoute)
app.use("/api/comment", (req,res)=> res.send("comment service"))
app.use("/api/like", (req,res)=> res.send("like service"))
app.use("/api/admin", (req,res)=> res.send("like service"))


app.use(notFoundMiddleware)
app.use(errorMiddlware)
export default app