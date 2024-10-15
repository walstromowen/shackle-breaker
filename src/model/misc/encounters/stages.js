import Battle from "../battle.js";
import { Skeleton, SkeletonCultist, MadVillager} from "../entities.js";

export default class Stage{
    constructor(config){
        this.name = config.name;
        this.imageSrc = config.imageSrc;
        this.decisionArray = config.decisionArray;
        this.message;
    }
}
export class MadVillagerAhead extends Stage{
    constructor(config){
        super({
            name: 'Mad Villager Ahead',
            imageSrc: './assets/media/encounters/mad-villager-ahead.jpg',
            decisionArray: [
                {
                    description: 'Charge the mad villager. [STR]',
                    attributes: ['strength'],
                    successThreshold: 5,
                    roll: false,//TODO make a roll decision
                    successfulOutcomes: [
                        {
                            result: 'battle',
                            createBattle: (partyLevel, biome)=>{
                                let hostileArray = [];
                                let count = Math.ceil(Math.random()*4);
                                for(let i = 0; i < count; i++){
                                    hostileArray.push(new MadVillager({level: partyLevel}))
                                }
                                return new Battle({hostiles: hostileArray});
                            },
                            messageFunction: (currentCharacter)=>{
                                return `The mad villager rushes to meet ${currentCharacter.name}'s party!`
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
                                    hostiles.push(new MadVillager({level: partyLevel}))
                                }
                                return new Battle({hostileArray: hostiles});
                            },
                            messageFunction: (currentCharacter)=>{
                                return `The mad villager rushes to meet ${currentCharacter.name}!`
                            }, 
                            weight: 1,
                        },
                    ],
                    messageFunction: (currentCharacter)=>{
                        return `${currentCharacter.name} charges the mad villager.`
                    }, 
                },
                {
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