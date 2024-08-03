

export default class Battle{
    constructor(hostiles){
        this.hostiles = hostiles;
        this.weather = 'clear';
        this.battlefield = '';
        this.loot = [];
        this.maxAllyCount;
        this.maxHostileCount;
        this.currentAllyLimit;
        this.currentHostileLimit;
        this.initialize();
    }
    initialize(){
        this.setMaxCombatantCount();
    }
    setMaxCombatantCount(){
        let count = Math.ceil(Math.random()*3)
        this.maxAllyCount = count;
        this.maxHostileCount = count;
        this.resetCurrentCombatantLimit();
    }
    resetCurrentCombatantLimit(){
        this.currentAllyLimit = this.maxAllyCount;
        this.currentHostileLimit = this.maxHostileCount;
    }
}