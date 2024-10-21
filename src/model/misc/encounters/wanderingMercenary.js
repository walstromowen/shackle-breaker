import Stage from "./stage.js";
import Battle from "../battle.js";
import { } from "../entities.js";


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
                                return `"Pleasure doing business with you boss! Oh and don't worry about me. I can handle myself."`
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
                                return `"You seem like the type I could follow. Lead the way boss!"`
                            }, 
                            weight: 1,
                        },
                    ],
                    negativeOutcomes: [
                        {
                            result: 'removeDecisions',
                            removableDecisions: ['B'],
                            messageFunction: (currentCharacter)=>{
                                return `The mercenary looks unimpressed.`
                            }, 
                            weight: 9,
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
                {//Decision
                    option: 'C',
                    description: 'Leave',
                    successfulOutcomes: [
                        {
                            result: 'complete',
                            weight: 1
                        },
                    ],
                    messageFunction: (currentCharacter)=>{
                        return `${currentCharacter.name} leaves.`
                    }, 
                },
            ]
        })
    }
    messageFunction(currentCharacter){
        return `"You look like the type that could use some muscule, but can you spare the coin?"`;
    }
}