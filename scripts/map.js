import Room from "./room.js";
import MapLayout from "./mapLayout.js";
import MapEnviorment from "./mapEnviorment.js";

export default class Map{
    constructor(playerLevel){
        this.roomArray = []; //Room array is 1 Dimensional
        this.mapLayout = new MapLayout();
        this.mapEnviorment = new MapEnviorment();
        this.mapWidth = this.mapLayout.width; //in tiles  
        this.mapHeight = this.mapLayout.height; //in tiles
        this.playerSpawnIndex = "";
        this.generateMap(playerLevel);  
    }
    generateMap(playerLevel){
        for(var y = 0; y < this.mapHeight; y++){
            for(var x = 0; x < this.mapWidth; x++){
                let newRoom = new Room();
                newRoom.position[0] = x;
                newRoom.position[1] = y;
                newRoom.description = `(${x},${y})`;
                this.roomArray.push(newRoom);
            }
        }
        for(var i = 0; i < this.roomArray.length; i++){
            //Room Specials
            switch(this.mapLayout.tileArray[i]){
                case 0:
                    let randomNumber = Math.floor(Math.random()*7)
                    if(randomNumber == 0){
                        this.roomArray[i].enemy = this.mapEnviorment.generateEnemy(playerLevel);
                    }
                    if(randomNumber == 1){
                        this.roomArray[i].encounter = this.mapEnviorment.generateEncounter(playerLevel);
                    }
                    break;
                case 2:
                    this.playerSpawnIndex = i;
                    break;
                case 3:
                    this.roomArray[i].isExit = true;
                default:
                    break;
            }
            //North Check
            if(this.roomArray[i].position[1] > 0){
                if(this.mapLayout.tileArray[i - this.mapWidth] !== 1){
                    this.roomArray[i].setRoomNorth(this.roomArray[(i - this.mapWidth)]); //subtract map width due to how rooms are stored in 1D roomArray
                }
            }
            //East Check
            if(this.roomArray[i].position[0] < this.mapWidth - 1){
                if(this.mapLayout.tileArray[i + 1] !== 1){
                    this.roomArray[i].setRoomEast(this.roomArray[(i + 1)]);
                }
            }
            //South Check 
            if(this.roomArray[i].position[1] < this.mapHeight - 1){
                if(this.mapLayout.tileArray[i + this.mapWidth] !== 1){
                    this.roomArray[i].setRoomSouth(this.roomArray[(i + this.mapWidth)]); //subtract map width due to how rooms are stored in 1D roomArray
                }
            }
             //West Check
             if(this.roomArray[i].position[0] ){
                if(this.mapLayout.tileArray[i - 1] !== 1){
                    this.roomArray[i].setRoomWest(this.roomArray[(i - 1)]);
                }
            }
        }  
    }
}
