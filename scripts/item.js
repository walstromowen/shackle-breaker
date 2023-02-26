import {Slash, Stab, Block} from "./abilities.js"

export class Dagger{
    constructor(){
        this.name = "dagger";
        this.type = "weapon";
        this.level = 0;
        this.armor = 0;
        this.staminaCost = 2;
        this.abilityArray = [new Stab(), new Slash()];
        this.damageRange = [1 + this.level, 3 + this.level];
    }
    useAbility(abilityIndex, weilder, target){
        if(this.abilityArray[abilityIndex].activate(this, weilder, target) == false){
            return false;
        };
    }
}
export class Spear{
    constructor(){
        this.name = "spear";
        this.type = "weapon";
        this.level = 0;
        this.armor = 0;
        this.staminaCost = 2;
        this.abilityArray = [new Stab()];
        this.damageRange = [2 + this.level, 5 + this.level];
    }
    useAbility(abilityIndex, weilder, target){
        if(this.abilityArray[abilityIndex].activate(this, weilder, target) == false){
            return false;
        };
    }
}
export class IronSheild{
    constructor(){
        this.name = "iron sheild";
        this.type = "offhand";
        this.level = 0;
        this.armor = 2;
        this.staminaCost = 2;
        this.abilityArray = [new Block()];
        this.damageRange = [this.level, this.level + 1];
    }
    useAbility(abilityIndex, weilder, target){
        this.abilityArray[abilityIndex].activate(this, weilder, target);
    }
}
export class IronHelmet{
    constructor(){
        this.name = "iron helmet";
        this.type = "head";
        this.level = 0;
        this.armor = 2;
        this.abilityArray = [];
    }
}
export class IronGuantlets{
    constructor(){
        this.name = "iron guantlets";
        this.type = "arms";
        this.level = 0;
        this.armor = 2;
        this.abilityArray = [];
    }
}
export class IronChainmail{
    constructor(){
        this.name = "iron chainmail";
        this.type = "torso";
        this.level = 0;
        this.armor = 2;
        this.abilityArray = [];
    }
}
export class IronGreaves{
    constructor(){
        this.name = "iron greaves";
        this.type = "legs";
        this.level = 0;
        this.armor = 2;
        this.abilityArray = [];
    }
}
export class IronBoots{
    constructor(){
        this.name = "iron boots";
        this.type = "feet";
        this.level = 0;
        this.armor = 2;
        this.abilityArray = [];
    }
}
