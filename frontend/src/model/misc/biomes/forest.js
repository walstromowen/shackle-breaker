import Biome from "./biome.js";

import Tile from "../tile.js";

import { MadBandit, MadMage, Madman, Wolf } from "../entities.js";

import { MadmanAhead} from "../stages/madmanAhead.js";
import {WanderingMercenary} from "../stages/wanderingMercenary.js";
import { TreasureChest } from "../stages/treasureChest.js";
import { Bonfire } from "../stages/bonfire.js";
import { Aftermath } from "../stages/aftermath.js";
import { SilentGrove } from "../stages/silentGrove.js";
import { BerryBush, Boulder, CastleTower, Entrance, Exit, PineTree, Wall } from "../mapObjects.js";
import { ForestRoom1, ForestRoom2, ForestEntranceRoom, ForestExitRoom } from "../structures.js";
import { WoundedMut, WoundedMutt } from "../stages/woundedMutt.js";


export class Forest extends Biome{
    constructor(config){
        super({
            name: config.name || 'forest',
            type: config.type || 'forest',
            layoutWidth: config.layoutWidth || 64,
            layoutHeight: config.layoutHeight || 64,
            terrainSrc: './assets/media/terrain/forest.png',
            backgroundMusicSrc: "./assets/audio/musicTracks/deep-in-the-dell-126916.mp3",
            battleMusicSrc: "./assets/audio/musicTracks/battle-of-the-dragons-8037.mp3",
            possibleHostiles: [
                {entity: (partyLevel, difficulty)=>{return new Madman({level: partyLevel, difficulty: difficulty})}, weight: 2},
                {entity: (partyLevel, difficulty)=>{return new MadMage({level: partyLevel, difficulty: difficulty})}, weight: 1},
                {entity: (partyLevel, difficulty)=>{return new MadBandit({level: partyLevel, difficulty: difficulty})}, weight: 1},
                {entity: (partyLevel, difficulty)=>{return new Wolf({level: partyLevel, difficulty: difficulty})}, weight: 1},
                
            ],
            possibleEncounters: [
                {startingStage: ()=>{return {name: 'Wandering Mercenary'}}, resetOnLeave: false, weight: 1},
                {startingStage: ()=>{return {name: 'Aftermath'}}, resetOnLeave: false, weight: 1},
                {startingStage: ()=>{return new TreasureChest({})}, resetOnLeave: false, weight: 1},
                {startingStage: ()=>{return new MadmanAhead({})}, resetOnLeave: false, weight: 1},
                {startingStage: ()=>{return new Bonfire({})}, resetOnLeave: false, weight: 1},
                {startingStage: ()=>{return new SilentGrove({})}, resetOnLeave: false, weight: 1},
                {startingStage: ()=>{return new WoundedMutt({})}, resetOnLeave: false, weight: 10},
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
                if(Math.random()*5 < 1)row.push(new Tile({tileImageCoordinates: [1,0], mapObject: new PineTree({}), priority: 1, position: [x, y]}))
                else row.push(new Tile({mapObject: new PineTree({}), position: [x, y]}))
            }
            tileSet.push(row)
        }
        return tileSet;
    }
    chooseStructure(type){
        switch(type){
            case 'entrance':
                return new ForestEntranceRoom();
            case 'exit':
                return new ForestExitRoom();
            default:
                switch(Math.floor(Math.random()*2)){
                    case 0:
                        return new ForestRoom1();
                    case 1:
                        return new ForestRoom2()
                }
        }
    }
}