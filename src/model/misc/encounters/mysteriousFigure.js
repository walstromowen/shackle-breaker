import Stage from "./stage.js";
import Battle from "../battle.js";
import { Nightblade } from "../entities.js";
import { getRandomArrayElementWeighted } from "../../../utility.js";
import { HealthPotion, KurtussBrewOfMadness, ParalysisTonic } from "../items.js";


export class MysteriousFigure extends Stage{
    constructor(config){
        super({
            name: 'Mysterious figure',
            imageSrc: './assets/media/encounters/mysterious-figure.jpg',
            decisionArray: [
                {//Decision
                    description: 'Approach the figure',
                    successfulOutcomes: [
                        {
                            result: 'nextStage',
                            createNextStage: (partyLevel, biome)=>{
                                let chance = Math.floor(Math.random()*2)
                                if(chance == 0) return new SuspiciousMan({});
                                else return new ShadowyWarrior({});
                            },
                            weight: 1,
                        },
                    ],
                    messageFunction: (currentCharacter)=>{
                        return `${currentCharacter.name} approaches the mysterious figure.`
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
        return `${currentCharacter.name} barely sees the silhouette of a person ahead.`;
    }
}

export class SuspiciousMan extends Stage{
    constructor(config){
        super({
            name: 'Suspicious Man',
            imageSrc: './assets/media/encounters/suspicious-man.jpg',
            decisionArray: [
                {//Decision
                    option: 'A',
                    description: "Buy the potion. [50g]",
                    goldCost: 50,
                    successfulOutcomes: [
                         {
                            result: 'complete',
                            createLoot: (partyLevel, biome)=>{
                                let chance = Math.floor(Math.random()*3)
                                if(chance == 0) return [new HealthPotion()];
                                if(chance == 1) return [new KurtussBrewOfMadness()];
                                if(chance == 2) return [new ParalysisTonic()];
                                
                            },
                            messageFunction: (currentCharacter)=>{
                                return `The Suspicious Man stares at the gold coins in his hand and lets out a a cry of delight. He then pockets the gold quickly and runs of into the distance.`
                            },
                            xpReward: 5, 
                            weight: 1,
                        },
                    ],
                    messageFunction: (currentCharacter)=>{
                        return `${currentCharacter.name} hands over 50 gold coins to buy the potion.`
                    },
                },
                {//Decision
                    option: 'B',
                    description: "Persuade the Suspicious Man to buy the potion for 25 less [25g].",
                    goldCost: 25,
                    attributes: ['intelligence'],
                    successThreshold: 12,
                    roll: true,
                    successfulOutcomes: [
                        {
                            result: 'complete',
                            createLoot: (partyLevel, biome)=>{
                                let chance = Math.floor(Math.random()*3)
                                if(chance == 0) return [new HealthPotion()];
                                if(chance == 1) return [new KurtussBrewOfMadness()];
                                if(chance == 2) return [new ParalysisTonic()];
                                
                            },
                            messageFunction: (currentCharacter)=>{
                                return `"Fine!" The Suspicious Man says angrily at ${currentCharacter.name}. Nevertheless, the man begins laughing manically and then runs off into the distance.`
                            },
                            xpReward: 10, 
                            weight: 1,
                        },
                    ],
                    negativeOutcomes: [
                        {
                            result: 'complete',
                            messageFunction: (currentCharacter)=>{
                                return `As ${currentCharacter.name} offers the gold to the mysterious man, the Suspicious Man pushes ${currentCharacter.name} to the ground and steals the gold. "Hehehe! It's mine, all mine!"`
                            }, 
                            weight: 1,
                        },
                    ]
                },
                {
                    option: 'C',
                    description: "Pickpocket the Man. [DEX]",
                    attributes: ['dexterity'],
                    successThreshold: 16,
                    roll: true,
                    successfulOutcomes: [
                         {
                            result: 'retry',
                            removableDecisions: ['C'],
                            createLoot: (partyLevel, biome)=>{
                                let chance = Math.floor(Math.random()*3)
                                if(chance == 0) return [new HealthPotion()];
                                if(chance == 1) return [new KurtussBrewOfMadness()];
                                if(chance == 2) return [new ParalysisTonic()];
                            },
                            onActivate(target){
                                target.currentCorruption += 0.2;
                            },
                            xpReward: 10, 
                            weight: 1,
                        },
                    ],
                    negativeOutcomes: [
                        {
                            result: 'complete',
                            messageFunction: (currentCharacter)=>{
                                let chance = Math.floor(Math.random()*3)
                                if(chance == 0) return `"Thief? Haha! Bye Bye!"`
                                if(chance == 1) return `"Eeeek!" The Suspicious Man squeals as he runs away.`
                                if(chance == 2) return `"Stay back!" The Suspicious Man screams as he runs away.`
                            },
                            onActivate(target){
                                target.currentCorruption += 0.2;
                            },
                            weight: 1,
                        },
                    ],
                    messageFunction: (currentCharacter)=>{
                        return `${currentCharacter.name} attempts to pickpocket the Suspicious Man.`
                    },
                },
                {//Decision
                    option: 'D',
                    description: 'Leave',
                    successfulOutcomes: [{result: 'complete', weight: 1},],
                    messageFunction: (currentCharacter)=>{
                        return `${currentCharacter.name} leaves the Suspicious Man.`
                    }, 
                },
            ]
        })
    }
    messageFunction(currentCharacter){
        let message = `As ${currentCharacter.name} approaches, the figure takes the apperance of a Suspicious Man. Seeing ${currentCharacter.name}, the man holds up a vial containing an unknown liquid and says ;`;
        let chance = Math.floor(Math.random()*3)
        if(chance == 0) message +=`"You look like you need potion! Hahaha! Me have potion, just for you!"`
        if(chance == 1) message +=`"Need a drink?"`
        if(chance == 2) message +=`"Such a sorry sight. Here, I have what you need."`
        return message;
    }
}


export class ShadowyWarrior extends Stage{
    constructor(config){
        super({
            entity: config.entity,
            name: 'A Shadowy Warrior',
            imageSrc: './assets/media/entities/nightblade.jpg',
            decisionArray: [
                {//Decision
                    option: 'A',
                    description: "Attempt to communicate. [Namuh]",
                    attributes: ['namuh'],
                    successThreshold: 18,
                    roll: true,
                    successfulOutcomes: [
                         {
                            result: 'recruit',
                            createRecruit: (partyLevel, biome, difficulty)=>{
                                let recruit = new Nightblade({level: partyLevel, difficulty: difficulty})
                                recruit.isHostile = false;
                                return recruit;
                            },
                            messageFunction: (currentCharacter)=>{
                                 return `${currentCharacter.name} tries to communicate with The Shadowy Warrior by mimicing the the hand gestures the warrior previously used. The Shadowy Warrior then nods at ${currentCharacter.name} as if in a sign of respect.`
                            }, 
                            xpReward: 15, 
                            weight: 1,
                        },
                    ],
                    negativeOutcomes: [
                        {
                            result: 'complete',
                            messageFunction: (currentCharacter)=>{
                                return `${currentCharacter.name} akwardly tires to communicate with The Shadowy Warrior by mimicing the the hand gestures the warrior previously used. The Shadowy Warrior then amazingly transforms into a shadow and disapears!"`
                            }, 
                            weight: 1,
                        },
                        {
                            result: 'battle',
                            musicSrc: "./assets/audio/musicTracks/battle-sword-139313.mp3",
                            createBattle: (partyLevel, biome, difficulty)=>{
                                return new Battle({hostiles: [new Nightblade({level: partyLevel, difficulty: difficulty})], battleMusicSrc: biome.battleMusicSrc, canRetreat: true});
                            },
                            messageFunction: (currentCharacter)=>{
                                return `The Shadowy Warrior raises his sword and approaches ${currentCharacter.name}!`
                            }, 
                            weight: 1,
                    
                        },
                    ],
                    messageFunction: (currentCharacter)=>{
                        return `${currentCharacter.name} attempts to communicate with the Shadowy Warrior.`
                    },
                },
                {//Decision
                    option: 'B',
                    description: "Duel the warrior.",
                    successfulOutcomes: [
                         {
                            result: 'battle',
                            musicSrc: "./assets/audio/musicTracks/battle-sword-139313.mp3",
                            createBattle: (partyLevel, biome, difficulty)=>{
                                return new Battle({hostiles: [new Nightblade({level: partyLevel, difficulty: difficulty})], battleMusicSrc: biome.battleMusicSrc, maxAllyCount: 1, maxHostileCount: 1, canRetreat: true});
                            },
                            createNextStage: (partyLevel, biome)=>{
                                return new DefeatedNightblade({});
                            },
                            weight: 1,
                        },
                    ],
                    messageFunction: (currentCharacter)=>{
                        return `${currentCharacter.name} challenges the Shadowy Warrior to a duel.`
                    },
                },
                {//Decision
                    option: 'C',
                    description: 'Back away.',
                    successfulOutcomes: [{result: 'complete', weight: 1},],
                    messageFunction: (currentCharacter)=>{
                        return `${currentCharacter.name} backs away from the Shadowy Warrior.`
                    }, 
                },
            ]
        })
    }
    messageFunction(currentCharacter){
        return `As ${currentCharacter.name} approaches, the figure takes the apperance of a Shadowy Warrior. The mysterious warrior make a series of quick hand gestures and then brands a sword.`;
    }
}

export class DefeatedNightblade extends Stage{
    constructor(config){
        super({
            entity: config.entity,
            name: 'Defeated Warrior',
            imageSrc: './assets/media/entities/nightblade.jpg',
            decisionArray: [
                {//Decision
                    description: "Execute the warrior.",
                    successfulOutcomes: [
                         {
                            result: 'complete',
                            createLoot: (partyLevel, biome)=>{
                                return  [getRandomArrayElementWeighted(biome.lootTable).item()];
                            },
                            onActivate(target){
                                target.currentCorruption += 0.10;
                            },
                            xpReward: 10, 
                            weight: 1,
                        },
                    ],
                    messageFunction: (currentCharacter)=>{
                        return `${currentCharacter.name} executes the Shadowy Warrior.`
                    },
                },
                {//Decision
                    description: "Spare the warrior.",
                    attributes: ['namuh'],
                    successThreshold: 5,
                    roll: true,
                    successfulOutcomes: [
                        {
                            result: 'recruit',
                            createRecruit: (partyLevel, biome, difficulty)=>{
                                let recruit = new Nightblade({level: partyLevel, difficulty: difficulty})
                                recruit.isHostile = false;
                                return recruit;
                            },
                            onActivate(target){
                                target.currentCorruption -= 0.10;
                            },
                            messageFunction: (currentCharacter)=>{
                                 return `${currentCharacter.name} The Shadowy Warrior nods at ${currentCharacter.name} in respect.`
                            }, 
                            xpReward: 20, 
                            weight: 1,
                        },
                    ],
                    negativeOutcomes: [
                        {
                            result: 'complete',
                            messageFunction: (currentCharacter)=>{
                                return `Upon standing to his feet, the Shadowy Warrior transforms into a shadow and disappears!"`
                            }, 
                            weight: 1,
                        },
                    ],
                    messageFunction: (currentCharacter)=>{
                        return `${currentCharacter.name} helps the warrior to his feet.`
                    },
                },
            ]
        })
    }
    messageFunction(currentCharacter){
        return `${currentCharacter.name} stands over defeated Shadowy Warrior. The warrior looks at ${currentCharacter.name} confidently, as if prepared for what comes next...`;
    }
}