import {controller as theController} from "./main.js";
import {player as thePlayer} from "./main.js";
import {Sheilded, Bound, Poisoned, Burned} from "./statusEffects.js";

class Ability{
    canUse(weilder){
        if(weilder === thePlayer){
            if(weilder.currentStamina - this.staminaCost < 0){
                theController.gameConsole.innerHTML += `<p>Not enough stamina!</p>`;
                theController.scrollToBottom("game-console");
                return false;
            }
            if(weilder.currentMagic - this.magicCost < 0){
                theController.gameConsole.innerHTML += `<p>Not enough magic!</p>`;
                theController.scrollToBottom("game-console");
                return false;
            }
        }else{
            if(weilder.currentStamina - this.staminaCost < 0){
                weilder.nextMove = new Recover;
            }
            if(weilder.currentMagic - this.magicCost < 0){
                weilder.nextMove = new Channel;
            }
        }
    }
    checkStamina(weilder, staminaCost){
        if(weilder.currentStamina - staminaCost < 0){
            theController.gameConsole.innerHTML += `<p>${weilder.name} does not have enough stamina!</p>`;
            theController.scrollToBottom("game-console");
            return false;
        }else{
            weilder.currentStamina = weilder.currentStamina - staminaCost;
            return true;
        }
    }
    checkMagic(weilder, magicCost){
        if(weilder.currentMagic - magicCost < 0){
            theController.gameConsole.innerHTML += `<p>${weilder.name} does not have enough magic!</p>`;
            theController.scrollToBottom("game-console");
            return false;
        }else{
            weilder.currentMagic = weilder.currentMagic - magicCost;
            return true;
        }
    }
    checkDamage(damage, target){
        damage = damage - target.currentArmor;
        if(damage < 0){
            return 0;
        }
        if(target.currentHP - damage< 0){
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
export class Punch extends Ability{
    constructor(){
        super();
        this.name = "punch";
        this.type = "attack";
        this.speed = 2;
        this.staminaCost = 1;
        this.magicCost = 0;
        this.damageModifier = 0;
        this.soundEffect = "./audio/soundEffects/soundEffects/punch-140236.mp3";
    }
    activate(weilder, target){
        if(this.checkStamina(weilder, this.staminaCost) == true){
            let damageOutput = Math.floor(Math.random() * ((weilder.currentAttack + this.damageModifier) - weilder.currentAttack + 1)) + weilder.currentAttack;
            damageOutput = this.checkDamage(damageOutput, target);
            target.currentHP = target.currentHP - damageOutput;
            theController.gameConsole.innerHTML += `<p>${weilder.name} uses ${this.name} against ${target.name} for ${damageOutput} damage!</p>`;
            this.playSound();
        }
    }
}
export class Slash extends Ability{
    constructor(){
        super();
        this.name = "slash";
        this.type = "attack";
        this.speed = 2;
        this.staminaCost = 2;
        this.magicCost = 0;
        this.damageModifier = 3;
        this.soundEffect = "./audio/soundEffects/sword-sound-2-36274.mp3";
    }
    activate(weilder, target){
        if(this.checkStamina(weilder, this.staminaCost) == true){
            let damageOutput = Math.floor(Math.random() * ((weilder.currentAttack + this.damageModifier) - weilder.currentAttack + 1)) + weilder.currentAttack;
            damageOutput = this.checkDamage(damageOutput, target);
            target.currentHP = target.currentHP - damageOutput;
            theController.gameConsole.innerHTML += `<p>${weilder.name} uses ${this.name} against ${target.name} for ${damageOutput} damage!</p>`;
            this.playSound();
        }
    }
}

export class Stab extends Ability{
    constructor(){
        super();
        this.name = "stab";
        this.type = "attack";
        this.speed = 1;
        this.staminaCost = 3;
        this.magicCost = 0;
        this.damageModifier = 5;
        this.soundEffect = "./audio/soundEffects/Knife-Stab-A10-www.fesliyanstudios.com.mp3";
    }
    activate(weilder, target){
        if(this.checkStamina(weilder, this.staminaCost) == true){
            let damageOutput = Math.floor(Math.random() * ((weilder.currentAttack + this.damageModifier) - weilder.currentAttack + 1)) + weilder.currentAttack;
            damageOutput = this.checkDamage(damageOutput, target);
            target.currentHP = target.currentHP - damageOutput;
            theController.gameConsole.innerHTML += `<p>${weilder.name} uses ${this.name} against ${target.name} for ${damageOutput} damage!</p>`;
            this.playSound();
        }
    }
}
export class Block extends Ability{
    constructor(){
        super();
        this.name = "block";
        this.type = "buff";
        this.speed = 3;
        this.staminaCost = 1;
        this.magicCost = 0;
        this.soundEffect = "./audio/soundEffects/anvil-hit-2-14845.mp3";
    }
    activate(weilder, target){
        if(this.checkStamina(weilder, this.staminaCost) == true){
            theController.gameConsole.innerHTML += `<p>${weilder.name} uses ${this.name}!</p>`;
            this.playSound();
            for(let i = 0; i < weilder.statusArray.length; i++){
                if(weilder.statusArray[i].name == "sheilded"){
                    weilder.statusArray[i].currentCharges = weilder.statusArray[i].maxCharges;
                    return;
                }
            }
            weilder.statusArray.push(new Sheilded(weilder));
        }
    }
}

export class Channel extends Ability{
    constructor(){
        super();
        this.name = "channel";
        this.type = "buff";
        this.speed = 3;
        this.staminaCost = 0;
        this.magicCost = 0;
        this.soundEffect = "./audio/soundEffects/magic-spell-6005.mp3";
    }
    activate(weilder, target){
        let magic = Math.floor(weilder.maxMagic * 0.2);
        if(weilder.currentMagic + magic > weilder.maxMagic){
            magic = weilder.maxMagic - weilder.currentMagic;
        }
        weilder.currentMagic = weilder.currentMagic + magic;
        theController.gameConsole.innerHTML += `<p>${weilder.name} channels magic!</p>`;
        this.playSound();
    }
    canUse(weilder){
        if(weilder.currentMagic == weilder.maxMagic){
            theController.gameConsole.innerHTML += `<p>${weilder.name} cannot recover more magic!</p>`;
            return false;
        }
    }
}

export class Recover extends Ability{
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
        let stamina = Math.floor(weilder.maxStamina * 0.2);
        if(weilder.currentStamina + stamina > weilder.maxStamina){
            stamina = weilder.maxStamina - weilder.currentStamina;
        }
        weilder.currentStamina = weilder.currentStamina + stamina;
        theController.gameConsole.innerHTML += `<p>${weilder.name} recovers stamina!</p>`;
        this.playSound();
    }
    canUse(weilder){
        if(weilder.currentStamina == weilder.maxStamina){
            theController.gameConsole.innerHTML += `<p>${weilder.name} cannot recover more stamina!</p>`;
            return false;
        }
    }
}
export class Retreat extends Ability{
    constructor(){
        super();
        this.name = "retreat";
        this.type = "buff";
        this.speed = 2;
        this.staminaCost = 0;
        this.magicCost = 0;
        this.soundEffect = "./audio/soundEffects/energy-90321.mp3";
    }
    activate(weilder, target){
        theController.gameConsole.innerHTML += `<p>${weilder.name} retreats!</p>`;
        this.playSound();
        return "retreat";
    }
}
export class Bite extends Ability{
    constructor(){
        super();
        this.name = "bite";
        this.type = "attack";
        this.speed = 2;
        this.staminaCost = 2;
        this.magicCost = 0;
        this.damageModifier = 3;
        this.soundEffect = "./audio/soundEffects/chomp1.mp3";
    }
    activate(weilder, target){
        if(this.checkStamina(weilder, this.staminaCost) == true){
            let damageOutput = Math.floor(Math.random() * ((weilder.currentAttack + this.damageModifier) - weilder.currentAttack + 1)) + weilder.currentAttack;
            damageOutput = this.checkDamage(damageOutput, target);
            target.currentHP = target.currentHP - damageOutput;
            theController.gameConsole.innerHTML += `<p>${weilder.name} uses ${this.name} against ${target.name} for ${damageOutput} damage!</p>`;
            this.playSound();
        }
    }
}
export class Pounce extends Ability{
    constructor(){
        super();
        this.name = "pounce";
        this.type = "attack";
        this.speed = 1;
        this.staminaCost = 4;
        this.magicCost = 0;
        this.damageModifier = 2;
        this.soundEffect = "./audio/soundEffects/sword-sound-2-36274.mp3";
    }
    activate(weilder, target){
        if(this.checkStamina(weilder, this.staminaCost) == true){
            let damageOutput = Math.floor(Math.random() * ((weilder.currentAttack + this.damageModifier) - weilder.currentAttack + 1)) + weilder.currentAttack;
            damageOutput = this.checkDamage(damageOutput, target);
            target.currentHP = target.currentHP - damageOutput;
            theController.gameConsole.innerHTML += `<p>${weilder.name} uses ${this.name} against ${target.name} for ${damageOutput} damage!</p>`;
            this.playSound();
            if(damageOutput > 0){
                if(Math.random()*2 < 1){
                    for(let i = 0; i < target.statusArray.length; i++){
                        if(target.statusArray[i].name == "bound"){
                            target.statusArray[i].currentCharges = target.statusArray[i].maxCharges;
                            return;
                        }
                    }
                    target.statusArray.push(new Bound(target));
                    theController.gameConsole.innerHTML += `<p>${target.name} has been bound!</p>`;
                }
            }
        }
    }    
}
export class LeechLife extends Ability{
    constructor(){
        super();
        this.name = "leech life";
        this.type = "attack";
        this.speed = 1;
        this.staminaCost = 4;
        this.magicCost = 0;
        this.damageModifier = 2;
        this.soundEffect = "./audio/soundEffects/platzender-kopf_nachschlag-91637.mp3";
    }
    activate(weilder, target){
        if(this.checkStamina(weilder, this.staminaCost) == true){
            let damageOutput = Math.floor(Math.random() * ((weilder.currentAttack + this.damageModifier) - weilder.currentAttack + 1)) + weilder.currentAttack;
            damageOutput = this.checkDamage(damageOutput, target);
            target.currentHP = target.currentHP - damageOutput;
            let restoreAmount = damageOutput;
            if(weilder.currentHP + damageOutput > weilder.maxHP){
                restoreAmount = weilder.maxHP - weilder.currentHP 
            }
            weilder.currentHP = weilder.currentHP + restoreAmount;
            theController.gameConsole.innerHTML += `<p>${weilder.name} uses ${this.name} against ${target.name} for ${damageOutput} damage and restores ${restoreAmount} health!</p>`;
            this.playSound();
        }
    }
}

export class ArcaneDart extends Ability{
    constructor(){
        super();
        this.name = "arcane dart";
        this.type = "attack";
        this.speed = 2;
        this.staminaCost = 0;
        this.magicCost = 2;
        this.damageModifier = 3;
        this.soundEffect = "./audio/soundEffects/magic-spell-6005.mp3";
    }
    activate(weilder, target){
        if(this.checkMagic(weilder, this.magicCost) == true){
            let damageOutput = Math.floor(Math.random() * ((weilder.currentAttack + this.damageModifier) - weilder.currentAttack + 1)) + weilder.currentAttack;
            damageOutput = this.checkDamage(damageOutput, target);
            target.currentHP = target.currentHP - damageOutput;
            theController.gameConsole.innerHTML += `<p>${weilder.name} uses ${this.name} against ${target.name} for ${damageOutput} damage!</p>`;
            this.playSound();
        }
    }
}

export class ArcaneBlast extends Ability{
    constructor(){
        super();
        this.name = "arcane blast";
        this.type = "attack";
        this.speed = 1;
        this.staminaCost = 0;
        this.magicCost = 6;
        this.damageModifier = 6;
        this.soundEffect = "./audio/soundEffects/magic-spell-6005.mp3";
    }
    activate(weilder, target){
        if(this.checkMagic(weilder, this.magicCost) == true){
            let damageOutput = Math.floor(Math.random() * ((weilder.currentAttack + this.damageModifier) - weilder.currentAttack + 1)) + weilder.currentAttack;
            damageOutput = this.checkDamage(damageOutput, target);
            target.currentHP = target.currentHP - damageOutput;
            theController.gameConsole.innerHTML += `<p>${weilder.name} uses ${this.name} against ${target.name} for ${damageOutput} damage!</p>`;
            weilder.currentAttack = weilder.baseAttack;
            this.playSound();
        }
    }
}

export class Struggle extends Ability{
    constructor(){
        super();
        this.name = "struggle";
        this.type = "attack";
        this.speed = 0;
        this.staminaCost = 0;
        this.magicCost = 0;
        this.soundEffect = "./audio/soundEffects/power-down-45784.mp3";
    }
    activate(weilder, target){
            theController.gameConsole.innerHTML += `<p>${weilder.name} cannot move!</p>`;
            this.playSound();
    }
}
export class SpitBile extends Ability{
    constructor(){
        super();
        this.name = "spit bile";
        this.type = "attack";
        this.speed = 1;
        this.staminaCost = 4;
        this.magicCost = 0;
        this.damageModifier = 2;
        this.soundEffect = "./audio/soundEffects/sword-sound-2-36274.mp3";
    }
    activate(weilder, target){
        if(this.checkStamina(weilder, this.staminaCost) == true){
            let damageOutput = Math.floor(Math.random() * ((weilder.currentAttack + this.damageModifier) - weilder.currentAttack + 1)) + weilder.currentAttack;
            damageOutput = this.checkDamage(damageOutput, target);
            target.currentHP = target.currentHP - damageOutput;
            theController.gameConsole.innerHTML += `<p>${weilder.name} uses ${this.name} against ${target.name} for ${damageOutput} damage!</p>`;
            this.playSound();
            if(damageOutput > 0){
                for(let i = 0; i < target.statusArray.length; i++){
                    if(target.statusArray[i].name == "poisoned"){
                        target.statusArray[i].currentCharges = target.statusArray[i].maxCharges;
                        return;
                    }
                }
                target.statusArray.push(new Poisoned(target));
                theController.gameConsole.innerHTML += `<p>${target.name} has been poisoned!</p>`;
            }
        }
    }  
}
export class Fireball extends Ability{
    constructor(){
        super();
        this.name = "fireball";
        this.type = "attack";
        this.speed = 1;
        this.staminaCost = 0;
        this.magicCost = 4;
        this.damageModifier = 2;
        this.soundEffect = "./audio/soundEffects/short-fireball-woosh-6146.mp3";
    }
    activate(weilder, target){
        if(this.checkMagic(weilder, this.magicCost) == true){
            let damageOutput = Math.floor(Math.random() * ((weilder.currentAttack + this.damageModifier) - weilder.currentAttack + 1)) + weilder.currentAttack;
            damageOutput = this.checkDamage(damageOutput, target);
            target.currentHP = target.currentHP - damageOutput;
            theController.gameConsole.innerHTML += `<p>${weilder.name} uses ${this.name} against ${target.name} for ${damageOutput} damage!</p>`;
            this.playSound();
            if(damageOutput > 0){
                if(Math.random()*3 < 1){
                    for(let i = 0; i < target.statusArray.length; i++){
                        if(target.statusArray[i].name == "burned"){
                            target.statusArray[i].currentCharges = target.statusArray[i].maxCharges;
                            return;
                        }
                    }
                    target.statusArray.push(new Burned(target));
                    theController.gameConsole.innerHTML += `<p>${target.name} has been burned!</p>`;
                } 
            }
        }
    } 
}
export class Devour extends Ability{
    constructor(){
        super();
        this.name = "devour";
        this.type = "attack";
        this.speed = 0;
        this.staminaCost = 20;
        this.magicCost = 0;
        this.damageModifier = "";
        this.soundEffect = "./audio/soundEffects/chomp1.mp3";
    }
    activate(weilder, target){
        if(this.checkStamina(weilder, this.staminaCost) == true){
            let damageOutput = Math.floor(target.maxHP*0.7);
            damageOutput = this.checkDamage(damageOutput, target);
            target.currentHP = target.currentHP - damageOutput;
            theController.gameConsole.innerHTML += `<p>${weilder.name} uses ${this.name} against ${target.name} for ${damageOutput} damage!</p>`;
            this.playSound();
        }
    }
}
export class Eviscerate extends Ability{
    constructor(){
        super();
        this.name = "eviscerate";
        this.type = "attack";
        this.speed = 2;
        this.staminaCost = 5;
        this.magicCost = 0;
        this.damageModifier = 2;
        this.soundEffect = "./audio/soundEffects/slash1.mp3";
    }
    activate(weilder, target){
        if(this.checkStamina(weilder, this.staminaCost) == true){
            let damageOutput = Math.floor(Math.random() * ((weilder.currentAttack + this.damageModifier) - weilder.currentAttack + 1)) + weilder.currentAttack;
            if(target.currentHP = target.maxHP){
                damageOutput = Math.floor(damageOutput * 1.5);
            }
            damageOutput = this.checkDamage(damageOutput, target);
            target.currentHP = target.currentHP - damageOutput;
            theController.gameConsole.innerHTML += `<p>${weilder.name} uses ${this.name} against ${target.name} for ${damageOutput} damage!</p>`;
            this.playSound();
        }
    }
}
export class DrinkHealthPotion extends Ability{
    constructor(){
        super();
        this.name = "drink health potion";
        this.type = "buff";
        this.speed = 3;
        this.staminaCost = 0;
        this.magicCost = 0;
        this.soundEffect = "./audio/soundEffects/energy-90321.mp3";
    }
    activate(weilder, target){
        if(weilder.currentHP == weilder.maxHP){
            theController.gameConsole.innerHTML += `<p>${weilder.name} cannot restore more health!</p>`;
            return false;
        }
        let hp = 10 + 2 * weilder.level;
        if(weilder.currentHP + hp > weilder.maxHP){
            hp = weilder.maxHP - weilder.currentHP;
        }
        weilder.currentHP = weilder.currentHP + hp;
        theController.gameConsole.innerHTML += `<p>${weilder.name} restores ${hp} health!</p>`;
        return true;
        
    }
}
export class DrinkStaminaPotion extends Ability{
    constructor(){
        super();
        this.name = "drink stamina potion";
        this.type = "buff";
        this.speed = 3;
        this.staminaCost = 0;
        this.magicCost = 0;
        this.soundEffect = "./audio/soundEffects/energy-90321.mp3";
    }
    activate(weilder, target){
        if(weilder.currentStamina == weilder.maxStamina){
            theController.gameConsole.innerHTML += `<p>${weilder.name} cannot restore more stamina!</p>`;
            return false;
        }
        let stamina = 5 + weilder.level;
        if(weilder.currentStamina + stamina > weilder.maxStamina){
            stamina = weilder.maxStamina - weilder.currentStamina;
        }
        weilder.currentStamina = weilder.currentStamina + stamina;
        theController.gameConsole.innerHTML += `<p>${weilder.name} restores ${stamina} stamina!</p>`;
        return true;
    }
    canUse(weilder){
        if(weilder.currentStamina == weilder.maxStamina){
            theController.gameConsole.innerHTML += `<p>${weilder.name} cannot recover more stamina!</p>`;
            return false;
        }
    }
}
export class DrinkMagicPotion extends Ability{
    constructor(){
        super();
        this.name = "drink magic potion";
        this.type = "buff";
        this.speed = 3;
        this.staminaCost = 0;
        this.magicCost = 0;
        this.soundEffect = "./audio/soundEffects/energy-90321.mp3";
    }
    activate(weilder, target){
        if(weilder.currentMagic == weilder.maxMagic){
            theController.gameConsole.innerHTML += `<p>${weilder.name} cannot restore more magic!</p>`;
            return false;
        }
        let magic = 5 + weilder.level;
        if(weilder.currentMagic + magic > weilder.maxMagic){
            magic = weilder.maxMagic - weilder.currentMagic;
        }
        weilder.currentMagic = weilder.currentMagic + magic;
        theController.gameConsole.innerHTML += `<p>${weilder.name} restores ${magic} magic!</p>`;
        return true;
    }
}
export class ThrowKnife extends Ability{
    constructor(){
        super();
        this.name = "throw knife";
        this.type = "attack";
        this.speed = 3;
        this.staminaCost = 0;
        this.magicCost = 0;
        this.soundEffect = "./audio/soundEffects/energy-90321.mp3";
    }
    activate(weilder, target){
        if(target === undefined){
            theController.gameConsole.innerHTML += `<p>cannot use outside of combat!</p>`;
            return;
        }
        let damageOutput =  3 + (weilder.level * 2) - target.currentArmor;
        damageOutput = this.checkDamage(damageOutput, target);
        target.currentHP = target.currentHP - damageOutput;
        theController.gameConsole.innerHTML += `<p>${weilder.name} throws a throwing knfife at the ${target.name} for ${damageOutput} damage!</p>`;
        theController.scrollToBottom("game-console");
    }
}
export class ThrowPoisonedKnife extends Ability{
    constructor(){
        super();
        this.name = "throw poison knife";
        this.type = "attack";
        this.speed = 3;
        this.staminaCost = 0;
        this.magicCost = 0;
        this.soundEffect = "./audio/soundEffects/energy-90321.mp3";
    }
    activate(weilder, target){
        if(target === undefined){
            theController.gameConsole.innerHTML += `<p>cannot use outside of combat!</p>`;
            return;
        }
        let damageOutput =  3 + (weilder.level * 2) - target.currentArmor;
        damageOutput = this.checkDamage(damageOutput, target);
        target.currentHP = target.currentHP - damageOutput;
        theController.gameConsole.innerHTML += `<p>${weilder.name} throws a poisoned throwing knfife at the ${target.name} for ${damageOutput} damage!</p>`;
        theController.scrollToBottom("game-console");
        if(damageOutput > 0){
            for(let i = 0; i < target.statusArray.length; i++){
                if(target.statusArray[i].name == "poisoned"){
                    target.statusArray[i].currentCharges = target.statusArray[i].maxCharges;
                    return;
                }
            }
            target.statusArray.push(new Poisoned(target));
            theController.gameConsole.innerHTML += `<p>${target.name} has been poisoned!</p>`;
        }
    }
}



