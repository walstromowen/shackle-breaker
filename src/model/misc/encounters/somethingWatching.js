import Stage from "./stage.js";
import Battle from "../battle.js";
import { Wolf, Sterben} from "../entities.js";
import { getRandomArrayElementWeighted } from "../../../utility.js";
import { Frozen } from "../statusEffects.js";

export class SomethingWatching extends Stage{
    constructor(config){
        super({
            name: 'Something Watching',
            imageSrc: './assets/media/encounters/something-watching.jpg',
            musicSrc: "./assets/audio/musicTracks/suspense-mysterious-trailor-music-foggy-forest-et11lx-157726.mp3",
            decisionArray: config.decisionArray || [
                {
                    option: 'A',
                    description: 'Look around. [ATN]',
                    attributes: ['attunement'],
                    successThreshold: 12,
                    roll: true,
                    successfulOutcomes: [
                        {
                            result: 'nextStage',
                            createNextStage: (partyLevel, biome)=>{
                                return new ChillingGhost({});
                            },
                            xpReward: 5,
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
                            messageFunction: (currentCharacter)=>{
                                return `Something approaches ${currentCharacter.name}'s position!`
                            }, 
                            weight: 1,
                        },
                        {
                            result: 'battle',
                            imageSrc: './assets/media/entities/wolf.jpg',
                            musicSrc: "./assets/audio/musicTracks/battle-sword-139313.mp3",
                            createBattle: (partyLevel, biome, difficulty)=>{
                                let hostileArray = [];
                                let count = Math.ceil(Math.random()*6);
                                for(let i = 0; i < count; i++){
                                    hostileArray.push(new Wolf({level: partyLevel, difficulty: difficulty}))
                                }
                                return new Battle({hostiles: hostileArray, battleMusicSrc: biome.battleMusicSrc});
                            },
                            messageFunction: (currentCharacter)=>{
                                return `A pack of wolves races towards ${currentCharacter.name}!`
                            }, 
                            weight: 1,
                        },
                    ], 
                    messageFunction: (currentCharacter)=>{
                        return `${currentCharacter.name} looks around.`
                    }, 
                },
            ],
        })
    }
    messageFunction(currentCharacter){
        return `${currentCharacter.name} stops. Something is watching...`;
    }
}

export class ChillingGhost extends Stage{
    constructor(config){
        super({
            name: 'Chilling Ghost',
            imageSrc: './assets/media/entities/sterben.jpg',
            musicSrc: "./assets/audio/musicTracks/suspense-mysterious-trailor-music-foggy-forest-et11lx-157726.mp3",
            decisionArray: [
                {//Decision
                    description: 'Attack',
                    successfulOutcomes: [
                        {
                            result: 'battle',
                            createBattle: (partyLevel, biome, difficulty)=>{
                                let hostileArray = [new Sterben({level: partyLevel, difficulty: difficulty})];
                                return new Battle({hostiles: hostileArray, battleMusicSrc: "./assets/audio/musicTracks/adrenaline-roger-gabalda-main-version-02-23-11021.mp3", gold: (20*partyLevel), canRetreat: false});
                            },
                            messageFunction: (currentCharacter)=>{
                                return `${currentCharacter.name} attacks!`
                            }, 
                            weight: 1,
                        },
                    ],
                },
                {//Decision
                    description: 'Attempt to Communicate. [ATN]',
                    attributes: ['attunement'],
                    successThreshold: 18,
                    roll: true,
                    successfulOutcomes: [
                        {
                            result: 'complete',
                            createLoot: (partyLevel, biome)=>{
                                let chance = Math.floor(Math.random()*2)
                                if(chance == 0) return  [getRandomArrayElementWeighted(biome.lootTable).item()];
                                if(chance == 1) return  [getRandomArrayElementWeighted(biome.lootTable).item()];
                            },
                            messageFunction: (currentCharacter)=>{
                                return `The ghostly figures nods at ${currentCharacter.name} and then fades away. It appears to have left something.`
                            },
                            xpReward: 10,   
                            weight: 1,
                        },
                    ],
                    negativeOutcomes: [
                        {
                            result: 'battle',
                            onActivate(target){
                                for(let i = 0; i < target.statusArray.length; i++){
                                    if(target.statusArray[i].name == 'frozen'){
                                        return;
                                    }
                                }
                                let status =  new Frozen({holder: target})
                                status.onApplied(target, target, status);
                            },
                            createBattle: (partyLevel, biome, difficulty)=>{
                                let hostileArray = [new Sterben({level: partyLevel, difficulty: difficulty})];
                                return new Battle({hostiles: hostileArray, battleMusicSrc: "./assets/audio/musicTracks/adrenaline-roger-gabalda-main-version-02-23-11021.mp3", gold: (20*partyLevel), canRetreat: false});
                            },
                            messageFunction: (currentCharacter)=>{
                                return `Before ${currentCharacter.name} can utter a sound, the ghostly figure rushes towards ${currentCharacter.name}!`
                            }, 
                            weight: 1,
                        },
                    ],
                    messageFunction: (currentCharacter)=>{
                        return `${currentCharacter.name} attempts to communicate quickly!`
                    }, 
                },
                {//Decision
                    description: 'Run [DEX / STR]',
                    attributes: ['strength','dexterity'],
                    successThreshold: 15,
                    roll: true,
                    successfulOutcomes: [
                        {
                            result: 'complete',
                            messageFunction: (currentCharacter)=>{
                                return `${currentCharacter.name} escapes the ghostly figure!`
                            },
                            xpReward: 10,   
                            weight: 1,
                        },
                    ],
                    negativeOutcomes: [
                        {
                            result: 'battle',
                            onActivate(target){
                                for(let i = 0; i < target.statusArray.length; i++){
                                    if(target.statusArray[i].name == 'frozen'){
                                        return;
                                    }
                                }
                                let status = new Frozen({holder: target})
                                status.onApplied(target, target, status);
                            },
                            createBattle: (partyLevel, biome, difficulty)=>{
                                let hostileArray = [new Sterben({level: partyLevel, difficulty: difficulty})];
                                return new Battle({hostiles: hostileArray, battleMusicSrc: "./assets/audio/musicTracks/2022-03-16_-_Escape_Route_-_www.FesliyanStudios.com.mp3", gold: (20*partyLevel), canRetreat: false});
                            },
                            messageFunction: (currentCharacter)=>{
                                return `${currentCharacter.name} tires to makes a run for it but ice has frozen ${currentCharacter.name}'s legs!`
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
        return `A ghostly figure stares at ${currentCharacter.name}. Just then, ice starts to crawl up ${currentCharacter.name}'s legs!`;
    }
}