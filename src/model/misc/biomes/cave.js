
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
        this.createRoom1(tileSet, new Tile({priority: 3, mapObject: new Entrance({})}))
        this.createRoom1(tileSet, new Tile({priority: 3, mapObject: new Exit({})}))
        
        for(let i = 0; i < Math.floor(tileSet.length); i++){
            this.createBoulderGroup1(tileSet)
        }
        //
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
    createRoom1(tileSet, tile = new Tile({priority: 1, mapObject: new Wall({})})){
        let structureMap = []
        let width = 9 + Math.floor(Math.random()*3)
        let height = 9 + Math.floor(Math.random()*3)
        for(let y = 0; y < height; y++){
            let row = []
            for(let x = 0; x < width; x++){
                if(y < 3 || x < 3 || x >= width-3 || y >= height - 3){
                    if(y == 0 || x == 0 || x == width-1 || y == height-1) row.push(new Tile({priority: 2,}))
                    else 
                    row.push(new Tile({priority: 2, mapObject: new Wall({})}))
                }else{
                    row.push(new Tile({priority: 2,}))
                }
            }
            structureMap.push(row);
        }
        let chance = Math.floor(Math.random()*3)
        if(chance == 0){
            structureMap[height-3][Math.floor(width/2)] = new Tile({priority: 2,})
            structureMap[height-2][Math.floor(width/2)] = new Tile({priority: 2,})
        }
        if(chance == 1){
            structureMap[Math.floor(height/2)][2] = new Tile({priority: 2,})
            structureMap[Math.floor(height/2)][1] = new Tile({priority: 2,})
        }
        if(chance == 2){
            structureMap[Math.floor(height/2)][width-3] = new Tile({priority: 2,})
            structureMap[Math.floor(height/2)][width-2] = new Tile({priority: 2,})
        }
        structureMap[2][Math.floor(width/2)] =tile
        this.placeStructure(tileSet, structureMap, ['entrance', 'exit'], true)            
    }
    createBoulderGroup1(tileSet){
        let structureMap = []
        let height = 3;
        let width = 3;
        for(let y = 0; y < height; y++){
            let row = []
            for(let x = 0; x < width; x++){
                //if(y == 0 || x == 0 || x == width-1 || y == height-1) row.push(new Tile({priority: 1,}))
                    //else {
                        let chance = Math.floor(Math.random()*5);
                        if(chance <=1) row.push(new Tile({priority: 1, mapObject: new Boulder({imageCoordinates: [0,8]})}))
                        if(chance > 1)row.push(new Tile({}))
                    //}
            }
            structureMap.push(row);
        }
        this.placeStructure(tileSet, structureMap, ['entrance', 'exit'])
    }           
}