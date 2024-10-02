class StatusEffect{
    constructor(config){
        this.name = config.name;
        this.iconSrc = config.iconSrc;
        this.holder = config.holder;
        this.maxCharges = config.maxCharges;
        this.currentCharges = this.maxCharges;
        this.activate = this.activate.bind(this);
        this.soundEffectSrc = config.soundEffectSrc || "./assets/audio/soundEffects/power-down-45784.mp3",
        this.message = '';

        this.attackerAnimation = config.attackerAnimation || null;
        this.targetAnimation = config.targetAnimation || 'none';
        this.abilityAnimation = config.abilityAnimation || 'explode';
        this.abilityAnimationImage = config.abilityAnimationImage || this.iconSrc;
        this.abilityAnimationDuration = config.abilityAnimationDuration || 2000;



    }
    activate(turnPhase){
        if(this.holder.currentHP <= 0){
            return this.skipStatusCycle();
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
        return new Promise((resolve)=>{
            this.maxCharges = this.maxCharges - 1;
            fn();
            resolve(resolveObject);
        });
    }
    skipStatusCycle(){
        return new Promise((resolve)=>{
            resolve({
                text: false,
                animation: false,
                vitalsUpdate: false,
            });
        })
    }
    onStartTurn(){
        return this.skipStatusCycle();
    }
    onEndTurn(){
        return this.skipStatusCycle();
    }
    onRemove(){
        return this.skipStatusCycle();
    }
    onRecieveDamage(){
        return this.skipStatusCycle();
    }
    onDeliverDamage(){
        return this.skipStatusCycle();
    }
    onAttemptAttack(){
        return this.skipStatusCycle();
    }
    onOpponentAttemptAttack(){
        return this.skipStatusCycle();
    }
    onApplied(){
        return this.skipStatusCycle();
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
                this.message = (`${this.holder.name} takes ${damage} damage from poison.`);
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
        this.severityMofifier = 0.08;
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
                this.severityMofifier += 0.02;
                
            }, 
            {
                text: true,
                animation: true,
                vitalsUpdate: true,
            }
        );
    }

}