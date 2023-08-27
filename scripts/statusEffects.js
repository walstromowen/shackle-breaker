import {Struggle} from "./abilities.js";
import {controller as theController} from "./main.js"

class StatusEffect{
    update(type){ 
        if(type == "start"){ 
            this.onStartTurn();
        }else{
            this.onEndTurn();
        }
    }
    
    onStartTurn(){
        //theController.printToGameConsole`${this.name} skipped on ${this.holder.name}`);
    }
    onEndTurn(){
        //theController.printToGameConsole(`${this.name} skipped on ${this.holder.name}`);
    }
    onRemove(){
        
    }
    checkDamage(damage, target){
        if(damage < 0){
            return 0;
        }
        if(target.currentHP - damage< 0){
            theController.animateVitalBar(target, "health");
            return target.currentHP;
        }
        else{
            theController.animateVitalBar(target, "health");
            return damage;
        }
    }
}
export class Sheilded extends StatusEffect{//curently has bug where if your next attack is first the reinfored effect is still apllied but it acually makes and interesting game mechanic
    constructor(holder){
        super();
        this.type = "end";
        this.name = "sheilded";
        this.holder = holder;
        this.maxCharges = 1;
        this.currentCharges = this.maxCharges;
    }
    onEndTurn(){
        this.holder.currentBluntDefense = this.holder.currentBluntDefense + 5;
        this.holder.currentPierceDefense = this.holder.currentPierceDefense + 5;
        this.holder.currentArcaneDefense = this.holder.currentArcaneDefense + 5;
        this.holder.currentElementalDefense = this.holder.currentElementalDefense + 5;
        theController.printToGameConsole(`${this.holder.name} is Sheilded!`);
        this.currentCharges = this.currentCharges - 1;
    }
    onStartTurn(){
        this.holder.currentBluntDefense = this.holder.currentBluntDefense - 5;
        this.holder.currentPierceDefense = this.holder.currentPierceDefense - 5;
        this.holder.currentArcaneDefense = this.holder.currentArcaneDefense - 5;
        this.holder.currentElementalDefense = this.holder.currentElementalDefense - 5;
    }
}
export class Bound extends StatusEffect{
    constructor(holder){
        super();
        this.type = "start";
        this.name = "bound";
        this.holder = holder;
        this.maxCharges = 3;
        this.currentCharges = this.maxCharges;
    }
    onStartTurn(){
        if(Math.random()*2 < 1){
            this.holder.nextMove = new Struggle;
            this.currentCharges = this.currentCharges - 1;
            theController.printToGameConsole(`${this.holder.name} is bound!`);
        }else{
            this.currentCharges = this.currentCharges = 0;
            theController.printToGameConsole(`${this.holder.name} breaks free!`);
        }
    }
}

export class Poisoned extends StatusEffect{
    constructor(holder){
        super();
        this.type = "end";
        this.name = "poisoned";
        this.holder = holder;
        this.maxCharges = 10;
        this.currentCharges = this.maxCharges;
        this.serverityMultiplier = 0.05;
    }
    onEndTurn(){
        let damageOutput = Math.floor(this.holder.maxHP*this.serverityMultiplier);
        damageOutput = this.checkDamage(damageOutput, this.holder);
        this.serverityMultiplier = this.serverityMultiplier + 0.01;
        this.holder.currentHP = this.holder.currentHP - damageOutput;
        theController.printToGameConsole(`${this.holder.name} suffers ${damageOutput} poison damage!`);
        this.currentCharges = this.currentCharges - 1;
    }
}

export class Burned extends StatusEffect{
    constructor(holder){
        super();
        this.type = "end";
        this.name = "burned";
        this.holder = holder;
        this.maxCharges = 3;
        this.currentCharges = this.maxCharges;
        this.serverityMultiplier = 0.15;
    }
    onEndTurn(){
        let damageOutput = Math.floor(this.holder.maxHP*this.serverityMultiplier);
        damageOutput = this.checkDamage(damageOutput, this.holder);
        if(damageOutput == 0){
            damageOutput = 1;
        }
        this.serverityMultiplier = this.serverityMultiplier - 0.01;
        this.holder.currentHP = this.holder.currentHP - damageOutput;
        theController.printToGameConsole(`${this.holder.name} suffers ${damageOutput} burn damage!`);
        this.currentCharges = this.currentCharges - 1;
    }
}