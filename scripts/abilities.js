import {controller as theController} from "./main.js"
import {Shielded, Bound, Poisoned, Burned, Empowered, Paralyzed, Channeled, Frostbite, Invigorated, Hidden, Bleeding} from "./statusEffects.js";

class Ability{
    canUse(weilder, currentCharacter){
        if(weilder === currentCharacter){
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
                weilder.nextMove = new Meditate;
            }
        }
        if(this.canUseSpecialCondition(weilder, currentCharacter) == false){
            return false;
        }
    }
    canUseSpecialCondition(weilder, currentCharacter){
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
    checkDamage(damage, weilder, target, type){
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
        for(let i = 0; i < target.statusArray.length; i++){
            target.statusArray[i].onRecieveDamage();
        }
        for(let j = 0; j < weilder.statusArray.length; j++){
            weilder.statusArray[j].onDeliverDamage();
        }
        if(damageOutput <= 0){
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
    checkMiss(weilder, target, abilityName){
        if(Math.random()*this.accuracy < target.currentEvasion){
            theController.printToGameConsole(`${target.name} avoids ${weilder.name}'s ${abilityName} attack!`);
            return true; //attack misses
        }
    }
}
export class SwitchCombatant extends Ability{
    constructor(partyIndex){
        super();
        this.partyIndex = partyIndex;
        this.name = "switch combatant";
        this.type = "";
        this.speedMultiplier = 0.1;
        this.staminaCost = 0;
        this.magicCost = 0;
        this.soundEffect = "./audio/soundEffects/energy-90321.mp3";
    }
    activate(weilder, target){
        let temp = theController.party[0];
        theController.party[0] = theController.party[this.partyIndex];
        theController.party[this.partyIndex] = temp;
        
        theController.playSoundEffect(this.soundEffect);
        theController.updateParty();
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
        theController.printToGameConsole(`${weilder.name} recovers ${stamina} stamina!`);
        theController.playSoundEffect(this.soundEffect);
    }
    canUseSpecialCondition(weilder){
        if(weilder.currentStamina == weilder.maxStamina){
            theController.printToGameConsole(`${weilder.name} cannot recover more stamina!`);
            return false;
        }
    }
}
export class Meditate extends Ability{
    constructor(){
        super();
        this.name = "meditate";
        this.type = "";
        this.speedMultiplier = 0.75;
        this.staminaCost = 0;
        this.magicCost = 0;
        this.accuracy = "";
        this.soundEffect = "./audio/soundEffects/energy-90321.mp3";
    }
    activate(weilder, target){
        let magic = Math.floor(weilder.maxMagic * 0.2);
        if(weilder.currentMagic + magic > weilder.maxMagic){
            magic = weilder.maxMagic - weilder.currentMagic;
        }
        weilder.currentMagic = weilder.currentMagic + magic;
        theController.printToGameConsole(`${weilder.name} restores ${magic} magic!`);
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
        this.accuracy = "";
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
        this.accuracy = "";
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
        this.speedMultiplier = 1;
        this.staminaCost = 4;
        this.magicCost = 0;
        this.damageModifier = 2;
        this.accuracy = 80;
        this.soundEffect = "./audio/soundEffects/face-punch-2-84757.wav";
    }
    activate(weilder, target){
        if(this.checkStamina(weilder) == true){
            theController.playSoundEffect(this.soundEffect);
            if(this.checkMiss(weilder, target, this.name) == true){
                return;
            }
            let damageOutput = Math.floor(Math.random() * ((weilder.currentBluntAttack + this.damageModifier) - weilder.currentBluntAttack + 1)) + weilder.currentBluntAttack;
            damageOutput = this.checkDamage(damageOutput, weilder, target, this.type);
            target.currentHP = target.currentHP - damageOutput;
            theController.printToGameConsole(`${weilder.name} uses ${this.name} against ${target.name} for ${damageOutput} damage!`);
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
        this.accuracy = 80;
        this.soundEffect = "./audio/soundEffects/mixkit-metal-hit-woosh-1485.wav";
    }
    activate(weilder, target){
        if(this.checkStamina(weilder) == true){
            theController.playSoundEffect(this.soundEffect);
            if(this.checkMiss(weilder, target, this.name) == true){
                return;
            }
            let damageOutput = Math.floor(Math.random() * ((((weilder.currentBluntAttack + weilder.currentPierceAttack)/2) + this.damageModifier) - ((weilder.currentBluntAttack + weilder.currentPierceAttack)/2) + 1)) + Math.floor(((weilder.currentBluntAttack + weilder.currentPierceAttack)/2));
            damageOutput = this.checkDamage(damageOutput, weilder, target, this.type);
            target.currentHP = target.currentHP - damageOutput;
            theController.printToGameConsole(`${weilder.name} uses ${this.name} against ${target.name} for ${damageOutput} damage!`);
            if(damageOutput > 0){
                if(Math.random()*10 < 1){
                    for(let i = 0; i < target.statusArray.length; i++){
                        if(target.statusArray[i].name == "bleeding"){
                            return;
                        }
                    }
                    target.statusArray.push(new Bleeding(target));
                } 
            }
        }
    }
}
export class GuardBreak extends Ability{
    constructor(){
        super();
        this.name = "guard break";
        this.type = "blunt";
        this.speedMultiplier = 0.5;
        this.staminaCost = 12;
        this.magicCost = 0;
        this.damageModifier = 4;
        this.accuracy = 80;
        this.soundEffect = "./audio/soundEffects/mixkit-metallic-sword-strike-2160.wav";
    }
    activate(weilder, target){
        if(this.checkStamina(weilder) == true){
            theController.playSoundEffect(this.soundEffect);
            if(this.checkMiss(weilder, target, this.name) == true){
                return;
            }
            let damageOutput = Math.floor(Math.random() * ((weilder.currentBluntAttack + this.damageModifier) - weilder.currentBluntAttack + 1)) + weilder.currentBluntAttack;
            for(let i = 0; i < target.statusArray.length; i++){
                if(target.statusArray[i].name == "shielded"){
                    target.statusArray[i].onRemove();
                    target.statusArray.splice(i, 1);
                    damageOutput = Math.floor(damageOutput * 1.5);
                    break;
                }
            }
            let damageOutput1 = this.checkDamage(damageOutput, weilder, target, this.type);
            damageOutput1 = Math.floor(damageOutput1/2)
            let damageOutput2 = damageOutput - target.currentBluntDefense;
            if(target.currentStamina - damageOutput2 < 0){
                damageOutput2 = target.currentStamina;
            }
            theController.animateVitalBar(target, "stamina");
            target.currentHP = target.currentHP - damageOutput1;
            target.currentStamina = target.currentStamina - damageOutput2;
            theController.printToGameConsole(`${weilder.name} uses ${this.name} against ${target.name} for ${damageOutput1} damage and ${damageOutput2} stamina damage!`);
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
        this.accuracy = 80;
        this.soundEffect = "./audio/soundEffects/mixkit-metallic-sword-strike-2160.wav";
    }
    activate(weilder, target){
        if(this.checkStamina(weilder) == true){
            theController.playSoundEffect(this.soundEffect);
            if(this.checkMiss(weilder, target, this.name) == true){
                return;
            }
            let damageOutput = Math.floor(Math.random() * ((weilder.currentBluntAttack + this.damageModifier) - weilder.currentBluntAttack + 1)) + weilder.currentBluntAttack;
           damageOutput = this.checkDamage(damageOutput, weilder, target, this.type);
            target.currentHP = target.currentHP - damageOutput;
            theController.printToGameConsole(`${weilder.name} uses ${this.name} against ${target.name} for ${damageOutput} damage!`);
        }
    }
}
export class Stab extends Ability{
    constructor(){
        super();
        this.name = "stab";
        this.type = "pierce";
        this.speedMultiplier = 0.75;
        this.staminaCost = 8;
        this.magicCost = 0;
        this.damageModifier = 4;
        this.accuracy = 80;
        this.soundEffect = "./audio/soundEffects/Knife-Stab-A10-www.fesliyanstudios.com.mp3";
    }
    activate(weilder, target){
        if(this.checkStamina(weilder) == true){
            theController.playSoundEffect(this.soundEffect);
            if(this.checkMiss(weilder, target, this.name) == true){
                return;
            }
            let damageOutput = Math.floor(Math.random() * ((weilder.currentPierceAttack + this.damageModifier) - weilder.currentPierceAttack + 1)) + weilder.currentPierceAttack;
            damageOutput = this.checkDamage(damageOutput, weilder, target, this.type);
            target.currentHP = target.currentHP - damageOutput;
            theController.printToGameConsole(`${weilder.name} uses ${this.name} against ${target.name} for ${damageOutput} damage!`);
            if(damageOutput > 0){
                if(Math.random()*10 < 1){
                    for(let i = 0; i < target.statusArray.length; i++){
                        if(target.statusArray[i].name == "bleeding"){
                            return;
                        }
                    }
                    target.statusArray.push(new Bleeding(target));
                } 
            }
        }
    }
}
export class Flurry extends Ability{
    constructor(){
        super();
        this.name = "flurry";
        this.type = "pierce";
        this.speedMultiplier = 0.25;
        this.staminaCost = 16;
        this.magicCost = 0;
        this.damageModifier = 8;
        this.accuracy = 70;
        this.soundEffect = "./audio/soundEffects/Knife-Stab-A10-www.fesliyanstudios.com.mp3";
    }
    activate(weilder, target){
        if(this.checkStamina(weilder) == true){
            theController.playSoundEffect(this.soundEffect);
            if(this.checkMiss(weilder, target, this.name) == true){
                return;
            }
            let damageOutput = Math.floor(Math.random() * ((weilder.currentPierceAttack + this.damageModifier) - (weilder.currentPierceAttack + this.damageModifier/2) + 1)) + (weilder.currentPierceAttack + this.damageModifier/2);
            damageOutput = this.checkDamage(damageOutput, weilder, target, this.type);
            target.currentHP = target.currentHP - damageOutput;
            theController.printToGameConsole(`${weilder.name} uses ${this.name} against ${target.name} for ${damageOutput} damage!`);
            if(damageOutput > 0){
                if(Math.random()*10 < 1){
                    for(let i = 0; i < target.statusArray.length; i++){
                        if(target.statusArray[i].name == "bleeding"){
                            return;
                        }
                    }
                    target.statusArray.push(new Bleeding(target));
                } 
            }
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
        this.damageModifier = 2;
        this.accuracy = 80;
        this.soundEffect = "./audio/soundEffects/chomp1.mp3";
    }
    activate(weilder, target){
        if(this.checkStamina(weilder) == true){
            theController.playSoundEffect(this.soundEffect);
            if(this.checkMiss(weilder, target, this.name) == true){
                return;
            }
            let damageOutput = Math.floor(Math.random() * ((((weilder.currentBluntAttack + weilder.currentPierceAttack)/2) + this.damageModifier) - ((weilder.currentBluntAttack + weilder.currentPierceAttack)/2) + 1)) + Math.floor(((weilder.currentBluntAttack + weilder.currentPierceAttack)/2));
            damageOutput = this.checkDamage(damageOutput, weilder, target, this.type);
            target.currentHP = target.currentHP - damageOutput;
            theController.printToGameConsole(`${weilder.name} uses ${this.name} against ${target.name} for ${damageOutput} damage!`);
            if(damageOutput > 0){
                if(Math.random()*10 < 1){
                    for(let i = 0; i < target.statusArray.length; i++){
                        if(target.statusArray[i].name == "bleeding"){
                            return;
                        }
                    }
                    target.statusArray.push(new Bleeding(target));
                } 
            }
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
        this.accuracy = 60;
        this.soundEffect = "./audio/soundEffects/sword-sound-2-36274.mp3";
    }
    activate(weilder, target){
        if(this.checkStamina(weilder) == true){
            theController.playSoundEffect(this.soundEffect);
            if(this.checkMiss(weilder, target, this.name) == true){
                return;
            }
            let damageOutput = Math.floor(Math.random() * ((weilder.currentBluntAttack + this.damageModifier) - weilder.currentBluntAttack + 1)) + weilder.currentBluntAttack;
           damageOutput = this.checkDamage(damageOutput, weilder, target, this.type);
            target.currentHP = target.currentHP - damageOutput;
            theController.printToGameConsole(`${weilder.name} uses ${this.name} against ${target.name} for ${damageOutput} damage!`);
            if(damageOutput > 0){
                if(Math.random()*2 < 1){
                    for(let i = 0; i < target.statusArray.length; i++){
                        if(target.statusArray[i].name == "bound"){
                            return;
                        }
                    }
                    target.statusArray.push(new Bound(target));
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
        this.accuracy = 80;
        this.soundEffect = "./audio/soundEffects/Knife-Stab-A10-www.fesliyanstudios.com.mp3";
    }
    activate(weilder, target){
        if(this.checkStamina(weilder) == true){
            theController.playSoundEffect(this.soundEffect);
            if(this.checkMiss(weilder, target, this.name) == true){
                return;
            }
            let damageOutput = Math.floor(Math.random() * ((weilder.currentPierceAttack + this.damageModifier) - weilder.currentPierceAttack + 1)) + weilder.currentPierceAttack;
            damageOutput = this.checkDamage(damageOutput, weilder, target, this.type);
            target.currentHP = target.currentHP - damageOutput;
            theController.printToGameConsole(`${weilder.name} uses ${this.name} against ${target.name} for ${damageOutput} damage!`);
            if(damageOutput > 0){
                if(Math.random()*3 < 1){
                    for(let i = 0; i < target.statusArray.length; i++){
                        if(target.statusArray[i].name == "bleeding"){
                            return;
                        }
                    }
                    target.statusArray.push(new Bleeding(target));
                } 
            }
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
        this.accuracy = "";
        this.soundEffect = "./audio/soundEffects/anvil-hit-2-14845.mp3";
    }
    activate(weilder, target){
        if(this.checkStamina(weilder) == true){
            theController.printToGameConsole(`${weilder.name} uses ${this.name}!`);
            theController.playSoundEffect(this.soundEffect);
            for(let i = 0; i < weilder.statusArray.length; i++){
                if(weilder.statusArray[i].name == "shielded"){
                    weilder.statusArray[i].currentCharges = weilder.statusArray[i].maxCharges;
                    return;
                }
            }
            let status = new Shielded(weilder)
            status.onApplied();
            weilder.statusArray.push(status);
        }
    }
}
export class ShieldBash extends Ability{
    constructor(){
        super();
        this.name = "shield bash";
        this.type = "blunt";
        this.speedMultiplier = 0.75;
        this.staminaCost = 16;
        this.magicCost = 0;
        this.damageModifier = 4;
        this.accuracy = 80;
        this.soundEffect = "./audio/soundEffects/anvil-hit-2-14845.mp3";
    }
    activate(weilder, target){
        if(this.checkStamina(weilder) == true){
            theController.playSoundEffect(this.soundEffect);
            if(this.checkMiss(weilder, target, this.name) == true){
                return;
            }
            let damageOutput = Math.floor(Math.random() * ((weilder.currentBluntAttack + this.damageModifier) - weilder.currentBluntAttack + 1)) + weilder.currentBluntAttack;
            damageOutput = this.checkDamage(damageOutput, weilder, target, this.type);
            damageOutput = Math.floor(damageOutput/2)
            let messageAddon = "";
            if(target.currentBluntDefense >= (target.baseBluntDefense - 6)){
                target.currentBluntDefense = target.currentBluntDefense - 2;
                messageAddon = ", lowering physical defense, and";
            }
            if(target.currentPierceDefense >= (target.basePierceDefense - 6)){
                target.currentPierceDefense = target.currentPierceDefense - 2;
                messageAddon = ", lowering physical defense, and";
            }
            target.currentHP = target.currentHP - damageOutput;
            theController.printToGameConsole(`${weilder.name} uses ${this.name} against ${target.name}` + messageAddon + ` dealing ${damageOutput} damage!`);
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
        this.accuracy = 80;
        this.soundEffect = "./audio/soundEffects/platzender-kopf_nachschlag-91637.mp3";
    }
    activate(weilder, target){
        if(this.checkStamina(weilder) == true){
            theController.playSoundEffect(this.soundEffect);
            if(this.checkMiss(weilder, target, this.name) == true){
                return;
            }
            let damageOutput = Math.floor(Math.random() * ((((weilder.currentArcaneAttack + weilder.currentPierceAttack)/2) + this.damageModifier) - ((weilder.currentArcaneAttack + weilder.currentPierceAttack)/2) + 1)) + Math.floor(((weilder.currentArcaneAttack + weilder.currentPierceAttack)/2));
           damageOutput = this.checkDamage(damageOutput, weilder, target, this.type);
            target.currentHP = target.currentHP - damageOutput;
            let restoreAmount = Math.floor(damageOutput/2);
            if(weilder.currentHP + restoreAmount > weilder.maxHP){
                restoreAmount = weilder.maxHP - weilder.currentHP 
            }
            weilder.currentHP = weilder.currentHP + restoreAmount;
            theController.printToGameConsole(`${weilder.name} uses ${this.name} against ${target.name} for ${damageOutput} damage and restores ${restoreAmount} health!`);
        }
    }
}
export class SpitBile extends Ability{
    constructor(){
        super();
        this.name = "spit bile";
        this.type = "elemental";
        this.speedMultiplier = 0.5;
        this.staminaCost = 12;
        this.magicCost = 0;
        this.damageModifier = 3;
        this.accuracy = 80;
        this.soundEffect = "./audio/soundEffects/platzender-kopf_nachschlag-91637.mp3";
    }
    activate(weilder, target){
        if(this.checkStamina(weilder) == true){
            theController.playSoundEffect(this.soundEffect);
            if(this.checkMiss(weilder, target, this.name) == true){
                return;
            }
            let damageOutput = Math.floor(Math.random() * ((weilder.currentElementalAttack + this.damageModifier) - weilder.currentElementalAttack + 1)) + weilder.currentElementalAttack;
           damageOutput = this.checkDamage(damageOutput, weilder, target, this.type);
            target.currentHP = target.currentHP - damageOutput;
            theController.printToGameConsole(`${weilder.name} uses ${this.name} against ${target.name} for ${damageOutput} damage!`);
            if(damageOutput > 0){
                if(Math.random()*3 < 1){
                    for(let i = 0; i < target.statusArray.length; i++){
                        if(target.statusArray[i].name == "poisoned"){
                            return;
                        }
                    }
                    target.statusArray.push(new Poisoned(target));
                }
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
        this.accuracy = 80;
        this.soundEffect = "./audio/soundEffects/short-fireball-woosh-6146.mp3";
    }
    activate(weilder, target){
        if(this.checkMagic(weilder) == true){
            theController.playSoundEffect(this.soundEffect);
            if(this.checkMiss(weilder, target, this.name) == true){
                return;
            }
            let damageOutput = Math.floor(Math.random() * ((weilder.currentElementalAttack + this.damageModifier) - weilder.currentElementalAttack + 1)) + weilder.currentElementalAttack;
           damageOutput = this.checkDamage(damageOutput, weilder, target, this.type);
            target.currentHP = target.currentHP - damageOutput;
            theController.printToGameConsole(`${weilder.name} uses ${this.name} against ${target.name} for ${damageOutput} damage!`);
            theController.playSoundEffect(this.soundEffect);
            if(damageOutput > 0){
                if(Math.random()*3 < 1){
                    for(let i = 0; i < target.statusArray.length; i++){
                        if(target.statusArray[i].name == "burned"){
                            return;
                        }
                    }
                    target.statusArray.push(new Burned(target));
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
        this.speedMultiplier = 0.5;
        this.staminaCost = 0;
        this.magicCost = 8;
        this.damageModifier = 2;
        this.accuracy = 200;
        this.soundEffect = "./audio/soundEffects/short-fireball-woosh-6146.mp3";
    }
     activate(weilder, target){
        if(this.checkMagic(weilder) == true){
            theController.playSoundEffect(this.soundEffect);
            if(this.checkMiss(weilder, target, this.name) == true){
                return;
            }
            let damageOutput = Math.floor(Math.random() * ((weilder.currentElementalAttack + this.damageModifier) - weilder.currentElementalAttack + 1)) + weilder.currentElementalAttack;
            let damageOutputEnemy = this.checkDamage(damageOutput, weilder, target, this.type);
            target.currentHP = target.currentHP - damageOutputEnemy;
            let damageOutputSelf = this.checkDamage(damageOutput, weilder, target, this.type);
            weilder.currentHP = weilder.currentHP - damageOutputSelf;
            theController.printToGameConsole(`${weilder.name} uses ${this.name}! Burning ${weilder.name} for ${damageOutputSelf} damage and ${target.name} for ${damageOutputEnemy} damage!`);
            for(let i = 0; i < weilder.statusArray.length; i++){
                if(weilder.statusArray[i].name == "empowered"){
                    weilder.statusArray[i].currentCharges = weilder.statusArray[i].maxCharges;
                    return;
                }
            }
            let status = new Empowered(weilder);
            status.onApplied();
            weilder.statusArray.push(status);
        }
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
        this.accuracy = 80;
        this.soundEffect = "./audio/soundEffects/075681_electric-shock-33018.wav";
    }
    activate(weilder, target){
        if(this.checkMagic(weilder) == true){
            theController.playSoundEffect(this.soundEffect);
            if(this.checkMiss(weilder, target, this.name) == true){
                return;
            }
            let damageOutput = Math.floor(Math.random() * ((weilder.currentElementalAttack + this.damageModifier) - weilder.currentElementalAttack + 1)) + weilder.currentElementalAttack;
            damageOutput = this.checkDamage(damageOutput, weilder, target, this.type);
            target.currentHP = target.currentHP - damageOutput;
            theController.printToGameConsole(`${weilder.name} uses ${this.name} against ${target.name} for ${damageOutput} damage!`);
            if(damageOutput > 0){
                if(Math.random()*3 < 1){
                    for(let i = 0; i < target.statusArray.length; i++){
                        if(target.statusArray[i].name == "paralyzed"){
                            return;
                        }
                    }
                    target.statusArray.push(new Paralyzed(target));
                } 
            }
        }
    } 
}
export class Shockwave extends Ability{
    constructor(){
        super();
        this.name = "shock wave";
        this.type = "bluntElemental";
        this.speedMultiplier = 0.75;
        this.staminaCost = 0;
        this.magicCost = 12;
        this.damageModifier = 3;
        this.accuracy = 80;
        this.soundEffect = "./audio/soundEffects/075681_electric-shock-33018.wav";
    }
    activate(weilder, target){
        if(this.checkMagic(weilder) == true){
            theController.playSoundEffect(this.soundEffect);
            if(this.checkMiss(weilder, target, this.name) == true){
                return;
            }
            let damageOutput = Math.floor(Math.random() * ((((weilder.currentBluntAttack + weilder.currentElementalAttack)/2) + this.damageModifier) - ((weilder.currentBluntAttack + weilder.currentElementalAttack)/2) + 1)) + Math.floor(((weilder.currentBluntAttack + weilder.currentElementalAttack)/2));
            for(let i = 0; i < target.statusArray.length; i++){
                if(target.statusArray[i].name == "shielded"){
                    target.statusArray[i].onRemove();
                    target.statusArray.splice(i, 1);
                    damageOutput = Math.floor(damageOutput * 1.5);
                    break;
                }
            }
            let damageOutput1 = this.checkDamage(damageOutput, weilder, target, this.type);
            damageOutput1 = Math.floor(damageOutput1/2)
            let damageOutput2 = damageOutput - Math.floor((target.currentBluntDefense + target.currentElementalDefense)/2);
            if(target.currentStamina - damageOutput2 < 0){
                damageOutput2 = target.currentStamina;
            }
            theController.animateVitalBar(target, "stamina");
            target.currentHP = target.currentHP - damageOutput1;
            target.currentStamina = target.currentStamina - damageOutput2;
            theController.printToGameConsole(`${weilder.name} uses ${this.name} against ${target.name} for ${damageOutput1} damage and ${damageOutput2} stamina damage!`);
        }
    } 
}
export class Channel extends Ability{
    constructor(){
        super();
        this.name = "channel";
        this.type = "arcaneElemental";
        this.speedMultiplier = 0.75;
        this.staminaCost = 0;
        this.magicCost = 10;
        this.damageModifier = 0;
        this.accuracy = "";
        this.soundEffect = "./audio/soundEffects/075681_electric-shock-33018.wav";
    }
     activate(weilder, target){
        if(this.checkMagic(weilder) == true){
            theController.printToGameConsole(`${weilder.name} uses ${this.name}!`);
            theController.playSoundEffect(this.soundEffect);
            for(let i = 0; i < weilder.statusArray.length; i++){
                if(weilder.statusArray[i].name == "channeled"){
                    weilder.statusArray[i].currentCharges = weilder.statusArray[i].maxCharges;
                    return;
                }
            }
            weilder.statusArray.push(new Channeled(weilder));
        }
    }
    canUseSpecialCondition(weilder, currentCharacter){
        if(weilder !== currentCharacter){
            for(let i = 0; i < weilder.statusArray.length; i++){
                if(weilder.statusArray[i].name == "channeled"){
                    return false;
                }
            }
        }
    }
}
export class Recuperate extends Ability{
    constructor(){
        super();
        this.name = "recuperate";
        this.type = "bluntPierce";
        this.speedMultiplier = 0.75;
        this.staminaCost = 10;
        this.magicCost = 0;
        this.damageModifier = 0;
        this.accuracy = "";
        this.soundEffect = "./audio/soundEffects/energy-90321.mp3";
    }
     activate(weilder, target){
        if(this.checkStamina(weilder) == true){
            theController.printToGameConsole(`${weilder.name} uses ${this.name}!`);
            theController.playSoundEffect(this.soundEffect);
            for(let i = 0; i < weilder.statusArray.length; i++){
                if(weilder.statusArray[i].name == "invigorated"){
                    weilder.statusArray[i].currentCharges = weilder.statusArray[i].maxCharges;
                    return;
                }
            }
            weilder.statusArray.push(new Invigorated(weilder));
        }
    }
    canUseSpecialCondition(weilder, currentCharacter){
        if(weilder !== currentCharacter){
            for(let i = 0; i < weilder.statusArray.length; i++){
                if(weilder.statusArray[i].name == "invigorated"){
                    return false;
                }
            }
        }
    }
}
export class IceShard extends Ability{
    constructor(){
        super();
        this.name = "ice shard";
        this.type = "elemental";
        this.speedMultiplier = 0.5;
        this.staminaCost = 0;
        this.magicCost = 12;
        this.damageModifier = 3;
        this.accuracy = 80;
        this.soundEffect = "./audio/soundEffects/magic-spell-6005.mp3";
    }
    activate(weilder, target){
        if(this.checkMagic(weilder) == true){
            theController.playSoundEffect(this.soundEffect);
            if(this.checkMiss(weilder, target, this.name) == true){
                return;
            }
            let damageOutput = Math.floor(Math.random() * ((weilder.currentElementalAttack + this.damageModifier) - weilder.currentElementalAttack + 1)) + weilder.currentElementalAttack;
            damageOutput = this.checkDamage(damageOutput, weilder, target, this.type);
            target.currentHP = target.currentHP - damageOutput;
            theController.printToGameConsole(`${weilder.name} uses ${this.name} against ${target.name} for ${damageOutput} damage!`);
            theController.playSoundEffect(this.soundEffect);
            if(damageOutput > 0){
                if(Math.random()*3 < 1){
                    for(let i = 0; i < target.statusArray.length; i++){
                        if(target.statusArray[i].name == "frostbite"){
                            return;
                        }
                    }
                    target.statusArray.push(new Frostbite(target));
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
        this.accuracy = "";
        this.soundEffect = "./audio/soundEffects/mixkit-deep-air-woosh-2604.wav";
    }
     activate(weilder, target){
        if(this.checkMagic(weilder) == true){
            theController.printToGameConsole(`${weilder.name} uses ${this.name}!`);
            theController.playSoundEffect(this.soundEffect);
            for(let i = 0; i < weilder.statusArray.length; i++){
                if(weilder.statusArray[i].name == "shielded"){
                    weilder.statusArray[i].currentCharges = weilder.statusArray[i].maxCharges;
                    return;
                }
            }
            let status = new Shielded(weilder)
            status.onApplied();
            weilder.statusArray.push(status);
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
        this.accuracy = 80;
        this.soundEffect = "./audio/soundEffects/magic-spell-6005.mp3";
    }
    activate(weilder, target){
        if(this.checkMagic(weilder) == true){
            theController.playSoundEffect(this.soundEffect);
            if(this.checkMiss(weilder, target, this.name) == true){
                return;
            }
            let damageOutput = Math.floor(Math.random() * ((((weilder.currentPierceAttack + weilder.currentArcaneAttack)/2) + this.damageModifier) - ((weilder.currentPierceAttack + weilder.currentArcaneAttack)/2) + 1)) + Math.floor(((weilder.currentPierceAttack + weilder.currentArcaneAttack)/2));
           damageOutput = this.checkDamage(damageOutput, weilder, target, this.type);
            target.currentHP = target.currentHP - damageOutput;
            theController.printToGameConsole(`${weilder.name} uses ${this.name} against ${target.name} for ${damageOutput} damage!`);
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
        this.damageModifier = 12;
        this.accuracy = 60;
        this.soundEffect = "./audio/soundEffects/supernatural-explosion-104295.wav";
    }
    activate(weilder, target){
        if(this.checkMagic(weilder) == true){
            theController.playSoundEffect(this.soundEffect);
            if(this.checkMiss(weilder, target, this.name) == true){
                return;
            }
            let damageOutput = Math.floor(Math.random() * ((weilder.currentArcaneAttack + this.damageModifier) - (weilder.currentArcaneAttack + (this.damageModifier/2)) + 1)) + (weilder.currentArcaneAttack + (this.damageModifier/2));
           damageOutput = this.checkDamage(damageOutput, weilder, target, this.type);
            target.currentHP = target.currentHP - damageOutput;
            theController.printToGameConsole(`${weilder.name} uses ${this.name} against ${target.name} for ${damageOutput} damage!`);
            weilder.currentArcaneAttack = weilder.baseArcaneAttack;
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
        this.accuracy = 80;
        this.soundEffect = "./audio/soundEffects/supernatural-explosion-104295.wav";
    }
    activate(weilder, target){
        if(this.checkMagic(weilder) == true){
            theController.playSoundEffect(this.soundEffect);
            for(let i = 0; i < target.statusArray.length; i++){
                if(target.statusArray[i].name == "hidden"){
                    target.statusArray[i].onRemove();
                    target.statusArray.splice(i, 1);
                    break;
                }
            }
            if(this.checkMiss(weilder, target, this.name) == true){
                return;
            }
            let damageOutput = Math.floor(Math.random() * ((weilder.currentArcaneAttack + this.damageModifier) - weilder.currentArcaneAttack + 1)) + weilder.currentArcaneAttack;
            damageOutput = this.checkDamage(damageOutput, weilder, target, this.type);
            target.currentHP = target.currentHP - damageOutput;
            theController.printToGameConsole(`${weilder.name} uses ${this.name} against ${target.name} for ${damageOutput} damage!`);
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
        this.accuracy = "";
        this.soundEffect = "./audio/soundEffects/mixkit-light-spell-873.wav";
    }
    activate(weilder, target){ 
        if(this.checkMagic(weilder) == true){  
            theController.printToGameConsole(`${weilder.name} was cleansed of the ${weilder.statusArray[0].name} effect.`);
            weilder.statusArray.splice(0, 1);
            theController.playSoundEffect(this.soundEffect);
            return;
        } 
    }
    canUseSpecialCondition(weilder, currentCharacter){
        for(let i = 0; i < weilder.statusArray.length; i++){
            if(weilder.statusArray[i].isCleansable == true){
                return true;
            }
        }
        if(weilder === currentCharacter){
            theController.printToGameConsole(`${weilder.name} has no negative status conditions to cleanse.`);
        }
        return false;
    }
}
export class DrainLife extends Ability{
    constructor(){
        super();
        this.name = "drain life";
        this.type = "arcane";
        this.speedMultiplier = 0.25;
        this.staminaCost = 0;
        this.magicCost = 16;
        this.damageModifier = 3;
        this.accuracy = 60;
        this.soundEffect = "./audio/soundEffects/totem-strike-96497.wav";
    }
    activate(weilder, target){
        if(this.checkMagic(weilder) == true){
            theController.playSoundEffect(this.soundEffect);
            if(this.checkMiss(weilder, target, this.name) == true){
                return;
            }
            let damageOutput = Math.floor(Math.random() * ((weilder.currentArcaneAttack + this.damageModifier) - weilder.currentArcaneAttack + 1)) + weilder.currentArcaneAttack;
           damageOutput = this.checkDamage(damageOutput, weilder, target, this.type);
            target.currentHP = target.currentHP - damageOutput;
            let restoreAmount = Math.floor(damageOutput/2);
            if(weilder.currentHP + restoreAmount > weilder.maxHP){
                restoreAmount = weilder.maxHP - weilder.currentHP 
            }
            weilder.currentHP = weilder.currentHP + restoreAmount;
            theController.printToGameConsole(`${weilder.name} uses ${this.name} against ${target.name} for ${damageOutput} damage and restores ${restoreAmount} health!`);
        }
    }
}
export class Siphon extends Ability{
    constructor(){
        super();
        this.name = "siphon";
        this.type = "arcane";
        this.speedMultiplier = 0.75;
        this.staminaCost = 0;
        this.magicCost = 8;
        this.damageModifier = 4;
        this.accuracy = 100;
        this.soundEffect = "./audio/soundEffects/mixkit-deep-air-woosh-2604.wav";
    }
    activate(weilder, target){
        if(this.checkMagic(weilder) == true){
            theController.playSoundEffect(this.soundEffect);
            if(this.checkMiss(weilder, target, this.name) == true){
                return;
            }
            let damageOutput = Math.floor(Math.random() * ((weilder.currentArcaneAttack + this.damageModifier) - weilder.currentArcaneAttack + 1)) + weilder.currentArcaneAttack;
            damageOutput = this.checkDamage(damageOutput, weilder, target, this.type);
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
        }
    }
}
export class Devour extends Ability{
    constructor(){
        super();
        this.name = "devour";
        this.type = "bluntPierce";
        this.speedMultiplier = 0.25;
        this.staminaCost = 30;
        this.magicCost = 0;
        this.accuracy = 60;
        this.soundEffect = "./audio/soundEffects/chomp1.mp3";
    }
    activate(weilder, target){
        if(this.checkStamina(weilder) == true){
            theController.playSoundEffect(this.soundEffect);
            if(this.checkMiss(weilder, target, this.name) == true){
                return;
            }
            let damageOutput = Math.floor(target.currentHP + ((target.currentBluntDefense + target.currentPierceDefense)/2) * 0.6);
            damageOutput = this.checkDamage(damageOutput, weilder, target, this.type);
            target.currentHP = target.currentHP - damageOutput;
            theController.printToGameConsole(`${weilder.name} uses ${this.name} against ${target.name} for ${damageOutput} damage!`);
        }
    }
}
export class CastShadow extends Ability{
    constructor(){
        super();
        this.name = "cast shadow";
        this.type = "pierceArcane";
        this.speedMultiplier = 0.5;
        this.staminaCost = 8;
        this.magicCost = 10;
        this.accuracy = "";
        this.soundEffect = "./audio/soundEffects/mixkit-deep-air-woosh-2604.wav";
    }
    activate(weilder, target){
        if(this.checkStamina(weilder) == true && this.checkMagic(weilder) == true){
            theController.printToGameConsole(`${weilder.name} uses ${this.name}!`);
            theController.playSoundEffect(this.soundEffect);
            let hiddenCheck = true;
            let empoweredCheck = true;
            for(let i = 0; i < weilder.statusArray.length; i++){
                if(weilder.statusArray[i].name == "hidden" && hiddenCheck == true){
                    weilder.statusArray[i].currentCharges = weilder.statusArray[i].maxCharges;
                    hiddenCheck = false;
                }
                if(weilder.statusArray[i].name == "empowered" && hiddenCheck == false){
                    weilder.statusArray[i].currentCharges = weilder.statusArray[i].maxCharges;
                    empoweredCheck = false;
                }
            }
            if(hiddenCheck == true){
                let status = new Hidden(weilder);
                status.onApplied();
                weilder.statusArray.push(status);
            }
            if(empoweredCheck == true){
                let status = new Empowered(weilder);
                status.onApplied();
                weilder.statusArray.push(status);
            }
        }
    }
}
export class BlinkStrike extends Ability{
    constructor(){
        super();
        this.name = "blink strike";
        this.type = "pierceArcane";
        this.speedMultiplier = 0.75;
        this.staminaCost = 8;
        this.magicCost = 10;
        this.damageModifier = 2;
        this.accuracy = 100;
        this.soundEffect = "./audio/soundEffects/mixkit-deep-air-woosh-2604.wav";
    }
    activate(weilder, target){
        if(this.checkStamina(weilder) == true && this.checkMagic(weilder) == true){
            theController.playSoundEffect(this.soundEffect);
            if(this.checkMiss(weilder, target, this.name) == true){
                return;
            }
            let damageOutput = Math.floor(Math.random() * ((((weilder.currentPierceAttack + weilder.currentArcaneAttack)/2) + this.damageModifier) - ((weilder.currentPierceAttack + weilder.currentArcaneAttack)/2) + 1)) + Math.floor(((weilder.currentPierceAttack + weilder.currentArcaneAttack)/2));
            damageOutput = this.checkDamage(damageOutput, weilder, target, this.type);
            target.currentHP = target.currentHP - Math.floor(damageOutput/2);
            let switchFlag = false;
            if(weilder === theController.party[0]){
                if(theController.party.length > 1){
                    let temp = theController.party[0];
                    theController.party[0] = theController.party[1];
                    theController.party[1] = temp;
                    switchFlag = true;
                    theController.updateParty();
                }
            }else{
                if(theController.battle.hostileParty.length > 1){
                    let temp = theController.battle.hostileParty[0];
                    theController.battle.hostileParty[0] = theController.battle.hostileParty[1];
                    theController.battle.hostileParty[1] = temp;
                    switchFlag = true;
                    theController.updateEnemyStats();
                }
            }
            if(switchFlag == true){
                theController.printToGameConsole(`${weilder.name} uses ${this.name} against ${target.name} for ${damageOutput} damage and teleports away!`);
            }else{
                theController.printToGameConsole(`${weilder.name} uses ${this.name} against ${target.name} for ${damageOutput} damage!`);
            }
        }
    }
}
export class Empower extends Ability{
    constructor(){
        super();
        this.name = "empower";
        this.type = "arcaneElemental";
        this.speedMultiplier = 0.5;
        this.staminaCost = 0;
        this.magicCost = 8;
        this.damageModifier = 2;
        this.accuracy = "";
        this.soundEffect = "./audio/soundEffects/short-fireball-woosh-6146.mp3";
    }
     activate(weilder, target){
        if(this.checkMagic(weilder) == true){
            theController.playSoundEffect(this.soundEffect);
            theController.printToGameConsole(`${weilder.name} uses empower!`);
            for(let i = 0; i < weilder.statusArray.length; i++){
                if(weilder.statusArray[i].name == "empowered"){
                    weilder.statusArray[i].currentCharges = weilder.statusArray[i].maxCharges;
                    return;
                }
            }
            let status = new Empowered(weilder);
            status.onApplied();
            weilder.statusArray.push(status);
        }
    }
    canUseSpecialCondition(weilder, currentCharacter){
        if(weilder !== currentCharacter){
            for(let i = 0; i < weilder.statusArray.length; i++){
                if(weilder.statusArray[i].name == "empowered"){
                    return false;
                }
            }
        }
    }
}
export class WildSwing extends Ability{
    constructor(){
        super();
        this.name = "wild swing";
        this.type = "blunt";
        this.speedMultiplier = 0.75;
        this.staminaCost = 12;
        this.magicCost = 0;
        this.damageModifier = 10;
        this.accuracy = 80;
        this.soundEffect = "./audio/soundEffects/mixkit-metallic-sword-strike-2160.wav";
    }
    activate(weilder, target){
        if(this.checkStamina(weilder) == true){
            theController.playSoundEffect(this.soundEffect);
            if(this.checkMiss(weilder, target, this.name) == true){
                return;
            }
            let damageOutput = Math.floor(Math.random() * ((weilder.currentBluntAttack + this.damageModifier) - (weilder.currentBluntAttack + Math.floor(this.damageModifier/2)) + 1)) + (weilder.currentBluntAttack + Math.floor(this.damageModifier/2));
            damageOutput = this.checkDamage(damageOutput, weilder, target, this.type);
            target.currentHP = target.currentHP - damageOutput;
            theController.printToGameConsole(`${weilder.name} uses ${this.name} against ${target.name} for ${damageOutput} damage!`);
        }
    }
}
export class Roar extends Ability{
    constructor(){
        super();
        this.name = "roar";
        this.type = "blunt";
        this.speedMultiplier = 1.0;
        this.staminaCost = 4;
        this.magicCost = 0;
        this.damageModifier = 0;
        this.accuracy = 100;
        this.soundEffect = "./audio/soundEffects/tiger-creature-roar-fantasy-monster-sfx-201129_0081-95599.wav";
    }
    activate(weilder, target){
        if(this.checkStamina(weilder) == true){
            theController.playSoundEffect(this.soundEffect);
            if(this.checkMiss(weilder, target, this.name) == true){
                return;
            }
            let messageAddon = "lowering physical attack as low as possible!";
            if(target.currentBluntAttack >= (target.baseBluntAttack - 9)){
                target.currentBluntAttack = target.currentBluntAttack - 3;
                messageAddon = ", lowering physical attack";
            }
            if(target.currentPierceAttack >= (target.basePierceAttack - 9)){
                target.currentPierceAttack = target.currentPierceAttack - 3;
                messageAddon = ", lowering physical attack";
            }
            theController.printToGameConsole(`${weilder.name} uses ${this.name} against ${target.name}` + messageAddon);
        }
    }
}
/*
export class SummonMeteor extends Ability{

}
export class ShapeShift extends Ability{

}
export class WildSwing extends Ability{

}
export class ThrowWeapon extends Ability{

}
export class Darkpact extends Ability{

}
*/
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
        theController.playSoundEffect(this.soundEffect);
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
        theController.playSoundEffect(this.soundEffect);
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
        theController.playSoundEffect(this.soundEffect);
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
        this.accuracy = 80;
        this.soundEffect = "./audio/soundEffects/arrow-body-impact-146419.mp3";
    }
    activate(weilder, target){
        let damageOutput = Math.floor(Math.random() * ((weilder.currentPierceAttack + this.damageModifier) - weilder.currentPierceAttack + 1)) + weilder.currentPierceAttack;
        damageOutput = this.checkDamage(damageOutput, weilder, target, this.type);
        target.currentHP = target.currentHP - damageOutput;
        theController.printToGameConsole(`${weilder.name} throws a throwing knife at the ${target.name} for ${damageOutput} damage!`);
        theController.playSoundEffect(this.soundEffect);
    }
    canUse(weilder){
        if(theController.isInBattle == false){
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
        this.accuracy = 80;
        this.soundEffect = "./audio/soundEffects/arrow-body-impact-146419.mp3";
    }
    activate(weilder, target){
        let damageOutput = Math.floor(Math.random() * ((weilder.currentPierceAttack + this.damageModifier) - weilder.currentPierceAttack + 1)) + weilder.currentPierceAttack;
       damageOutput = this.checkDamage(damageOutput, weilder, target, this.type);
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
        theController.playSoundEffect(this.soundEffect);
    }
    canUse(weilder){
        if(theController.isInBattle == false){
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
        theController.levelCharacterUp();
        theController.playSoundEffect(this.soundEffect);
        return true;
    }
    canUse(weilder){
        if(theController.isInBattle == true){
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
                theController.playSoundEffect(this.soundEffect);
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
                theController.playSoundEffect(this.soundEffect);
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
export class UseBandage extends Ability{
    constructor(){
        super();
        this.name = "use bandage";
        this.type = "";
        this.speedMultiplier = 0.5;
        this.staminaCost = 0;
        this.magicCost = 0;
        this.soundEffect = "./audio/soundEffects/energy-90321.mp3";
    }
    activate(weilder, target){
        for(let i = 0; i < weilder.statusArray.length; i++){
            if(weilder.statusArray[i].name == "bleeding"){
                weilder.statusArray.splice(i, 1);
                theController.printToGameConsole(`${weilder.name} was treated for bleeding!`);
                theController.playSoundEffect(this.soundEffect);
                return;
            }
        }
    }
    canUse(weilder){
        for(let i = 0; i < weilder.statusArray.length; i++){
            if(weilder.statusArray[i].name == "bleeding"){
                return true;
            }
        }
        theController.printToGameConsole(`${weilder.name} is not bleeding.`);
        return false;
    }
}
export class UseFrostbiteTonic extends Ability{
    constructor(){
        super();
        this.name = "use frostbite tonic";
        this.type = "";
        this.speedMultiplier = 0.5;
        this.staminaCost = 0;
        this.magicCost = 0;
        this.soundEffect = "./audio/soundEffects/energy-90321.mp3";
    }
    activate(weilder, target){
        for(let i = 0; i < weilder.statusArray.length; i++){
            if(weilder.statusArray[i].name == "frostbite"){
                weilder.statusArray.splice(i, 1);
                theController.printToGameConsole(`${weilder.name} was treated for frostbite!`);
                theController.playSoundEffect(this.soundEffect);
                return;
            }
        }
    }
    canUse(weilder){
        for(let i = 0; i < weilder.statusArray.length; i++){
            if(weilder.statusArray[i].name == "bleeding"){
                return true;
            }
        }
        theController.printToGameConsole(`${weilder.name} does not have frostbite.`);
        return false;
    }
}
export class UseParalysisTonic extends Ability{
    constructor(){
        super();
        this.name = "use paralysis tonic";
        this.type = "";
        this.speedMultiplier = 0.5;
        this.staminaCost = 0;
        this.magicCost = 0;
        this.soundEffect = "./audio/soundEffects/energy-90321.mp3";
    }
    activate(weilder, target){
        for(let i = 0; i < weilder.statusArray.length; i++){
            if(weilder.statusArray[i].name == "paralysis"){
                weilder.statusArray.splice(i, 1);
                theController.printToGameConsole(`${weilder.name} was treated for paraylsis!`);
                theController.playSoundEffect(this.soundEffect);
                return;
            }
        }
    }
    canUse(weilder){
        for(let i = 0; i < weilder.statusArray.length; i++){
            if(weilder.statusArray[i].name == "paralysis"){
                return true;
            }
        }
        theController.printToGameConsole(`${weilder.name} is not paralyzed.`);
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
        this.accuracy = "";
        this.soundEffect = "./audio/soundEffects/energy-90321.mp3";
    }
    activate(weilder, target){
        theController.printToGameConsole(`${weilder.name} traps ${target.name} in a net!`);
        for(let i = 0; i < target.statusArray.length; i++){
            if(target.statusArray[i].name == "bound"){
                target.statusArray[i].currentCharges = target.statusArray[i].maxCharges;
                theController.playSoundEffect(this.soundEffect);
                return;
            }
        }
        target.statusArray.push(new Bound(target));
    }
    canUse(weilder){
        if(theController.isInBattle == false){
            theController.printToGameConsole("cannot use outside of combat.");
            return false;
        }
    }
}
export class ThrowSmokebomb extends Ability{
    constructor(){
        super();
        this.name = "throw smokebomb";
        this.type = "";
        this.speedMultiplier = 0.75;
        this.staminaCost = 0;
        this.magicCost = 0;
        this.damageModifier = 0;
        this.accuracy = "";
        this.soundEffect = "./audio/soundEffects/supernatural-explosion-104295.wav";
    }
    activate(weilder, target){
        theController.printToGameConsole(`${weilder.name} throws a smokebomb!`);
        theController.playSoundEffect(this.soundEffect);
        for(let i = 0; i < weilder.statusArray.length; i++){
            if(weilder.statusArray[i].name == "hidden"){
                weilder.statusArray[i].currentCharges = weilder.statusArray[i].maxCharges;
                return;
            }
        }
        let status = new Hidden(weilder);
        status.onApplied();
        weilder.statusArray.push(status);
    }
    canUse(weilder){
        if(theController.isInBattle == false){
            theController.printToGameConsole("cannot use outside of combat.");
            return false;
        }
    }
    canUseSpecialCondition(weilder, currentCharacter){
        if(weilder !== currentCharacter){
            for(let i = 0; i < weilder.statusArray.length; i++){
                if(weilder.statusArray[i].name == "hidden"){
                    return false;
                }
            }
        }
    }
}
