//parry system 4 stances
//opposite stance crit damage
//adjacent stances normal damage
//same stance parry
//weapons attack speeds
//faster attacks change stances faster

import {controller as theController} from "./main.js";
import {player as thePlayer} from "./main.js";

class ability{
    checkStamina(weilder, staminaCost){
        if(weilder.currentStamina - staminaCost < 0){
            if(weilder === thePlayer){
                theController.gameConsole.innerHTML += `<p>Not enough stamina!</p>`;
            }else{
                weilder.currentStamina = weilder.currentStamina + Math.floor(weilder.maxStamina*0.1);
                theController.gameConsole.innerHTML += `<p>The ${weilder.name} recovers stamina!</p>`;
            }
            theController.scrollToBottom("game-console");
            return false;
        }else{
            weilder.currentStamina = weilder.currentStamina - staminaCost;
            return true;
        }
    }
    checkMagic(weilder, magicCost){
        if(weilder.currentMagic - magicCost < 0){
            if(weilder === thePlayer){
                theController.gameConsole.innerHTML += `<p>Not enough magic!</p>`;
            }else{
                theController.gameConsole.innerHTML += `<p>The ${weilder.name} recovers magic!</p>`;
                weilder.currentMagic = weilder.currentMagic + Math.floor(weilder.maxMagic*0.1);
            }
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
export class Punch extends ability{
    constructor(){
        super();
        this.name = "punch";
        this.type = "attack";
        this.staminaCost = 1;
        this.damageModifier = 2;
    }
    activate(weilder, target){
        if(this.checkStamina(weilder, this.staminaCost) == true){
            let damageOutput = Math.floor(Math.random() * ((weilder.currentAttack*this.damageModifier) - weilder.currentAttack + 1)) + weilder.currentAttack;
            damageOutput = this.checkDamage(damageOutput, target);
            target.currentHP = target.currentHP - damageOutput;
            theController.gameConsole.innerHTML += `<p>${weilder.name} uses ${this.name} against ${target.name} for ${damageOutput} damage!</p>`;
        }else{
            return false;
        }
    }
}
export class Slash extends ability{
    constructor(){
        super();
        this.name = "slash";
        this.type = "attack";
        this.staminaCost = 2;
        this.damageModifier = 2;
    }
    activate(weilder, target){
        if(this.checkStamina(weilder, this.staminaCost) == true){
            let damageOutput = Math.floor(Math.random() * ((weilder.currentAttack*this.damageModifier) - weilder.currentAttack + 1)) + weilder.currentAttack;
            damageOutput = this.checkDamage(damageOutput, target);
            target.currentHP = target.currentHP - damageOutput;
            theController.gameConsole.innerHTML += `<p>${weilder.name} uses ${this.name} against ${target.name} for ${damageOutput} damage!</p>`;
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
        this.staminaCost = 2;
        this.damageModifier = 2;
    }
    activate(weilder, target){
        if(this.checkStamina(weilder, this.staminaCost) == true){
            let damageOutput = Math.floor(Math.random() * ((weilder.currentAttack*this.damageModifier) - weilder.currentAttack + 1)) + weilder.currentAttack;
            damageOutput = this.checkDamage(damageOutput, target);
            target.currentHP = target.currentHP - damageOutput;
            theController.gameConsole.innerHTML += `<p>${weilder.name} uses ${this.name} against ${target.name} for ${damageOutput} damage!</p>`;
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
        this.staminaCost = 2;
    }
    activate(weilder, target){
        if(this.checkStamina(weilder, this.staminaCost) == true){
            let damageOutput = Math.floor(Math.random() * ((weilder.currentAttack*this.damageModifier) - weilder.currentAttack + 1)) + weilder.currentAttack;
            damageOutput = this.checkDamage(damageOutput, target);
            target.currentHP = target.currentHP - damageOutput;
            theController.gameConsole.innerHTML += `<p>${weilder.name} uses ${this.name}!</p>`;
        }else{
            return false;
        }
    }
}
export class Recover extends ability{
    constructor(){
        super();
        this.name = "recover";
        this.type = "buff";
        this.staminaCost = 0;
    }
    activate(weilder, target){
        if(weilder.currentStamina == weilder.maxStamina){
            theController.gameConsole.innerHTML += `<p>Cannot recover more stamina!</p>`;
            return false;
        }
        let stamina = Math.floor(weilder.maxStamina * 0.2);
        if(weilder.currentStamina + stamina > weilder.maxStamina){
            stamina = weilder.maxStamina - weilder.currentStamina;
        }
        weilder.currentStamina = weilder.currentStamina + stamina;
        theController.gameConsole.innerHTML += `<p>You recover stamina.</p>`;
    }
}
export class Retreat extends ability{
    constructor(){
        super();
        this.name = "retreat";
        this.type = "buff";
        this.staminaCost = 0;
    }
    activate(weilder, target){
       theController.toggleMap();
       return false;
    }
}
export class Bite extends ability{
    constructor(){
        super();
        this.name = "bite";
        this.type = "attack";
        this.staminaCost = 2;
        this.damageModifier = 1.2;
    }
    activate(weilder, target){
        if(this.checkStamina(weilder, this.staminaCost) == true){
            let damageOutput = Math.floor(Math.random() * ((weilder.currentAttack*this.damageModifier) - weilder.currentAttack + 1)) + weilder.currentAttack;
            damageOutput = this.checkDamage(damageOutput, target);
            target.currentHP = target.currentHP - damageOutput;
            theController.gameConsole.innerHTML += `<p> The ${weilder.name} uses ${this.name} against ${target.name} for ${damageOutput} damage!</p>`;
        }else{
             return false;
        }
    }
}
export class Pounce extends ability{
    constructor(){
        super();
        this.name = "pounce";
        this.type = "attack";
        this.staminaCost = 4;
        this.damageModifier = 1.2;
    }
    activate(weilder, target){
        if(this.checkStamina(weilder, this.staminaCost) == true){
            let damageOutput = Math.floor(Math.random() * ((weilder.currentAttack*this.damageModifier) - weilder.currentAttack + 1)) + weilder.currentAttack;
            damageOutput = this.checkDamage(damageOutput, target);
            target.currentHP = target.currentHP - damageOutput;
            theController.gameConsole.innerHTML += `<p> The ${weilder.name} uses ${this.name} against ${target.name} for ${damageOutput} damage!</p>`;
        }else{
             return false;
        }
    }    
}
export class LeechLife extends ability{
    constructor(){
        super();
        this.name = "leech life";
        this.type = "attack";
        this.staminaCost = 4;
        this.damageModifier = 1.2;
    }
    activate(weilder, target){
        if(this.checkStamina(weilder, this.staminaCost) == true){
            let damageOutput = Math.floor(Math.random() * ((weilder.currentAttack*this.damageModifier) - weilder.currentAttack + 1)) + weilder.currentAttack;
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

export class ArcaneDart extends ability{
    constructor(){
        super();
        this.name = "arcane dart";
        this.type = "attack";
        this.magicCost = 2;
        this.damageModifier = 1.2;
    }
    activate(weilder, target){
        if(this.checkMagic(weilder, this.magicCost) == true){
            let damageOutput = Math.floor(Math.random() * ((weilder.currentAttack*this.damageModifier) - weilder.currentAttack + 1)) + weilder.currentAttack;
            damageOutput = this.checkDamage(damageOutput, target);
            target.currentHP = target.currentHP - damageOutput;
            theController.gameConsole.innerHTML += `<p> The ${weilder.name} uses ${this.name} against ${target.name} for ${damageOutput} damage!</p>`;
        }else{
            return false;
       }
    }
}

export class ArcaneBlast extends ability{
    constructor(){
        super();
        this.name = "arcane dart";
        this.type = "attack";
        this.magicCost = 6;
        this.damageModifier = 1.2;
    }
    activate(weilder, target){
        if(this.checkMagic(weilder, this.magicCost) == true){
            let damageOutput = Math.floor(Math.random() * ((weilder.currentAttack*this.damageModifier) - weilder.currentAttack + 1)) + weilder.currentAttack;
            damageOutput = this.checkDamage(damageOutput, target);
            target.currentHP = target.currentHP - damageOutput;
            theController.gameConsole.innerHTML += `<p> The ${weilder.name} uses ${this.name} against ${target.name} for ${damageOutput} damage!</p>`;
            weilder.currentAttack = weilder.baseAttack;
        }else{
            return false;
       }
    }
}

export class ChannelMagic extends ability{
    constructor(){
        super();
        this.name = "channel magic";
        this.type = "buff";
        this.magicCost = 0;
    }
    activate(weilder, target){
        if(this.checkMagic(weilder, this.magicCost) == true){
          
        }else{
            return false;
       }
    }
}