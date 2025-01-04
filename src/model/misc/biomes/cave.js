
import Biome from "./biome.js";

import Tile from "../tile.js";

import { ArmoredSkeleton, FloatingSkull, Skeleton, SkeletonCultist, Spider } from "../entities.js";

import { MysteriousAltar } from "../encounters/mysteriousAltar.js";
import { TreasureChest } from "../encounters/treasureChest.js";
import { CaveIn } from "../encounters/caveIn.js";
import { MineralVein } from "../encounters/mineralVein.js";
import { Boulder, Entrance, Exit, Wall } from "../mapObjects.js";

export class Cave extends Biome{
    constructor(config){
        super({
            name: config.name || 'cave',
            layoutWidth: config.layoutWidth || 20,
            layoutHeight: config.layoutHeight || 16,
            terrainSrc: './assets/media/terrain/cave.png',
            backgroundMusicSrc: "./assets/audio/musicTracks/gathering-darkness-kevin-macleod-main-version-04-22-8459.mp3",
            battleMusicSrc: "./assets/audio/musicTracks/battle-sword-139313.mp3",
            possibleHostiles: [
                {entity: (partyLevel, difficulty)=>{return new Skeleton({level: partyLevel, difficulty: difficulty})}, weight: 3},
                {entity: (partyLevel, difficulty)=>{return new FloatingSkull({level: partyLevel, difficulty: difficulty})}, weight: 3},
                {entity: (partyLevel, difficulty)=>{return new ArmoredSkeleton({level: partyLevel, difficulty: difficulty})}, weight: 2},
                {entity: (partyLevel, difficulty)=>{return new SkeletonCultist({level: partyLevel, difficulty: difficulty})}, weight: 2},
                {entity: (partyLevel, difficulty)=>{return new Spider({level: partyLevel, difficulty: difficulty})}, weight: 2},
            ],
            possibleEncounters: [
                {startingStage: ()=>{return new CaveIn({})}, resetOnLeave: false, weight: 1},
                {startingStage: ()=>{return new MineralVein({})}, resetOnLeave: false, weight: 1},
                {startingStage: ()=>{return new TreasureChest({})}, resetOnLeave: false, weight: 1},
                {startingStage: ()=>{return new MysteriousAltar({})}, resetOnLeave: false, weight: 1},
            ],
        });
    }
    generateLayout(layout){ 
        let tileSet = this.createEmptyTileSet();

        this.createTileSetBorder(tileSet)
        this.createLootRoom2(tileSet, new Tile({mapObject: new Boulder({imageCoordinates: [0,8]})}))
        for(let i = 0; i < Math.floor(tileSet.length); i++){
            this.createBoulderGroup1(tileSet)
        }
        this.createLootRoom1(tileSet, new Tile({mapObject: new Entrance({})}))
        this.createLootRoom1(tileSet, new Tile({mapObject: new Exit({})}))
        this.connectWalls(tileSet)
        return tileSet;
    }

    createTileSetBorder(tileSet){
        for(let y = 0; y < this.layoutHeight; y++){
            for(let x = 0; x < this.layoutWidth; x++){
                if(y == 0 || x == 0 || x == (this.layoutWidth-1) || y == (this.layoutHeight - 1)){
                   
                    tileSet[y][x].mapObject = new Wall({})
                }
            }
        }
    }

    

    //structureRules
    createLootRoom1(tileSet, tile){
        let structureMap = []
        let width = 7 + Math.floor(Math.random()*2)
        let height = 7 + Math.floor(Math.random()*2)
        for(let y = 0; y < height; y++){
            let row = []
            for(let x = 0; x < width; x++){
                if(y < 2 || x < 2 || x >= width-2 || y >= height - 2){
                    row.push(new Tile({mapObject: new Wall({})}))
                }else{
                    row.push(new Tile({}))
                }
            }
            structureMap.push(row);
        }
        structureMap[height-1][Math.floor(width/2)] = new Tile({})
        structureMap[height-2][Math.floor(width/2)] = new Tile({})
        structureMap[1][Math.floor(width/2)] =tile
        this.placeStructure(tileSet, structureMap, ['entrance', 'exit'])            
    }
    createLootRoom2(tileSet, tile){
        let structureMap = []
        let width = 7 + Math.floor(Math.random()*2)
        let height = 7 + Math.floor(Math.random()*2)
        for(let y = 0; y < height; y++){
            let row = []
            for(let x = 0; x < width; x++){
                if(y < 2 || x < 2 || x >= width-2 || y >= height - 2){
                    row.push(new Tile({mapObject: new Wall({})}))
                }else{
                    row.push(new Tile({}))
                }
            }
            structureMap.push(row);
        }
        let x = Math.floor(Math.random()*structureMap[0].length)
        let y = Math.floor(Math.random()*structureMap.length)
        while (x < 2 || x > width-3 || y < 2 || y > height-3 ){
            x = Math.floor(Math.random()*structureMap[0].length)
            y = Math.floor(Math.random()*structureMap.length)
        }
        structureMap[y][x] = tile
        structureMap[height-1][Math.floor(width/2)] = new Tile({})
        structureMap[height-2][Math.floor(width/2)] = new Tile({})
        this.placeStructure(tileSet, structureMap, ['entrance', 'exit'])            
    }
    createBoulderGroup1(tileSet){
        let structureMap = []
        for(let i = 0; i < 4; i++){
            let row = []
            for(let j = 0; j < 4; j++){
                let chance = Math.floor(Math.random()*5);
                if(chance <=1) row.push(new Tile({mapObject: new Boulder({imageCoordinates: [0,8]})}))
                if(chance > 1)row.push(new Tile({}))
            }
            structureMap.push(row);
        }
        this.placeStructure(tileSet, structureMap, ['entrance', 'exit'])
    }
    createMiddleWall(tileSet){
        let structureMap = []
        let width = 2 + Math.floor(Math.random()*2)
        let height = 2 + Math.floor(Math.random()*2)
        for(let y = 0; y < height; y++){
            let row = []
            for(let x = 0; x < width; x++){
                if(y == 0 || x == 0 || x == width-1 || y == height - 1){
                    row.push(new Tile({mapObject: new Wall({})}))
                }
            }
            structureMap.push(row);
        }
        this.placeStructure(tileSet, structureMap, ['entrance', 'exit'])            
    }



              
}