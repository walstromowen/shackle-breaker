import Stage from "./stage.js";
import Battle from "../battle.js";
import { GroveGuardian, WoodWhisperer} from "../entities.js";
import { MagicalAttackDebuff, PhysicalDefenseDebuff, Poison } from "../statusEffects.js";
import { getRandomArrayElementWeighted } from "../../../utility.js";
import { ForestStaff, PineWood } from "../items.js";

export class SilentGrove extends Stage{
    constructor(config){
        super({
            name: 'Silent Grove',
            musicSrc: "./assets/audio/musicTracks/dark-suspense-anxious-eerie-dramatic-music-207620.mp3",
            imageSrc: './assets/media/encounters/silent-grove.jpg',
            decisionArray: config.decisionArray || [
                {
                    description: 'Proceed along the path.',
                    attributes: ['none'],
                    successThreshold: 12,
                    roll: true,
                    successfulOutcomes: [
                        {
                            result: 'nextStage',
                            createNextStage: (partyLevel, biome)=>{
                                return new SilentGrove2({});
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
                                let hostileArray = [];
                                let count = Math.ceil(Math.random()*3);
                                for(let i = 0; i < count; i++){
                                    hostileArray.push(new WoodWhisperer({level: partyLevel, difficulty: difficulty}))
                                }
                                return new Battle({hostiles: hostileArray, battleMusicSrc: biome.battleMusicSrc});
                            },
                            createNextStage: (partyLevel, biome)=>{
                                return new SilentGrove2({});
                            },
                            messageFunction: (currentCharacter)=>{
                                return `${currentCharacter.name} hears something...`
                            }, 
                            weight: 1,
                    
                        },
                        {
                            result: 'nextStage',
                            onActivate(target){
                                for(let i = 0; i < target.statusArray.length; i++){
                                    if(target.statusArray[i].name == 'poison'){
                                        target.statusArray[i].severityMofifier += 0.2;
                                        return
                                    }
                                }
                                let status =  new Poison({holder: target})
                                status.onApplied(target, target, status);
                                
                            },
                            createNextStage: (partyLevel, biome)=>{
                                return new SilentGrove2({});
                            },
                            messageFunction: (currentCharacter)=>{
                                return `${currentCharacter.name} begins to feel sick.`
                            },
                            weight: 1,
                        },
                    ], 
                    messageFunction: (currentCharacter)=>{
                        return `${currentCharacter.name}'s party continues along the path.`
                    }, 
                },
                {
                    description: 'Cut through the brush. [ATN]',
                    attributes: ['attunement'],
                    successThreshold: 15,
                    roll: true,
                    successfulOutcomes: [
                        {
                            result: 'nextStage',
                            createNextStage: (partyLevel, biome)=>{
                                return new SilentGrove2({});
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
                                let hostileArray = [];
                                let count = Math.ceil(Math.random()*3);
                                for(let i = 0; i < count; i++){
                                    hostileArray.push(new WoodWhisperer({level: partyLevel, difficulty: difficulty}))
                                }
                                return new Battle({hostiles: hostileArray, battleMusicSrc: biome.battleMusicSrc});
                            },
                            createNextStage: (partyLevel, biome)=>{
                                return new SilentGrove2({});
                            },
                            messageFunction: (currentCharacter)=>{
                                return `${currentCharacter.name} hears something...`
                            }, 
                            weight: 1,
                    
                        },
                        {
                            result: 'nextStage',
                            onActivate(target){
                                for(let i = 0; i < target.statusArray.length; i++){
                                    if(target.statusArray[i].name == 'poison'){
                                        target.statusArray[i].severityMofifier += 0.2;
                                        return
                                    }
                                }
                                let status =  new Poison({holder: target})
                                status.onApplied(target, target, status);
                                
                            },
                            createNextStage: (partyLevel, biome)=>{
                                return new SilentGrove2({});
                            },
                            messageFunction: (currentCharacter)=>{
                                return `${currentCharacter.name} begins to feel sick.`
                            },
                            weight: 2,
                        },
                    ], 
                    messageFunction: (currentCharacter)=>{
                        return `${currentCharacter.name}'s party cuts through the brush.`
                    }, 
                },
                {//Decision
                    description: 'Switch character',
                    successfulOutcomes: [{result: 'switchCharacter', weight: 1}],
                },
                {//Decision
                    description: 'leave',
                    successfulOutcomes: [{result: 'overworld', weight: 1}],
                    messageFunction: (currentCharacter)=>{
                        return `${currentCharacter.name} turns back.`
                    }, 
                },
            ],
        })
    }
    messageFunction(currentCharacter){
        return `The air around ${currentCharacter.name}'s party suddenly grows cold and all noise ceases...`;
    }
}


export class SilentGrove2 extends Stage{
    constructor(config){
        super({
            name: 'Silent Grove',
            musicSrc: "./assets/audio/musicTracks/dark-suspense-anxious-eerie-dramatic-music-207620.mp3",
            imageSrc: './assets/media/encounters/silent-grove-2.jpg',
            decisionArray: config.decisionArray || [
                {
                    option: 'A',
                    description: 'Proceed to the left.',
                    attributes: ['strength'],
                    successThreshold: 12,
                    roll: true,
                    successfulOutcomes: [
                        {
                            result: 'nextStage',
                            createNextStage: (partyLevel, biome)=>{
                                return new SilentGrove3({});
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
                                let hostileArray = [];
                                let count = Math.ceil(Math.random()*3);
                                for(let i = 0; i < count; i++){
                                    hostileArray.push(new WoodWhisperer({level: partyLevel, difficulty: difficulty}))
                                }
                                return new Battle({hostiles: hostileArray, battleMusicSrc: biome.battleMusicSrc});
                            },
                            createNextStage: (partyLevel, biome)=>{
                                return new SilentGrove3({});
                            },
                            messageFunction: (currentCharacter)=>{
                                return `${currentCharacter.name} hears something...`
                            }, 
                            weight: 1,
                    
                        },
                        {
                            result: 'nextStage',
                            onActivate(target){
                                for(let i = 0; i < target.statusArray.length; i++){
                                    if(target.statusArray[i].name == 'physical defense debuff'){
                                        target.statusArray[i].onApplied(target, target, status);
                                        return
                                    }
                                }
                                let status =  new PhysicalDefenseDebuff({holder: target})
                                status.onApplied(target, target, status);
                                
                            },
                            createNextStage: (partyLevel, biome)=>{
                                return new SilentGrove3({});
                            },
                            messageFunction: (currentCharacter)=>{
                                return `${currentCharacter.name} begins to feel weak.`
                            },
                            weight: 2,
                        },
                    ], 
                    messageFunction: (currentCharacter)=>{
                        return `${currentCharacter.name}'s party continues along the path.`
                    }, 
                },
                {
                    option: 'B',
                    description: 'Proceed to the right.',
                    attributes: ['intelligence'],
                    successThreshold: 12,
                    roll: true,
                    successfulOutcomes: [
                        {
                            result: 'nextStage',
                            createNextStage: (partyLevel, biome)=>{
                                return new SilentGrove3({});
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
                                let hostileArray = [];
                                let count = Math.ceil(Math.random()*3);
                                for(let i = 0; i < count; i++){
                                    hostileArray.push(new WoodWhisperer({level: partyLevel, difficulty: difficulty}))
                                }
                                return new Battle({hostiles: hostileArray, battleMusicSrc: biome.battleMusicSrc});
                            },
                            createNextStage: (partyLevel, biome)=>{
                                return new SilentGrove3({});
                            },
                            messageFunction: (currentCharacter)=>{
                                return `${currentCharacter.name} hears something...`
                            }, 
                            weight: 1,
                    
                        },
                        {
                            result: 'nextStage',
                            onActivate(target){
                                for(let i = 0; i < target.statusArray.length; i++){
                                    if(target.statusArray[i].name == 'magical attack debuff'){
                                        target.statusArray[i].onApplied(target, target, status);
                                        return
                                    }
                                }
                                let status =  new MagicalAttackDebuff({holder: target})
                                status.onApplied(target, target, status);
                                
                            },
                            createNextStage: (partyLevel, biome)=>{
                                return new SilentGrove3({});
                            },
                            messageFunction: (currentCharacter)=>{
                                return `${currentCharacter.name} head starts to throb.`
                            },
                            weight: 2,
                        },
                    ], 
                    messageFunction: (currentCharacter)=>{
                        return `${currentCharacter.name}'s party continues along the path.`
                    }, 
                },
                {
                    option: 'C',
                    description: 'Look around. [ATN]',
                    attributes: ['attunement'],
                    successThreshold: 12,
                    roll: true,
                    successfulOutcomes: [
                        {
                            result: 'removeDecisions',
                            removableDecisions: ['C'],
                            messageFunction: (currentCharacter)=>{
                                return `While looking around, ${currentCharacter.name} finds something.`
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
                            removableDecisions: ['C'],
                            onActivate(target){
                                target.currentHP -= Math.floor(target.maxHP*0.2)
                                
                            },
                            messageFunction: (currentCharacter)=>{
                                return `While looking around, ${currentCharacter.name} trips and falls.`
                            }, 
                            weight: 1,
                        },
                    ], 
                    messageFunction: (currentCharacter)=>{
                        return `${currentCharacter.name} looks around.`
                    }, 
                },
                {//Decision
                    option: 'D',
                    description: 'Switch character',
                    successfulOutcomes: [{result: 'switchCharacter', weight: 1}],
                },
                {//Decision
                    option: 'E',
                    description: 'leave',
                    successfulOutcomes: [{result: 'overworld', weight: 1}],
                    messageFunction: (currentCharacter)=>{
                        return `${currentCharacter.name} turns back.`
                    }, 
                },
            ],
        })
    }
    messageFunction(currentCharacter){
        return `${currentCharacter.name}'s party encounters a fork in the path ahead. A dense fog covers both paths.`;
    }
}

export class SilentGrove3 extends Stage{
    constructor(config){
        super({
            name: 'Silent Grove',
            musicSrc: "./assets/audio/musicTracks/dark-suspense-anxious-eerie-dramatic-music-207620.mp3",
            imageSrc: './assets/media/encounters/silent-grove-3.jpg',
            decisionArray: config.decisionArray || [
                {
                    option: 'A',
                    description: 'Examine the tree. [ATN]',
                    attributes: ['attunement'],
                    successThreshold: 14,
                    roll: true,
                    successfulOutcomes: [
                        {
                            result: 'nextStage',
                            createNextStage: (partyLevel, biome)=>{
                                return new Interloper({});
                            },
                            messageFunction: (currentCharacter)=>{
                                return `Something approaches...`
                            },
                            xpReward: 5,
                            weight: 1,
                        },
                    ],
                    negativeOutcomes: [
                        {
                            result: 'removeDecisions',
                            removableDecisions: ['A'],
                            messageFunction: (currentCharacter)=>{
                                return `${currentCharacter.name} sees nothing interesting about the tree.`
                            }, 
                            weight: 1,
                        },
                    ], 
                    messageFunction: (currentCharacter)=>{
                        return `${currentCharacter.name} examines the tree.`
                    }, 
                },
                {
                    option: 'B',
                    description: 'Cut the tree down. [STR]',
                    attributes: ['strength'],
                    successThreshold: 10,
                    roll: true,
                    successfulOutcomes: [
                        {
                            result: 'complete',
                            createLoot: (partyLevel, biome)=>{
                                let loot = [];
                                for(let i = 0; i < 4; i++){
                                    let chance = Math.floor(Math.random()*5)
                                    if(chance == 0){
                                        loot.push(new ForestStaff({level: 1}));
                                        return loot;
                                    }else{
                                        loot.push(new PineWood({}));
                                    }
                                }
                                return loot;
                            },
                            messageFunction: (currentCharacter)=>{
                                return `The tree falls with a thud and ${currentCharacter.name} gathers its wood.`
                            },
                            xpReward: 5, 
                            weight: 1,
                        },
                    ],
                    negativeOutcomes: [
                        {
                            result: 'removeDecisions',
                            removableDecisions: ['B'],
                            messageFunction: (currentCharacter)=>{
                                return `The tree is too hard to cut.`
                            }, 
                            weight: 1,
                    
                        },
                    ], 
                    messageFunction: (currentCharacter)=>{
                        return `${currentCharacter.name} attempts to cut down the tree.`
                    }, 
                },
                {//Decision
                    option: 'C',
                    description: 'Switch character',
                    successfulOutcomes: [{result: 'switchCharacter', weight: 1}],
                },
                {//Decision
                    option: 'D',
                    description: 'leave',
                    successfulOutcomes: [{result: 'complete', weight: 1}],
                    messageFunction: (currentCharacter)=>{
                        return `${currentCharacter.name} turns back.`
                    }, 
                },
            ],
        })
    }
    messageFunction(currentCharacter){
        return `${currentCharacter.name}'s party walks into a large clearing. Fog surrounds what looks to be a lone tree.`;
    }
}

export class Interloper extends Stage{
    constructor(config){
        super({
            name: 'Interloper',
            imageSrc: './assets/media/entities/grove-guardian.jpg',
            musicSrc: "./assets/audio/musicTracks/2022-03-16_-_Escape_Route_-_www.FesliyanStudios.com.mp3",
            decisionArray: [
                {//Decision
                    description: 'Attack',
                    successfulOutcomes: [
                        {
                            result: 'battle',
                            createBattle: (partyLevel, biome, difficulty)=>{
                                let hostileArray = [new GroveGuardian({level: partyLevel, difficulty: difficulty})];
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
                                return `${currentCharacter.name} escapes the giant being!`
                            },   
                            weight: 1,
                        },
                    ],
                    negativeOutcomes: [
                      {
                            result: 'battle',
                            createBattle: (partyLevel, biome, difficulty)=>{
                                let hostileArray = [new GroveGuardian({level: partyLevel, difficulty: difficulty})];
                                return new Battle({hostiles: hostileArray, battleMusicSrc: "./assets/audio/musicTracks/2022-03-16_-_Escape_Route_-_www.FesliyanStudios.com.mp3", gold: (20*partyLevel), canRetreat: false});
                            },
                            messageFunction: (currentCharacter)=>{
                                return `As ${currentCharacter.name} attempts to escape, vines snare ${currentCharacter.name}!`
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
        return `A giant beast glares ${currentCharacter.name} straight in the eyes!`;
    }
}
