export default class MiniMap{
    constructor(){
        this.miniMapCanvas = document.getElementById('mini-map-canvas');
        this.ctx = this.miniMapCanvas.getContext("2d");
        this.tileWidth = 32;
        this.tileHeight = 32;
        this.width = 288;
        this.height = 288;
        
    }
    resizeCanvas(){
        this.miniMapCanvas.width = this.width;
        this.miniMapCanvas.height = this.height;
        
    }
    draw(roomArray, playerCurrentRoom){
        this.ctx.clearRect(0, 0, 288, 288);
        roomArray.forEach((room) => { 
            if(room.visited === true){
                this.ctx.fillStyle= "black";
                this.ctx.fillRect(room.position[0]*this.tileWidth, room.position[1]*this.tileHeight, this.tileWidth, this.tileHeight);
                this.ctx.fillStyle= "red";
                this.ctx.fillRect(room.position[0]*this.tileWidth + 1, room.position[1]*this.tileHeight + 1, this.tileWidth-2, this.tileHeight-2);
            }
        });
        this.ctx.fillStyle= "yellow";
        this.ctx.fillRect(playerCurrentRoom.position[0]*this.tileWidth, playerCurrentRoom.position[1]*this.tileHeight, this.tileWidth, this.tileHeight); 
         
    }
}