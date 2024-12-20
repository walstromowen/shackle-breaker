import Stage from "./stage.js";
import Battle from "../battle.js";
import { Wolf, Madman, Skeleton, SkeletonCultist, SkeletonColossus, FloatingSkull, ArmoredSkeleton} from "../entities.js";
import { Bleed, Poison } from "../statusEffects.js";
import { getRandomArrayElementWeighted } from "../../../utility.js";

export class MysteriousAltar extends Stage{
    constructor(config){
        super({
            name: 'Mysterious Altar',
            imageSrc: './assets/media/encounters/mysterious-altar.jpg',
            decisionArray: config.decisionArray || [
                {
                    description: 'Approach the altar. [VIG]',
                    attributes: ['vigor'],
                    successThreshold: 12,
                    roll: true,
                    successfulOutcomes: [
                        {
                            result: 'nextStage',
                            createNextStage: (partyLevel, biome)=>{
                                return new AtTheAltar({});
                            },
                            xpReward: 5,
                            weight: 1,
                        },
                    ],
                    negativeOutcomes: [
                        {
                            result: 'battle',
                            imageSrc: './assets/media/entities/skeleton.jpg',
                            musicSrc: "./assets/audio/musicTracks/battle-sword-139313.mp3",
                            createBattle: (partyLevel, biome, difficulty)=>{
                                let hostileArray = [];
                                let count = Math.ceil(Math.random()*4);
                                for(let i = 0; i < count; i++){
                                    let chance = Math.floor(Math.random()*5);
                                    if(chance < 2) hostileArray.push(new Skeleton({level: partyLevel, difficulty: difficulty}))
                                    if(chance == 2) hostileArray.push(new SkeletonCultist({level: partyLevel, difficulty: difficulty}))
                                    if(chance == 3) hostileArray.push(new FloatingSkull({level: partyLevel, difficulty: difficulty}))
                                    if(chance == 4) hostileArray.push(new ArmoredSkeleton({level: partyLevel, difficulty: difficulty}))
                                }
                                return new Battle({hostiles: hostileArray, battleMusicSrc: biome.battleMusicSrc});
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
                                target.currentStamina = Math.floor(target.currentStamina * 0.75);
                                target.currentMagic = Math.floor(target.currentMagic * 0.75);
                            },
                            createNextStage: (partyLevel, biome)=>{
                                return new AtTheAltar({});
                            },
                            messageFunction: (currentCharacter)=>{
                                return `As ${currentCharacter.name} approaches the altar, the altar releases a cloud of smoke, making ${currentCharacter.name} feel fatigued.`
                            }, 
                            weight: 1,
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
                    description: 'Leave',
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
                    description: 'Examine the Skull. [INT]',
                    attributes: ['intelligence'],
                    successThreshold: 15,
                    roll: true,
                    successfulOutcomes: [
                        {
                            result: 'complete',
                            onActivate(target){
                                for(let i = 0; i < target.statusArray.length; i++){
                                    target.statusArray[i].onRemove();
                                }
                                target.currentHP = target.maxHP;
                                target.currentMagic = target.maxMagic;
                                target.currentStamina = target.maxStamina;
  
                            },
                            messageFunction: (currentCharacter)=>{
                                return `As ${currentCharacter.name} reaches to examine the skull, the skull's eyes begin to glow blue filling the whole room with a blinding light! Upon opening their eye's ${currentCharacter.name}, realizes that the skull has disappered and feels a sense of newly found strength.`
                            },
                            xpReward: 5,    
                            weight: 1,
                        },
                        {
                            result: 'complete',
                            createLoot: (partyLevel, biome)=>{
                                return  [getRandomArrayElementWeighted(biome.lootTable).item(), getRandomArrayElementWeighted(biome.lootTable).item()];
                            },
                            messageFunction: (currentCharacter)=>{
                                return `As ${currentCharacter.name} reaches to examine the skull, the skull's eyes begin to glow green. Suddenly, mysterious objects materialize on the altar just waiting for ${currentCharacter.name} to grab them.`
                            },
                            xpReward: 5, 
                            weight: 1,
                        },
                        {
                            result: 'nextStage',
                            createNextStage: ()=>{
                                return new ASkeletalAbomination({});
                            },
                            messageFunction: (currentCharacter)=>{
                                return `As ${currentCharacter.name} reaches to examine the skull, the skull begins to shake.. and its eyes begin to glow! Meanwhile, bones begin flying around the room eventually making their way toward the skull on the altar... `
                            },
                            xpReward: 5,
                            weight: 2,
                        },
                    ],
                    negativeOutcomes: [
                        {
                            result: 'battle',
                            imageSrc: './assets/media/entities/skeleton.jpg',
                            musicSrc: "./assets/audio/musicTracks/battle-sword-139313.mp3",
                            createBattle: (partyLevel, biome, difficulty)=>{
                                let hostileArray = [];
                                let count = Math.ceil(Math.random()*4);
                                for(let i = 0; i < count; i++){
                                    let chance = Math.floor(Math.random()*5);
                                    if(chance < 2) hostileArray.push(new Skeleton({level: partyLevel, difficulty: difficulty}))
                                    if(chance == 2) hostileArray.push(new SkeletonCultist({level: partyLevel, difficulty: difficulty}))
                                    if(chance == 3) hostileArray.push(new FloatingSkull({level: partyLevel, difficulty: difficulty}))
                                    if(chance == 4) hostileArray.push(new ArmoredSkeleton({level: partyLevel, difficulty: difficulty}))
                                }
                                return new Battle({hostiles: hostileArray, battleMusicSrc: biome.battleMusicSrc});
                            },
                            createNextStage: (partyLevel, biome)=>{
                                return new AtTheAltar({});
                            },
                            messageFunction: (currentCharacter)=>{
                                return `As ${currentCharacter.name} reaches to examine the skull, the skull's eyes begin to glow red filling the whole room with a blinding light! Upon opening their eye's ${currentCharacter.name}, realizes that the skull has disappered and a group of skeletons is quickly appraoching!`
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
                            createBattle: (partyLevel, biome, difficulty)=>{
                                let hostileArray = [new SkeletonColossus({level: partyLevel, difficulty: difficulty})];
                                for(let i = 0; i < 2; i++){
                                    let chance = Math.floor(Math.random()*5);
                                    if(chance < 2) hostileArray.push(new Skeleton({level: partyLevel, difficulty: difficulty}))
                                    if(chance == 2) hostileArray.push(new SkeletonCultist({level: partyLevel, difficulty: difficulty}))
                                    if(chance == 3) hostileArray.push(new FloatingSkull({level: partyLevel, difficulty: difficulty}))
                                    if(chance == 4) hostileArray.push(new ArmoredSkeleton({level: partyLevel, difficulty: difficulty}))
                                }
                                return new Battle({hostiles: hostileArray, battleMusicSrc: "./assets/audio/musicTracks/2022-03-16_-_Escape_Route_-_www.FesliyanStudios.com.mp3", gold: (20*partyLevel), canRetreat: false});
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
                    negativeOutcomes: [
                        {
                            result: 'battle',
                            createBattle: (partyLevel, biome, difficulty)=>{
                                let hostileArray = [new SkeletonColossus({level: partyLevel, difficulty: difficulty})];
                                for(let i = 0; i < 2; i++){
                                    let chance = Math.floor(Math.random()*5);
                                    if(chance < 2) hostileArray.push(new Skeleton({level: partyLevel, difficulty: difficulty}))
                                    if(chance == 2) hostileArray.push(new SkeletonCultist({level: partyLevel, difficulty: difficulty}))
                                    if(chance == 3) hostileArray.push(new FloatingSkull({level: partyLevel, difficulty: difficulty}))
                                    if(chance == 4) hostileArray.push(new ArmoredSkeleton({level: partyLevel, difficulty: difficulty}))
                                }
                                return new Battle({hostiles: hostileArray, battleMusicSrc: "./assets/audio/musicTracks/2022-03-16_-_Escape_Route_-_www.FesliyanStudios.com.mp3", gold: (20*partyLevel), canRetreat: false});
                            },
                            messageFunction: (currentCharacter)=>{
                                return `As ${currentCharacter.name} attempts to escape, the Skeleton Colossus blocks the exit!`
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
