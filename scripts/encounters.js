import {Loot, MoveOn, Assassinate, ForceOpen, PickLock, LookForKey} from "./encounterDecisions.js";
import {LootChest, OpenChestArrowTrap, OpenChestAttractEnemy, SucessfulAltusAssasination, FailedAltusAssasination} from "./encounterResults.js";

class Encounter{
    makeDecision(player, decisionArrayIndex){
        let reward = Math.floor(Math.random() * this.rewardsArray.length);
        reward = this.rewardsArray[reward];
        let consequence = Math.floor(Math.random() * this.consequencesArray.length);
        consequence = this.consequencesArray[consequence];
        let followingEncounter = this.followingEncounter;
        this.decisionArray[decisionArrayIndex].activate(player, followingEncounter, reward, consequence);
    }
}
export class LockedTreasureChest extends Encounter{
    constructor(){
        super();
        this.name = "locked treasure chest";
        this.message = "A large chest sits all alone. It appears to be locked tight...";
        this.imageSrc = "./media/treasureChestLocked.jpg";
        this.decisionArray = [new MoveOn(), new ForceOpen(), new PickLock(), new LookForKey()];
        this.followingEncounter = new OpenTreasureChest();
        this.rewardsArray = [];
        this.consequencesArray = [new OpenChestArrowTrap(), new OpenChestAttractEnemy()];
    }
}
export class OpenTreasureChest extends Encounter{
    constructor(){
        super();
        this.name = "open treasure chest";
        this.message = "A large chest sits all alone. It is unlocked...";
        this.imageSrc = "./media/treasureChestLocked.jpg";
        this.decisionArray = [new MoveOn(), new Loot()];
        this.followingEncounter = "";
        this.rewardsArray = [];
        this.consequencesArray = [new OpenChestArrowTrap(), new OpenChestAttractEnemy()];
    }
}
export class AltusAmbushOpportunity extends Encounter{
    constructor(){
        super();
        this.name = "ambush opportunity";
        this.message = "An official of the Altus Kingdom appears to be seperated from his escort nearby, this could prove an fortuneous opportunity...";
        this.imageSrc = "./media/kurty.jpg";
        this.decisionArray = [new MoveOn(), new Assassinate()];
        this.followingEncounter = "";
        this.rewardsArray =  [new SucessfulAltusAssasination()];
        this.consequencesArray = [new FailedAltusAssasination()];
    }
}