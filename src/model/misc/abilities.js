import { Poison, Burn, Bleed} from "./statusEffects.js";

export class Ability{
    constructor(config){
        this.name = config.name;
        this.iconSrc = config.iconSrc;
        this.targetCount = config.targetCount || 1;
        this.accuracy = config.accuracy || 1;
        this.speedModifier = config.speedModifier || 1;
        this.damageModifier = config.damageModifier || 1;
        this.healthCost = config.healthCost || 0;
        this.staminaCost = config.staminaCost || 0;
        this.magicCost = config.magicCost || 0;
        this.damageTypes = config.damageTypes || '';
        this.defaultTarget = config.defaultTarget || 'opponent';
        this.targetLock = config.targetLock || '';

        this.attackerAnimation = config.attackerAnimation || 'none';
        this.targetAnimation = config.targetAnimation || 'none';
        this.abilityAnimation = config.abilityAnimation || null;
        this.abilityAnimationImage = config.abilityAnimationImage || 'none';
        this.abilityAnimationDuration = config.abilityAnimationDuration || 2000;

        this.soundEffectSrc = config.soundEffectSrc;
        
        this.sequenceType = config.sequenceType || 'chain';
        this.consumable = config.consumable || '';
        this.message;
        this.duelWeilded = config.duelweilded || false;
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
    checkRestore(target, rawRestore, stat){
        let restore = Math.floor(rawRestore)
        switch(stat){
            case 'health':
                if(target.currentHP + restore > target.maxHP){
                    restore = target.maxHP - target.currentHP;
                }
            break;
            case 'stamina':
                if(target.currentStamina + restore > target.maxStamina){
                    restore = target.maxStamina - target.currentStamina;
                }
            break;
            case 'magic':
                if(target.currentMagic + restore > target.maxMagic){
                    restore = target.maxMagic - target.currentMagic;
                }
            break;
        }
        return restore;
    }
    spendResources(attacker){
        attacker.currentHP -= this.healthCost;
        attacker.currentStamina -= this.staminaCost;
        attacker.currentMagic -= this.magicCost;
    }
    checkTargetEvade(target){
        if(this.name == 'switchCombatant' || 'retreat'){
            return false;
        }
        if(target.currentEvasion > this.accuracy * Math.random()){
            return true; //true means target evades
        }
    }
    inflictStatus(status, target){
        for(let i = 0; i < target.statusArray.length; i++){
            if(target.statusArray[i].name == status.name){
                return
            }
        }
        target.statusArray.push(status);
    }
    removeStatus(statusName, target){
        for(let i = 0; i < target.statusArray.length; i++){
            if(target.statusArray[i].name == statusName){
                target.statusArray.splice(i, 1);
                return;
            }
        }
    }
    prepareAbilitiy(attacker, targets){
        let resolveObject = {evade: false, switchCombatant: false, retreat: false, rest: false}
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
        if(attacker.nextAbility.name == 'switch combatant'){
            resolveObject.switchCombatant = true;
        }
        if(attacker.nextAbility.name == 'retreat'){
            resolveObject.retreat = true;
        }
        if(attacker.nextAbility.name == 'rest'){
            resolveObject.rest = true;
        }
        this.spendResources(attacker);
        this.updateMessage(attacker, targets[0]);
        return resolveObject;
    }
    checkLackingResources(attacker){
        let lackingResources = [];
        if(attacker.currentStamina - this.staminaCost < 0){
            lackingResources.push('stamina')
        }
        if(attacker.currentMagic - this.magicCost < 0){
            lackingResources.push('magic')
        }
        return lackingResources;
    }
    activate(attacker, target){
       
    }
    updateMessage(message){
        this.message = message;
    }
}
export class SwitchCombatant extends Ability{
    constructor(config){
        super({
            name: 'switch combatant',
            iconSrc: 'none',
            speedModifier: config.speedModifier || 1,
            soundEffectSrc: "./assets/audio/soundEffects/energy-90321.mp3",
            targetAnimation: 'ally-retreat',
            targetLock: 'self',
        })
        this.newCombatant = config.newCombatant;
        this.onActivate = config.onActivate;
    }
    activate(attacker, target){
        this.onActivate();
    }
    updateMessage(attacker, target){
        this.message = `${this.newCombatant.name} joins the battle.`;
    }
}
export class Retreat extends Ability{
    constructor(config){
        super({
            name: 'retreat',
            iconSrc: './assets/media/icons/run.png',
            speedModifier: config.speedModifier || 1,
            soundEffectSrc: "./assets/audio/soundEffects/energy-90321.mp3",
            targetAnimation: 'ally-retreat',
            targetLock: 'self',
        })
        this.onActivate = config.onActivate;
    }
    activate(attacker, target){
        this.onActivate();
    }
    updateMessage(attacker, target){
        this.message = `${attacker.name} retreats!`;
    }
}
export class Rest extends Ability{
    constructor(config){
        super({
            name: 'rest',
            iconSrc: './assets/media/icons/despair.png',
            speedModifier: config.speedModifier || 1,
            soundEffectSrc: "./assets/audio/soundEffects/power-down-45784.mp3",
            abilityAnimation: 'sink',
            abilityAnimationImage: './assets/media/icons/despair.png',
            targetLock: 'self',
            
        })
    }
    updateMessage(attacker, target){
        this.message = `${attacker.name} must rest!`;
    }
}
export class Slash extends Ability{
    constructor(config){
        super({
            name: 'slash',
            iconSrc: './assets/media/icons/quick-slash.png',
            speedModifier: config.speedModifier || 1,
            damageModifier: config.damageModifier || 1,
            healthCost: config.healthCost || 0,
            staminaCost: config.staminaCost || 10,
            magicCost: config.magicCost || 0,
            damageTypes: config.damageTypes || ['blunt', 'pierce'],
            soundEffectSrc: "./assets/audio/soundEffects/mixkit-metal-hit-woosh-1485.wav",
            attackerAnimation: config.attackerAnimation || 'ally-attack',
            abilityAnimationImage: config.abilityAnimationImage || './assets/media/icons/quick-slash.png',
            abilityAnimation: config.abilityAnimation || 'swipe-right',
           
            
        })
    }
    activate(attacker, target){
        let rawDamage = this.calculateDamage(attacker, target);
        let damage = this.checkDamage(target, rawDamage, 'health');
        target.currentHP = target.currentHP - damage;
        if(damage > 0){
            if(Math.random()*10 < 1){
                this.inflictStatus(new Bleed({holder: target}), target);
            } 
        }
    }
    updateMessage(attacker, target){
        this.message = `${attacker.name} slashes ${target.name}.`;
    }
}
export class Punch extends Ability{
    constructor(config){
        super({
            name: 'strike',
            iconSrc: './assets/media/icons/punch.png',
            speedModifier: config.speedModifier || 1,
            damageModifier: config.damageModifier || 0.25,
            healthCost: config.healthCost || 0,
            staminaCost: config.staminaCost || 4,
            magicCost: config.magicCost || 0,
            damageTypes: config.damageTypes || ['blunt'],
            soundEffectSrc: "./assets/audio/soundEffects/mixkit-metallic-sword-strike-2160.wav",
            attackerAnimation: config.attackerAnimation || 'ally-attack',
            abilityAnimation: config.abilityAnimation || 'swipe-right',
            abilityAnimationImage: config.abilityAnimationImage || './assets/media/icons/punch.png',
           
        })
    }
    activate(attacker, target){
        let rawDamage = this.calculateDamage(attacker, target);
        let damage = this.checkDamage(target, rawDamage, 'health');
        target.currentHP = target.currentHP - damage;
    }
    updateMessage(attacker, target){
        this.message = `${attacker.name} punches ${target.name}.`;
    }
}
export class Strike extends Ability{
    constructor(config){
        super({
            name: 'strike',
            iconSrc: './assets/media/icons/hammer-drop.png',
            speedModifier: config.speedModifier || 1,
            damageModifier: config.damageModifier || 1,
            healthCost: config.healthCost || 0,
            staminaCost: config.staminaCost || 10,
            magicCost: config.magicCost || 0,
            damageTypes: config.damageTypes || ['blunt'],
            soundEffectSrc: "./assets/audio/soundEffects/mixkit-metallic-sword-strike-2160.wav",
            attackerAnimation: config.attackerAnimation || 'ally-attack',
            abilityAnimation: config.abilityAnimation || 'swipe-down',
            abilityAnimationImage: config.abilityAnimationImage || './assets/media/icons/hammer-drop.png',
           
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
            speedModifier: config.speedModifier || 1,
            damageModifier: config.damageModifier || 1,
            healthCost: config.healthCost || 0,
            staminaCost: config.staminaCost || 10,
            magicCost: config.magicCost || 0,
            damageTypes: config.damageTypes || ['blunt'],
            targetCount: 2,
            soundEffectSrc: "./assets/audio/soundEffects/mixkit-metal-hit-woosh-1485.wav",
            sequenceType: 'splash',
            attackerAnimation: config.attackerAnimation || 'ally-attack',
            abilityAnimation: config.abilityAnimation || 'swipe-right',
            abilityAnimationImage: config.abilityAnimationImage || './assets/media/icons/serrated-slash.png',

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
            speedModifier: config.speedModifier || 0.75,
            damageModifier: config.damageModifier || 1.25,
            healthCost: config.healthCost || 0,
            staminaCost: config.staminaCost || 0,
            magicCost: config.magicCost || 10,
            accuracy: config.accuracy || 0.75,
            damageTypes: config.damageTypes || ['arcane'],
            targetCount: 3,
            soundEffectSrc: "./assets/audio/soundEffects/magic-missile-made-with-Voicemod-technology.mp3",

            attackerAnimation: config.attackerAnimation || 'ally-attack',
            abilityAnimation: config.abilityAnimation || 'swipe-right',
            abilityAnimationImage: config.abilityAnimationImage || './assets/media/icons/frayed-arrow.png',
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
export class LesserHeal extends Ability{
    constructor(config){
        super({
            name: 'lesser heal',
            iconSrc: './assets/media/icons/heart-plus.png',
            speedModifier: config.speedModifier || 1,
            damageModifier: config.damageModifier || 1,
            healthCost: config.healthCost || 0,
            staminaCost: config.staminaCost || 0,
            magicCost: config.magicCost || 12,
            damageTypes: config.damageTypes || ['arcane'],
            soundEffectSrc: "./assets/audio/soundEffects/mixkit-light-spell-873.wav",
            attackerAnimation: config.attackerAnimation || 'none',
            abilityAnimationImage: config.abilityAnimationImage || './assets/media/icons/heart-plus.png',
            abilityAnimation: config.abilityAnimation || 'explode',
            defaultTarget: 'ally',
            
        })
    }
    activate(attacker, target){
        let healthRestore = this.checkRestore(target, target.maxHP * 0.2, 'health');
        target.currentHP += healthRestore;
    }
    updateMessage(attacker, target){
        if(attacker == target){
            this.message = `${attacker.name} heals.`;
        }
        else{
            this.message = `${attacker.name} heals ${target.name}.`;
        }
    }
}
export class Bite extends Ability{
    constructor(config){
        super({
            name: 'bite',
            iconSrc: './assets/media/icons/sharp-lips.png',
            speedModifier: config.speedModifier || 1.25,
            damageModifier: config.damageModifier || 0.75,
            healthCost: config.healthCost || 0,
            staminaCost: config.staminaCost || 10,
            magicCost: config.magicCost || 0,
            damageTypes: config.damageTypes || ['blunt', 'pierce'],
            soundEffectSrc: "./assets/audio/soundEffects/chomp1.mp3",
            attackerAnimation: config.attackerAnimation || 'ally-attack',
            abilityAnimationImage: config.abilityAnimationImage || './assets/media/icons/sharp-lips.png',
            abilityAnimation: config.abilityAnimation || 'explode',
           
            
        })
    }
    activate(attacker, target){
        let rawDamage = this.calculateDamage(attacker, target);
        let damage = this.checkDamage(target, rawDamage, 'health');
        target.currentHP = target.currentHP - damage;
        if(damage > 0){
            if(Math.random()*6 < 1){
                this.inflictStatus(new Bleed({holder: target}), target);
            }
        }
    }
    updateMessage(attacker, target){
        this.message = `${attacker.name} bites ${target.name}.`;
    }
}
export class Fireball extends Ability{
    constructor(config){
        super({
            name: 'fireball',
            iconSrc: './assets/media/icons/fireball.png',
            speedModifier: config.speedModifier || 0.75,
            damageModifier: config.damageModifier || 1.25,
            healthCost: config.healthCost || 0,
            staminaCost: config.staminaCost || 0,
            magicCost: config.magicCost || 12,
            accuracy: config.accuracy || 0.75,
            damageTypes: config.damageTypes || ['elemental'],
            soundEffectSrc: "./assets/audio/soundEffects/short-fireball-woosh-6146.mp3",

            attackerAnimation: config.attackerAnimation || 'ally-attack',
            abilityAnimation: config.abilityAnimation || 'swipe-right',
            abilityAnimationImage: config.abilityAnimationImage || './assets/media/icons/fireball.png',
        })
    }
    activate(attacker, target){
        let rawDamage = this.calculateDamage(attacker, target);
        let damage = this.checkDamage(target, rawDamage, 'health');
        target.currentHP = target.currentHP - damage;
        if(damage > 0){
            if(Math.random()*6 < 1){
                this.inflictStatus(new Burn({holder: target}), target);
            }
        }
    }
    updateMessage(attacker, target){
       this.message = `${attacker.name} shoots a fireball ${target.name}.`;
    }
}
export class Earthquake extends Ability{
    constructor(config){
        super({
            name: 'earthquake',
            iconSrc: './assets/media/icons/earth-split.png',
            speedModifier: config.speedModifier || 0.5,
            damageModifier: config.damageModifier || 3.5,
            healthCost: config.healthCost || 0,
            staminaCost: config.staminaCost || 30,
            magicCost: config.magicCost || 0,
            damageTypes: config.damageTypes || ['blunt'],
            targetCount: 3,
            soundEffectSrc: "./assets/audio/soundEffects/supernatural-explosion-104295.wav",
            sequenceType: 'splash',
            attackerAnimation: config.attackerAnimation || 'explode',
            abilityAnimation: config.abilityAnimation || 'swipe-down',
            abilityAnimationImage: config.abilityAnimationImage || './assets/media/icons/earth-split.png',
            
        })
    }
    activate(attacker, target){
        let rawDamage = this.calculateDamage(attacker, target);
        let damage = this.checkDamage(target, rawDamage, 'health');
        target.currentHP = target.currentHP - damage;
    }
    updateMessage(attacker){
        this.message = (`${attacker.name} creates an earthquake!`);
    }
}
export class ThrowPosionedKnife extends Ability{
    constructor(config){
        super({
            name: 'throw posioned knife',
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


            attackerAnimation: config.attackerAnimation || 'ally-attack',
            abilityAnimation: config.abilityAnimation || 'swipe-right',
            abilityAnimationImage: config.abilityAnimationImage || './assets/media/icons/flying-dagger.png',

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

export class DrinkHealthPotion extends Ability{
    constructor(config){
        super({
            name: 'drink health potion',
            iconSrc: './assets/media/icons/standing-potion.png',
            speedModifier: config.speedModifier || 1,
            soundEffectSrc: "./assets/audio/soundEffects/mixkit-light-spell-873 copy.wav",
            abilityAnimation: 'drink',
            abilityAnimationImage: config.abilityAnimationImage || './assets/media/icons/standing-potion.png',
            defaultTarget: 'self',
        })
    }
    activate(attacker, target){
        let rawHPRestore = target.maxHP*0.5;
        let hpRestore = this.checkRestore(target, rawHPRestore, 'health');
        target.currentHP = target.currentHP + hpRestore;
    }
    updateMessage(attacker, target){
        if(attacker == target){
            this.message = `${attacker.name} drinks a health potion.`;
        }
        else{
            this.message = `${attacker.name} throws a health potion at ${target.name}.`;
        }
    }
}
export class DrinkStaminaPotion extends Ability{
    constructor(config){
        super({
            name: 'drink stamina potion',
            iconSrc: './assets/media/icons/square-bottle.png',
            speedModifier: config.speedModifier || 1,
            soundEffectSrc: "./assets/audio/soundEffects/energy-90321.mp3",
            abilityAnimation: 'drink',
            abilityAnimationImage: config.abilityAnimationImage || './assets/media/icons/square-bottle.png',
            defaultTarget: 'self',
        })
    }
    activate(attacker, target){
        let rawStaminaRestore = target.maxStamina*0.5;
        let staminaRestore = this.checkRestore(target, rawStaminaRestore, 'stamina');
        target.currentStamina = target.currentStamina + staminaRestore;
    }
    updateMessage(attacker, target){
        if(attacker == target){
            this.message = `${attacker.name} drinks a stamina potion.`;
        }
        else{
            this.message = `${attacker.name} throws a stamina potion at ${target.name}.`;
        }
    }
}
export class DrinkMagicPotion extends Ability{
    constructor(config){
        super({
            name: 'drink magic potion',
            iconSrc: './assets/media/icons/potion-ball.png',
            speedModifier: config.speedModifier || 1,
            soundEffectSrc: "./assets/audio/soundEffects/energy-90321.mp3",
            abilityAnimation: 'drink',
            abilityAnimationImage: config.abilityAnimationImage || './assets/media/icons/potion-ball.png',
            defaultTarget: 'self',
        })
    }
    activate(attacker, target){
        let rawMagicRestore = target.maxMagic*0.5;
        let magicRestore = this.checkRestore(target, rawMagicRestore, 'magic');
        target.currentMagic = target.currentMagic + magicRestore;
    }
    updateMessage(attacker, target){
        if(attacker == target){
            this.message = `${attacker.name} drinks a magic potion.`;
        }
        else{
            this.message = `${attacker.name} throws a magic potion at ${target.name}.`;
        }
    }
}
export class UseAntidote extends Ability{
    constructor(config){
        super({
            name: 'use antidote',
            iconSrc: './assets/media/icons/corked-tube.png',
            speedModifier: config.speedModifier || 1,
            soundEffectSrc: "./assets/audio/soundEffects/mixkit-light-spell-873.wav",
            abilityAnimation: 'drink',
            abilityAnimationImage: config.abilityAnimationImage || './assets/media/icons/corked-tube.png',
            defaultTarget: 'self',
        })
    }
    activate(attacker, target){
        this.removeStatus('poison', target);
    }
    updateMessage(attacker, target){
        if(attacker == target){
            this.message = `${attacker.name} drinks an antidote.`;
        }
        else{
            this.message = `${attacker.name} throws an antidote at ${target.name}.`;
        }
    }
}
export class UseAloeRemedy extends Ability{
    constructor(config){
        super({
            name: 'use aloe remedy',
            iconSrc: './assets/media/icons/curled-leaf.png',
            speedModifier: config.speedModifier || 1,
            soundEffectSrc: "./assets/audio/soundEffects/mixkit-light-spell-873.wav",
            abilityAnimation: 'explode',
            abilityAnimationImage: config.abilityAnimationImage || './assets/media/icons/curled-leaf.png',
            defaultTarget: 'self',
        })
    }
    activate(attacker, target){
        this.removeStatus('burn', target);
    }
    updateMessage(attacker, target){
        if(attacker == target){
            this.message = `${attacker.name} uses an aloe remedy.`;
        }
        else{
            this.message = `${attacker.name} applies an aloe remedy to ${target.name}.`;
        }
    }
}
export class UseBandage extends Ability{
    constructor(config){
        super({
            name: 'use bandage',
            iconSrc: './assets/media/icons/bandage-roll.png',
            speedModifier: config.speedModifier || 1,
            soundEffectSrc: "./assets/audio/soundEffects/mixkit-light-spell-873.wav",
            abilityAnimation: 'explode',
            abilityAnimationImage: config.abilityAnimationImage || './assets/media/icons/bandage-roll.png',
            defaultTarget: 'self',
        })
    }
    activate(attacker, target){
        let healthRestore = this.checkRestore(target, target.maxHP * 0.15, 'health');
        target.currentHP += healthRestore;
        this.removeStatus('bleed', target);
    }
    updateMessage(attacker, target){
        if(attacker == target){
            this.message = `${attacker.name} uses a bandage.`;
        }
        else{
            this.message = `${attacker.name} wraps ${target.name} with a bandage.`;
        }
    }
}






















export class DrinkKurtussBrewOfMadness extends Ability{
    constructor(config){
        super({
            name: 'drink kurtuss brew of madness',
            iconSrc: './assets/media/icons/standing-potion.png',
            background: config.background || 'red',
            speedModifier: config.speedModifier || 1,
            soundEffectSrc: './assets/audio/soundEffects/energy-90321.mp3',

            abilityAnimationImage: config.abilityAnimationImage || './assets/media/icons/standing-potion.png',
           
        })
    }
    activate(attacker, target){
        target.apperance = './assets/media/entities/kurty.jpg'
    }
}





