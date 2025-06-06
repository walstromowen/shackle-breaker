import Stage from "./stage.js";
import Battle from "../battle.js";
import { PanzerianKnight, MadEngineer, MadBandit, Tiger, Panzerkamfer } from "../entities.js";
import { Bleed, Frozen} from "../statusEffects.js";
import { getRandomArrayElementWeighted } from "../../../utility.js";
import { Pelt } from "../items.js";

export class TracksInTheSnow extends Stage{
    constructor(config){
        super({
            name: 'Tracks In The Snow',
            imageSrc: './assets/media/encounters/tracks-in-the-snow.jpg',
            decisionArray: config.decisionArray || [
                {
                    description: 'Follow the tracks [ATN]',
                    attributes: ['attunement'],
                    successThreshold: 12,
                    roll: true,
                    successfulOutcomes: [
                        {
                            result: 'nextStage',
                            createNextStage: (partyLevel, biome)=>{
                                return new TracksInTheSnow2({});
                            },
                            xpReward: 5,
                            weight: 1
                        },
                        {
                            result: 'nextStage',
                            createNextStage: (partyLevel, biome)=>{
                                return new CrimsonSnow({});
                            },
                            xpReward: 5,
                            weight: 1
                        }
                    ],
                    negativeOutcomes: [
                        {
                            result: 'battle',
                            musicSrc: "./assets/audio/musicTracks/battle-sword-139313.mp3",
                            createBattle: (partyLevel, biome, difficulty)=>{
                                return biome.generateBattle(partyLevel);
                            },
                            createNextStage: (partyLevel, biome)=>{
                                return new TracksInTheSnow2({});
                            },
                            messageFunction: (currentCharacter)=>{
                                return `Something approaches ${currentCharacter.name}'s position!`
                            }, 
                            weight: 2,
                        },
                        {
                            result: 'retry',
                            messageFunction: (currentCharacter)=>{
                                return `${currentCharacter.name}'s wanders in the snow looking for more tracks.`
                            },
                            weight: 1,
                        },
                    ],
                    messageFunction: (currentCharacter)=>{
                        return `${currentCharacter.name} follows the tracks.`
                    }, 
                },
                {
                    description: 'Switch character',
                    successfulOutcomes: [{result: 'switchCharacter', weight: 1}],
                },
                {
                    description: 'Leave',
                    successfulOutcomes: [{result: 'complete', weight: 1}],
                    messageFunction: (currentCharacter)=>{
                        return `${currentCharacter.name}'s party moves on.`
                    }, 
                },
            ],
        })
    }
    messageFunction(currentCharacter){
        return `${currentCharacter.name} notices tracks in the snow.`;
    }
}

export class TracksInTheSnow2 extends Stage{
    constructor(config){
        super({
            name: 'Tracks In The Snow',
            imageSrc: './assets/media/encounters/tracks-in-the-snow2.jpg',
            decisionArray: config.decisionArray || [
                {
                    description: 'Follow the tracks [ATN]',
                    attributes: ['attunement'],
                    successThreshold: 12,
                    roll: true,
                    successfulOutcomes: [
                        {
                            result: 'nextStage',
                            createNextStage: (partyLevel, biome)=>{
                                return new CrimsonSnow({});
                            },
                            xpReward: 5,
                            weight: 1
                        }
                    ],
                    negativeOutcomes: [
                        {
                            result: 'battle',
                            musicSrc: "./assets/audio/musicTracks/battle-sword-139313.mp3",
                            createBattle: (partyLevel, biome, difficulty)=>{
                                return biome.generateBattle(partyLevel);
                            },
                            createNextStage: (partyLevel, biome)=>{
                                return new CrimsonSnow({});
                            },
                            messageFunction: (currentCharacter)=>{
                                return `Something approaches ${currentCharacter.name}'s position!`
                            }, 
                            weight: 2,
                        },
                        {
                            result: 'retry',
                            messageFunction: (currentCharacter)=>{
                                return `${currentCharacter.name}'s wanders in the snow looking for more tracks.`
                            },
                            weight: 1,
                        },
                    ],
                    messageFunction: (currentCharacter)=>{
                        return `${currentCharacter.name} follows the tracks.`
                    }, 
                },
                {
                    description: 'Switch character',
                    successfulOutcomes: [{result: 'switchCharacter', weight: 1}],
                },
                {
                    description: 'Leave',
                    successfulOutcomes: [{result: 'complete', weight: 1}],
                    messageFunction: (currentCharacter)=>{
                        return `${currentCharacter.name}'s party moves on.`
                    }, 
                },
            ],
        })
    }
    messageFunction(currentCharacter){
        return `${currentCharacter.name} sees more tracks ahead.`;
    }
}

export class CrimsonSnow extends Stage{
    constructor(config){
        super({
            name: 'Crimson Snow',
            imageSrc: './assets/media/encounters/crimson-snow.jpg',
            decisionArray: config.decisionArray || [
                {
                    description: 'Investigate [INT / Panzerian]',
                    attributes: ['attunement', 'panzerian'],
                    successThreshold: 12,
                    roll: true,
                    successfulOutcomes: [
                        {
                            result: 'nextStage',
                            createNextStage: (partyLevel, biome)=>{
                                return new WoundedTiger({});
                            },
                            xpReward: 5,
                            weight: 1
                        },
                        {
                            result: 'nextStage',
                            createNextStage: (partyLevel, biome)=>{
                                return new ApexPredator({});
                            },
                            xpReward: 5,
                            weight: 1
                        }
                    ],
                    negativeOutcomes: [
                        {
                            result: 'battle',
                            musicSrc: "./assets/audio/musicTracks/battle-sword-139313.mp3",
                            createBattle: (partyLevel, biome, difficulty)=>{
                                return biome.generateBattle(partyLevel);
                            },
                            createNextStage: (partyLevel, biome)=>{
                                return new WoundedTiger({});
                            },
                            messageFunction: (currentCharacter)=>{
                                return `Something approaches ${currentCharacter.name}'s position!`
                            }, 
                            weight: 2,
                        },
                        {
                            result: 'retry',
                            messageFunction: (currentCharacter)=>{
                                return `${currentCharacter.name}'s doesn't see any thing noteworthy.`
                            },
                            weight: 1,
                        },
                    ],
                    messageFunction: (currentCharacter)=>{
                        return `${currentCharacter.name} follows the tracks.`
                    }, 
                },
                {
                    description: 'Switch character',
                    successfulOutcomes: [{result: 'switchCharacter', weight: 1}],
                },
                {
                    description: 'Leave',
                    successfulOutcomes: [{result: 'complete', weight: 1}],
                    messageFunction: (currentCharacter)=>{
                        return `${currentCharacter.name}'s party moves on.`
                    }, 
                },
            ],
        })
    }
    messageFunction(currentCharacter){
        return `${currentCharacter.name} sees crimson red snow ahead.`;
    }
}

export class WoundedTiger extends Stage{
    constructor(config){
        super({
            name: 'Wounded Tiger',
            imageSrc: './assets/media/encounters/wounded-tiger.jpg',
            decisionArray: config.decisionArray || [
                {
                    description: 'Bandage the Tiger. [Bandage]',
                    requiredItems: ['bandage'],
                    attributes: ['none'],
                    successThreshold: 5,
                    roll: true,
                    successfulOutcomes: [
                        {
                            result: 'recruit',
                            createRecruit: (partyLevel, biome, difficulty)=>{
                                let recruit = new Tiger({level: partyLevel, difficulty: difficulty})
                                recruit.isHostile = false;
                                return recruit;
                            },
                            onActivate(target){
                                target.currentCorruption -= 0.02;
                            },
                            messageFunction: (currentCharacter)=>{
                                return `The Tiger nuzzles ${currentCharacter.name}.`
                            }, 
                            weight: 1,
                        },
                    ],
                    negativeOutcomes: [
                        {
                            result: 'battle',
                            musicSrc: "./assets/audio/musicTracks/battle-sword-139313.mp3",
                            createBattle: (partyLevel, biome, difficulty)=>{
                                return biome.generateBattle(partyLevel);
                            },
                            createNextStage: (partyLevel, biome)=>{
                                return new WoundedTiger({});
                            },
                            onActivate(target){
                                target.currentCorruption -= 0.02;
                            },
                            messageFunction: (currentCharacter)=>{
                                return `Something approaches ${currentCharacter.name}'s position!`
                            }, 
                            weight: 2,
                        },
                        {
                            result: 'battle',
                            imageSrc: './assets/media/entities/mad-bandit.jpg',
                            musicSrc: "./assets/audio/musicTracks/battle-sword-139313.mp3",
                            createBattle: (partyLevel, biome, difficulty)=>{
                                let hostileArray = [];
                                let count = Math.ceil(Math.random()*4);
                                for(let i = 0; i < count; i++){
                                    hostileArray.push(new MadBandit({level: partyLevel, difficulty: difficulty}))
                                }
                                return new Battle({hostiles: hostileArray, battleMusicSrc: biome.battleMusicSrc, canRetreat: true});
                            },
                            onActivate(target){
                                target.currentCorruption -= 0.02;
                            },
                            messageFunction: (currentCharacter)=>{
                                return `As ${currentCharacter.name} bandages the Tiger, an arrow flies out of nowhere and hits the Tiger. The Tiger breathes its last breath leaving ${currentCharacter.name}'s party alone with a pack of bandits!`
                            }, 
                            weight: 1,
                        },
                        {
                            result: 'battle',
                            imageSrc: './assets/media/entities/tiger.jpg',
                            musicSrc: "./assets/audio/musicTracks/battle-sword-139313.mp3",
                            createBattle: (partyLevel, biome, difficulty)=>{
                                let hostileArray = [];
                                hostileArray.push(new Tiger({level: partyLevel, difficulty: difficulty, isHostile: true}))
                                hostileArray[0].currentHP = Math.floor(hostileArray[0].currentHP * 0.5)
                                hostileArray[0].statusArray.push(new Bleed({holder: hostileArray[0]}))
                                return new Battle({hostiles: hostileArray, battleMusicSrc: biome.battleMusicSrc, canRetreat: true});
                            },
                            onActivate(target){
                                target.currentCorruption -= 0.02;
                            },
                            messageFunction: (currentCharacter)=>{
                                return `As ${currentCharacter.name} bandages the Tiger, the tiger stands to its feet and growls at ${currentCharacter.name}!`
                            }, 
                            weight: 1,
                        },
                        {
                            result: 'battle',
                            imageSrc: './assets/media/entities/tiger.jpg',
                            musicSrc: "./assets/audio/musicTracks/battle-sword-139313.mp3",
                            createBattle: (partyLevel, biome, difficulty)=>{
                                let hostileArray = [];
                                hostileArray.push(new Tiger({level: partyLevel, difficulty: difficulty, isHostile: true}))
                                hostileArray[0].currentHP = Math.floor(hostileArray[0].currentHP * 0.5)
                                hostileArray[0].statusArray.push(new Bleed({holder: hostileArray[0]}))
                                let count = Math.ceil(Math.random()*4);
                                for(let i = 0; i < count; i++){
                                    hostileArray.push(new Tiger({level: partyLevel, difficulty: difficulty, isHostile: true}))
                                }
                                return new Battle({hostiles: hostileArray, battleMusicSrc: biome.battleMusicSrc, canRetreat: true});
                            },
                            messageFunction: (currentCharacter)=>{
                                return `As ${currentCharacter.name} approaches the Tiger, an ambush of Tigers surrounds ${currentCharacter.name}!`
                            }, 
                            weight: 1,
                        },
                    ],
                    messageFunction: (currentCharacter)=>{
                        return `${currentCharacter.name} attempts to bandage the Tiger.`
                    }, 
                },
                {
                    description: 'Put the wounded animal to rest.',
                    attributes: ['none'],
                    successThreshold: 12,
                    roll: true,
                    successfulOutcomes: [
                        {
                            result: 'complete',
                            createLoot: (partyLevel, biome)=>{
                                return  [new Pelt(), new Pelt(), new Pelt()];
                            },
                            xpReward: 5,
                            weight: 1,
                        },
                    ],
                    negativeOutcomes: [
                        {
                            result: 'battle',
                            imageSrc: './assets/media/entities/mad-bandit.jpg',
                            musicSrc: "./assets/audio/musicTracks/battle-sword-139313.mp3",
                            createBattle: (partyLevel, biome, difficulty)=>{
                                let hostileArray = [];
                                let count = Math.ceil(Math.random()*4);
                                for(let i = 0; i < count; i++){
                                    hostileArray.push(new MadBandit({level: partyLevel, difficulty: difficulty}))
                                }
                                return new Battle({hostiles: hostileArray, battleMusicSrc: biome.battleMusicSrc, canRetreat: true});
                            },
                            messageFunction: (currentCharacter)=>{
                                return `As ${currentCharacter.name} approaches the Tiger, an arrow flies out of nowhere and hits the Tiger. The Tiger breathes its last breath leaving ${currentCharacter.name}'s party alone with a pack of bandits!`
                            }, 
                            weight: 1,
                        },
                        {
                            result: 'battle',
                            imageSrc: './assets/media/entities/tiger.jpg',
                            musicSrc: "./assets/audio/musicTracks/battle-sword-139313.mp3",
                            createBattle: (partyLevel, biome, difficulty)=>{
                                let hostileArray = [];
                                hostileArray.push(new Tiger({level: partyLevel, difficulty: difficulty, isHostile: true}))
                                hostileArray[0].currentHP = Math.floor(hostileArray[0].currentHP * 0.5)
                                hostileArray[0].statusArray.push(new Bleed({holder: hostileArray[0]}))
                                return new Battle({hostiles: hostileArray, battleMusicSrc: biome.battleMusicSrc});
                            },
                            messageFunction: (currentCharacter)=>{
                                return `As ${currentCharacter.name} approaches the Tiger, the tiger stands to its feet and growls at ${currentCharacter.name}!`
                            }, 
                            weight: 1,
                        },
                        {
                            result: 'battle',
                            imageSrc: './assets/media/entities/tiger.jpg',
                            musicSrc: "./assets/audio/musicTracks/battle-sword-139313.mp3",
                            createBattle: (partyLevel, biome, difficulty)=>{
                                let hostileArray = [];
                                hostileArray.push(new Tiger({level: partyLevel, difficulty: difficulty, isHostile: true}))
                                hostileArray[0].currentHP *= 0.5
                                hostileArray[0].statusArray.push(new Bleed({holder: hostileArray[0]}))
                                let count = Math.ceil(Math.random()*4);
                                for(let i = 0; i < count; i++){
                                    hostileArray.push(new Tiger({level: partyLevel, difficulty: difficulty, isHostile: true}))
                                }
                                return new Battle({hostiles: hostileArray, battleMusicSrc: biome.battleMusicSrc, canRetreat: true});
                            },
                            messageFunction: (currentCharacter)=>{
                                return `As ${currentCharacter.name} approaches the Tiger, an ambush of Tigers surrounds ${currentCharacter.name}!`
                            }, 
                            weight: 1,
                        },
                    ],
                    messageFunction: (currentCharacter)=>{
                        return `${currentCharacter.name} approaches the Tiger.`
                    }, 
                },
                {
                    description: 'Switch character',
                    successfulOutcomes: [{result: 'switchCharacter', weight: 1}],
                },
                {
                    description: 'Leave',
                    successfulOutcomes: [{result: 'complete', weight: 1}],
                    messageFunction: (currentCharacter)=>{
                        return `${currentCharacter.name}'s party moves on.`
                    }, 
                },
            ],
        })
    }
    messageFunction(currentCharacter){
        return `${currentCharacter.name} sees a tiger laying in the snow ahead. It appears to be injured.`;
    }
}

export class ApexPredator extends Stage{
    constructor(config){
        super({
            name: 'Apex Predator',
            imageSrc: './assets/media/entities//panzerkamfer.jpg',
            musicSrc: "./assets/audio/musicTracks/2022-03-16_-_Escape_Route_-_www.FesliyanStudios.com.mp3",
            decisionArray: [
                {//Decision
                    description: 'Attack',
                    successfulOutcomes: [
                        {
                            result: 'battle',
                            createBattle: (partyLevel, biome, difficulty)=>{
                                let hostileArray = [new Panzerkamfer({level: partyLevel, difficulty: difficulty})];
                                return new Battle({hostiles: hostileArray, battleMusicSrc: "./assets/audio/musicTracks/2022-03-16_-_Escape_Route_-_www.FesliyanStudios.com.mp3", gold: (20*partyLevel), canRetreat: false});
                            },
                            messageFunction: (currentCharacter)=>{
                                return `${currentCharacter.name} attacks!`
                            }, 
                            weight: 1,
                        },
                    ],
                },
                {//Decision
                    description: 'Run [DEX / STR]',
                    attributes: ['strength','dexterity'],
                    successThreshold: 15,
                    roll: true,
                    successfulOutcomes: [
                        {
                            result: 'overworld',
                            messageFunction: (currentCharacter)=>{
                                return `${currentCharacter.name} escapes the predator!`
                            },   
                            weight: 1,
                        },
                    ],
                    negativeOutcomes: [
                        {
                            result: 'battle',
                            createBattle: (partyLevel, biome, difficulty)=>{
                                let hostileArray = [new Panzerkamfer({level: partyLevel, difficulty: difficulty})];
                                return new Battle({hostiles: hostileArray, battleMusicSrc: "./assets/audio/musicTracks/2022-03-16_-_Escape_Route_-_www.FesliyanStudios.com.mp3", gold: (20*partyLevel), canRetreat: false});
                            },
                            messageFunction: (currentCharacter)=>{
                                return `The predator cuts off ${currentCharacter.name}'s escape!`
                            }, 
                            weight: 1,
                        },
                    ],
                    messageFunction: (currentCharacter)=>{
                        return `${currentCharacter.name} attempts to flee!`
                    }, 
                },
            ]
        })
    }
    messageFunction(currentCharacter){
        return `(An unnatural beast growls...)`;
    }
}