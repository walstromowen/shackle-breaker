

export default class Battle{
    constructor(config){
        this.hostiles = config.hostiles;
        this.weather = config.weather || 'clear';
        this.loot = config.loot || [];
        this.gold = config.gold || 0;
        this.maxAllyCount = config.maxAllyCount || 3;
        this.maxHostileCount = config.maxHostileCount || 3;
        this.currentAllyLimit = this.maxAllyCount;
        this.currentHostileLimit = this.maxHostileCount;
    }
    resetCurrentCombatantLimit(){
        this.currentAllyLimit = this.maxAllyCount;
        this.currentHostileLimit = this.maxHostileCount;
    }
}