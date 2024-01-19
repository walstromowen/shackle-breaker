export default class MiniMap{
    constructor(){
        this.miniMapCanvas = document.getElementById('mini-map-canvas');
        this.ctx = this.miniMapCanvas.getContext("2d");
        this.tileWidth = 32;
        this.tileHeight = 32;
        this.width = 288;
        this.height = 288;
        this.heroIcon = new Image();
        this.heroIcon.src = "media/icons/hero.png";
        this.entranceIcon = new Image();
        this.entranceIcon.src = "media/icons/entry-door.png";
        this.exitIcon = new Image();
        this.exitIcon.src = "media/icons/exit-door.png";
    }
    resizeCanvas(){
        this.miniMapCanvas.width = this.width;
        this.miniMapCanvas.height = this.height;
        
    }
    draw(map, currentCharacterCurrentRoom){
        let viewportDimensions = [(this.width/this.tileWidth), (this.height/this.tileHeight)]
        let gridCoordinates =   [
                                    Math.floor(currentCharacterCurrentRoom.position[0] / viewportDimensions[0]), //current grid x coorinate
                                    Math.floor(currentCharacterCurrentRoom.position[1] / viewportDimensions[1]) // current grid y coordinate
                                ];
        //this.ctx.clearRect(0, 0, 288, 288);
        map.roomArray.forEach((room) => {
            if(Math.floor(room.position[0] / viewportDimensions[0]) == gridCoordinates[0] && Math.floor(room.position[1] / viewportDimensions[1]) == gridCoordinates[1]){ //if selected room's gird coordinates is equal to currentCharacter's current grid coordinates
                if(room.type == "" || room.type == "enemySpawn" || room.type == "encounterSpawn" || room.type == "noSpawnEncounter"){
                    this.ctx.drawImage(map.mapEnviorment.terrain, 32*room.frameXCoordinate, 0, 32, 32, room.position[0]%viewportDimensions[0]*this.tileWidth, room.position[1]%viewportDimensions[1]*this.tileHeight, this.tileWidth, this.tileHeight);
                }
                if(room.type == 'wall'){
                    this.ctx.drawImage(map.mapEnviorment.terrain, 32*room.frameXCoordinate, 32, 32, 32, room.position[0]%viewportDimensions[0]*this.tileWidth, room.position[1]%viewportDimensions[1]*this.tileHeight, this.tileWidth, this.tileHeight);
                }
                if(room.type == 'entrance'){
                    this.ctx.drawImage(this.entranceIcon, room.position[0]%viewportDimensions[0]*this.tileWidth, room.position[1]%viewportDimensions[1]*this.tileHeight, this.tileWidth, this.tileHeight);
                }
                if(room.type == 'exit'){
                    this.ctx.drawImage(this.exitIcon, room.position[0]%viewportDimensions[0]*this.tileWidth, room.position[1]%viewportDimensions[1]*this.tileHeight, this.tileWidth, this.tileHeight);
                }
                if(room.type == 'boss chamber'){
                    this.ctx.drawImage(map.mapEnviorment.terrain, 32*room.frameXCoordinate, 128, 32, 32, room.position[0]%viewportDimensions[0]*this.tileWidth, room.position[1]%viewportDimensions[1]*this.tileHeight, this.tileWidth, this.tileHeight);
                }
                if(room.status == 'visited'){
                    this.ctx.fillStyle= "rgba(255, 255, 255, 0.2)"; 
                    this.ctx.fillRect(room.position[0]%viewportDimensions[0]*this.tileWidth, room.position[1]%viewportDimensions[1]*this.tileHeight, this.tileWidth-2, this.tileHeight-2);
                }
                if(room.status == 'retreated'){
                    this.ctx.fillStyle= "rgba(255, 0, 0, 0.2)";
                    this.ctx.fillRect(room.position[0]%viewportDimensions[0]*this.tileWidth, room.position[1]%viewportDimensions[1]*this.tileHeight, this.tileWidth-2, this.tileHeight-2);
                } 
            } 
        });
        this.ctx.drawImage(this.heroIcon, currentCharacterCurrentRoom.position[0]%(this.width/this.tileWidth)*this.tileWidth, currentCharacterCurrentRoom.position[1]%(this.width/this.tileWidth)*this.tileHeight, this.tileWidth, this.tileHeight); 
        
    }
}