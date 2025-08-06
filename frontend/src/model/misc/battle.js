import { Entity } from "./entities.js";
import { Item } from "./items.js";
import { entityRegistry } from "./registries/entityRegistry.js";
import { itemRegistry } from "./registries/itemRegistry.js";

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
        this.battleMusicSrc = config.battleMusicSrc;
        this.canRetreat;
        if(config.canRetreat) this.canRetreat = true;
        else this.canRetreat = false;
    }
    resetCurrentCombatantLimit(){
        this.currentAllyLimit = this.maxAllyCount;
        this.currentHostileLimit = this.maxHostileCount;
    }
    toSaveObject(){
        return {
            hostiles: this.hostiles.map(hostile => hostile.toSaveObject()),
            weather: this.weather,
            loot: this.loot.map(item => item.toSaveObject()),
            gold: this.gold,
            maxAllyCount: this.maxAllyCount,
            maxHostileCount: this.maxHostileCount,
            currentAllyLimit: this.currentAllyLimit,
            currentHostileLimit: this.currentHostileLimit,
            battleMusicSrc: this.battleMusicSrc,
            canRetreat: this.canRetreat
        };
    }

    static fromSaveObject(battleData) {
        return new Battle({
            hostiles: battleData.hostiles.map(entityData => Entity.fromSaveObject(entityData, entityRegistry)), 
            weather: battleData.weather,
            loot: battleData.loot.map(itemData => Item.fromSaveObject(itemData, itemRegistry)),
            gold: battleData.gold,
            maxAllyCount: battleData.maxAllyCount,
            maxHostileCount: battleData.maxHostileCount,
            battleMusicSrc: battleData.battleMusicSrc,
            canRetreat: battleData.canRetreat
        });
    }
}