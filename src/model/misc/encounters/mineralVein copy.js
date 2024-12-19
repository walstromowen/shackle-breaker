import Stage from "./stage.js";
import Battle from "../battle.js";
import { MadBandit, MadMage, Madman } from "../entities.js";
import { getRandomArrayElementWeighted } from "../../../utility.js";
import {  } from "../items.js";

export class Aftermath extends Stage{
    constructor(config){
        super({
            name: 'Aftermath',
            imageSrc: './assets/media/encounters/aftermath.jpg',
            decisionArray: config.decisionArray || [
                {
                    option: 'A',
                    description: 'Loot the battlefield.',
                    attributes: ['none'],
                    successThreshold: 12,
                    roll: true,
                    successfulOutcomes: [
                        {
                            result: 'removeDecisions',
                            removableDecisions: ['A'],
                            messageFunction: (currentCharacter)=>{
                                return `${currentCharacter.name} finds something on one of the fallen warriors.`
                            },
                            createLoot: (partyLevel, biome)=>{
                                return  [getRandomArrayElementWeighted(biome.lootTable).item()];
                            },
                            weight: 1,
                    
                        },
                    ],
                    negativeOutcomes: [
                        {
                            result: 'removeDecisions',
                            removableDecisions: ['A'],
                            messageFunction: (currentCharacter)=>{
                                return `${currentCharacter.name} sees nothing of value.`
                            },
                            weight: 1,
                    
                        },
                        {
                            result: 'battle',
                            imageSrc: './assets/media/entities/cursed-villager-1.jpg',
                            musicSrc: "./assets/audio/musicTracks/battle-of-the-dragons-8037.mp3",
                            createBattle: (partyLevel, biome, difficulty)=>{
                                let hostileArray = [new Madman({level: partyLevel, difficulty: difficulty})];
                                let count = Math.ceil(Math.random()*4);
                                for(let i = 0; i < count; i++){
                                    let chance = Math.floor(Math.random()*4);
                                    if(chance < 2) hostileArray.push(new Madman({level: partyLevel, difficulty: difficulty}))
                                    if(chance == 2) hostileArray.push(new MadMage({level: partyLevel, difficulty: difficulty}))
                                    if(chance == 3) hostileArray.push(new MadBandit({level: partyLevel, difficulty: difficulty}))
                                }
                                return new Battle({hostiles: hostileArray, battleMusicSrc: biome.battleMusicSrc});
                            },
                            messageFunction: (currentCharacter)=>{
                                return `"As ${currentCharacter.name} searches the battlefield, a group of madmen appear on the horizon!"`
                            }, 
                            weight: 1,
                        },
                    ], 
                    messageFunction: (currentCharacter)=>{
                        return `${currentCharacter.name} searches the battlefield for loot.`
                    }, 
                },
                {
                    option: 'B',
                    description: 'Search for survivors.',
                    attributes: ['none'],
                    successThreshold: 12,
                    roll: true,
                    successfulOutcomes: [
                        {
                            result: 'nextStage',
                            messageFunction: (currentCharacter)=>{
                                return `${currentCharacter.name} sees someone ahead.`
                            },
                            weight: 1,
                    
                        },
                    ],
                    negativeOutcomes: [
                        {
                            result: 'removeDecisions',
                            removableDecisions: ['B'],
                            createNextStage: (partyLevel, biome)=>{
                                return new WoundedWarrior({});
                            },
                            messageFunction: (currentCharacter)=>{
                                return `There appears to be no survivors.`
                            },
                            weight: 1,
                        },
                        {
                            result: 'battle',
                            imageSrc: './assets/media/entities/cursed-villager-1.jpg',
                            musicSrc: "./assets/audio/musicTracks/battle-of-the-dragons-8037.mp3",
                            createBattle: (partyLevel, biome, difficulty)=>{
                                let hostileArray = [new Madman({level: partyLevel, difficulty: difficulty})];
                                let count = Math.ceil(Math.random()*4);
                                for(let i = 0; i < count; i++){
                                    let chance = Math.floor(Math.random()*4);
                                    if(chance < 2) hostileArray.push(new Madman({level: partyLevel, difficulty: difficulty}))
                                    if(chance == 2) hostileArray.push(new MadMage({level: partyLevel, difficulty: difficulty}))
                                    if(chance == 3) hostileArray.push(new MadBandit({level: partyLevel, difficulty: difficulty}))
                                }
                                return new Battle({hostiles: hostileArray, battleMusicSrc: biome.battleMusicSrc});
                            },
                            messageFunction: (currentCharacter)=>{
                                return `"As ${currentCharacter.name} searches the battlefield, a group of madmen appear on the horizon!"`
                            }, 
                            weight: 1,
                        },
                    ], 
                    messageFunction: (currentCharacter)=>{
                        return `${currentCharacter.name} searches the battlefield for loot.`
                    }, 
                },
                {//Decision
                    description: 'switch character',
                    successfulOutcomes: [{result: 'switchCharacter', weight: 1}],
                },
                {//Decision
                    description: 'leave',
                    successfulOutcomes: [{result: 'overworld', weight: 1}],
                    messageFunction: (currentCharacter)=>{
                        return `${currentCharacter.name} leaves battlefield.`
                    }, 
                },
            ],
        })
    }
    messageFunction(currentCharacter){
        return `${currentCharacter.name}'s party stumbles upon an old battlefield. The battle looks to have occured sometime ago.`;
    }
}

export class WoundedWarrior extends Stage{
    constructor(config){
        super({
            name: 'Wounded Warrior',
            imageSrc: './assets/media/encounters/wounded-warrior.jpg',
            decisionArray: config.decisionArray || [
                {
                    option: 'A',
                    description: 'Loot the battlefield.',
                    attributes: ['none'],
                    successThreshold: 12,
                    roll: true,
                    successfulOutcomes: [
                        {
                            result: 'removeDecisions',
                            removableDecisions: ['A'],
                            messageFunction: (currentCharacter)=>{
                                return `${currentCharacter.name} finds something on one of the fallen warriors.`
                            },
                            createLoot: (partyLevel, biome)=>{
                                return  [getRandomArrayElementWeighted(biome.lootTable).item()];
                            },
                            weight: 1,
                    
                        },
                    ],
                    negativeOutcomes: [
                        {
                            result: 'removeDecisions',
                            removableDecisions: ['A'],
                            messageFunction: (currentCharacter)=>{
                                return `${currentCharacter.name} sees nothing of value.`
                            },
                            weight: 1,
                    
                        },
                        {
                            result: 'battle',
                            imageSrc: './assets/media/entities/cursed-villager-1.jpg',
                            musicSrc: "./assets/audio/musicTracks/battle-of-the-dragons-8037.mp3",
                            createBattle: (partyLevel, biome, difficulty)=>{
                                let hostileArray = [new Madman({level: partyLevel, difficulty: difficulty})];
                                let count = Math.ceil(Math.random()*4);
                                for(let i = 0; i < count; i++){
                                    let chance = Math.floor(Math.random()*4);
                                    if(chance < 2) hostileArray.push(new Madman({level: partyLevel, difficulty: difficulty}))
                                    if(chance == 2) hostileArray.push(new MadMage({level: partyLevel, difficulty: difficulty}))
                                    if(chance == 3) hostileArray.push(new MadBandit({level: partyLevel, difficulty: difficulty}))
                                }
                                return new Battle({hostiles: hostileArray, battleMusicSrc: biome.battleMusicSrc});
                            },
                            messageFunction: (currentCharacter)=>{
                                return `"As ${currentCharacter.name} searches the battlefield, a group of madmen appear on the horizon!"`
                            }, 
                            weight: 1,
                        },
                    ], 
                    messageFunction: (currentCharacter)=>{
                        return `${currentCharacter.name} searches the battlefield for loot.`
                    }, 
                },
                {
                    option: 'B',
                    description: 'Search for survivors.',
                    attributes: ['none'],
                    successThreshold: 12,
                    roll: true,
                    successfulOutcomes: [
                        {
                            result: 'nextStage',
                            messageFunction: (currentCharacter)=>{
                                return `${currentCharacter.name} sees someone ahead.`
                            },
                            weight: 1,
                    
                        },
                    ],
                    negativeOutcomes: [
                        {
                            result: 'removeDecisions',
                            removableDecisions: ['B'],
                            createNextStage: (partyLevel, biome)=>{
                                return new WoundedWarrior({});
                            },
                            messageFunction: (currentCharacter)=>{
                                return `There appears to be no survivors.`
                            },
                            weight: 1,
                        },
                        {
                            result: 'battle',
                            imageSrc: './assets/media/entities/cursed-villager-1.jpg',
                            musicSrc: "./assets/audio/musicTracks/battle-of-the-dragons-8037.mp3",
                            createBattle: (partyLevel, biome, difficulty)=>{
                                let hostileArray = [new Madman({level: partyLevel, difficulty: difficulty})];
                                let count = Math.ceil(Math.random()*4);
                                for(let i = 0; i < count; i++){
                                    let chance = Math.floor(Math.random()*4);
                                    if(chance < 2) hostileArray.push(new Madman({level: partyLevel, difficulty: difficulty}))
                                    if(chance == 2) hostileArray.push(new MadMage({level: partyLevel, difficulty: difficulty}))
                                    if(chance == 3) hostileArray.push(new MadBandit({level: partyLevel, difficulty: difficulty}))
                                }
                                return new Battle({hostiles: hostileArray, battleMusicSrc: biome.battleMusicSrc});
                            },
                            messageFunction: (currentCharacter)=>{
                                return `"As ${currentCharacter.name} searches the battlefield, a group of madmen appear on the horizon!"`
                            }, 
                            weight: 1,
                        },
                    ], 
                    messageFunction: (currentCharacter)=>{
                        return `${currentCharacter.name} searches the battlefield for loot.`
                    }, 
                },
                {//Decision
                    description: 'switch character',
                    successfulOutcomes: [{result: 'switchCharacter', weight: 1}],
                },
                {//Decision
                    description: 'leave',
                    successfulOutcomes: [{result: 'overworld', weight: 1}],
                    messageFunction: (currentCharacter)=>{
                        return `${currentCharacter.name} leaves battlefield.`
                    }, 
                },
            ],
        })
    }
    messageFunction(currentCharacter){
        return `${currentCharacter.name}'s party stumbles upon an old battlefield. The battle looks to have occured sometime ago.`;
    }
}

