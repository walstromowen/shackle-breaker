import {controller as theController} from "./main.js";

export class Dagger{
    constructor(){
        this.type = "weapon";
        this.level = 0;
        this.name = "Dagger";
        this.primaryAttackName = "Slash";
        this.staminaCost = 2;
        this.damageRange = [1 + this.level, 3 + this.level];
    }
    primaryAttack(weilder){
        let target = weilder.currentEnemy;
        let damageOutput = weilder.baseAttack;
        if(weilder.currentStamina - 2 < 0){
            theController.gameConsole.innerHTML += `<p>Not Enough Stamina!</p>`;
            return;
        }
        damageOutput = damageOutput + Math.floor(Math.random() * (this.damageRange[1] - this.damageRange[0] + 1)) + this.damageRange[0];
        damageOutput = damageOutput - target.armorLevel;
        if(damageOutput > 0){
            target.currentHP = target.currentHP - damageOutput;
            theController.gameConsole.innerHTML += `<p> You slash the ${target.name} for ${damageOutput} damage!</p>`;
        }
        else{
            theController.gameConsole.innerHTML += `<p>The ${target.name} evades your attatck!</p>`;
        }
        weilder.currentStamina = weilder.currentStamina - 2;
    }
}
export class Spear{
    constructor(){
        this.type = "weapon";
        this.level = 0;
        this.name = "Spear";
        this.primaryAttackName = "Stab";
        this.staminaCost = 3;
        this.damageRange = [2 + this.level, 5 + this.level]; //multiplied by level?
    }
    primaryAttack(weilder){
        let target = weilder.currentEnemy;
        let damageOutput = weilder.baseAttack;
        damageOutput = damageOutput + Math.floor(Math.random() * (this.damageRange[1] - this.damageRange[0] + 1)) + this.damageRange[0];
        damageOutput = damageOutput - target.armorLevel;
        if(damageOutput > 0){
            target.currentHP = target.currentHP - damageOutput;
            theController.gameConsole.innerHTML += `<p> You stab the ${target.name} for ${damageOutput} damage!</p>`;
        }
        else{
            theController.gameConsole.innerHTML += `<p>The ${target.name} evades your attatck!</p>`;
        }
        weilder.currentStamina = weilder.currentStamina - 2;
    }
}

export class IronHelmet{
    constructor(){
        this.type = "head";
        this.level = 0;
        this.name = "Iron Helmet";
        this.armor = 3;
    }
}
