import Stage from "./stage.js";
import Battle from "../battle.js";
import {Spider} from "../entities.js";
import { getRandomArrayElementWeighted } from "../../../utility.js";

export class CaveIn extends Stage{
    constructor(config){
        super({
            name: 'Cave In',
            imageSrc: './assets/media/encounters/cave-in.jpg',
            decisionArray: config.decisionArray || [
                {
                    description: 'Dig through the rubble. [STR]',
                    attributes: ['strength'],
                    successThreshold: 12,
                    roll: true,
                    successfulOutcomes: [
                        {
                            result: 'loot',
                            createLoot: (partyLevel, biome)=>{
                                return  [getRandomArrayElementWeighted(biome.lootTable).item()];
                            },
                            messageFunction: (currentCharacter)=>{
                                return `While digging, ${currentCharacter.name} finds something in the rubble.`
                            }, 
                            weight: 1,
                        },
                        {
                            result: 'complete',
                            messageFunction: (currentCharacter)=>{
                                return `${currentCharacter.name}'s party digs through the rubble!`
                            }, 
                            weight: 2,
                        },
                    ],
                    negativeOutcomes: [
                        {
                            result: 'complete',
                            messageFunction: (currentCharacter)=>{
                                return `${currentCharacter.name}'s party digs through the rubble for what feels like hours. Eventually the exhausted party clears a path through.`
                            }, 
                            onActivate(target){
                                target.currentStamina = Math.floor(target.currentStamina * 0.75);
                                target.currentMagic = Math.floor(target.currentMagic * 0.75);
                            },
                            weight: 1,
                        },
                        {
                            result: 'retry',
                            onActivate(target){
                                target.currentHP -= Math.floor(target.maxHP * 0.25);
                                if(target.currentHP < 0){
                                    target.currentHP = 0;
                                }
                            },
                            messageFunction: (currentCharacter)=>{
                                return `As ${currentCharacter.name} works to clear the path, heavy rocks fall on ${currentCharacter.name}!`
                            }, 
                            weight: 2,
                        },
                        {
                            result: 'battle',
                            imageSrc: './assets/media/entities/spider.jpg',
                            musicSrc: "./assets/audio/musicTracks/battle-sword-139313.mp3",
                            createBattle: (partyLevel, biome, difficulty)=>{
                                let hostileArray = [];
                                let count = Math.ceil(Math.random()*3);
                                for(let i = -2; i < count; i++){
                                    hostileArray.push(new Spider({level: partyLevel, difficulty: difficulty}))
                                }
                                return new Battle({hostiles: hostileArray, battleMusicSrc: biome.battleMusicSrc});
                            },
                            createNextStage: (partyLevel, biome)=>{
                                return new CaveIn({});
                            },
                            messageFunction: (currentCharacter)=>{
                                return `While digging, ${currentCharacter.name} breaks into a spider's nest!`
                            }, 
                            weight: 1,
                        },
                    ], 
                    messageFunction: (currentCharacter)=>{
                        return `${currentCharacter.name} attemps to dig a path through the rubble.`
                    }, 
                },
            ],
        })
    }
    messageFunction(currentCharacter){
        return `${currentCharacter.name}'s party encounters a pile of rubble blocking the path.`;
    }
}
