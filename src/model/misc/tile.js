export default class Tile{
    constructor(type){
        this.position = [0,0];
        this.type = type;
        this.status = 'notVisited';
        this.battle = '';
        this.encounter = '';
        this.imageCoordinates = [0, 0];
        this.imageFrameSize = [1, 1];
    }
}