export class Decision{
    constructor(name, message, decisionAttribute, rewardArray, consequenceArray){
        this.name = name;
        this.message = message;
        this.decisionAttribute = decisionAttribute;
        this.rewardArray = rewardArray;
        this.consequenceArray = consequenceArray;
    }
    activate(player){
        if(this.checkSuccess(player, this.decisionAttribute) == true){ 
            setTimeout(()=>{
                this.rewardArray[Math.floor(Math.random()*this.rewardArray.length)]();
            }, 2000);
        }else{
            setTimeout(()=>{
                this.consequenceArray[Math.floor(Math.random()*this.consequenceArray.length)]();
            }, 2000);
        }
    }
    checkSuccess(player, decisionAttribute){
        let multiplier = 0;
        switch(decisionAttribute){
            case "certain":
                return true;
            case "likely":
                decisionAttribute = 12;
                break;
            case "neutral":
                decisionAttribute = 8;
                break;
            case "unlikely":
                decisionAttribute = 6;
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