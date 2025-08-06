import Stage from "../stage.js";
import Decision from "../decision.js";
import Result from "../result.js";

export class MineralVein extends Stage {
  constructor(config) {
    super({
      name: 'Mineral Vein',
      imageSrc: './assets/media/encounters/mineral-vein.jpg',
      messageKey: 'mineralVeinEncounter',
      decisionArray: config.decisionArray || [
        new Decision({
          description: 'Mine the mineral vein. [STR]',
          attributes: ['strength'],
          successThreshold: 12,
          roll: true,
          messageKey: 'mineralVeinMineAttempt',
          successfulOutcomes: [
            new Result({
              result: 'retry',
              createLootKey: 'mineIronOre',
              xpReward: 2,
              weight: 4,
            }),
            new Result({
              result: 'retry',
              createLootKey: 'mineDiamond',
              xpReward: 10,
              weight: 1,
            }),
          ],
          negativeOutcomes: [
            new Result({
              result: 'complete',
              messageKey: 'mineralVeinEmpty',
              weight: 2,
            }),
            new Result({
              result: 'retry',
              messageKey: 'mineralVeinWorthlessStone',
              weight: 3,
            }),
            new Result({
              result: 'battle',
              imageSrc: './assets/media/entities/spider.jpg',
              musicSrc: './assets/audio/musicTracks/battle-sword-139313.mp3',
              createBattleKey: 'spiderNest',
              messageKey: 'mineralVeinSpiderNest',
              weight: 1,
            }),
            new Result({
              result: 'nextStage',
              imageSrc: './assets/media/encounters/cave-in.jpg',
              messageKey: 'mineralVeinCollapse',
              createNextStageKey: 'caveIn',
              onActivateKey: 'health1',
              weight: 1,
            }),
          ],
        }),
        new Decision({
          description: 'Switch character',
          successfulOutcomes: [
            new Result({ result: 'switchCharacter', weight: 1 }),
          ],
        }),
        new Decision({
          description: 'Leave',
          messageKey: 'mineralVeinLeave',
          successfulOutcomes: [
            new Result({ result: 'overworld', weight: 1 }),
          ],
        }),
      ],
    });
  }
}



/*
import Stage from "../stage.js";
import Decision from "../decision.js";
import Result from "../result.js";
import Battle from "../battle.js";
import {Spider} from "../entities.js";
import { getRandomArrayElementWeighted } from "../../../utility.js";
import { Diamond, IronOre } from "../items.js";
import { CaveIn } from "./caveIn.js";

export class MineralVein extends Stage{
    constructor(config){
        super({
            name: 'Mineral Vein',
            imageSrc: './assets/media/encounters/mineral-vein.jpg',
            decisionArray: config.decisionArray || [
                {
                    description: 'Mine the mineral vein. [STR]',
                    attributes: ['strength'],
                    successThreshold: 12,
                    roll: true,
                    successfulOutcomes: [
                        {
                            result: 'retry',
                            createLoot: (partyLevel, biome)=>{
                                return [new IronOre()];
                            },
                            xpReward: 2, 
                            weight: 4,
                        },
                        {
                            result: 'retry',
                            createLoot: (partyLevel, biome)=>{
                                return [new Diamond()];
                            },
                            xpReward: 10, 
                            weight: 1,
                        },
                    ],
                    negativeOutcomes: [
                        {
                            result: 'complete',
                            messageFunction: (currentCharacter)=>{
                                return `The mineal vein appears to be empty.`
                            }, 
                            weight: 2,
                        },
                        {
                            result: 'retry',
                            messageFunction: (currentCharacter)=>{
                                return `${currentCharacter.name} mines only worthless stone.`
                            }, 
                            weight: 3,
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
                            messageFunction: (currentCharacter)=>{
                                return `While digging, ${currentCharacter.name} breaks into a spider's nest!`
                            }, 
                            weight: 1,
                        },
                        {
                            result: 'nextStage',
                            imageSrc: './assets/media/encounters/cave-in.jpg',
                            messageFunction: (currentCharacter)=>{
                                return `The ceiling collapses on ${currentCharacter.name}!`
                            },
                            createNextStage: (partyLevel, biome)=>{
                                return new CaveIn({});
                            },
                            onActivate(target){
                                target.currentHP = 1;
                            },
                            weight: 1,
                        },
                    ], 
                    messageFunction: (currentCharacter)=>{
                        return `${currentCharacter.name} mines at the mineral vein.`
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
                        return `${currentCharacter.name} leaves the mineral vein.`
                    }, 
                },
            ],
        })
    }
    messageFunction(currentCharacter){
        return `${currentCharacter.name} spots a mineral vein ahead.`;
    }
}
*/