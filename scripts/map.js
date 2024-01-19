import Room from "./room.js";
import MapLayout from "./mapLayout.js";
import MapEnviorment from "./mapEnviorment.js";

export default class Map{
    constructor(biome, layoutType){
        this.roomArray = []; //Room array is 1 Dimensional
        this.mapLayout = new MapLayout(layoutType);
        this.mapEnviorment = new MapEnviorment(biome);
        this.mapWidth = this.mapLayout.width; //in tiles  
        this.mapHeight = this.mapLayout.height; //in tiles
        this.currentCharacterSpawnIndex = "";
        this.generateMap();  
    }
    generateMap(){
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
            //Room Assignments.
            switch(this.mapLayout.tileArray[i]){
                case 0:
                    this.roomArray[i].frameXCoordinate = this.mapEnviorment.frameCoordinates[0][Math.floor(Math.random()*this.mapEnviorment.frameCoordinates[0].length)];
                    let randomNumber = Math.floor(Math.random()*30)
                    if(randomNumber <= 2){
                        this.roomArray[i].type = "enemySpawn";
                    }
                    if(randomNumber >= 3 && randomNumber <= 5){
                        this.roomArray[i].type = "encounterSpawn";
                    }
                    break;
                case 1:
                    this.roomArray[i].type = "wall";
                    this.roomArray[i].frameXCoordinate = this.mapEnviorment.frameCoordinates[1][Math.floor(Math.random()*this.mapEnviorment.frameCoordinates[1].length)];
                    break;
                case 2:
                    this.roomArray[i].type = "entrance";
                    this.currentCharacterSpawnIndex = i;
                    break;
                case 3:
                    this.roomArray[i].type = "exit";
                    this.roomArray[i].isExit = true;
                    break;
                case 4:
                    if(Math.floor(Math.random()*2) == 0){
                        this.roomArray[i].frameXCoordinate = this.mapEnviorment.frameCoordinates[0][Math.floor(Math.random()*this.mapEnviorment.frameCoordinates[0].length)];
                    }else{
                        this.roomArray[i].type = "wall";
                        this.roomArray[i].frameXCoordinate = this.mapEnviorment.frameCoordinates[1][Math.floor(Math.random()*this.mapEnviorment.frameCoordinates[1].length)];
                    }
                    break;
                case 5:
                    this.roomArray[i].type = "boss chamber";
                    this.roomArray[i].frameXCoordinate = this.mapEnviorment.frameCoordinates[1][Math.floor(Math.random()*this.mapEnviorment.frameCoordinates[4].length)];
                    break;
                case 6:
                    this.roomArray[i].type = "noSpawnEncounter";
                    this.roomArray[i].frameXCoordinate = this.mapEnviorment.frameCoordinates[0][Math.floor(Math.random()*this.mapEnviorment.frameCoordinates[0].length)];
                    break;
                default:
                    break;
            }
        }
        for(var i = 0; i < this.roomArray.length; i++){
            //Room Conections
            //North Check
            if(this.roomArray[i].position[1] > 0){
                if(this.roomArray[i - this.mapWidth].type != "wall"){
                    this.roomArray[i].setRoomNorth(this.roomArray[(i - this.mapWidth)]); //subtract map width due to how rooms are stored in 1D roomArray  
                }
            }
            //East Check
            if(this.roomArray[i].position[0] < this.mapWidth - 1){
                if(this.roomArray[i + 1].type != "wall"){
                    this.roomArray[i].setRoomEast(this.roomArray[(i + 1)]); 
                }
            }
            //South Check 
            if(this.roomArray[i].position[1] < this.mapHeight - 1){
                if(this.roomArray[i + this.mapWidth].type != "wall"){
                    this.roomArray[i].setRoomSouth(this.roomArray[(i + this.mapWidth)]); //subtract map width due to how rooms are stored in 1D roomArray 
                }
            }
             //West Check
             if(this.roomArray[i].position[0] > 0){
                if(this.roomArray[i - 1].type != "wall"){
                    this.roomArray[i].setRoomWest(this.roomArray[(i - 1)]); 
                }
            }
        }  
    }
}
