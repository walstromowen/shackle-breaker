import { loadCanvasImages } from '../utility.js';

export default class OverworldView {
  constructor() {
    this.screen = document.getElementById('overworld-screen');
    this.overworldCanvas = document.getElementById('overworld-canvas');
    this.mapTileContainer = document.getElementById('overworld-map-title-container');
    this.mapTile = document.getElementById('overworld-map-title');
    this.tileWidth = 64;
    this.tileHeight = 64;
    this.ctx = this.overworldCanvas.getContext('2d');
    this.viewport = {
      viewportWidth: 0,
      viewportHeight: 0,
      startTileCoordinates: [0, 0],
      endTileCoordinates: [0, 0],
      offset: [0, 0],
      movementOffset: [0, 0],
    };
    this.images = {}; // store preloaded images as named keys
    this.resize();
  }

  async preloadImages(map) {
    const loaded = await loadCanvasImages([
      map.biome.terrainSrc,
      './assets/media/icons/hero.png',
      './assets/media/icons/battle-present.png',
      './assets/media/icons/encounter-present.png'
    ]);

    this.images = {
      terrain: loaded[0],
      hero: loaded[1],
      battle: loaded[2],
      encounter: loaded[3]
    };
  }

  processMovement(currentPosition, nextPosition, fpsInterval, playerMovementDelay) {
    // Calculate how far to move this frame
    const diff = (this.tileWidth * fpsInterval) / playerMovementDelay; // smooth per-frame movement
    let moveX = 0, moveY = 0;

    // Determine direction
    if (currentPosition[0] < nextPosition[0]) moveX = -diff;
    else if (currentPosition[0] > nextPosition[0]) moveX = diff;

    if (currentPosition[1] < nextPosition[1]) moveY = -diff;
    else if (currentPosition[1] > nextPosition[1]) moveY = diff;

    // Increment viewport offset smoothly
    this.viewport.movementOffset[0] += moveX;
    this.viewport.movementOffset[1] += moveY;

    // Clamp offset to tile size to prevent overshoot
    if (Math.abs(this.viewport.movementOffset[0]) > this.tileWidth)
        this.viewport.movementOffset[0] = Math.sign(this.viewport.movementOffset[0]) * this.tileWidth;

    if (Math.abs(this.viewport.movementOffset[1]) > this.tileHeight)
        this.viewport.movementOffset[1] = Math.sign(this.viewport.movementOffset[1]) * this.tileHeight;
}

  updateViewport(map, partyPosition) {
    // Center camera on hero plus in-progress movement
    this.viewport.offset[0] = Math.floor(
      (this.overworldCanvas.width / 2) - 
      ((partyPosition[0] + (-this.viewport.movementOffset[0] / this.tileWidth)) * this.tileWidth) - 
      (this.tileWidth / 2)
    );

    this.viewport.offset[1] = Math.floor(
      (this.overworldCanvas.height / 2) - 
      ((partyPosition[1] + (-this.viewport.movementOffset[1] / this.tileHeight)) * this.tileHeight) - 
      (this.tileHeight / 2)
    );

    this.viewport.viewportWidth = Math.floor(this.overworldCanvas.width / this.tileWidth);
    this.viewport.viewportHeight = Math.floor(this.overworldCanvas.height / this.tileHeight);

    this.viewport.startTileCoordinates[0] = Math.max(0, partyPosition[0] - this.viewport.viewportWidth);
    this.viewport.startTileCoordinates[1] = Math.max(0, partyPosition[1] - this.viewport.viewportHeight);

    this.viewport.endTileCoordinates[0] = Math.min(map.tileLayout[0].length - 1, partyPosition[0] + this.viewport.viewportWidth);
    this.viewport.endTileCoordinates[1] = Math.min(map.tileLayout.length - 1, partyPosition[1] + this.viewport.viewportHeight);
  }

  resize() {
    this.overworldCanvas.width = window.innerWidth;
    this.overworldCanvas.height = window.innerHeight;
  }

  draw(map, partyPosition) {
    if (!this.images.terrain) return; // wait until images are loaded

    this.updateViewport(map, partyPosition);
    this.ctx.clearRect(0, 0, this.overworldCanvas.width, this.overworldCanvas.height);

    const { terrain, hero, battle, encounter } = this.images;

    for (let y = this.viewport.startTileCoordinates[1]; y <= this.viewport.endTileCoordinates[1]; y++) {
      for (let x = this.viewport.startTileCoordinates[0]; x <= this.viewport.endTileCoordinates[0]; x++) {
        const drawX = x * this.tileWidth + this.viewport.offset[0] + this.viewport.movementOffset[0];
        const drawY = y * this.tileHeight + this.viewport.offset[1] + this.viewport.movementOffset[1];

        // Draw terrain
        this.ctx.drawImage(
          terrain,
          1 + (64 + 2) * map.tileLayout[y][x].tileImageCoordinates[0],
          1 + (64 + 2) * map.tileLayout[y][x].tileImageCoordinates[1],
          this.tileWidth,
          this.tileHeight,
          drawX,
          drawY,
          this.tileWidth,
          this.tileHeight
        );

        // Draw map objects
        const obj = map.tileLayout[y][x].mapObject;
        if (obj !== '') {
          this.ctx.drawImage(
            terrain,
            1 + (64 + 2) * obj.imageCoordinates[0],
            1 + (64 + 2) * obj.imageCoordinates[1],
            64 * obj.imageFrameSize[0] + (2 * (obj.imageFrameSize[0] - 1)),
            64 * obj.imageFrameSize[1] + (2 * (obj.imageFrameSize[1] - 1)),
            drawX,
            drawY - (64 * (obj.imageFrameSize[1] - 1)),
            this.tileWidth * obj.imageFrameSize[0],
            this.tileHeight * obj.imageFrameSize[1]
          );
        }

        // Draw encounter/battle icons
        const tile = map.tileLayout[y][x];
        if (tile.status === 'visited' && (tile.encounter !== '' || tile.battle !== '')) {
          const icon = tile.battle !== '' ? battle : encounter;
          this.ctx.drawImage(icon, drawX, drawY, this.tileWidth, this.tileHeight);
        }
      }
    }

    // Draw hero at center of tile plus movement offset
    const heroX = partyPosition[0] * this.tileWidth + this.viewport.offset[0] + this.viewport.movementOffset[0];
    const heroY = partyPosition[1] * this.tileHeight + this.viewport.offset[1] + this.viewport.movementOffset[1];
    this.ctx.drawImage(hero, heroX, heroY, this.tileWidth, this.tileHeight);
  }

  // Other utility functions
  playBattleTransition() {
    document.querySelector('body').classList.add('battle-wipe');
    this.screen.classList.add('greyscale');
    return new Promise((resolve) => {
      setTimeout(() => {
        this.screen.classList.remove('greyscale');
        resolve();
      }, 3000);
    });
  }

  hideOverWorldUi() {
    document.getElementById('overworld-ui-container').style.display = 'none';
  }

  revealOverworldUi() {
    document.getElementById('overworld-ui-container').style.display = 'flex';
  }

  revealMapTitle() {
    this.mapTileContainer.style.display = 'flex';
    this.mapTileContainer.classList.add('animate-map-title');
  }

  hideMapTitle() {
    this.mapTileContainer.style.display = 'none';
    this.screen.classList.remove('animate-map-title');
  }

  updateMapTitle(biomeName) {
    this.mapTile.innerText = biomeName.toUpperCase();
  }
}

/*
import { loadCanvasImages } from '../utility.js';

export default class OverworldView{
    constructor(){
        this.screen = document.getElementById('overworld-screen');
        this.overworldCanvas = document.getElementById('overworld-canvas');
        this.mapTileContainer = document.getElementById('overworld-map-title-container');
        this.mapTile = document.getElementById('overworld-map-title');
        this.tileWidth = 64;
        this.tileHeight = 64;
        this.ctx = this.overworldCanvas.getContext('2d');
        this.viewport = {
            viewportWidth: 0, //in tiles
            viewportHeight: 0, //in tiles
            startTileCoordinates: [0,0],
            endTileCoordinates: [0,0],
            offset: [0,0],
            movementOffset: [0, 0],
        }
        this.resize();
    }
    processMovement(currentPosition, nextPosition, fpsInterval, playerMovementDelay){
        //let diff = this.tileWidth/(playerMovementDelay/fpsInterval);
        let diff = Math.floor(this.tileWidth/(playerMovementDelay/fpsInterval));
        if(currentPosition[1] > nextPosition[1]) this.viewport.movementOffset[1] += diff //up
        if(currentPosition[1] < nextPosition[1]) this.viewport.movementOffset[1] -= diff //down
        if(currentPosition[0] > nextPosition[0]) this.viewport.movementOffset[0] += diff///left
        if(currentPosition[0] < nextPosition[0]) this.viewport.movementOffset[0] -= diff///right
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
        loadCanvasImages([map.biome.terrainSrc, './assets/media/icons/hero.png', './assets/media/icons/battle-present.png', './assets/media/icons/encounter-present.png']).then((images)=>{
            this.ctx.clearRect(0, 0, this.overworldCanvas.width, this.overworldCanvas.height); 
            //loop for tile background
            for(let y = this.viewport.startTileCoordinates[1]; y <= this.viewport.endTileCoordinates[1]; y++){
                for(let x = this.viewport.startTileCoordinates[0]; x <= this.viewport.endTileCoordinates[0]; x++){
                    this.ctx.drawImage(
                        images[0], 
                        1 + (64 + 2)*map.tileLayout[y][x].tileImageCoordinates[0], 
                        1 + (64 + 2)*map.tileLayout[y][x].tileImageCoordinates[1], 
                        this.tileWidth, 
                        this.tileHeight, 
                        x*this.tileWidth + this.viewport.offset[0] + (this.viewport.movementOffset[0]), 
                        y*this.tileHeight + this.viewport.offset[1] + (this.viewport.movementOffset[1]),
                        this.tileWidth, 
                        this.tileHeight,
                    );
                    if(map.tileLayout[y][x].status == 'visited' && (map.tileLayout[y][x].encounter != '' || map.tileLayout[y][x].battle != '')){
                        let icon;
                        if(map.tileLayout[y][x].battle != ''){
                            icon = images[2];
                        }else{
                            icon = images[3]
                        }
                        this.ctx.drawImage(
                            icon, 
                            x*this.tileWidth + this.viewport.offset[0] + (this.viewport.movementOffset[0]), 
                            y*this.tileHeight + this.viewport.offset[1] + (this.viewport.movementOffset[1]), 
                            this.tileWidth, 
                            this.tileHeight
                        );
                    }
                }
            }
            //Then Draw Character
            this.ctx.drawImage(
                images[1], 
                partyPosition[0]*this.tileWidth + this.viewport.offset[0], 
                partyPosition[1]*this.tileHeight + this.viewport.offset[1], 
                this.tileWidth, 
                this.tileHeight
            ); 
            //loop for map objects
            for(let y = this.viewport.startTileCoordinates[1]; y <= this.viewport.endTileCoordinates[1]; y++){
                for(let x = this.viewport.startTileCoordinates[0]; x <= this.viewport.endTileCoordinates[0]; x++){
                    if(map.tileLayout[y][x].mapObject != ''){
                        this.ctx.drawImage(
                            images[0], 
                            1 + (64 + 2)*map.tileLayout[y][x].mapObject.imageCoordinates[0], 
                            1 + (64 + 2)*map.tileLayout[y][x].mapObject.imageCoordinates[1], 
                            64 * map.tileLayout[y][x].mapObject.imageFrameSize[0] + (2 * (map.tileLayout[y][x].mapObject.imageFrameSize[0] - 1)), 
                            64 * map.tileLayout[y][x].mapObject.imageFrameSize[1] + (2 * (map.tileLayout[y][x].mapObject.imageFrameSize[1] - 1)), 
                            x*this.tileWidth + this.viewport.offset[0] + (this.viewport.movementOffset[0]), 
                            y*this.tileHeight + this.viewport.offset[1] + (this.viewport.movementOffset[1]) - (64 * (map.tileLayout[y][x].mapObject.imageFrameSize[1] - 1) ),
                            this.tileWidth * map.tileLayout[y][x].mapObject.imageFrameSize[0], 
                            this.tileHeight * map.tileLayout[y][x].mapObject.imageFrameSize[1],
                        );
                    }
                }
            }
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
    revealMapTitle(){
        this.mapTileContainer.style.display = 'flex';
        this.mapTileContainer.classList.add('animate-map-title');
    }
    hideMapTitle(){
        this.mapTileContainer.style.display = 'none';
        this.screen.classList.remove('animate-map-title')
    }
    updateMapTitle(biomeName){
        this.mapTile.innerText = biomeName.toUpperCase();
    }
}


	//context.drawImage(image, frameX, frameY, frameWidth, frameHeight, canvasX, canvasY, canvasWidth, canvasHeight);

*/

