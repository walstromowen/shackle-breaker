import Stage from "../stage.js";
import Decision from "../decision.js";
import Result from "../result.js";

export class Aftermath extends Stage {
    constructor(config) {
        super({
            entity: config.entity,
            name: 'Aftermath',
            imageSrc: './assets/media/encounters/aftermath.jpg',
            messageKey: 'aftermathStage',
            decisionArray: config.decisionArray || [
                new Decision({
                    option: 'A',
                    description: 'Loot the battlefield. [ATN]',
                    attributes: ['atunement'],
                    successThreshold: 12,
                    roll: true,
                    messageKey: 'aftermathLoot',
                    successfulOutcomes: [
                        new Result({
                            result: 'retry',
                            removableDecisions: ['A'],
                            messageKey: 'aftermathLootSuccess',
                            createLootKey: 'randomBiomeItem1',
                            xpReward: 5,
                            weight: 1
                        }),
                    ],
                    negativeOutcomes: [
                        new Result({
                            result: 'retry',
                            removableDecisions: ['A'],
                            messageKey: 'aftermathLootFail',
                            weight: 1
                        }),
                        new Result({
                            result: 'battle',
                            imageSrc: './assets/media/entities/cursed-villager-1.jpg',
                            musicSrc: "./assets/audio/musicTracks/battle-of-the-dragons-8037.mp3",
                            createNextStageKey: 'self',
                            createBattleKey: 'madmanAmbush',
                            messageKey: 'aftermathMadmenAppear',
                            weight: 1
                        }),
                        new Result({
                            result: 'battle',
                            imageSrc: './assets/media/entities/alterian-warrior.jpg',
                            musicSrc: "./assets/audio/musicTracks/battle-of-the-dragons-8037.mp3",
                            createBattleKey: 'alterianWarriorBattle',
                            messageKey: 'aftermathAlterianRise',
                            weight: 2
                        }),
                    ]
                }),
                new Decision({
                    option: 'B',
                    description: 'Search for survivors. [INT]',
                    attributes: ['intelligence'],
                    successThreshold: 10,
                    roll: true,
                    messageKey: 'aftermathSearchSurvivors',
                    successfulOutcomes: [
                        new Result({
                            result: 'nextStage',
                            createNextStageKey: 'woundedWarrior',
                            messageKey: 'aftermathSearchSuccess',
                            xpReward: 5,
                            weight: 1
                        }),
                    ],
                    negativeOutcomes: [
                        new Result({
                            result: 'retry',
                            removableDecisions: ['B'],
                            messageKey: 'aftermathSearchFail',
                            weight: 1
                        }),
                        new Result({
                            result: 'battle',
                            imageSrc: './assets/media/entities/cursed-villager-1.jpg',
                            musicSrc: "./assets/audio/musicTracks/battle-of-the-dragons-8037.mp3",
                            createNextStageKey: 'self',
                            createBattleKey: 'madmanAmbush',
                            messageKey: 'aftermathMadmenAppear',
                            weight: 1
                        }),
                    ]
                }),
                new Decision({
                    description: 'Switch character',
                    successfulOutcomes: [new Result({ result: 'switchCharacter', weight: 1 })]
                }),
                new Decision({
                    description: 'Leave',
                    messageKey: 'aftermathLeave',
                    successfulOutcomes: [new Result({ result: 'complete', weight: 1 })]
                }),
            ],
        });
    }
}

export class WoundedWarrior extends Stage {
    constructor(config) {
        super({
            entity: config.entity,
            name: 'Wounded Warrior',
            imageSrc: './assets/media/encounters/wounded-warrior.jpg',
            messageKey: 'woundedWarriorStage',
            decisionArray: config.decisionArray || [
                new Decision({
                    option: 'A',
                    description: 'Bandage the warrior. [Bandage]',
                    requiredItems: ['bandage'],
                    attributes: ['none'],
                    successThreshold: 8,
                    roll: true,
                    messageKey: 'woundedWarriorBandageAttempt',
                    successfulOutcomes: [
                        new Result({
                            result: 'nextStage',
                            createNextStageKey: 'battleSurvivor',
                            onActivateKey: 'reduceCorruption5Percent',
                            xpReward: 5,
                            weight: 1,
                        }),
                    ],
                    negativeOutcomes: [
                        new Result({
                            result: 'battle',
                            imageSrc: './assets/media/entities/alterian-warrior.jpg',
                            musicSrc: "./assets/audio/musicTracks/battle-of-the-dragons-8037.mp3",
                            createBattleKey: 'alterianWarriorBattle',
                            messageKey: 'woundedWarriorBandageBattle',
                            weight: 2,
                        }),
                    ],
                }),
                new Decision({
                    option: 'B',
                    description: 'Rob the warrior. [STR]',
                    attributes: ['strength'],
                    successThreshold: 5,
                    roll: true,
                    messageKey: 'woundedWarriorRobAttempt',
                    successfulOutcomes: [
                        new Result({
                            result: 'retry',
                            removableDecisions: ['A', 'B'],
                            messageKey: 'woundedWarriorRobSuccess',
                            createLootKey: 'randomBiomeItem1',
                            onActivateKey: 'increaseCorruption5Percent',
                            weight: 1,
                        }),
                    ],
                    negativeOutcomes: [
                        new Result({
                            result: 'battle',
                            imageSrc: './assets/media/entities/alterian-warrior.jpg',
                            musicSrc: "./assets/audio/musicTracks/battle-of-the-dragons-8037.mp3",
                            createBattleKey: 'alterianWarriorBattle',
                            onActivateKey: 'increaseCorruption5Percent',
                            messageKey: 'woundedWarriorRobBattle',
                            weight: 1,
                        }),
                    ],
                }),
                new Decision({
                    description: 'Switch character',
                    successfulOutcomes: [new Result({ result: 'switchCharacter', weight: 1 })],
                }),
                new Decision({
                    description: 'Move on.',
                    successfulOutcomes: [new Result({ result: 'complete', weight: 1 })],
                    messageKey: 'woundedWarriorLeave',
                }),
            ],
        });
    }
}

export class BattleSurvivor extends Stage {
    constructor(config) {
        super({
            entity: config.entity,
            name: 'Battle Survivor',
            imageSrc: config.entity.apperance,
            messageKey: 'battleSurvivorStage',
            decisionArray: [
                new Decision({
                    option: 'A',
                    description: '"What happened?"',
                    successfulOutcomes: [
                        new Result({
                            result: 'retry',
                            removableDecisions: ['A'],
                            messageKey: 'battleSurvivorMadmen',
                            newDecisions: [
                                new Decision({
                                    option: 'a',
                                    description: '"Why were they chasing you?"',
                                    successfulOutcomes: [
                                        new Result({
                                            result: 'retry',
                                            removableDecisions: ['a'],
                                            messageKey: 'battleSurvivorChased',
                                            weight: 1,
                                        }),
                                    ],
                                }),
                            ],
                            weight: 1,
                        }),
                    ],
                }),
                new Decision({
                    option: 'B',
                    description: '"Who are you?"',
                    successfulOutcomes: [
                        new Result({
                            result: 'retry',
                            removableDecisions: ['B'],
                            messageKey: 'battleSurvivorIdentity',
                            weight: 1,
                        }),
                    ],
                }),
                new Decision({
                    option: 'C',
                    description: '"You should come with me, we are safer together." [Alterian]',
                    attributes: ['alterian'],
                    successThreshold: 10,
                    roll: true,
                    successfulOutcomes: [
                        new Result({
                            result: 'recruit',
                            createRecruitKey: 'currentEntity',
                            messageKey: 'battleSurvivorJoinSuccess',
                            xpReward: 5,
                            weight: 1,
                        }),
                    ],
                    negativeOutcomes: [
                        new Result({
                            result: 'retry',
                            removableDecisions: ['C'],
                            messageKey: 'battleSurvivorJoinFail1',
                            weight: 2,
                        }),
                        new Result({
                            result: 'retry',
                            removableDecisions: ['C'],
                            newDecisions: [
                                new Decision({
                                    description: '"Perhaps some incentive?" [50g]',
                                    goldCost: 50,
                                    successfulOutcomes: [
                                        new Result({
                                            result: 'recruit',
                                            createRecruitKey: 'recruitBattleSurvivor',
                                            messageKey: 'battleSurvivorJoinIncentive',
                                            weight: 1,
                                        }),
                                    ],
                                }),
                            ],
                            messageKey: 'battleSurvivorJoinFail2',
                            xpReward: 10,
                            weight: 1,
                        }),
                    ],
                }),
                new Decision({
                    option: 'C',
                    description: 'Leave',
                    successfulOutcomes: [
                        new Result({
                            result: 'complete',
                            weight: 1,
                        }),
                    ],
                    messageKey: 'battleSurvivorLeave',
                }),
            ],
        });
    }
}






/* OLD
import Stage from "../stage.js";
import Decision from "../decision.js";
import Result from "../result.js";
import Battle from "../battle.js";
import { AlterianWarrior, MadBandit, MadMage, Madman } from "../entities.js";
import { getRandomArrayElementWeighted } from "../../../utility.js";
import {  } from "../items.js";

export class Aftermath extends Stage{
    constructor(config){
        super({
            entity: config.entity,
            name: 'Aftermath',
            imageSrc: './assets/media/encounters/aftermath.jpg',
            decisionArray: config.decisionArray || [
                {
                    option: 'A',
                    description: 'Loot the battlefield. [ATN]',
                    attributes: ['atunement'],
                    successThreshold: 12,
                    roll: true,
                    successfulOutcomes: [
                        {
                            result: 'retry',
                            removableDecisions: ['A'],
                            messageFunction: (currentCharacter)=>{
                                return `${currentCharacter.name} finds something on one of the fallen warriors.`
                            },
                            createLoot: (partyLevel, biome)=>{
                                return  [getRandomArrayElementWeighted(biome.lootTable).item()];
                            },
                            xpReward: 5,
                            weight: 1,
                    
                        },
                    ],
                    negativeOutcomes: [
                        {
                            result: 'retry',
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
                            createNextStage: (partyLevel, biome)=>{
                                return new Aftermath({entity: config.entity,});
                            },
                            createBattle: (partyLevel, biome, difficulty)=>{
                                let hostileArray = [new Madman({level: partyLevel, difficulty: difficulty})];
                                let count = Math.ceil(Math.random()*4);
                                for(let i = 0; i < count; i++){
                                    let chance = Math.floor(Math.random()*4);
                                    if(chance < 2) hostileArray.push(new Madman({level: partyLevel, difficulty: difficulty}))
                                    if(chance == 2) hostileArray.push(new MadMage({level: partyLevel, difficulty: difficulty}))
                                    if(chance == 3) hostileArray.push(new MadBandit({level: partyLevel, difficulty: difficulty}))
                                }
                                return new Battle({hostiles: hostileArray, battleMusicSrc: biome.battleMusicSrc, canRetreat: true});
                            },
                            messageFunction: (currentCharacter)=>{
                                return `As ${currentCharacter.name} searches the battlefield, a group of madmen appear on the horizon!`
                            }, 
                            weight: 1,
                        },
                        {
                            result: 'battle',
                            imageSrc: './assets/media/entities/alterian-warrior.jpg',
                            musicSrc: "./assets/audio/musicTracks/battle-of-the-dragons-8037.mp3",
                            createBattle: (partyLevel, biome, difficulty)=>{
                                let hostileArray = [];
                                let count = Math.ceil(Math.random()*4);
                                for(let i = 0; i < count; i++){
                                    hostileArray.push(new AlterianWarrior({level: partyLevel, difficulty: difficulty}))
                                }
                                return new Battle({hostiles: hostileArray, battleMusicSrc: biome.battleMusicSrc, canRetreat: true});
                            },
                            messageFunction: (currentCharacter)=>{
                                return `While examining the bodies for loot, one of them stirs and glares at ${currentCharacter.name}! As if on command others do the same!`
                            }, 
                            weight: 2,
                        },
                    ], 
                    messageFunction: (currentCharacter)=>{
                        return `${currentCharacter.name} searches the battlefield for loot.`
                    }, 
                },
                {
                    option: 'B',
                    description: 'Search for survivors. [INT]',
                    attributes: ['intelligence'],
                    successThreshold: 14,
                    roll: true,
                    successfulOutcomes: [
                        {
                            result: 'nextStage',
                            createNextStage: (partyLevel, biome)=>{
                                return new WoundedWarrior({entity: config.entity,});
                            },
                            messageFunction: (currentCharacter)=>{
                                return `${currentCharacter.name} sees something ahead.`
                            },
                            xpReward: 5,
                            weight: 1,
                    
                        },
                    ],
                    negativeOutcomes: [
                        {
                            result: 'retry',
                            removableDecisions: ['B'],
                            messageFunction: (currentCharacter)=>{
                                return `${currentCharacter.name} doesn't see any survivors.`
                            },
                            weight: 1,
                        },
                        {
                            result: 'battle',
                            imageSrc: './assets/media/entities/cursed-villager-1.jpg',
                            musicSrc: "./assets/audio/musicTracks/battle-of-the-dragons-8037.mp3",
                            createNextStage: (partyLevel, biome)=>{
                                return new Aftermath({entity: config.entity,});
                            },
                            createBattle: (partyLevel, biome, difficulty)=>{
                                let hostileArray = [];
                                let count = Math.ceil(Math.random()*4);
                                for(let i = 0; i < count; i++){
                                    let chance = Math.floor(Math.random()*4);
                                    if(chance < 2) hostileArray.push(new Madman({level: partyLevel, difficulty: difficulty}))
                                    if(chance == 2) hostileArray.push(new MadMage({level: partyLevel, difficulty: difficulty}))
                                    if(chance == 3) hostileArray.push(new MadBandit({level: partyLevel, difficulty: difficulty}))
                                }
                                return new Battle({hostiles: hostileArray, battleMusicSrc: biome.battleMusicSrc, canRetreat: true});
                            },
                            messageFunction: (currentCharacter)=>{
                                return `As ${currentCharacter.name} searches the battlefield, a group of madmen appear on the horizon!`
                            }, 
                            weight: 1,
                        },
                    ], 
                    messageFunction: (currentCharacter)=>{
                        return `${currentCharacter.name} searches for survivors.`
                    }, 
                },
                {//Decision
                    description: 'Switch character',
                    successfulOutcomes: [{result: 'switchCharacter', weight: 1}],
                },
                {//Decision
                    description: 'Leave',
                    successfulOutcomes: [{result: 'overworld', weight: 1}],
                    messageFunction: (currentCharacter)=>{
                        return `${currentCharacter.name} leaves the battlefield.`
                    }, 
                },
            ],
        })
    }
    messageFunction(currentCharacter){
        return `${currentCharacter.name}'s party stumbles upon an old battlefield. The battle looks to have occured some time ago.`;
    }
}

export class WoundedWarrior extends Stage{
    constructor(config){
        super({
            entity: config.entity,
            name: 'Wounded Warrior',
            imageSrc: './assets/media/encounters/wounded-warrior.jpg',
            decisionArray: config.decisionArray || [
                {
                    option: 'A',
                    description: 'Bandage the warrior. [Bandage]',
                    requiredItems: ['bandage'],
                    attributes: ['none'],
                    successThreshold: 8,
                    roll: true,
                    successfulOutcomes: [
                        {
                            result: 'nextStage',
                            createNextStage: (partyLevel, biome)=>{
                                return new Survivor({entity: config.entity});
                            },
                            onActivate(target){
                                target.currentCorruption -= 0.05;
                            },
                            xpReward: 5,
                            weight: 1,
                        },
                    ],
                    negativeOutcomes: [
                        {
                            result: 'battle',
                            imageSrc: './assets/media/entities/alterian-warrior.jpg',
                            musicSrc: "./assets/audio/musicTracks/battle-of-the-dragons-8037.mp3",
                            createBattle: (partyLevel, biome, difficulty)=>{
                                let hostileArray = [];
                                let count = Math.ceil(Math.random()*4);
                                for(let i = 0; i < count; i++){
                                    hostileArray.push(new AlterianWarrior({level: partyLevel, difficulty: difficulty}))
                                }
                                return new Battle({hostiles: hostileArray, battleMusicSrc: biome.battleMusicSrc, canRetreat: true});
                            },
                            messageFunction: (currentCharacter)=>{
                                return `As ${currentCharacter.name} bandages the warrior, the warrior grabs ${currentCharacter.name} and draws his weapon! Soon other fallen warriors do the same!`
                            }, 
                            weight: 2,
                        },
                    ], 
                    messageFunction: (currentCharacter)=>{
                        return `${currentCharacter.name} attempts to bandage the warrior.`
                    }, 
                },
                {
                    option: 'B',
                    description: 'Rob the warrior. [STR]',
                    attributes: ['Strength'],
                    successThreshold: 5,
                    roll: true,
                    successfulOutcomes: [
                        {
                            result: 'retry',
                            removableDecisions: ['A', 'B'],
                            messageFunction: (currentCharacter)=>{
                                return `${currentCharacter.name} finds something on the wounded warrior. Meanwhile the warrior breathes his last breath.`
                            },
                            createLoot: (partyLevel, biome)=>{
                                return  [getRandomArrayElementWeighted(biome.lootTable).item()];
                            },
                            onActivate(target){
                                target.currentCorruption += 0.05;
                            },
                            weight: 1,
                    
                        },
                    ],
                    negativeOutcomes: [
                        {
                            result: 'battle',
                            imageSrc: './assets/media/entities/alterian-warrior.jpg',
                            musicSrc: "./assets/audio/musicTracks/battle-of-the-dragons-8037.mp3",
                            createBattle: (partyLevel, biome, difficulty)=>{
                                let hostileArray = [new Madman({level: partyLevel, difficulty: difficulty})];
                                let count = Math.ceil(Math.random()*4);
                                for(let i = 0; i < count; i++){
                                    hostileArray.push(new AlterianWarrior({level: partyLevel, difficulty: difficulty}))
                                }
                                return new Battle({hostiles: hostileArray, battleMusicSrc: biome.battleMusicSrc, canRetreat: true});
                            },
                            onActivate(target){
                                target.currentCorruption += 0.05;
                            },
                            messageFunction: (currentCharacter)=>{
                                return `As ${currentCharacter.name} approaches the warrior, the warrior grabs ${currentCharacter.name} and draws his weapon! Soon other fallen warriors do the same.`
                            }, 
                            weight: 1,
                        },
                    ], 
                    messageFunction: (currentCharacter)=>{
                        return `${currentCharacter.name} attempts to rob the wounded warrior.`
                    }, 
                },
                {//Decision
                    description: 'Switch character',
                    successfulOutcomes: [{result: 'switchCharacter', weight: 1}],
                },
                {//Decision
                    description: 'complete',
                    successfulOutcomes: [{result: 'overworld', weight: 1}],
                    messageFunction: (currentCharacter)=>{
                        return `${currentCharacter.name} leaves the warrior to his fate.`
                    }, 
                },
            ],
        })
    }
    messageFunction(currentCharacter){
        return `${currentCharacter.name} approaches a wounded warrior still breathing, but bleeding badly.`;
    }
}


export class BattleSurvivor extends Stage{
    constructor(config){
        super({
            entity: config.entity,
            name: 'Battle Survivor',
            imageSrc: config.entity.apperance,
            decisionArray: [
                {//Decision
                    option: 'A',
                    description: '"What happened?"',
                    successfulOutcomes: [
                        {
                            result: 'retry',
                            removableDecisions: ['A'],
                            newDecisions: [
                               {//Decision
                                    option: 'a',
                                    description: '"Why were they chasing you?"',
                                    successfulOutcomes: [
                                        {
                                            result: 'retry',
                                            removableDecisions: ['a'],
                                            messageFunction: (currentCharacter)=>{
                                                return `"How should I know? Those madmen will chase anything that moves. Speaking of which, you should get a move on if you know what is good for you."`
                                            },
                                            weight: 1,
                                        },
                                    ]
                                },        
                            ],
                            messageFunction: (currentCharacter)=>{
                                return `"Are you surprised? If you must know, A group of madmen chased me stright into this mess and I knew it, I was out cold! It's a miracle you showed up, but don't expect any more thanks than that.`
                            },
                            weight: 1,
                        },
                    ]
                },
                {//Decision
                    option: 'B',
                    description: '"Who are you?"',
                    successfulOutcomes: [
                        {
                            result: 'retry',
                            removableDecisions: ['B'],
                            messageFunction: (currentCharacter)=>{
                                let chance = Math.floor(Math.random()*3)
                                if(chance == 0) return `"${config.entity.name}, what is it to you?"`
                                if(chance == 1) return `"Wouldn't you like to know?"`
                                if(chance == 2) return `"Let's just say I used to be in the Alterian Royal Guard. Catch my meaning?"`
                            }, 
                            weight: 1,
                        },
                    ],
                },
                {//Decision
                    option: 'C',
                    description: '"You should come with me, we are safer together." [Alterian]',
                    attributes: ['alterian'],
                    successThreshold: 10,
                    roll: true,
                    successfulOutcomes: [
                        {
                            result: 'recruit',
                            createRecruit: (partyLevel, biome)=>{
                                return config.entity;
                            },
                            messageFunction: (currentCharacter)=>{
                                let chance = Math.floor(Math.random()*3)
                                if(chance == 0) return `"Fine! But know this. The moment you turn on me, you will regret it! Oh and uh ... thanks..."`
                                if(chance == 1) return `"(Sigh) What choice do I have? Better to die with company anyway,"`
                                if(chance == 2) return `"Fine, but I will be watching you. And don't think becase I am wounded that I've lost my edge."`
                            },
                            xpReward: 5, 
                            weight: 1,
                        },
                    ],
                    negativeOutcomes: [
                        {
                            result: 'retry',
                            removableDecisions: ['C'],
                            messageFunction: (currentCharacter)=>{
                                let chance = Math.floor(Math.random()*3)
                                if(chance == 0) return `"Safe! Hah! You won't last long out here. Best be on your way."`
                                if(chance == 1) return `"I can't remember the last time I felt safe. Much less so traveling with others."`
                                if(chance == 2) return `"You seem like a good person. A word of advice, that is a bad thing around here."`
                            }, 
                            weight: 2,
                        },
                        {
                            result: 'retry',
                            removableDecisions: ['C'],
                            newDecisions: [
                                {//Decision
                                     description: '"Perhaps some incentive?" [50g]',
                                     goldCost: 50,
                                     successfulOutcomes: [
                                         {
                                            result: 'recruit',
                                            createRecruit: (partyLevel, biome)=>{
                                                return config.entity;
                                            },
                                             messageFunction: (currentCharacter)=>{
                                                 return `"Well ... what are you waiting for? let's get out of here!"`
                                             },
                                             weight: 1,
                                         },
                                     ]
                                 },        
                            ],
                            messageFunction: (currentCharacter)=>{
                                return `"Hmm I am not convinced..."`
                            },
                            xpReward: 10, 
                            weight: 1,
                        },
                    ]
                },
                {//Decision
                    option: 'C',
                    description: 'Leave',
                    successfulOutcomes: [{result: 'complete', weight: 1},],
                    messageFunction: (currentCharacter)=>{
                        return `${currentCharacter.name} and the warrior part ways.`
                    }, 
                },
            ]
        })
    }
    messageFunction(currentCharacter){
        return `The warrior stands up from the ground and looks at ${currentCharacter.name} "What do you want?"`;
    }
}
*/
