import { Poison, Burn} from "./statusEffects.js";

export class Ability{
    constructor(config){
        this.name = config.name;
        this.iconSrc = config.iconSrc;
        this.background = config.background;
        this.targetCount = config.targetCount || 1;
        this.speedModifier = config.speedModifier || 1
        this.soundEffectSrc = config.soundEffectSrc;
        this.animationName = config.animationName || 'top-down',
        this.animationDuration = config.animationDuration || 2000;
        this.sequenceType = config.sequenceType || 'chain',
        this.message;
    }
    checkDamage(attacker, target, damage){
        if(target.currentHP - damage < 0){
            damage = target.currentHP;
        }
        return damage;
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
        switch(this.sequenceType){
            case 'chain':
                this.activate(attacker, targets[0]);
                break;
            case 'splash':
                this.updateMessage(attacker);
                for(let i = 0; i < targets.length; i++){
                    this.activate(attacker, targets[i])
                }
                break;
        }
    }
}

export class Slash extends Ability{
    constructor(config){
        super({
            name: 'slash',
            iconSrc: './assets/media/icons/quick-slash.png',
            background: 'grey',
            speedModifier: 1,
            soundEffectSrc: "./assets/audio/soundEffects/mixkit-metal-hit-woosh-1485.wav",
            animationName: 'swipe-right',
        })
    }
    activate(attacker, target){
        attacker.currentStamina -= 10;
        let damage = this.checkDamage(attacker, target, 30);
        target.currentHP = target.currentHP - damage;
        this.updateMessage(`${attacker.name} slashes ${target.name}.`);
    }
}
export class Strike extends Ability{
    constructor(config){
        super({
            name: 'strike',
            iconSrc: './assets/media/icons/hammer-drop.png',
            background: 'grey',
            speedModifier: 1,
            soundEffectSrc: "./assets/audio/soundEffects/mixkit-metallic-sword-strike-2160.wav",
            animationName: 'swipe-down',
        })
    }
    activate(attacker, target){
        attacker.currentStamina -= 10;
        let damage = this.checkDamage(attacker, target, 30);
        target.currentHP = target.currentHP - damage;
        this.updateMessage(`${attacker.name} strikes ${target.name}.`);
    }
    
}
export class Cleave extends Ability{
    constructor(config){
        super({
            name: 'cleave',
            iconSrc: './assets/media/icons/serrated-slash.png',
            background: 'grey',
            targetCount: 2,
            speedModifier: 1,
            soundEffectSrc: "./assets/audio/soundEffects/mixkit-metal-hit-woosh-1485.wav",
            animationName: 'swipe-right',
            sequenceType: 'splash'
        })
    }
    activate(attacker, target){
        attacker.currentStamina -= 10;
        let damage = this.checkDamage(attacker, target, 15);
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
            background: 'blue',
            targetCount: 3,
            speedModifier: 0.75,
            soundEffectSrc: "./assets/audio/soundEffects/magic-missile-made-with-Voicemod-technology.mp3",
            animationName: 'swipe-right',
        })
    }
    activate(attacker, target){
        attacker.currentMagic -= 10;
        let damage = this.checkDamage(attacker, target, 10);
        target.currentHP = target.currentHP - damage;
        this.updateMessage(`${attacker.name} fires a magic missle at ${target.name}.`);
    }
}
export class ThrowPosionKnife extends Ability{
    constructor(config){
        super({
            name: 'throwPosionKnife',
            iconSrc: './assets/media/icons/flying-dagger.png',
            background: 'grey',
            targetCount: 1,
            speedModifier: 1.25,
            soundEffectSrc: "./assets/audio/soundEffects/arrow-body-impact-146419.mp3",
            animationName: 'swipe-right',
        })
    }
    activate(attacker, target){
        attacker.currentStamina -= 10;
        let damage = this.checkDamage(attacker, target, 5);
        target.currentHP = target.currentHP - damage;
        this.updateMessage(`${attacker.name} throws a posioned knife at ${target.name}.`);
        this.inflictStatus(new Poison({holder: target}), target);
    }
}
















/*
export class Ability{
    constructor(config){
        this.name = config.name;
        this.iconSrc = config.iconSrc;
        this.background = config.background;
        this.targetCount = config.targetCount || 1;
        this.speedModifier = config.speedModifier || 1
        this.soundEffectSrc = config.soundEffectSrc;
        this.animationName = config.animationName || 'top-down',
        this.animationDuration = config.animationDuration || 2000;
        this.message;
    }
    checkDamage(attacker, target, damage){
        if(target.currentHP - damage < 0){
            damage = target.currentHP;
        }
        return damage;
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
}

export class Slash extends Ability{
    constructor(config){
        super({
            name: 'slash',
            iconSrc: './assets/media/icons/quick-slash.png',
            background: 'grey',
            speedModifier: 1,
            soundEffectSrc: "./assets/audio/soundEffects/mixkit-metal-hit-woosh-1485.wav",
            animationName: 'swipe-right',
        })
    }
    activate(attacker, target){
        let damage = this.checkDamage(attacker, target, 50);
        target.currentHP = target.currentHP - damage;
        this.updateMessage(`${attacker.name} slashes ${target.name} for ${damage}.`);
    }
}

export class Strike extends Ability{
    constructor(config){
        super({
            name: 'strike',
            iconSrc: './assets/media/icons/hammer-drop.png',
            background: 'grey',
            speedModifier: 1,
            soundEffectSrc: "./assets/audio/soundEffects/mixkit-metallic-sword-strike-2160.wav",
            animationName: 'swipe-down',
        })
    }
    activate(attacker, target){
        let damage = this.checkDamage(attacker, target, 50);
        target.currentHP = target.currentHP - damage;
        this.updateMessage(`${attacker.name} strikes ${target.name} for ${damage}.`);
    }
    
}

export class MagicMissile extends Ability{
    constructor(config){
        super({
            name: 'magic missle',
            iconSrc: './assets/media/icons/frayed-arrow.png',
            background: 'blue',
            targetCount: 3,
            speedModifier: 0.75,
            soundEffectSrc: "./assets/audio/soundEffects/magic-missile-made-with-Voicemod-technology.mp3",
            animationName: 'swipe-right',
        })
    }
    activate(attacker, target){
        let damage = this.checkDamage(attacker, target, 30);
        target.currentHP = target.currentHP - damage;
        this.updateMessage(`${attacker.name} fires a magic missle at ${target.name} for ${damage}.`);
    }
}
export class ThrowPosionKnife extends Ability{
    constructor(config){
        super({
            name: 'throwPosionKnife',
            iconSrc: './assets/media/icons/flying-dagger.png',
            background: 'grey',
            targetCount: 1,
            speedModifier: 1.25,
            soundEffectSrc: "./assets/audio/soundEffects/arrow-body-impact-146419.mp3",
            animationName: 'swipe-right',
        })
    }
    activate(attacker, target){
        let damage = this.checkDamage(attacker, target, 10);
        target.currentHP = target.currentHP - damage;
        this.updateMessage(`${attacker.name} throws a posioned knife at ${target.name} for ${damage}.`);
        this.inflictStatus(new Poison({holder: target}), target);
    }
}
*/