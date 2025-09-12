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
    this.images = {}; // stores images by name
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
    // Smooth movement: move map per frame
    const diff = (this.tileWidth * fpsInterval) / playerMovementDelay;
    let moveX = 0, moveY = 0;

    if (currentPosition[0] < nextPosition[0]) moveX = -diff;
    else if (currentPosition[0] > nextPosition[0]) moveX = diff;

    if (currentPosition[1] < nextPosition[1]) moveY = -diff;
    else if (currentPosition[1] > nextPosition[1]) moveY = diff;

    this.viewport.movementOffset[0] += moveX;
    this.viewport.movementOffset[1] += moveY;

    // Clamp offsets so they never overshoot a single tile
    this.viewport.movementOffset[0] = Math.max(Math.min(this.viewport.movementOffset[0], this.tileWidth), -this.tileWidth);
    this.viewport.movementOffset[1] = Math.max(Math.min(this.viewport.movementOffset[1], this.tileHeight), -this.tileHeight);
  }

  updateViewport(map, partyPosition) {
    // Viewport width/height in tiles
    this.viewport.viewportWidth = Math.floor(this.overworldCanvas.width / this.tileWidth);
    this.viewport.viewportHeight = Math.floor(this.overworldCanvas.height / this.tileHeight);

    // Determine start/end tile coordinates
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
  if (!this.images.terrain) return; // wait until images are preloaded

  this.updateViewport(map, partyPosition);
  this.ctx.clearRect(0, 0, this.overworldCanvas.width, this.overworldCanvas.height);

  const terrain = this.images.terrain;
  const hero = this.images.hero;
  const battleIcon = this.images.battle;
  const encounterIcon = this.images.encounter;

  const behindHero = [];
  const overHero = [];

  // Loop tiles
  for (let y = this.viewport.startTileCoordinates[1]; y <= this.viewport.endTileCoordinates[1]; y++) {
    for (let x = this.viewport.startTileCoordinates[0]; x <= this.viewport.endTileCoordinates[0]; x++) {
      let drawX = Math.floor(x * this.tileWidth + this.viewport.offset[0] + this.viewport.movementOffset[0]);
      let drawY = Math.floor(y * this.tileHeight + this.viewport.offset[1] + this.viewport.movementOffset[1]);

      // Base terrain tile
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

      // Map objects
      let obj = map.tileLayout[y][x].mapObject;
      if (obj !== '') {
        if (obj.imageFrameSize[1] > 1) {
          // Tall object → split into bottom and top
          behindHero.push({ obj, drawX, drawY, part: "bottom" });
          overHero.push({ obj, drawX, drawY, part: "top" });
        } else {
          // Normal object
          behindHero.push({ obj, drawX, drawY, part: "full" });
        }
      }

      // Encounter/battle icons
      if (map.tileLayout[y][x].status === 'visited' && (map.tileLayout[y][x].encounter !== '' || map.tileLayout[y][x].battle !== '')) {
        let icon = map.tileLayout[y][x].battle !== '' ? battleIcon : encounterIcon;
        this.ctx.drawImage(icon, drawX, drawY, this.tileWidth, this.tileHeight);
      }
    }
  }

  // --- Draw Pass 1: objects behind hero ---
  for (const item of behindHero) {
    this.drawObjectPart(item, terrain);
  }

  // --- Draw hero ---
  let heroX = Math.floor(partyPosition[0] * this.tileWidth + this.viewport.offset[0]);
  let heroY = Math.floor(partyPosition[1] * this.tileHeight + this.viewport.offset[1]);
  this.ctx.drawImage(hero, heroX, heroY, this.tileWidth, this.tileHeight);

  // --- Draw Pass 2: objects over hero ---
  for (const item of overHero) {
    this.drawObjectPart(item, terrain);
  }
}

// helper to draw objects by part
drawObjectPart(item, terrain) {
  const o = item.obj;

  if (item.part === "bottom") {
    // Only bottom row of the sprite
    this.ctx.drawImage(
      terrain,
      1 + (64 + 2) * o.imageCoordinates[0],
      1 + (64 + 2) * (o.imageCoordinates[1] + (o.imageFrameSize[1] - 1)), // bottom slice
      64 * o.imageFrameSize[0],
      64,
      item.drawX,
      item.drawY,
      this.tileWidth * o.imageFrameSize[0],
      this.tileHeight
    );
  } else if (item.part === "top") {
    // Everything above the bottom row
    this.ctx.drawImage(
      terrain,
      1 + (64 + 2) * o.imageCoordinates[0],
      1 + (64 + 2) * o.imageCoordinates[1],
      64 * o.imageFrameSize[0],
      64 * (o.imageFrameSize[1] - 1),
      item.drawX,
      item.drawY - (64 * (o.imageFrameSize[1] - 1)),
      this.tileWidth * o.imageFrameSize[0],
      this.tileHeight * (o.imageFrameSize[1] - 1)
    );
  } else {
    // Normal full object
    this.ctx.drawImage(
      terrain,
      1 + (64 + 2) * o.imageCoordinates[0],
      1 + (64 + 2) * o.imageCoordinates[1],
      64 * o.imageFrameSize[0],
      64 * o.imageFrameSize[1],
      item.drawX,
      item.drawY - (64 * (o.imageFrameSize[1] - 1)),
      this.tileWidth * o.imageFrameSize[0],
      this.tileHeight * o.imageFrameSize[1]
    );
  }
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

