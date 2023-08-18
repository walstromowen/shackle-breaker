import {controller as theController} from "./main.js"
import {Sheilded, Bound, Poisoned, Burned} from "./statusEffects.js";

class Ability{
    canUse(weilder, player){
        if(weilder === player){
            if(weilder.currentStamina - this.staminaCost < 0){
                theController.printToGameConsole("Not enough stamina!");
                return false;
            }
            if(weilder.currentMagic - this.magicCost < 0){
                theController.printToGameConsole("Not enough magic!");
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
            theController.printToGameConsole(`${weilder.name} does not have enough stamina!`);
            return false;
        }else{
            weilder.currentStamina = weilder.currentStamina - staminaCost;
            theController.animateVitalBar(weilder, "stamina");
            return true;
        }
    }
    checkMagic(weilder, magicCost){
        if(weilder.currentMagic - magicCost < 0){
            theController.printToGameConsole(`${weilder.name} does not have enough magic!`);
            return false;
        }else{
            weilder.currentMagic = weilder.currentMagic - magicCost;
            theController.animateVitalBar(weilder, "magic");
            return true;
        }
    }
    checkDamage(damage, target, type){
        let damageOutput = 0;
        if(type == "blunt"){
            damageOutput = damage - target.currentBluntDefense;
        }
        if(type == "pierce"){
            damageOutput = damage - target.currentPierceDefense;
        }
        if(type == "arcane"){
            damageOutput = damage - target.currentArcaneDefense;
        }
        if(type == "elemental"){
            damageOutput = damage - target.currentElementalDefense;
        }
        if(damageOutput < 0){
            return 0;
        }
        if(target.currentHP - damageOutput < 0){
            theController.animateVitalBar(target, "health");
            return target.currentHP;
        }
        else{
            theController.animateVitalBar(target, "health");
            return damageOutput;
        }
    }
}
export class Punch extends Ability{
    constructor(){
        super();
        this.name = "punch";
        this.type = "blunt";
        this.speedMultiplier = 0.75;
        this.staminaCost = 1;
        this.magicCost = 0;
        this.damageModifier = 0;
        this.soundEffect = "./audio/soundEffects/soundEffects/punch-140236.mp3";
    }
    activate(weilder, target){
        if(this.checkStamina(weilder, this.staminaCost) == true){
            let damageOutput = Math.floor(Math.random() * ((weilder.currentBluntAttack + this.damageModifier) - weilder.currentBluntAttack + 1)) + weilder.currentBluntAttack;
            damageOutput = this.checkDamage(damageOutput, target, this.type);
            target.currentHP = target.currentHP - damageOutput;
            theController.printToGameConsole(`${weilder.name} uses ${this.name} against ${target.name} for ${damageOutput} damage!`);
            theController.playSoundEffect(this.soundEffect);
        }
    }
}
export class Slash extends Ability{
    constructor(){
        super();
        this.name = "slash";
        this.type = "pierce";
        this.speedMultiplier = 0.75;
        this.staminaCost = 2;
        this.magicCost = 0;
        this.damageModifier = 3;
        this.soundEffect = "./audio/soundEffects/sword-sound-2-36274.mp3";
    }
    activate(weilder, target){
        if(this.checkStamina(weilder, this.staminaCost) == true){
            let damageOutput = Math.floor(Math.random() * ((weilder.currentPierceAttack + this.damageModifier) - weilder.currentPierceAttack + 1)) + weilder.currentPierceAttack;
            damageOutput = this.checkDamage(damageOutput, target, this.type);
            target.currentHP = target.currentHP - damageOutput;
            theController.printToGameConsole(`${weilder.name} uses ${this.name} against ${target.name} for ${damageOutput} damage!`);
            theController.playSoundEffect(this.soundEffect);
        }
    }
}

export class Stab extends Ability{
    constructor(){
        super();
        this.name = "stab";
        this.type = "pierce";
        this.speedMultiplier = 0.5;
        this.staminaCost = 3;
        this.magicCost = 0;
        this.damageModifier = 5;
        this.soundEffect = "./audio/soundEffects/Knife-Stab-A10-www.fesliyanstudios.com.mp3";
    }
    activate(weilder, target){
        if(this.checkStamina(weilder, this.staminaCost) == true){
            let damageOutput = Math.floor(Math.random() * ((weilder.currentPierceAttack + this.damageModifier) - weilder.currentPierceAttack + 1)) + weilder.currentPierceAttack;
            damageOutput = this.checkDamage(damageOutput, target, this.type);
            target.currentHP = target.currentHP - damageOutput;
            theController.printToGameConsole(`${weilder.name} uses ${this.name} against ${target.name} for ${damageOutput} damage!`);
            theController.playSoundEffect(this.soundEffect);
        }
    }
}
export class Block extends Ability{
    constructor(){
        super();
        this.name = "block";
        this.type = "";
        this.speedMultiplier = 0.75;
        this.staminaCost = 1;
        this.magicCost = 0;
        this.soundEffect = "./audio/soundEffects/anvil-hit-2-14845.mp3";
    }
    activate(weilder, target){
        if(this.checkStamina(weilder, this.staminaCost) == true){
            theController.printToGameConsole(`${weilder.name} uses ${this.name}!`);
            theController.playSoundEffect(this.soundEffect);
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
        this.type = "";
        this.speedMultiplier = 0.75;
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
        theController.printToGameConsole(`${weilder.name} channels magic!`);
        theController.playSoundEffect(this.soundEffect);
    }
    canUse(weilder){
        if(weilder.currentMagic == weilder.maxMagic){
            theController.printToGameConsole(`${weilder.name} cannot recover more magic!`);
            return false;
        }
    }
}

export class Recover extends Ability{
    constructor(){
        super();
        this.name = "recover";
        this.type = "";
        this.speedMultiplier = 0.75;
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
        theController.printToGameConsole(`${weilder.name} recovers stamina!`);
        theController.playSoundEffect(this.soundEffect);
    }
    canUse(weilder){
        if(weilder.currentStamina == weilder.maxStamina){
            theController.printToGameConsole(`${weilder.name} cannot recover more stamina!`);
            return false;
        }
    }
}
export class Retreat extends Ability{
    constructor(){
        super();
        this.name = "retreat";
        this.type = "";
        this.speedMultiplier = 0.5;
        this.staminaCost = 0;
        this.magicCost = 0;
        this.soundEffect = "./audio/soundEffects/energy-90321.mp3";
    }
    activate(weilder, target){
        theController.printToGameConsole(`${weilder.name} retreats!`);
        theController.playSoundEffect(this.soundEffect);
        return "retreat";
    }
}
export class Bite extends Ability{
    constructor(){
        super();
        this.name = "bite";
        this.type = "pierce";
        this.speedMultiplier = 0.5;
        this.staminaCost = 2;
        this.magicCost = 0;
        this.damageModifier = 3;
        this.soundEffect = "./audio/soundEffects/chomp1.mp3";
    }
    activate(weilder, target){
        if(this.checkStamina(weilder, this.staminaCost) == true){
            let damageOutput = Math.floor(Math.random() * ((weilder.currentPierceAttack + this.damageModifier) - weilder.currentPierceAttack + 1)) + weilder.currentPierceAttack;
            damageOutput = this.checkDamage(damageOutput, target, this.type);
            target.currentHP = target.currentHP - damageOutput;
            theController.printToGameConsole(`${weilder.name} uses ${this.name} against ${target.name} for ${damageOutput} damage!`);
            theController.playSoundEffect(this.soundEffect);
        }
    }
}
export class Pounce extends Ability{
    constructor(){
        super();
        this.name = "pounce";
        this.type = "blunt";
        this.speedMultiplier = 0.25;
        this.staminaCost = 4;
        this.magicCost = 0;
        this.damageModifier = 2;
        this.soundEffect = "./audio/soundEffects/sword-sound-2-36274.mp3";
    }
    activate(weilder, target){
        if(this.checkStamina(weilder, this.staminaCost) == true){
            let damageOutput = Math.floor(Math.random() * ((weilder.currentBluntAttack + this.damageModifier) - weilder.currentBluntAttack + 1)) + weilder.currentBluntAttack;
            damageOutput = this.checkDamage(damageOutput, target, this.type);
            target.currentHP = target.currentHP - damageOutput;
            theController.printToGameConsole(`${weilder.name} uses ${this.name} against ${target.name} for ${damageOutput} damage!`);
            theController.playSoundEffect(this.soundEffect);
            if(damageOutput > 0){
                if(Math.random()*2 < 1){
                    for(let i = 0; i < target.statusArray.length; i++){
                        if(target.statusArray[i].name == "bound"){
                            target.statusArray[i].currentCharges = target.statusArray[i].maxCharges;
                            return;
                        }
                    }
                    target.statusArray.push(new Bound(target));
                    theController.printToGameConsole(`${target.name} has been bound!`);
                }
            }
        }
    }    
}
export class LeechLife extends Ability{
    constructor(){
        super();
        this.name = "leech life";
        this.type = "pierce";
        this.speedMultiplier = 0.25;
        this.staminaCost = 4;
        this.magicCost = 0;
        this.damageModifier = 2;
        this.soundEffect = "./audio/soundEffects/platzender-kopf_nachschlag-91637.mp3";
    }
    activate(weilder, target){
        if(this.checkStamina(weilder, this.staminaCost) == true){
            let damageOutput = Math.floor(Math.random() * ((weilder.currentPierceAttack + this.damageModifier) - weilder.currentPierceAttack + 1)) + weilder.currentPierceAttack;
            damageOutput = this.checkDamage(damageOutput, target, this.type);
            target.currentHP = target.currentHP - damageOutput;
            let restoreAmount = damageOutput;
            if(weilder.currentHP + damageOutput > weilder.maxHP){
                restoreAmount = weilder.maxHP - weilder.currentHP 
            }
            weilder.currentHP = weilder.currentHP + restoreAmount;
            theController.printToGameConsole(`${weilder.name} uses ${this.name} against ${target.name} for ${damageOutput} damage and restores ${restoreAmount} health!`);
            theController.playSoundEffect(this.soundEffect);
        }
    }
}

export class ArcaneDart extends Ability{
    constructor(){
        super();
        this.name = "arcane dart";
        this.type = "arcane";
        this.speedMultiplier = 0.5;
        this.staminaCost = 0;
        this.magicCost = 2;
        this.damageModifier = 3;
        this.soundEffect = "./audio/soundEffects/magic-spell-6005.mp3";
    }
    activate(weilder, target){
        if(this.checkMagic(weilder, this.magicCost) == true){
            let damageOutput = Math.floor(Math.random() * ((weilder.currentArcaneAttack + this.damageModifier) - weilder.currentArcaneAttack + 1)) + weilder.currentArcaneAttack;
            damageOutput = this.checkDamage(damageOutput, target, this.type);
            target.currentHP = target.currentHP - damageOutput;
            theController.printToGameConsole(`${weilder.name} uses ${this.name} against ${target.name} for ${damageOutput} damage!`);
            theController.playSoundEffect(this.soundEffect);
        }
    }
}

export class ArcaneBlast extends Ability{
    constructor(){
        super();
        this.name = "arcane blast";
        this.type = "arcane";
        this.speedMultiplier = 0.25;
        this.staminaCost = 0;
        this.magicCost = 6;
        this.damageModifier = 6;
        this.soundEffect = "./audio/soundEffects/magic-spell-6005.mp3";
    }
    activate(weilder, target){
        if(this.checkMagic(weilder, this.magicCost) == true){
            let damageOutput = Math.floor(Math.random() * ((weilder.currentArcaneAttack + this.damageModifier) - weilder.currentArcaneAttack + 1)) + weilder.currentArcaneAttack;
            damageOutput = this.checkDamage(damageOutput, target, this.type);
            target.currentHP = target.currentHP - damageOutput;
            theController.printToGameConsole(`${weilder.name} uses ${this.name} against ${target.name} for ${damageOutput} damage!`);
            weilder.currentArcaneAttack = weilder.baseArcaneAttack;
            theController.playSoundEffect(this.soundEffect);
        }
    }
}

export class Struggle extends Ability{
    constructor(){
        super();
        this.name = "struggle";
        this.type = "";
        this.speedMultiplier = 0.5;
        this.staminaCost = 0;
        this.magicCost = 0;
        this.soundEffect = "./audio/soundEffects/power-down-45784.mp3";
    }
    activate(weilder, target){
            theController.printToGameConsole(`${weilder.name} cannot move!`);
            theController.playSoundEffect(this.soundEffect);
    }
}
export class SpitBile extends Ability{
    constructor(){
        super();
        this.name = "spit bile";
        this.type = "elemental";
        this.speedMultiplier = 0.25;
        this.staminaCost = 4;
        this.magicCost = 0;
        this.damageModifier = 2;
        this.soundEffect = "./audio/soundEffects/sword-sound-2-36274.mp3";
    }
    activate(weilder, target){
        if(this.checkStamina(weilder, this.staminaCost) == true){
            let damageOutput = Math.floor(Math.random() * ((weilder.currentElementalAttack + this.damageModifier) - weilder.currentElementalAttack + 1)) + weilder.currentElementalAttack;
            damageOutput = this.checkDamage(damageOutput, target, this.type);
            target.currentHP = target.currentHP - damageOutput;
            theController.printToGameConsole(`${weilder.name} uses ${this.name} against ${target.name} for ${damageOutput} damage!`);
            theController.playSoundEffect(this.soundEffect);
            if(damageOutput > 0){
                for(let i = 0; i < target.statusArray.length; i++){
                    if(target.statusArray[i].name == "poisoned"){
                        target.statusArray[i].currentCharges = target.statusArray[i].maxCharges;
                        return;
                    }
                }
                target.statusArray.push(new Poisoned(target));
                theController.printToGameConsole(`${target.name} has been poisoned!`);
            }
        }
    }  
}
export class Fireball extends Ability{
    constructor(){
        super();
        this.name = "fireball";
        this.type = "elemental";
        this.speedMultiplier = 0.5;
        this.staminaCost = 0;
        this.magicCost = 4;
        this.damageModifier = 2;
        this.soundEffect = "./audio/soundEffects/short-fireball-woosh-6146.mp3";
    }
    activate(weilder, target){
        if(this.checkMagic(weilder, this.magicCost) == true){
            let damageOutput = Math.floor(Math.random() * ((weilder.currentElementalAttack + this.damageModifier) - weilder.currentElementalAttack + 1)) + weilder.currentElementalAttack;
            damageOutput = this.checkDamage(damageOutput, target, this.type);
            target.currentHP = target.currentHP - damageOutput;
            theController.printToGameConsole(`${weilder.name} uses ${this.name} against ${target.name} for ${damageOutput} damage!`);
            theController.playSoundEffect(this.soundEffect);
            if(damageOutput > 0){
                if(Math.random()*3 < 1){
                    for(let i = 0; i < target.statusArray.length; i++){
                        if(target.statusArray[i].name == "burned"){
                            target.statusArray[i].currentCharges = target.statusArray[i].maxCharges;
                            return;
                        }
                    }
                    target.statusArray.push(new Burned(target));
                    theController.printToGameConsole(`${target.name} has been burned!`);
                } 
            }
        }
    } 
}
export class Devour extends Ability{
    constructor(){
        super();
        this.name = "devour";
        this.type = "pierce";
        this.speedMultiplier = 0.25;
        this.staminaCost = 20;
        this.magicCost = 0;
        this.damageModifier = "";
        this.soundEffect = "./audio/soundEffects/chomp1.mp3";
    }
    activate(weilder, target){
        if(this.checkStamina(weilder, this.staminaCost) == true){
            let damageOutput = Math.floor(target.currentHP*0.7);
            damageOutput = this.checkDamage(damageOutput, target, this.type);
            target.currentHP = target.currentHP - damageOutput;
            theController.printToGameConsole(`${weilder.name} uses ${this.name} against ${target.name} for ${damageOutput} damage!`);
            theController.playSoundEffect(this.soundEffect);
        }
    }
}
export class Eviscerate extends Ability{
    constructor(){
        super();
        this.name = "eviscerate";
        this.type = "pierce";
        this.speedMultiplier = 0.75;
        this.staminaCost = 5;
        this.magicCost = 0;
        this.damageModifier = 2;
        this.soundEffect = "./audio/soundEffects/slash1.mp3";
    }
    activate(weilder, target){
        if(this.checkStamina(weilder, this.staminaCost) == true){
            let damageOutput = Math.floor(Math.random() * ((weilder.currentPierceAttack + this.damageModifier) - weilder.currentPierceAttack + 1)) + weilder.currentPierceAttack;
            if(target.currentHP == target.maxHP){
                damageOutput = Math.floor(damageOutput * 1.5);
            }
            damageOutput = this.checkDamage(damageOutput, target, this.type);
            target.currentHP = target.currentHP - damageOutput;
            theController.printToGameConsole(`${weilder.name} uses ${this.name} against ${target.name} for ${damageOutput} damage!`);
            theController.playSoundEffect(this.soundEffect);
        }
    }
}
export class DrinkHealthPotion extends Ability{
    constructor(){
        super();
        this.name = "drink health potion";
        this.type = "";
        this.speedMultiplier = 0.5;
        this.staminaCost = 0;
        this.magicCost = 0;
        this.soundEffect = "./audio/soundEffects/energy-90321.mp3";
    }
    activate(weilder, target){
        if(weilder.currentHP == weilder.maxHP){
            theController.printToGameConsole(`${weilder.name} cannot restore more health!`);
            return false;
        }
        let hp = 10 + 2 * weilder.level;
        if(weilder.currentHP + hp > weilder.maxHP){
            hp = weilder.maxHP - weilder.currentHP;
        }
        weilder.currentHP = weilder.currentHP + hp;
        theController.printToGameConsole(`${weilder.name} restores ${hp} health!`);
        return true;
    }
    canUse(weilder){
        if(weilder.currentHP == weilder.maxHP){
            theController.printToGameConsole(`${weilder.name} cannot restore more health`);
            return false;
        }
    }
}
export class DrinkStaminaPotion extends Ability{
    constructor(){
        super();
        this.name = "drink stamina potion";
        this.type = "";
        this.speedMultiplier = 0.5;
        this.staminaCost = 0;
        this.magicCost = 0;
        this.soundEffect = "./audio/soundEffects/energy-90321.mp3";
    }
    activate(weilder, target){
        if(weilder.currentStamina == weilder.maxStamina){
            theController.printToGameConsole(`${weilder.name} cannot restore more stamina!`);
            return false;
        }
        let stamina = 5 + weilder.level;
        if(weilder.currentStamina + stamina > weilder.maxStamina){
            stamina = weilder.maxStamina - weilder.currentStamina;
        }
        weilder.currentStamina = weilder.currentStamina + stamina;
        theController.printToGameConsole(`${weilder.name} restores ${stamina} stamina!`);
        return true;
    }
    canUse(weilder){
        if(weilder.currentStamina == weilder.maxStamina){
            theController.printToGameConsole(`${weilder.name} cannot recover more stamina!`);
            return false;
        }
    }
}
export class DrinkMagicPotion extends Ability{
    constructor(){
        super();
        this.name = "drink magic potion";
        this.type = "";
        this.speedMultiplier = 0.5;
        this.staminaCost = 0;
        this.magicCost = 0;
        this.soundEffect = "./audio/soundEffects/energy-90321.mp3";
    }
    activate(weilder, target){
        if(weilder.currentMagic == weilder.maxMagic){
            theController.printToGameConsole(`${weilder.name} cannot restore more magic!`);
            return false;
        }
        let magic = 5 + weilder.level;
        if(weilder.currentMagic + magic > weilder.maxMagic){
            magic = weilder.maxMagic - weilder.currentMagic;
        }
        weilder.currentMagic = weilder.currentMagic + magic;
        theController.printToGameConsole(`${weilder.name} restores ${magic} magic!`);
        return true;
    }
    canUse(weilder){
        if(weilder.currentMagic == weilder.maxMagic){
            theController.printToGameConsole(`${weilder.name} cannot recover more magic!`);
            return false;
        }
    }
}
export class ThrowKnife extends Ability{
    constructor(){
        super();
        this.name = "throw knife";
        this.type = "pierce";
        this.speedMultiplier = 0.5;
        this.staminaCost = 0;
        this.magicCost = 0;
        this.soundEffect = "./audio/soundEffects/energy-90321.mp3";
    }
    activate(weilder, target){
        if(target === undefined){
            theController.printToGameConsole("cannot use outside of combat!");
            return;
        }
        let damageOutput =  3 + (weilder.level * 2);
        damageOutput = this.checkDamage(damageOutput, target, this.type);
        target.currentHP = target.currentHP - damageOutput;
        theController.printToGameConsole(`${weilder.name} throws a throwing knfife at the ${target.name} for ${damageOutput} damage!`);
    }
}
export class ThrowPoisonedKnife extends Ability{
    constructor(){
        super();
        this.name = "throw poison knife";
        this.type = "pierce";
        this.speedMultiplier = 0.75;
        this.staminaCost = 0;
        this.magicCost = 0;
        this.soundEffect = "./audio/soundEffects/energy-90321.mp3";
    }
    activate(weilder, target){
        if(target === undefined){
            theController.printToGameConsole("cannot use outside of combat!");
            return;
        }
        let damageOutput =  3 + (weilder.level * 2);
        damageOutput = this.checkDamage(damageOutput, target, this.type);
        target.currentHP = target.currentHP - damageOutput;
        theController.printToGameConsole(`${weilder.name} throws a poisoned throwing knfife at the ${target.name} for ${damageOutput} damage!`);
        if(damageOutput > 0){
            for(let i = 0; i < target.statusArray.length; i++){
                if(target.statusArray[i].name == "poisoned"){
                    target.statusArray[i].currentCharges = target.statusArray[i].maxCharges;
                    return;
                }
            }
            target.statusArray.push(new Poisoned(target));
            theController.printToGameConsole(`${target.name} has been poisoned!`);
        }
    }
}
export class SmashMeteorite extends Ability{
    constructor(){
        super();
        this.name = "smash meteorite";
        this.soundEffect = "./audio/soundEffects/energy-90321.mp3";
    }
    activate(weilder, target){
        if(target !== undefined){
            theController.printToGameConsole("cannot use in combat!");
            return;
        }
        weilder.maxHP = weilder.maxHP + 1;
        weilder.maxStamina = weilder.maxStamina + 1;
        weilder.maxMagic = weilder.maxMagic + 1;
        weilder.currentHP = weilder.currentHP + 1;
        weilder.currentStamina = weilder.currentStamina + 1;
        weilder.currentMagic = weilder.currentMagic + 1;
        theController.printToGameConsole(`${weilder.name} smashes a meteorite!`);
        return true;
    }
}



