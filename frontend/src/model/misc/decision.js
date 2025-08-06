import Result from "./result.js";

export default class Decision{
    constructor(config){
        this.description = config.description || '';
        this.option = config.option || null;
        this.attributes = config.attributes || ['none'];
        this.weight = config.weight || 1;
        this.successThreshold = config.successThreshold || null;
        this.roll = config.roll || false;
        this.requiredItems = config.requiredItems || null;
        this.goldCost = config.goldCost || null;
        this.successfulOutcomes = config.successfulOutcomes || [];
        this.negativeOutcomes = config.negativeOutcomes || [];
        this.messageKey = config.messageKey || null;
    }
    toSaveObject() {
        return {
            description: this.description,
            option: this.option,
            attributes: this.attributes,
            weight: this.weight,
            successThreshold: this.successThreshold,
            roll: this.roll,
            requiredItems: this.requiredItems,
            goldCost: this.goldCost,
            successfulOutcomes: this.successfulOutcomes.map(outcome => outcome.toSaveObject()),
            negativeOutcomes: this.negativeOutcomes.map(outcome => outcome.toSaveObject()),
            messageKey: this.messageKey,
        };
    }
    static fromSaveObject(decisionData){
        let decisionConfig = {
            ...decisionData,
            successfulOutcomes: decisionData.successfulOutcomes.map((resultData)=>{return Result.fromSaveObject(resultData)}),
            negaitveOutcomes: decisionData.negaitveOutcomes ? decisionData.negaitveOutcomes.map((resultData)=>{return Result.fromSaveObject(resultData)}) : [],
        }
    }
}