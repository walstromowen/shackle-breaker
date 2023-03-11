import {Slash, Stab, Block} from "./abilities.js"
import {controller as theController} from "./main.js";

class Equipment{
    useAbility(abilityIndex, weilder, target){
        if(this.abilityArray[abilityIndex].activate(this, weilder, target) == false){
            return false;
        };
    }
}
class Consumable{
    checkDamage(damage, target){
        if(damage < 0){
            return 0;
        }
        if(target.currentHP - damage < 0){
            return target.currentHP;
        }
        else{
            return damage;
        }
    }
}
export class Dagger extends Equipment{
    constructor(){
        super();
        this.name = "dagger";
        this.type = "weapon";
        this.level = 0;
        this.attack = 1;
        this.armor = 0;
        this.speed = 3;
        this.staminaCost = 2;
        this.abilityArray = [new Stab(), new Slash()];
    }
}
export class Spear extends Equipment{
    constructor(){
        super();
        this.name = "spear";
        this.type = "weapon";
        this.level = 0;
        this.attack = 3;
        this.armor = 0;
        this.speed = 1;
        this.staminaCost = 2;
        this.abilityArray = [new Stab()];
    }
}
export class IronSheild extends Equipment{
    constructor(){
        super();
        this.name = "iron sheild";
        this.type = "offhand";
        this.level = 0;
        this.attack = 0;
        this.armor = 2;
        this.speed = -1;
        this.staminaCost = 2;
        this.abilityArray = [new Block()];
    }
}
export class IronHelmet extends Equipment{
    constructor(){
        super();
        this.name = "iron helmet";
        this.type = "head";
        this.level = 0;
        this.attack = 0;
        this.armor = 2;
        this.speed = -1;
        this.abilityArray = [];
    }
}
export class IronGuantlets extends Equipment{
    constructor(){
        super();
        this.name = "iron guantlets";
        this.type = "arms";
        this.level = 0;
        this.attack = 0;
        this.armor = 2;
        this.speed = -1;
        this.abilityArray = [];
    }
}
export class IronChainmail extends Equipment{
    constructor(){
        super();
        this.name = "iron chainmail";
        this.type = "torso";
        this.level = 0;
        this.attack = 0;
        this.armor = 2;
        this.speed = -1;
        this.abilityArray = [];
    }
}
export class IronGreaves extends Equipment{
    constructor(){
        super();
        this.name = "iron greaves";
        this.type = "legs";
        this.level = 0;
        this.attack = 0;
        this.armor = 2;
        this.speed = -1;
        this.abilityArray = [];
    }
}
export class IronBoots extends Equipment{
    constructor(){
        super();
        this.name = "iron boots";
        this.type = "feet";
        this.level = 0;
        this.attack = 0;
        this.armor = 2;
        this.speed = -1;
        this.abilityArray = [];
    }
}

export class HealingPotion extends Consumable{
    constructor(){
        super();
        this.name = "healing potion";
        this.type = "consumable";
    }
    consume(weilder, target){
        let hp = 5 + weilder.level;
        if(weilder.currentHP + hp > weilder.maxHP){
            hp = weilder.maxHP - weilder.currentHP;
        }
        weilder.currentHP = weilder.currentHP + hp;
        theController.gameConsole.innerHTML += `<p>${weilder.name} restores ${hp} health!</p>`;
        return true;
    }
}

export class ThrowingKnife extends Consumable{
    constructor(){
        super();
        this.name = "throwing knife";
        this.type = "consumable";
        this.level = 0;
    }
    consume(weilder, target){
        if(weilder.isInBattle == false){
            return false;
        }else{
            let damageOutput =  2 * (weilder.level + 1) - target.currentArmor;
            damageOutput = this.checkDamage(damageOutput, target);
            weilder.currentEnemy.currentHP = weilder.currentEnemy.currentHP - damageOutput;
            theController.gameConsole.innerHTML += `<p>${weilder.name} throws a ${this.name} at the ${weilder.currentEnemy.name} for ${damageOutput} damage!</p>`;
            theController.scrollToBottom("game-console");
            return true;
        }
    }
}