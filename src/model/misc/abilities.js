import { Poison, Burn} from "./statusEffects.js";

export class Ability{
    constructor(config){
        this.name = config.name;
        this.iconSrc = config.iconSrc;
        this.background = config.background;
        this.targetCount = config.targetCount || 1;
        this.accuracy = config.accuracy || 1;
        this.speedModifier = config.speedModifier || 1;
        this.damageModifier = config.damageModifier || 1;
        this.healthCost = config.magicCost || 0;
        this.staminaCost = config.staminaCost || 0;
        this.magicCost = config.magicCost || 0;
        this.damageTypes = config.damageTypes;
        this.soundEffectSrc = config.soundEffectSrc;
        this.animationName = config.animationName || 'top-down',
        this.animationDuration = config.animationDuration || 2000;
        this.sequenceType = config.sequenceType || 'chain',
        this.message;
    }
    calculateDamage(attacker, target){
        let rawDamage = 0;
        for(let i = 0; i < this.damageTypes.length; i++){
            switch(this.damageTypes[i]){
                case 'blunt':
                    rawDamage += (attacker.currentBluntAttack * (1 - target.currentBluntResistance) - target.currentBluntDefense) * this.damageModifier;
                    break;
                case 'pierce':
                    rawDamage += (attacker.currentPierceAttack * (1 - target.currentPierceResistance) - target.currentPierceDefense) * this.damageModifier;
                    break;
                case 'arcane':
                    rawDamage += (attacker.currentArcaneAttack * (1 - target.currentArcaneResistance) - target.currentArcaneDefense) * this.damageModifier;
                    break;
                case 'elemental':
                    rawDamage += (attacker.currentElementalAttack * (1 - target.currentElementalResistance) - target.currentElementalDefense) * this.damageModifier;
                    break;
            }
        }
        rawDamage = rawDamage / this.damageTypes.length / this.targetCount;
        return rawDamage;
    }
    checkDamage(target, rawDamage, stat){
        let damage = Math.floor(rawDamage)
        switch(stat){
            case 'health':
                if(target.currentHP - damage < 0){
                    damage = target.currentHP;
                }
            break;
            case 'stamina':
                if(target.currentStamina - damage < 0){
                    damage = target.currentStamina;
                }
            break;
            case 'magic':
                if(target.currentMagic - damage < 0){
                    damage = target.currentMagic;
                }
            break;
        }
        if(damage < 0){
            damage = 1;
        }
        return damage;
    }
    spendResources(attacker){
        attacker.currentHP -= this.healthCost;
        attacker.currentStamina -= this.staminaCost;
        attacker.currentMagic -= this.magicCost;
    }
    checkTargetEvade(target){
        if(target.currentEvasion > this.accuracy * Math.random()){
            return true; //true means target evades
        }
    }
    updateMessage(message){
        this.message = message;
    }
    inflictStatus(status, target){
        for(let i = 0; i < target.statusArray.length; i++){
            if(target.statusArray[i].name == status.name){
                return
            }
        }
        target.statusArray.push(status);
    }
    canUse(attacker, targets){
        let resolveObject = {evade: false,}
        switch(this.sequenceType){
            case 'chain':
                if(this.checkTargetEvade(targets[0])){
                    resolveObject.evade = true;
                }else{
                    this.activate(attacker, targets[0]);
                }
                break;
            case 'splash':
                for(let i = 0; i < targets.length; i++){
                    this.activate(attacker, targets[i])
                }
                break;
        }
        this.spendResources(attacker);
        this.updateMessage(attacker, targets[0]);
        return resolveObject;
    }
}

export class Slash extends Ability{
    constructor(config){
        super({
            name: 'slash',
            iconSrc: './assets/media/icons/quick-slash.png',
            background: config.background || 'grey',
            speedModifier: config.speedModifier || 1,
            damageModifier: config.damageModifier || 1,
            healthCost: config.healthCost || 0,
            staminaCost: config.staminaCost || 10,
            magicCost: config.magicCost || 0,
            damageTypes: config.damageTypes || ['blunt', 'pierce'],
            soundEffectSrc: "./assets/audio/soundEffects/mixkit-metal-hit-woosh-1485.wav",
            animationName: 'swipe-right',
            
        })
    }
    activate(attacker, target){
        let rawDamage = this.calculateDamage(attacker, target);
        let damage = this.checkDamage(target, rawDamage, 'health');
        target.currentHP = target.currentHP - damage;
    }
    updateMessage(attacker, target){
        this.message = `${attacker.name} slashes ${target.name}.`;
    }
}
export class Strike extends Ability{
    constructor(config){
        super({
            name: 'strike',
            iconSrc: './assets/media/icons/hammer-drop.png',
            background: config.background || 'grey',
            speedModifier: config.speedModifier || 1,
            damageModifier: config.damageModifier || 1,
            healthCost: config.healthCost || 0,
            staminaCost: config.staminaCost || 10,
            magicCost: config.magicCost || 0,
            damageTypes: config.damageTypes || ['blunt'],
            soundEffectSrc: "./assets/audio/soundEffects/mixkit-metallic-sword-strike-2160.wav",
            animationName: 'swipe-down',
        })
    }
    activate(attacker, target){
        let rawDamage = this.calculateDamage(attacker, target);
        let damage = this.checkDamage(target, rawDamage, 'health');
        target.currentHP = target.currentHP - damage;
    }
    updateMessage(attacker, target){
        this.message = `${attacker.name} strikes ${target.name}.`;
    }
}
export class Cleave extends Ability{
    constructor(config){
        super({
            name: 'cleave',
            iconSrc: './assets/media/icons/serrated-slash.png',
            background: config.background || 'grey',
            speedModifier: config.speedModifier || 1,
            damageModifier: config.damageModifier || 1,
            healthCost: config.healthCost || 0,
            staminaCost: config.staminaCost || 10,
            magicCost: config.magicCost || 0,
            damageTypes: config.damageTypes || ['blunt'],
            targetCount: 2,
            soundEffectSrc: "./assets/audio/soundEffects/mixkit-metal-hit-woosh-1485.wav",
            animationName: 'swipe-right',
            sequenceType: 'splash'
        })
    }
    activate(attacker, target){
        let rawDamage = this.calculateDamage(attacker, target);
        let damage = this.checkDamage(target, rawDamage, 'health');
        target.currentHP = target.currentHP - damage;
    }
    updateMessage(attacker){
        this.message = (`${attacker.name} uses cleave.`);
    }
}
export class MagicMissile extends Ability{
    constructor(config){
        super({
            name: 'magic missle',
            iconSrc: './assets/media/icons/frayed-arrow.png',
            background: config.background || 'blue',
            speedModifier: config.speedModifier || 0.75,
            damageModifier: config.damageModifier || 1.25,
            healthCost: config.healthCost || 0,
            staminaCost: config.staminaCost || 10,
            magicCost: config.magicCost || 0,
            accuracy: config.accuracy || 0.75,
            damageTypes: config.damageTypes || ['arcane'],
            targetCount: 3,
            soundEffectSrc: "./assets/audio/soundEffects/magic-missile-made-with-Voicemod-technology.mp3",
            animationName: 'swipe-right',
        })
    }
    activate(attacker, target){
        let rawDamage = this.calculateDamage(attacker, target);
        let damage = this.checkDamage(target, rawDamage, 'health');
        target.currentHP = target.currentHP - damage;
    }
    updateMessage(attacker, target){
       this.message = `${attacker.name} fires a magic missle at ${target.name}.`;
    }
}
export class ThrowPosionKnife extends Ability{
    constructor(config){
        super({
            name: 'throwPosionKnife',
            iconSrc: './assets/media/icons/flying-dagger.png',
            background: config.background || 'grey',
            speedModifier: config.speedModifier || 1.25,
            damageModifier: config.damageModifier || 0.25,
            healthCost: config.healthCost || 0,
            staminaCost: config.staminaCost || 10,
            magicCost: config.magicCost || 0,
            damageTypes: config.damageTypes || ['pierce'],
            targetCount: 1,
            soundEffectSrc: "./assets/audio/soundEffects/arrow-body-impact-146419.mp3",
            animationName: 'swipe-right',
        })
    }
    activate(attacker, target){
        let rawDamage = this.calculateDamage(attacker, target);
        let damage = this.checkDamage(target, rawDamage, 'health');
        target.currentHP = target.currentHP - damage;
        this.inflictStatus(new Poison({holder: target}), target);
    }
    updateMessage(attacker, target){
        this.message = `${attacker.name} throws a posioned knife at ${target.name}.`;
    }
}





