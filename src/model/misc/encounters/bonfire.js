import Stage from "./stage.js";
import Battle from "../battle.js";
import {Wolf, Madman, MadMage, MadBandit} from "../entities.js";
import { getRandomArrayElementWeighted } from "../../../utility.js";

export class Bonfire extends Stage{
    constructor(config){
        super({
            name: 'Bonfire',
            imageSrc: './assets/media/encounters/bonfire.jpg',
            decisionArray: config.decisionArray || [
                {
                    description: 'Rest.',
                    attributes: ['none'],
                    successThreshold: 10,
                    roll: true,
                    successfulOutcomes: [
                        {
                            result: 'complete',
                            createLoot: (partyLevel, biome)=>{
                                return  [getRandomArrayElementWeighted(biome.lootTable).item()];
                            },
                            messageFunction: (currentCharacter)=>{
                                return `As ${currentCharacter.name}'s party enjoys a long rest. ${currentCharacter.name} finds something beside the fire. `
                            }, 
                            onActivate(target){
                                target.currentHP += Math.floor(target.maxHP * 0.5);
                                target.currentStamina += Math.floor(target.maxStamina * 0.5);
                                target.currentMagic += Math.floor(target.maxMagic * 0.5);
                                if(target.currentHP > target.maxHP) target.currentHP = target.maxHP;
                                if(target.currentStamina > target.maxStamina) target.currentStamina = target.maxStamina;
                                if(target.currentMagic > target.maxMagic) target.currentMagic = target.maxMagic;
                            },
                            xpReward: 5,
                            weight: 1,
                        },
                        {
                            result: 'complete',
                            messageFunction: (currentCharacter)=>{
                                return `${currentCharacter.name}'s party rests.`
                            }, 
                            onActivate(target){
                                target.currentHP += Math.floor(target.maxHP * 0.5);
                                target.currentStamina += Math.floor(target.maxStamina * 0.5);
                                target.currentMagic += Math.floor(target.maxMagic * 0.5);
                                if(target.currentHP > target.maxHP) target.currentHP = target.maxHP;
                                if(target.currentStamina > target.maxStamina) target.currentStamina = target.maxStamina;
                                if(target.currentMagic > target.maxMagic) target.currentMagic = target.maxMagic;
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
                                let hostileArray = [];
                                let count = Math.ceil(Math.random()*4);
                                for(let i = 0; i < count; i++){
                                    let chance = Math.floor(Math.random()*3);
                                    if(chance == 0) hostileArray.push(new Madman({level: partyLevel, difficulty: difficulty}))
                                    if(chance == 1) hostileArray.push(new MadMage({level: partyLevel, difficulty: difficulty}))
                                    if(chance == 2) hostileArray.push(new MadBandit({level: partyLevel, difficulty: difficulty}))
                                }
                                return new Battle({hostiles: hostileArray, battleMusicSrc: biome.battleMusicSrc, canRetreat: true});
                            },
                            createNextStage: (partyLevel, biome)=>{
                                return new Bonfire({});
                            },
                            messageFunction: (currentCharacter)=>{
                                return `${currentCharacter.name}'s is ambushed by madmen!`
                            }, 
                            weight: 1,
                        },
                        {
                            result: 'battle',
                            imageSrc: './assets/media/entities/mad-bandit.jpg',
                            musicSrc: "./assets/audio/musicTracks/battle-of-the-dragons-8037.mp3",
                            createBattle: (partyLevel, biome, difficulty)=>{
                                let hostileArray = [];
                                let count = Math.ceil(Math.random()*5);
                                for(let i = 0; i < count; i++){
                                    hostileArray.push(new MadBandit({level: partyLevel, difficulty: difficulty}))
                                }
                                return new Battle({hostiles: hostileArray, battleMusicSrc: biome.battleMusicSrc});
                            },
                            onActivate(target){
                                target.currentHP -= Math.floor(target.maxHP * 0.4);
                                if(target.currentHP < 0) target.currentHP = 0;
                            },
                            createNextStage: (partyLevel, biome)=>{
                                return new Bonfire({});
                            },
                            messageFunction: (currentCharacter)=>{
                                return `An arrow flies out of nowhere and hits ${currentCharacter.name}! Soon, ${currentCharacter.name}'s party is surrounded by madmen! `
                            }, 
                            weight: 1,
                        },
                        {
                            result: 'battle',
                            imageSrc: './assets/media/entities/wolf.jpg',
                            musicSrc: "./assets/audio/musicTracks/battle-of-the-dragons-8037.mp3",
                            createBattle: (partyLevel, biome, difficulty)=>{
                                let hostileArray = [];
                                let count = Math.ceil(Math.random()*5);
                                for(let i = 0; i < count; i++){
                                   hostileArray.push(new Wolf({level: partyLevel, difficulty: difficulty}));
                                }
                                return new Battle({hostiles: hostileArray, battleMusicSrc: biome.battleMusicSrc, canRetreat: true});
                            },
                            createNextStage: (partyLevel, biome)=>{
                                return new Bonfire({});
                            },
                            messageFunction: (currentCharacter)=>{
                                return `${currentCharacter.name}'s is met by a pack of wolves!`
                            }, 
                            weight: 1,
                        },
                    ], 
                    messageFunction: (currentCharacter)=>{
                        return `${currentCharacter.name}'s party lays down to rest.`
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
                        return `${currentCharacter.name}'s party moves along.`
                    }, 
                },
            ],
        })
    }
    messageFunction(currentCharacter){
        return `${currentCharacter.name}'s party encounters a bonfire. Its embers appear to still be buring.`;
    }
}
