//parry system 4 stances
//opposite stance crit damage
//adjacent stances normal damage
//same stance parry
//weapons attack speeds
//faster attacks change stances faster

import {controller as theController} from "./main.js";
import {player as thePlayer} from "./main.js";

class ability{
    canUse(weilder){
        if(weilder === thePlayer){
            if(weilder.currentStamina - this.staminaCost < 0){
                theController.gameConsole.innerHTML += `<p>Not enough stamina!</p>`;
                return false;
            }
            if(weilder.currentMagic - this.magicCost < 0){
                theController.gameConsole.innerHTML += `<p>Not enough magic!</p>`;
                return false;
            }
        }else{
            if(weilder.currentStamina - this.staminaCost < 0){
                weilder.nextMove = new Recover;
            }
            if(weilder.currentMagic - this.magicCost < 0){
                
            }
        }
    }
    checkStamina(weilder, staminaCost){
        console.log(weilder.name);
        if(weilder.currentStamina - staminaCost < 0){
            if(weilder === thePlayer){
                theController.gameConsole.innerHTML += `<p>Not enough stamina!</p>`;
                return false;
            }else{
                weilder.currentStamina = weilder.currentStamina + Math.floor(weilder.maxStamina*0.1);
                theController.gameConsole.innerHTML += `<p>${weilder.name} recovers stamina!</p>`;
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
    playSound(){
        theController.soundEffectPlayer.src = this.soundEffect;
        theController.soundEffectPlayer.play();
    }
}
export class Punch extends ability{
    constructor(){
        super();
        this.name = "punch";
        this.type = "attack";
        this.speed = 2;
        this.staminaCost = 1;
        this.magicCost = 0;
        this.damageModifier = 2;
        this.soundEffect = "./audio/soundEffects/soundEffects/punch-140236.mp3";
    }
    activate(weilder, target){
        if(this.checkStamina(weilder, this.staminaCost) == true){
            let damageOutput = Math.floor(Math.random() * ((weilder.currentAttack*this.damageModifier) - weilder.currentAttack + 1)) + weilder.currentAttack;
            damageOutput = this.checkDamage(damageOutput, target);
            target.currentHP = target.currentHP - damageOutput;
            theController.gameConsole.innerHTML += `<p>${weilder.name} uses ${this.name} against ${target.name} for ${damageOutput} damage!</p>`;
            this.playSound();
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
        this.speed = 1;
        this.staminaCost = 2;
        this.magicCost = 0;
        this.damageModifier = 2;
        this.soundEffect = "./audio/soundEffects/sword-sound-2-36274.mp3";
    }
    activate(weilder, target){
        if(this.checkStamina(weilder, this.staminaCost) == true){
            let damageOutput = Math.floor(Math.random() * ((weilder.currentAttack*this.damageModifier) - weilder.currentAttack + 1)) + weilder.currentAttack;
            damageOutput = this.checkDamage(damageOutput, target);
            target.currentHP = target.currentHP - damageOutput;
            theController.gameConsole.innerHTML += `<p>${weilder.name} uses ${this.name} against ${target.name} for ${damageOutput} damage!</p>`;
            this.playSound();
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
        this.speed = 1;
        this.staminaCost = 2;
        this.magicCost = 0;
        this.damageModifier = 2;
        this.soundEffect = "./audio/soundEffects/Knife-Stab-A10-www.fesliyanstudios.com.mp3";
    }
    activate(weilder, target){
        if(this.checkStamina(weilder, this.staminaCost) == true){
            let damageOutput = Math.floor(Math.random() * ((weilder.currentAttack*this.damageModifier) - weilder.currentAttack + 1)) + weilder.currentAttack;
            damageOutput = this.checkDamage(damageOutput, target);
            target.currentHP = target.currentHP - damageOutput;
            theController.gameConsole.innerHTML += `<p>${weilder.name} uses ${this.name} against ${target.name} for ${damageOutput} damage!</p>`;
            this.playSound();
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
        this.speed = 3;
        this.staminaCost = 2;
        this.magicCost = 0;
        this.soundEffect = "./audio/soundEffects/anvil-hit-2-14845.mp3";
    }
    activate(weilder, target){
        if(this.checkStamina(weilder, this.staminaCost) == true){
            let damageOutput = Math.floor(Math.random() * ((weilder.currentAttack*this.damageModifier) - weilder.currentAttack + 1)) + weilder.currentAttack;
            damageOutput = this.checkDamage(damageOutput, target);
            target.currentHP = target.currentHP - damageOutput;
            theController.gameConsole.innerHTML += `<p>${weilder.name} uses ${this.name}!</p>`;
            this.playSound();
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
        this.speed = 3;
        this.staminaCost = 0;
        this.magicCost = 0;
        this.soundEffect = "./audio/soundEffects/energy-90321.mp3";
    }
    activate(weilder, target){
        if(weilder.currentStamina == weilder.maxStamina){
            theController.gameConsole.innerHTML += `<p>${weilder.name} cannot recover more stamina!</p>`;
            return false;
        }
        let stamina = Math.floor(weilder.maxStamina * 0.2);
        if(weilder.currentStamina + stamina > weilder.maxStamina){
            stamina = weilder.maxStamina - weilder.currentStamina;
        }
        weilder.currentStamina = weilder.currentStamina + stamina;
        theController.gameConsole.innerHTML += `<p>${weilder.name} recovers stamina!</p>`;
        this.playSound();
    }
}
export class Retreat extends ability{
    constructor(){
        super();
        this.name = "retreat";
        this.type = "buff";
        this.speed = 1;
        this.staminaCost = 0;
        this.magicCost = 0;
        this.soundEffect = "./audio/soundEffects/energy-90321.mp3";
    }
    activate(weilder, target){
        theController.gameConsole.innerHTML += `<p>${weilder.name} retreats!</p>`;
        this.playSound();
        setTimeout(()=>{
            theController.toggleMap();
            theController.enablePlayerBattleControls();
        }, 2000);
        theController.scrollToBottom("game-console");
        return false;
    }
}
export class Bite extends ability{
    constructor(){
        super();
        this.name = "bite";
        this.type = "attack";
        this.speed = 2;
        this.staminaCost = 2;
        this.magicCost = 0;
        this.damageModifier = 1.2;
        this.soundEffect = "./audio/soundEffects/chomp1.mp3";
    }
    activate(weilder, target){
        if(this.checkStamina(weilder, this.staminaCost) == true){
            let damageOutput = Math.floor(Math.random() * ((weilder.currentAttack*this.damageModifier) - weilder.currentAttack + 1)) + weilder.currentAttack;
            damageOutput = this.checkDamage(damageOutput, target);
            target.currentHP = target.currentHP - damageOutput;
            theController.gameConsole.innerHTML += `<p> The ${weilder.name} uses ${this.name} against ${target.name} for ${damageOutput} damage!</p>`;
            this.playSound();
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
        this.speed = 1;
        this.staminaCost = 4;
        this.magicCost = 0;
        this.damageModifier = 1.2;
        this.soundEffect = "./audio/soundEffects/sword-sound-2-36274.mp3";
    }
    activate(weilder, target){
        if(this.checkStamina(weilder, this.staminaCost) == true){
            let damageOutput = Math.floor(Math.random() * ((weilder.currentAttack*this.damageModifier) - weilder.currentAttack + 1)) + weilder.currentAttack;
            damageOutput = this.checkDamage(damageOutput, target);
            target.currentHP = target.currentHP - damageOutput;
            theController.gameConsole.innerHTML += `<p> The ${weilder.name} uses ${this.name} against ${target.name} for ${damageOutput} damage!</p>`;
            this.playSound();
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
        this.speed = 1;
        this.staminaCost = 4;
        this.magicCost = 0;
        this.damageModifier = 1.2;
        this.soundEffect = "./audio/soundEffects/platzender-kopf_nachschlag-91637.mp3";
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
            this.playSound();
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
        this.speed = 2;
        this.staminaCost = 0;
        this.magicCost = 2;
        this.damageModifier = 1.2;
        this.soundEffect = "./audio/soundEffects/magic-spell-6005.mp3";
    }
    activate(weilder, target){
        if(this.checkMagic(weilder, this.magicCost) == true){
            let damageOutput = Math.floor(Math.random() * ((weilder.currentAttack*this.damageModifier) - weilder.currentAttack + 1)) + weilder.currentAttack;
            damageOutput = this.checkDamage(damageOutput, target);
            target.currentHP = target.currentHP - damageOutput;
            theController.gameConsole.innerHTML += `<p> The ${weilder.name} uses ${this.name} against ${target.name} for ${damageOutput} damage!</p>`;
            this.playSound();
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
        this.speed = 1;
        this.staminaCost = 0;
        this.magicCost = 6;
        this.damageModifier = 1.2;
        this.soundEffect = "./audio/soundEffects/magic-spell-6005.mp3";
    }
    activate(weilder, target){
        if(this.checkMagic(weilder, this.magicCost) == true){
            let damageOutput = Math.floor(Math.random() * ((weilder.currentAttack*this.damageModifier) - weilder.currentAttack + 1)) + weilder.currentAttack;
            damageOutput = this.checkDamage(damageOutput, target);
            target.currentHP = target.currentHP - damageOutput;
            theController.gameConsole.innerHTML += `<p> The ${weilder.name} uses ${this.name} against ${target.name} for ${damageOutput} damage!</p>`;
            weilder.currentAttack = weilder.baseAttack;
            this.playSound();
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
        this.speed = 2;
        this.staminaCost = 0;
        this.magicCost = 0;
        this.soundEffect = "./audio/soundEffects/magic-spell-6005.mp3";
    }
    activate(weilder, target){
        if(this.checkMagic(weilder, this.magicCost) == true){
          
        }else{
            return false;
       }
    }
}