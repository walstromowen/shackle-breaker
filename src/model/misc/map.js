import Tile from './tile.js';
import {generateBiome} from './biomes.js';

export default class Map{
    constructor(biome){
        this.biome = generateBiome(biome);
        /*
        this.tileLayout = [
            [0,0,0,0,0],
            [0,0,0,0,0],
            [0,0,2,0,0],
            [0,0,0,1,0],
            [0,0,0,0,0],

        ]
        */
        this.tileLayout = [
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,],
            [1,0,0,0,1,1,0,1,1,0,1,1,1,1,1,0,0,1,1,1,1,1,1,1,],
            [1,1,0,0,0,1,1,1,0,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,],
            [1,0,0,0,0,1,0,0,1,0,0,0,1,0,1,0,1,1,1,1,0,1,1,1,],
            [1,1,0,0,0,0,0,0,0,0,0,0,1,1,0,1,1,1,1,0,1,1,1,1,],
            [0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,1,1,0,1,1,1,],
            [1,1,0,0,0,0,0,1,0,0,0,0,2,1,0,0,0,0,1,1,1,1,1,1,],
            [0,1,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1,1,0,1,1,],
            [1,1,0,1,0,0,1,0,0,0,1,0,0,0,0,0,1,0,1,1,1,1,1,1,],
            [0,1,0,0,0,0,0,0,1,1,0,0,0,0,0,1,0,0,1,1,1,1,1,1,],
            [1,1,0,0,0,0,0,1,0,0,1,1,0,0,1,0,0,0,0,1,1,0,1,1,],
            [1,1,0,0,0,0,0,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,],
            [1,1,0,1,0,1,0,1,0,0,1,0,0,0,1,0,1,1,1,0,1,0,1,1,],
            [1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,0,1,1,1,1,0,1,1,1,],
            [1,1,0,1,1,0,1,1,0,0,1,1,0,0,1,0,1,1,1,1,1,1,1,1,],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,],
        ];
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
                        break;
                    case 3:
                        this.tileLayout[y][x] = new Tile('exit');
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

/*
connectTiles(){
        for(let y = 0; y < this.tileLayout.length; y++){
            for(let x = 0; x < this.tileLayout[y].length; x++){
                if(this.tileLayout[y][x].type == 'wall'){
                    this.tileLayout[y][x].imageCoordinates = [0, 1];
                }else{
                    const [northType, northEastType, eastType, southEastType, southType, southWestType, westType, northWestType] = this.getSurroundingTileTypes(x, y);
                    if(northType != 'wall'){
                        this.tileLayout[y][x].setTileNorth(this.tileLayout[y-1][x]);
                    }
                    if(eastType != 'wall'){
                        this.tileLayout[y][x].setTileEast(this.tileLayout[y][x+1]);
                    }
                    if(southType != 'wall'){
                        this.tileLayout[y][x].setTileSouth(this.tileLayout[y+1][x]);
                    }
                    if(westType != 'wall'){
                        this.tileLayout[y][x].setTileWest(this.tileLayout[y][x-1]);
                    }
                }
            }
        }
    }
    getSurroundingTileTypes(x, y){
        let northType;
        let northEastType;
        let eastType;
        let southEastType;
        let southType;
        let southWestType;
        let westType;
        let northWestType;
        if(y-1>=0){
            if(this.tileLayout[y-1][x]){
                northType = this.tileLayout[y-1][x].type;
            }else{
                northType = 'wall';
            }
        }else{
            northType = 'wall';
        }
        if(y-1>=0){
            if(x+1 < this.tileLayout[y-1].length){
                if(this.tileLayout[y-1][x+1]){
                    northEastType = this.tileLayout[y-1][x+1].type;
                }else{
                    northEastType = 'wall';
                }
            }else{
                northEastType = 'wall';
            }
        }else{
            northEastType = 'wall';
        }
        if(x+1 < this.tileLayout[y].length){
            if(this.tileLayout[y][x+1]){
                eastType = this.tileLayout[y][x+1].type;
            }else{
                eastType = 'wall';
            }
        }else{
            eastType = 'wall';
        }
        if(y+1 < this.tileLayout.length){
            if(x+1 < this.tileLayout[y+1].length){
                if(this.tileLayout[y+1][x+1]){
                    southEastType = this.tileLayout[y+1][x+1].type;
                }else{
                    southEastType = 'wall';
                }
            }else{
                southEastType = 'wall';
            } 
        }else{
            southEastType = 'wall';
        }
        if(y+1 < this.tileLayout.length){
            if(this.tileLayout[y+1][x]){
                southType = this.tileLayout[y+1][x].type;
            }else{
                southType = 'wall';
            }
        }else{
            southType = 'wall';
        }
        if(y+1 < this.tileLayout.length){
            if(x-1 >= 0 ){
                if(this.tileLayout[y+1][x-1]){
                    southWestType = this.tileLayout[y+1][x-1].type;
                }else{
                    southWestType = 'wall';
                }
            }else{
                southWestType = 'wall';
            }
        }else{
            southWestType = 'wall';
        }
        if(x-1 >= 0 ){
            if(this.tileLayout[y][x-1]){
                westType = this.tileLayout[y][x-1].type;
            }else{
                westType = 'wall';
            }
        }else{
            westType = 'wall';
        }
        if(y-1 >= 0){
            if(x-1 >= 0 ){
                if(this.tileLayout[y-1][x-1]){
                    northWestType = this.tileLayout[y-1][x-1].type;
                }else{
                    northWestType = 'wall';
                }
            }else{
                northWestType = 'wall';
            }
        }else{
            northWestType = 'wall';
        }
        return [northType, northEastType, eastType, southEastType, southType, southWestType, westType, northWestType];
    }
    */