import Stage from "../stage.js";
import Decision from "../decision.js";
import Result from "../result.js";

export class DeepDarkness extends Stage {
    constructor(config) {
        super({
            name: "Deep Darkness",
            musicSrc: "./assets/audio/musicTracks/dark-suspense-anxious-eerie-dramatic-music-207620.mp3",
            imageSrc: "./assets/media/encounters/deep-darkness.jpg",
            messageKey: "deepDarknessStage",
            decisionArray: config.decisionArray || [
                new Decision({
                    description: "Proceed through the darkness.",
                    attributes: ["none"],
                    successThreshold: 12,
                    roll: true,
                    messageKey: "deepDarknessProceedPathMessage",
                    successfulOutcomes: [
                        new Result({
                            result: "nextStage",
                            createNextStageKey: "deepDarkness2",
                            xpReward: 5,
                            weight: 1,
                        }),
                    ],
                    negativeOutcomes: [
                        new Result({
                            result: "battle",
                            musicSrc: "./assets/audio/musicTracks/pred-and-prey.mp3",
                            createBattleKey: "deepDarknessBattle",
                            createNextStageKey: "deepDarkness2",
                            messageKey: "deepDarknessEnemyApproach",
                            weight: 1,
                        }),
                        new Result({
                            result: "nextStage",
                            onActivateKey: "physicalDefenseDebuffApply",
                            createNextStageKey: "deepDarkness2",
                            messageKey: "deepDarknessFear",
                            weight: 1,
                        }),
                    ],
                }),
                new Decision({
                    description: "Gaze into the darkness. [ATN]",
                    attributes: ["attunement"],
                    successThreshold: 16,
                    roll: true,
                    messageKey: "deepDarknessGaze",
                    successfulOutcomes: [
                        new Result({
                            result: "nextStage",
                            createNextStageKey: "deepDarkness2",
                            xpReward: 5,
                            weight: 1,
                        }),
                    ],
                    negativeOutcomes: [
                        new Result({
                            result: "battle",
                            musicSrc: "./assets/audio/musicTracks/pred-and-prey.mp3",
                            createBattleKey: "deepDarknessBattle",
                            createNextStageKey: "deepDarkness2",
                            messageKey: "deepDarknessEnemyApproach",
                            weight: 1,
                        }),
                        new Result({
                            result: "nextStage",
                            onActivateKey: "physicalDefenseDebuffApply",
                            createNextStageKey: "deepDarkness2",
                            messageKey: "deepDarknessFear",
                            weight: 1,
                        }),
                    ],
                }),
                new Decision({
                    description: "Light a torch. [Torch]",
                    requiredItems: ["torch"],
                    messageKey: "deepDarknessTorchMessage",
                    successfulOutcomes: [
                        new Result({
                            result: "nextStage",
                            createNextStageKey: "deepDarkness3",
                            xpReward: 5,
                            weight: 1,
                        }),
                    ],
                }),
                new Decision({
                    description: "Switch character",
                    successfulOutcomes: [{ result: "switchCharacter", weight: 1 }],
                }),
                new Decision({
                    description: "Leave",
                    successfulOutcomes: [{ result: "overworld", weight: 1 }],
                    messageKey: "turnBack",
                }),
            ],
        });
    }
}

export class DeepDarkness2 extends Stage {
    constructor(config) {
        super({
            name: "Deep Darkness",
            musicSrc: "./assets/audio/musicTracks/dark-suspense-anxious-eerie-dramatic-music-207620.mp3",
            imageSrc: "./assets/media/encounters/deep-darkness-2.jpg",
            messageKey: "deepDarkness2Stage",
            decisionArray: config.decisionArray || [
                new Decision({
                    description: "Proceed through the darkness.",
                    attributes: ["none"],
                    successThreshold: 12,
                    roll: true,
                    messageKey: "deepDarknessProceedPathMessage",
                    successfulOutcomes: [
                        new Result({
                            result: "nextStage",
                            createNextStageKey: "deepDarkness2",
                            xpReward: 5,
                            weight: 1,
                        }),
                    ],
                    negativeOutcomes: [
                        new Result({
                            result: "battle",
                            musicSrc: "./assets/audio/musicTracks/pred-and-prey.mp3",
                            createBattleKey: "deepDarknessBattle",
                            createNextStageKey: "deepDarkness3",
                            messageKey: "deepDarknessEnemyApproach",
                            weight: 1,
                        }),
                        new Result({
                            result: "nextStage",
                            onActivateKey: "physicalDefenseDebuffApply",
                            createNextStageKey: "deepDarkness3",
                            messageKey: "deepDarknessFear",
                            weight: 1,
                        }),
                    ],
                }),
                new Decision({
                    description: "Gaze into the darkness. [ATN]",
                    attributes: ["attunement"],
                    successThreshold: 12,
                    roll: true,
                    messageKey: "deepDarknessGaze",
                    successfulOutcomes: [
                        new Result({
                            result: "nextStage",
                            createNextStageKey: "deepDarkness2",
                            xpReward: 5,
                            weight: 1,
                        }),
                    ],
                    negativeOutcomes: [
                        new Result({
                            result: "battle",
                            musicSrc: "./assets/audio/musicTracks/pred-and-prey.mp3",
                            createBattleKey: "deepDarknessBattle",
                            createNextStageKey: "deepDarkness2",
                            messageKey: "deepDarknessEnemyApproach",
                            weight: 1,
                        }),
                        new Result({
                            result: "nextStage",
                            onActivateKey: "physicalDefenseDebuffApply",
                            createNextStageKey: "deepDarkness2",
                            messageKey: "deepDarknessFear",
                            weight: 1,
                        }),
                    ],
                }),
                new Decision({
                    description: "Light a torch. [Torch]",
                    requiredItems: ["torch"],
                    messageKey: "deepDarknessTorchMessage",
                    successfulOutcomes: [
                        new Result({
                            result: "nextStage",
                            createNextStageKey: "deepDarkness3",
                            xpReward: 5,
                            weight: 1,
                        }),
                    ],
                }),
                new Decision({
                    description: "Switch character",
                    successfulOutcomes: [{ result: "switchCharacter", weight: 1 }],
                }),
                new Decision({
                    description: "Leave",
                    successfulOutcomes: [{ result: "overworld", weight: 1 }],
                    messageKey: "turnBack",
                }),
            ],
        });
    }
}

export class DeepDarkness3 extends Stage {
    constructor(config) {
        super({
            name: 'Deep Darkness',
            musicSrc: "./assets/audio/musicTracks/dark-suspense-anxious-eerie-dramatic-music-207620.mp3",
            imageSrc: './assets/media/encounters/deep-darkness-3.jpg',
            messageKey: 'deepDarkness3Stage',
            decisionArray: config.decisionArray || [
                new Decision({
                    description: "Proceed to the doorway.",
                    attributes: ["none"],
                    successThreshold: 12,
                    roll: true,
                    messageKey: "deepDarknessProceedPathMessage",
                    successfulOutcomes: [
                        new Result({
                            result: "nextStage",
                            createNextStageKey: "ancientRuinsEntrance",
                            xpReward: 5,
                            weight: 1,
                        }),
                    ],
                    negativeOutcomes: [
                        new Result({
                            result: "battle",
                            musicSrc: "./assets/audio/musicTracks/pred-and-prey.mp3",
                            createBattleKey: "deepDarknessBattle",
                            createNextStageKey: "deepDarkness3",
                            messageKey: "deepDarknessEnemyApproach",
                            weight: 1,
                        }),
                        new Result({
                            result: "nextStage",
                            onActivateKey: "physicalDefenseDebuffApply",
                            createNextStageKey: "ancientRuinsEntrance",
                            messageKey: "deepDarknessFear",
                            weight: 1,
                        }),
                    ],
                }),
                new Decision({
                    description: "Gaze into the darkness. [ATN]",
                    attributes: ["attunement"],
                    successThreshold: 12,
                    roll: true,
                    messageKey: "deepDarknessGaze",
                    successfulOutcomes: [
                        new Result({
                            result: "nextStage",
                            createNextStageKey: "deepDarkness2",
                            xpReward: 5,
                            weight: 1,
                        }),
                    ],
                    negativeOutcomes: [
                        new Result({
                            result: "battle",
                            musicSrc: "./assets/audio/musicTracks/pred-and-prey.mp3",
                            createBattleKey: "deepDarknessBattle",
                            createNextStageKey: "ancientRuinsEntrance",
                            messageKey: "deepDarknessEnemyApproach",
                            weight: 1,
                        }),
                        new Result({
                            result: "nextStage",
                            onActivateKey: "physicalDefenseDebuffApply",
                            createNextStageKey: "ancientRuinsEntrance",
                            messageKey: "deepDarknessFear",
                            weight: 1,
                        }),
                    ],
                }),
                new Decision({
                    description: "Light a torch. [Torch]",
                    requiredItems: ["torch"],
                    messageKey: "deepDarknessTorchMessage",
                    successfulOutcomes: [
                        new Result({
                            result: "nextStage",
                            createNextStageKey: "deepDarkness3",
                            xpReward: 5,
                            weight: 1,
                        }),
                    ],
                }),
                new Decision({
                    description: "Switch character",
                    successfulOutcomes: [{ result: "switchCharacter", weight: 1 }],
                }),
                new Decision({
                    description: "Leave",
                    successfulOutcomes: [{ result: "overworld", weight: 1 }],
                    messageKey: "turnBack",
                }),
            ],
        });
    }
}

export class AncientRuinsEntrance extends Stage {
  constructor(config) {
    super({
      name: 'Ancient Ruins Entrance',
      musicSrc: "./assets/audio/musicTracks/dark-suspense-anxious-eerie-dramatic-music-207620.mp3",
      imageSrc: './assets/media/encounters/ancient-ruins.jpg',
      messageKey: 'ancientRuinsEntrance',
      decisionArray: config.decisionArray || [
        new Decision({
          description: 'Enter the ruins.',
          messageKey: 'ancientRuinsEntranceEnterRuins',
          successfulOutcomes: [
            new Result({
              result: 'battle',
              imageSrc: './assets/media/entities/inferior-lord-2.jpg',
              musicSrc: "./assets/audio/musicTracks/suspense-mysterious-trailor-music-foggy-forest-et11lx-157726.mp3",
              createBattleKey: 'inferiorLordsBattle',
              messageKey: 'ancientRuinsEntranceInferiorLordPlea',
              weight: 1,
            }),
          ],
        }),
        new Decision({
          description: 'Leave',
          messageKey: 'leave',
          successfulOutcomes: [new Result({ result: 'complete', weight: 1 })],
        }),
      ],
    });
  }
}