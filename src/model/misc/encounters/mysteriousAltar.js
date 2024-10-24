import Stage from "./stage.js";
import Battle from "../battle.js";
import { Wolf, Madman, Skeleton, SkeletonCultist, SkeletonColossus} from "../entities.js";
import { Bleed, Poison } from "../statusEffects.js";

export class MysteriousAltar extends Stage{
    constructor(config){
        super({
            name: 'Mysterious Altar',
            imageSrc: './assets/media/encounters/mysterious-altar.jpg',
            decisionArray: config.decisionArray || [
                {
                    description: 'Approach the altar.',
                    attributes: ['none'],
                    successThreshold: 12,
                    roll: true,
                    successfulOutcomes: [
                        {
                            result: 'nextStage',
                            createNextStage: (partyLevel, biome)=>{
                                return new AtTheAltar({});
                            },
                            
                            weight: 1,
                        },
                    ],
                    negativeOutcomes: [
                        {
                            result: 'battle',
                            imageSrc: './assets/media/entities/skeleton.jpg',
                            musicSrc: "./assets/audio/musicTracks/battle-sword-139313.mp3",
                            createBattle: (partyLevel, biome)=>{
                                let hostiles = [];
                                let count = Math.ceil(Math.random()*4);
                                for(let i = 0; i < count; i++){
                                    let chance = Math.floor(Math.random()*3);
                                    if(chance < 2) hostiles.push(new Skeleton({level: partyLevel}))
                                    if(chance == 2) hostiles.push(new SkeletonCultist({level: partyLevel}))
                                }
                                return new Battle({hostiles: hostiles, battleMusicSrc: biome.battleMusicSrc});
                            },
                            createNextStage: (partyLevel, biome)=>{
                                return new AtTheAltar({});
                            },
                            messageFunction: (currentCharacter)=>{
                                return `As ${currentCharacter.name} approaches the altar, skeletons along the floor slowly begin to move. Before ${currentCharacter.name}'s party realizes what is happening, the Skeletons are on top of them!`
                            }, 
                            weight: 1,
                        },
                        {
                            result: 'nextStage',
                            onActivate(target){
                                target.currentStamina *= 0.5;
                                target.currentMagic *= 0.5;
                            },
                            createNextStage: (partyLevel, biome)=>{
                                return new AtTheAltar({});
                            },
                            messageFunction: (currentCharacter)=>{
                                return `As ${currentCharacter.name} approaches the altar, the altar releases a cloud of smoke, making ${currentCharacter.name} feel fatigued.`
                            }, 
                            weight: 3,
                        },
                    ], 
                    messageFunction: (currentCharacter)=>{
                        return `${currentCharacter.name} approaches the altar.`
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
                        return `${currentCharacter.name} continues along the path leaving the altar alone.`
                    }, 
                },
            ],
        })
    }
    messageFunction(currentCharacter){
        return `While walking the dark paths of the cave, ${currentCharacter.name}'s party stumbles upon a mysterious altar in a large open room. Bones and skeletons lay everywhere and an ominous chill fills the air.`;
    }
}
export class AtTheAltar extends Stage{
    constructor(config){
        super({
            name: 'Mysterious Altar',
            imageSrc: './assets/media/encounters/at-the-altar.jpg',
            decisionArray: [
                {//Decision
                    description: 'Examine the Skull',
                    attributes: ['intelligence'],
                    successThreshold: 15,
                    roll: true,
                    successfulOutcomes: [
                        {
                            result: 'complete',
                            onActivate(target){
                                for(let i = 0; i < target.statusArray.length; i++){
                                    target.statusArray[i].name.onRemove();
                                }
                                target.statusArray = [];
                                target.currentHP = target.maxHP;
                                
                            },
                            messageFunction: (currentCharacter)=>{
                                return `As ${currentCharacter.name} reaches to examine the skull, the skull's eyes begin to glow blue filling the whole room with a blinding light! Upon opening their eye's ${currentCharacter}, realizes that the skull has disappered and feels a sense of newly found strength.`
                            }, 
                            weight: 1,
                        },
                    ],
                    negativeOutcomes: [
                        {
                            result: 'battle',
                            imageSrc: './assets/media/entities/skeleton.jpg',
                            musicSrc: "./assets/audio/musicTracks/battle-sword-139313.mp3",
                            createBattle: (partyLevel, biome)=>{
                                let hostiles = [];
                                let count = Math.ceil(Math.random()*4);
                                for(let i = 0; i < count; i++){
                                    let chance = Math.floor(Math.random()*3);
                                    if(chance < 2) hostiles.push(new Skeleton({level: partyLevel}))
                                    if(chance == 2) hostiles.push(new SkeletonCultist({level: partyLevel}))
                                }
                                return new Battle({hostiles: hostiles, battleMusicSrc: biome.battleMusicSrc});
                            },
                            createNextStage: (partyLevel, biome)=>{
                                return new AtTheAltar({});
                            },
                            messageFunction: (currentCharacter)=>{
                                return `As ${currentCharacter.name} reaches to examine the skull, the skull's eyes begin to glow red filling the whole room with a blinding light! Upon opening their eye's ${currentCharacter.name}, realizes that the skull has disappered and a group of skeletons is quickly appraoching!`
                            }, 
                            weight: 1,
                        },
                        {
                            result: 'nextStage',
                            createNextStage(){
                                return new ASkeletalAbomination({});
                            },
                            messageFunction: (currentCharacter)=>{
                                return `As ${currentCharacter.name} reaches to examine the skull, the skull begins to shake.. and its eyes begin to glow! Meanwhile, bones begin flying around the room eventually making their way toward the skull on the altar... `
                            },
                            weight: 1,
                        },
                    ] 
                },
                {//Decision
                    description: 'Back up',
                    successfulOutcomes: [
                        {
                            result: 'nextStage',
                            createNextStage: (partyLevel, biome)=>{
                                return new MysteriousAltar({});
                            },
                            weight: 1,
                        },
                    ],
                    messageFunction: (currentCharacter)=>{
                        return `${currentCharacter.name} backs away from the altar.`
                    }, 
                },
            ]
        })
    }
    messageFunction(currentCharacter){
        return `${currentCharacter.name}'s walks up to altar and sees a skull resting high above the bones on the floor. The skull almost feels as if it were placed there on purpose.`;
    }
}

export class ASkeletalAbomination extends Stage{
    constructor(config){
        super({
            name: 'A Skeletal Abomination',
            imageSrc: './assets/media/entities/skeleton-colossus.jpg',
            musicSrc: "./assets/audio/musicTracks/2022-03-16_-_Escape_Route_-_www.FesliyanStudios.com.mp3",
            decisionArray: [
                {//Decision
                    description: 'Attack',
                    successfulOutcomes: [
                        {
                            result: 'battle',
                            createBattle: (partyLevel, biome)=>{
                                let hostiles = [new SkeletonColossus({level: partyLevel})];
                                return new Battle({hostiles: hostiles, battleMusicSrc: "./assets/audio/musicTracks/2022-03-16_-_Escape_Route_-_www.FesliyanStudios.com.mp3", canRetreat: false});
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
                                return `${currentCharacter.name} escapes the skeletal monster!`
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
        return `The bones come together in a hidous fashion forming a monsterous construct of bones that roars in ${currentCharacter.name}'s face!`;
    }
}