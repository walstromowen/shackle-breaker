import Tile from './tile.js';
import {generateBiome} from './biomes.js';
import { generateLayout } from './mapLayouts.js';

export default class Map{
    constructor(biome, layout){
        this.biome = generateBiome(biome);
        this.tileLayout = generateLayout(layout);
        this.generateTiles();
    }
    generateTiles(){
        for(let y = 0; y < this.tileLayout.length; y++){
            for(let x = 0; x < this.tileLayout[y].length; x++){
                switch(this.tileLayout[y][x]){
                    case 0:
                        this.tileLayout[y][x] = new Tile('open');
                        break;
                    case 1:
                        this.tileLayout[y][x] = new Tile('wall');
                        this.tileLayout[y][x].imageCoordinates = [0, 1];
                        break;
                    case 2:
                        this.tileLayout[y][x] = new Tile('entrance');
                        this.tileLayout[y][x].imageCoordinates = [0, 2];
                        break;
                    case 3:
                        this.tileLayout[y][x] = new Tile('exit');
                        this.tileLayout[y][x].imageCoordinates = [0, 2];
                        break;
                    case 4:
                        this.tileLayout[y][x] = new Tile('blank');
                        break;
                    case 'b':
                        this.tileLayout[y][x] = new Tile('boss');
                        this.tileLayout[y][x].imageCoordinates = [0, 2];
                        break;
                    case 5:
                        this.tileLayout[y][x] = new Tile('wall');
                        this.tileLayout[y][x].imageCoordinates = [0, 3];
                        this.tileLayout[y][x].imageFrameSize = [1, 2];
                        break;
                }
                this.tileLayout[y][x].position = [x, y];
            }
             
        }
    }
    getEntrancePosition(){
        for(let y = 0; y < this.tileLayout.length; y++){
            for(let x = 0; x < this.tileLayout[y].length; x++){
                if(this.tileLayout[y][x].type == 'entrance'){
                    return [x, y];
                }
            }
        }
    }
}