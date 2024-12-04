import {Rest, Struggle} from './abilities.js';

class StatusEffect{
    constructor(config){
        this.name = config.name;
        this.iconSrc = config.iconSrc || null;
        this.holder = config.holder;
        this.maxCharges = config.maxCharges;
        this.currentCharges = this.maxCharges;
        this.stackable = config.stackable || false;
        this.removeOnBattleEnd = config.removeOnBattleEnd || false;
        this.activate = this.activate.bind(this);
        this.soundEffectSrc = config.soundEffectSrc || "./assets/audio/soundEffects/power-down-45784.mp3",
        this.message = '';

        this.attackerAnimation = config.attackerAnimation || 'none';
        this.targetAnimation = config.targetAnimation || 'none';
        this.abilityAnimation = config.abilityAnimation || 'explode';
        this.abilityAnimationImage = config.abilityAnimationImage || this.iconSrc;
        this.abilityAnimationDuration = config.abilityAnimationDuration || 2000;



    }
    activate(turnPhase){
        if(this.holder.currentHP <= 0){
            return this.onDeath();
        }
        if(turnPhase == 'start'){
            return this.onStartTurn();
        }
        if(turnPhase == 'end'){
            return this.onEndTurn();
        }
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
    activateHelpper(fn, resolveObject){
        if(this.currentCharges <= 0){
            this.onRemove();
        }
        return new Promise((resolve)=>{
            fn();
            resolve(resolveObject);
        });
    }
    //turn events
    onStartTurn(){
        return this.activateHelpper(()=>{}, 
        {
            text: false,
            animation: false,
            vitalsUpdate: false,
        }
    )}
    onEndTurn(){
        return this.activateHelpper(()=>{}, 
        {
            text: false,
            animation: false,
            vitalsUpdate: false,
        }
    )}
    onDeath(){
        return this.activateHelpper(()=>{}, 
        {
            text: false,
            animation: false,
            vitalsUpdate: false,
        }
    )}
    //apply / remove events
    onApplied(attacker, target, status){
        target.statusArray.push(status);
    }
    onRemove(){
        for(let i = 0; i < this.holder.statusArray.length; i++){
            if(this.holder.statusArray[i].name == this.name){
                this.holder.statusArray.splice(i, 1);
                break;
            }
        }
    }
    //to target events
    onRecieveDamage(attacker, target){
        
    }
    onOpponentAttemptAbility(attacker, target){
        
    }
    //to attacker
    onDeliverDamage(attacker, target){
        
    }
    onAttemptAbility(attacker, target){
        
    }   
}
export class Poison extends StatusEffect{
    constructor(config){
        super({
            name:'poison',
            holder: config.holder,
            maxCharges: 5,
            iconSrc: "./assets/media/icons/snake.png",
            soundEffectSrc: "./assets/audio/soundEffects/power-down-45784.mp3",
    
        });
        this.severityMofifier = 0.08;
    }
    onEndTurn(){
        return this.activateHelpper(
            ()=>{
                let damage = this.checkDamage(this.holder, this.holder.maxHP * this.severityMofifier, 'health');
                this.holder.currentHP = this.holder.currentHP - damage;
                this.severityMofifier += 0.02;
                this.message = (`${this.holder.name} takes damage from poison.`);
                this.currentCharges --;
            }, 
            {
                text: true,
                animation: true,
                vitalsUpdate: true,
            }
        );
    }
}

export class Burn extends StatusEffect{
    constructor(config){
        super({
            name:'burn',
            iconSrc: "./assets/media/icons/burn.png",
            holder: config.holder,
            maxCharges: 3,
            soundEffectSrc: "./assets/audio/soundEffects/short-fireball-woosh-6146.mp3",
        });
    }
    onEndTurn(){
        return this.activateHelpper(
            ()=>{
                let damage = this.checkDamage(this.holder, this.holder.maxHP * 0.1, 'health');
                this.holder.currentHP = this.holder.currentHP - damage;
                this.message = `${this.holder.name} suffers from burns.`;
                this.currentCharges --;
            }, 
            {
                text: true,
                animation: true,
                vitalsUpdate: true,
            }
        );
    }

}

export class Bleed extends StatusEffect{
    constructor(config){
        super({
            name:'bleed',
            iconSrc: "./assets/media/icons/bleeding-wound.png",
            holder: config.holder,
            maxCharges: 5,
            soundEffectSrc: "./assets/audio/soundEffects/platzender-kopf_nachschlag-91637.mp3",
        });
        this.severityMofifier = 0.12;
    }
    onEndTurn(){
        return this.activateHelpper(
            ()=>{
                let staminaDamage = Math.floor(this.holder.maxStamina * this.severityMofifier);
                let healthDamage = 0;
                if(this.holder.currentStamina - staminaDamage < 0){
                    healthDamage = staminaDamage - this.holder.currentStamina;
                    staminaDamage = this.holder.currentStamina;
                }
                if(healthDamage > 0){
                    this.message = `${this.holder.name} bleeds badly.`;
                }else{
                    this.message = `${this.holder.name} suffers from bleeding.`;
                }
                this.holder.currentStamina = this.holder.currentStamina - staminaDamage;
                this.holder.currentHP = this.holder.currentHP - healthDamage;
                this.severityMofifier += 0.03;
                this.currentCharges --;
                
            }, 
            {
                text: true,
                animation: true,
                vitalsUpdate: true,
            }
        );
    }
}

export class Bind extends StatusEffect{
    constructor(config){
        super({
            name:'bind',
            iconSrc: "./assets/media/icons/crossed-chains.png",
            holder: config.holder,
            maxCharges: 3,
            soundEffectSrc: "./assets/audio/soundEffects/power-down-45784.mp3",
            targetAnimation: 'shake',
            abilityAnimation: 'none',
            removeOnBattleEnd: true,
        });
        this.escapethreshold = config.escapethreshold || 0.75;
    }
    onStartTurn(){
        return this.activateHelpper(
            ()=>{
                this.message = `${this.holder.name} attempts to break free.`;
                if(Math.random() > this.escapethreshold){
                    this.onRemove();
                }else{
                    this.holder.nextAbility = new Struggle({});
                    this.holder.abilityTargets = [this.holder];
                }
                this.currentCharges --;
            }, 
            {
                text: true,
                animation: true,
                vitalsUpdate: true,
            }
        );
    }
}
export class Paralyzed extends StatusEffect{
    constructor(config){
        super({
            name:'paralyzed',
            iconSrc: "./assets/media/icons/electric.png",
            holder: config.holder,
            maxCharges: 2,
            soundEffectSrc: "./assets/audio/soundEffects/075681_electric-shock-33018.wav",
            targetAnimation: 'shake',
            abilityAnimation: 'none',
        });
    }
    onStartTurn(){
        return this.activateHelpper(
            ()=>{
                this.message = `${this.holder.name} is paralyzed.`;
                this.holder.nextAbility = new Struggle({});
                this.holder.abilityTargets = [this.holder];
                this.currentCharges --;
            }, 
            {
                text: true,
                animation: true,
                vitalsUpdate: true,
            }
        );
    }
}
export class Frozen extends StatusEffect{
    constructor(config){
        super({
            name:'frozen',
            iconSrc: "./assets/media/icons/frozen-block.png",
            holder: config.holder,
            maxCharges: 5,
            soundEffectSrc: "./assets/audio/soundEffects/cold-wind-fade.wav",
            targetAnimation: 'shake',
            abilityAnimation: 'none',
        });
    }
    onApplied(attacker, target, status){
        target.statusArray.push(status);
        this.holder.currentSpeed -= this.holder.baseSpeed * 0.5;
    }
    onRemove(){
        for(let i = 0; i < this.holder.statusArray.length; i++){
            if(this.holder.statusArray[i].name == this.name){
                this.holder.statusArray.splice(i, 1);
                break;
            }
        }
        this.holder.currentSpeed += this.holder.baseSpeed * 0.5;
    }
    onStartTurn(){
        return this.activateHelpper(
            ()=>{
                let chance = Math.random()*2
                if(chance < 1){
                    this.message = `${this.holder.name} is frozen.`;
                    this.holder.nextAbility = new Struggle({});
                    this.holder.abilityTargets = [this.holder];
                }else{
                    this.message = `${this.holder.name} is cold.`;
                }
                this.currentCharges --;
            }, 
            {
                text: true,
                animation: true,
                vitalsUpdate: true,
            }
        );
    }
    onEndTurn(){
        return this.activateHelpper(
            ()=>{
                let damage = this.checkDamage(this.holder, this.holder.maxHP * 0.05, 'health');
                this.holder.currentHP = this.holder.currentHP - damage;
                this.message = `${this.holder.name} suffers from frostbite.`;
                this.currentCharges --;
            }, 
            {
                text: true,
                animation: true,
                vitalsUpdate: true,
            }
        );
    }
}
export class Shielded extends StatusEffect{
    constructor(config){
        super({
            name:'shielded',
            iconSrc: "./assets/media/icons/shield.png",
            holder: config.holder,
            maxCharges: 1,
            targetAnimation: 'none',
            abilityAnimation: 'none',
            removeOnBattleEnd: true,
        });
    }
    onApplied(attacker, target, status){
        target.statusArray.push(status);
        this.holder.currentBluntResistance = (this.holder.currentBluntResistance + 0.5);
        this.holder.currentPierceResistance = (this.holder.currentPierceResistance + 0.5);
        this.holder.currentArcaneResistance = (this.holder.currentArcaneResistance + 0.5);
        this.holder.currentElementalResistance = (this.holder.currentElementalResistance + 0.5);
        
    }
    onRemove(){
        for(let i = 0; i < this.holder.statusArray.length; i++){
            if(this.holder.statusArray[i].name == this.name){
                this.holder.statusArray.splice(i, 1);
                break;
            }
        }
        this.holder.currentBluntResistance = (this.holder.currentBluntResistance - 0.5);
        this.holder.currentPierceResistance = (this.holder.currentPierceResistance - 0.5);
        this.holder.currentArcaneResistance = (this.holder.currentArcaneResistance - 0.5);
        this.holder.currentElementalResistance = (this.holder.currentElementalResistance - 0.5);
    }
    onDeliverDamage(attacker, target){
        this.onRemove();
    }
    onRecieveDamage(attacker, target){
        this.onRemove();
    }
    onEndTurn(){
        return this.activateHelpper(
            ()=>{
                
            }, 
            {
                text: false,
                animation: false,
                vitalsUpdate: false,
            }
        );
    }
}

export class KnockedDown extends StatusEffect{
    constructor(config){
        super({
            name:'knocked down',
            iconSrc: "./assets/media/icons/falling.png",
            holder: config.holder,
            maxCharges: 1,
            soundEffectSrc: "./assets/audio/soundEffects/vine-boom-sound-effect.mp3",
            targetAnimation: 'shake',
            abilityAnimation: 'none',
        });
    }
    onStartTurn(){
        return this.activateHelpper(
            ()=>{
                this.message = `${this.holder.name} is knocked down.`;
                this.holder.nextAbility = new Struggle({});
                this.holder.abilityTargets = [this.holder];
                this.currentCharges --;
            }, 
            {
                text: true,
                animation: true,
                vitalsUpdate: true,
            }
        );
    }
}
export class Flying extends StatusEffect{
    constructor(config){
        super({
            name:'flying',
            iconSrc: "./assets/media/icons/wing-cloak.png",
            holder: config.holder,
            maxCharges: 3,
            soundEffectSrc: "./assets/audio/soundEffects/cold-wind-fade.wav",
            targetAnimation: 'float',
            abilityAnimation: 'float',
            removeOnBattleEnd: true,
        });
    }
    onApplied(attacker, target, status){
        target.immunities.push('melee');
        target.immunities.push('earth'); 
        target.statusArray.push(status); 
    }
    onRemove(){
        for(let i = 0; i < this.holder.statusArray.length; i++){
            if(this.holder.statusArray[i].name == this.name){
                this.holder.statusArray.splice(i, 1);
                break;
            }
        }
        for(let i = 0; i < this.holder.immunities.length; i++){
            if(this.holder.immunities[i] == 'melee'){
                this.holder.immunities.splice(i, 1);
            }
        }
        for(let i = 0; i < this.holder.immunities.length; i++){
            if(this.holder.immunities[i] == 'earth'){
                this.holder.immunities.splice(i, 1);
            }
        }
    }
    onEndTurn(){
        return this.activateHelpper(
            ()=>{
                this.message = `${this.holder.name} is in the air.`;
                this.currentCharges --;
            }, 
            {
                text: true,
                animation: true,
                vitalsUpdate: true,
            }
        );
    }
}
export class InstaDeath extends StatusEffect{
    constructor(config){
        super({
            name:'instaDeath',
            holder: config.holder,
            maxCharges: 99,
            soundEffectSrc: "./assets/audio/soundEffects/cold-wind-fade.wav",
            targetAnimation: 'shake',
            abilityAnimation: 'none',
        });
    }
    onRemove(){
        for(let i = 0; i < this.holder.statusArray.length; i++){
            if(this.holder.statusArray[i].name == this.name){
                this.holder.statusArray.splice(i, 1);
                break;
            }
        }
    }
    onRecieveDamage(attacker, target){
        this.holder.currentHP = 0;
        this.onRemove();
    }
}

export class Blessed extends StatusEffect{
    constructor(config){
        super({
            name:'blessed',
            iconSrc: "./assets/media/icons/blessed.png",
            holder: config.holder,
            maxCharges: 5,
            soundEffectSrc: "./assets/audio/soundEffects/mixkit-light-spell-873.wav",
        });
    }
    onEndTurn(){
        return this.activateHelpper(
            ()=>{
                let healthRestore = this.checkRestore(this.holder, this.holder.maxHP * 0.1, 'health');
                this.holder.currentHP += healthRestore;
                this.message = `${this.holder.name} restores health from blessings.`;
                this.currentCharges --;
            }, 
            {
                text: true,
                animation: true,
                vitalsUpdate: true,
            }
        );
    }
}

export class Cursed extends StatusEffect{
    constructor(config){
        super({
            name:'cursed',
            iconSrc: "./assets/media/icons/cursed.png",
            holder: config.holder,
            maxCharges: 5,
            soundEffectSrc: "./assets/audio/soundEffects/totem-strike-96497.wav",
            removeOnBattleEnd: true,
        });
        this.inflicter = config.inflicter;
    }
    onEndTurn(){
        return this.activateHelpper(
            ()=>{
                let damage = this.checkDamage(this.holder, this.holder.maxHP * 0.05, 'health');
                this.holder.currentHP = this.holder.currentHP - damage;

                let healthRestore = this.checkRestore(this.inflicter, damage, 'health');
                this.inflicter.currentHP += healthRestore;
                
                this.message = `${this.holder.name} suffers from curse.`;
                this.currentCharges --;
            }, 
            {
                text: true,
                animation: true,
                vitalsUpdate: true,
            }
        );
    }
}
export class BearTrapSet extends StatusEffect{
    constructor(config){
        super({
            name:'bear trap set',
            iconSrc: "./assets/media/icons/man-trap.png",
            holder: config.holder,
            maxCharges: 99,
            soundEffectSrc: "./assets/audio/soundEffects/mixkit-metal-medieval-construction-818.wav",
        });
    }
    onRecieveDamage(attacker, target){
        attacker.currentHP -= Math.floor(attacker.maxHP*0.15)
        if(attacker.currentHP < 0){
            attacker.currentHP = 0;
        }
        this.onRemove();
    }
}
export class SoulLinked extends StatusEffect{
    constructor(config){
        super({
            name:'soul linked',
            holder: config.holder,
            maxCharges: 99,
            removeOnBattleEnd: false,
            stackable: true,
        });
        this.inflicter = config.inflicter;
    }
    onRecieveDamage(){
        if(this.holder.currentHP <= 0){//kraken holder tentacle inflicter
            this.inflicter.currentHP = 0;
            this.onRemove();
        }
    }
}
export class Polymorphed extends StatusEffect{
    constructor(config){
        super({
            name:'polymorphed',
            holder: config.holder,
            iconSrc: "./assets/media/icons/polymorphed.png",
            maxCharges: 6,
            removeOnBattleEnd: true,
        });
        this.originalForm = config.originalForm;
    }
    onEndTurn(){
        return this.activateHelpper(
            ()=>{
                this.currentCharges --;
            }, 
            {
                text: false,
                animation: false,
                vitalsUpdate: false,
            }
        );
    }
    onApplied(attacker, target, status){
        target.statusArray.push(status);
        this.holder.nextForm = this.originalForm;
    }
    onRemove(){
        for(let i = 0; i < this.holder.statusArray.length; i++){
            if(this.holder.statusArray[i].name == this.name){
                this.holder.statusArray.splice(i, 1);
                break;
            }
        }
        this.holder.currentHP = 0;
    }
}
export class PhysicalAttackBuff extends StatusEffect{
    constructor(config){
        super({
            name:'physical attack buff',
            iconSrc: "./assets/media/icons/physical-attack-buff-1.png",
            holder: config.holder,
            maxCharges: 5,
            stackable: true,
            targetAnimation: 'none',
            abilityAnimation: 'none',
            removeOnBattleEnd: true,
        });
        this.currentLevel = config.level || 0;
        this.currentBluntAttackBuff = 0;
        this.currentPierceAttackBuff = 0;
    }
    onApplied(attacker, target, status){
        this.holder.currentBluntAttack -= this.currentBluntAttackBuff;
        this.holder.currentPierceAttack -= this.currentPierceAttackBuff;
        for(let i = 0; i < this.holder.statusArray.length; i++){
            if(this.holder.statusArray[i].name == 'physical attack debuff'){
                this.holder.statusArray[i].currentLevel = this.holder.statusArray[i].currentLevel - 2
                if(this.holder.statusArray[i].currentLevel <= 0){
                    this.holder.statusArray[i].onRemove();
                }else{
                    this.holder.statusArray[i].onApplied(attacker, target, status);
                }
                return;
            }
        }
        switch(this.currentLevel){
            case 0:
                target.statusArray.push(status);
                this.currentBluntAttackBuff = Math.floor(0.2 * this.holder.baseBluntAttack);
                this.currentPierceAttackBuff = Math.floor(0.2 * this.holder.basePierceAttack);
                this.iconSrc = "./assets/media/icons/physical-attack-buff-1.png";
                this.currentLevel++
            break;
            case 1:
                this.currentBluntAttackBuff = Math.floor(0.4 * this.holder.baseBluntAttack);
                this.currentPierceAttackBuff = Math.floor(0.4 * this.holder.basePierceAttack);
                this.iconSrc = "./assets/media/icons/physical-attack-buff-2.png";
                this.currentLevel++
            break;
            case 2:
                this.currentBluntAttackBuff = Math.floor(0.6 * this.holder.baseBluntAttack);
                this.currentPierceAttackBuff = Math.floor(0.6 * this.holder.basePierceAttack);
                this.iconSrc = "./assets/media/icons/physical-attack-buff-3.png";
                this.currentLevel++
            break;
            default:
            break;
        }
        this.holder.currentBluntAttack += this.currentBluntAttackBuff;
        this.holder.currentPierceAttack += this.currentPierceAttackBuff;
        this.currentCharges++;
    }
    onRemove(){
        for(let i = 0; i < this.holder.statusArray.length; i++){
            if(this.holder.statusArray[i].name == this.name){
                this.holder.statusArray.splice(i, 1);
                break;
            }
        }
        this.holder.currentBluntAttack -= this.currentBluntAttackBuff;
        this.holder.currentPierceAttack -= this.currentPierceAttackBuff;
    }
}
export class PhysicalAttackDebuff extends StatusEffect{
    constructor(config){
        super({
            name:'physical attack debuff',
            iconSrc: "./assets/media/icons/physical-attack-debuff-1.png",
            holder: config.holder,
            maxCharges: 5,
            stackable: true,
            targetAnimation: 'none',
            abilityAnimation: 'none',
            removeOnBattleEnd: true,
        });
        this.currentLevel = config.level || 0;
        this.currentBluntAttackDebuff = 0;
        this.currentPierceAttackDebuff = 0;
    }
    onApplied(attacker, target, status){
        this.holder.currentBluntAttack += this.currentBluntAttackDebuff;
        this.holder.currentPierceAttack += this.currentPierceAttackDebuff;
        for(let i = 0; i < this.holder.statusArray.length; i++){
            if(this.holder.statusArray[i].name == 'physical attack buff'){
                this.holder.statusArray[i].currentLevel = this.holder.statusArray[i].currentLevel - 2
                if(this.holder.statusArray[i].currentLevel <= 0){
                    this.holder.statusArray[i].onRemove();
                }else{
                    this.holder.statusArray[i].onApplied(attacker, target, status);
                }
                return;
            }
        }
        switch(this.currentLevel){
            case 0:
                target.statusArray.push(status);
                this.currentBluntAttackDebuff = Math.floor(0.2 * this.holder.baseBluntAttack);
                this.currentPierceAttackDebuff = Math.floor(0.2 * this.holder.basePierceAttack);
                this.iconSrc = "./assets/media/icons/physical-attack-debuff-1.png";
                this.currentLevel++
            break;
            case 1:
                this.currentBluntAttackDebuff = Math.floor(0.4 * this.holder.baseBluntAttack);
                this.currentPierceAttackDebuff = Math.floor(0.4 * this.holder.basePierceAttack);
                this.iconSrc = "./assets/media/icons/physical-attack-debuff-2.png";
                this.currentLevel++
            break;
            case 2:
                this.currentBluntAttackDebuff = Math.floor(0.6 * this.holder.baseBluntAttack);
                this.currentPierceAttackDebuff = Math.floor(0.6 * this.holder.basePierceAttack);
                this.iconSrc = "./assets/media/icons/physical-attack-debuff-3.png";
                this.currentLevel++
            break;
            default:
            break;
        }
        this.holder.currentBluntAttack -= this.currentBluntAttackDebuff;
        this.holder.currentPierceAttack -= this.currentPierceAttackDebuff;
        this.currentCharges++;
    }
    onRemove(){
        for(let i = 0; i < this.holder.statusArray.length; i++){
            if(this.holder.statusArray[i].name == this.name){
                this.holder.statusArray.splice(i, 1);
                break;
            }
        }
        this.holder.currentBluntAttack += this.currentBluntAttackDebuff;
        this.holder.currentPierceAttack += this.currentPierceAttackDebuff;
    }
}
export class MagicalAttackBuff extends StatusEffect{
    constructor(config){
        super({
            name:'magical attack buff',
            iconSrc: "./assets/media/icons/magical-attack-buff-1.png",
            holder: config.holder,
            maxCharges: 5,
            stackable: true,
            targetAnimation: 'none',
            abilityAnimation: 'none',
            removeOnBattleEnd: true,
        });
        this.currentLevel = config.level || 0;
        this.currentArcaneAttackBuff = 0;
        this.currentElementalAttackBuff = 0;
    }
    onApplied(attacker, target, status){
        this.holder.currentArcaneAttack -= this.currentArcaneAttackBuff;
        this.holder.currentElementalAttack -= this.currentElementalAttackBuff;
        for(let i = 0; i < this.holder.statusArray.length; i++){
            if(this.holder.statusArray[i].name == 'magical attack debuff'){
                this.holder.statusArray[i].currentLevel = this.holder.statusArray[i].currentLevel - 2
                if(this.holder.statusArray[i].currentLevel <= 0){
                    this.holder.statusArray[i].onRemove();
                }else{
                    this.holder.statusArray[i].onApplied(attacker, target, status);
                }
                return;
            }
        }
        switch(this.currentLevel){
            case 0:
                target.statusArray.push(status);
                this.currentArcaneAttackBuff = Math.floor(0.2 * this.holder.baseArcaneAttack);
                this.currentElementalAttackBuff = Math.floor(0.2 * this.holder.baseElementalAttack);
                this.iconSrc = "./assets/media/icons/magical-attack-buff-1.png";
                this.currentLevel++
            break;
            case 1:
                this.currentArcaneAttackBuff = Math.floor(0.4 * this.holder.baseArcaneAttack);
                this.currentElementalAttackBuff = Math.floor(0.4 * this.holder.baseElementalAttack);
                this.iconSrc = "./assets/media/icons/magical-attack-buff-2.png";
                this.currentLevel++
            break;
            case 2:
                this.currentArcaneAttackBuff = Math.floor(0.6 * this.holder.baseArcaneAttack);
                this.currentElementalAttackBuff = Math.floor(0.6 * this.holder.baseElementalAttack);
                this.iconSrc = "./assets/media/icons/magical-attack-buff-3.png";
                this.currentLevel++
            break;
            default:
            break;
        }
        this.holder.currentArcaneAttack += this.currentArcaneAttackBuff;
        this.holder.currentElementalAttack += this.currentElementalAttackBuff;
        this.currentCharges++;
    }
    onRemove(){
        for(let i = 0; i < this.holder.statusArray.length; i++){
            if(this.holder.statusArray[i].name == this.name){
                this.holder.statusArray.splice(i, 1);
                break;
            }
        }
        this.holder.currentArcaneAttack -= this.currentArcaneAttackBuff;
        this.holder.currentElementalAttack -= this.currentElementalAttackBuff;
    }
}
export class MagicalAttackDebuff extends StatusEffect{
    constructor(config){
        super({
            name:'magical attack debuff',
            iconSrc: "./assets/media/icons/magical-attack-debuff-1.png",
            holder: config.holder,
            maxCharges: 5,
            stackable: true,
            targetAnimation: 'none',
            abilityAnimation: 'none',
            removeOnBattleEnd: true,
        });
        this.currentLevel = config.level || 0;
        this.currentArcaneAttackDebuff = 0;
        this.currentElementalAttackDebuff = 0;
    }
    onApplied(attacker, target, status){
        this.holder.currentArcaneAttack += this.currentArcaneAttackDebuff;
        this.holder.currentElementalAttack += this.currentElementalAttackDebuff;
        for(let i = 0; i < this.holder.statusArray.length; i++){
            if(this.holder.statusArray[i].name == 'magical attack buff'){
                this.holder.statusArray[i].currentLevel = this.holder.statusArray[i].currentLevel - 2
                if(this.holder.statusArray[i].currentLevel <= 0){
                    this.holder.statusArray[i].onRemove();
                }else{
                    this.holder.statusArray[i].onApplied(attacker, target, status);
                }
                return;
            }
        }
        switch(this.currentLevel){
            case 0:
                target.statusArray.push(status);
                this.currentArcaneAttackDebuff = Math.floor(0.2 * this.holder.baseArcaneAttack);
                this.currentElementalAttackDebuff = Math.floor(0.2 * this.holder.baseElementalAttack);
                this.iconSrc = "./assets/media/icons/magical-attack-debuff-1.png";
                this.currentLevel++
            break;
            case 1:
                this.currentArcaneAttackDebuff = Math.floor(0.4 * this.holder.baseArcaneAttack);
                this.currentElementalAttackDebuff = Math.floor(0.4 * this.holder.baseElementalAttack);
                this.iconSrc = "./assets/media/icons/magical-attack-debuff-2.png";
                this.currentLevel++
            break;
            case 2:
                this.currentArcaneAttackDebuff = Math.floor(0.6 * this.holder.baseArcaneAttack);
                this.currentElementalAttackDebuff = Math.floor(0.6 * this.holder.baseElementalAttack);
                this.iconSrc = "./assets/media/icons/magical-attack-debuff-3.png";
                this.currentLevel++
            break;
            default:
            break;
        }
        this.holder.currentArcaneAttack -= this.currentArcaneAttackDebuff;
        this.holder.currentElementalAttack -= this.currentElementalAttackDebuff;
        this.currentCharges++;
    }
    onRemove(){
        for(let i = 0; i < this.holder.statusArray.length; i++){
            if(this.holder.statusArray[i].name == this.name){
                this.holder.statusArray.splice(i, 1);
                break;
            }
        }
        this.holder.currentArcaneAttack += this.currentArcaneAttackDebuff;
        this.holder.currentElementalAttack += this.currentElementalAttackDebuff;
    }
}
export class PhysicalDefenseBuff extends StatusEffect{
    constructor(config){
        super({
            name:'physical defense buff',
            iconSrc: "./assets/media/icons/physical-defense-buff-1.png",
            holder: config.holder,
            maxCharges: 5,
            stackable: true,
            targetAnimation: 'none',
            abilityAnimation: 'none',
            removeOnBattleEnd: true,
        });
        this.currentLevel = config.level || 0;
        this.currentBluntDefenseBuff = 0;
        this.currentPierceDefenseBuff = 0;
    }
    onApplied(attacker, target, status){
        this.holder.currentBluntDefense -= this.currentBluntDefenseBuff;
        this.holder.currentPierceDefense -= this.currentPierceDefenseBuff;
        for(let i = 0; i < this.holder.statusArray.length; i++){
            if(this.holder.statusArray[i].name == 'physical defense debuff'){
                this.holder.statusArray[i].currentLevel = this.holder.statusArray[i].currentLevel - 2
                if(this.holder.statusArray[i].currentLevel <= 0){
                    this.holder.statusArray[i].onRemove();
                }else{
                    this.holder.statusArray[i].onApplied(attacker, target, status);
                }
                return;
            }
        }
        switch(this.currentLevel){
            case 0:
                target.statusArray.push(status);
                this.currentBluntDefenseBuff = Math.floor(0.2 * this.holder.baseBluntDefense);
                this.currentPierceDefenseBuff = Math.floor(0.2 * this.holder.basePierceDefense);
                this.iconSrc = "./assets/media/icons/physical-defense-buff-1.png";
                this.currentLevel++
            break;
            case 1:
                this.currentBluntDefenseBuff = Math.floor(0.4 * this.holder.baseBluntDefense);
                this.currentPierceDefenseBuff = Math.floor(0.4 * this.holder.basePierceDefense);
                this.iconSrc = "./assets/media/icons/physical-defense-buff-2.png";
                this.currentLevel++
            break;
            case 2:
                this.currentBluntDefenseBuff = Math.floor(0.6 * this.holder.baseBluntDefense);
                this.currentPierceDefenseBuff = Math.floor(0.6 * this.holder.basePierceDefense);
                this.iconSrc = "./assets/media/icons/physical-defense-buff-3.png";
                this.currentLevel++
            break;
            default:
            break;
        }
        this.holder.currentBluntDefense += this.currentBluntDefenseBuff;
        this.holder.currentPierceDefense += this.currentPierceDefenseBuff;
        this.currentCharges++;
    }
    onRemove(){
        for(let i = 0; i < this.holder.statusArray.length; i++){
            if(this.holder.statusArray[i].name == this.name){
                this.holder.statusArray.splice(i, 1);
                break;
            }
        }
        this.holder.currentBluntDefense -= this.currentBluntDefenseBuff;
        this.holder.currentPierceDefense -= this.currentPierceDefenseBuff;
    }
}
export class PhysicalDefenseDebuff extends StatusEffect{
    constructor(config){
        super({
            name:'physical defense debuff',
            iconSrc: "./assets/media/icons/physical-defense-debuff-1.png",
            holder: config.holder,
            maxCharges: 5,
            stackable: true,
            targetAnimation: 'none',
            abilityAnimation: 'none',
            removeOnBattleEnd: true,
        });
        this.currentLevel = config.level || 0;
        this.currentBluntDefenseDebuff = 0;
        this.currentPierceDefenseDebuff = 0;
    }
    onApplied(attacker, target, status){
        this.holder.currentBluntDefense += this.currentBluntDefenseDebuff;
        this.holder.currentPierceDefense += this.currentPierceDefenseDebuff;
        for(let i = 0; i < this.holder.statusArray.length; i++){
            if(this.holder.statusArray[i].name == 'physical defense buff'){
                this.holder.statusArray[i].currentLevel = this.holder.statusArray[i].currentLevel - 2
                if(this.holder.statusArray[i].currentLevel <= 0){
                    this.holder.statusArray[i].onRemove();
                }else{
                    this.holder.statusArray[i].onApplied(attacker, target, status);
                }
                return;
            }
        }
        switch(this.currentLevel){
            case 0:
                target.statusArray.push(status);
                this.currentBluntDefenseDebuff = Math.floor(0.2 * this.holder.baseBluntDefense);
                this.currentPierceDefenseDebuff = Math.floor(0.2 * this.holder.basePierceDefense);
                this.iconSrc = "./assets/media/icons/physical-defense-debuff-1.png";
                this.currentLevel++
            break;
            case 1:
                this.currentBluntDefenseDebuff = Math.floor(0.4 * this.holder.baseBluntDefense);
                this.currentPierceDefenseDebuff = Math.floor(0.4 * this.holder.basePierceDefense);
                this.iconSrc = "./assets/media/icons/physical-defense-debuff-2.png";
                this.currentLevel++
            break;
            case 2:
                this.currentBluntDefenseDebuff = Math.floor(0.6 * this.holder.baseBluntDefense);
                this.currentPierceDefenseDebuff = Math.floor(0.6 * this.holder.basePierceDefense);
                this.iconSrc = "./assets/media/icons/physical-defense-debuff-3.png";
                this.currentLevel++
            break;
            default:
            break;
        }
        this.holder.currentBluntDefense -= this.currentBluntDefenseDebuff;
        this.holder.currentPierceDefense -= this.currentPierceDefenseDebuff;
        this.currentCharges++;
    }
    onRemove(){
        for(let i = 0; i <= this.holder.statusArray.length; i++){
            if(this.holder.statusArray[i].name == this.name){
                this.holder.statusArray.splice(i, 1);
                break;
            }
        }
        this.holder.currentBluntDefense += this.currentBluntDefenseDebuff;
        this.holder.currentPierceDefense += this.currentPierceDefenseDebuff;
    }
}
export class EvasionBuff extends StatusEffect{
    constructor(config){
        super({
            name:'evasion buff',
            iconSrc: "./assets/media/icons/evasion-defense-buff-1.png",
            holder: config.holder,
            maxCharges: 5,
            stackable: true,
            targetAnimation: 'none',
            abilityAnimation: 'none',
            removeOnBattleEnd: true,
        });
        this.currentLevel = config.level || 0;
        this.currentEvasionBuff = config.level || 0;
    }
    onApplied(attacker, target, status){
        this.holder.currentEvasion -= this.currentEvasionBuff;
        for(let i = 0; i < this.holder.statusArray.length; i++){
            if(this.holder.statusArray[i].name == 'evasion debuff'){
                this.holder.statusArray[i].currentLevel = this.holder.statusArray[i].currentLevel - 2
                if(this.holder.statusArray[i].currentLevel <= 0){
                    this.holder.statusArray[i].onRemove();
                }else{
                    this.holder.statusArray[i].onApplied(attacker, target, status);
                }
                return;
            }
        }
        switch(this.currentLevel){
            case 0:
                target.statusArray.push(status);
                this.currentEvasionBuff = 0.2;
                this.iconSrc = "./assets/media/icons/evasion-buff-1.png";
                this.currentLevel++
            break;
            case 1:
                this.currentEvasionBuff = 0.4;
                this.iconSrc = "./assets/media/icons/evasion-buff-2.png";
                this.currentLevel++
            break;
            case 2:
                this.currentEvasionBuff = 0.6;
                this.iconSrc = "./assets/media/icons/evasion-buff-3.png";
                this.currentLevel++
            break;
            default:
            break;
        }
        this.holder.currentEvasion += this.currentEvasionBuff;
        this.currentCharges++;
    }
    onRemove(){
        for(let i = 0; i < this.holder.statusArray.length; i++){
            if(this.holder.statusArray[i].name == this.name){
                this.holder.statusArray.splice(i, 1);
                break;
            }
        }
        this.holder.currentEvasion -= this.currentEvasionBuff;
    }
}