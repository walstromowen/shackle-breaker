import { deepCopyArray } from "../../utility.js";
import { Tiger } from "./entities.js";
import { Poison, Burn, Bleed, Bind, Paralyzed, Shielded, KnockedDown, Frozen, Blessed, Cursed, PhysicalAttackDebuff, PhysicalAttackBuff, BearTrapSet, MagicalAttackBuff, MagicalAttackDebuff, PhysicalDefenseBuff, EvasionBuff, Polymorphed} from "./statusEffects.js";

export class Ability{
    constructor(config){
        this.name = config.name;
        this.description = config.description || 'Radda Radda Radda Radda Radda heh heh Rada!',
        this.iconSrc = config.iconSrc;
        this.background = config.background || `url(${config.iconSrc})`,
        this.targetCount = config.targetCount || 1;
        this.accuracy = config.accuracy || 1;
        this.speedModifier = config.speedModifier || 1;
        this.damageModifier = config.damageModifier || 1;
        this.criticalDamageModifier = config.criticalDamageModifier || 1.5;
        this.criticalChanceModifier = config.criticalChance|| 0.05;
        this.range = config.range || 1; //measured in meters
        this.healthCost = config.healthCost || 0;
        this.staminaCost = config.staminaCost || 0;
        this.magicCost = config.magicCost || 0;
        this.damageTypes = config.damageTypes || ['blunt'];
        this.defaultTarget = config.defaultTarget || 'opponent';
        this.targetLock = config.targetLock || '';

        this.attackerAnimation = config.attackerAnimation || 'none';
        this.targetAnimation = config.targetAnimation || 'none';
        this.abilityAnimation = config.abilityAnimation || 'none';
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
        rawDamage = rawDamage / this.damageTypes.length;
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
    checkTargetEvade(attacker, target){
        if(this.name == 'switchCombatant' || this.name == 'retreat'){
            return false;
        }
        if(attacker.battleId == target.battleId){
            return false;
        }
        if(attacker.isHostile == target.isHostile && (this.defaultTarget == 'ally' || this.defaultTarget == 'self')){
            return false;
        }
        if(target.currentEvasion > this.accuracy * Math.random()){
            return true; //true means target evades
        }
    }
    checkCritical(attacker, rawDamage){
        if(Math.random() < attacker.currentCritical + this.criticalChanceModifier){
            return rawDamage * this.criticalDamageModifier;
        }else{
            return rawDamage;
        }
    }
    inflictStatus(status, attacker, target){
        for(let i = 0; i < target.statusArray.length; i++){
            if(target.statusArray[i].name == status.name){
                if(target.statusArray[i].stackable){
                    target.statusArray[i].onApplied(attacker, target, status);
                }
                return
            }
        }
        //target.statusArray.push(status);
        status.onApplied(attacker, target, status);
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
        let resolveObject = {evade: false, switchCombatant: false, retreat: false, rest: false, newForm: false}
        switch(this.sequenceType){
            case 'chain':
                this.triggerOnAttemptAbility(attacker, targets[0]);
                this.triggerOnOpponentAttemptAbility(attacker, targets[0]);
                if(this.checkTargetEvade(attacker, targets[0]) && attacker.battleId != targets[0].battleId){
                    resolveObject.evade = true;
                }else{
                    this.checkCritical(attacker);
                    this.activate(attacker, targets[0]);
                }
                break;
            case 'splash':
                this.triggerOnAttemptAbility(attacker, targets[0]);
                for(let i = 0; i < targets.length; i++){
                    this.triggerOnOpponentAttemptAbility(attacker, targets[0]);
                    if(this.checkTargetEvade(attacker, targets[i]) && attacker.battleId != targets[i].battleId){//may be issue with evading splash attacks
                        resolveObject.evade = true;
                    }else{
                        this.checkCritical(attacker);
                        this.activate(attacker, targets[i]);
                    }
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
        if(this.newForm){
            resolveObject.newForm = this.newForm;
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
    //to target events
    triggerOnRecieveDamage(attacker, target){
        let iteratedArray = deepCopyArray(target.statusArray)
        for(let i = 0; i < iteratedArray.length; i++){
            iteratedArray[i].onRecieveDamage(attacker, target);
        }
    }
    triggerOnOpponentAttemptAbility(attacker, target){
        let iteratedArray = deepCopyArray(target.statusArray)
        for(let i = 0; i < iteratedArray.length; i++){
            iteratedArray[i].onOpponentAttemptAbility(attacker, target);
        }
    }
    //to attacker events
    triggerOnDeliverDamage(attacker, target){
        let iteratedArray = deepCopyArray(attacker.statusArray)
        for(let i = 0; i < iteratedArray.length; i++){
            iteratedArray[i].onDeliverDamage(attacker, target);
        }
    }
    triggerOnAttemptAbility(attacker, target){
        let iteratedArray = deepCopyArray(attacker.statusArray);
        for(let i = 0; i < iteratedArray.length; i++){
            iteratedArray[i].onAttemptAbility(attacker, target);
        }
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
            description: 'Allows current character to escape battle. Sometimes, living to fight another day is more nobel than facing a foolish fate.',
            iconSrc: './assets/media/icons/run.png',
            speedModifier: config.speedModifier || 1,
            damageModifier: config.speedModifier || 0,
            soundEffectSrc: "./assets/audio/soundEffects/energy-90321.mp3",
            targetAnimation: 'ally-retreat',
            defaultTarget: 'self',
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
            description: 'Allows current character to recover health, stamina, and magic based on recovery values.',
            iconSrc: './assets/media/icons/despair.png',
            speedModifier: config.speedModifier || 1,
            damageModifier: config.speedModifier || 0,
            soundEffectSrc: "./assets/audio/soundEffects/power-down-45784.mp3",
            abilityAnimation: 'sink',
            abilityAnimationImage: './assets/media/icons/despair.png',
            defaultTarget: 'self',
            targetLock: 'self',
            
        })
    }
    activate(attacker, target){
        target.recoverHP();
        target.recoverStamina();
        target.recoverMagic();
    }
    updateMessage(attacker, target){
        this.message = `${attacker.name} rests.`;
    }
}
export class Struggle extends Ability{
    constructor(config){
        super({
            name: 'struggle',
            description: 'Help!',
            iconSrc: './assets/media/icons/despair.png',
            speedModifier: config.speedModifier || 1,
            damageModifier: config.speedModifier || 0,
            soundEffectSrc: "./assets/audio/soundEffects/power-down-45784.mp3",
            targetAnimation: 'shake',
            defaultTarget: 'self',
            targetLock: 'self',
            
        })
    }
    updateMessage(attacker, target){
        this.message = `${attacker.name} cannot attack!`;
    }
}
export class Slash extends Ability{
    constructor(config){
        super({
            name: 'slash',
            description: 'Strike a target with a deadly slash. Has a chance to cause bleeding.',
            iconSrc: './assets/media/icons/quick-slash.png',
            background: `url(./assets/media/icons/quick-slash.png), conic-gradient(steelblue, darkslategrey, crimson, darkslategrey)`,
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
        rawDamage = this.checkCritical(attacker, rawDamage);
        let damage = this.checkDamage(target, rawDamage, 'health');
        target.currentHP = target.currentHP - damage;
        if(damage > 0){
            this.triggerOnDeliverDamage(attacker, target);
            this.triggerOnRecieveDamage(attacker, target);
            if(Math.random()*15 < 1){
                this.inflictStatus(new Bleed({holder: target}), attacker, target);
            } 
        }
    }
    updateMessage(attacker, target){
        this.message = `${attacker.name} slashes ${target.name}.`;
    }
}
export class Thrust extends Ability{
    constructor(config){
        super({
            name: 'thrust',
            description: 'Thurst a target with a piercing attack. Has a high critical chance and a chance to cause bleeding.',
            iconSrc: './assets/media/icons/thrust.png',
            background: `url(./assets/media/icons/thrust.png), linear-gradient(crimson, darkslategrey)`,
            speedModifier: config.speedModifier || 0.75,
            damageModifier: config.damageModifier || 1,
            criticalDamageModifier: config.criticalDamageModifier || 1.5,
            criticalChanceModifier: config.criticalChance|| 0.2,
            healthCost: config.healthCost || 0,
            staminaCost: config.staminaCost || 10,
            magicCost: config.magicCost || 0,
            accuracy: config.accuracy || 0.80,
            damageTypes: config.damageTypes || ['pierce'],
            soundEffectSrc: "./assets/audio/soundEffects/mixkit-metal-hit-woosh-1485.wav",
            attackerAnimation: config.attackerAnimation || 'ally-attack',
            abilityAnimationImage: config.abilityAnimationImage || './assets/media/icons/thrust.png',
            abilityAnimation: config.abilityAnimation || 'stick-right',
        })
    }
    activate(attacker, target){
        let rawDamage = this.calculateDamage(attacker, target);
        rawDamage = this.checkCritical(attacker, rawDamage);
        let damage = this.checkDamage(target, rawDamage, 'health');
        target.currentHP = target.currentHP - damage;
        if(damage > 0){
            this.triggerOnDeliverDamage(attacker, target);
            this.triggerOnRecieveDamage(attacker, target);
            if(Math.random()*15 < 1){
                this.inflictStatus(new Bleed({holder: target}), attacker, target);
            } 
        }
    }
    updateMessage(attacker, target){
        this.message = `${attacker.name} stabs ${target.name} with a thrust attack.`;
    }
}
export class Eviscerate extends Ability{
    constructor(config){
        super({
            name: 'eviscerate',
            description: 'Eviscerate a target with a powerful piercing attack. Has a high chance to cause bleeding and deal bonus damage to enemies at full health.',
            iconSrc: './assets/media/icons/ragged-wound.png',
            background: `url(./assets/media/icons/ragged-wound.png), linear-gradient(crimson, darkslategrey)`,
            speedModifier: config.speedModifier || 0.75,
            damageModifier: config.damageModifier || 1.25,
            healthCost: config.healthCost || 0,
            staminaCost: config.staminaCost || 18,
            magicCost: config.magicCost || 0,
            accuracy: config.accuracy || 0.80,
            damageTypes: config.damageTypes || ['pierce'],
            soundEffectSrc: "./assets/audio/soundEffects/platzender-kopf_nachschlag-91637.mp3",
            attackerAnimation: config.attackerAnimation || 'ally-attack',
            abilityAnimationImage: config.abilityAnimationImage || './assets/media/icons/quick-slash.png',
            abilityAnimation: config.abilityAnimation || 'swipe-right',
        })
    }
    activate(attacker, target){
        let rawDamage = this.calculateDamage(attacker, target);
        if(target.currentHP == target.maxHP) rawDamage *= 1.2;
        rawDamage = this.checkCritical(attacker, rawDamage);
        let damage = this.checkDamage(target, rawDamage, 'health');
        target.currentHP = target.currentHP - damage;
        if(damage > 0){
            this.triggerOnDeliverDamage(attacker, target);
            this.triggerOnRecieveDamage(attacker, target);
            if(Math.random()*3 < 1){
                this.inflictStatus(new Bleed({holder: target}), attacker, target);
            } 
        }
    }
    updateMessage(attacker, target){
        this.message = `${attacker.name} eviscrates ${target.name}.`;
    }
}
export class Punch extends Ability{
    constructor(config){
        super({
            name: 'strike',
            description: "Strike a target with one's fist.",
            iconSrc: './assets/media/icons/punch.png',
            background: `url(./assets/media/icons/punch.png), linear-gradient(steelblue, darkslategrey)`,
            speedModifier: config.speedModifier || 1,
            damageModifier: config.damageModifier || 0.33,
            healthCost: config.healthCost || 0,
            staminaCost: config.staminaCost || 4,
            magicCost: config.magicCost || 0,
            damageTypes: config.damageTypes || ['blunt'],
            soundEffectSrc: "./assets/audio/soundEffects/mixkit-metallic-sword-strike-2160.wav",
            attackerAnimation: config.attackerAnimation || 'ally-attack',
            abilityAnimation: config.abilityAnimation || 'swipe-right',
            abilityAnimationImage: config.abilityAnimationImage || './assets/media/icons/punch.png',
            defaultTarget: 'opponent',
        })
    }
    activate(attacker, target){
        let rawDamage = this.calculateDamage(attacker, target);
        rawDamage = this.checkCritical(attacker, rawDamage);
        let damage = this.checkDamage(target, rawDamage, 'health');
        target.currentHP = target.currentHP - damage;
        if(damage > 0){
            this.triggerOnDeliverDamage(attacker, target);
            this.triggerOnRecieveDamage(attacker, target);
        }
    }
    updateMessage(attacker, target){
        this.message = `${attacker.name} punches ${target.name}.`;
    }
}
export class Strike extends Ability{
    constructor(config){
        super({
            name: 'strike',
            description: "Strike a target with the blunt edge of one's weapon.",
            iconSrc: './assets/media/icons/hammer-drop.png',
            background: `url(./assets/media/icons/hammer-drop.png), linear-gradient(steelblue, darkslategrey)`,
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
        rawDamage = this.checkCritical(attacker, rawDamage);
        let damage = this.checkDamage(target, rawDamage, 'health');
        target.currentHP = target.currentHP - damage;
        if(damage > 0){
            this.triggerOnDeliverDamage(attacker, target);
            this.triggerOnRecieveDamage(attacker, target);
        }
    }
    updateMessage(attacker, target){
        this.message = `${attacker.name} strikes ${target.name}.`;
    }
}
export class ShootArrow extends Ability{
    constructor(config){
        super({
            name: 'shoot arrow',
            description: "Shoot a target with an arrow. Has a chance to cause bleeding",
            iconSrc: './assets/media/icons/broadhead-arrow.png',
            background: `url(./assets/media/icons/broadhead-arrow.png), linear-gradient(crimson, darkslategrey)`,
            speedModifier: config.speedModifier || 1.25,
            damageModifier: config.damageModifier || 1,
            healthCost: config.healthCost || 0,
            staminaCost: config.staminaCost || 12,
            magicCost: config.magicCost || 0,
            damageTypes: config.damageTypes || ['pierce'],
            soundEffectSrc: "./assets/audio/soundEffects/arrow-body-impact-146419.mp3",
            attackerAnimation: config.attackerAnimation || 'ally-evade',
            abilityAnimationImage: config.abilityAnimationImage || './assets/media/icons/broadhead-arrow.png',
            abilityAnimation: config.abilityAnimation || 'stick-right',
           
            
        })
    }
    activate(attacker, target){
        let rawDamage = this.calculateDamage(attacker, target);
        rawDamage = this.checkCritical(attacker, rawDamage);
        let damage = this.checkDamage(target, rawDamage, 'health');
        target.currentHP = target.currentHP - damage;
        if(damage > 0){
            this.triggerOnDeliverDamage(attacker, target);
            this.triggerOnRecieveDamage(attacker, target);
            if(Math.random()*20 < 1){
                this.inflictStatus(new Bleed({holder: target}), attacker, target);
            } 
        }
    }
    updateMessage(attacker, target){
        this.message = `${attacker.name} shoots ${target.name} with an arrow.`;
    }
}
export class Tripleshot extends Ability{
    constructor(config){
        super({
            name: 'triple shot',
            description: "Shoot up to three arrows simultaneously at different targets.",
            iconSrc: './assets/media/icons/striking-arrows.png',
            background: `url(./assets/media/icons/striking-arrows.png), linear-gradient(crimson, darkslategrey)`,
            speedModifier: config.speedModifier || 1,
            damageModifier: config.damageModifier || 1,
            criticalDamageModifier: config.criticalDamageModifier || 1.2,
            healthCost: config.healthCost || 0,
            staminaCost: config.staminaCost || 20,
            magicCost: config.magicCost || 0,
            damageTypes: config.damageTypes || ['pierce'],
            targetCount: 3,
            soundEffectSrc: "./assets/audio/soundEffects/arrow-body-impact-146419.mp3",
            sequenceType: 'splash',
            attackerAnimation: config.attackerAnimation || 'ally-attack',
            abilityAnimation: config.abilityAnimation || 'swipe-right',
            abilityAnimationImage: config.abilityAnimationImage || './assets/media/icons/broadhead-arrow.png',

        })
    }
    activate(attacker, target){
        let rawDamage = this.calculateDamage(attacker, target);
        rawDamage = this.checkCritical(attacker, rawDamage);
        let damage = this.checkDamage(target, rawDamage, 'health');
        target.currentHP = target.currentHP - damage;
        if(damage > 0){
            this.triggerOnDeliverDamage(attacker, target);
            this.triggerOnRecieveDamage(attacker, target);
        }
    }
    updateMessage(attacker){
        this.message = (`${attacker.name} fires a triple shot.`);
    }
}
export class Cleave extends Ability{
    constructor(config){
        super({
            name: 'cleave',
            description: "Cleave up to two different targets.",
            iconSrc: './assets/media/icons/serrated-slash.png',
            background: `url(./assets/media/icons/serrated-slash.png), conic-gradient(steelblue, darkslategrey, crimson, darkslategrey)`,
            speedModifier: config.speedModifier || 1,
            damageModifier: config.damageModifier || 0.75,
            healthCost: config.healthCost || 0,
            staminaCost: config.staminaCost || 10,
            magicCost: config.magicCost || 0,
            damageTypes: config.damageTypes || ['blunt', 'pierce'],
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
        rawDamage = this.checkCritical(attacker, rawDamage);
        let damage = this.checkDamage(target, rawDamage, 'health');
        target.currentHP = target.currentHP - damage;
        if(damage > 0){
            this.triggerOnDeliverDamage(attacker, target);
            this.triggerOnRecieveDamage(attacker, target);
        }
    }
    updateMessage(attacker){
        this.message = (`${attacker.name} uses cleave.`);
    }
}
export class Flurry extends Ability{
    constructor(config){
        super({
            name: 'flurry',
            description: "Slash a target with a series of quick slashes.",
            iconSrc: './assets/media/icons/crossed-slashes.png',
            background: `url(./assets/media/icons/crossed-slashes.png), conic-gradient(steelblue, darkslategrey, crimson, darkslategrey)`,
            speedModifier: config.speedModifier || 1.0,
            damageModifier: config.damageModifier || 0.75,
            healthCost: config.healthCost || 0,
            staminaCost: config.staminaCost || 7,
            magicCost: config.magicCost || 0,
            accuracy: config.accuracy || 0.75,
            damageTypes: config.damageTypes || ['blunt', 'pierce'],
            soundEffectSrc: "./assets/audio/soundEffects/mixkit-metal-hit-woosh-1485.wav",
            attackerAnimation: config.attackerAnimation || 'ally-attack',
            targetCount: 3,
            abilityAnimationImage: config.abilityAnimationImage || './assets/media/icons/quick-slash.png',
            abilityAnimation: config.abilityAnimation || 'swipe-right',

        })
    }
    activate(attacker, target){
        let rawDamage = this.calculateDamage(attacker, target);
        rawDamage = this.checkCritical(attacker, rawDamage);
        let damage = this.checkDamage(target, rawDamage, 'health');
        target.currentHP = target.currentHP - damage;
        if(damage > 0){
            this.triggerOnDeliverDamage(attacker, target);
            this.triggerOnRecieveDamage(attacker, target);
            if(Math.random()*30 < 1){
                this.inflictStatus(new Bleed({holder: target}), attacker, target);
            } 
        }
    }
    updateMessage(attacker, target){
       this.message = `${attacker.name} performs a flurry on ${target.name}.`;
    }
}
export class Uppercut extends Ability{
    constructor(config){
        super({
            name: 'uppercut',
            description: "Strike a target with an upwards motion. Has a chance to knock over a target.",
            iconSrc: './assets/media/icons/uppercut.png',
            background: `url(./assets/media/icons/uppercut.png), conic-gradient(steelblue, darkslategrey, crimson, darkslategrey)`,
            speedModifier: config.speedModifier || 1.0,
            damageModifier: config.damageModifier || 1.25,
            healthCost: config.healthCost || 0,
            staminaCost: config.staminaCost || 18,
            magicCost: config.magicCost || 0,
            accuracy: config.accuracy || 0.75,
            damageTypes: config.damageTypes || ['blunt', 'pierce'],
            soundEffectSrc: "./assets/audio/soundEffects/mixkit-metallic-sword-strike-2160.wav",
            attackerAnimation: config.attackerAnimation || 'ally-attack',
            abilityAnimation: config.abilityAnimation || 'swipe-up',
            abilityAnimationImage: config.abilityAnimationImage || './assets/media/icons/uppercut.png',

        })
    }
    activate(attacker, target){
        let rawDamage = this.calculateDamage(attacker, target);
        rawDamage = this.checkCritical(attacker, rawDamage);
        let damage = this.checkDamage(target, rawDamage, 'health');
        target.currentHP = target.currentHP - damage;
        if(damage > 0){
            this.triggerOnDeliverDamage(attacker, target);
            this.triggerOnRecieveDamage(attacker, target);
            if(Math.random()*10 < 1){
                this.inflictStatus(new KnockedDown({holder: target}), attacker, target);
            } 
        }
    }
    updateMessage(attacker, target){
       this.message = `${attacker.name} hits ${target.name} with an uppercut.`;
    }
}
export class MagicMissile extends Ability{
    constructor(config){
        super({
            name: 'magic missle',
            description: "Fire a magic missile made of powerful arcane energy at three targets.",
            iconSrc: './assets/media/icons/frayed-arrow.png',
            background: `url(./assets/media/icons/frayed-arrow.png), linear-gradient(magenta, navy)`,
            speedModifier: config.speedModifier || 0.75,
            damageModifier: config.damageModifier || 1.00,
            healthCost: config.healthCost || 0,
            staminaCost: config.staminaCost || 0,
            magicCost: config.magicCost || 8,
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
        rawDamage = this.checkCritical(attacker, rawDamage);
        let damage = this.checkDamage(target, rawDamage, 'health');
        target.currentHP = target.currentHP - damage;
        if(damage > 0){
            this.triggerOnDeliverDamage(attacker, target);
            this.triggerOnRecieveDamage(attacker, target);
        }
    }
    updateMessage(attacker, target){
       this.message = `${attacker.name} fires a magic missle at ${target.name}.`;
    }
}
export class LesserHeal extends Ability{
    constructor(config){
        super({
            name: 'lesser heal',
            description: "Restore a target's hitpoints using arcane magic.",
            iconSrc: './assets/media/icons/heart-plus.png',
            background: `url(./assets/media/icons/heart-plus.png), linear-gradient(gold, navy)`,
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
export class DrainLife extends Ability{
    constructor(config){
        super({
            name: 'drain life',
            description: "Absorb the hitpoints of another target using dark arcane magic.",
            iconSrc: './assets/media/icons/tentacle-heart.png',
            background: `url(./assets/media/icons/tentacle-heart.png), linear-gradient(indigo, navy)`,
            speedModifier: config.speedModifier || 0.75,
            damageModifier: config.damageModifier || 1,
            healthCost: config.healthCost || 0,
            staminaCost: config.staminaCost || 0,
            magicCost: config.magicCost || 12,
            accuracy: config.accuracy || 0.80,
            damageTypes: config.damageTypes || ['arcane'],
            soundEffectSrc: "./assets/audio/soundEffects/totem-strike-96497.wav",

            attackerAnimation: config.attackerAnimation || 'ally-evade',
            abilityAnimation: config.abilityAnimation || 'implode',
            abilityAnimationImage: config.abilityAnimationImage || './assets/media/icons/tentacle-heart.png',
            targetAnimation: config.targetAnimation || 'shake',
        })
    }
    activate(attacker, target){
        let rawDamage = this.calculateDamage(attacker, target);
        rawDamage = this.checkCritical(attacker, rawDamage);
        let damage = this.checkDamage(target, rawDamage, 'health');
        target.currentHP = target.currentHP - damage;

        let healthRestore = this.checkRestore(attacker, rawDamage*0.5, 'health');
        attacker.currentHP += healthRestore;
        
    }
    updateMessage(attacker, target){
       this.message = `${attacker.name} drains the life of ${target.name}.`;
    }
}
export class DarkOrb extends Ability{
    constructor(config){
        super({
            name: 'dark orb',
            description: "Blast a target with an orb of dark arcane energy. Has a chance to hex a target, lowering magical attack",
            iconSrc: './assets/media/icons/rolling-energy.png',
            background: `url(./assets/media/icons/rolling-energy.png), linear-gradient(indigo, navy)`,
            speedModifier: config.speedModifier || 1,
            damageModifier: config.damageModifier || 1.25,
            healthCost: config.healthCost || 0,
            staminaCost: config.staminaCost || 0,
            magicCost: config.magicCost || 12,
            accuracy: config.accuracy || 0.80,
            damageTypes: config.damageTypes || ['arcane'],
            soundEffectSrc: "./assets/audio/soundEffects/totem-strike-96497.wav",

            attackerAnimation: config.attackerAnimation || 'ally-evade',
            abilityAnimation: config.abilityAnimation || 'swipe-right',
            abilityAnimationImage: config.abilityAnimationImage || './assets/media/icons/rolling-energy.png',
            targetAnimation: config.targetAnimation || 'none',
        })
    }
    activate(attacker, target){
        let rawDamage = this.calculateDamage(attacker, target);
        rawDamage = this.checkCritical(attacker, rawDamage);
        let damage = this.checkDamage(target, rawDamage, 'health');
        target.currentHP = target.currentHP - damage;
        if(damage > 0){
            this.triggerOnDeliverDamage(attacker, target);
            this.triggerOnRecieveDamage(attacker, target);
            if(Math.random()*5 < 1){
                this.inflictStatus(new MagicalAttackDebuff({holder: target}), attacker, target);
            } 
        }
        
    }
    updateMessage(attacker, target){
       this.message = `${attacker.name} shoots ${target.name} with an orb of dark energy.`;
    }
}
export class Bite extends Ability{
    constructor(config){
        super({
            name: 'bite',
            description: "Bite a target with a powerful jaw. More effective with larger creatures. Has a chance to cause bleeding.",
            iconSrc: './assets/media/icons/sharp-lips.png',
            background: `url(./assets/media/icons/sharp-lips.png), conic-gradient(steelblue, darkslategrey, crimson, darkslategrey)`,
            speedModifier: config.speedModifier || 1.25,
            damageModifier: config.damageModifier || 0.75,
            healthCost: config.healthCost || 0,
            staminaCost: config.staminaCost || 10,
            magicCost: config.magicCost || 0,
            damageTypes: config.damageTypes || ['blunt', 'pierce'],
            soundEffectSrc: "./assets/audio/soundEffects/chomp1.mp3",
            attackerAnimation: config.attackerAnimation || 'ally-attack',
            abilityAnimationImage: config.abilityAnimationImage || './assets/media/icons/sharp-lips.png',
            abilityAnimation: config.abilityAnimation || 'implode',
           
            
        })
    }
    activate(attacker, target){
        let rawDamage = this.calculateDamage(attacker, target);
        rawDamage = this.checkCritical(attacker, rawDamage);
        let damage = this.checkDamage(target, rawDamage, 'health');
        target.currentHP = target.currentHP - damage;
        if(damage > 0){
            this.triggerOnDeliverDamage(attacker, target);
            this.triggerOnRecieveDamage(attacker, target);
            if(Math.random()*15 < 1){
                this.inflictStatus(new Bleed({holder: target}), attacker, target);
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
            description: "Shoot a target with a ball of fire made with elemental magic. Has a chance to burn the target.",
            iconSrc: './assets/media/icons/fireball.png',
            background: `url(./assets/media/icons/fireball.png), linear-gradient(orangered, silver)`,
            speedModifier: config.speedModifier || 0.75,
            damageModifier: config.damageModifier || 1.25,
            healthCost: config.healthCost || 0,
            staminaCost: config.staminaCost || 0,
            magicCost: config.magicCost || 12,
            accuracy: config.accuracy || 0.80,
            damageTypes: config.damageTypes || ['elemental'],
            soundEffectSrc: "./assets/audio/soundEffects/short-fireball-woosh-6146.mp3",

            attackerAnimation: config.attackerAnimation || 'ally-evade',
            abilityAnimation: config.abilityAnimation || 'swipe-right',
            abilityAnimationImage: config.abilityAnimationImage || './assets/media/icons/fireball.png',
        })
    }
    activate(attacker, target){
        let rawDamage = this.calculateDamage(attacker, target);
        rawDamage = this.checkCritical(attacker, rawDamage);
        let damage = this.checkDamage(target, rawDamage, 'health');
        target.currentHP = target.currentHP - damage;
        if(damage > 0){
            if(Math.random()*6 < 1){
                this.inflictStatus(new Burn({holder: target}), attacker, target);
            }
            this.triggerOnDeliverDamage(attacker, target);
            this.triggerOnRecieveDamage(attacker, target);
        }
    }
    updateMessage(attacker, target){
       this.message = `${attacker.name} shoots a fireball ${target.name}.`;
    }
}
export class Inferno extends Ability{
    constructor(config){
        super({
            name: 'inferno',
            description: "Blast enemies with a firery inferno made with elemental magic. Has a chance to burn targets.",
            iconSrc: './assets/media/icons/wildfires.png',
            background: `url(./assets/media/icons/wildfires.png), linear-gradient(orangered, silver)`,
            speedModifier: config.speedModifier || 0.5,
            damageModifier: config.damageModifier || 1.25,
            healthCost: config.healthCost || 0,
            staminaCost: config.staminaCost || 0,
            magicCost: config.magicCost || 35,
            accuracy: config.accuracy || 0.80,
            damageTypes: config.damageTypes || ['elemental'],
            soundEffectSrc: "./assets/audio/soundEffects/short-fireball-woosh-6146.mp3",
            targetCount: 3,
            sequenceType: 'splash',
            attackerAnimation: config.attackerAnimation || 'ally-evade',
            abilityAnimation: config.abilityAnimation || 'explode',
            abilityAnimationImage: config.abilityAnimationImage || './assets/media/icons/wildfires.png',
        })
    }
    activate(attacker, target){
        let rawDamage = this.calculateDamage(attacker, target);
        rawDamage = this.checkCritical(attacker, rawDamage);
        let damage = this.checkDamage(target, rawDamage, 'health');
        target.currentHP = target.currentHP - damage;
        if(damage > 0){
            if(Math.random()*10 < 1){
                this.inflictStatus(new Burn({holder: target}), attacker, target);
            }
            this.triggerOnDeliverDamage(attacker, target);
            this.triggerOnRecieveDamage(attacker, target);
        }
    }
    updateMessage(attacker, target){
       this.message = `${attacker.name} summons an inferno.`;
    }
}
export class LightningBolt extends Ability{
    constructor(config){
        super({
            name: 'lightning bolt',
            description: "Blast a target with a lightning bolt made with elemental magic. Has a chance to paralyze the target.",
            iconSrc: './assets/media/icons/lightning-tree.png',
            background: `url(./assets/media/icons/lightning-tree.png), linear-gradient(blue, silver)`,
            speedModifier: config.speedModifier || 0.75,
            damageModifier: config.damageModifier || 1.25,
            healthCost: config.healthCost || 0,
            staminaCost: config.staminaCost || 0,
            magicCost: config.magicCost || 12,
            accuracy: config.accuracy || 0.80,
            damageTypes: config.damageTypes || ['elemental'],
            soundEffectSrc: "./assets/audio/soundEffects/075681_electric-shock-33018.wav",
            attackerAnimation: config.attackerAnimation || 'ally-evade',
            abilityAnimationImage: config.abilityAnimationImage || './assets/media/icons/lightning-tree.png',
            abilityAnimation: config.abilityAnimation || 'shake',
           
            
        })
    }
    activate(attacker, target){
        let rawDamage = this.calculateDamage(attacker, target);
        rawDamage = this.checkCritical(attacker, rawDamage);
        let damage = this.checkDamage(target, rawDamage, 'health');
        target.currentHP = target.currentHP - damage;
        if(damage > 0){
            this.triggerOnDeliverDamage(attacker, target);
            this.triggerOnRecieveDamage(attacker, target);
            if(Math.random()*6 < 1){
                this.inflictStatus(new Paralyzed({holder: target}), attacker, target);
            } 
        }
    }
    updateMessage(attacker, target){
        this.message = `${attacker.name} shoots lightning at ${target.name}.`;
    }
}
export class IceShard extends Ability{
    constructor(config){
        super({
            name: 'ice shard',
            description: "Blast a target with a shard of ice made with elemental magic. Has a chance to freeze the target causing a variety of negative effects.",
            iconSrc: './assets/media/icons/ice-spear.png',
            background: `url(./assets/media/icons/ice-spear.png), linear-gradient(cyan, silver)`,
            speedModifier: config.speedModifier || 0.75,
            damageModifier: config.damageModifier || 1.25,
            healthCost: config.healthCost || 0,
            staminaCost: config.staminaCost || 0,
            magicCost: config.magicCost || 12,
            accuracy: config.accuracy || 0.80,
            damageTypes: config.damageTypes || ['elemental'],
            soundEffectSrc: "./assets/audio/soundEffects/cold-wind-fade.wav",

            attackerAnimation: config.attackerAnimation || 'ally-evade',
            abilityAnimation: config.abilityAnimation || 'swipe-right',
            abilityAnimationImage: config.abilityAnimationImage || './assets/media/icons/ice-spear.png',
        })
    }
    activate(attacker, target){
        let rawDamage = this.calculateDamage(attacker, target);
        rawDamage = this.checkCritical(attacker, rawDamage);
        let damage = this.checkDamage(target, rawDamage, 'health');
        target.currentHP = target.currentHP - damage;
        if(damage > 0){
            if(Math.random()*6 < 1){
                this.inflictStatus(new Frozen({holder: target}), attacker, target);
            }
            this.triggerOnDeliverDamage(attacker, target);
            this.triggerOnRecieveDamage(attacker, target);
        }
    }
    updateMessage(attacker, target){
       this.message = `${attacker.name} shoots an ice shard at ${target.name}.`;
    }
}
export class Shockwave extends Ability{
    constructor(config){
        super({
            name: 'shockwave',
            description: "Blast a target with a wave of elemental magic. Has a chance to knock over the target.",
            iconSrc: './assets/media/icons/wind-slap.png',
            background: `url(./assets/media/icons/wind-slap.png), linear-gradient(grey, silver)`,
            speedModifier: config.speedModifier || 1.25,
            damageModifier: config.damageModifier || 0.25,
            healthCost: config.healthCost || 0,
            staminaCost: config.staminaCost || 0,
            magicCost: config.magicCost || 15,
            damageTypes: config.damageTypes || ['blunt', 'elemental'],
            soundEffectSrc: "./assets/audio/soundEffects/supernatural-explosion-104295.wav",
            attackerAnimation: config.attackerAnimation || 'ally-attack',
            abilityAnimation: config.abilityAnimation || 'swipe-right',
            abilityAnimationImage: config.abilityAnimationImage || './assets/media/icons/wind-slap.png',
            targetAnimation: config.targetAnimation || 'hostile-evade',
           
        })
    }
    activate(attacker, target){
        let rawDamage = this.calculateDamage(attacker, target);
        rawDamage = this.checkCritical(attacker, rawDamage);
        let damage = this.checkDamage(target, rawDamage, 'health');
        target.currentHP = target.currentHP - damage;
        if(damage > 0){
            if(Math.random()*2 < 1){
                this.inflictStatus(new KnockedDown({holder: target}), attacker, target);
            }
            this.triggerOnDeliverDamage(attacker, target);
            this.triggerOnRecieveDamage(attacker, target);
        }
    }
    updateMessage(attacker, target){
        this.message = `${attacker.name} blasts ${target.name} with a shockwave.`;
    }
}
export class Siphon extends Ability{
    constructor(config){
        super({
            name: 'siphon',
            description: "Absorb a target's magic points using dark arcane magic.",
            iconSrc: './assets/media/icons/body-swapping.png',
            background: `url(./assets/media/icons/rolling-energy.png), linear-gradient(indigo, navy)`,
            speedModifier: config.speedModifier || 1.0,
            damageModifier: config.damageModifier || 4,
            healthCost: config.healthCost || 0,
            staminaCost: config.staminaCost || 0,
            magicCost: config.magicCost || 10,
            accuracy: config.accuracy || 1.0,
            damageTypes: config.damageTypes || ['arcane'],
            soundEffectSrc: "./assets/audio/soundEffects/cold-wind-fade.wav",

            attackerAnimation: config.attackerAnimation || 'none',
            abilityAnimation: config.abilityAnimation || 'sink',
            abilityAnimationImage: config.abilityAnimationImage || './assets/media/icons/tentacle-heart.png',
            targetAnimation: config.targetAnimation || 'sink',
        })
    }
    activate(attacker, target){
        let rawDamage = this.calculateDamage(attacker, target);
        rawDamage = this.checkCritical(attacker, rawDamage);
        let damage = this.checkDamage(target, rawDamage, 'magic');
        target.currentMagic = target.currentMagic - damage;

        let magicRestore = this.checkRestore(attacker, rawDamage*0.25, 'magic');
        attacker.currentMagic += magicRestore;
        
    }
    updateMessage(attacker, target){
       this.message = `${attacker.name} siphons the magic of ${target.name}.`;
    }
}
export class Earthquake extends Ability{//Needs Work targeting same targets twice?
    constructor(config){
        super({
            name: 'earthquake',
            description: "Shake the ground using elemental magic and strength to summon an earthquake over an enemy party. Has a chance to knock over targets.",
            iconSrc: './assets/media/icons/earth-split.png',
            background: `url(./assets/media/icons/earth-split.png), conic-gradient(steelblue, darkslategrey, brown, silver)`,
            speedModifier: config.speedModifier || 0.5,
            damageModifier: config.damageModifier || 1.0,
            criticalDamageModifier: config.criticalDamageModifier || 1.1,
            healthCost: config.healthCost || 0,
            staminaCost: config.staminaCost || 30,
            magicCost: config.magicCost || 0,
            damageTypes: config.damageTypes || ['blunt', 'elemental'],
            targetCount: 3,
            soundEffectSrc: "./assets/audio/soundEffects/supernatural-explosion-104295.wav",
            sequenceType: 'splash',
            attackerAnimation: config.attackerAnimation || 'explode',
            abilityAnimation: config.abilityAnimation || 'sink',
            abilityAnimationImage: config.abilityAnimationImage || './assets/media/icons/earth-split.png',
            targetAnimation: config.targetAnimation || 'shake',
            
        })
    }
    activate(attacker, target){
        let rawDamage = this.calculateDamage(attacker, target);
        rawDamage = this.checkCritical(attacker, rawDamage);
        let damage = this.checkDamage(target, rawDamage, 'health');
        target.currentHP = target.currentHP - damage;
        if(damage > 0){
            if(Math.random()*4 < 1){
                this.inflictStatus(new KnockedDown({holder: target}), attacker, target);
            }
            this.triggerOnDeliverDamage(attacker, target);
            this.triggerOnRecieveDamage(attacker, target);
        }
    }
    updateMessage(attacker){
        this.message = (`${attacker.name} creates an earthquake!`);
    }
}
export class ShootWeb extends Ability{
    constructor(config){
        super({
            name: 'shoot web',
            description: "Summon a web from elemental magic to surround a target. Has a chance of binding a target",
            iconSrc: './assets/media/icons/wep-spit.png',
            background: `url(./assets/media/icons/wep-spit.png), linear-gradient(olive, silver)`,
            speedModifier: config.speedModifier || 1,
            damageModifier: config.damageModifier || 0.25,
            healthCost: config.healthCost || 0,
            staminaCost: config.staminaCost || 12,
            magicCost: config.magicCost || 0,
            damageTypes: config.damageTypes || ['elemental'],
            soundEffectSrc: "./assets/audio/soundEffects/platzender-kopf_nachschlag-91637.mp3",
            attackerAnimation: config.attackerAnimation || 'ally-attack',
            abilityAnimation: config.abilityAnimation || 'stick-right',
            abilityAnimationImage: config.abilityAnimationImage || './assets/media/icons/spider-web.png',
           
        })
    }
    activate(attacker, target){
        let rawDamage = this.calculateDamage(attacker, target);
        rawDamage = this.checkCritical(attacker, rawDamage);
        let damage = this.checkDamage(target, rawDamage, 'health');
        target.currentHP = target.currentHP - damage;
        if(damage > 0){
            if(Math.random()*3 < 1){
                this.inflictStatus(new Bind({holder: target}), attacker, target);
            }
            this.triggerOnDeliverDamage(attacker, target);
            this.triggerOnRecieveDamage(attacker, target);
        }
    }
    updateMessage(attacker, target){
        this.message = `${attacker.name} shoots a web at ${target.name}.`;
    }
}
export class Pounce extends Ability{
    constructor(config){
        super({
            name: 'pounce',
            description: "Leap onto a target. Has a chance of knocking over smaller targets.",
            iconSrc: './assets/media/icons/paw-print.png',
            background: `url(./assets/media/icons/paw-print.png), linear-gradient(steelblue, darkslategrey)`,
            speedModifier: config.speedModifier || 1,
            damageModifier: config.damageModifier || 1,
            healthCost: config.healthCost || 0,
            staminaCost: config.staminaCost || 15,
            magicCost: config.magicCost || 0,
            damageTypes: config.damageTypes || ['blunt'],
            soundEffectSrc: "./assets/audio/soundEffects/platzender-kopf_nachschlag-91637.mp3",
            attackerAnimation: config.attackerAnimation || 'ally-attack',
            abilityAnimation: config.abilityAnimation || 'stick-right',
            abilityAnimationImage: config.abilityAnimationImage || './assets/media/icons/wolverine-claws.png',
            targetAnimation: config.targetAnimation || 'hostile-evade',
           
        })
    }
    activate(attacker, target){
        let rawDamage = this.calculateDamage(attacker, target);
        rawDamage = this.checkCritical(attacker, rawDamage);
        let damage = this.checkDamage(target, rawDamage, 'health');
        target.currentHP = target.currentHP - damage;
        if(damage > 0){
            if(Math.random()*3 < 1){
                this.inflictStatus(new KnockedDown({holder: target}), attacker, target);
            }
            this.triggerOnDeliverDamage(attacker, target);
            this.triggerOnRecieveDamage(attacker, target);
        }
    }
    updateMessage(attacker, target){
        this.message = `${attacker.name} pounces on ${target.name}.`;
    }
}
export class Block extends Ability{
    constructor(config){
        super({
            name: 'block',
            description: "Raise a sheild in defence. Protects oneself until their next attack or blocking a attack.",
            iconSrc: './assets/media/icons/shield.png',
            background: `url(./assets/media/icons/shield.png), linear-gradient(steelblue, darkslategrey)`,
            speedModifier: config.speedModifier || 1.25,
            damageModifier: config.damageModifier || 1.0,
            healthCost: config.healthCost || 0,
            staminaCost: config.staminaCost || 12,
            magicCost: config.magicCost || 0,
            damageTypes: config.damageTypes || ['blunt'],
            soundEffectSrc: "./assets/audio/soundEffects/anvil-hit-2-14845.mp3",
            attackerAnimation: config.attackerAnimation || 'none',
            targetAnimation: 'ally-evade',
            abilityAnimation: config.abilityAnimation || 'none',
            abilityAnimationImage: config.abilityAnimationImage || './assets/media/icons/shield.png',
            defaultTarget: 'self',
            targetLock: 'self',
        })
    }
    activate(attacker, target){
        this.inflictStatus(new Shielded({holder: target}), attacker, target);
    }
    updateMessage(attacker, target){
        this.message = `${attacker.name} raises a shield.`;
    }
}
export class Brace extends Ability{
    constructor(config){
        super({
            name: 'brace',
            description: "Prepare for physical attack. Raises one's physical defense.",
            iconSrc: './assets/media/icons/shield.png',
            background: `url(./assets/media/icons/shield.png), linear-gradient(steelblue, darkslategrey)`,
            speedModifier: config.speedModifier || 1.25,
            damageModifier: config.damageModifier || 0,
            healthCost: config.healthCost || 0,
            staminaCost: config.staminaCost || 10,
            magicCost: config.magicCost || 0,
            damageTypes: config.damageTypes || ['blunt'],
            soundEffectSrc: "./assets/audio/soundEffects/anvil-hit-2-14845.mp3",
            attackerAnimation: config.attackerAnimation || 'none',
            targetAnimation: 'none',
            abilityAnimation: config.abilityAnimation || 'none',
            abilityAnimationImage: config.abilityAnimationImage || './assets/media/icons/shield.png',
            defaultTarget: 'self',
            targetLock: 'self',
        })
    }
    activate(attacker, target){
        this.inflictStatus(new PhysicalDefenseBuff({holder: target}), attacker, target);
    }
    updateMessage(attacker, target){
        this.message = `${attacker.name} braces.`;
    }
}
export class VineLash extends Ability{
    constructor(config){
        super({
            name: 'vine lash',
            description: "Summon a magical vine to constrict a target. Has a chance of binding the target.",
            iconSrc: './assets/media/icons/vine-whip.png',
            background: `url(./assets/media/icons/vine-whip.png), conic-gradient(steelblue, darkslategrey, forestgreen, silver)`,
            speedModifier: config.speedModifier || 1,
            damageModifier: config.damageModifier || 1,
            healthCost: config.healthCost || 0,
            staminaCost: config.staminaCost || 0,
            magicCost: config.magicCost || 15,
            damageTypes: config.damageTypes || ['blunt', 'elemental'],
            soundEffectSrc: "./assets/audio/soundEffects/whip_lash.wav",
            attackerAnimation: config.attackerAnimation || 'ally-attack',
            abilityAnimation: config.abilityAnimation || 'stick-right',
            abilityAnimationImage: config.abilityAnimationImage || './assets/media/icons/thorny-vine.png',
            targetAnimation: config.targetAnimation || 'hostile-evade',
           
        })
    }
    activate(attacker, target){
        let rawDamage = this.calculateDamage(attacker, target);
        rawDamage = this.checkCritical(attacker, rawDamage);
        let damage = this.checkDamage(target, rawDamage, 'health');
        target.currentHP = target.currentHP - damage;
        if(damage > 0){
            if(Math.random()*3 < 1){
                this.inflictStatus(new Bind({holder: target}), attacker, target);
            }
            this.triggerOnDeliverDamage(attacker, target);
            this.triggerOnRecieveDamage(attacker, target);
        }
    }
    updateMessage(attacker, target){
        this.message = `${attacker.name} summons vines to lash ${target.name}.`;
    }
}
//TODO
export class Shapeshift extends Ability{
    constructor(config){
        super({
            name: 'Shapeshift',
            description: "Use elemental magic to take the form of wild animal. Will return to normal form upon death or leaving battle.",
            iconSrc: './assets/media/icons/vine-whip.png',
            background: `url(./assets/media/icons/mighty-force.png), linear-gradient(forestgreen, silver)`,
            speedModifier: config.speedModifier || 1,
            damageModifier: config.damageModifier || 1,
            healthCost: config.healthCost || 0,
            staminaCost: config.staminaCost || 0,
            magicCost: config.magicCost || 50,
            damageTypes: config.damageTypes || ['elemental'],
            soundEffectSrc: "./assets/audio/soundEffects/mixkit-magic-astral-sweep-effect-2629.wav",
            attackerAnimation: config.attackerAnimation || 'ally-attack',
            abilityAnimation: config.abilityAnimation || 'shake',
            abilityAnimationImage: config.abilityAnimationImage || './assets/media/icons/mighty-force.png',
            targetAnimation: config.targetAnimation || 'shake',

            defaultTarget: 'self',
            targetLock: 'self',
            
        })
        this.newForm;
    }
    activate(attacker, target){
        this.newForm = new Tiger({level: target.level});
        let originalForm = {
            animation: 'twister',
            animationDuration: 2000,
            animationSoundEffect: './assets/audio/soundEffects/tornado.wav',
            createNextForm: ()=>{
                return target;
            },
            messageFn: ()=>{
                return `${target.name} returns to normal form.`;
            }
        }
        this.inflictStatus(new Polymorphed({holder: this.newForm, originalForm: originalForm}), this.newFrom, this.newForm);
    }
    updateMessage(attacker, target){
        this.message = `${target.name} transforms into a Tiger.`;
    }
}
//TODO
export class Bless extends Ability{
    constructor(config){
        super({
            name: 'bless',
            description: "Grant a blessing upon a target restoring the target's health every turn using light arcane magic.",
            iconSrc: './assets/media/icons/cherish.png',
            background: `url(./assets/media/icons/cherish.png), linear-gradient(gold, navy)`,
            speedModifier: config.speedModifier || 1.0,
            damageModifier: config.damageModifier || 0,
            healthCost: config.healthCost || 0,
            staminaCost: config.staminaCost || 0,
            magicCost: config.magicCost || 25,
            damageTypes: config.damageTypes || ['arcane'],
            soundEffectSrc: "./assets/audio/soundEffects/mixkit-light-spell-873 copy.wav",
            attackerAnimation: config.attackerAnimation || 'none',
            targetAnimation: 'ally-evade',
            abilityAnimation: config.abilityAnimation || 'none',
            abilityAnimationImage: config.abilityAnimationImage || './assets/media/icons/cherish.png',
            defaultTarget: 'ally',
        })
    }
    activate(attacker, target){
        this.inflictStatus(new Blessed({holder: target}), attacker, target);
    }
    updateMessage(attacker, target){
        this.message = `${attacker.name} blesses ${target.name}.`;
    }
}
export class Curse extends Ability{
    constructor(config){
        super({
            name: 'curse',
            description: "Curse a target to absorb the target's health every turn using dark arcane magic.",
            iconSrc: './assets/media/icons/cursed-star.png',
            background: `url(./assets/media/icons/cursed-star.png), linear-gradient(indigo, navy)`,
            speedModifier: config.speedModifier || 1.0,
            damageModifier: config.damageModifier || 0,
            healthCost: config.healthCost || 0,
            staminaCost: config.staminaCost || 0,
            magicCost: config.magicCost || 25,
            damageTypes: config.damageTypes || ['arcane'],
            soundEffectSrc: "./assets/audio/soundEffects/totem-strike-96497.wav",
            attackerAnimation: config.attackerAnimation || 'none',
            targetAnimation: 'ally-evade',
            abilityAnimation: config.abilityAnimation || 'none',
            abilityAnimationImage: config.abilityAnimationImage || './assets/media/icons/cursed-star.png',
        })
    }
    activate(attacker, target){
        this.inflictStatus(new Cursed({holder: target, inflicter: attacker}), attacker, target);
    }
    updateMessage(attacker, target){
        this.message = `${attacker.name} curses ${target.name}.`;
    }
}
export class Roar extends Ability{
    constructor(config){
        super({
            name: 'roar',
            description: `Let out an intimidating roar lowering enemy physical attack or raising an ally's physical attack.`,
            iconSrc: './assets/media/icons/sonic-shout.png',
            background: `url(./assets/media/icons/sonic-shout.png), conic-gradient(steelblue, darkslategrey, crimson, darkslategrey)`,
            speedModifier: config.speedModifier || 1.5,
            damageModifier: config.damageModifier || 0,
            healthCost: config.healthCost || 0,
            staminaCost: config.staminaCost || 10,
            magicCost: config.magicCost || 0,
            damageTypes: config.damageTypes || ['blunt', 'pierce'],
            soundEffectSrc: "./assets/audio/soundEffects/leopard-roar-deep-pitched-195922.mp3",
            attackerAnimation: config.attackerAnimation || 'shake',
            targetAnimation: 'shake',
            abilityAnimation: config.abilityAnimation || 'shake',
            abilityAnimationImage: config.abilityAnimationImage || './assets/media/icons/resonance.png',
        })
    }
    activate(attacker, target){
        if(attacker == target){
            this.inflictStatus(new PhysicalAttackBuff({holder: target}), attacker, target);
        }else{
            this.inflictStatus(new PhysicalAttackDebuff({holder: target}), attacker, target);
        }
    }
    updateMessage(attacker, target){
        if(attacker == target){
            this.message = `${attacker.name} roars.`;
        }
        else{
            this.message = `${attacker.name} roars at ${target.name}.`;
        }
    }
}
export class Howl extends Ability{
    constructor(config){
        super({
            name: 'howl',
            description: `Howl at the sky, raising a target's physical attack.`,
            iconSrc: './assets/media/icons/sonic-shout.png',
            background: `url(./assets/media/icons/sonic-shout.png), conic-gradient(steelblue, darkslategrey, crimson, darkslategrey)`,
            speedModifier: config.speedModifier || 1.5,
            damageModifier: config.damageModifier || 0,
            healthCost: config.healthCost || 0,
            staminaCost: config.staminaCost || 10,
            magicCost: config.magicCost || 0,
            damageTypes: config.damageTypes || ['pierce'],
            soundEffectSrc: "./assets/audio/soundEffects/wolves-howling-1-225304.wav",
            attackerAnimation: config.attackerAnimation || 'shake',
            targetAnimation: 'none',
            abilityAnimation: config.abilityAnimation || 'none',
            abilityAnimationImage: config.abilityAnimationImage || './assets/media/icons/resonance.png',
            defaultTarget: 'ally',
        })
    }
    activate(attacker, target){
        this.inflictStatus(new PhysicalAttackBuff({holder: target}), attacker, target);
    }
    updateMessage(attacker, target){
        if(attacker == target){
            this.message = `${attacker.name} howls at the sky.`;
        }
        else{
            this.message = `${attacker.name} howls at ${target.name}.`;
        }
    }
}
export class ChannelMagic extends Ability{
    constructor(config){
        super({
            name: 'channel magic',
            description: `Channel nearby arcane and elemental magic into a more pure and dangerous form. Increases one's magical attack.`,
            iconSrc: './assets/media/icons/mighty-force.png',
            background: `url(./assets/media/icons/mighty-force.png), linear-gradient(magenta, navy)`,
            speedModifier: config.speedModifier || 1.5,
            damageModifier: config.damageModifier || 0,
            healthCost: config.healthCost || 0,
            staminaCost: config.staminaCost || 0,
            magicCost: config.magicCost || 10,
            damageTypes: config.damageTypes || ['arcane'],
            soundEffectSrc: "./assets/audio/soundEffects/mixkit-magic-astral-sweep-effect-2629.wav",
            attackerAnimation: config.attackerAnimation || 'none',
            targetAnimation: 'explode',
            abilityAnimation: config.abilityAnimation || 'none',
            abilityAnimationImage: config.abilityAnimationImage || './assets/media/icons/mighty-force.png',
            defaultTarget: 'self',
        })
    }
    activate(attacker, target){
        this.inflictStatus(new MagicalAttackBuff({holder: target}), attacker, target);
    }
    updateMessage(attacker, target){
        this.message = `${attacker.name} channels magic.`;
    }
}
export class Hex extends Ability{
    constructor(config){
        super({
            name: 'hex',
            description: `Hex a target with arcane magic. Lower's a target's magical attack.`,
            iconSrc: './assets/media/icons/dripping-star.png',
            background: `url(./assets/media/icons/dripping-star.png), linear-gradient(indigo, navy)`,
            speedModifier: config.speedModifier || 1.5,
            damageModifier: config.damageModifier || 0,
            healthCost: config.healthCost || 0,
            staminaCost: config.staminaCost || 0,
            magicCost: config.magicCost || 10,
            damageTypes: config.damageTypes || ['arcane'],
            soundEffectSrc: "./assets/audio/soundEffects/totem-strike-96497.wav",
            attackerAnimation: config.attackerAnimation || 'none',
            targetAnimation: 'shake',
            abilityAnimation: config.abilityAnimation || 'implode',
            abilityAnimationImage: config.abilityAnimationImage || './assets/media/icons/dripping-star.png',
        })
    }
    activate(attacker, target){
        this.inflictStatus(new MagicalAttackDebuff({holder: target}), attacker, target);
    }
    updateMessage(attacker, target){
        if(attacker == target){
            this.message = `${attacker.name} casts a hex.`;
        }
        else{
            this.message = `${attacker.name} hexes ${target.name}.`;
        }
    }
}

export class ShootBullet extends Ability{
    constructor(config){
        super({
            name: 'shoot bullet',
            description: "Shoot a target with a round bullet. Has a high critical chance.",
            iconSrc: './assets/media/icons/gunshot.png',
            background: `url(./assets/media/icons/gunshot.png), conic-gradient(steelblue, darkslategrey, crimson, darkslategrey)`,
            speedModifier: config.speedModifier || 1.25,
            damageModifier: config.damageModifier || 1.25,
            criticalDamageModifier: config.criticalDamageModifier || 1.5,
            criticalChanceModifier: config.criticalChance|| 0.25,
            accuracy: config.accuracy || 0.80,
            healthCost: config.healthCost || 0,
            staminaCost: config.staminaCost || 15,
            magicCost: config.magicCost || 0,
            damageTypes: config.damageTypes || ['strength', 'arcane'],
            soundEffectSrc: "./assets/audio/soundEffects/supernatural-explosion-104295.wav",
            attackerAnimation: config.attackerAnimation || 'ally-evade',
            abilityAnimationImage: config.abilityAnimationImage || './assets/media/icons/falling-blob.png',
            abilityAnimation: config.abilityAnimation || 'swipe-right',
           
            
        })
    }
    activate(attacker, target){
        let rawDamage = this.calculateDamage(attacker, target);
        rawDamage = this.checkCritical(attacker, rawDamage);
        let damage = this.checkDamage(target, rawDamage, 'health');
        target.currentHP = target.currentHP - damage;
        if(damage > 0){
            this.triggerOnDeliverDamage(attacker, target);
            this.triggerOnRecieveDamage(attacker, target);
        }
    }
    updateMessage(attacker, target){
        this.message = `${attacker.name} shoots ${target.name} with a bullet.`;
    }
}
export class MeteorShower extends Ability{
    //random amount of targets
}
export class Fly extends Ability{
    //character is airborne (can only be attack with attacks with certain range)
}
export class CastShadow extends Ability{
    //grants character type of shadowy oversheild //current vs base apperance?
}
export class Tunnel extends Ability{

}
export class Parry extends Ability{

}
export class MarkTarget extends Ability{
    //lowers physical defense
}
export class Detonate extends Ability{
    
}
export class ThrowPosionedKnife extends Ability{
    constructor(config){
        super({
            name: 'throw posioned knife',
            description: "Throw a posioned knife at a target. Poions the target.",
            iconSrc: './assets/media/icons/flying-dagger.png',
            background: `url(./assets/media/icons/flying-dagger.png), linear-gradient(crimson, darkslategrey, olive, silver)`,
            speedModifier: config.speedModifier || 1.25,
            damageModifier: config.damageModifier || 0.25,
            healthCost: config.healthCost || 0,
            staminaCost: config.staminaCost || 10,
            magicCost: config.magicCost || 0,
            damageTypes: config.damageTypes || ['pierce'],
            targetCount: 1,
            soundEffectSrc: "./assets/audio/soundEffects/arrow-body-impact-146419.mp3",
            attackerAnimation: config.attackerAnimation || 'ally-attack',
            abilityAnimation: config.abilityAnimation || 'swipe-right',
            abilityAnimationImage: config.abilityAnimationImage || './assets/media/icons/flying-dagger.png',

        })
    }
    activate(attacker, target){
        let rawDamage = this.calculateDamage(attacker, target);
        rawDamage = this.checkCritical(attacker, rawDamage);
        let damage = this.checkDamage(target, rawDamage, 'health');
        target.currentHP = target.currentHP - damage;
        this.triggerOnDeliverDamage(attacker, target);
        this.triggerOnRecieveDamage(attacker, target);
        this.inflictStatus(new Poison({holder: target}), attacker, target);
    }
    updateMessage(attacker, target){
        this.message = `${attacker.name} throws a posioned knife at ${target.name}.`;
    }
}
export class SetBearTrap extends Ability{
    constructor(config){
        super({
            name: 'set bear trap',
            description: "Set a bear trap that has a chance to spring upon an enemy attack.",
            iconSrc: './assets/media/icons/man-trap.png',
            background: `url(./assets/media/icons/man-trap.png), linear-gradient(steelblue, darkslategrey)`,
            speedModifier: config.speedModifier || 1.25,
            damageModifier: config.damageModifier || 0,
            healthCost: config.healthCost || 0,
            staminaCost: config.staminaCost || 10,
            magicCost: config.magicCost || 0,
            damageTypes: config.damageTypes || ['pierce'],
            targetCount: 1,
            soundEffectSrc: "./assets/audio/soundEffects/mixkit-metal-medieval-construction-818.wav",
            defaultTarget: 'self',
            targetLock: 'self',

            attackerAnimation: config.attackerAnimation || 'none',
            abilityAnimation: config.abilityAnimation || 'implode',
            abilityAnimationImage: config.abilityAnimationImage || './assets/media/icons/man-trap.png',

        })
    }
    activate(attacker, target){
        this.inflictStatus(new BearTrapSet({holder: target}), attacker, target);
    }
    updateMessage(attacker, target){
        this.message = `${attacker.name} sets a bear trap.`;
    }
}
export class ThrowNet extends Ability{
    constructor(config){
        super({
            name: 'throw net',
            description: "Throw a net at a target. Binds the target.",
            iconSrc: './assets/media/icons/fishing-net.png',
            background: `url(./assets/media/icons/fishing-net.png), linear-gradient(crimson, darkslategrey)`,
            speedModifier: config.speedModifier || 1.25,
            damageModifier: config.damageModifier || 0,
            healthCost: config.healthCost || 0,
            staminaCost: config.staminaCost || 10,
            magicCost: config.magicCost || 0,
            damageTypes: config.damageTypes || ['pierce'],
            targetCount: 1,
            soundEffectSrc: "./assets/audio/soundEffects/arrow-body-impact-146419.mp3",
            attackerAnimation: config.attackerAnimation || 'ally-attack',
            abilityAnimation: config.abilityAnimation || 'stick-right',
            abilityAnimationImage: config.abilityAnimationImage || './assets/media/icons/fishing-net.png',

        })
    }
    activate(attacker, target){
        this.inflictStatus(new Bind({holder: target}), attacker, target);
    }
    updateMessage(attacker, target){
        this.message = `${attacker.name} throws a net at ${target.name}.`;
    }
}
export class ThrowSmokeBomb extends Ability{
    constructor(config){
        super({
            name: 'throw smoke bomb',
            description: "Throw a smokebomb at a target. Raises target target evasion.",
            iconSrc: './assets/media/icons/smoke-bomb.png',
            speedModifier: config.speedModifier || 1.25,
            damageModifier: config.damageModifier || 0,
            healthCost: config.healthCost || 0,
            staminaCost: config.staminaCost || 6,
            magicCost: config.magicCost || 0,
            damageTypes: config.damageTypes || ['pierce'],
            targetCount: 1,
            soundEffectSrc: "./assets/audio/soundEffects/supernatural-explosion-104295.wav",
            abilityAnimation: config.abilityAnimation || 'explode',
            abilityAnimationImage: config.abilityAnimationImage || './assets/media/icons/smoke-bomb.png',

        })
    }
    activate(attacker, target){
        this.inflictStatus(new EvasionBuff({holder: target}), attacker, target);
    }
    updateMessage(attacker, target){
        if(attacker == target){
            this.message = `${attacker.name} throws a smokebomb.`;
        }
        else{
            this.message = `${attacker.name} throws a smokebomb at ${target.name}.`;
        }
    }
}
export class DrinkHealthPotion extends Ability{
    constructor(config){
        super({
            name: 'drink health potion',
            description: "Drink a potion of health restoring half of one's hitpoints. Can be thrown at another target.",
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
            description: "Drink a potion of stamina restoring half of one's stamina points. Can be thrown at another target.",
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
            description: "Drink a potion of magic restoring half of one's magic points. Can be thrown at another target.",
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
            description: "Ingest an antidote removing the poison effect. Can be thrown at another target.",
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
            description: "Apply an aloe remedy removing the burn effect. Can be thrown at another target.",
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
            description: "Apply a bandage healting a small amount of hitpoints and removing the bleeding effect. Can be thrown at another target.",
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
export class UseParalysisTonic extends Ability{
    constructor(config){
        super({
            name: 'use paralysis tonic',
            description: "Apply a bandage healting a moderate amount of stamina points and removing the paralysis effect. Can be thrown at another target.",
            iconSrc: './assets/media/icons/round-bottom-flask.png',
            speedModifier: config.speedModifier || 1,
            soundEffectSrc: "./assets/audio/soundEffects/mixkit-light-spell-873.wav",
            abilityAnimation: 'explode',
            abilityAnimationImage: config.abilityAnimationImage || './assets/media/icons/round-bottom-flask.png',
            defaultTarget: 'self',
        })
    }
    activate(attacker, target){
        let staminaRestore = this.checkRestore(target, target.maxStamina * 0.3, 'stamina');
        target.currentHP += staminaRestore;
        this.removeStatus('paralyzed', target);
    }
    updateMessage(attacker, target){
        if(attacker == target){
            this.message = `${attacker.name} uses a paralysis tonic.`;
        }
        else{
            this.message = `${attacker.name} throws a paralysis tonic at ${target.name}.`;
        }
    }
}

export class DrinkKurtussBrewOfMadness extends Ability{
    constructor(config){
        super({
            name: 'drink kurtuss brew of madness',
            description: "Bottoms up...",
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





