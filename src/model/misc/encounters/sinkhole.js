import Stage from "./stage.js";
import Battle from "../battle.js";
import { DryKraken, DryKrakenTentacle, DryShark } from "../entities.js";
import { KnockedDown, SoulLinked} from "../statusEffects.js";
import { getRandomArrayElementWeighted } from "../../../utility.js";

export class Sinkhole extends Stage{
    constructor(config){
        super({
            name: 'Sinkhole',
            imageSrc: './assets/media/encounters/sinkhole.jpg',
            decisionArray: config.decisionArray || [
                {
                    description: 'Run away. [VIG]',
                    attributes: ['vigor'],
                    successThreshold: 12,
                    roll: true,
                    successfulOutcomes: [
                        {
                            result: 'complete',
                            messageFunction: (currentCharacter)=>{
                                return `${currentCharacter.name}'s party runs out of the sinkhole before it collapses. What could have caused such a thing...`
                            },
                            xpReward: 5, 
                            weight: 1,
                        },
                    ],
                    negativeOutcomes: [
                        {
                            result: 'nextStage',
                            createNextStage: (partyLevel, biome)=>{
                                return new GaintTentacle({});
                            },
                            weight: 2,
                        },
                        {
                            result: 'battle',
                            imageSrc: './assets/media/entities/dry-shark.jpg',
                            musicSrc: "./assets/audio/musicTracks/TimTaj - Desert Hunt.mp3",
                            createBattle: (partyLevel, biome, difficulty)=>{
                                let hostileArray = [];
                                let count = Math.ceil(Math.random()*3);
                                for(let i = 0; i < count; i++){
                                    hostileArray.push(new DryShark({level: partyLevel, difficulty: difficulty}))
                                }
                                return new Battle({hostiles: hostileArray, battleMusicSrc: biome.battleMusicSrc, canRetreat: true});
                            },
                            messageFunction: (currentCharacter)=>{
                                return `Suddenly the ground stops sinking and a beast emerges from the sand!`
                            }, 
                            weight: 1,
                        }
                    ],
                    messageFunction: (currentCharacter)=>{
                        return `${currentCharacter.name} tries to run out of the sinkhole.`
                    }, 
                },
                {
                    description: 'Grab onto something. [STR/ATN]',
                    attributes: ['strength', 'attunement'],
                    successThreshold: 12,
                    roll: true,
                    successfulOutcomes: [
                        {
                            result: 'complete',
                            messageFunction: (currentCharacter)=>{
                                return `${currentCharacter.name}'s party grabs onto a nearby rock and waits out the sinkhole. What could have caused such a thing...`
                            },
                            xpReward: 5, 
                            weight: 1,
                        },
                    ],
                    negativeOutcomes: [
                        {
                            result: 'nextStage',
                            createNextStage: (partyLevel, biome)=>{
                                return new GaintTentacle({});
                            },
                            weight: 2,
                        },
                        {
                            result: 'battle',
                            imageSrc: './assets/media/entities/dry-shark.jpg',
                            musicSrc: "./assets/audio/musicTracks/TimTaj - Desert Hunt.mp3",
                            createBattle: (partyLevel, biome, difficulty)=>{
                                let hostileArray = [];
                                let count = Math.ceil(Math.random()*3);
                                for(let i = 0; i < count; i++){
                                    hostileArray.push(new DryShark({level: partyLevel, difficulty: difficulty}))
                                }
                                return new Battle({hostiles: hostileArray, battleMusicSrc: biome.battleMusicSrc, canRetreat: true});
                            },
                            messageFunction: (currentCharacter)=>{
                                return `Suddenly the ground stops sinking and a beast emerges from the sand!`
                            }, 
                            weight: 1,
                        }
                    ],
                    messageFunction: (currentCharacter)=>{
                        return `${currentCharacter.name} grabs onto a nearby rock.`
                    }, 
                },
            ],
        })
    }
    messageFunction(currentCharacter){
        return `As ${currentCharacter.name}'s party walks along, the ground begins to sink around them!`;
    }
}

export class GaintTentacle extends Stage{
    constructor(config){
        super({
            name: 'Giant Tentacle',
            musicSrc: "./assets/audio/musicTracks/2022-03-16_-_Escape_Route_-_www.FesliyanStudios.com.mp3",
            imageSrc: './assets/media/entities/dry-kraken-tentacle.jpg',
            decisionArray: config.decisionArray || [
                {
                    description: 'Run away. [VIG]',
                    attributes: ['vigor'],
                    successThreshold: 12,
                    roll: true,
                    successfulOutcomes: [
                        {
                            result: 'complete',
                            messageFunction: (currentCharacter)=>{
                                return `${currentCharacter.name} quickly runs out of the sinkhole. Soon the tentacle sinks back into the desert.`
                            },
                            xpReward: 5, 
                            weight: 1,
                        },
                    ],
                    negativeOutcomes: [
                        {
                            result: 'nextStage',
                            createNextStage: (partyLevel, biome)=>{
                                return new DesertHorror({});
                            },
                            weight: 1,
                        }
                    ],
                    messageFunction: (currentCharacter)=>{
                        return `${currentCharacter.name} tries to run out of the sinkhole.`
                    }, 
                },
                {
                    description: 'Swing at the tentacle. [STR]',
                    attributes: ['vigor'],
                    successThreshold: 16,
                    roll: true,
                    successfulOutcomes: [
                        {
                            result: 'complete',
                            messageFunction: (currentCharacter)=>{
                                return `${currentCharacter.name}'s party swings their weapons at the tentacle. Injured, the tentacle retreats into the desert sand.`
                            },
                            xpReward: 5,
                            weight: 1,
                        },
                    ],
                    negativeOutcomes: [
                        {
                            result: 'nextStage',
                            createNextStage: (partyLevel, biome)=>{
                                return new DesertHorror({});
                            },
                            weight: 1,
                        }
                    ],
                    messageFunction: (currentCharacter)=>{
                        return `${currentCharacter.name} swings at the tentacle.`
                    }, 
                }
            ],
        })
    }
    messageFunction(currentCharacter){
        return `As if things couldn't get bad enough, a giant tentacle suddenly erupts from the sand and lunges at ${currentCharacter.name}!`;
    }
}

export class DesertHorror extends Stage{
    constructor(config){
        super({
            name: 'Desert Horror',
            imageSrc: './assets/media/entities/dry-kraken.jpg',
            musicSrc: "./assets/audio/musicTracks/2022-03-16_-_Escape_Route_-_www.FesliyanStudios.com.mp3",
            decisionArray: config.decisionArray || [
                {
                    description: 'Prepare to fight.',
                    successfulOutcomes: [
                        {
                            result: 'battle',
                            createBattle: (partyLevel, biome, difficulty)=>{
                                let hostileArray = [];
                                let kraken =  new DryKraken({level: partyLevel, difficulty: difficulty});
                                hostileArray.push(kraken)
                                for(let i = 1; i < 9; i++){
                                    hostileArray.push(new DryKrakenTentacle({level: partyLevel, difficulty: difficulty}));
                                    kraken.statusArray.push(new SoulLinked({holder:kraken, inflicter: hostileArray[i]}))
                                }
                                return new Battle({hostiles: hostileArray, battleMusicSrc: "./assets/audio/musicTracks/2022-03-16_-_Escape_Route_-_www.FesliyanStudios.com.mp3", canRetreat: false});
                            },
                            weight: 1,
                        },
                    ],
                    messageFunction: (currentCharacter)=>{
                        return `${currentCharacter.name}'s party prepares to fight the monster!`
                    }, 
                },
                {
                    description: `Swing at the monster's tentacles. [STR]`,
                    attributes: ['strength'],
                    successThreshold: 16,
                    roll: true,
                    successfulOutcomes: [
                        {
                            result: 'battle',
                            createBattle: (partyLevel, biome, difficulty)=>{
                                let hostileArray = [];
                                let kraken =  new DryKraken({level: partyLevel, difficulty: difficulty});
                                hostileArray.push(kraken)
                                for(let i = 1; i < 7; i++){
                                    hostileArray.push(new DryKrakenTentacle({level: partyLevel, difficulty: difficulty}));
                                    kraken.statusArray.push(new SoulLinked({holder:kraken, inflicter: hostileArray[i]}))
                                }
                                return new Battle({hostiles: hostileArray, battleMusicSrc: "./assets/audio/musicTracks/2022-03-16_-_Escape_Route_-_www.FesliyanStudios.com.mp3", canRetreat: false});
                            },
                            weight: 1,
                            messageFunction: (currentCharacter)=>{
                                return `${currentCharacter.name} slashes two of the monster's tentacles in half! Enraged, the monster rears and rushes towards ${currentCharacter.name}!`
                            },
                            weight: 1,
                        },
                    ],
                    negativeOutcomes: [
                        {
                            result: 'battle',
                            createBattle: (partyLevel, biome, difficulty)=>{
                                let hostileArray = [];
                                let kraken =  new DryKraken({level: partyLevel, difficulty: difficulty});
                                hostileArray.push(kraken)
                                for(let i = 1; i < 9; i++){
                                    hostileArray.push(new DryKrakenTentacle({level: partyLevel, difficulty: difficulty}));
                                    kraken.statusArray.push(new SoulLinked({holder:kraken, inflicter: hostileArray[i]}))
                                }
                                return new Battle({hostiles: hostileArray, battleMusicSrc: "./assets/audio/musicTracks/2022-03-16_-_Escape_Route_-_www.FesliyanStudios.com.mp3", canRetreat: false});
                            },
                            onActivate(target){
                                target.currentHp -= Math.floor(target.maxHP * 0.33);
                            },
                            messageFunction: (currentCharacter)=>{
                                return `As ${currentCharacter.name} tries to attack the monster's tentacles, one of them smashes into ${currentCharacter.name}!`
                            },
                            weight: 1,
                        },
                    ],
                    messageFunction: (currentCharacter)=>{
                        return `${currentCharacter.name} swings at the monster's tentacles.`
                    }, 
                },
                {
                    description: `Throw something at the monster's eye. [DEX]`,
                    attributes: ['dexterity'],
                    successThreshold: 18,
                    roll: true,
                    successfulOutcomes: [
                        {
                            result: 'battle',
                            createBattle: (partyLevel, biome, difficulty)=>{
                                let hostileArray = [];
                                let kraken =  new DryKraken({level: partyLevel, difficulty: difficulty});
                                kraken.currentHP = kraken.currentHP * 0.75
                                hostileArray.push(kraken)
                                for(let i = 1; i < 9; i++){
                                    hostileArray.push(new DryKrakenTentacle({level: partyLevel, difficulty: difficulty}));
                                    kraken.statusArray.push(new SoulLinked({holder:kraken, inflicter: hostileArray[i]}))
                                }
                                return new Battle({hostiles: hostileArray, battleMusicSrc: "./assets/audio/musicTracks/2022-03-16_-_Escape_Route_-_www.FesliyanStudios.com.mp3", canRetreat: false});
                            },
                            messageFunction: (currentCharacter)=>{
                                return `${currentCharacter.name} throws a dagger right into the monster's eye, the monster shakes furiously and rushes towards ${currentCharacter.name}!`
                            },
                            weight: 1,
                        },
                    ],
                    negativeOutcomes: [
                        {
                            result: 'battle',
                            createBattle: (partyLevel, biome, difficulty)=>{
                                let hostileArray = [];
                                let kraken =  new DryKraken({level: partyLevel, difficulty: difficulty});
                                hostileArray.push(kraken)
                                for(let i = 1; i < 9; i++){
                                    hostileArray.push(new DryKrakenTentacle({level: partyLevel, difficulty: difficulty}));
                                    kraken.statusArray.push(new SoulLinked({holder:kraken, inflicter: hostileArray[i]}))
                                }
                                return new Battle({hostiles: hostileArray, battleMusicSrc: "./assets/audio/musicTracks/2022-03-16_-_Escape_Route_-_www.FesliyanStudios.com.mp3", canRetreat: false});
                            },
                            onActivate(target){
                                target.currentHp -= Math.floor(target.maxHP * 0.33);
                                for(let i = 0; i < target.statusArray.length; i++){
                                    if(target.statusArray[i].name == 'knocked down'){
                                        return;
                                    }
                                }
                                let status = new KnockedDown({holder: target});
                                target.statusArray.push(status);
                                status.onApplied(target, target, status)
                               
                            },
                            messageFunction: (currentCharacter)=>{
                                return `Before ${currentCharacter.name} can throw the dagger, the monster knock ${currentCharacter.name} to the ground with its tentacles!`
                            },
                            weight: 1,
                        },
                    ],
                    messageFunction: (currentCharacter)=>{
                        return `${currentCharacter.name} attempts to throw a dagger at the monster's eye.`
                    }, 
                },
                {
                    description: `Jump into the monster's mouth and slay it from within. [VIG/STR/DEX]`,
                    attributes: ['vigor', 'strength', 'dexterity'],
                    successThreshold: 20,
                    roll: true,
                    successfulOutcomes: [
                        {
                            result: 'complete',
                            createLoot: (partyLevel, biome)=>{
                                return  [getRandomArrayElementWeighted(biome.lootTable).item()];
                            },
                            messageFunction: (currentCharacter)=>{
                                return `With extravagant strength, ${currentCharacter.name} jumps into the monster's mouth and slays the monster from within!`
                            },
                            xpReward: 50, 
                            weight: 1,
                        },
                    ],
                    negativeOutcomes: [
                        {
                            result: 'battle',
                            createBattle: (partyLevel, biome, difficulty)=>{
                                let hostileArray = [];
                                let kraken =  new DryKraken({level: partyLevel, difficulty: difficulty});
                                hostileArray.push(kraken)
                                for(let i = 1; i < 9; i++){
                                    hostileArray.push(new DryKrakenTentacle({level: partyLevel, difficulty: difficulty}));
                                    kraken.statusArray.push(new SoulLinked({holder:kraken, inflicter: hostileArray[i]}))
                                }
                                return new Battle({hostiles: hostileArray, battleMusicSrc: "./assets/audio/musicTracks/2022-03-16_-_Escape_Route_-_www.FesliyanStudios.com.mp3", canRetreat: false});
                            },
                            onActivate(target){
                                target.currentHP = 0;
                            },
                            messageFunction: (currentCharacter)=>{
                                return `After a herioic charge, ${currentCharacter.name} is eaten instantly.`
                            },
                            weight: 1,
                        },
                    ],
                    messageFunction: (currentCharacter)=>{
                        return `${currentCharacter.name} charges into the monster's mouth.`
                    }, 
                },
                {
                    description: 'Run for your life. [VIG]',
                    attributes: ['vigor'],
                    successThreshold: 16,
                    roll: true,
                    successfulOutcomes: [
                        {
                            result: 'complete',
                            messageFunction: (currentCharacter)=>{
                                return `${currentCharacter.name} desperately dodges the tentacles reaching for the party. With great strength and plenty of luck, ${currentCharacter.name}'s party barely escapes the monstrosity.`
                            },
                            xpReward: 5, 
                            weight: 1,
                        },
                    ],
                    negativeOutcomes: [
                        {
                            createBattle: (partyLevel, biome, difficulty)=>{
                                let hostileArray = [];
                                let kraken =  new DryKraken({level: partyLevel, difficulty: difficulty});
                                hostileArray.push(kraken)
                                for(let i = 1; i < 9; i++){
                                    hostileArray.push(new DryKrakenTentacle({level: partyLevel, difficulty: difficulty}));
                                    kraken.statusArray.push(new SoulLinked({holder:kraken, inflicter: hostileArray[i]}))
                                }
                                return new Battle({hostiles: hostileArray, battleMusicSrc: "./assets/audio/musicTracks/2022-03-16_-_Escape_Route_-_www.FesliyanStudios.com.mp3", canRetreat: false});
                            },
                        }
                    ],
                    messageFunction: (currentCharacter)=>{
                        return `${currentCharacter.name} tries to run out of the sinkhole.`
                    }, 
                },
            ],
        })
    }
    messageFunction(currentCharacter){
        return `The ground beneath ${currentCharacter.name} starts to shake, then a tentacled monstrosity emerges from the sinkhole!`;
    }
}