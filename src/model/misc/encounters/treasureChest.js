import { getRandomArrayElementWeighted } from "../../../utility.js";
import Stage from "./stage.js";

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
                    successThreshold: 15,
                    roll: true,
                    messageFunction: (currentCharacter)=>{
                        return `${currentCharacter.name} attempts to pry the chest open.`
                    },
                    successfulOutcomes: [
                        {
                            result: 'loot',
                            createLoot: (partyLevel, biome)=>{
                                return  [getRandomArrayElementWeighted(biome.lootTable).item()];
                            },
                            messageFunction: (currentCharacter)=>{
                                return `${currentCharacter.name} sucessfully prys the chest open!`
                            }, 
                            weight: 1,
                        },
                    ],
                    negativeOutcomes: [
                        {
                            result: 'battle',
                            musicSrc: "./assets/audio/musicTracks/battle-of-the-dragons-8037.mp3",
                            createBattle: (partyLevel, biome)=>{
                                return biome.generateBattle(partyLevel);
                            },
                            messageFunction: (currentCharacter)=>{
                                return `Something approaches ${currentCharacter.name} position!`
                            }, 
                            weight: 2,
                        },
                        {
                            result: 'retry',
                            messageFunction: (currentCharacter)=>{
                                return `${currentCharacter.name}'s weapon bounces off of the treasure chest.`
                            },
                            weight: 1,
                        },
                        {
                            result: 'removeDecisions',
                            removableDecisions: ['B'],
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
                    successThreshold: 15,
                    roll: true,
                    messageFunction: (currentCharacter)=>{
                        return `${currentCharacter.name} attempts to pick the lock.`
                    },
                    successfulOutcomes: [
                        {
                            result: 'loot',
                            createLoot: (partyLevel, biome)=>{
                                return  [[getRandomArrayElementWeighted(biome.lootTable).item()]];
                            },
                            messageFunction: (currentCharacter)=>{
                                return `${currentCharacter.name} sucessfully picks the lock!`
                            }, 
                            weight: 1,
                        },
                    ],
                    negativeOutcomes: [
                        {
                            result: 'battle',
                            musicSrc: "./assets/audio/musicTracks/battle-of-the-dragons-8037.mp3",
                            createBattle: (partyLevel, biome)=>{
                                return biome.generateBattle(partyLevel);
                            },
                            messageFunction: (currentCharacter)=>{
                                return `Something approaches ${currentCharacter.name} position!`
                            }, 
                            weight: 2,
                        },
                        {
                            result: 'retry',
                            messageFunction: (currentCharacter)=>{
                                return `${currentCharacter.name}'s breaks a lockpick.`
                            },
                            weight: 1,
                        },
                        {
                            result: 'removeDecisions',
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
                    successThreshold: 15,
                    roll: true,
                    messageFunction: (currentCharacter)=>{
                        return `${currentCharacter.name} searches for the key.`
                    },
                    successfulOutcomes: [
                        {
                            result: 'loot',
                            createLoot: (partyLevel, biome)=>{
                                return  [getRandomArrayElementWeighted(biome.lootTable).item()];
                            },
                            messageFunction: (currentCharacter)=>{
                                return `${currentCharacter.name} finds the key!`
                            }, 
                            weight: 1,
                        },
                    ],
                    negativeOutcomes: [
                        {
                            result: 'battle',
                            musicSrc: "./assets/audio/musicTracks/battle-of-the-dragons-8037.mp3",
                            createBattle: (partyLevel, biome)=>{
                                return biome.generateBattle(partyLevel);
                            },
                            messageFunction: (currentCharacter)=>{
                                return `Something approaches ${currentCharacter.name} position!`
                            }, 
                            weight: 2,
                        },
                        {
                            result: 'retry',
                            messageFunction: (currentCharacter)=>{
                                return `${currentCharacter.name}'s searches for the key in vain.`
                            },
                            weight: 1,
                        },
                        {
                            result: 'removeDecisions',
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
                    description: 'switch character',
                    successfulOutcomes: [{result: 'switchCharacter', weight: 1}],
                },
                {//Decision
                    option: 'F',
                    description: 'leave',
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