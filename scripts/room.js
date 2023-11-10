export default class Room{
    constructor(){
        this.description = "";
        this.type = "";
        this.roomNorth = "";
        this.roomSouth = "";
        this.roomEast = "";
        this.roomWest = "";
        this.status = "notVisited";
        this.enemyArray = [];
        this.encounter = "";
        this.isExit = false;
        this.frameXCoordinate = 0;//for different image versions of same room type
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