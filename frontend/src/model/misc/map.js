import { Forest } from './biomes/forest.js';
import { Cave } from './biomes/cave.js';
import { Desert } from './biomes/desert.js';
import { SnowyMountains } from './biomes/snowyMountains.js';
import { AltusCapital } from './biomes/altusCapital.js';
import { Wasteland } from './biomes/wasteland.js';
import Tile from './tile.js';
import Biome from './biomes/biome.js';
import { biomeRegistry } from './registries/biomeRegistry.js';


export default class Map{
    constructor(biome, layout, isReydrate = false){
        this.biome = biome;
        this.tileLayout = layout;
        if(!isReydrate){
            this.biome = this.generateBiome(biome);
            this.tileLayout = this.biome.generateLayout(layout);
        }
    }
    generateBiome(biome){
        switch(biome){
            case 'Altus Kingdom':
                return new Forest({name: 'Altus Kingdom'});
            case 'Infernus Valley':
                return new Cave({name: 'Infernus Valley'});
            case 'The Dry Sea':
                return new Desert({name: 'The Dry Sea'});
            case 'Panzeria':
                return new SnowyMountains({name: 'Panzeria'});
            case 'Namuh':
                return new Wasteland({name: 'Namuh Wastes'});
            case 'Altus Capital':
                return new AltusCapital({});
            default:
                let chance = Math.floor(Math.random()*5);
                switch(chance){
                    case 0:
                        return new Forest({name: 'Altus Kingdom'});
                    case 1:
                        return new Cave({name: 'Infernus Valley'});
                    case 2:
                        return new Desert({name: 'The Dry Sea'});
                    case 3:
                        return new SnowyMountains({name: 'Panzeria'});
                    case 4:
                        return new Wasteland({name: 'Namuh Wastes'});
                }
        }
    }

    getEntrancePosition(){
        return this.biome.getTilePosition('entrance', this.tileLayout);
    }
    toSaveObject(){
        return {
            biome: this.biome.toSaveObject(),
            tileLayout: this.tileLayout.map((row)=>{
                return row.map((tile)=>{
                    return tile.toSaveObject()
                })
            }),
        }
    }
    static fromSaveObject(mapData){
        return new Map(
            Biome.fromSaveObject(mapData.biome, biomeRegistry),
           
            mapData.tileLayout.map((row)=>{
                return row.map((tileData)=>{
                    return Tile.fromSaveObject(tileData)
                })
            }),
            true
        )
    }
}