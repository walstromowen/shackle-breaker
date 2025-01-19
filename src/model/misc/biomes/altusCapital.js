import Biome from "./biome.js";

import { AlterianWarrior } from "../entities.js";

import { TheArtifact } from "../encounters/theArtifact.js";

import { AltusCapitalRoom1, CaveEntranceRoom, CaveExitRoom } from "../structures.js";
import { TreasureChest } from "../encounters/treasureChest.js";
export class AltusCapital extends Biome{
    constructor(config){
        super({
            name: 'Altus Capital',
            layoutWidth: config.layoutWidth || 32,
            layoutHeight: config.layoutHeight || 32,
            terrainSrc: './assets/media/terrain/altus-capital.png',
            backgroundMusicSrc: "./assets/audio/musicTracks/Alex-Productions - Epic Cinematic Adventure Vlog _ Eglair.mp3",
            battleMusicSrc: "./assets/audio/musicTracks/battle-sword-139313.mp3",
            possibleHostiles: [
                {entity: (partyLevel, difficulty)=>{return new AlterianWarrior({level: partyLevel, difficulty: difficulty})}, weight: 1},
            ],
            possibleEncounters: [
                {startingStage: ()=>{return new TheArtifact({})}, resetOnLeave: false, weight: 1},
            ],
        });
    }
    generateLayout(){ 
        let tileSet = this.createFullTileSet();
        this.beginPath(tileSet, 8, 'entrance')
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
                switch(Math.floor(Math.random()*1)){
                    case 0:
                        return new AltusCapitalRoom1();
            }
        }
    }
}