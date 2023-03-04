import {controller as theController} from "./main.js";

class EnemyAbility{
    checkStamina(weilder, staminaCost){
        if(weilder.currentStamina - staminaCost < 0){
            theController.gameConsole.innerHTML += `<p>The ${weilder.name} recovers stamina!</p>`;
            weilder.currentStamina = weilder.currentStamina + Math.floor(weilder.maxStamina*0.1);
            theController.scrollToBottom("game-console");
            return false;
        }else{
            weilder.currentStamina = weilder.currentStamina - staminaCost;
            return true;
        }
    }
    checkMagic(weilder, magicCost){
        if(weilder.currentMagic - magicCost < 0){
            theController.gameConsole.innerHTML += `<p>The ${weilder.name} recovers magic!</p>`;
            weilder.currentMagic = weilder.currentMagic + Math.floor(weilder.maxMagic*0.1);
            theController.scrollToBottom("game-console");
            return false;
        }else{
            weilder.currentMagic = weilder.currentMagic - magicCost;
            return true;
        }
    }
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

export class Slash extends EnemyAbility{
    constructor(){
        super();
        this.name = "slash";
        this.type = "attack";
        this.staminaCost = 2;
        this.damageRange = [1, 3];
    }
    activate(weilder, target){
        if(this.checkStamina(weilder, this.staminaCost) == true){
            let damageOutput = weilder.currentAttack - target.currentArmor + Math.floor(Math.random() * (this.damageRange[1] - this.damageRange[0] + 1)) + this.damageRange[0];
            damageOutput = this.checkDamage(damageOutput, target);
            target.currentHP = target.currentHP - damageOutput;
            theController.gameConsole.innerHTML += `<p> The ${weilder.name} uses ${this.name} against ${target.name} for ${damageOutput} damage!</p>`;
        }else{
             return false;
        }
    }
}

export class Bite extends EnemyAbility{
    constructor(){
        super();
        this.name = "bite";
        this.type = "attack";
        this.staminaCost = 2;
        this.damageRange = [1, 3];
    }
    activate(weilder, target){
        if(this.checkStamina(weilder, this.staminaCost) == true){
            let damageOutput = weilder.currentAttack - target.currentArmor + Math.floor(Math.random() * (this.damageRange[1] - this.damageRange[0] + 1)) + this.damageRange[0];
            damageOutput = this.checkDamage(damageOutput, target);
            target.currentHP = target.currentHP - damageOutput;
            theController.gameConsole.innerHTML += `<p> The ${weilder.name} uses ${this.name} against ${target.name} for ${damageOutput} damage!</p>`;
        }else{
             return false;
        }
    }
}

export class Pounce extends EnemyAbility{
    constructor(){
        super();
        this.name = "pounce";
        this.type = "attack";
        this.staminaCost = 4;
        this.damageRange = [2, 4];
    }
    activate(weilder, target){
        if(this.checkStamina(weilder, this.staminaCost) == true){
            let damageOutput = weilder.currentAttack - target.currentArmor + Math.floor(Math.random() * (this.damageRange[1] - this.damageRange[0] + 1)) + this.damageRange[0];
            damageOutput = this.checkDamage(damageOutput, target);
            target.currentHP = target.currentHP - damageOutput;
            theController.gameConsole.innerHTML += `<p> The ${weilder.name} uses ${this.name} against ${target.name} for ${damageOutput} damage!</p>`;
        }else{
             return false;
        }
    }    
}


export class LeechLife extends EnemyAbility{
    constructor(){
        super();
        this.name = "leech life";
        this.type = "attack";
        this.staminaCost = 4;
        this.damageRange = [1, 3];
    }
    activate(weilder, target){
        if(this.checkStamina(weilder, this.staminaCost) == true){
            let damageOutput = weilder.currentAttack - target.currentArmor + Math.floor(Math.random() * (this.damageRange[1] - this.damageRange[0] + 1)) + this.damageRange[0];
            damageOutput = this.checkDamage(damageOutput, target);
            target.currentHP = target.currentHP - damageOutput;
            if(weilder.currentHP + damageOutput > weilder.maxHP){
                damageOutput = weilder.maxHP - weilder.currentHP 
            }
            weilder.currentHP = weilder.currentHP + damageOutput;
            theController.gameConsole.innerHTML += `<p> The ${weilder.name} uses ${this.name} against ${target.name} for ${damageOutput} damage and restores ${damageOutput} health!</p>`;
        }else{
            return false;
       }
    }
}

export class ArcaneDart extends EnemyAbility{
    constructor(){
        super();
        this.name = "arcane dart";
        this.type = "attack";
        this.magicCost = 2;
        this.damageRange = [1, 3];
    }
    activate(weilder, target){
        if(this.checkMagic(weilder, this.magicCost) == true){
            let damageOutput = weilder.currentAttack - target.currentArmor + Math.floor(Math.random() * (this.damageRange[1] - this.damageRange[0] + 1)) + this.damageRange[0];
            damageOutput = this.checkDamage(damageOutput, target);
            target.currentHP = target.currentHP - damageOutput;
            theController.gameConsole.innerHTML += `<p> The ${weilder.name} uses ${this.name} against ${target.name} for ${damageOutput} damage!</p>`;
        }else{
            return false;
       }
    }
}

export class ArcaneBlast extends EnemyAbility{
    constructor(){
        super();
        this.name = "arcane dart";
        this.type = "attack";
        this.magicCost = 6;
        this.damageRange = [1, 1];
    }
    activate(weilder, target){
        if(this.checkMagic(weilder, this.magicCost) == true){
            let damageOutput = weilder.currentAttack - (target.currentArmor + Math.floor(Math.random() * (this.damageRange[1] - this.damageRange[0] + 1)) + this.damageRange[0]) * 2;
            damageOutput = this.checkDamage(damageOutput, target);
            target.currentHP = target.currentHP - damageOutput;
            theController.gameConsole.innerHTML += `<p> The ${weilder.name} uses ${this.name} against ${target.name} for ${damageOutput} damage!</p>`;
            weilder.currentAttack = weilder.baseAttack;
        }else{
            return false;
       }
    }
}

export class ChannelMagic extends EnemyAbility{
    constructor(){
        super();
        this.name = "channel magic";
        this.type = "buff";
        this.magicCost = 0;
        this.damageRange = [1, 1];
    }
    activate(weilder, target){
        if(this.checkMagic(weilder, this.magicCost) == true){
          
        }else{
            return false;
       }
    }
}