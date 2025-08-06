import Biome from "./biome.js";

import Tile from "../tile.js";

import { DryEel, DryShark, SandStalker } from "../entities.js";

import {WanderingMercenary} from "../stages/wanderingMercenary.js";
import { ShiftingSands, SandCastleEntrance} from "../stages/shiftingSands.js";
import { TreasureChest } from "../stages/treasureChest.js";
import { Sinkhole } from "../stages/sinkhole.js";
import { DesertRoom1, DesertEntranceRoom, DesertExitRoom } from "../structures.js";


export class Desert extends Biome{
    constructor(config){
        super({
            name: config.name || 'desert',
            type: config.type || 'desert',
            layoutWidth: config.layoutWidth || 64,
            layoutHeight: config.layoutHeight || 64,
            terrainSrc: './assets/media/terrain/desert.png',
            backgroundMusicSrc: "./assets/audio/musicTracks/TimTaj-Desert-Prince.mp3",
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
    generateLayout(){ 
        let tileSet = this.createEmptyTileSet();
        this.beginPath(tileSet, 60, 'entrance')
        this.connectWalls(tileSet)
        return tileSet;
    }
    chooseStructure(type){
        switch(type){
            case 'entrance':
                return new DesertEntranceRoom();
            case 'exit':
                return new DesertExitRoom();
            default:
                switch(Math.floor(Math.random()*2)){
                    case 0:
                        return new DesertRoom1();
                    case 1:
                        return new DesertRoom1()
                }
        }
    }
}