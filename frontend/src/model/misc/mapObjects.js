export class MapObject {
    constructor(config) {
        this.name = config.name;
        this.imageCoordinates = config.imageCoordinates || [0,0];
        this.imageFrameSize = config.imageFrameSize || [1, 1];
        this.traversable = config.traversable || false;
        this.drawOverHero = config.drawOverHero || false;
    }
    toSaveObject() {
        return {
            name: this.name,
            imageCoordinates: this.imageCoordinates,
            imageFrameSize: this.imageFrameSize,
            traversable: this.traversable,
            drawOverHero: this.drawOverHero,
        };
    }
    static fromSaveObject(mapObjectData, mapObjectRegistry){
        return mapObjectRegistry[mapObjectData.name](mapObjectData)
    }
}

export class Wall extends MapObject {
    constructor(config){
        super({
            name: config.name || 'wall',
            imageCoordinates: config.imageCoordinates || [0, 0],
            traversable: config.traversable || false,
            drawOverHero: false,
        });
    }
}

export class Entrance extends MapObject {
    constructor(config){
        super({
            name: config.name || 'entrance',
            imageCoordinates: config.imageCoordinates || [0, 7],
            imageFrameSize: config.imageFrameSize,
            traversable: config.traversable || true,
            drawOverHero: false,
        });
    }
}

export class Exit extends MapObject {
    constructor(config){
        super({
            name: config.name || 'exit',
            imageCoordinates: config.imageCoordinates || [0, 7],
            imageFrameSize: config.imageFrameSize,
            traversable: config.traversable || true,
            drawOverHero: false,
        });
    }
}

export class Boulder extends MapObject {
    constructor(config){
        super({
            name: config.name || 'boulder',
            imageCoordinates: config.imageCoordinates || [0, 0],
            traversable: config.traversable || false,
            drawOverHero: false,
        });
    }
}

export class PineTree extends MapObject {
    constructor(config){
        super({
            name: config.name || 'pine tree',
            imageCoordinates: config.imageCoordinates || [0, 2],
            imageFrameSize: [1, 2],
            traversable: config.traversable || false,
            drawOverHero: true, // tall tree drawn over player
        });
    }
}

export class BerryBush extends MapObject {
    constructor(config){
        super({
            name: config.name || 'berry bush',
            imageCoordinates: config.imageCoordinates || [1, 1],
            traversable: config.traversable || false,
            drawOverHero: false,
        });
    }
}

export class DeadTree extends MapObject {
    constructor(config){
        super({
            name: config.name || 'dead tree',
            imageCoordinates: config.imageCoordinates || [7, 0],
            imageFrameSize: [1, 2],
            traversable: config.traversable || false,
            drawOverHero: true, // tall dead tree drawn over player
        });
    }
}

export class DeadBush extends MapObject {
    constructor(config){
        super({
            name: config.name || 'dead bush',
            imageCoordinates: config.imageCoordinates || [1, 0],
            traversable: config.traversable || false,
            drawOverHero: false,
        });
    }
}

export class CastleTower extends MapObject {
    constructor(){
        super({
            name: 'castle tower',
            imageCoordinates: [0, 4],
            imageFrameSize: [3, 3],
            drawOverHero: true, // tall tower drawn over player
        });
    }
}