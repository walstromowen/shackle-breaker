import express from "express";
import cors from "cors";
import { verifyToken } from '../middleware/auth.js';
import { createGameSave, getGameSaves, deleteGameSave, updateGameSave} from "../controllers/gameSaveControllers.js";

const gameSaveRouter = express.Router();

gameSaveRouter.use(
    cors({
        credentials: true,
        origin: "https://shackle-breaker-frontend.onrender.com/",

    })
)
gameSaveRouter.get('/', verifyToken, getGameSaves);
gameSaveRouter.post('/', verifyToken, createGameSave);
gameSaveRouter.delete('/:id', verifyToken, deleteGameSave);
gameSaveRouter.patch('/:id', verifyToken, updateGameSave);

export default gameSaveRouter;
