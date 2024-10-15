import { loadCanvasImages } from '../utility.js';

export default class OverworldView{
    constructor(){
        this.screen = document.getElementById('overworld-screen');
        this.overworldCanvas = document.getElementById('overworld-canvas');
        this.tileWidth = 64;
        this.tileHeight = 64;
        this.ctx = this.overworldCanvas.getContext('2d');
        this.viewport = {
           viewportWidth: 0, //in tiles
           viewportHeight: 0, //in tiles
           startTileCoordinates: [0,0],
           endTileCoordinates: [0,0],
           offset: [0,0],
        }
        this.resize();
    }
    updateViewport(map, partyPosition){
        this.viewport.offset[0] = Math.floor((this.overworldCanvas.width/2)-(partyPosition[0]*this.tileWidth)-(this.tileWidth/2)); //viewport width  - camera horizontal offset (px)
        this.viewport.offset[1] = Math.floor((this.overworldCanvas.height/2)-(partyPosition[1]*this.tileHeight)-(this.tileHeight/2)); //viewport height - camera vertical offset (py)
        
        this.viewport.viewportWidth = Math.floor(this.overworldCanvas.width / this.tileWidth);
        this.viewport.viewportHeight = Math.floor(this.overworldCanvas.height / this.tileHeight);
        this.viewport.startTileCoordinates[0] = partyPosition[0] - this.viewport.viewportWidth;
        this.viewport.startTileCoordinates[1] = partyPosition[1] - this.viewport.viewportHeight;
        this.viewport.endTileCoordinates[0] = partyPosition[0] + this.viewport.viewportWidth;
        this.viewport.endTileCoordinates[1] = partyPosition[1] + this.viewport.viewportHeight;
        if(this.viewport.startTileCoordinates[0] < 0){
            this.viewport.startTileCoordinates[0] = 0;
        }
        if(this.viewport.startTileCoordinates[1] < 0){
            this.viewport.startTileCoordinates[1] = 0;
        }
        if(this.viewport.endTileCoordinates[0] >= map.tileLayout[0].length){
            this.viewport.endTileCoordinates[0] = map.tileLayout[0].length - 1;
        }
        if(this.viewport.endTileCoordinates[1] >= map.tileLayout.length){
            this.viewport.endTileCoordinates[1] = map.tileLayout.length - 1;
        }
    }   
    resize(){
        this.overworldCanvas.width = window.innerWidth;
        this.overworldCanvas.height = window.innerHeight;
       
    }
    getTileDimensions(){
        return [this.tileWidth, this.tileHeight]
    }
    draw(map, partyPosition){//partyPosition is an array [x,y]
        this.updateViewport(map, partyPosition);
        loadCanvasImages([map.biome.terrainSrc, './assets/media/icons/hero.png']).then((images)=>{
            this.ctx.clearRect(0, 0, this.overworldCanvas.width, this.overworldCanvas.height); 
            let image = images[0];
            let heroIcon = images[1];
            for(let y = this.viewport.startTileCoordinates[1]; y <= this.viewport.endTileCoordinates[1]; y++){
                for(let x = this.viewport.startTileCoordinates[0]; x <= this.viewport.endTileCoordinates[0]; x++){
                   
                        this.ctx.drawImage(
                            image, 
                            64*map.tileLayout[y][x].imageCoordinates[0], 
                            64*map.tileLayout[y][x].imageCoordinates[1], 
                            64, 
                            64, 
                            x*this.tileWidth + this.viewport.offset[0], 
                            y*this.tileHeight + this.viewport.offset[1], 
                            this.tileWidth, 
                            this.tileHeight
                        );
                    
                }
            }
            //console.log("x: " + partyPosition[0] + " " + partyPosition[0]%(this.overworldCanvas.width/this.tileWidth)*this.tileWidth + " " + this.overworldCanvas.width);
            //console.log("y: " + partyPosition[1] + " " +partyPosition[1]%(this.overworldCanvas.height/this.tileHeight)*this.tileHeight + " " + this.overworldCanvas.height)
            this.ctx.drawImage(
                heroIcon, 
                partyPosition[0]*this.tileWidth + this.viewport.offset[0], 
                partyPosition[1]*this.tileHeight + this.viewport.offset[1], 
                this.tileWidth, 
                this.tileHeight); 
        });

    }
    playBattleTransition(){
        document.querySelector('body').classList.add('battle-wipe');
        this.screen.classList.add('greyscale')
        return new Promise((resolve)=>{
            setTimeout(()=>{
                this.screen.classList.remove('greyscale')
                resolve();
                
            }, 3000)
        })
    }
    hideOverWorldUi(){
        document.getElementById('overworld-ui-container').style.display = 'none';
    }
    revealOverworldUi(){
        document.getElementById('overworld-ui-container').style.display = 'flex';
    }
}

/*
	context.drawImage(image, frameX, frameY, frameWidth, frameHeight, canvasX, canvasY, canvasWidth, canvasHeight);

*/