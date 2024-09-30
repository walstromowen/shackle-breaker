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
    checkDamage(damage){
        if(this.holder.currentHP - damage < 0){
            damage = this.holder.currentHP;
        }
        return damage;
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
            maxCharges: 6,
            iconSrc: "./assets/media/icons/bubbles.png",
            soundEffectSrc: "./assets/audio/soundEffects/power-down-45784.mp3",
        });
    }
    onEndTurn(){
        return this.activateHelpper(
            ()=>{
                let damage = this.checkDamage(5);
                this.holder.currentHP = this.holder.currentHP - damage;
                this.message = (`${this.holder.name} takes ${damage} damage from poison`);
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
            iconSrc: "./assets/media/icons/flame.png",
            holder: config.holder,
            maxCharges: 3,
            soundEffectSrc: "./assets/audio/soundEffects/short-fireball-woosh-6146.mp3",
        });
    }
    onEndTurn(){
        return this.activateHelpper(
            ()=>{
                let damage = this.checkDamage(5);
                this.holder.currentHP = this.holder.currentHP - damage;
                this.message = `${this.holder.name} takes ${damage} damage from burns`;
            }, 
            {
                text: true,
                animation: true,
                vitalsUpdate: true,
            }
        );
    }

}