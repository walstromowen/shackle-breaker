import Stage from "./stage.js";
import Battle from "../battle.js";
import { EmperorDolos } from "../entities.js";

export class TheArtifact extends Stage{
    constructor(config){
        super({
            name: 'The Artifact',
            imageSrc: './assets/media/encounters/the-artifact.jpg',
            decisionArray: config.decisionArray || [
                {
                    description: 'Approach the artifact',
                    successfulOutcomes: [
                        {
                            result: 'battle',
                            imageSrc: './assets/media/entities/emperor-dolos.jpg',
                            musicSrc: "./assets/audio/musicTracks/bloodcry-clemens-ruh-main-version-32174-03-58.mp3",
                            createBattle: (partyLevel, biome)=>{
                                let hostileArray = [new EmperorDolos({level: partyLevel})];
                                return new Battle({hostiles: hostileArray, battleMusicSrc: "./assets/audio/musicTracks/javascript/shackle-breaker/src/assets/audio/musicTracks/bloodcry-clemens-ruh-main-version-32174-03-58.mp3", canRetreat: false});
                            },
                            messageFunction: (currentCharacter)=>{
                                return `"Shackle Breaker...."`
                            }, 
                            weight: 1,
                        },
                    ],
                    messageFunction: (currentCharacter)=>{
                        return `${currentCharacter.name} approaches the artifact.`
                    }, 
                },
            ],
        })
    }
    messageFunction(currentCharacter){
        return `The Artifact lies ahead. The fate of the kingdom is in your hands.`;
    }
}