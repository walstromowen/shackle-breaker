import Room from "./room.js";
import {layout as theLayout} from "./mapLayout.js";

export default class Map{
    constructor(){
        this.roomArray = []; //Room array is 1 Dimensional
        this.layout = theLayout;
        this.mapWidth = theLayout.width; //in tiles  
        this.mapHeight = theLayout.height; //in tiles
        this.playerSpawnIndex = theLayout.layout.findIndex((number)=>{
            if(number === 2){
                return number;
            }
        });
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
            //North Check
            if(this.roomArray[i].position[1] > 0){
                if(theLayout.layout[i - theLayout.width] !== 1){
                    this.roomArray[i].setRoomNorth(this.roomArray[(i - this.mapWidth)]); //subtract map width due to how rooms are storied in 1D roomArray
                }
            }
            //East Check
            if(this.roomArray[i].position[0] < this.mapWidth - 1){
                if(theLayout.layout[i + 1] !== 1){
                    this.roomArray[i].setRoomEast(this.roomArray[(i + 1)]);
                }
            }
            //South Check 
            if(this.roomArray[i].position[1] < this.mapHeight - 1){
                if(theLayout.layout[i + theLayout.width] !== 1){
                    this.roomArray[i].setRoomSouth(this.roomArray[(i + this.mapWidth)]); //subtract map width due to how rooms are stored in 1D roomArray
                }
            }
             //West Check
             if(this.roomArray[i].position[0] ){
                if(theLayout.layout[i - 1] !== 1){
                    this.roomArray[i].setRoomWest(this.roomArray[(i - 1)]);
                }
            }
        }  
    }
}
