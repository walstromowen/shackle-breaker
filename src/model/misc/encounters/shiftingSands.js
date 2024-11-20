import Stage from "./stage.js";
import Battle from "../battle.js";
import { SandStalker, TheSandShade} from "../entities.js";
import { Bleed, Poison } from "../statusEffects.js";
import { getRandomArrayElementWeighted } from "../../../utility.js";

export class ShiftingSands extends Stage{
    constructor(config){
        super({
            name: 'Shifting Sands',
            imageSrc: './assets/media/encounters/shifting-sands-1.jpg',
            decisionArray: config.decisionArray || [
                {
                    description: 'Walk towards the anomaly.[VIG]',
                    attributes: ['vigor'],
                    successThreshold: 12,
                    roll: true,
                    successfulOutcomes: [
                        {
                            result: 'nextStage',
                            createNextStage: (partyLevel, biome)=>{
                                return new ShiftingSands2({});
                            }, 
                            weight: 1,
                        },
                    ],
                    negativeOutcomes: [
                        {
                            result: 'nextStage',
                            createNextStage: (partyLevel, biome)=>{
                                return new StatuesInTheSand({});
                            },
                            weight: 1,
                        },
                    ], 
                    messageFunction: (currentCharacter)=>{
                        return `${currentCharacter.name}'s party presses onward.`
                    }, 
                },
                {//Decision
                    description: 'Switch character',
                    successfulOutcomes: [{result: 'switchCharacter', weight: 1}],
                },
                {//Decision
                    description: 'turn back',
                    successfulOutcomes: [{result: 'complete', weight: 1}],
                    messageFunction: (currentCharacter)=>{
                        return `${currentCharacter.name}'s party chooses to turn back.`
                    }, 
                },
            ],
        })
    }
    messageFunction(currentCharacter){
        return `While walking through the sands, ${currentCharacter.name}'s sees something in the distance. `;
    }
}








export class StatuesInTheSand extends Stage{
    constructor(config){
        super({
            name: 'Statues in the Sand',
            imageSrc: './assets/media/encounters/statues-in-the-sand.jpg',
            decisionArray: [
                {//Decision
                    description: 'Back away slowly',
                    attributes: ['none'],
                    successThreshold: 12,
                    roll: true,
                    successfulOutcomes: [
                        {
                            result: 'nextStage',
                            createNextStage: (partyLevel, biome)=>{
                                return new ShiftingSands3({});
                            },
                            messageFunction: (currentCharacter)=>{
                                return `After maintaining careful eye contact and backing away slowly, ${currentCharacter.name}'s party sees the statues disipate into the desert winds.`
                            }, 
                            weight: 1,
                        },
                    ],
                    negativeOutcomes: [
                        {
                            result: 'battle',
                            imageSrc: './assets/media/entities/sand-stalker.jpg',
                            musicSrc: "./assets/audio/musicTracks/TimTaj - Desert Hunt.mp3",
                            createBattle: (partyLevel, biome)=>{
                                let hostileArray = [];
                                let count = Math.ceil(Math.random()*4);
                                for(let i = 0; i < count; i++){
                                    hostileArray.push(new SandStalker({level: partyLevel}))
                                }
                                return new Battle({hostiles: hostileArray, battleMusicSrc: biome.battleMusicSrc});
                            },
                            createNextStage: (partyLevel, biome)=>{
                                return new ShiftingSands3({});
                            },
                            messageFunction: (currentCharacter)=>{
                                return `While on the first shift to watch the statues, ${currentCharacter.name} trips and gets back up only to realize the statues have surrounded the party! And this time, they don't look like statues!`
                            }, 
                            weight: 1,
                        },
                    ],
                    messageFunction: (currentCharacter)=>{
                        return `${currentCharacter.name}'s party backs away slowly from the statues making sure to maintain eye contact.`
                    }, 
                },
                {//Decision
                    description: 'Destroy the statues',
                    attributes: ['none'],
                    successThreshold: 12,
                    roll: true,
                    successfulOutcomes: [
                        {
                            result: 'nextStage',
                            createNextStage: (partyLevel, biome)=>{
                                return config.nextStage;
                            },
                            messageFunction: (currentCharacter)=>{
                                return `As ${currentCharacter.name} smashes the statues, the statues turn into piles of sand and are blown away by the desert wind.`
                            }, 
                            weight: 1,
                        },
                    ],
                    negativeOutcomes: [
                        {
                            result: 'battle',
                            imageSrc: './assets/media/entities/sand-stalker.jpg',
                            musicSrc: "./assets/audio/musicTracks/TimTaj - Desert Hunt.mp3",
                            createBattle: (partyLevel, biome)=>{
                                let hostileArray = [];
                                let count = Math.ceil(Math.random()*4);
                                for(let i = 0; i < count; i++){
                                    hostileArray.push(new SandStalker({level: partyLevel}))
                                }
                                return new Battle({hostiles: hostileArray, battleMusicSrc: biome.battleMusicSrc});
                            },
                            createNextStage: (partyLevel, biome)=>{
                                return new ShiftingSands3({});
                            },
                            messageFunction: (currentCharacter)=>{
                                return `Just as ${currentCharacter.name} withdraws from pile of sand that used to be statues, the sand erupts into an ominous vortex! From the vortex emerges a cloaked figure ready to fight!`
                            }, 
                            weight: 1,
                        },
                    ],
                    messageFunction: (currentCharacter)=>{
                        return `${currentCharacter.name} attempts to smash the statues.`
                    }, 
                },
                {//Decision
                    description: 'Attempt to run away [DEX / STR]',
                    attributes: ['strength','dexterity'],
                    successThreshold: 15,
                    roll: true,
                    successfulOutcomes: [
                        {
                            result: 'complete',
                            messageFunction: (currentCharacter)=>{
                                return `${currentCharacter.name}'s party wastes no time running from the unnatural statues. It appears the statues are nowhere to be seen.`
                            },   
                            weight: 1,
                        },
                    ],
                    negativeOutcomes: [
                        {
                            result: 'battle',
                            imageSrc: './assets/media/entities/sand-stalker.jpg',
                            musicSrc: "./assets/audio/musicTracks/TimTaj - Desert Hunt.mp3",
                            createBattle: (partyLevel, biome)=>{
                                let hostileArray = [];
                                let count = Math.ceil(Math.random()*4);
                                for(let i = 0; i < count; i++){
                                    hostileArray.push(new SandStalker({level: partyLevel}))
                                }
                                return new Battle({hostiles: hostileArray, battleMusicSrc: biome.battleMusicSrc});
                            },
                            createNextStage: (partyLevel, biome)=>{
                                return new ShiftingSands3({});
                            },
                            messageFunction: (currentCharacter)=>{
                                return `As ${currentCharacter.name}'s party retreats the statues suddenly come to life an almost instantly are upon the party!`
                            }, 
                            weight: 1,
                        },
                    ],
                    messageFunction: (currentCharacter)=>{
                        return `${currentCharacter.name}'s party attempts to run away!`
                    }, 
                },
            ]
        })
    }
    messageFunction(currentCharacter){
        return `While walking along, ${currentCharacter.name} realizes that a group of sandy statues has suddenly appeared behind the party. Have they been there all along? `;
    }
}



export class ShiftingSands2 extends Stage{
    constructor(config){
        super({
            name: 'Shifting Sands',
            imageSrc: './assets/media/encounters/shifting-sands-2.jpg',
            decisionArray: config.decisionArray || [
                {
                    description: 'Press on [VIG].',
                    attributes: ['vigor'],
                    successThreshold: 12,
                    roll: true,
                    successfulOutcomes: [
                        {
                            result: 'nextStage',
                            createNextStage: (partyLevel, biome)=>{
                                return new ShiftingSands3({});
                            },
                            
                            weight: 1,
                        },
                    ],
                    negativeOutcomes: [
                        {
                            result: 'nextStage',
                            createNextStage: (partyLevel, biome)=>{
                                return new StatuesInTheSand({});
                            },
                            weight: 1,
                        },
                        {
                            result: 'complete',
                            onActivate(target){
                                target.currentStamina = Math.floor(target.currentStamina * 0.75);
                            },
                            messageFunction: (currentCharacter)=>{
                                return `${currentCharacter.name}'s party walks for hours in vain, only to realize they have been chasing a mirage. Discouraged, the party turns back tired and exhausted.`
                            }, 
                            weight: 1},
                    ], 
                    messageFunction: (currentCharacter)=>{
                        return `${currentCharacter.name}'s party presses onward.`
                    }, 
                },
                {//Decision
                    description: 'Switch character',
                    successfulOutcomes: [{result: 'switchCharacter', weight: 1}],
                },
                {//Decision
                    description: 'turn back',
                    successfulOutcomes: [{result: 'complete', weight: 1}],
                    messageFunction: (currentCharacter)=>{
                        return `${currentCharacter.name}'s party chooses to turn back.`
                    }, 
                },
            ],
        })
    }
    messageFunction(currentCharacter){
        return `${currentCharacter.name}'s party continues to approach the distant object, but the as the party grows closer, the object appears to fade into the desert `;
    }
}



export class ShiftingSands3 extends Stage{
    constructor(config){
        super({
            name: 'Shifting Sands',
            imageSrc: './assets/media/encounters/shifting-sands-3.jpg',
            decisionArray: config.decisionArray || [
                {
                    description: 'Keep going. [VIG]',
                    attributes: ['vigor'],
                    successThreshold: 15,
                    roll: true,
                    successfulOutcomes: [
                        {
                            result: 'nextStage',
                            onActivate(target){
                                target.currentStamina = Math.floor(target.currentStamina * 0.75);
                            },
                            createNextStage: (partyLevel, biome)=>{
                                return new ShiftingSands4({});;
                            },
                            
                            weight: 1,
                        },
                    ],
                    negativeOutcomes: [
                        {
                            result: 'nextStage',
                            onActivate(target){
                                target.currentStamina = Math.floor(target.currentStamina * 0.75);
                            },
                            createNextStage: (partyLevel, biome)=>{
                                return new StatuesInTheSand({});
                            },
                            weight: 1,
                        },
                        {
                            result: 'complete',
                            onActivate(target){
                                target.currentStamina = Math.floor(target.currentStamina * 0.75);
                            },
                            messageFunction: (currentCharacter)=>{
                                return `${currentCharacter.name}'s party walks for hours in vain, only to realize they have been chasing a mirage. Discouraged, the party turns back tired and exhausted.`
                            }, 
                            weight: 1},
                    ], 
                    messageFunction: (currentCharacter)=>{
                        return `Despite the powerful winds, ${currentCharacter.name}'s party chooses to press onward.`
                    }, 
                },
                {//Decision
                    description: 'Switch character',
                    successfulOutcomes: [{result: 'switchCharacter', weight: 1}],
                },
                {//Decision
                    description: 'turn back',
                    successfulOutcomes: [{result: 'complete', weight: 1}],
                    messageFunction: (currentCharacter)=>{
                        return `${currentCharacter.name}'s party chooses to turn back.`
                    }, 
                },
            ],
        })
    }
    messageFunction(currentCharacter){
        return `The object gets bigger as ${currentCharacter.name}'s party grows closer to it. Just as ${currentCharacter.name} seems to be able to make out the object, the winds pickup, blowing sand into the air and obscuring the distant object. Pressing on will likely tire the party.`;
    }
}


export class ShiftingSands4 extends Stage{
    constructor(config){
        super({
            name: 'Shifting Sands',
            imageSrc: './assets/media/encounters/shifting-sands-4.jpg',
            decisionArray: config.decisionArray || [
                {
                    description: 'Keep going! [VIG]',
                    attributes: ['vigor'],
                    successThreshold: 15,
                    roll: true,
                    successfulOutcomes: [
                        {
                            result: 'nextStage',
                            onActivate(target){
                                target.currentStamina = Math.floor(target.currentStamina * 0.75);
                            },
                            createNextStage: (partyLevel, biome)=>{
                                return new SandCastleEntrance({});;
                            },
                            weight: 1,
                        },
                    ],
                    negativeOutcomes: [
                        {
                            result: 'complete',
                            onActivate(target){
                                target.currentStamina = Math.floor(target.currentStamina * 0.75);
                            },
                            messageFunction: (currentCharacter)=>{
                                return `${currentCharacter.name}'s party approaches the object, only to realize the object is just a large rock. Discouraged, the party takes refuge against the rock tired and exhausted.`
                            }, 
                            weight: 1},
                    ], 
                    messageFunction: (currentCharacter)=>{
                        return `Despite the powerful winds, ${currentCharacter.name}'s party chooses to press onward.`
                    }, 
                },
                {//Decision
                    description: 'Switch character',
                    successfulOutcomes: [{result: 'switchCharacter', weight: 1}],
                },
                {//Decision
                    description: 'turn back',
                    successfulOutcomes: [{result: 'complete', weight: 1}],
                    messageFunction: (currentCharacter)=>{
                        return `${currentCharacter.name}'s party chooses to turn back.`
                    }, 
                },
            ],
        })
    }
    messageFunction(currentCharacter){
        return `Nearing exhaustion, ${currentCharacter.name}'s party approaches the object. As ${currentCharacter.name} looks up the object appears to be just ahead and massive in size.`;
    }
}


export class SandCastleEntrance extends Stage{
    constructor(config){
        super({
            name: 'The Sand Castle',
            imageSrc: './assets/media/encounters/sand-castle.jpg',
            decisionArray: config.decisionArray || [
                {
                    description: 'Enter the castle.',
                    successfulOutcomes: [
                        {
                            result: 'complete',
                            onActivate(target){
                                target.currentStamina = target.maxStamina;
                            },
                            weight: 1,
                        },
                        {//TEMP
                            result: 'battle',
                            imageSrc: './assets/media/entities/the-sand-shade.jpg',
                            musicSrc: "./assets/audio/musicTracks/adrenaline-roger-gabalda-main-version-02-23-11021.mp3",
                            createBattle: (partyLevel, biome)=>{
                                return new Battle({hostiles: [ new TheSandShade({level: partyLevel})], battleMusicSrc: biome.battleMusicSrc});
                            },
                            messageFunction: (currentCharacter)=>{
                                return `Tho shea-ath katan.... (Murmoring in an unknown language)`
                            }, 
                            weight: 100,
                        },//TEMP
                    ],
                    messageFunction: (currentCharacter)=>{
                        return `${currentCharacter.name}'s party enters the castle.`
                    }, 
                },
                {//Decision
                    description: 'turn back',
                    successfulOutcomes: [{result: 'complete', weight: 1}],
                    messageFunction: (currentCharacter)=>{
                        return `${currentCharacter.name}'s party chooses to turn back.`
                    }, 
                },
            ],
        })
    }
    messageFunction(currentCharacter){
        return `Just as ${currentCharacter.name} is about to collapse, ${currentCharacter.name}'s party emerges from the winds into a clearing. In the middle of the clearing lies a castle. Its walls forboding but made of sand. Mysteriously, the tops of its towers appear to be fading away like dust in the wind.`;
    }
}