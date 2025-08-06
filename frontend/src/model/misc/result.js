import { Entity } from "./entities.js";

export default class Result{
    constructor(config){
        this.name = config.name || 'Result'
        this.result = config.result || 'nextStage';
        this.entity = config.entity || null;
        this.xpReward = config.xpReward || 5;
        this.milestone = config.milestone || null;
        this.weight = config.weight || 1;
        this.imageSrc = config.imageSrc || null;
        this.musicSrc = config.musicSrc || null;
        this.messageKey = config.messageKey || null;
        this.removableDecisions = config.removableDecisions || null;
        this.nextMap = config.nextMap || null;//this is just a string whew
        this.createNextStageKey = config.createNextStageKey || null;
        this.createBattleKey = config.createBattleKey || null;
        this.createLootKey = config.createLootKey || null;
        this.createRecruitKey = config.createRecruitKey || null;
        this.onActivateKey = config.onActivateKey || null;
    }
    toSaveObject() {
        return {
            name: this.name,
            result: this.result,
            entity: this.entity ? this.entity.toSaveObject() : null,
            xpReward: this.xpReward,
            milestone: this.milestone,
            weight: this.weight,
            imageSrc: this.imageSrc,
            musicSrc: this.musicSrc,
            messageKey: this.messageKey,
            removableDecisions: this.removableDecisions,
            nextMap: this.nextMap,
            createNextStageKey: this.createNextStageKey,
            createBattleKey: this.createBattleKey,
            createLootKey: this.createLootKey,
            createRecruitKey: this.createRecruitKey,
            onActivateKey: this.onActivateKey
        };
    }
    static fromSaveObject(resultData){
        let resultConfig = {
            ...resultData,
            entity: resultData.entity ? Entity.fromSaveObject(resultData.Entity) : null,
        }
        return new Result(resultConfig);
    }
}