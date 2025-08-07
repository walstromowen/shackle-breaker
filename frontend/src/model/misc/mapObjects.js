export class MapObject{
    constructor(config){
        this.name = config.name;
        this.imageCoordinates = config.imageCoordinates || [0,0]; //maybe make an invisible square by default?
        this.imageFrameSize = config.imageFrameSize || [1, 1];
        this.traversable = config.traversable || false;
    }
    toSaveObject() {
        return {
            name: this.name,
            imageCoordinates: this.imageCoordinates,
            imageFrameSize: this.imageFrameSize,
            traversable: this.traversable,
        };
    }
    static fromSaveObject(mapObjectData, mapObjectRegisrty){
        return mapObjectRegisrty[mapObjectData.name](mapObjectData)
    }
}
export class Wall extends MapObject{
    constructor(config){
        super(
            {
                name: config.name ||'wall',
                imageCoordinates: config.imageCoordinates || [0, 0],
                traversable: config.traversable || false,
            }
        );
    }
}
export class Entrance extends MapObject{
    constructor(config){
        super(
            {
                name: config.name ||'entrance',
                imageCoordinates: config.imageCoordinates || [0, 7],
                imageFrameSize: config.imageFrameSize,
                traversable: config.traversable || true,
            }
        );
    }
}
export class Exit extends MapObject{
    constructor(config){
        super(
            {
                name: config.name ||'exit',
                imageCoordinates: config.imageCoordinates || [0, 7],
                imageFrameSize: config.imageFrameSize,
                traversable: config.traversable || true,
            }
        );
    }
}
export class Boulder extends MapObject{
    constructor(config){
        super(
            {
                name: config.name ||'boulder',
                imageCoordinates: config.imageCoordinates || [0, 0],
                traversable: config.traversable || false,
            }
        );
    }
}
export class PineTree extends MapObject{
    constructor(config){
        super(
            {
                name: config.name || 'pine tree',
                imageCoordinates: config.imageCoordinates || [0, 2],
                traversable: config.traversable || false,
                imageFrameSize: [1, 2],
                
            }
        );
    }
}
export class BerryBush extends MapObject{
    constructor(config){
        super(
            {
                name: config.name || 'berry bush',
                imageCoordinates: config.imageCoordinates || [1, 1],
                traversable: config.traversable || false,
            }
        );
    }
}
export class DeadTree extends MapObject{
    constructor(config){
        super(
            {
                name: config.name || 'dead tree',
                imageCoordinates: config.imageCoordinates || [7, 0],
                traversable: config.traversable || false,
                imageFrameSize: [1, 2],
                
            }
        );
    }
}
export class DeadBush extends MapObject{
    constructor(config){
        super(
            {
                name: config.name || 'dead bush',
                imageCoordinates: config.imageCoordinates || [0, 2],
                traversable: config.traversable || false,
            }
        );
    }
}
export class CastleTower extends MapObject{
    constructor(){
        super(
            {
                name: 'castle tower',
                imageCoordinates: [0, 4],
                imageFrameSize: [3, 3],
            }
        );
    }
}
