//parry system 4 stances
//opposite stance crit damage
//adjacent stances normal damage
//same stance parry
//weapons attack speeds
//faster attacks change stances faster

import {controller as theController} from "./main.js";

class ability{
    checkStamina(weilder, staminaCost){
        if(weilder.currentStamina - staminaCost < 0){
            theController.gameConsole.innerHTML += `<p>Not enough stamina!</p>`;
            theController.scrollToBottom("game-console");
            return false;
        }else{
            weilder.currentStamina = weilder.currentStamina - staminaCost;
            return true;
        }
    }
    checkMagic(weilder, magicCost){
        if(weilder.currentMagic - magicCost < 0){
            theController.gameConsole.innerHTML += `<p>Not enough magic!</p>`;
            theController.scrollToBottom("game-console");
            return false;
        }else{
            weilder.currentMagic = weilder.currentMagic - magicCost;
            return true;
        }
    }
    checkDamage(damage, target){
        if(target.currentHP - damage < 0){
            return target.currentHP;
        }
        else{
            return damage;
        }
    }
}

export class Slash extends ability{
    constructor(){
        super();
        this.name = "slash";
        this.type = "attack";
    }
    activate(item, weilder, target){
        if(this.checkStamina(weilder, item.staminaCost) == true){
            let damageOutput = weilder.currentAttack - target.armorLevel + Math.floor(Math.random() * (item.damageRange[1] - item.damageRange[0] + 1)) + item.damageRange[0];
            damageOutput = this.checkDamage(damageOutput, target);
            target.currentHP = target.currentHP - damageOutput;
            theController.gameConsole.innerHTML += `<p>You ${this.name} the ${target.name} for ${damageOutput} damage!</p>`;
        }else{
            return false;
        }
    }
}

export class Stab extends ability{
    constructor(){
        super();
        this.name = "stab";
        this.type = "attack";
    }
    activate(item, weilder, target){
        if(this.checkStamina(weilder, item.staminaCost) == true){
            let damageOutput = weilder.currentAttack - target.armorLevel + Math.floor(Math.random() * (item.damageRange[1] - item.damageRange[0] + 1)) + item.damageRange[0];
            damageOutput = this.checkDamage(damageOutput, target);
            target.currentHP = target.currentHP - damageOutput;
            theController.gameConsole.innerHTML += `<p>You ${this.name} the ${target.name} for ${damageOutput} damage!</p>`;
        }else{
            return false;
        }
    }
}

export class Block extends ability{
    constructor(){
        super();
        this.name = "block";
        this.type = "buff";
    }
    activate(item, weilder, target){
        if(this.checkStamina(weilder, item.staminaCost) == true){
            weilder.armorLevel = weilder.armorLevel + item.level + 5;
            theController.gameConsole.innerHTML += `<p>You hold up your ${this.name} in defense!</p>`;
            console.log(weilder.armorLevel);
        }else{
            return false;
        }
    }
}
