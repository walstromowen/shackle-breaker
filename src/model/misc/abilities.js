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
            soundEffectSrc: "./assets/audio/soundEffects/magic-missile-made-with-Voicemod-technology.mp3",
            animationName: 'swipe-right',
        })
    }
    activate(attacker, target){
        let damage = this.checkDamage(attacker, target, 10);
        target.currentHP = target.currentHP - damage;
        this.updateMessage(`${attacker.name} throws a posioned knife at ${target.name} for ${damage}.`);
        this.inflictStatus(new Poison(target), target);
    }
}