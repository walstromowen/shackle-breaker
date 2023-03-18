import {Slash, Stab, Block, Fireball, Channel} from "./abilities.js"
import {controller as theController} from "./main.js";

class Equipment{
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
export class WoodDagger extends Equipment{
    constructor(){
        super();
        this.name = "wood dagger";
        this.type = "weapon";
        this.level = 0;
        this.attack = 2;
        this.armor = 0;
        this.speed = 3;
        this.abilityArray = [new Stab(), new Slash()];
    }
}
export class WoodSpear extends Equipment{
    constructor(){
        super();
        this.name = "wood spear";
        this.type = "weapon";
        this.level = 0;
        this.attack = 3;
        this.armor = 0;
        this.speed = 1;
        this.abilityArray = [new Stab()];
    }
}
export class WoodFireStaff extends Equipment{
    constructor(){
        super();
        this.name = "wood fire staff";
        this.type = "weapon";
        this.level = 0;
        this.attack = 3;
        this.armor = 0;
        this.speed = 1;
        this.abilityArray = [new Fireball(), new Channel()];
    }
}
export class WoodSheild extends Equipment{
    constructor(){
        super();
        this.name = "wood sheild";
        this.type = "offhand";
        this.level = 0;
        this.attack = 0;
        this.armor = 1;
        this.speed = -1;
        this.abilityArray = [new Block()];
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

export class HealthPotion extends Consumable{
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

export class StaminaPotion extends Consumable{
    constructor(){
        super();
        this.name = "stamina potion";
        this.type = "consumable";
    }
    consume(weilder, target){
        let stamina = 5 + weilder.level;
        if(weilder.currentStamina + stamina > weilder.maxStamina){
            stamina = weilder.maxStamina - weilder.currentStamina;
        }
        weilder.currentStamina = weilder.currentStamina + stamina;
        theController.gameConsole.innerHTML += `<p>${weilder.name} restores ${stamina} stamina!</p>`;
        return true;
    }
}

export class MagicPotion extends Consumable{
    constructor(){
        super();
        this.name = "magic potion";
        this.type = "consumable";
    }
    consume(weilder, target){
        let magic = 5 + weilder.level;
        if(weilder.currentMagic + stamina > weilder.maxMagic){
            magic = weilder.maxMagic - weilder.currentMagic;
        }
        weilder.currentMagic = weilder.currentMagic + magic;
        theController.gameConsole.innerHTML += `<p>${weilder.name} restores ${magic} stamina!</p>`;
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