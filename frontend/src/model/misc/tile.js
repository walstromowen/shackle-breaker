import Battle from "./battle.js";
import Encounter from "./encounter.js";
import { MapObject } from "./mapObjects.js";
import { mapObjectRegistry } from "./registries/mapObjectRegisrty.js";

export default class Tile{
    constructor(config){
        this.position = config.position || [0,0];
        this.type = config.type || '';
        this.status = config.status || 'notVisited';
        this.battle = config.battle || '';
        this.encounter = config.encounter || '';
        this.tileImageCoordinates = config.tileImageCoordinates || [0, 0];
        this.mapObject = config.mapObject || '';
        this.priority = config.priority || 0;
    }
    toSaveObject() {
        return {
            position: this.position,
            type: this.type,
            status: this.status,
            battle: this.battle ? this.battle.toSaveObject() : '',
            encounter: this.encounter ? this.encounter.toSaveObject() : '',
            tileImageCoordinates: this.tileImageCoordinates,
            mapObject: this.mapObject ? this.mapObject.toSaveObject() : '',
            priority: this.priority,
        };
    } 
    static fromSaveObject(tileData){
        let battle = tileData.battle ? Battle.fromSaveObject(tileData.battle) : '';
        let encounter = tileData.encounter ? Encounter.fromSaveObject(tileData.encounter) : '';
        let mapObject = tileData.mapObject ? MapObject.fromSaveObject(tileData.mapObject, mapObjectRegistry) : ''
        let tileConfig = {
            ...tileData,
            battle: battle,
            encounter: encounter,
            mapObject: mapObject,
        };
        return new Tile(tileConfig);

    }
}