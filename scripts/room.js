export default class Room{
    constructor(){
        this.description = "";
        this.roomNorth = "";
        this.roomSouth = "";
        this.roomEast = "";
        this.roomWest = "";
        this.visited = false;
        this.enemy = "";
        this.encounter = "";
        this.isExit = false;
        this.position = [0, 0]; //tile position in 2D
    }
    setRooms(roomNorth, roomEast, roomSouth, roomWest){
        this.roomNorth = roomNorth;
        this.roomEast = roomEast;
        this.roomSouth = roomSouth;
        this.roomWest = roomWest;
    }
    setRoomNorth(roomNorth){
        this.roomNorth = roomNorth;
    }
    setRoomEast(roomEast){
        this.roomEast = roomEast;
    }
    setRoomSouth(roomSouth){
        this.roomSouth = roomSouth;
    }
    setRoomWest(roomWest){
        this.roomWest = roomWest;
    }
}