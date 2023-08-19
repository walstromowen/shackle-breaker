import {Loot} from "./encounterDecisions.js";
class Encounter{
    constructor(rewardsArray, consequencesArray){
        this.rewardsArray = rewardsArray;
        this.consequencesArray = consequencesArray;
    }
    makeDecision(player, decisionArrayIndex){
        let reward = Math.floor(Math.random() * this.rewardsArray.length);
        reward = this.rewardsArray[reward];
        let consequence = Math.floor(Math.random() * this.consequencesArray.length);
        consequence = this.consequencesArray[consequence];
        this.decisionArray[decisionArrayIndex].activate(player, reward, consequence);
    }
}
export class TreasureChest extends Encounter{
    constructor(rewardsArray, consequencesArray){
        super(rewardsArray, consequencesArray);
        this.name = "treasure chest";
        this.message = "you see a large chest filled to the brim with loot. It seems a shame to just leave it there...";
        this.imageSrc = "./media/kurty.jpg";
        this.decisionArray = [new Loot()];
    }
}