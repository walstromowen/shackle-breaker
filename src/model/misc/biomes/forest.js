import Biome from "./biome.js";

import Tile from "../tile.js";

import { MadBandit, MadMage, Madman, Wolf } from "../entities.js";

import { MadmanAhead} from "../encounters/madmanAhead.js";
import {WanderingMercenary} from "../encounters/wanderingMercenary.js";
import { TreasureChest } from "../encounters/treasureChest.js";
import { Bonfire } from "../encounters/bonfire.js";
import { Aftermath } from "../encounters/aftermath.js";
import { SilentGrove } from "../encounters/silentGrove.js";
import { BerryBush, Boulder, CastleTower, Entrance, Exit, PineTree, Wall } from "../mapObjects.js";



export class Forest extends Biome{
    constructor(config){
        super({
            name: config.name || 'forest',
            layoutWidth: config.layoutWidth || 64,
            layoutHeight: config.layoutHeight || 64,
            terrainSrc: './assets/media/terrain/forest.png',
            backgroundMusicSrc: "./assets/audio/musicTracks/deep-in-the-dell-126916.mp3",
            battleMusicSrc: "./assets/audio/musicTracks/battle-of-the-dragons-8037.mp3",
            possibleHostiles: [
                {entity: (partyLevel, difficulty)=>{return new Madman({level: partyLevel, difficulty: difficulty})}, weight: 2},
                {entity: (partyLevel, difficulty)=>{return new MadMage({level: partyLevel, difficulty: difficulty})}, weight: 1},
                {entity: (partyLevel, difficulty)=>{return new MadBandit({level: partyLevel, difficulty: difficulty})}, weight: 1},
                {entity: (partyLevel, difficulty)=>{return new Wolf({level: partyLevel, difficulty: difficulty})}, weight: 1},
                
            ],
            possibleEncounters: [
                {startingStage: ()=>{return {name: 'Wandering Mercenary'}}, resetOnLeave: false, weight: 1},
                {startingStage: ()=>{return {name: 'Aftermath'}}, resetOnLeave: false, weight: 1},
                {startingStage: ()=>{return new TreasureChest({})}, resetOnLeave: false, weight: 1},
                {startingStage: ()=>{return new MadmanAhead({})}, resetOnLeave: false, weight: 1},
                {startingStage: ()=>{return new Bonfire({})}, resetOnLeave: false, weight: 1},
                {startingStage: ()=>{return new SilentGrove({})}, resetOnLeave: false, weight: 1},
            ],
        });
    }
  generateLayout(layout){ 
        let tileSet = this.createEmptyTileSet();
       

        this.createTileSetBorder(tileSet)
        this.createRoom1(tileSet, new Tile({priority: 3, mapObject: new Entrance({imageCoordinates: [1, 2],})}))
        this.createRoom1(tileSet, new Tile({priority: 3, mapObject: new Exit({imageCoordinates: [1, 2],})}))
        for(let i = 0; i < Math.floor(tileSet.length/2); i++){
            this.createTreePatch1(tileSet)
        }
       
        this.connectWalls(tileSet)
    return tileSet;
}
    createTileSetBorder(tileSet){
        for(let y = 0; y < this.layoutHeight; y++){
            for(let x = 0; x < this.layoutWidth; x++){
                if(y <= 2 || x <= 2 || x >= (this.layoutWidth-3) || y >= (this.layoutHeight - 3)){
                    if(((y == 2 || y == this.layoutHeight - 3) && x > 1 && x < (this.layoutWidth-2)) || ((x == 2 || x == this.layoutWidth-3) && y > 1 && y < (this.layoutHeight - 2))){
                        let chance = Math.floor(Math.random()*6);
                        if(chance <= 2)  tileSet[y][x].mapObject = new PineTree({})
                    }else tileSet[y][x].mapObject = new PineTree({})
                }
            }
        }
    }



    //structureRules
    createRoom1(tileSet, tile){
        let structureMap = []
        let width = 9 + Math.floor(Math.random()*3)
        let height = 9 + Math.floor(Math.random()*3)
        for(let y = 0; y < height; y++){
            let row = []
            for(let x = 0; x < width; x++){
                if(y < 3 || x < 3 || x >= width-3 || y >= height - 3){
                    if(y == 0 || x == 0 || x == width-1 || y == height-1) row.push(new Tile({priority: 2,}))
                    else row.push(new Tile({priority: 1,mapObject: new PineTree({})}))
                }else{
                    row.push(new Tile({priority: 2, }))
                }
            }
            structureMap.push(row);
        }
        
       
        let chance = Math.floor(Math.random()*3)
        if(chance == 0){
            structureMap[height-3][Math.floor(width/2)] = new Tile({priority: 2,})
            structureMap[height-2][Math.floor(width/2)] = new Tile({priority: 2,})
        }
        if(chance == 1){
            structureMap[Math.floor(height/2)][2] = new Tile({priority: 2,})
            structureMap[Math.floor(height/2)][1] = new Tile({priority: 2,})
        }
        if(chance == 2){
            structureMap[Math.floor(height/2)][width-3] = new Tile({priority: 2,})
            structureMap[Math.floor(height/2)][width-2] = new Tile({priority: 2,})
        }
        structureMap[2][Math.floor(width/2)] =tile
        this.placeStructure(tileSet, structureMap, ['entrance', 'exit'], true)       
                  
    }
    createTreePatch1(tileSet){
        let structureMap = []
        let width = 7 + Math.floor(Math.random()*2)
        let height = 7 + Math.floor(Math.random()*2)
        for(let y = 0; y < height; y++){
            let row = []
            for(let x = 0; x < width; x++){
                let chance = Math.floor(Math.random()*10);
                if(chance > 5) row.push(new Tile({}))
                if(chance == 5) row.push(new Tile({tileImageCoordinates: [1,0]}))
                if(chance == 4) row.push(new Tile({priority: 1, mapObject: new BerryBush({imageCoordinates: [1, 1]})}))
                if(chance == 3) row.push(new Tile({priority: 1, mapObject: new Boulder({imageCoordinates: [0, 1]})}))//imageCoordinates subject to change once tile map diesgn is finished
                if(chance < 3)row.push(new Tile({priority: 1, mapObject: new PineTree({})}))
              
            }
            structureMap.push(row);
        }
        this.placeStructure(tileSet, structureMap, ['entrance', 'exit'])    
    }
    createPond(tileSet){
        let structureMap = []
        let width = 2 + Math.floor(Math.random()*4)
        let height = 2 + Math.floor(Math.random()*4)
        for(let y = 0; y < height; y++){
            let row = []
            for(let x = 0; x < width; x++){
                if(y == 0 && x == 0){
                    row.push(new Tile({type: 'water', tileImageCoordinates: [3, 0], position: [x, y]}))
                    continue;
                }
                if(y == 0 && x == width - 1){
                    row.push(new Tile({type: 'water', tileImageCoordinates: [5, 0], position: [x, y]}))
                    continue;
                }   
                if(y == height-1 && x == 0){
                    row.push(new Tile({type: 'water', tileImageCoordinates: [3, 2], position: [x, y]}))
                    continue;
                }   
                if(y == height-1 && x == width - 1){
                    row.push(new Tile({type: 'water', tileImageCoordinates: [5, 2], position: [x, y]}))
                    continue;
                }   
                if(y == 0){
                    row.push(new Tile({type: 'water', tileImageCoordinates: [4, 0], position: [x, y]}))
                    continue;
                }   
                if(x == 0){
                    row.push(new Tile({type: 'water', tileImageCoordinates: [3, 1], position: [x, y]}))
                    continue;
                }   
                if(y == height-1){
                    row.push(new Tile({type: 'water', tileImageCoordinates: [4, 2], position: [x, y]}))
                    continue;
                }   
                if(x == width - 1){
                    row.push(new Tile({type: 'water', tileImageCoordinates: [5, 1], position: [x, y]}))
                    continue;
                }

                let chance = Math.floor(Math.random()*5);
                if(chance == 0) row.push(new Tile({type: 'wall', mapObject: new Boulder(), tileImageCoordinates: [4, 1]}))
                if(chance >= 1) row.push(new Tile({type: 'wall', tileImageCoordinates: [4, 1]}))
            }
            structureMap.push(row);
        }
        this.createStructure(tileSet, structureMap, ['entrance', 'exit', 'water'])
    }
    createEntranceGrove(tileSet){
        this.createStructure(
            tileSet,
            [
                [new Tile({type: 'wall', mapObject: new PineTree(), }), new Tile({type: 'wall', mapObject: new PineTree(), }),new Tile({type: 'open', }),new Tile({type: 'wall', mapObject: new PineTree(), }),new Tile({type: 'wall', mapObject: new PineTree(), })],
                [new Tile({type: 'wall', mapObject: new PineTree(), }), new Tile({type: 'open', }), new Tile({type: 'open', }), new Tile({type: 'open', }), new Tile({type: 'wall', mapObject: new PineTree(), })],
                [new Tile({type: 'open', }), new Tile({type: 'open', }), new Tile({type: 'entrance', }), new Tile({type: 'open', }), new Tile({type: 'open', })],
                [new Tile({type: 'wall', mapObject: new PineTree(), }), new Tile({type: 'open', }), new Tile({type: 'open', }), new Tile({type: 'open', }), new Tile({type: 'wall', mapObject: new PineTree(), })],
                [new Tile({type: 'wall', mapObject: new PineTree(), }), new Tile({type: 'wall', mapObject: new PineTree(), }),new Tile({type: 'open', }),new Tile({type: 'wall', mapObject: new PineTree(), }),new Tile({type: 'wall', mapObject: new PineTree(), })],
            ],
            ['entrance', 'exit', 'water']
        )
    }
    createExitGrove(tileSet){
        this.createStructure(
            tileSet,
            [
                [new Tile({type: 'open', }), new Tile({type: 'wall', }), new Tile({type: 'wall', }), new Tile({type: 'wall', }), new Tile({type: 'open', })],
                [new Tile({type: 'open', }), new Tile({type: 'wall', }), new Tile({type: 'wall', }), new Tile({type: 'wall', }), new Tile({type: 'open', })],
                [new Tile({type: 'open', }), new Tile({type: 'open', mapObject: new CastleTower({})}), new Tile({type: 'exit', }), new Tile({type: 'open', }), new Tile({type: 'open', })],
                [new Tile({type: 'open', }), new Tile({type: 'open', }), new Tile({type: 'open', }), new Tile({type: 'open', }), new Tile({type: 'wall', mapObject: new PineTree(), })],
                [new Tile({type: 'open', }), new Tile({type: 'open', }),new Tile({type: 'open', }),new Tile({type: 'open', }),new Tile({type: 'wall', mapObject: new PineTree(), })],
                
                /*
                [new Tile({type: 'open', }), new Tile({type: 'wall', tileImageCoordinates: [0,4]}), new Tile({type: 'wall', tileImageCoordinates: [1,4]}), new Tile({type: 'wall', tileImageCoordinates: [2,4]}), new Tile({type: 'open', })],
                [new Tile({type: 'open', }), new Tile({type: 'wall', tileImageCoordinates: [0,5]}), new Tile({type: 'wall', tileImageCoordinates: [1,5]}), new Tile({type: 'wall', tileImageCoordinates: [2,5]}), new Tile({type: 'open', })],
                [new Tile({type: 'open', }), new Tile({type: 'open', tileImageCoordinates: [0,6]}), new Tile({type: 'exit', tileImageCoordinates: [1,6]}), new Tile({type: 'open', tileImageCoordinates: [2,6]}), new Tile({type: 'open', })],
                [new Tile({type: 'open', }), new Tile({type: 'open', }), new Tile({type: 'open', }), new Tile({type: 'open', }), new Tile({type: 'wall', mapObject: new PineTree(), })],
                [new Tile({type: 'open', }), new Tile({type: 'open', }),new Tile({type: 'open', }),new Tile({type: 'open', }),new Tile({type: 'wall', mapObject: new PineTree(), })],
                */
            ],
            ['entrance', 'exit', 'water']
        )
    }
    createRandomExitPath(tileSet){

    }
       
}


/*
return [
    ['wallMedium', 'wallMedium', 'wallMedium', 'wallMedium', 'wallMedium', 'wallMedium', 'wallMedium'],
    ['wallMedium', 'open', 'open', 'open', 'open', 'open', 'wallMedium'],
    ['wallMedium', 'open', 'entrance', 'open', 'open', 'wallShort', 'wallMedium'],
    ['wallMedium', 'open', 'waterTopLeft', 'waterTop', 'waterTopRight', 'open', 'wallMedium'],
    ['wallMedium', 'open', 'waterLeft', 'waterCenter', 'waterRight', 'open', 'wallMedium'],
    ['wallMedium', 'wallShort', 'waterBottomLeft', 'waterBottom', 'waterBottomRight', 'exit', 'wallMedium'],
    ['wallShort', 'wallMedium', 'wallShort', 'wallShort', 'wallMedium', 'wallShort', 'wallMedium']
];

*/