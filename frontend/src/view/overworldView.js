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
      startTileCoordinates: [0,0],
      endTileCoordinates: [0,0],
      offset: [0,0],
      movementOffset: [0,0],
    };

    this.images = {}; // preloaded images
    this.resize();
  }

  // Preload all necessary images for the current map
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

  // Smooth movement for player
  processMovement(currentPosition, nextPosition, fpsInterval, playerMovementDelay) {
    const diff = this.tileHeight / (playerMovementDelay / fpsInterval);

    if (currentPosition[0] === nextPosition[0] && currentPosition[1] === nextPosition[1]) {
      this.viewport.movementOffset = [0,0];
      return;
    }

    if (currentPosition[1] < nextPosition[1]) this.viewport.movementOffset[1] -= diff; // down
    if (currentPosition[1] > nextPosition[1]) this.viewport.movementOffset[1] += diff; // up
    if (currentPosition[0] < nextPosition[0]) this.viewport.movementOffset[0] -= diff; // right
    if (currentPosition[0] > nextPosition[0]) this.viewport.movementOffset[0] += diff; // left

    // clamp offset to tile size
    this.viewport.movementOffset[0] = Math.max(-this.tileWidth, Math.min(this.tileWidth, this.viewport.movementOffset[0]));
    this.viewport.movementOffset[1] = Math.max(-this.tileHeight, Math.min(this.tileHeight, this.viewport.movementOffset[1]));
  }

  // Update camera viewport to keep player centered
  updateViewport(map, partyPosition) {
    this.viewport.offset[0] = Math.round((this.overworldCanvas.width / 2) - (partyPosition[0] * this.tileWidth) - (this.tileWidth / 2) + this.viewport.movementOffset[0]);
    this.viewport.offset[1] = Math.round((this.overworldCanvas.height / 2) - (partyPosition[1] * this.tileHeight) - (this.tileHeight / 2) + this.viewport.movementOffset[1]);

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
    if (!this.images.terrain) return; // images not loaded yet

    this.updateViewport(map, partyPosition);
    this.ctx.clearRect(0, 0, this.overworldCanvas.width, this.overworldCanvas.height);

    const terrain = this.images.terrain;
    const hero = this.images.hero;
    const battleIcon = this.images.battle;
    const encounterIcon = this.images.encounter;

    const objectsBehind = [];
    const objectsFront = [];

    // Loop tiles
    for (let y = this.viewport.startTileCoordinates[1]; y <= this.viewport.endTileCoordinates[1]; y++) {
      for (let x = this.viewport.startTileCoordinates[0]; x <= this.viewport.endTileCoordinates[0]; x++) {
        const tile = map.tileLayout[y][x];
        const drawX = Math.round(x * this.tileWidth + this.viewport.offset[0] + this.viewport.movementOffset[0]);
        const drawY = Math.round(y * this.tileHeight + this.viewport.offset[1] + this.viewport.movementOffset[1]);

        // Draw terrain tile
        this.ctx.drawImage(
          terrain,
          1 + (64 + 2) * tile.tileImageCoordinates[0],
          1 + (64 + 2) * tile.tileImageCoordinates[1],
          this.tileWidth,
          this.tileHeight,
          drawX,
          drawY,
          this.tileWidth,
          this.tileHeight
        );

        // Separate objects by layer
        if (tile.mapObject !== '') {
          if (tile.mapObject.layer === 'front') {
            objectsFront.push({ obj: tile.mapObject, drawX, drawY });
          } else {
            objectsBehind.push({ obj: tile.mapObject, drawX, drawY });
          }
        }

        // Draw encounter/battle icons
        if (tile.status === 'visited' && (tile.encounter !== '' || tile.battle !== '')) {
          const icon = tile.battle !== '' ? battleIcon : encounterIcon;
          this.ctx.drawImage(icon, drawX, drawY, this.tileWidth, this.tileHeight);
        }
      }
    }

    // Draw objects behind player
    objectsBehind.forEach(item => {
      const o = item.obj;
      const objDrawY = Math.round(item.drawY - this.tileHeight * (o.imageFrameSize[1] - 1));
      this.ctx.drawImage(
        terrain,
        1 + (64 + 2) * o.imageCoordinates[0],
        1 + (64 + 2) * o.imageCoordinates[1],
        64 * o.imageFrameSize[0] + (2 * (o.imageFrameSize[0] - 1)),
        64 * o.imageFrameSize[1] + (2 * (o.imageFrameSize[1] - 1)),
        Math.round(item.drawX),
        objDrawY,
        this.tileWidth * o.imageFrameSize[0],
        this.tileHeight * o.imageFrameSize[1]
      );
    });

    // Draw player
    const heroX = Math.round(partyPosition[0] * this.tileWidth + this.viewport.offset[0]);
    const heroY = Math.round(partyPosition[1] * this.tileHeight + this.viewport.offset[1]);
    this.ctx.drawImage(hero, heroX, heroY, this.tileWidth, this.tileHeight);

    // Draw objects in front of player
    objectsFront.forEach(item => {
      const o = item.obj;
      const objDrawY = Math.round(item.drawY - this.tileHeight * (o.imageFrameSize[1] - 1));
      this.ctx.drawImage(
        terrain,
        1 + (64 + 2) * o.imageCoordinates[0],
        1 + (64 + 2) * o.imageCoordinates[1],
        64 * o.imageFrameSize[0] + (2 * (o.imageFrameSize[0] - 1)),
        64 * o.imageFrameSize[1] + (2 * (o.imageFrameSize[1] - 1)),
        Math.round(item.drawX),
        objDrawY,
        this.tileWidth * o.imageFrameSize[0],
        this.tileHeight * o.imageFrameSize[1]
      );
    });
  }


  // Battle transition effect
  playBattleTransition() {
    document.querySelector('body').classList.add('battle-wipe');
    this.screen.classList.add('greyscale');
    return new Promise(resolve => {
      setTimeout(() => {
        this.screen.classList.remove('greyscale');
        resolve();
      }, 3000);
    });
  }

  // UI control helpers
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

