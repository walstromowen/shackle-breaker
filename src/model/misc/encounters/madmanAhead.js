import Stage from "./stage.js";
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
                            musicSrc: "./assets/audio/musicTracks/battle-of-the-dragons-8037.mp3",
                            createBattle: (partyLevel, biome)=>{
                                let hostileArray = [new Madman({level: partyLevel})];
                                let count = Math.ceil(Math.random()*4);
                                for(let i = 0; i < count; i++){
                                    let chance = Math.floor(Math.random()*4);
                                    if(chance < 2) hostileArray.push(new Madman({level: partyLevel}))
                                    if(chance == 2) hostileArray.push(new MadMage({level: partyLevel}))
                                    if(chance == 3) hostileArray.push(new MadBandit({level: partyLevel}))
                                }
                                return new Battle({hostiles: hostileArray, battleMusicSrc: biome.battleMusicSrc});
                            },
                            messageFunction: (currentCharacter)=>{
                                return `The Madman rushes to meet ${currentCharacter.name}'s party!`
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
                            result: 'loot',
                            imageSrc: './assets/media/entities/cursed-villager-1.jpg',
                            createLoot: (partyLevel, biome)=>{
                                return  [getRandomArrayElementWeighted(biome.lootTable).item()];
                            },
                            messageFunction: (currentCharacter)=>{
                                return `${currentCharacter.name} sneaks up behind the Madman and plunges a dagger into it side leaving the Madman lifeless on the ground. If it even was alive...`
                            }, 
                            weight: 1,
                        },
                    ],
                    negativeOutcomes: [
                        {
                            result: 'battle',
                            imageSrc: './assets/media/entities/cursed-villager-1.jpg',
                            musicSrc: "./assets/audio/musicTracks/battle-of-the-dragons-8037.mp3",
                            createBattle: (partyLevel, biome)=>{
                                let hostileArray = [new Madman({level: partyLevel})];
                                let count = Math.ceil(Math.random()*4);
                                for(let i = 0; i < count; i++){
                                    let chance = Math.floor(Math.random()*4);
                                    if(chance < 2) hostileArray.push(new Madman({level: partyLevel}))
                                    if(chance == 2) hostileArray.push(new MadMage({level: partyLevel}))
                                    if(chance == 3) hostileArray.push(new MadBandit({level: partyLevel}))
                                }
                                return new Battle({hostiles: hostileArray, battleMusicSrc: biome.battleMusicSrc});
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
                            createBattle: (partyLevel, biome)=>{
                                let hostileArray = [new Madman({level: partyLevel})];
                                let count = Math.ceil(Math.random()*4);
                                for(let i = 0; i < count; i++){
                                    let chance = Math.floor(Math.random()*4);
                                    if(chance < 2) hostileArray.push(new Madman({level: partyLevel}))
                                    if(chance == 2) hostileArray.push(new MadMage({level: partyLevel}))
                                    if(chance == 3) hostileArray.push(new MadBandit({level: partyLevel}))
                                }

                                hostileArray[0].currentHP = hostileArray[0].currentHP*0.5;
                                hostileArray[0].statusArray.push(new Bleed({holder: hostileArray[0]}))
                                return new Battle({hostiles: hostileArray, battleMusicSrc: biome.battleMusicSrc});
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
                            result: 'loot',
                            imageSrc: './assets/media/entities/cursed-villager-1.jpg',
                            createLoot: (partyLevel, biome)=>{
                                return  [getRandomArrayElementWeighted(biome.lootTable).item()];
                            },
                            messageFunction: (currentCharacter)=>{
                                return `The rock hits the Madman right in head leaving the Madman lifeless on the ground. If it even was alive...`
                            }, 
                            weight: 1,
                        },
                        {
                            result: 'battle',
                            musicSrc: "./assets/audio/musicTracks/battle-of-the-dragons-8037.mp3",
                            imageSrc: './assets/media/entities/cursed-villager-1.jpg',
                            createBattle: (partyLevel, biome)=>{
                                let hostileArray = [new Madman({level: partyLevel})];
                                let count = Math.ceil(Math.random()*4);
                                for(let i = 0; i < count; i++){
                                    let chance = Math.floor(Math.random()*4);
                                    if(chance < 2) hostileArray.push(new Madman({level: partyLevel}))
                                    if(chance == 2) hostileArray.push(new MadMage({level: partyLevel}))
                                    if(chance == 3) hostileArray.push(new MadBandit({level: partyLevel}))
                                }

                                hostileArray[0].currentHP = hostileArray[0].currentHP*0.6;
                                return new Battle({hostiles: hostileArray, battleMusicSrc: biome.battleMusicSrc});
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
                            createBattle: (partyLevel, biome)=>{
                                let hostileArray = [new Madman({level: partyLevel})];
                                let count = Math.ceil(Math.random()*4);
                                for(let i = 0; i < count; i++){
                                    let chance = Math.floor(Math.random()*4);
                                    if(chance < 2) hostileArray.push(new Madman({level: partyLevel}))
                                    if(chance == 2) hostileArray.push(new MadMage({level: partyLevel}))
                                    if(chance == 3) hostileArray.push(new MadBandit({level: partyLevel}))
                                }
                                return new Battle({hostiles: hostileArray, battleMusicSrc: biome.battleMusicSrc});
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
                            createBattle: (partyLevel, biome)=>{
                                let hostileArray = [];
                                let count = Math.ceil(Math.random()*5);
                                for(let i = 0; i < count; i++){
                                    hostileArray.push(new Wolf({level: partyLevel}))
                                }
                                return new Battle({hostiles: hostileArray, battleMusicSrc: biome.battleMusicSrc});
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
                    description: 'Attempt to communicate with the Madman. [ATN]',
                    attributes: ['attunement'],
                    successThreshold: 15,
                    roll: true,
                    messageFunction: (currentCharacter)=>{
                        return `${currentCharacter.name} attempts to communicate with the Madman.`
                    }, 
                    successfulOutcomes: [
                        {
                            result: 'loot',
                            imageSrc: './assets/media/entities/cursed-villager-1.jpg',
                            createLoot: (partyLevel, biome)=>{
                                return  [getRandomArrayElementWeighted(biome.lootTable).item()];
                            },
                            messageFunction: (currentCharacter)=>{
                                return `${currentCharacter.name} converses with the Madman about the dilusional rants one might expect from a man who has lost his mind. Finally, the Madman smiles, and with tears in his eyes gives ${currentCharacter.name} a his backpack. Just before darting off, he mutters, "It's really you .... Shackle Breaker...".`
                            }, 
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
                            weight: 2,
                        },
                    ],
                    negativeOutcomes: [
                        {
                            result: 'battle',
                            imageSrc: './assets/media/entities/cursed-villager-1.jpg',
                            musicSrc: "./assets/audio/musicTracks/battle-of-the-dragons-8037.mp3",
                            createBattle: (partyLevel, biome)=>{
                                let hostileArray = [new Madman({level: partyLevel})];
                                let count = Math.ceil(Math.random()*4);
                                for(let i = 0; i < count; i++){
                                    let chance = Math.floor(Math.random()*4);
                                    if(chance < 2) hostileArray.push(new Madman({level: partyLevel}))
                                    if(chance == 2) hostileArray.push(new MadMage({level: partyLevel}))
                                    if(chance == 3) hostileArray.push(new MadBandit({level: partyLevel}))
                                }
                                return new Battle({hostiles: hostileArray, battleMusicSrc: biome.battleMusicSrc});
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
                    description: 'switch character',
                    successfulOutcomes: [{result: 'switchCharacter', weight: 1}],
                },
                {//Decision
                    option: 'F',
                    description: 'leave',
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
                            result: 'loot',
                            createLoot: (partyLevel, biome)=>{
                                return  [getRandomArrayElementWeighted(biome.lootTable).item()];
                            },
                            messageFunction: (currentCharacter)=>{
                                return `Upon hearing ${currentCharacter.name}, the Madman falls back and hisses. The Madman then gets up and runs away leaving behind his knapsack in the process.`
                            }, 
                            weight: 1,
                        },
                    ],
                    negativeOutcomes: [
                        {
                            result: 'battle',
                            musicSrc: "./assets/audio/musicTracks/battle-of-the-dragons-8037.mp3",
                            createBattle: (partyLevel, biome)=>{
                                let hostileArray = [new Madman({level: partyLevel})];
                                let count = Math.ceil(Math.random()*4);
                                for(let i = 0; i < count; i++){
                                    let chance = Math.floor(Math.random()*4);
                                    if(chance < 2) hostileArray.push(new Madman({level: partyLevel}))
                                    if(chance == 2) hostileArray.push(new MadMage({level: partyLevel}))
                                    if(chance == 3) hostileArray.push(new MadBandit({level: partyLevel}))
                                }
                                return new Battle({hostiles: hostileArray, battleMusicSrc: biome.battleMusicSrc});
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
                    description: '"Magic tells you to give me things!"',
                    attributes: ['none'],
                    successThreshold: 10,
                    roll: true,
                    successfulOutcomes: [
                        {
                            result: 'loot',
                            createLoot: (partyLevel, biome)=>{
                                return  [getRandomArrayElementWeighted(biome.lootTable).item()];
                            },
                            messageFunction: (currentCharacter)=>{
                                return `"Magic like you! So me like you! Hahahaha! Me give you these now!"`
                            }, 
                            weight: 1,
                        },
                    ],
                    negativeOutcomes: [
                        {
                            result: 'battle',
                            musicSrc: "./assets/audio/musicTracks/battle-of-the-dragons-8037.mp3",
                            createBattle: (partyLevel, biome)=>{
                                let hostileArray = [new Madman({level: partyLevel})];
                                let count = Math.ceil(Math.random()*4);
                                for(let i = 0; i < count; i++){
                                    let chance = Math.floor(Math.random()*4);
                                    if(chance < 2) hostileArray.push(new Madman({level: partyLevel}))
                                    if(chance == 2) hostileArray.push(new MadMage({level: partyLevel}))
                                    if(chance == 3) hostileArray.push(new MadBandit({level: partyLevel}))
                                }
                                return new Battle({hostiles: hostileArray, battleMusicSrc: biome.battleMusicSrc});
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
                    description: '"Magic tells you to bow to me!" [STR]',
                    attributes: ['strength'],
                    successThreshold: 15,
                    roll: true,
                    successfulOutcomes: [
                        {
                            result: 'recruit',
                            createRecruit: (partyLevel, biome)=>{
                                let recruit = new Madman({level: partyLevel})
                                recruit.isHostile = false;
                                return recruit;
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
                            createBattle: (partyLevel, biome)=>{
                                let hostileArray = [new Madman({level: partyLevel})];
                                let count = Math.ceil(Math.random()*4);
                                for(let i = 0; i < count; i++){
                                    let chance = Math.floor(Math.random()*4);
                                    if(chance < 2) hostileArray.push(new Madman({level: partyLevel}))
                                    if(chance == 2) hostileArray.push(new MadMage({level: partyLevel}))
                                    if(chance == 3) hostileArray.push(new MadBandit({level: partyLevel}))
                                }
                                return new Battle({hostiles: hostileArray, battleMusicSrc: biome.battleMusicSrc});
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