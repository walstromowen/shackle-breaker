import GameModel from "./model/gameModel.js";
import GameView from "./view/gameView.js";
import GameController from "./controller/gameController.js";
//import Map from "./model/misc/map.js";


const gameModel = new GameModel();
const gameView = new GameView();
const gameController = new GameController(gameModel, gameView);

gameController.switchScreen('login-screen');

/* Missing Entrance Bug Fix Code
let mapArray = []
for(let i = 0; i < 100; i++){
    mapArray.push(new Map('random'))
}
let printArray = []
for(let i = 0; i < mapArray.length; i++){
    let value = mapArray[i].getEntrancePosition()
    if(!value){
        mapArray[i].tileLayout.forEach((row)=>{
            let printRow = []
            row.forEach((tile)=>{
                if(tile.mapObject) printRow.push(tile.mapObject.name[0])
                else printRow.push('blank')
            })
            printArray.push(printRow)
        })
        console.log(printArray)
     break
    }
}
*/


