import {Loot, MoveOn, Trade, Assassinate, ForceOpen, PickLock, LookForKey,
        ChooseRune} from "./encounterDecisions.js";
import {LootChest, OpenChestArrowTrap, OpenChestAttractEnemy, SucessfulAltusAssasination, FailedAltusAssasination, UnlockTreasureChest, MysteriousDoorCollapses,
        BreakSealMysteriousDoor1, BreakSealMysteriousDoor2, BreakSealMysteriousDoor3} from "./encounterResults.js";
class Encounter{
    makeDecision(player, decisionArrayIndex){
        let reward = Math.floor(Math.random() * this.rewardsArray.length);
        reward = this.rewardsArray[reward];
        let consequence = Math.floor(Math.random() * this.consequencesArray.length);
        consequence = this.consequencesArray[consequence];
        this.decisionArray[decisionArrayIndex].activate(player, reward, consequence);
    }
}
export class LockedTreasureChest extends Encounter{
    constructor(){
        super();
        this.name = "locked treasure chest";
        this.message = "A large chest sits all alone. It appears to be locked tight...";
        this.imageSrc = "./media/treasureChestLocked.jpg";
        this.decisionArray = [new MoveOn(), new ForceOpen(), new PickLock(), new LookForKey()];
        this.rewardsArray = [new UnlockTreasureChest()];
        this.consequencesArray = [new OpenChestAttractEnemy()];
    }
}
export class UnlockedTreasureChest extends Encounter{
    constructor(){
        super();
        this.name = "unlocked treasure chest";
        this.message = "A large chest sits all alone. It is unlocked...";
        this.imageSrc = "./media/treasureChestLocked.jpg";
        this.decisionArray = [new MoveOn(), new Loot()];
        this.rewardsArray = [new LootChest()];
        this.consequencesArray = [new LootChest(), new OpenChestArrowTrap()];
    }
}
export class AltusAmbushOpportunity extends Encounter{
    constructor(){
        super();
        this.name = "ambush opportunity";
        this.message = "An official of the Altus Kingdom appears to be seperated from his escort nearby, this could prove an fortuneous opportunity...";
        this.imageSrc = "./media/altus-ambush-opportunity.jpg";
        this.decisionArray = [new MoveOn(), new Assassinate()];
        this.rewardsArray =  [new SucessfulAltusAssasination()];
        this.consequencesArray = [new FailedAltusAssasination()];
    }
}
export class MysteriousDoor1 extends Encounter{
    constructor(){
        super();
        this.name = "a mysterious door";
        this.message = "A mysterious door stands at the end of the passage. A faint light appears to emit from the door...";
        this.imageSrc = "./media/mysterious-door.jpg";
        let characters =["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
        let rand1 = Math.floor(Math.random()*26);
        let rune1 = new ChooseRune(characters[rand1]);
        characters.splice(characters.indexOf(rand1));
        let rand2 = Math.floor(Math.random()*25);
        let rune2 = new ChooseRune(characters[rand2]);
        characters.splice(characters.indexOf(rand2));
        let rand3 = Math.floor(Math.random()*24);
        let rune3 = new ChooseRune(characters[rand3]);
        characters.splice(characters.indexOf(rand3));
        this.decisionArray = [new MoveOn(), rune1, rune2, rune3];
        this.rewardsArray =  [new BreakSealMysteriousDoor1(), new BreakSealMysteriousDoor2(), new BreakSealMysteriousDoor3()];
        this.consequencesArray = [new MysteriousDoorCollapses()];
    }
}
export class MysteriousDoor2 extends Encounter{
    constructor(){
        super();
        this.name = "a mysterious door";
        this.message = "The door glows with magical energy...";
        this.imageSrc = "./media/mysterious-door.jpg";
        let characters =["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]
        let rand1 = Math.floor(Math.random()*26);
        let rune1 = new ChooseRune(characters[rand1]);
        characters.splice(characters.indexOf(rand1));
        let rand2 = Math.floor(Math.random()*25);
        let rune2 = new ChooseRune(characters[rand2]);
        characters.splice(characters.indexOf(rand2));
        let rand3 = Math.floor(Math.random()*24);
        let rune3 = new ChooseRune(characters[rand3]);
        characters.splice(characters.indexOf(rand3));
        this.decisionArray = [new MoveOn(), rune1, rune2, rune3];
        this.rewardsArray =  [new BreakSealMysteriousDoor2(), new BreakSealMysteriousDoor3()];
        this.consequencesArray = [new MysteriousDoorCollapses()];
    }
}
export class MysteriousDoor3 extends Encounter{
    constructor(){
        super();
        this.name = "a mysterious door";
        this.message = "The door trembles violently and radiates light in all directions!...";
        this.imageSrc = "./media/mysterious-door.jpg";
        let characters =["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]
        let rand1 = Math.floor(Math.random()*26);
        let rune1 = new ChooseRune(characters[rand1]);
        characters.splice(characters.indexOf(rand1));
        let rand2 = Math.floor(Math.random()*25);
        let rune2 = new ChooseRune(characters[rand2]);
        characters.splice(characters.indexOf(rand2));
        let rand3 = Math.floor(Math.random()*24);
        let rune3 = new ChooseRune(characters[rand3]);
        characters.splice(characters.indexOf(rand3));
        this.decisionArray = [new MoveOn(), rune1, rune2, rune3];
        this.rewardsArray =  [new BreakSealMysteriousDoor3()];
        this.consequencesArray = [new MysteriousDoorCollapses()];
    }
}
export class TravelingMerchant extends Encounter{
    constructor(){
        super();
        this.name = "traveling merchant";
        this.message = "a traveling merchant hails you...";
        this.imageSrc = "./media/kurty.jpg";
        this.decisionArray = [new MoveOn(), new Trade()];
        this.rewardsArray = [];
        this.consequencesArray = [];
    }
}