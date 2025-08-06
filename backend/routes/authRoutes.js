import express from "express";
import cors from "cors";
import { registerUser, loginUser, logoutUser} from "../controllers/authControllers.js";

const authRouter = express.Router();

authRouter.use(
    cors({
        credentials: true,
        origin: "https://shackle-breaker-frontend.onrender.com/",
    })
)

authRouter.post('/register', registerUser)
authRouter.post('/login', loginUser)
authRouter.post('/logout', logoutUser)

export default authRouter;
