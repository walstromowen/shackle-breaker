import GameModel from "./model/gameModel.js";
import GameView from "./view/gameView.js";
import GameController from "./controller/gameController.js";

const gameModel = new GameModel();
const gameView = new GameView();
const gameController = new GameController(gameModel, gameView);

gameController.switchScreen('title-screen');