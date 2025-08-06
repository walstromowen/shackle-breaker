import express from "express";
import { verifyToken } from '../middleware/auth.js';
import { getUser, updateUser, deleteUser} from "../controllers/userControllers.js";

const userRouter = express.Router();

userRouter.get('/profile', verifyToken, getUser);
userRouter.patch('/:id', verifyToken, updateUser);
userRouter.delete('/:id', verifyToken, deleteUser);


export default userRouter;
