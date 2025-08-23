import Stage from "../stage.js";
import Decision from "../decision.js";
import Result from "../result.js";

export class MadmanAhead extends Stage {
    constructor(config){
        super({
            name: 'Madman Ahead',
            messageKey: 'madmanAheadStage',
            imageSrc: './assets/media/encounters/mad-villager-ahead.jpg',
            decisionArray: config.decisionArray || [
                new Decision({
                    option: 'A',
                    description: 'Charge the Madman.',
                    successfulOutcomes: [
                        new Result({
                            result: 'battle',
                            imageSrc: './assets/media/entities/cursed-villager-1.jpg',
                            musicSrc: "./assets/audio/musicTracks/battle-of-the-dragons-8037.mp3",
                            createBattleKey: 'loneMadman',
                            messageKey: 'chargeMadmanResult',
                            weight: 1,
                        }),
                    ],
                }),
                new Decision({
                    option: 'B',
                    messageKey: 'eliminateMadmanDecision',
                    description: 'Eliminate the Madman quietly. [Dex]',
                    attributes: ['dexterity'],
                    successThreshold: 12,
                    roll: true,
                    
                    successfulOutcomes: [
                        new Result({
                            result: 'complete',
                            imageSrc: './assets/media/entities/cursed-villager-1.jpg',
                            createLootKey: 'randomBiomeItem1',
                            messageKey: 'sneakKillMadmanSuccess',
                            xpReward: 5,
                            weight: 1,
                        }),
                    ],
                    negativeOutcomes: [
                        new Result({
                            result: 'battle',
                            imageSrc: './assets/media/entities/cursed-villager-1.jpg',
                            musicSrc: "./assets/audio/musicTracks/battle-of-the-dragons-8037.mp3",
                            createBattleKey: 'madmanAmbush',
                            messageKey: 'sneakStartleMadman',
                            weight: 1,
                        }),
                        new Result({
                            result: 'battle',
                            imageSrc: './assets/media/entities/cursed-villager-1.jpg',
                            musicSrc: "./assets/audio/musicTracks/battle-of-the-dragons-8037.mp3",
                            createBattleKey: 'madmanBleedingReinforcements',
                            messageKey: 'sneakStabMadmanHowl',
                            weight: 1,
                        }),
                    ]
                }),
                new Decision({
                    option: 'C',
                    messageKey: 'throwRockMadmanDecision',
                    description: 'Throw a rock at him. [STR]',
                    attributes: ['strength'],
                    successThreshold: 12,
                    roll: true,
                    successfulOutcomes: [
                        new Result({
                            result: 'complete',
                            imageSrc: './assets/media/entities/cursed-villager-1.jpg',
                            createLootKey: 'randomBiomeItem1',
                            messageKey: 'throwRockKillMadman',
                            xpReward: 5,
                            weight: 1,
                        }),
                        new Result({
                            result: 'battle',
                            musicSrc: "./assets/audio/musicTracks/battle-of-the-dragons-8037.mp3",
                            imageSrc: './assets/media/entities/cursed-villager-1.jpg',
                            createBattleKey: 'madmanRockInjured',
                            messageKey: 'throwRockInjureMadman',
                            weight: 3,
                        }),
                    ],
                    negativeOutcomes: [
                        new Result({
                            result: 'battle',
                            musicSrc: "./assets/audio/musicTracks/battle-of-the-dragons-8037.mp3",
                            imageSrc: './assets/media/entities/cursed-villager-1.jpg',
                            createBattleKey: 'loneMadman',
                            messageKey: 'throwRockStartleMadman',
                            weight: 2,
                        }),
                        new Result({
                            result: 'retry',
                            messageKey: 'throwRockMissMadman',
                            weight: 2,
                        }),
                        new Result({
                            result: 'battle',
                            imageSrc: './assets/media/entities/wolf.jpg',
                            musicSrc: "./assets/audio/musicTracks/battle-of-the-dragons-8037.mp3",
                            createBattleKey: 'wolfPack',
                            messageKey: 'throwRockWolves',
                            weight: 1,
                        }),
                    ]
                }),
                new Decision({
                    option: 'D',
                    messageKey: 'communicateMadmanDecision',
                    description: 'Attempt to communicate with the Madman. [Alterian]',
                    attributes: ['alterian'],
                    successThreshold: 12,
                    roll: true,
                    successfulOutcomes: [
                        new Result({
                            result: 'complete',
                            imageSrc: './assets/media/entities/cursed-villager-1.jpg',
                            createLootKey: 'randomBiomeItem1',
                            messageKey: 'communicateMadmanSuccessGift',
                            xpReward: 5,
                            weight: 1,
                        }),
                        new Result({
                            result: 'nextStage',
                            createNextStageKey: 'conversationWithMadman',
                            messageKey: 'communicateMadmanConversation',
                            xpReward: 5,
                            weight: 2,
                        }),
                    ],
                    negativeOutcomes: [
                        new Result({
                            result: 'battle',
                            imageSrc: './assets/media/entities/cursed-villager-1.jpg',
                            musicSrc: "./assets/audio/musicTracks/battle-of-the-dragons-8037.mp3",
                            createBattleKey: 'madmanAmbush',
                            messageKey: 'communicateMadmanFail',
                            weight: 1,
                        }),
                    ]
                }),
                new Decision({
                    option: 'E',
                    description: 'Switch character',
                    successfulOutcomes: [new Result({result: 'switchCharacter', weight: 1})],
                }),
                new Decision({
                    option: 'F',
                    description: 'Leave',
                    successfulOutcomes: [new Result({result: 'complete', weight: 1})],
                    messageKey: 'leaveMadman',
                }),
            ],
        });
    }
}

export class ConversationWithMadman extends Stage {
    constructor(config) {
        super({
            name: 'Madman',
            messageKey: 'conversationWithMadmanStage',
            imageSrc: './assets/media/entities/cursed-villager-1.jpg',
            decisionArray: [
                new Decision({
                    option: 'A',
                    description: '"Magic says run away freak!"',
                    attributes: ['none'],
                    successThreshold: 5,
                    roll: true,
                    successfulOutcomes: [
                        new Result({
                            result: 'complete',
                            createLootKey: 'randomBiomeItem1',
                            messageKey: 'madmanRunAwaySuccess',
                            xpReward: 5,
                            weight: 1,
                        }),
                    ],
                    negativeOutcomes: [
                        new Result({
                            result: 'battle',
                            musicSrc: "./assets/audio/musicTracks/battle-of-the-dragons-8037.mp3",
                            createBattleKey: 'loneMadman', 
                            messageKey: 'madmanRunAwayFail',
                            weight: 1,
                        }),
                    ],
                }),
                new Decision({
                    option: 'B',
                    description: '"Magic tells you to give me things! [ATN]"',
                    attributes: ['attunement'],
                    successThreshold: 10,
                    roll: true,
                    successfulOutcomes: [
                        new Result({
                            result: 'complete',
                            createLootKey: 'randomBiomeItem1',
                            messageKey: 'madmanGiveThingsSuccess',
                            xpReward: 5,
                            weight: 1,
                        }),
                    ],
                    negativeOutcomes: [
                        new Result({
                            result: 'battle',
                            musicSrc: "./assets/audio/musicTracks/battle-of-the-dragons-8037.mp3",
                            createBattleKey: 'loneMadman',
                            messageKey: 'madmanGiveThingsFail',
                            weight: 1,
                        }),
                    ],
                }),
                new Decision({
                    option: 'C',
                    description: '"Magic tells you to bow to me!" [STR / CRPT]',
                    attributes: ['strength', 'corruption'],
                    successThreshold: 15,
                    roll: true,
                    successfulOutcomes: [
                        new Result({
                            result: 'recruit',
                            createRecruitKey: 'madmanRecruit',
                            onActivateKey: 'increaseCorruption5Percent',
                            messageKey: 'madmanBowSuccess',
                            weight: 1,
                        }),
                    ],
                    negativeOutcomes: [
                        new Result({
                            result: 'battle',
                            musicSrc: "./assets/audio/musicTracks/battle-of-the-dragons-8037.mp3",
                            createBattleKey: 'madmanAmbush',
                            onActivateKey: 'increaseCorruption5Percent',
                            messageKey: 'madmanBowFail',
                            weight: 1,
                        }),
                    ],
                }),
            ],
        });
    }
}




/*
import Stage from "../stage.js";
import Decision from "../decision.js";
import Result from "../result.js";
import Battle from "../battle.js";
import { Wolf, Madman, MadMage, MadBandit} from "../entities.js";
import { Bleed } from "../statusEffects.js";
import { getRandomArrayElementWeighted } from "../../../utility.js";

export class MadmanAhead extends Stage{
    constructor(config){
        super({
            name: 'Madman Ahead',
            imageSrc: './assets/media/encounters/mad-villager-ahead.jpg',
            decisionArray: config.decisionArray || [
                {//Decision
                    option: 'A',
                    description: 'Charge the Madman.',
                    successfulOutcomes: [
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
                                return new Battle({hostiles: hostileArray, battleMusicSrc: biome.battleMusicSrc, canRetreat: true});
                            },
                            messageFunction: (currentCharacter)=>{
                                return  `${currentCharacter.name} charges the Madman!`
                            }, 
                            weight: 1,
                        },
                    ]
                },
                {//Decision
                    option: 'B',
                    description: 'Eliminate the Madman quietly. [Dex]',
                    attributes: ['dexterity'],
                    successThreshold: 12,
                    roll: true,
                    messageFunction: (currentCharacter)=>{
                        return `${currentCharacter.name} sneaks behind the Madman.`
                    },
                    successfulOutcomes: [
                        {
                            result: 'complete',
                            imageSrc: './assets/media/entities/cursed-villager-1.jpg',
                            createLoot: (partyLevel, biome)=>{
                                return  [getRandomArrayElementWeighted(biome.lootTable).item()];
                            },
                            messageFunction: (currentCharacter)=>{
                                return `${currentCharacter.name} sneaks up behind the Madman and plunges a dagger into it side leaving the Madman lifeless on the ground. If it even was alive...`
                            },
                            xpReward: 5, 
                            weight: 1,
                        },
                    ],
                    negativeOutcomes: [
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
                                return new Battle({hostiles: hostileArray, battleMusicSrc: biome.battleMusicSrc, canRetreat: true});
                            },
                            messageFunction: (currentCharacter)=>{
                                return `The Madman is startled by ${currentCharacter.name}'s approach and draws his weapon!`
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

                                hostileArray[0].currentHP = hostileArray[0].currentHP*0.5;
                                hostileArray[0].statusArray.push(new Bleed({holder: hostileArray[0]}))
                                return new Battle({hostiles: hostileArray, battleMusicSrc: biome.battleMusicSrc, canRetreat: true});
                            },
                            messageFunction: (currentCharacter)=>{
                                 return `${currentCharacter.name} plunges a dagger into the side of the Madman side leaving him bleeding profusely! The Madman then sends a howl into the air alerting the nearby villagers!`
                            }, 
                            weight: 1,
                        },
                    ] 
                },
                {//Decision
                    option: 'C',
                    description: 'Throw a rock at him. [STR]',
                    attributes: ['strength'],
                    successThreshold: 12,
                    roll: true,
                    messageFunction: (currentCharacter)=>{
                        return `${currentCharacter.name} hurls a rock at the Madman.`
                    },
                    successfulOutcomes: [
                        {
                            result: 'complete',
                            imageSrc: './assets/media/entities/cursed-villager-1.jpg',
                            createLoot: (partyLevel, biome)=>{
                                return  [getRandomArrayElementWeighted(biome.lootTable).item()];
                            },
                            messageFunction: (currentCharacter)=>{
                                return `The rock hits the Madman right in head leaving the Madman lifeless on the ground. If it even was alive...`
                            },
                            xpReward: 5, 
                            weight: 1,
                        },
                        {
                            result: 'battle',
                            musicSrc: "./assets/audio/musicTracks/battle-of-the-dragons-8037.mp3",
                            imageSrc: './assets/media/entities/cursed-villager-1.jpg',
                            createBattle: (partyLevel, biome, difficulty)=>{
                                let hostileArray = [new Madman({level: partyLevel, difficulty: difficulty})];
                                let count = Math.ceil(Math.random()*4);
                                for(let i = 0; i < count; i++){
                                    let chance = Math.floor(Math.random()*4);
                                    if(chance < 2) hostileArray.push(new Madman({level: partyLevel, difficulty: difficulty}))
                                    if(chance == 2) hostileArray.push(new MadMage({level: partyLevel, difficulty: difficulty}))
                                    if(chance == 3) hostileArray.push(new MadBandit({level: partyLevel, difficulty: difficulty}))
                                }

                                hostileArray[0].currentHP = hostileArray[0].currentHP*0.6;
                                return new Battle({hostiles: hostileArray, battleMusicSrc: biome.battleMusicSrc, canRetreat: true});
                            },
                            messageFunction: (currentCharacter)=>{
                                return `The rock hits the Madman's body injuring him. After wincing from his wound, the Madman looks up and runs at ${currentCharacter.name}!`
                            }, 
                            weight: 3,
                        },
                    ],
                    negativeOutcomes: [
                        {
                            result: 'battle',
                            musicSrc: "./assets/audio/musicTracks/battle-of-the-dragons-8037.mp3",
                            imageSrc: './assets/media/entities/cursed-villager-1.jpg',
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
                                return `The rock goes far over the Madman's head and startles the Madman. The Madman then draws his weapon and rushes at ${currentCharacter.name}!`
                            }, 
                            weight: 2,
                        },
                        {
                            result: 'retry',
                            messageFunction: (currentCharacter)=>{
                                return `The rock misses the madman! Surely he will notice another...`
                            },
                            weight: 2,
                        },
                        {
                            result: 'battle',
                            imageSrc: './assets/media/entities/wolf.jpg',
                            musicSrc: "./assets/audio/musicTracks/battle-of-the-dragons-8037.mp3",
                            createBattle: (partyLevel, biome, difficulty)=>{
                                let hostileArray = [];
                                let count = Math.ceil(Math.random()*5);
                                for(let i = 0; i < count; i++){
                                    hostileArray.push(new Wolf({level: partyLevel, difficulty: difficulty}))
                                }
                                return new Battle({hostiles: hostileArray, battleMusicSrc: biome.battleMusicSrc, canRetreat: true});
                            },
                            messageFunction: (currentCharacter)=>{
                                return `The rock goes nowhere near the Madman and instead lands right in the middle of a pack of wolves! The wolves turn and glare at ${currentCharacter.name}!`
                            }, 
                            weight: 1,
                        },
                    ] 
                },
                {//Decision
                    option: 'D',
                    description: 'Attempt to communicate with the Madman. [Alterian]',
                    attributes: ['alterian'],
                    successThreshold: 12,
                    roll: true,
                    messageFunction: (currentCharacter)=>{
                        return `${currentCharacter.name} attempts to communicate with the Madman.`
                    }, 
                    successfulOutcomes: [
                        {
                            result: 'complete',
                            imageSrc: './assets/media/entities/cursed-villager-1.jpg',
                            createLoot: (partyLevel, biome)=>{
                                return  [getRandomArrayElementWeighted(biome.lootTable).item()];
                            },
                            messageFunction: (currentCharacter)=>{
                                return `${currentCharacter.name} converses with the Madman about the dilusional rants one might expect from a man who has lost his mind. Finally, the Madman smiles, and with tears in his eyes gives ${currentCharacter.name} a his backpack. Just before darting off, he mutters, "It's really you .... Shackle Breaker...".`
                            },
                            xpReward: 5, 
                            weight: 1,
                        },
                        {
                            result: 'nextStage',
                            createNextStage: (partyLevel, biome)=>{
                                return new ConversationWithMadman();
                            },
                            messageFunction: (currentCharacter)=>{
                                return `${currentCharacter.name} starts a conversation with the Madman.`
                            },
                            xpReward: 5,
                            weight: 2,
                        },
                    ],
                    negativeOutcomes: [
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
                                return new Battle({hostiles: hostileArray, battleMusicSrc: biome.battleMusicSrc, canRetreat: true});
                            },
                            messageFunction: (currentCharacter)=>{
                                return `The Madman laughs at ${currentCharacter.name} and draws his weapon!`
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
                        return `${currentCharacter.name} backs away from the Madman.`
                    }, 
                },
            ],
        })
    }
    messageFunction(currentCharacter){
        return `${currentCharacter.name} sees a man walking ahead. The man appears to be walking aimlessly and laughing. Upon getting closer, ${currentCharacter.name} realizes this is one of the many souls to have sucumb to madness.`;
    }
}
export class ConversationWithMadman extends Stage{
    constructor(config){
        super({
            name: 'Madman',
            imageSrc: './assets/media/entities/cursed-villager-1.jpg',
            decisionArray: [
                {//Decision
                    option: 'A',
                    description: '"Magic says run away freak!"',
                    attributes: ['none'],
                    successThreshold: 5,
                    roll: true,
                    successfulOutcomes: [
                        {
                            result: 'complete',
                            createLoot: (partyLevel, biome)=>{
                                return  [getRandomArrayElementWeighted(biome.lootTable).item()];
                            },
                            messageFunction: (currentCharacter)=>{
                                return `Upon hearing ${currentCharacter.name}, the Madman falls back and hisses. The Madman then gets up and runs away leaving behind his knapsack in the process.`
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
                                return `"Freak? .. Friend! Magic know many freak friend! You be freak friend too!"`
                            }, 
                            weight: 1,
                        },
                    ] 
                },
                {//Decision
                    option: 'B',
                    description: '"Magic tells you to give me things! [ATN]"',
                    attributes: ['attunement'],
                    successThreshold: 10,
                    roll: true,
                    successfulOutcomes: [
                        {
                            result: 'complete',
                            createLoot: (partyLevel, biome)=>{
                                return  [getRandomArrayElementWeighted(biome.lootTable).item()];
                            },
                            messageFunction: (currentCharacter)=>{
                                return `"Magic like you! So me like you! Hahahaha! Me give you these now!"`
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
                                return `"Hahaha! Magic no like you! So me no like you neither!"`
                            }, 
                            weight: 1,
                        },
                    ]
                },
                {//Decision
                    option: 'C',
                    description: '"Magic tells you to bow to me!" [STR / CRPT]',
                    attributes: ['strength', 'corruption'],
                    successThreshold: 15,
                    roll: true,
                    successfulOutcomes: [
                        {
                            result: 'recruit',
                            createRecruit: (partyLevel, biome, difficulty)=>{
                                let recruit = new Madman({level: partyLevel, difficulty: difficulty})
                                recruit.isHostile = false;
                                return recruit;
                            },
                            onActivate(target){
                                target.currentCorruption += 0.05;
                            },
                            messageFunction: (currentCharacter)=>{
                                return `"No no! No hurt me! Me help magic! Me help you!"`
                            }, 
                            weight: 1,
                        },
                    ],
                    negativeOutcomes: [
                        {
                            result: 'battle',
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
                                return new Battle({hostiles: hostileArray, battleMusicSrc: biome.battleMusicSrc, canRetreat: true});
                            },
                            onActivate(target){
                                target.currentCorruption += 0.05;
                            },
                            messageFunction: (currentCharacter)=>{
                                return `"You no hear magic! Me hurt you now!"`
                            }, 
                            weight: 1,
                        },
                    ]
                },
            ]
        })
    }
    messageFunction(currentCharacter){
        return '"Magic tell me things! Hee Hee! Tell me what magic say!`';
    }
}
*/