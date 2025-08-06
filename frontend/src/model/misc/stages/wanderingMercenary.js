import Stage from "../stage.js";
import Decision from "../decision.js";
import Result from "../result.js";

export class WanderingMercenary extends Stage {
    constructor(config){
        super({
            entity: config.entity,
            name: 'Wandering Mercenary',
            imageSrc: config.entity.apperance,
            messageKey: 'wanderingMercenaryStage',
            decisionArray: [
                new Decision({
                    description: 'Approach the mercenary',
                    messageKey: 'wanderingMercenaryApproach',
                    successfulOutcomes: [
                        new Result({
                            result: 'nextStage',
                            createNextStageKey: 'talkWithMercenary',
                            weight: 1,
                        }),
                    ],
                }),
                new Decision({
                    description: 'move along',
                    messageKey: 'moveAlong',
                    successfulOutcomes: [
                        new Result({
                            result: 'complete',
                            weight: 1,
                        }),
                    ],
                }),
            ],
        })
    }
}

export class TalkWithMercenary extends Stage {
    constructor(config){
        super({
            entity: config.entity,
            name: 'Wandering Mercenary',
            imageSrc: config.entity.apperance,
            messageKey: 'talkWithMercenaryStage',
            decisionArray: [
                new Decision({
                    option: 'A',
                    description: "Pay for the mercenary's service. [300g]",
                    goldCost: 300,
                    successfulOutcomes: [
                        new Result({
                            result: 'recruit',
                            createRecruitKey: 'currentEntity',
                            messageKey: 'talkMercenaryPaySuccess',
                            weight: 1,
                        }),
                    ],
                }),
                new Decision({
                    option: 'B',
                    description: "Persuade the mercenary to join for free [STR / INT]",
                    attributes: ['strength', 'intelligence'],
                    successThreshold: 18,
                    roll: true,
                    successfulOutcomes: [
                        new Result({
                            result: 'recruit',
                            createRecruitKey: 'currentEntity',
                            messageKey: 'talkMercenaryPersuadeSuccess',
                            weight: 1,
                        }),
                    ],
                    negativeOutcomes: [
                        new Result({
                            result: 'retry',
                            removableDecisions: ['B'],
                            messageKey: 'talkMercenaryPersuadeFail',
                            weight: 1,
                        }),
                        new Result({
                            result: 'complete',
                            messageKey: 'talkMercenaryPersuadeWalkAway',
                            weight: 1,
                        }),
                    ],
                }),
                new Decision({
                    option: 'C',
                    description: "Pickpocket the Mercenary. [DEX]",
                    attributes: ['dexterity'],
                    successThreshold: 16,
                    roll: true,
                    messageKey: 'talkMercenaryPickpocketAttempt',
                    successfulOutcomes: [
                        new Result({
                            result: 'retry',
                            removableDecisions: ['C'],
                            createLootKey: 'randomBiomeItem1',
                            onActivateKey: 'increaseCorruption5Percent',
                            weight: 1,
                        }),
                    ],
                    negativeOutcomes: [
                        new Result({
                            result: 'battle',
                            musicSrc: "./assets/audio/musicTracks/battle-of-the-dragons-8037.mp3",
                            createBattleKey: 'currentEntity',
                            onActivateKey: 'increaseCorruption5Percent',
                            messageKey: 'talkMercenaryPickpocketFail',
                            weight: 1,
                        }),
                    ],
                }),
                new Decision({
                    option: 'D',
                    description: 'Leave',
                    messageKey: 'leave',
                    successfulOutcomes: [
                        new Result({result: 'complete', weight: 1}),
                    ],
                }),
            ],
        })
    }
}


/*
import Stage from "../stage.js";
import Decision from "../decision.js";
import Result from "../result.js";
import Battle from "../battle.js";
import { } from "../entities.js";
import { getRandomArrayElementWeighted } from "../../../utility.js";


export class WanderingMercenary extends Stage{
    constructor(config){
        super({
            entity: config.entity,
            name: 'Wandering Mercenary',
            imageSrc: config.entity.apperance,
            decisionArray: [
                {//Decision
                    description: 'Approach the mercenary',
                    successfulOutcomes: [
                        {
                            result: 'nextStage',
                            createNextStage: (partyLevel, biome)=>{
                                return new TalkWithMercenary({entity: config.entity});
                            },
                            weight: 1,
                        },
                    ],
                    messageFunction: (currentCharacter)=>{
                        return `${currentCharacter.name} talks with the mercenary.`
                    }, 
                },
                {//Decision
                    description: 'move along',
                    successfulOutcomes: [
                        {
                            result: 'complete',
                            weight: 1
                        },
                    ],
                    messageFunction: (currentCharacter)=>{
                        return `${currentCharacter.name} moves along.`
                    }, 
                },
            ]
        })
    }
    messageFunction(currentCharacter){
        return `${currentCharacter.name} encounters a mercenary for hire ahead.`;
    }
}
export class TalkWithMercenary extends Stage{
    constructor(config){
        super({
            entity: config.entity,
            name: 'Wandering Mercenary',
            imageSrc: config.entity.apperance,
            decisionArray: [
                {//Decision
                    option: 'A',
                    description: "Pay for the mercenary's service. [300g]",
                    goldCost: 300,
                    successfulOutcomes: [
                        {
                            result: 'recruit',
                            createRecruit: (partyLevel, biome)=>{
                                return config.entity;
                            },
                            messageFunction: (currentCharacter)=>{
                                let chance = Math.floor(Math.random()*3)
                                if(chance == 0) return `"Pleasure doing business with you boss! Oh and don't worry about me. I can handle myself."`
                                if(chance == 1) return `"I'll put this to good use. Lead the way!"`
                                if(chance == 2) return `"Thanks, allies are hard to come by..."`
                            }, 
                            weight: 1,
                        },
                    ]
                },
                {//Decision
                    option: 'B',
                    description: "Persuade the mercenary to join for free [STR / INT]",
                    attributes: ['strength', 'intelligence'],
                    successThreshold: 18,
                    roll: true,
                    successfulOutcomes: [
                        {
                            result: 'recruit',
                            createRecruit: (partyLevel, biome)=>{
                                return config.entity;
                            },
                            messageFunction: (currentCharacter)=>{
                                let chance = Math.floor(Math.random()*3)
                                if(chance == 0) return `"You seem like the type I could follow. Lead the way boss!"`
                                if(chance == 1) return `"Not like I have much of a choice ... Let me gather my things"`
                                if(chance == 2) return `"I'll come for now, but the second you turn ... uh ... never mind."`
                               
                            }, 
                            weight: 1,
                        },
                    ],
                    negativeOutcomes: [
                        {
                            result: 'retry',
                            removableDecisions: ['B'],
                            messageFunction: (currentCharacter)=>{
                                return `The mercenary looks unimpressed.`
                            }, 
                            weight: 1,
                        },
                        {
                            result: 'complete',
                            messageFunction: (currentCharacter)=>{
                                return `The mercenary rolls their eyes and walks away.`
                            }, 
                            weight: 1,
                        },
                    ]
                },
                {
                    option: 'C',
                    description: "Pickpocket the Mercenary. [DEX]",
                    attributes: ['dexterity'],
                    successThreshold: 16,
                    roll: true,
                    successfulOutcomes: [
                        {
                            result: 'retry',
                            removableDecisions: ['C'],
                            createLoot: (partyLevel, biome)=>{
                                return  [getRandomArrayElementWeighted(biome.lootTable).item()];
                            },
                            onActivate(target){
                                target.currentCorruption += 0.02;
                            },
                            weight: 1,
                        }
                    ],
                    negativeOutcomes: [
                        {
                            result: 'battle',
                            musicSrc: "./assets/audio/musicTracks/battle-of-the-dragons-8037.mp3",
                            createBattle: (partyLevel, biome, difficulty)=>{
                                config.entity.isHostile = true;
                                return new Battle({hostiles: [config.entity], battleMusicSrc: biome.battleMusicSrc});
                            },
                            onActivate(target){
                                target.currentCorruption += 0.02;
                            },
                            messageFunction: (currentCharacter)=>{
                                let chance = Math.floor(Math.random()*3)
                                if(chance == 0) return `"Oh now you have done it!"`
                                if(chance == 1) return `"Just what... do you think... your doing?!"`
                                if(chance == 2) return `"A theif eh! I should have known!"`
                                
                            }, 
                            weight: 1,
                        },
                    ],
                    messageFunction: (currentCharacter)=>{
                        return `${currentCharacter.name} attempts to pickpocket the Mercenary.`
                    },
                },
                {//Decision
                    option: 'C',
                    description: 'Leave',
                    successfulOutcomes: [{result: 'complete', weight: 1},],
                    messageFunction: (currentCharacter)=>{
                        return `${currentCharacter.name} leaves.`
                    }, 
                },
            ]
        })
    }
    messageFunction(currentCharacter){
        let chance = Math.floor(Math.random()*3)
        if(chance == 0) return `"You look like the type that could use some muscle, but can you spare the coin?"`
        if(chance == 1) return `"Keep your hands were I can see em, that is unless you are reaching for coin?"`
        if(chance == 2) return `"Hail friend! Sane folk like us ought to stick together eh?"`
    }
}
    */