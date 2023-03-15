import {Struggle} from "./abilities.js";

class StatusEffect{
    update(type, statusEffectIndex){
        if(this.currentCharges > 0){
            switch(type){
                case "start":
                    this.onStartTurn();
                    break;
                case "end":
                    this.onEndTurn();
                    break;
            }
        }
        else{
            this.onRemove();
        }
    }
    onStartTurn(){
        console.log(`${this.holder.name} was affected by ${this.name} before its turn`);
        console.log(this.holder.statusArray);
    }
    onEndTurn(){
        console.log(`${this.holder.name} was affected by ${this.name} after its turn`);
        console.log(this.holder.statusArray);
    }
    onRemove(){
        console.log(`${this.name} removed from ${this.holder.name}`);
        holder.statusArray.splice(statusEffectIndex, 1);
    }
}



export class Reinforced extends StatusEffect{
    constructor(holder){
        super();
        this.name = "reinforced";
        this.holder = holder;
        this.maxCharges = 1;
        this.currentCharges = this.maxCharges;
    }
    onEndTurn(){
        console.log(`${this.holder.name} gained 5 armor`);
        this.holder.currentArmor = this.holder.currentArmor + 5;
        this.currentCharges =  this.currentCharges - 1;
        console.log(this.holder.statusArray);
    }
    onRemove(){
        console.log(`${this.holder.name} lost 5 armor`);
        this.holder.currentArmor = this.holder.currentArmor - 5;
        this.holder.statusArray.splice(this.holder.statusEffectIndex, 1);
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
}