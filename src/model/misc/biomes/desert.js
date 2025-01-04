import Biome from "./biome.js";

import Tile from "../tile.js";

import { DryEel, DryShark, SandStalker } from "../entities.js";

import {WanderingMercenary} from "../encounters/wanderingMercenary.js";
import { ShiftingSands, SandCastleEntrance} from "../encounters/shiftingSands.js";
import { TreasureChest } from "../encounters/treasureChest.js";
import { Sinkhole } from "../encounters/sinkhole.js";
import { Boulder, Entrance, Exit } from "../mapObjects.js";


export class Desert extends Biome{
    constructor(config){
        super({
            name: config.name || 'desert',
            layoutWidth: config.layoutWidth || 64,
            layoutHeight: config.layoutHeight || 64,
            terrainSrc: './assets/media/terrain/desert.png',
            backgroundMusicSrc: "./assets/audio/musicTracks/TimTaj - Desert Prince.mp3",
            battleMusicSrc: "./assets/audio/musicTracks/TimTaj - Desert Hunt.mp3",
            possibleHostiles: [
                {entity: (partyLevel, difficulty)=>{return new DryShark({level: partyLevel, difficulty: difficulty})}, weight: 1},
                {entity: (partyLevel, difficulty)=>{return new DryEel({level: partyLevel, difficulty: difficulty})}, weight: 2},
                {entity: (partyLevel, difficulty)=>{return new SandStalker({level: partyLevel, difficulty: difficulty})}, weight: 3},
            ],
            possibleEncounters: [
                {startingStage: ()=>{return {name: 'Wandering Mercenary'}}, resetOnLeave: false, weight: 1},
                {startingStage: ()=>{return new TreasureChest({})}, resetOnLeave: false, weight: 1},
                {startingStage: ()=>{return new ShiftingSands({})}, resetOnLeave: false, weight: 1},
                {startingStage: ()=>{return new Sinkhole({})}, resetOnLeave: false, weight: 1},
            ],
        });
    }
    generateLayout(layout){ 
            let tileSet = this.createEmptyTileSet();
           
    
            this.createTileSetBorder(tileSet)
            this.createLootRoom1(tileSet, new Tile({tileImageCoordinates: [0,2], mapObject: new Entrance({})}))
            this.createLootRoom1(tileSet, new Tile({tileImageCoordinates: [0,2], mapObject: new Exit({})}))
            for(let i = 0; i < Math.floor(tileSet.length/2); i++){
                this.createBoulderGroup1(tileSet)
            }
            this.connectWalls(tileSet)
        return tileSet;
    }
    createTileSetBorder(tileSet){
        for(let y = 0; y < this.layoutHeight; y++){
            for(let x = 0; x < this.layoutWidth; x++){
                if(y <= 2 || x <= 2 || x >= (this.layoutWidth-3) || y >= (this.layoutHeight - 3)){
                    if(((y == 2 || y == this.layoutHeight - 3) && x > 1 && x < (this.layoutWidth-2)) || ((x == 2 || x == this.layoutWidth-3) && y > 1 && y < (this.layoutHeight - 2))){
                        let chance = Math.floor(Math.random()*6);
                        if(chance <= 2)  tileSet[y][x].mapObject = new Boulder({imageCoordinates: [0, 1]})
                    }else tileSet[y][x].mapObject = new Boulder({imageCoordinates: [0, 1]})
                }
            }
        }
    }
    createLootRoom1(tileSet, tile){
            let structureMap = []
            let width = 7 + Math.floor(Math.random()*2)
            let height = 7 + Math.floor(Math.random()*2)
            for(let y = 0; y < height; y++){
                let row = []
                for(let x = 0; x < width; x++){
                    if(y < 1 || x < 1 || x >= width-1 || y >= height - 1){
                        row.push(new Tile({mapObject:new Boulder({imageCoordinates: [0, 1]})}))
                    }else{
                        row.push(new Tile({}))
                    }
                }
                structureMap.push(row);
            }
            
            structureMap[1][Math.floor(width/2)] =tile
            structureMap[height-1][Math.floor(width/2)] = new Tile({})
            structureMap[height-2][Math.floor(width/2)] = new Tile({})
            this.placeStructure(tileSet, structureMap, ['entrance', 'exit'])            
        }
         createBoulderGroup1(tileSet){
            let structureMap = []
            for(let i = 0; i < 5; i++){
                let row = []
                for(let j = 0; j < 5; j++){
                    let chance = Math.floor(Math.random()*5);
                    if(chance <=1) row.push(new Tile({mapObject: new Boulder({imageCoordinates: [0,1]})}))
                    if(chance > 1)row.push(new Tile({}))
                }
                structureMap.push(row);
            }
            this.placeStructure(tileSet, structureMap, ['entrance', 'exit'])
        }
}