
import Biome from "./biome.js";

import Tile from "../tile.js";

import { ShackledHunter, ShackledSpirit, TerrorBear } from "../entities.js";

import { TreasureChest } from "../stages/treasureChest.js";
import { WastelandEntranceRoom, WastelandExitRoom, WastelandRoom1, WastelandRoom2 } from "../structures.js";
import { DeadTree } from "../mapObjects.js";
import { MysteriousFigure } from "../stages/mysteriousFigure.js";

export class Wasteland extends Biome{
    constructor(config){
        super({
            name: config.name || 'wasteland',
            type: config.type || 'wasteland',
            layoutWidth: config.layoutWidth || 64,
            layoutHeight: config.layoutHeight || 64,
            terrainSrc: './assets/media/terrain/wasteland.png',
            backgroundMusicSrc: "./assets/audio/musicTracks/mysterious-music-box-atmosphere-273837.mp3",
            battleMusicSrc: "./assets/audio/musicTracks/battle-sword-139313.mp3",
            possibleHostiles: [
                {entity: (partyLevel, difficulty)=>{return new ShackledHunter({level: partyLevel, difficulty: difficulty})}, weight: 1},
                {entity: (partyLevel, difficulty)=>{return new ShackledSpirit({level: partyLevel, difficulty: difficulty})}, weight: 2},
                {entity: (partyLevel, difficulty)=>{return new TerrorBear({level: partyLevel, difficulty: difficulty})}, weight: 1},
               
            ],
            possibleEncounters: [
                {startingStage: ()=>{return new MysteriousFigure({})}, resetOnLeave: false, weight: 2},
                {startingStage: ()=>{return new TreasureChest({})}, resetOnLeave: false, weight: 2},
            ],
        });
    }
    generateLayout(){ 
        let tileSet = this.createFullTileSet();
        this.beginPath(tileSet, 50, 'entrance')
        this.connectWalls(tileSet)
        return tileSet;
    }
    /*
    createFullTileSet(){
        let tileSet = [];
        for(let y = 0; y < this.layoutHeight; y++){
            let row = [];
            for(let x = 0; x < this.layoutWidth; x++){
                row.push(new Tile({mapObject: new DeadTree({imageCoordinates: [7, 0], imageFrameSize: [1,2]}), position: [x, y]}))
            }
            tileSet.push(row)
        }
        return tileSet;
    }
    */
    chooseStructure(type){
        switch(type){
            case 'entrance':
                return new WastelandEntranceRoom();
            case 'exit':
                return new WastelandExitRoom();
            default:
                switch(Math.floor(Math.random()*2)){
                    case 0:
                        return new WastelandRoom1();
                    case 1:
                        return new WastelandRoom2();
                }
        }
    }
}