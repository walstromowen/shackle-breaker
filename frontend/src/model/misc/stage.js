import Decision from "./decision.js";

import { Entity } from "./entities.js";

export default class Stage{
    constructor(config){
        this.entity = config.entity || null;
        this.name = config.name;
        this.imageSrc = config.imageSrc || null;
        this.musicSrc = config.musicSrc || null;
        this.decisionArray = config.decisionArray;
        this.messageKey = config.messageKey || null;
    }
    toSaveObject(){
        return {
            entity: this.entity ? this.entity.toSaveObject() : null,
            name: this.name,
            imageSrc: this.imageSrc,
            musicSrc: this.musicSrc,
            decisionArray: this.decisionArray.map(decision => (decision.toSaveObject())),
            messageKey: this.messageKey,
        }
    }
    static async fromSaveObject(stageData, stageRegistry){
        let stageConfig = {
            ...stageData,
            entity: stageData.entity ? Entity.fromSaveObject(stageData.entity) : null,
            decisionArray: stageData.decisionArray.map((decisionData)=>{return Decision.fromSaveObject(decisionData)}),
        }
        return stageRegistry[stageData.name](stageConfig)
    }
}