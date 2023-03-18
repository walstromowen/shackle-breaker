import {Struggle} from "./abilities.js";
import {controller as theController} from "./main.js";

class StatusEffect{
    update(type, statusArrayIndex){ 
        if(this.currentCharges > 0){
            switch(type){ //not firing on first pounce
                case "start": 
                    this.onStartTurn();
                    return true;
                case "end":
                    this.onEndTurn();
                    return true;
            }
        }
        else{
            this.onRemove(statusArrayIndex);
            return false;
        }
    }
    onStartTurn(){
       
    }
    onEndTurn(){
      
    }
    onRemove(statusArrayIndex){
        
    }
    checkDamage(damage, target){;
        if(damage < 0){
            return 0;
        }
        if(target.currentHP - damage< 0){
            return target.currentHP;
        }
        else{
            return damage;
        }
    }
}
export class Sheilded extends StatusEffect{//curently has bug where if your next attack is first the reinfored effect is still apllied but it acually makes and interesting game mechanic
    constructor(holder){
        super();
        this.name = "sheilded";
        this.holder = holder;
        this.maxCharges = 1;
        this.currentCharges = this.maxCharges;
    }
    onEndTurn(){
        this.holder.currentArmor = this.holder.currentArmor + 5;
        this.currentCharges = this.currentCharges - 1;
    }
    onRemove(statusArrayIndex){
        this.holder.currentArmor = this.holder.currentArmor - 5;
        this.holder.statusArray.splice(statusArrayIndex, 1);
    }
}

export class Bound extends StatusEffect{
    constructor(holder){
        super();
        this.name = "bound";
        this.holder = holder;
        this.maxCharges = 2;
        this.currentCharges = this.maxCharges;
    }
    onStartTurn(){
        if(Math.random()*3 > 2){
            this.holder.nextMove = new Struggle;
        }
        this.currentCharges = this.currentCharges - 1;
    }
    onRemove(statusArrayIndex){
        this.holder.statusArray.splice(statusArrayIndex, 1);
    }
}

export class Posioned extends StatusEffect{
    constructor(holder){
        super();
        this.name = "posioned";
        this.holder = holder;
        this.maxCharges = 10;
        this.currentCharges = this.maxCharges;
        this.serverityMultiplier = 0.1;
    }
    onEndTurn(){
        let damageOutput = Math.floor(this.holder.maxHP*this.serverityMultiplier);
        damageOutput = this.checkDamage(damageOutput, this.holder);
        this.serverityMultiplier = this.serverityMultiplier + 0.01;
        this.holder.currentHP = this.holder.currentHP - damageOutput;
        theController.gameConsole.innerHTML += `<p>${this.holder.name} suffers ${damageOutput} posion damage!</p>`;
        theController.scrollToBottom("game-console");
        this.currentCharges = this.currentCharges - 1;
    }
    onRemove(statusArrayIndex){
        this.holder.statusArray.splice(statusArrayIndex, 1);
    }
}

export class Burned extends StatusEffect{
    constructor(holder){
        super();
        this.name = "burned";
        this.holder = holder;
        this.maxCharges = 3;
        this.currentCharges = this.maxCharges;
        this.serverityMultiplier = 0.3;
    }
    onEndTurn(){
        let damageOutput = Math.floor(this.holder.maxHP*this.serverityMultiplier);
        damageOutput = this.checkDamage(damageOutput, this.holder);
        this.serverityMultiplier = this.serverityMultiplier - 0.1;
        this.holder.currentHP = this.holder.currentHP - damageOutput;
        theController.gameConsole.innerHTML += `<p>${this.holder.name} suffers ${damageOutput} burn damage!</p>`;
        theController.scrollToBottom("game-console");
        this.currentCharges = this.currentCharges - 1;
    }
    onRemove(statusArrayIndex){
        this.holder.statusArray.splice(statusArrayIndex, 1);
    }
}