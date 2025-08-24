import Stage from "../stage.js";
import Decision from "../decision.js";
import Result from "../result.js";

export class WoundedMutt extends Stage {
    constructor(config) {
        super({
            name: 'Wounded Mutt',
            imageSrc: './assets/media/encounters/wounded-mutt.jpg',
            messageKey: 'woundedMuttIntro',
            decisionArray: config.decisionArray || [
                new Decision({
                    description: 'Bandage the Wounded Mutt. [Bandage]',
                    requiredItems: ['bandage'],
                    attributes: ['none'],
                    successThreshold: 12,
                    roll: true,
                    messageKey: 'woundedMuttBandageAttempt',
                    successfulOutcomes: [
                        new Result({
                            result: 'recruit',
                            createRecruitKey: 'dog',
                            onActivateKey: 'reduceCorruption5Percent',
                            messageKey: 'woundedMuttNuzzle',
                            weight: 1,
                        }),
                    ],
                    negativeOutcomes: [
                        new Result({
                            result: 'battle',
                            musicSrc: "./assets/audio/musicTracks/pred-and-prey.mp3",
                            createBattleKey: 'woundedMuttTransformation',
                            messageKey: 'woundedMuttTransformation',
                            weight: 1,
                        }),
                        new Result({
                            result: "retry",
                            messageKey: "woundedMuttBandageRetry",
                            weight: 1,
                        }),
                        new Result({
                            result: "complete",
                            messageKey: "woundedMuttBandageDeath",
                            weight: 1,
                        }),
                    ],
                }),
                new Decision({
                    description: 'Switch character',
                    successfulOutcomes: [
                        new Result({ result: 'switchCharacter', weight: 1 })
                    ]
                }),
                new Decision({
                    description: 'Leave',
                    messageKey: 'leave',
                    successfulOutcomes: [
                        new Result({ result: 'complete', weight: 1 })
                    ]
                })
            ]
        });
    }
}