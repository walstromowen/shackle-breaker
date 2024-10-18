import Stage from "./stage.js";
import Battle from "../battle.js";
import { Skeleton, SkeletonCultist, Madman} from "../entities.js";
import { Bleed } from "../statusEffects.js";

export class MadmanAhead extends Stage{
    constructor(config){
        super({
            name: 'Madman Ahead',
            imageSrc: './assets/media/encounters/mad-villager-ahead.jpg',
            decisionArray: [
                {//Decision
                    description: 'Charge the Madman.',
                    successfulOutcomes: [
                        {
                            result: 'battle',
                            createBattle: (partyLevel, biome)=>{
                                let hostileArray = [];
                                let count = Math.ceil(Math.random()*4);
                                for(let i = 0; i < count; i++){
                                    hostileArray.push(new Madman({level: partyLevel}))
                                }
                                return new Battle({hostiles: hostileArray});
                            },
                            messageFunction: (currentCharacter)=>{
                                return `The Madman rushes to meet ${currentCharacter.name}'s party!`
                            }, 
                            weight: 1,
                        },
                    ]
                },
                {//Decision
                    description: 'Eliminate the Madman quietly. [Dex]',
                    attributes: ['dexterity'],
                    successThreshold: 10,
                    roll: true,
                    messageFunction: (currentCharacter)=>{
                        return `${currentCharacter.name} sneaks behind the Madman.`
                    },
                    successfulOutcomes: [
                        {
                            result: 'loot',
                            createLoot: (partyLevel, biome)=>{
                                let hostile = new Madman({level: partyLevel})
                               
                                let loot = hostile.dropLoot(1);
                                return loot;
                            },
                            messageFunction: (currentCharacter)=>{
                                return `${currentCharacter.name} sneaks up behind the Madman and plunges a dagger into it side! The Madman drops lifelessly to the ground.`
                            }, 
                            weight: 1,
                        },
                    ],
                    negativeOutcomes: [
                        {
                            result: 'battle',
                            createBattle: (partyLevel, biome)=>{
                                let hostiles = [];
                                let count = Math.ceil(Math.random()*4);
                                for(let i = 0; i < count; i++){
                                    hostiles.push(new Madman({level: partyLevel}))
                                }
                                return new Battle({hostiles: hostiles});
                            },
                            messageFunction: (currentCharacter)=>{
                                return `The Madman is startled by ${currentCharacter.name}'s appraoch and draws his weapon!`
                            }, 
                            weight: 1,
                        },
                        {
                            result: 'battle',
                            createBattle: (partyLevel, biome)=>{
                                let hostiles = [];
                                let count = Math.ceil(Math.random()*4);
                                for(let i = 0; i < count; i++){
                                    hostiles.push(new Madman({level: partyLevel}))
                                }
                                hostiles[0].currentHP = hostiles[0].currentHP*0.5;
                                hostiles[0].statusArray.push(new Bleed({holder: hostiles[0]}))
                                return new Battle({hostiles: hostiles});
                            },
                            messageFunction: (currentCharacter)=>{
                                 return `${currentCharacter.name}  plunges a dagger into the side of the Madman side! The Villager begins bleeding profusely but manages to send howl into the air alerting the nearby madmen!`
                            }, 
                            weight: 1,
                        },
                    ] 
                },
                {//Decision
                    description: 'Attempt to communicate with the Madman. [ATN]',
                    attributes: ['attunement'],
                    successThreshold: 10,
                    roll: true,
                    messageFunction: (currentCharacter)=>{
                        return `${currentCharacter.name} attempts to communicate with the Madman.`
                    }, 
                    successfulOutcomes: [
                        {
                            result: 'loot',
                            createLoot: (partyLevel, biome)=>{
                                let hostile = new Madman({level: partyLevel})
                                let loot = hostile.dropLoot(2);
                                return loot;
                            },
                            messageFunction: (currentCharacter)=>{
                                return `${currentCharacter.name} converses with the Madman for what feels like hours about the dilusional rants one might expect from a man who has lost his mind. Finally, the Madman smiles, and with tears in his eyes gives ${currentCharacter.name} a his backpack. Just before darting off, he mutters, "It's really you .... Shackle Breaker...".`
                            }, 
                            weight: 1,
                        },
                        {
                            result: 'nextStage',
                            createNextStage: (partyLevel, biome)=>{
                                return new ConversationWithMadman();
                            },
                            messageFunction: (currentCharacter)=>{
                                return `${currentCharacter.name} strikes a conversation with the Madman about magic. The Madman replies "Magic tell me things! Magic want fun! Magic ... everything....`
                            }, 
                            weight: 2,
                        },
                    ],
                    negativeOutcomes: [
                        {
                            result: 'battle',
                            createBattle: (partyLevel, biome)=>{
                                return new Battle({hostiles: [new Madman({level: partyLevel})]});
                            },
                            messageFunction: (currentCharacter)=>{
                                return `The Madman laughs at ${currentCharacter.name} and draws his weapon!`
                            }, 
                            weight: 1,
                        },
                    ]
                },
                {//Decision
                    description: 'leave',
                    roll: false,
                    successfulOutcomes: [
                        {
                            result: 'overworld',
                            messageFunction: (currentCharacter)=>{
                                return `${currentCharacter.name} leaves.`
                            },  
                            weight: 1
                        },
                    ],
                    messageFunction: (currentCharacter)=>{
                        return `${currentCharacter.name} backs away from the mad villager.`
                    }, 
                },
            ]
        })
    }
    updateMessage(currentCharacter){
        this.message = `${currentCharacter.name} sees a man shambling about ahead. No doubt this is one of the many souls to have sucumb to madness.`;
    }
}
export class ConversationWithMadman extends Stage{
    constructor(config){
        super({
            name: 'conversation with madman',
            imageSrc: './assets/media/entities/cursed-villager-1.jpg',
            decisionArray: [
                {//Decision
                    description: '"Get away from me freak!"',
                    attributes: ['none'],
                    successThreshold: 5,
                    roll: true,
                    messageFunction: (currentCharacter)=>{
                        return `"Get away from me freak!" ${currentCharacter.name} shouts.`
                    },
                    successfulOutcomes: [
                        {
                            result: 'loot',
                            createLoot: (partyLevel, biome)=>{
                                let hostile = new Madman({level: partyLevel})
                               
                                let loot = hostile.dropLoot(1);
                                return loot;
                            },
                            messageFunction: (currentCharacter)=>{
                                return `Upon hearing ${currentCharacter.name}, the Madman falls back and hisses "Magic no Like! Magic No Like!" The Madman then gets up and runs away leaving behind his knapsack in the process.`
                            }, 
                            weight: 1,
                        },
                    ],
                    negativeOutcomes: [
                        {
                            result: 'battle',
                            createBattle: (partyLevel, biome)=>{
                                let hostiles = [];
                                let count = Math.ceil(Math.random()*4);
                                for(let i = 0; i < count; i++){
                                    hostiles.push(new Madman({level: partyLevel}))
                                }
                                return new Battle({hostiles: hostiles});
                            },
                            messageFunction: (currentCharacter)=>{
                                return `The Madman replies "Freak? .. Friend! Magic know many freak friend! You be freak friend too!" The Madman then lets out a hideous cry alerting a host of "freak friends" to rush towards ${currentCharacter.name}!`
                            }, 
                            weight: 1,
                        },
                    ] 
                },
                {//Decision
                    description: '"Magic tells me things too."',
                    attributes: ['none'],
                    successThreshold: 10,
                    roll: true,
                    messageFunction: (currentCharacter)=>{
                        return `${currentCharacter.name} says "Magic tells me things too.".`
                    }, 
                    successfulOutcomes: [
                        {
                            result: 'loot',
                            createLoot: (partyLevel, biome)=>{
                                let hostile = new Madman({level: partyLevel})
                                let loot = hostile.dropLoot(3);
                                return loot;
                            },
                            messageFunction: (currentCharacter)=>{
                                return `The Madman replies "Magic like you! Magic give you these!"`
                            }, 
                            weight: 1,
                        },
                    ],
                    negativeOutcomes: [
                        {
                            result: 'battle',
                            createBattle: (partyLevel, biome)=>{
                                return new Battle({hostiles: [new Madman({level: partyLevel})]});
                            },
                            messageFunction: (currentCharacter)=>{
                                return `The Madman laughs at ${currentCharacter.name} and chases after him!`
                            }, 
                            weight: 1,
                        },
                    ]
                },
                {//Decision
                    description: '"Magic tell you ... me in charge!" [STR]',
                    attributes: ['strength'],
                    successThreshold: 15,
                    roll: true,
                    messageFunction: (currentCharacter)=>{
                        return `${currentCharacter.name} says "Magic tell you ... me in charge!".`
                    }, 
                    successfulOutcomes: [
                        {
                            result: 'recruit',
                            createRecruit: (partyLevel, biome)=>{
                                let recruit = new Madman({level: partyLevel})
                                recruit.isHostile = false;
                                return recruit;
                            },
                            messageFunction: (currentCharacter)=>{
                                return `The madman haistily bows and says "Master! Master! you Magic Master!"`
                            }, 
                            weight: 1,
                        },
                    ],
                    negativeOutcomes: [
                        {
                            result: 'battle',
                            createBattle: (partyLevel, biome)=>{
                                return new Battle({hostiles: [new Madman({level: partyLevel})]});
                            },
                            messageFunction: (currentCharacter)=>{
                                return `The Madman laughs at ${currentCharacter.name} and draws his weapon!`
                            }, 
                            weight: 1,
                        },
                    ]
                },
            ]
        })
    }
    updateMessage(currentCharacter){
        this.message = `${currentCharacter.name} ponders what to say to the Madman.`;
    }
}