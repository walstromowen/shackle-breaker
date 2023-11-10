export class Decision{
    constructor(name, messageFunction, decisionAttribute, rewardArray, consequenceArray){
        this.name = name;
        this.messageFunction = messageFunction;
        this.decisionAttribute = decisionAttribute;
        this.rewardArray = rewardArray;
        this.consequenceArray = consequenceArray;
        this.message = "";
    }
    activate(currentCharacter){
        this.messageFunction();
        if(this.checkSuccess(currentCharacter, this.decisionAttribute) == true){ 
            setTimeout(()=>{
                this.rewardArray[Math.floor(Math.random()*this.rewardArray.length)]();
            }, 2000);
        }else{
            setTimeout(()=>{
                this.consequenceArray[Math.floor(Math.random()*this.consequenceArray.length)]();
            }, 2000);
        }
    }
    checkSuccess(currentCharacter, decisionAttribute){
        let multiplier = 0;
        switch(decisionAttribute){
            case "certain":
                return true;
            case "likely":
                decisionAttribute = 20;
                break;
            case "neutral":
                decisionAttribute = 8;
                break;
            case "unlikely":
                decisionAttribute = 6;
                break;
            case "vigor":
                decisionAttribute = currentCharacter.vigor;
                break;
            case "endurance":
                decisionAttribute = currentCharacter.endurance;
                break;
            case "strength":
                decisionAttribute = currentCharacter.strength;
                break;
            case "dexterity":
                decisionAttribute = currentCharacter.dexterity;
                break;
            case "insight":
                decisionAttribute = currentCharacter.insight;
                break;
            case "focus":
                decisionAttribute = currentCharacter.focus;
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