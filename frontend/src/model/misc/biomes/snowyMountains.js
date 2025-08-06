
import Biome from "./biome.js";

import Tile from "../tile.js";

import { IcePhoenix, MadEngineer, PanzerianKnight, Wolf } from "../entities.js";

import {WanderingMercenary} from "../stages/wanderingMercenary.js";
import { TreasureChest } from "../stages/treasureChest.js";
import { TracksInTheSnow, WoundedTiger } from "../stages/tracksInTheSnow.js";
import { SomethingWatching } from "../stages/somethingWatching.js";
import { SnowyMountainRoom1, SnowyMountainEntranceRoom, SnowyMountainExitRoom } from "../structures.js";
import { PineTree } from "../mapObjects.js";

export class SnowyMountains extends Biome{
    constructor(config){
        super({
            name: config.name || 'snowy mountains',
            type: config.type || 'snowy mountains',
            layoutWidth: config.layoutWidth || 64,
            layoutHeight: config.layoutHeight || 64,
            terrainSrc: './assets/media/terrain/snowy-mountains.png',
            backgroundMusicSrc: "./assets/audio/musicTracks/nocturne-roman-main-version-16841-01-45.mp3",
            battleMusicSrc: "./assets/audio/musicTracks/battle-sword-139313.mp3",
            possibleHostiles: [
                {entity: (partyLevel, difficulty)=>{return new MadEngineer({level: partyLevel, difficulty: difficulty})}, weight: 2},
                {entity: (partyLevel, difficulty)=>{return new PanzerianKnight({level: partyLevel, difficulty: difficulty})}, weight: 1},
                {entity: (partyLevel, difficulty)=>{return new Wolf({level: partyLevel, difficulty: difficulty})}, weight: 1},
                {entity: (partyLevel, difficulty)=>{return new IcePhoenix({level: partyLevel, difficulty: difficulty})}, weight: 1},
                
            ],
            possibleEncounters: [
                {startingStage: ()=>{return {name: 'Wandering Mercenary'}}, resetOnLeave: false, weight: 2},
                {startingStage: ()=>{return new TreasureChest({})}, resetOnLeave: false, weight: 2},
                {startingStage: ()=>{return new TracksInTheSnow({})}, resetOnLeave: true, weight: 2},
                {startingStage: ()=>{return new SomethingWatching({})}, resetOnLeave: true, weight: 1},
            ],
        });
    }
    generateLayout(){ 
        let tileSet = this.createFullTileSet();
        this.beginPath(tileSet, 50, 'entrance')
        this.connectWalls(tileSet)
        return tileSet;
    }
    createFullTileSet(){
            let tileSet = [];
            for(let y = 0; y < this.layoutHeight; y++){
                let row = [];
                for(let x = 0; x < this.layoutWidth; x++){
                    row.push(new Tile({mapObject: new PineTree({imageCoordinates: [0, 3], imageFrameSize: [1,2]}), position: [x, y]}))
                }
                tileSet.push(row)
            }
            return tileSet;
        }
    chooseStructure(type){
        switch(type){
            case 'entrance':
                return new SnowyMountainEntranceRoom();
            case 'exit':
                return new SnowyMountainExitRoom();
            default:
                switch(Math.floor(Math.random()*2)){
                    case 0:
                        return new SnowyMountainRoom1();
                    case 1:
                        return new SnowyMountainRoom1()
                }
        }
    }
}