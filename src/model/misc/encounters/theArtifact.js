import Stage from "./stage.js";
import Battle from "../battle.js";
import { EmperorDolos } from "../entities.js";
import { AbsorbSoul } from "../abilities.js";

export class TheArtifact extends Stage{
    constructor(config){
        super({
            name: 'The Artifact',
            imageSrc: './assets/media/encounters/the-artifact.jpg',
            decisionArray: config.decisionArray || [
                {
                    description: 'Approach the artifact.',
                    successfulOutcomes: [
                        {
                            result: 'battle',
                            imageSrc: './assets/media/entities/emperor-dolos.jpg',
                            musicSrc: "./assets/audio/musicTracks/bloodcry-clemens-ruh-main-version-32174-03-58.mp3",
                            createBattle: (partyLevel, biome, difficulty)=>{
                                let hostileArray = [new EmperorDolos({level: partyLevel, difficulty: difficulty})];
                                return new Battle({hostiles: hostileArray, battleMusicSrc: "./assets/audio/musicTracks/javascript/shackle-breaker/src/assets/audio/musicTracks/bloodcry-clemens-ruh-main-version-32174-03-58.mp3", canRetreat: false, gold:1000});
                            },
                            createNextStage: (partyLevel, biome)=>{
                                return new TheKingdomsFate({});
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

export class TheKingdomsFate extends Stage{
    constructor(config){
        super({
            name: "The Kingdom's Fate",
            imageSrc: './assets/media/encounters/the-artifact.jpg',
            decisionArray: config.decisionArray || [
                {
                    description: 'Destroy the artifact',
                    successfulOutcomes: [
                        {
                            result: 'nextStage',
                            createNextStage: (partyLevel, biome)=>{
                                return new AHeroPrevails({});
                            },
                            messageFunction: (currentCharacter)=>{
                                return `${currentCharacter.name} reaches to destroy the artifact.`
                            }, 
                            weight: 1,
                        },
                    ],
                },
                {
                    description: 'Claim the artifact.',
                    successfulOutcomes: [
                        {
                            result: 'nextStage',
                            createNextStage: (partyLevel, biome)=>{
                                return new APowerfulChoice({});
                            },
                            messageFunction: (currentCharacter)=>{
                                return `${currentCharacter.name} reaches to claim the artifact.`
                            }, 
                            weight: 1,
                        },
                    ], 
                },
                {
                    description: 'Switch character.',
                    successfulOutcomes: [{result: 'switchCharacter', weight: 1}],
                },
            ],
        })
    }
    messageFunction(currentCharacter){
        return "As the emperor fades away, his body disentigrates into a whirlwind of shadowy mist and darkness. After a moment, the darkness clears, revealing the artifact resting innocently on it's pedestal. What once appeared to be a symbol of absolute power now appears to be an innocent trinkent. You begin to doubt the purpose of your quest, yet the choice is yours...."
    }
}
   
export class AHeroPrevails extends Stage{
    constructor(config){
        super({
            name: "A hero prevails",
            imageSrc: './assets/media/encounters/the-artifact.jpg',
            decisionArray: config.decisionArray || [
                {//Decision
                    description: 'Leave.',
                    successfulOutcomes: [
                        {
                            result: 'complete',
                            xpReward: 1000,
                            nextMap: 'random',
                            milestone: 'dolosDefeated',
                            onActivate(target){
                                target.currentCorruption -= 0.5;
                            },
                            weight: 1,
                        },
                    ],
                    messageFunction: (currentCharacter)=>{
                        return `${currentCharacter.name} leaves.`
                    }, 
                },
            ],
        })
    }
    messageFunction(currentCharacter){
        return `The artifact breaks easily in ${currentCharacter.name}'s hands. Soon the artifact, like the emperor before, fades away. Despite the doubts, and the losses, ${currentCharacter.name}'s party prevails. The shackles that once bound the kingdom are no more...`;
    }
}

export class APowerfulChoice extends Stage{
    constructor(config){
        super({
            name: "A powerful choice",
            imageSrc: './assets/media/encounters/the-artifact.jpg',
            decisionArray: config.decisionArray || [
                {
                    description: 'Destroy it!',
                    successfulOutcomes: [
                        {
                            result: 'nextStage',
                            createNextStage: (partyLevel, biome)=>{
                                return new AHeroPrevails({});
                            },
                        },
                    ],
                },
                {//Decision
                    description: 'Use the artifact.',
                    successfulOutcomes: [
                        {
                            result: 'nextStage',
                            onActivate(target){
                                target.apperance = './assets/media/entities/emperor-dolos.jpg';
                                target.abilityArray.push(new AbsorbSoul({}));
                            },
                            createNextStage: (partyLevel, biome)=>{
                                return new TheCycleContinues({});
                            },
                            messageFunction: (currentCharacter)=>{
                                return `${currentCharacter.name} chooses to use the artifact's power.`
                            },
                            xpReward: 10,
                            weight: 1,
                        },
                    ],
                },
            ],
        })
    }
    messageFunction(currentCharacter){
        return `${currentCharacter.name} grasps the artifact with both hands. The artifact shimmers, as if beckoning ${currentCharacter.name} to use it. How could such a thing be so wrong?...`
    }
}

export class TheCycleContinues extends Stage{
    constructor(config){
        super({
            name: "The cycle continues",
            imageSrc: './assets/media/encounters/the-artifact.jpg',
            decisionArray: config.decisionArray || [
                {//Decision
                    description: 'Leave.',
                    successfulOutcomes: [
                        {
                            result: 'complete',
                            xpReward: 10,
                            nextMap: 'random',
                            milestone: 'dolosDefeated',
                            onActivate(target){
                                target.currentCorruption += 1.00;
                            },
                            weight: 1,
                        },
                    ],
                    messageFunction: (currentCharacter)=>{
                        return `Someone leaves where ${currentCharacter.name} entered...`
                    }, 
                },
            ],
        })
    }
    messageFunction(currentCharacter){
        return `${currentCharacter.name} admires the artifact and gently brushes its side. Only it is not ${currentCharacter.name} holding the artifact anymore, but a pawn, shackled to the will of another...`
    }
}