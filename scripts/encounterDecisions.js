import{Leave} from "./encounterResults.js";

class Decision{
    activate(player, reward, consequence){
        if(this.checkSuccess(player, this.decisionAttribute) == true){
            reward.trigger(player);
        }else{
            consequence.trigger(player);
        }
    }
    checkSuccess(player, decisionAttribute){
        switch(decisionAttribute){
            case "none":
                if(Math.floor(Math.random()*2) == 1){
                    return true;
                }else{
                    return false;
                }
        }
    }
}

export class Loot extends Decision{
    constructor(){
        super();
        this.name = "loot";
        this.decisionAttribute = "none";
    }
}
export class MoveOn extends Decision{
    constructor(){
        super();
        this.name = "move on";
        this.decisionAttribute = "none";
    }
    activate(player, reward, consequence){
        new Leave().trigger(player);
    }
}