import {Struggle} from "./abilities.js";

export class Reinforced{
    constructor(holder){
        this.holder = holder;
        this.turnCounter = 0;
        this.abilityDuration = 2;
        this.type = "buff";
    }
    checkDuration(){
        if(this.turnCounter >= this.abilityDuration){
            this.holder.currentArmor = this.holder.currentArmor - 5;
            this.holder.statusArray.splice(this, 1);
    }else
        this.applyEffect();
    }
    applyEffect(){
        this.holder.currentArmor = this.holder.currentArmor + 5;
    }
}

export class Bound{
    constructor(holder){
        this.holder = holder;
        this.turnCounter = 0;
        this.abilityDuration = 4;
        this.type = "debuff";
    }
    checkDuration(){
        if(this.turnCounter >= this.abilityDuration){
            this.holder.statusArray.splice(this, 1);
    }else
        this.applyEffect();
    }
    applyEffect(){
        this.holder.nextMove = new Struggle;
    }
}