import express from "express";
import cors from "cors";
import { verifyToken } from '../middleware/auth.js';
import { getUser, updateUser, deleteUser} from "../controllers/userControllers.js";

const userRouter = express.Router();

userRouter.use(
    cors({
        credentials: true,
        origin: "http://127.0.0.1:5500",

    })
)

userRouter.get('/profile', verifyToken, getUser);
userRouter.patch('/:id', verifyToken, updateUser);
userRouter.delete('/:id', verifyToken, deleteUser);


export default userRouter;
