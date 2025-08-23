
import Biome from "./biome.js";


import { ArmoredSkeleton, FloatingSkull, Skeleton, SkeletonCultist, Spider } from "../entities.js";

import { MysteriousAltar } from "../stages/mysteriousAltar.js";
import { TreasureChest } from "../stages/treasureChest.js";
import { CaveIn } from "../stages/caveIn.js";
import { MineralVein } from "../stages/mineralVein.js";
import { CaveEntranceRoom, CaveExitRoom, CaveRoom1, CaveRoom2 } from "../structures.js";
import { DeepDarkness } from "../stages/deepDarkness.js";

export class Cave extends Biome{
    constructor(config){
        super({
            name: config.name || 'cave',
            type: config.type || 'cave',
            layoutWidth: config.layoutWidth || 64,
            layoutHeight: config.layoutHeight || 64,
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
                {startingStage: ()=>{return new DeepDarkness({})}, resetOnLeave: false, weight: 1},
            ],
        });
    }
    generateLayout(){ 
        let tileSet = this.createFullTileSet();
        this.beginPath(tileSet, 16, 'entrance')
        this.connectWalls(tileSet)
        return tileSet;
    }
    chooseStructure(type){
        switch(type){
            case 'entrance':
                return new CaveEntranceRoom();
            case 'exit':
                return new CaveExitRoom();
            default:
                switch(Math.floor(Math.random()*2)){
                    case 0:
                        return new CaveRoom1();
                    case 1:
                        return new CaveRoom2();
            }
        }
    }
}

