import { Forest } from './biomes/forest.js';
import { Cave } from './biomes/cave.js';
import { Desert } from './biomes/desert.js';
import { SnowyMountains } from './biomes/snowyMountains.js';
import { AltusCapital } from './biomes/altusCapital.js';

export default class Map{
    constructor(biome, layout){
        this.biome = this.generateBiome(biome);
        this.tileLayout = this.biome.generateLayout(layout);
    }
   generateBiome(biome){
        if(biome){
            if(biome == 'altus capital'){
                return new AltusCapital({})
            }
        }
        let chance = Math.floor(Math.random()*2);
        switch(chance){
            case 0:
                return new Forest({name: 'Altus Kingdom'});
            case 1:
                return new Cave({name: 'Infernus Valley'});
            case 2:
                return new Desert({name: 'The Dry Sea'});
            case 3:
                return new SnowyMountains({name: 'Panzeria'});
        }
    }
    getEntrancePosition(){
        for(let y = 0; y < this.tileLayout.length; y++){
            for(let x = 0; x < this.tileLayout[y].length; x++){
                if(this.tileLayout[y][x].mapObject){
                    if(this.tileLayout[y][x].mapObject.name == 'entrance'){
                        return [x, y];
                    }
                }
            }
        }
    }
}