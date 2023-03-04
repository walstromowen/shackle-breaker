import {Slash, Stab, Block} from "./abilities.js"
import {controller as theController} from "./main.js";

class equipment{
    useAbility(abilityIndex, weilder, target){
        if(this.abilityArray[abilityIndex].activate(this, weilder, target) == false){
            return false;
        };
    }
}
export class Dagger extends equipment{
    constructor(){
        super();
        this.name = "dagger";
        this.type = "weapon";
        this.level = 0;
        this.armor = 0;
        this.speed = 3;
        this.staminaCost = 2;
        this.abilityArray = [new Stab(), new Slash()];
        this.damageRange = [1 + this.level, 3 + this.level];
    }
}
export class Spear extends equipment{
    constructor(){
        super();
        this.name = "spear";
        this.type = "weapon";
        this.level = 0;
        this.armor = 0;
        this.speed = 1;
        this.staminaCost = 2;
        this.abilityArray = [new Stab()];
        this.damageRange = [2 + this.level, 5 + this.level];
    }
}
export class IronSheild extends equipment{
    constructor(){
        super();
        this.name = "iron sheild";
        this.type = "offhand";
        this.level = 0;
        this.armor = 2;
        this.speed = 1;
        this.staminaCost = 2;
        this.abilityArray = [new Block()];
        this.damageRange = [this.level, this.level + 1];
    }
}
export class IronHelmet extends equipment{
    constructor(){
        super();
        this.name = "iron helmet";
        this.type = "head";
        this.level = 0;
        this.armor = 2;
        this.abilityArray = [];
    }
}
export class IronGuantlets extends equipment{
    constructor(){
        super();
        this.name = "iron guantlets";
        this.type = "arms";
        this.level = 0;
        this.armor = 2;
        this.abilityArray = [];
    }
}
export class IronChainmail extends equipment{
    constructor(){
        super();
        this.name = "iron chainmail";
        this.type = "torso";
        this.level = 0;
        this.armor = 2;
        this.abilityArray = [];
    }
}
export class IronGreaves extends equipment{
    constructor(){
        super();
        this.name = "iron greaves";
        this.type = "legs";
        this.level = 0;
        this.armor = 2;
        this.abilityArray = [];
    }
}
export class IronBoots extends equipment{
    constructor(){
        super();
        this.name = "iron boots";
        this.type = "feet";
        this.level = 0;
        this.armor = 2;
        this.abilityArray = [];
    }
}

export class HealingPotion{
    constructor(){
        this.name = "healing potion";
        this.type = "consumable";
    }
    consume(weilder){
        let hp = 5 + weilder.level;
        if(weilder.currentHP + hp > weilder.maxHP){
            hp = weilder.maxHP - weilder.currentHP;
        }
        weilder.currentHP = weilder.currentHP + hp;
        theController.gameConsole.innerHTML += `<p>You restore ${hp} health!</p>`;
    }
}

export class ThrowingKnife{
    constructor(){
        this.name = "throwing knife";
        this.type = "consumable";
        this.level = 0;
    }
    consume(weilder){
        if(weilder.isInBattle == false){
            return false;
        }
        let damageOutput =  2 * (weilder.level + 1);
        weilder.currentEnemy.currentHP = weilder.currentEnemy.currentHP - damageOutput;
        //need to check damage like in abilities (should move to abilities)
        theController.gameConsole.innerHTML += `<p>You throw a ${this.name} at the ${weilder.currentEnemy.name} for ${damageOutput} damage!</p>`;
        theController.scrollToBottom("game-console");
    }
}