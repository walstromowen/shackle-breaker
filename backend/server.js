import express from "express";
import dotenv from "dotenv"
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import gameSaveRouter from "./routes/gameSaveRoutes.js";
import cors from "cors";


const app = express();

dotenv.config();

mongoose.connect(process.env.ATLAS_URI).then(()=>{
    console.log('Successful connection to MongoDB database.')
}).catch((err)=>{
    console.log(err)
});

const PORT = process.env.PORT || 8000;
app.use(
    cors({
        credentials: true,
        origin: "https://shackle-breaker-frontend.onrender.com",
    })
)
app.use(express.urlencoded({extended: false}))
app.use(express.json({ limit: '10mb' }));
app.use(cookieParser());//allows controllers to read req.cookies
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/gamesaves", gameSaveRouter);

app.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}`)
});

app.get("/", (req, res)=>{
    res.send('sucessful connection to server')
})



