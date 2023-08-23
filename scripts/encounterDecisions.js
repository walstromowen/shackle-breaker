import{leave} from "./encounterResults.js";

class Decision{
    activate(player, reward, consequence){
        if(this.checkSuccess(player, this.decisionAttribute) == true){  
            reward.trigger(player);
        }else{
            consequence.trigger(player);
        }
    }
    checkSuccess(player, decisionAttribute){
        let multiplier = 0;
        switch(decisionAttribute){
            case "none":
                decisionAttribute = 8;
                break;
            case "vigor":
                decisionAttribute = player.vigor;
                break;
            case "endurance":
                decisionAttribute = player.endurance;
                break;
            case "strength":
                decisionAttribute = player.strength;
                break;
            case "dexterity":
                decisionAttribute = player.dexterity;
                break;
            case "insight":
                decisionAttribute = player.insight;
                break;
            case "focus":
                decisionAttribute = player.focus;
                break;
        }
        if(decisionAttribute < 8){
            multiplier = 1.5;
        }
        if(decisionAttribute >= 8){
            multiplier = 2;
        }
        if(decisionAttribute >= 12){
            multiplier = 3;
        }
        if(decisionAttribute >= 20){
            multiplier = 4;
        }
        if(Math.floor(Math.random()*multiplier) > 0){
            return true;
        }else{
            return false;
        }
    }
}
export class MoveOn extends Decision{
    constructor(){
        super();
        this.name = "move on";
        this.decisionAttribute = "none";
    }
    activate(player, reward, consequence){
        leave(player);
    }
}
export class ForceOpen extends Decision{
    constructor(){
        super();
        this.name = "force open";
        this.decisionAttribute = "strength";
    }
}
export class PickLock extends Decision{
    constructor(){
        super();
        this.name = "pick lock";
        this.decisionAttribute = "dexterity";
    }
}
export class LookForKey extends Decision{
    constructor(){
        super();
        this.name = "look for key";
        this.decisionAttribute = "insight";
    }
}
export class Loot extends Decision{
    constructor(){
        super();
        this.name = "loot";
        this.decisionAttribute = "none";
    }
}
export class Assassinate extends Decision{
    constructor(){
        super();
        this.name = "assassinate";
        this.decisionAttribute = "dexterity";
    }
}
export class ChooseRune extends Decision{
    constructor(message){
        super();
        this.name = message;
        this.decisionAttribute = "none";
    }
}
