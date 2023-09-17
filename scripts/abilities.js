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
            if(this.canUseSpecialCondition(weilder, player) == false){
                return false;
            }
        }else{
            if(weilder.currentStamina - this.staminaCost < 0){
                weilder.nextMove = new Recover;
            }
            if(weilder.currentMagic - this.magicCost < 0){
                weilder.nextMove = new Channel;
            }
            if(this.canUseSpecialCondition(weilder, player) == false){
                return false;
            }
        }
    }
    canUseSpecialCondition(weilder, player){
        return true;
    }
    checkStamina(weilder){
        if(weilder.currentStamina - this.staminaCost < 0){
            theController.printToGameConsole(`${weilder.name} does not have enough stamina!`);
            return false;
        }else{
            weilder.currentStamina = weilder.currentStamina - this.staminaCost;
            theController.animateVitalBar(weilder, "stamina");
            return true;
        }
    }
    checkMagic(weilder){
        if(weilder.currentMagic - this.magicCost < 0){
            theController.printToGameConsole(`${weilder.name} does not have enough magic!`);
            return false;
        }else{
            weilder.currentMagic = weilder.currentMagic - this.magicCost;
            theController.animateVitalBar(weilder, "magic");
            return true;
        }
    }
    checkDamage(damage, target, type){
        let damageOutput = 0;
        switch(type){
            case "blunt":
                damageOutput = damage - target.currentBluntDefense;
                break;
            case "pierce":
                damageOutput = damage - target.currentPierceDefense;
                break;
            case "arcane":
                damageOutput = damage - target.currentArcaneDefense;
                break;
            case "elemental":
                damageOutput = damage - target.currentElementalDefense;
                break;
            case "bluntPierce":
                damageOutput = damage - Math.floor((target.currentBluntDefense + target.currentPierceDefense)/2);
                break;
            case "bluntArcane":
                damageOutput = damage - Math.floor((target.currentBluntDefense + target.currentArcaneDefense)/2);
                break;
            case "bluntElemental":
                damageOutput = damage - Math.floor((target.currentBluntDefense + target.currentElementalDefense)/2);
                break;
            case "pierceArcane":
                damageOutput = damage - Math.floor((target.currentPierceDefense + target.currentArcaneDefense)/2);
                break;
            case "pierceElemental":
                damageOutput = damage - Math.floor((target.currentPierceDefense + target.currentElementalDefense)/2);
                break;
            case "arcaneElemental":
                damageOutput = damage - Math.floor((target.currentArcaneDefense + target.currentElementalDefense)/2);
                break;              
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
    canUseSpecialCondition(weilder){
        if(weilder.currentStamina == weilder.maxStamina){
            theController.printToGameConsole(`${weilder.name} cannot recover more stamina!`);
            return false;
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
    canUseSpecialCondition(weilder){
        if(weilder.currentMagic == weilder.maxMagic){
            theController.printToGameConsole(`${weilder.name} cannot recover more magic!`);
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
        this.staminaCost = 30;
        this.magicCost = 0;
        this.soundEffect = "./audio/soundEffects/energy-90321.mp3";
    }
    activate(weilder, target){
        if(this.checkStamina(weilder) == true){
            theController.printToGameConsole(`${weilder.name} retreats!`);
            theController.playSoundEffect(this.soundEffect);
            return "retreat";
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
export class Punch extends Ability{
    constructor(){
        super();
        this.name = "punch";
        this.type = "blunt";
        this.speedMultiplier = 0.75;
        this.staminaCost = 4;
        this.magicCost = 0;
        this.damageModifier = 2;
        this.soundEffect = "./audio/soundEffects/soundEffects/punch-140236.mp3";
    }
    activate(weilder, target){
        if(this.checkStamina(weilder) == true){
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
        this.type = "bluntPierce";
        this.speedMultiplier = 0.75;
        this.staminaCost = 8;
        this.magicCost = 0;
        this.damageModifier = 4;
        this.soundEffect = "./audio/soundEffects/sword-sound-2-36274.mp3";
    }
    activate(weilder, target){
        if(this.checkStamina(weilder) == true){
            let damageOutput = Math.floor(Math.random() * ((((weilder.currentBluntAttack + weilder.currentPierceAttack)/2) + this.damageModifier) - ((weilder.currentBluntAttack + weilder.currentPierceAttack)/2) + 1)) + Math.floor(((weilder.currentBluntAttack + weilder.currentPierceAttack)/2));
            damageOutput = this.checkDamage(damageOutput, target, this.type);
            target.currentHP = target.currentHP - damageOutput;
            theController.printToGameConsole(`${weilder.name} uses ${this.name} against ${target.name} for ${damageOutput} damage!`);
            theController.playSoundEffect(this.soundEffect);
        }
    }
}
export class Strike extends Ability{
    constructor(){
        super();
        this.name = "strike";
        this.type = "blunt";
        this.speedMultiplier = 0.75;
        this.staminaCost = 8;
        this.magicCost = 0;
        this.damageModifier = 4;
        this.soundEffect = "./audio/soundEffects/anvil-hit-2-14845.mp3";
    }
    activate(weilder, target){
        if(this.checkStamina(weilder) == true){
            let damageOutput = Math.floor(Math.random() * ((weilder.currentBluntAttack + this.damageModifier) - weilder.currentBluntAttack + 1)) + weilder.currentBluntAttack;
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
        this.staminaCost = 12;
        this.magicCost = 0;
        this.damageModifier = 6;
        this.soundEffect = "./audio/soundEffects/Knife-Stab-A10-www.fesliyanstudios.com.mp3";
    }
    activate(weilder, target){
        if(this.checkStamina(weilder) == true){
            let damageOutput = Math.floor(Math.random() * ((weilder.currentPierceAttack + this.damageModifier) - weilder.currentPierceAttack + 1)) + weilder.currentPierceAttack;
            damageOutput = this.checkDamage(damageOutput, target, this.type);
            target.currentHP = target.currentHP - damageOutput;
            theController.printToGameConsole(`${weilder.name} uses ${this.name} against ${target.name} for ${damageOutput} damage!`);
            theController.playSoundEffect(this.soundEffect);
        }
    }
}
export class Bite extends Ability{
    constructor(){
        super();
        this.name = "bite";
        this.type = "bluntPierce";
        this.speedMultiplier = 0.5;
        this.staminaCost = 6;
        this.magicCost = 0;
        this.damageModifier = 4;
        this.soundEffect = "./audio/soundEffects/chomp1.mp3";
    }
    activate(weilder, target){
        if(this.checkStamina(weilder) == true){
            let damageOutput = Math.floor(Math.random() * ((((weilder.currentBluntAttack + weilder.currentPierceAttack)/2) + this.damageModifier) - ((weilder.currentBluntAttack + weilder.currentPierceAttack)/2) + 1)) + Math.floor(((weilder.currentBluntAttack + weilder.currentPierceAttack)/2));
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
        this.staminaCost = 16;
        this.magicCost = 0;
        this.damageModifier = 4;
        this.soundEffect = "./audio/soundEffects/sword-sound-2-36274.mp3";
    }
    activate(weilder, target){
        if(this.checkStamina(weilder) == true){
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
export class Eviscerate extends Ability{
    constructor(){
        super();
        this.name = "eviscerate";
        this.type = "pierce";
        this.speedMultiplier = 0.5;
        this.staminaCost = 12;
        this.magicCost = 0;
        this.damageModifier = 3;
        this.soundEffect = "./audio/soundEffects/slash1.mp3";
    }
    activate(weilder, target){
        if(this.checkStamina(weilder) == true){
            let damageOutput = Math.floor(Math.random() * ((weilder.currentPierceAttack + this.damageModifier) - weilder.currentPierceAttack + 1)) + weilder.currentPierceAttack;
            if(target.currentHP >= target.maxHP * 0.5){
                damageOutput = Math.floor(damageOutput * 1.1);
            }
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
        this.speedMultiplier = 1.0;
        this.staminaCost = 6;
        this.magicCost = 0;
        this.soundEffect = "./audio/soundEffects/anvil-hit-2-14845.mp3";
    }
    activate(weilder, target){
        if(this.checkStamina(weilder) == true){
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
export class SheildBash extends Ability{
    constructor(){
        super();
        this.name = "sheild bash";
        this.type = "blunt";
        this.speedMultiplier = 0.75;
        this.staminaCost = 10;
        this.magicCost = 0;
        this.damageModifier = 4;
        this.soundEffect = "./audio/soundEffects/anvil-hit-2-14845.mp3";
    }
    activate(weilder, target){
        if(this.checkStamina(weilder) == true){
            let damageOutput = Math.floor(Math.random() * (weilder.currentBluntAttack - (weilder.currentBluntAttack - this.damageModifier) + 1)) + (weilder.currentBluntAttack - this.damageModifier);
            let messageAddon = "";
            if(target.currentBluntDefense >= (target.baseBluntDefense - 6)){
                target.currentBluntDefense = target.currentBluntDefense - 2;
                messageAddon = ", lowering physical defense, and";
            }
            if(target.currentPierceDefense >= (target.basePierceDefense - 6)){
                target.currentPierceDefense = target.currentPierceDefense - 2;
                messageAddon = ", lowering physical defense, and";
            }
            damageOutput = this.checkDamage(damageOutput, target, this.type);
            target.currentHP = target.currentHP - damageOutput;
            theController.printToGameConsole(`${weilder.name} uses ${this.name} against ${target.name}` + messageAddon + ` dealing ${damageOutput} damage!`);
            theController.playSoundEffect(this.soundEffect);
        }
    }
}
export class LeechLife extends Ability{
    constructor(){
        super();
        this.name = "leech life";
        this.type = "pierceArcane";
        this.speedMultiplier = 0.25;
        this.staminaCost = 12;
        this.magicCost = 0;
        this.damageModifier = 3;
        this.soundEffect = "./audio/soundEffects/platzender-kopf_nachschlag-91637.mp3";
    }
    activate(weilder, target){
        if(this.checkStamina(weilder) == true){
            let damageOutput = Math.floor(Math.random() * ((((weilder.currentArcaneAttack + weilder.currentPierceAttack)/2) + this.damageModifier) - ((weilder.currentArcaneAttack + weilder.currentPierceAttack)/2) + 1)) + Math.floor(((weilder.currentArcaneAttack + weilder.currentPierceAttack)/2));
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
export class SpitBile extends Ability{
    constructor(){
        super();
        this.name = "spit bile";
        this.type = "elemental";
        this.speedMultiplier = 0.25;
        this.staminaCost = 12;
        this.magicCost = 0;
        this.damageModifier = 3;
        this.soundEffect = "./audio/soundEffects/sword-sound-2-36274.mp3";
    }
    activate(weilder, target){
        if(this.checkStamina(weilder) == true){
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
        this.magicCost = 12;
        this.damageModifier = 3;
        this.soundEffect = "./audio/soundEffects/short-fireball-woosh-6146.mp3";
    }
    activate(weilder, target){
        if(this.checkMagic(weilder) == true){
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
export class Immolate extends Ability{
    constructor(){
        super();
        this.name = "immolate";
        this.type = "elemental";
        this.speedMultiplier = 0.75;
        this.staminaCost = 0;
        this.magicCost = 2;
        this.damageModifier = 2;
        this.soundEffect = "./audio/soundEffects/short-fireball-woosh-6146.mp3";
    }
     activate(weilder, target){
        let damageOutput = Math.floor(Math.random() * ((weilder.currentElementalAttack + this.damageModifier) - weilder.currentElementalAttack + 1)) + weilder.currentElementalAttack;
        damageOutput = this.checkDamage(damageOutput, target, this.type);
        target.currentHP = target.currentHP - damageOutput;
        damageOutput = this.checkDamage(damageOutput, weilder, this.type);
        weilder.currentHP = target.currentHP - damageOutput;
        theController.printToGameConsole(`${weilder.name} uses ${this.name}!`);
        theController.playSoundEffect(this.soundEffect);
        for(let i = 0; i < weilder.statusArray.length; i++){
            if(weilder.statusArray[i].name == "empowered"){
                weilder.statusArray[i].currentCharges = weilder.statusArray[i].maxCharges;
                return;
            }
        }
        weilder.statusArray.push(new Empowered(weilder));
    }
}
export class LightningBolt extends Ability{
    constructor(){
        super();
        this.name = "lightning bolt";
        this.type = "elemental";
        this.speedMultiplier = 0.5;
        this.staminaCost = 0;
        this.magicCost = 12;
        this.damageModifier = 3;
        this.soundEffect = "./audio/soundEffects/short-fireball-woosh-6146.mp3";
    }
    activate(weilder, target){
        if(this.checkMagic(weilder) == true){
            let damageOutput = Math.floor(Math.random() * ((weilder.currentElementalAttack + this.damageModifier) - weilder.currentElementalAttack + 1)) + weilder.currentElementalAttack;
            damageOutput = this.checkDamage(damageOutput, target, this.type);
            target.currentHP = target.currentHP - damageOutput;
            theController.printToGameConsole(`${weilder.name} uses ${this.name} against ${target.name} for ${damageOutput} damage!`);
            theController.playSoundEffect(this.soundEffect);
            if(damageOutput > 0){
                if(Math.random()*3 < 1){
                    for(let i = 0; i < target.statusArray.length; i++){
                        if(target.statusArray[i].name == "paralyzed"){
                            target.statusArray[i].currentCharges = target.statusArray[i].maxCharges;
                            return;
                        }
                    }
                    target.statusArray.push(new Paralyzed(target));
                    theController.printToGameConsole(`${target.name} has been paralyzed!`);
                } 
            }
        }
    } 
}
export class Energize extends Ability{
    constructor(){
        super();
        this.name = "energize";
        this.type = "elemental";
        this.speedMultiplier = 0.75;
        this.staminaCost = 0;
        this.magicCost = 10;
        this.damageModifier = 0;
        this.soundEffect = "./audio/soundEffects/short-fireball-woosh-6146.mp3";
    }
     activate(weilder, target){
        if(this.checkStamina(weilder) == true){
            theController.printToGameConsole(`${weilder.name} uses ${this.name}!`);
            theController.playSoundEffect(this.soundEffect);
            for(let i = 0; i < weilder.statusArray.length; i++){
                if(weilder.statusArray[i].name == "energized"){
                    weilder.statusArray[i].currentCharges = weilder.statusArray[i].maxCharges;
                    return;
                }
            }
            weilder.statusArray.push(new Energized(weilder));
        }
    }
}
export class IceShard extends Ability{
    constructor(){
        super();
        this.name = "frost shard";
        this.type = "elemental";
        this.speedMultiplier = 0.5;
        this.staminaCost = 0;
        this.magicCost = 12;
        this.damageModifier = 3;
        this.soundEffect = "./audio/soundEffects/short-fireball-woosh-6146.mp3";
    }
    activate(weilder, target){
        if(this.checkMagic(weilder) == true){
            let damageOutput = Math.floor(Math.random() * ((weilder.currentElementalAttack + this.damageModifier) - weilder.currentElementalAttack + 1)) + weilder.currentElementalAttack;
            damageOutput = this.checkDamage(damageOutput, target, this.type);
            target.currentHP = target.currentHP - damageOutput;
            theController.printToGameConsole(`${weilder.name} uses ${this.name} against ${target.name} for ${damageOutput} damage!`);
            theController.playSoundEffect(this.soundEffect);
            if(damageOutput > 0){
                if(Math.random()*3 < 1){
                    for(let i = 0; i < target.statusArray.length; i++){
                        if(target.statusArray[i].name == "frostbite"){
                            target.statusArray[i].currentCharges = target.statusArray[i].maxCharges;
                            return;
                        }
                    }
                    target.statusArray.push(new Frozen(target));
                    theController.printToGameConsole(`${target.name} has been frostbiten!`);
                } 
            }
        }
    } 
}
export class IceBarrier extends Ability{
    constructor(){
        super();
        this.name = "ice barrier";
        this.type = "elemental";
        this.speedMultiplier = 0.75;
        this.staminaCost = 0;
        this.magicCost = 6;
        this.damageModifier = 0;
        this.soundEffect = "./audio/soundEffects/short-fireball-woosh-6146.mp3";
    }
     activate(weilder, target){
        if(this.checkStamina(weilder) == true){
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
export class ArcaneDart extends Ability{
    constructor(){
        super();
        this.name = "arcane dart";
        this.type = "pierceArcane";
        this.speedMultiplier = 0.75;
        this.staminaCost = 0;
        this.magicCost = 8;
        this.damageModifier = 4;
        this.soundEffect = "./audio/soundEffects/magic-spell-6005.mp3";
    }
    activate(weilder, target){
        if(this.checkMagic(weilder) == true){
            let damageOutput = Math.floor(Math.random() * ((((weilder.currentPierceAttack + weilder.currentArcaneAttack)/2) + this.damageModifier) - ((weilder.currentPierceAttack + weilder.currentArcaneAttack)/2) + 1)) + Math.floor(((weilder.currentPierceAttack + weilder.currentArcaneAttack)/2));
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
        this.magicCost = 16;
        this.damageModifier = 8;
        this.soundEffect = "./audio/soundEffects/magic-spell-6005.mp3";
    }
    activate(weilder, target){
        if(this.checkMagic(weilder) == true){
            let damageOutput = Math.floor(Math.random() * ((weilder.currentArcaneAttack + this.damageModifier) - weilder.currentArcaneAttack + 1)) + weilder.currentArcaneAttack;
            damageOutput = this.checkDamage(damageOutput, target, this.type);
            target.currentHP = target.currentHP - damageOutput;
            theController.printToGameConsole(`${weilder.name} uses ${this.name} against ${target.name} for ${damageOutput} damage!`);
            weilder.currentArcaneAttack = weilder.baseArcaneAttack;
            theController.playSoundEffect(this.soundEffect);
        }
    }
}
export class LightBeam extends Ability{
    constructor(){
        super();
        this.name = "light beam";
        this.type = "arcane";
        this.speedMultiplier = 0.5;
        this.staminaCost = 0;
        this.magicCost = 10;
        this.damageModifier = 6;
        this.soundEffect = "./audio/soundEffects/magic-spell-6005.mp3";
    }
    activate(weilder, target){
        if(this.checkMagic(weilder) == true){
            let damageOutput = Math.floor(Math.random() * ((weilder.currentArcaneAttack + this.damageModifier) - weilder.currentArcaneAttack + 1)) + weilder.currentArcaneAttack;
            damageOutput = this.checkDamage(damageOutput, target, this.type);
            target.currentHP = target.currentHP - damageOutput;
            theController.printToGameConsole(`${weilder.name} uses ${this.name} against ${target.name} for ${damageOutput} damage!`);
            theController.playSoundEffect(this.soundEffect);
        }
    }
}
export class Cleanse extends Ability{
    constructor(){
        super();
        this.name = "cleanse";
        this.type = "arcane";
        this.speedMultiplier = 0.75;
        this.staminaCost = 0;
        this.magicCost = 25;
        this.soundEffect = "./audio/soundEffects/energy-90321.mp3";
    }
    activate(weilder, target){ 
        if(this.checkMagic(weilder) == true){  
            theController.printToGameConsole(`${weilder.name} was cleansed of the ${weilder.statusArray[0].name} effect.`);
            weilder.statusArray.splice(0, 1);
            theController.playSoundEffect(this.soundEffect);
            return;
        } 
    }
    canUseSpecialCondition(weilder, player){
        if(weilder === player){
            if(weilder.statusArray.length <= 0){
                theController.printToGameConsole(`${weilder.name} has no status condition to cleanse.`);
                return false;
            }
        }else{
            if(weilder.statusArray.length <= 0){
                return false;
            }
        }
    }
}
export class DrainLife extends Ability{
    constructor(){
        super();
        this.name = "drain life";
        this.type = "arcane";
        this.speedMultiplier = 0.25;
        this.staminaCost = 0;
        this.magicCost = 15;
        this.damageModifier = 3;
        this.soundEffect = "./audio/soundEffects/mixkit-deep-air-woosh-2604.wav";
    }
    activate(weilder, target){
        if(this.checkStamina(weilder) == true){
            let damageOutput = Math.floor(Math.random() * ((weilder.currentArcaneAttack + this.damageModifier) - weilder.currentArcaneAttack + 1)) + weilder.currentArcaneAttack;
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
export class Siphon extends Ability{
    constructor(){
        super();
        this.name = "siphon";
        this.type = "arcane";
        this.speedMultiplier = 0.25;
        this.staminaCost = 0;
        this.magicCost = 0;
        this.damageModifier = 8;
        this.soundEffect = "./audio/soundEffects/mixkit-deep-air-woosh-2604.wav";
    }
    activate(weilder, target){
        if(this.checkStamina(weilder) == true){
            let damageOutput = Math.floor(Math.random() * ((weilder.currentArcaneAttack + this.damageModifier) - weilder.currentArcaneAttack + 1)) + weilder.currentArcaneAttack;
            damageOutput = this.checkDamage(damageOutput, target, this.type);
            if(target.currentMagic - damageOutput < 0){
                damageOutput = target.currentMagic;
            }
            target.currentMagic = target.currentMagic - damageOutput
            let restoreAmount = damageOutput;
            if(weilder.currentMagic + restoreAmount > weilder.maxMagic){
                restoreAmount = weilder.maxMagic - weilder.currentMagic;
            }
            weilder.currentMagic = weilder.currentMagic + restoreAmount;
            theController.printToGameConsole(`${weilder.name} uses ${this.name} against ${target.name} for ${damageOutput} magic damage and shipons ${restoreAmount} magic!`);
            theController.playSoundEffect(this.soundEffect);
        }
    }
}
export class Devour extends Ability{
    constructor(){
        super();
        this.name = "devour";
        this.type = "bluntPierce";
        this.speedMultiplier = 0.25;
        this.staminaCost = 20;
        this.magicCost = 0;
        this.damageModifier = "";
        this.soundEffect = "./audio/soundEffects/chomp1.mp3";
    }
    activate(weilder, target){
        if(this.checkStamina(weilder) == true){
            let damageOutput = Math.floor(target.currentHP + ((target.currentBluntDefense + target.currentPierceDefense)/2) * 0.7);
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
        let hp = Math.floor(weilder.maxHP * 0.5);
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
        let stamina = Math.floor(weilder.maxStamina * 0.5);
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
        let magic = Math.floor(weilder.maxMagic * 0.5);
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
        this.speedMultiplier = 1.0;
        this.staminaCost = 0;
        this.magicCost = 0;
        this.damageModifier = 3;
        this.soundEffect = "./audio/soundEffects/energy-90321.mp3";
    }
    activate(weilder, target){
        let damageOutput = Math.floor(Math.random() * ((weilder.currentPierceAttack + this.damageModifier) - weilder.currentPierceAttack + 1)) + weilder.currentPierceAttack;
        damageOutput = this.checkDamage(damageOutput, target, this.type);
        target.currentHP = target.currentHP - damageOutput;
        theController.printToGameConsole(`${weilder.name} throws a throwing knife at the ${target.name} for ${damageOutput} damage!`);
    }
    canUse(weilder){
        if(weilder.isInBattle == false){
            theController.printToGameConsole("cannot use outside of combat.");
            return false;
        }
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
        this.damageModifier = 3;
        this.soundEffect = "./audio/soundEffects/energy-90321.mp3";
    }
    activate(weilder, target){
        let damageOutput = Math.floor(Math.random() * ((weilder.currentPierceAttack + this.damageModifier) - weilder.currentPierceAttack + 1)) + weilder.currentPierceAttack;
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
    canUse(weilder){
        if(weilder.isInBattle == false){
            theController.printToGameConsole("cannot use outside of combat.");
            return false;
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
        theController.printToGameConsole(`${weilder.name} smashes a meteorite!`);
        theController.levelPlayerUp();
        return true;
    }
    canUse(weilder){
        if(weilder.isInBattle == true){
            theController.printToGameConsole("cannot use in combat!");
            return false;
        }
        return true;
    }
}
export class UseAntidote extends Ability{
    constructor(){
        super();
        this.name = "use antidote";
        this.type = "";
        this.speedMultiplier = 0.5;
        this.staminaCost = 0;
        this.magicCost = 0;
        this.soundEffect = "./audio/soundEffects/energy-90321.mp3";
    }
    activate(weilder, target){
        for(let i = 0; i < weilder.statusArray.length; i++){
            if(weilder.statusArray[i].name == "poisoned"){
                weilder.statusArray.splice(i, 1);
                theController.printToGameConsole(`${weilder.name} was cured of poison!`);
                return;
            }
        }
    }
    canUse(weilder){
        for(let i = 0; i < weilder.statusArray.length; i++){
            if(weilder.statusArray[i].name == "poisoned"){
                return true;
            }
        }
        theController.printToGameConsole(`${weilder.name} is not poisoned.`);
        return false;
    }
}
export class UseAloeRemedy extends Ability{
    constructor(){
        super();
        this.name = "use aloe remedy";
        this.type = "";
        this.speedMultiplier = 0.5;
        this.staminaCost = 0;
        this.magicCost = 0;
        this.soundEffect = "./audio/soundEffects/energy-90321.mp3";
    }
    activate(weilder, target){
        for(let i = 0; i < weilder.statusArray.length; i++){
            if(weilder.statusArray[i].name == "burned"){
                weilder.statusArray.splice(i, 1);
                theController.printToGameConsole(`${weilder.name} was treated for burns!`);
                return;
            }
        }
    }
    canUse(weilder){
        for(let i = 0; i < weilder.statusArray.length; i++){
            if(weilder.statusArray[i].name == "burned"){
                return true;
            }
        }
        theController.printToGameConsole(`${weilder.name} does not have any burns.`);
        return false;
    }
}
export class ThrowNet extends Ability{
    constructor(){
        super();
        this.name = "throw net";
        this.type = "blunt";
        this.speedMultiplier = 0.5;
        this.staminaCost = 0;
        this.magicCost = 0;
        this.damageModifier = 0;
        this.soundEffect = "./audio/soundEffects/energy-90321.mp3";
    }
    activate(weilder, target){
        theController.printToGameConsole(`${weilder.name} traps ${target.name} in a net!`);
        for(let i = 0; i < target.statusArray.length; i++){
            if(target.statusArray[i].name == "bound"){
                target.statusArray[i].currentCharges = target.statusArray[i].maxCharges;
                return;
            }
        }
        target.statusArray.push(new Bound(target));
        theController.printToGameConsole(`${target.name} has been bound!`);
    }
    canUse(weilder){
        if(weilder.isInBattle == false){
            theController.printToGameConsole("cannot use outside of combat.");
            return false;
        }
    }
}

