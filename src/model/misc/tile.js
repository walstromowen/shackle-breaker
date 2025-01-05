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
}