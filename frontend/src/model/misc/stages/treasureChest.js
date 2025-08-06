import Stage from "../stage.js";
import Decision from "../decision.js";
import Result from "../result.js";

export class TreasureChest extends Stage {
    constructor(config) {
        super({
            name: "Treasure Chest",
            messageKey: "treasureChestStage",
            imageSrc: "./assets/media/encounters/treasure-chest-locked.jpg",
            decisionArray: config.decisionArray || [
                new Decision({
                    option: "A",
                    description: "Pry the chest open. [STR]",
                    attributes: ["strength"],
                    successThreshold: 12,
                    roll: true,
                    messageKey: "treasureChestPryAttempt",
                    successfulOutcomes: [
                        new Result({
                            result: "complete",
                            createLootKey: "randomBiomeItem2",
                            messageKey: "treasureChestPrySuccess",
                            xpReward: 5,
                            weight: 1,
                        }),
                    ],
                    negativeOutcomes: [
                        new Result({
                            result: "battle",
                            musicSrc: "./assets/audio/musicTracks/battle-of-the-dragons-8037.mp3",
                            createBattleKey: "biomeGeneratedBattle",
                            createNextStageKey: "self",
                            messageKey: "somethingApproachesPosition",
                            weight: 2,
                        }),
                        new Result({
                            result: "retry",
                            removableDecisions: ["A"],
                            messageKey: "treasureChestPryFail",
                            weight: 1,
                        }),
                    ],
                }),
                new Decision({
                    option: "B",
                    description: "Pick the lock. [DEX]",
                    attributes: ["dexterity"],
                    successThreshold: 12,
                    roll: true,
                    messageKey: "treasureChestPickAttempt",
                    successfulOutcomes: [
                        new Result({
                        result: "complete",
                        createLootKey: "randomBiomeItem2",
                        messageKey: "treasureChestPickSuccess",
                        xpReward: 5,
                        weight: 1,
                        }),
                    ],
                    negativeOutcomes: [
                        new Result({
                            result: "battle",
                            musicSrc: "./assets/audio/musicTracks/battle-of-the-dragons-8037.mp3",
                            createBattleKey: "biomeGeneratedBattle",
                            createNextStageKey: "self",
                            messageKey: "somethingApproachesPosition",
                            weight: 2,
                        }),
                        new Result({
                            result: "retry",
                            removableDecisions: ["B"],
                            messageKey: "treasureChestPickFail",
                            weight: 1,
                        }),
                    ],
                }),
                new Decision({
                    option: "C",
                    description: "Search for the key. [INT / ATN]",
                    attributes: ["intelligence", "attunement"],
                    successThreshold: 12,
                    roll: true,
                    messageKey: "treasureChestSearchAttempt",
                    successfulOutcomes: [
                        new Result({
                            result: "complete",
                            createLootKey: "randomBiomeItem2",
                            messageKey: "treasureChestSearchSuccess",
                            xpReward: 5,
                            weight: 1,
                        }),
                    ],
                    negativeOutcomes: [
                        new Result({
                            result: "battle",
                            musicSrc: "./assets/audio/musicTracks/battle-of-the-dragons-8037.mp3",
                            createBattleKey: "biomeGeneratedBattle",
                            createNextStageKey: "self",
                            messageKey: "somethingApproachesPosition",
                            weight: 2,
                        }),
                        new Result({
                            result: "retry",
                            removableDecisions: ["C"],
                            messageKey: "treasureChestSearchFail",
                            weight: 1,
                        }),
                    ],
                }),
                new Decision({
                    option: "E",
                    description: "Switch character",
                    successfulOutcomes: [{ result: "switchCharacter", weight: 1 }],
                }),
                new Decision({
                    option: "F",
                    description: "Leave",
                    successfulOutcomes: [{ result: "complete", weight: 1 }],
                    messageKey: "treasureChestLeave",
                }),
            ],
        });
    }
}

/* Old
import Stage from "../stage.js";
import Decision from "../decision.js";
import Result from "../result.js";
import { getRandomArrayElementWeighted } from "../../../utility.js";

export class TreasureChest extends Stage{
    constructor(config){
        super({
            name: 'Treasure Chest',
            imageSrc: './assets/media/encounters/treasure-chest-locked.jpg',
            decisionArray: config.decisionArray || [
                {//Decision
                    option: 'A',
                    description: 'Pry the chest open. [STR]',
                    attributes: ['strength'],
                    successThreshold: 12,
                    roll: true,
                    messageFunction: (currentCharacter)=>{
                        return `${currentCharacter.name} attempts to pry the chest open.`
                    },
                    successfulOutcomes: [
                        {
                            result: 'complete',
                            createLoot: (partyLevel, biome)=>{
                                let rewards = [];
                                let count = Math.ceil(Math.random()*3);
                                for(let i = 0; i < count; i++){
                                    rewards.push(getRandomArrayElementWeighted(biome.lootTable).item())
                                }
                                return rewards;
                            },
                            messageFunction: (currentCharacter)=>{
                                return `${currentCharacter.name} sucessfully prys the chest open!`
                            },
                            xpReward: 5, 
                            weight: 1,
                        },
                    ],
                    negativeOutcomes: [
                        {
                            result: 'battle',
                            musicSrc: "./assets/audio/musicTracks/battle-of-the-dragons-8037.mp3",
                            createBattle: (partyLevel, biome, difficulty)=>{
                                return biome.generateBattle(partyLevel);
                            },
                            createNextStage: (partyLevel, biome)=>{
                                return this; 
                            },
                            messageFunction: (currentCharacter)=>{
                                return `Something approaches ${currentCharacter.name}'s position!`
                            }, 
                            weight: 2,
                        },
                        {
                            result: 'retry',
                            removableDecisions: ['A'],
                            messageFunction: (currentCharacter)=>{
                                return `The chest wont budge.`
                            }, 
                            weight: 1,
                        },
                    ] 
                },
                {//Decision
                    option: 'B',
                    description: 'Pick the lock. [DEX]',
                    attributes: ['dexterity'],
                    successThreshold: 12,
                    roll: true,
                    messageFunction: (currentCharacter)=>{
                        return `${currentCharacter.name} attempts to pick the lock.`
                    },
                    successfulOutcomes: [
                        {
                            result: 'complete',
                            createLoot: (partyLevel, biome)=>{
                                let rewards = [];
                                let count = Math.ceil(Math.random()*3);
                                for(let i = 0; i < count; i++){
                                    rewards.push(getRandomArrayElementWeighted(biome.lootTable).item())
                                }
                                return rewards;
                            },
                            messageFunction: (currentCharacter)=>{
                                return `${currentCharacter.name} sucessfully picks the lock!`
                            },
                            xpReward: 5, 
                            weight: 1,
                        },
                    ],
                    negativeOutcomes: [
                        {
                            result: 'battle',
                            musicSrc: "./assets/audio/musicTracks/battle-of-the-dragons-8037.mp3",
                            createBattle: (partyLevel, biome, difficulty)=>{
                                return biome.generateBattle(partyLevel);
                            },
                            createNextStage: (partyLevel, biome)=>{
                                return this; 
                            },
                            messageFunction: (currentCharacter)=>{
                                return `Something approaches ${currentCharacter.name}'s position!`
                            }, 
                            weight: 2,
                        },
                        {
                            result: 'retry',
                            removableDecisions: ['B'],
                            messageFunction: (currentCharacter)=>{
                                return `${currentCharacter.name} jams the lock.`
                            }, 
                            weight: 1,
                        },
                    ] 
                },
                {//Decision
                    option: 'C',
                    description: 'Search for the key. [INT / ATN]',
                    attributes: ['intelligence', 'attunement'],
                    successThreshold: 12,
                    roll: true,
                    messageFunction: (currentCharacter)=>{
                        return `${currentCharacter.name} searches for the key.`
                    },
                    successfulOutcomes: [
                        {
                            result: 'complete',
                            createLoot: (partyLevel, biome)=>{
                                let rewards = [];
                                let count = Math.ceil(Math.random()*3);
                                for(let i = 0; i < count; i++){
                                    rewards.push(getRandomArrayElementWeighted(biome.lootTable).item())
                                }
                                return rewards;
                            },
                            messageFunction: (currentCharacter)=>{
                                return `${currentCharacter.name} finds the key!`
                            },
                            xpReward: 5, 
                            weight: 1,
                        },
                    ],
                    negativeOutcomes: [
                        {
                            result: 'battle',
                            musicSrc: "./assets/audio/musicTracks/battle-of-the-dragons-8037.mp3",
                            createBattle: (partyLevel, biome, difficulty)=>{
                                return biome.generateBattle(partyLevel);
                            },
                            createNextStage: (partyLevel, biome)=>{
                                return this; 
                            },
                            messageFunction: (currentCharacter)=>{
                                return `Something approaches ${currentCharacter.name}'s position!`
                            }, 
                            weight: 2,
                        },
                        {
                            result: 'retry',
                            removableDecisions: ['C'],
                            messageFunction: (currentCharacter)=>{
                                return `The key is nowhere to be found.`
                            }, 
                            weight: 1,
                        },
                    ] 
                },
                {//Decision
                    option: 'E',
                    description: 'Switch character',
                    successfulOutcomes: [{result: 'switchCharacter', weight: 1}],
                },
                {//Decision
                    option: 'F',
                    description: 'Leave',
                    successfulOutcomes: [{result: 'overworld', weight: 1}],
                    messageFunction: (currentCharacter)=>{
                        return `${currentCharacter.name} leaves the chest.`
                    }, 
                },
            ],
        })
    }
    messageFunction(currentCharacter){
        return `${currentCharacter.name}'s party spots a locked chest ahead.`;
    }
}
*/