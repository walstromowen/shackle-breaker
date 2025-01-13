import Tile from "./tile.js";
import { BerryBush, Boulder, Entrance, Exit, PineTree, Wall } from "./mapObjects.js";
 
 export default class Structure{
    constructor(){
        this.connectionPosition = [0,0];
        this.connectionDirection = '';
        this.structureMap = this.generateStructureMap();
    }
    generateStructureMap(){//generic
        let structureMap = []
        let width = 5 + Math.floor(Math.random()*5)
        let height = 5 + Math.floor(Math.random()*5)
        for(let y = 0; y < height; y++){
            let row = []
            for(let x = 0; x < width; x++){
                if(y == 0 || x == 0 || x == width-1 || y == height-1) row.push(new Tile({priority: 1, mapObject: new Wall({})}))
                else row.push(new Tile({priority: 2,}))
            }
            structureMap.push(row);
        }
        //this.generateNewConnectionPoint(structureMap)
        return structureMap;
    }
    placeStructure(tileSet, desiredX, desiredY){
        for(let y = 0; y < this.structureMap.length; y++){
            for(let x = 0; x < this.structureMap[y].length; x++){
                this.structureMap[y][x].position = [desiredX + x, desiredY + y]
                if(tileSet[desiredY + y][desiredX + x].priority < this.structureMap[y][x].priority){
                    tileSet[desiredY + y][desiredX + x] = this.structureMap[y][x]
                }
            }
        }
    }
    generateNewConnectionPoint(){
        let chance = Math.floor(Math.random()*4)
        if(chance == 0){
            this.connectionPosition = this.structureMap[0][Math.floor(this.structureMap[0].length/2)].position
            this.connectionDirection = 'north';
        }
        if(chance == 1){
            this.connectionPosition = this.structureMap[this.structureMap.length-1][Math.floor(this.structureMap[0].length/2)].position
            this.connectionDirection = 'south';
        }
        if(chance == 2){
            this.connectionPosition = this.structureMap[Math.floor(this.structureMap.length/2)][0].position
            this.connectionDirection = 'west';
        }
        if(chance == 3){
            this.connectionPosition = this.structureMap[Math.floor(this.structureMap.length/2)][this.structureMap[0].length-1].position
            this.connectionDirection = 'east';
        }
        //console.log(this.connectionDirection)
        //console.log(this.connectionPosition)
    }
 } 
 export class ForestEntranceRoom extends Structure{
    generateStructureMap(){
        let structureMap = []
        let width = 9 + Math.floor(Math.random()*1)
        let height = 9 + Math.floor(Math.random()*1)
        for(let y = 0; y < height; y++){
            let row = []
            for(let x = 0; x < width; x++){
                if(y == 0 || x == 0 || x == width-1 || y == height-1){ row.push(new Tile({priority: 1, mapObject: new PineTree({})}))}
                else{
                    if(Math.random()*2 < 1)row.push(new Tile({tileImageCoordinates: [1,0],priority: 2,}))
                    else row.push(new Tile({priority: 2,}))
                } 
            }
            structureMap.push(row);
        }
        structureMap[Math.floor(height/2)][Math.floor(width/2)] = new Tile({mapObject: new Entrance({}), priority: 3,})
        return structureMap;
    }
 }
 export class ForestExitRoom extends Structure{
    generateStructureMap(){
        let structureMap = []
        let width = 9 + Math.floor(Math.random()*1)
        let height = 9 + Math.floor(Math.random()*1)
        for(let y = 0; y < height; y++){
            let row = []
            for(let x = 0; x < width; x++){
                if(y == 0 || x == 0 || x == width-1 || y == height-1) row.push(new Tile({priority: 1, mapObject: new PineTree({})}))
                else {
                    if(Math.random()*2 < 1)row.push(new Tile({tileImageCoordinates: [1,0],priority: 2,}))
                    else row.push(new Tile({priority: 2,}))
                }
            }
            structureMap.push(row);
        }
        structureMap[Math.floor(height/2)][Math.floor(width/2)] = new Tile({mapObject: new Exit({imageCoordinates: [1,2], imageFrameSize:[1,1]}), priority: 3,})
  
        return structureMap;
    }
}
export class ForestRoom1 extends Structure{
    generateStructureMap(){
        let structureMap = []
        let width = 5 + Math.floor(Math.random()*5)
        let height = 5 + Math.floor(Math.random()*5)
        for(let y = 0; y < height; y++){
            let row = []
            for(let x = 0; x < width; x++){
                let chance = Math.random()*2
                if((y == 0 || x == 0 || x == width-1 || y == height-1) && chance < 1) {
                    let chance = Math.floor(Math.random*3)
                    if(chance == 0)row.push(new Tile({priority: 1, mapObject: new Boulder({imageCoordinates: [0,1]})}))
                    else row.push(new Tile({mapObject: new PineTree({imageCoordinates: [0, 2], imageFrameSize: [1,2]}),}))
                }else {
                    if(y > 1 && x > 1 && y < height - 2 && x < width - 2){
                        if(Math.random()*4 < 1){
                            row.push(new Tile({priority: 1, mapObject: new Boulder({imageCoordinates: [0,1]})}))
                        }else{
                            row.push(new Tile({priority: 2,}))
                        }
                    }else{
                        row.push(new Tile({priority: 2,}))
                    }
                }
            }
            structureMap.push(row);
        }
        return structureMap;
    }
}
export class ForestRoom2 extends Structure{
    generateStructureMap(){
        let structureMap = []
        let width = 5 + Math.floor(Math.random()*5)
        let height = 5 + Math.floor(Math.random()*5)
        for(let y = 0; y < height; y++){
            let row = []
            for(let x = 0; x < width; x++){
                if(y == 0 || x == 0 || x == width-1 || y == height-1){
                    row.push(new Tile({priority: 1, mapObject: new PineTree({})}))
                }else {
                    if(y > 1 && x > 1 && y < height - 2 && x < width - 2){
                        if(Math.random()*4 < 1){
                            row.push(new Tile({mapObject: new BerryBush({imageCoordinates: [1,1]}), priority: 1,}))
                        }else{
                            if(Math.random()*2 < 1)row.push(new Tile({tileImageCoordinates: [1,0],priority: 2,}))
                            else row.push(new Tile({priority: 2,}))
                        }
                    }else{
                        if(Math.random()*2 < 1)row.push(new Tile({tileImageCoordinates: [1,0],priority: 2,}))
                        else row.push(new Tile({priority: 2,}))
                    }
                }
            }
            structureMap.push(row);
        }
        return structureMap;
    }
}
export class CaveEntranceRoom extends Structure{
    generateStructureMap(){
        let structureMap = []
        let width = 9 + Math.floor(Math.random()*1)
        let height = 9 + Math.floor(Math.random()*1)
        for(let y = 0; y < height; y++){
            let row = []
            for(let x = 0; x < width; x++){
                if(y == 0 || x == 0 || x == width-1 || y == height-1) row.push(new Tile({priority: 1, mapObject: new Wall({})}))
                else row.push(new Tile({priority: 2,}))
            }
            structureMap.push(row);
        }
        structureMap[Math.floor(height/2)][Math.floor(width/2)] = new Tile({mapObject: new Entrance({}), priority: 3,})
        return structureMap;
    }
 }
 export class CaveExitRoom extends Structure{
    generateStructureMap(){
        let structureMap = []
        let width = 9 + Math.floor(Math.random()*1)
        let height = 9 + Math.floor(Math.random()*1)
        for(let y = 0; y < height; y++){
            let row = []
            for(let x = 0; x < width; x++){
                if(y == 0 || x == 0 || x == width-1 || y == height-1) row.push(new Tile({priority: 1, mapObject: new Wall({})}))
                else row.push(new Tile({priority: 2,}))
            }
            structureMap.push(row);
        }
        structureMap[Math.floor(height/2)][Math.floor(width/2)] = new Tile({mapObject: new Exit({}), priority: 3,})

        return structureMap;
    }
}
export class CaveRoom1 extends Structure{
    generateStructureMap(){
        let structureMap = []
        let width = 5 + Math.floor(Math.random()*5)
        let height = 5 + Math.floor(Math.random()*5)
        for(let y = 0; y < height; y++){
            let row = []
            for(let x = 0; x < width; x++){
                if(y == 0 || x == 0 || x == width-1 || y == height-1){
                    row.push(new Tile({priority: 1, mapObject: new Wall({})}))
                }else {
                    if(y > 1 && x > 1 && y < height - 2 && x < width - 2){
                        if(Math.random()*4 < 1){
                            row.push(new Tile({mapObject: new Boulder({imageCoordinates: [0,8]}), priority: 2,}))
                        }else{
                            row.push(new Tile({priority: 2,}))
                        }
                    }else{
                        row.push(new Tile({priority: 2,}))
                    }
                }
            }
            structureMap.push(row);
        }
        return structureMap;
    }
}
export class CaveRoom2 extends Structure{
    generateStructureMap(){
        let structureMap = []
        let width = 7 + Math.floor(Math.random()*5)
        let height = 7 + Math.floor(Math.random()*5)
        for(let y = 0; y < height; y++){
            let row = []
            for(let x = 0; x < width; x++){
                if(y == 0 || x == 0 || x == width-1 || y == height-1) row.push(new Tile({priority: 1, mapObject: new Wall({})}))
                else {
                    if((y == 1 && x == 1) || (y == 1 && x == width - 2) || (y == height -2 && x == 1) || (y == height -2 && x == width - 2)) row.push(new Tile({priority: 1, mapObject: new Wall({})}))
                    else row.push(new Tile({priority: 2,}))
                }
            
                
            }
            structureMap.push(row);
        }
        return structureMap;
    }
}
export class DesertEntranceRoom extends Structure{
    generateStructureMap(){
        let structureMap = []
        let width = 9 + Math.floor(Math.random()*1)
        let height = 9 + Math.floor(Math.random()*1)
        for(let y = 0; y < height; y++){
            let row = []
            for(let x = 0; x < width; x++){
                let chance = Math.random()*2
                if((y == 0 || x == 0 || x == width-1 || y == height-1) && chance < 1)  row.push(new Tile({priority: 1, mapObject: new Boulder({imageCoordinates: [0,1]})}))
                else row.push(new Tile({priority: 2,}))
            }
            structureMap.push(row);
        }
        structureMap[Math.floor(height/2)][Math.floor(width/2)] = new Tile({mapObject: new Entrance({}), priority: 3,})
        return structureMap;
    }
 }
 export class DesertExitRoom extends Structure{
    generateStructureMap(){
        let structureMap = []
        let width = 9 + Math.floor(Math.random()*1)
        let height = 9 + Math.floor(Math.random()*1)
        for(let y = 0; y < height; y++){
            let row = []
            for(let x = 0; x < width; x++){
                let chance = Math.random()*2
                if((y == 0 || x == 0 || x == width-1 || y == height-1) && chance < 1) row.push(new Tile({priority: 1, mapObject: new Boulder({imageCoordinates: [0,1]})}))
                else row.push(new Tile({priority: 2,}))
            }
            structureMap.push(row);
        }
        structureMap[Math.floor(height/2)][Math.floor(width/2)] = new Tile({mapObject: new Exit({imageCoordinates: [0,2], imageFrameSize:[1,1]}), priority: 3,})
  
        return structureMap;
    }
}
export class DesertRoom1 extends Structure{
    generateStructureMap(){
        let structureMap = []
        let width = 5 + Math.floor(Math.random()*5)
        let height = 5 + Math.floor(Math.random()*5)
        for(let y = 0; y < height; y++){
            let row = []
            for(let x = 0; x < width; x++){
                let chance = Math.random()*2
                if((y == 0 || x == 0 || x == width-1 || y == height-1) && chance < 1) {
                    row.push(new Tile({priority: 1, mapObject: new Boulder({imageCoordinates: [0,1]})}))
                }else {
                    if(y > 1 && x > 1 && y < height - 2 && x < width - 2){
                        if(Math.random()*4 < 1){
                            row.push(new Tile({priority: 1, mapObject: new Boulder({imageCoordinates: [0,1]})}))
                        }else{
                            row.push(new Tile({priority: 2,}))
                        }
                    }else{
                        row.push(new Tile({priority: 2,}))
                    }
                }
            }
            structureMap.push(row);
        }
        return structureMap;
    }
}
export class SnowyMountainEntranceRoom extends Structure{
    generateStructureMap(){
        let structureMap = []
        let width = 9 + Math.floor(Math.random()*1)
        let height = 9 + Math.floor(Math.random()*1)
        for(let y = 0; y < height; y++){
            let row = []
            for(let x = 0; x < width; x++){
                let chance = Math.random()*2
                if((y == 0 || x == 0 || x == width-1 || y == height-1) && chance < 1) {
                    let chance = Math.floor(Math.random*3)
                    if(chance == 0)row.push(new Tile({priority: 1, mapObject: new Boulder({imageCoordinates: [0,1]})}))
                    else row.push(new Tile({mapObject: new PineTree({imageCoordinates: [0, 3], imageFrameSize: [1,2]}),}))
                }else {
                    if(y > 1 && x > 1 && y < height - 2 && x < width - 2){
                        if(Math.random()*4 < 1){
                            row.push(new Tile({priority: 1, mapObject: new Boulder({imageCoordinates: [0,1]})}))
                        }else{
                            row.push(new Tile({priority: 2,}))
                        }
                    }else{
                        row.push(new Tile({priority: 2,}))
                    }
                }
            }
            structureMap.push(row);
        }
        structureMap[Math.floor(height/2)][Math.floor(width/2)] = new Tile({mapObject: new Entrance({}), priority: 3,})
        return structureMap;
    }
 }
 export class SnowyMountainExitRoom extends Structure{
    generateStructureMap(){
        let structureMap = []
        let width = 9 + Math.floor(Math.random()*1)
        let height = 9 + Math.floor(Math.random()*1)
        for(let y = 0; y < height; y++){
            let row = []
            for(let x = 0; x < width; x++){
                let chance = Math.random()*2
                if((y == 0 || x == 0 || x == width-1 || y == height-1) && chance < 1) {
                    let chance = Math.floor(Math.random*3)
                    if(chance == 0)row.push(new Tile({priority: 1, mapObject: new Boulder({imageCoordinates: [0,1]})}))
                    else row.push(new Tile({mapObject: new PineTree({imageCoordinates: [0, 3], imageFrameSize: [1,2]}),}))
                }else {
                    if(y > 1 && x > 1 && y < height - 2 && x < width - 2){
                        if(Math.random()*4 < 1){
                            row.push(new Tile({priority: 1, mapObject: new Boulder({imageCoordinates: [0,1]})}))
                        }else{
                            row.push(new Tile({priority: 2,}))
                        }
                    }else{
                        row.push(new Tile({priority: 2,}))
                    }
                }
            }
            structureMap.push(row);
        }
        structureMap[Math.floor(height/2)][Math.floor(width/2)] = new Tile({mapObject: new Exit({imageCoordinates: [0,2], imageFrameSize:[1,1]}), priority: 3,})
  
        return structureMap;
    }
}
export class SnowyMountainRoom1 extends Structure{
    generateStructureMap(){
        let structureMap = []
        let width = 5 + Math.floor(Math.random()*5)
        let height = 5 + Math.floor(Math.random()*5)
        for(let y = 0; y < height; y++){
            let row = []
            for(let x = 0; x < width; x++){
                let chance = Math.random()*2
                if((y == 0 || x == 0 || x == width-1 || y == height-1) && chance < 1) {
                    let chance = Math.floor(Math.random*3)
                    if(chance == 0)row.push(new Tile({priority: 1, mapObject: new Boulder({imageCoordinates: [0,1]})}))
                    else row.push(new Tile({mapObject: new PineTree({imageCoordinates: [0, 3], imageFrameSize: [1,2]})}))
                }else {
                    if(y > 1 && x > 1 && y < height - 2 && x < width - 2){
                        if(Math.random()*4 < 1){
                            row.push(new Tile({priority: 1, mapObject: new Boulder({imageCoordinates: [0,1]})}))
                        }else{
                            row.push(new Tile({priority: 2,}))
                        }
                    }else{
                        row.push(new Tile({priority: 2,}))
                    }
                }
            }
            structureMap.push(row);
        }
        return structureMap;
    }
}
export class AltusCapitalRoom1 extends Structure{
    generateStructureMap(){
        let structureMap = []
        let width = 5 + Math.floor(Math.random()*5)
        let height = 5 + Math.floor(Math.random()*5)
        for(let y = 0; y < height; y++){
            let row = []
            for(let x = 0; x < width; x++){
                if(y == 0 || x == 0 || x == width-1 || y == height-1){
                    row.push(new Tile({priority: 1, mapObject: new Wall({})}))
                }else {
                    if(y > 1 && x > 1 && y < height - 2 && x < width - 2){
                        row.push(new Tile({priority: 2,}))
                    }else{
                        row.push(new Tile({priority: 2,}))
                    }
                }
            }
            structureMap.push(row);
        }
        return structureMap;
    }
}

