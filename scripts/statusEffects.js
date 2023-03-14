import {Struggle} from "./abilities.js";

export class Reinforced{
    constructor(holder){
        this.name = "reinforced";
        this.holder = holder;
        this.maxCharges = 1;
        this.currentCharges = this.maxCharges;
        this.type = "buff";
    }
    checkCharges(){
        if(this.currentCharges > 0 && this.holder.isTurn == false){
            this.applyEffect();
        }else
            this.holder.currentArmor = this.holder.currentArmor - 5;
            this.holder.statusArray.splice(this, 1);
        }
    applyEffect(){
        console.log(this.currentCharges);
        this.currentCharges = this.currentCharges - 1;
        this.holder.currentArmor = this.holder.currentArmor + 5;
    }
}

export class Bound{
    constructor(holder){
        this.name = "bound";
        this.holder = holder;
        this.maxCharges = 2;
        this.currentCharges = this.maxCharges;
        this.type = "debuff";
    }
    checkCharges(){
        if(this.currentCharges > 0 && this.holder.isTurn == true){
            this.applyEffect();
        }else
            this.holder.statusArray.splice(this, 1);
        }
    applyEffect(){
        this.currentCharges = this.currentCharges - 1;
        this.holder.nextMove = new Struggle;
    }
}