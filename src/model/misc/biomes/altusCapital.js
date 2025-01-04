import Biome from "./biome.js";

import { AlterianWarrior } from "../entities.js";

import { TheArtifact } from "../encounters/theArtifact.js";

export class AltusCapital extends Biome{
    constructor(config){
        super({
            name: 'Altus Capital',
            terrainSrc: './assets/media/terrain/altus-capital.png',
            backgroundMusicSrc: "./assets/audio/musicTracks/Alex-Productions - Epic Cinematic Adventure Vlog _ Eglair.mp3",
            battleMusicSrc: "./assets/audio/musicTracks/battle-sword-139313.mp3",
            possibleHostiles: [
                {entity: (partyLevel, difficulty)=>{return new AlterianWarrior({level: partyLevel, difficulty: difficulty})}, weight: 1},
            ],
            possibleEncounters: [],
            storyEncounters: [
                {startingStage: ()=>{return new TheArtifact({})}, resetOnLeave: false},
            ]
        });
    }
}