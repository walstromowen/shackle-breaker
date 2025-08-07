import { AltusCapital } from "../biomes/altusCapital.js"
import { Cave } from "../biomes/cave.js"
import { Desert } from "../biomes/desert.js"
import { Forest } from "../biomes/forest.js"
import { SnowyMountains } from "../biomes/snowyMountains.js"
import { Wasteland } from "../biomes/wasteland.js"

export const biomeRegistry = {
    'altus capital': (config)=>{return new AltusCapital(config)},
    'forest': (config)=>{return new Forest(config)},
    'cave': (config)=>{return new Cave(config)},
    'desert': (config)=>{return new Desert(config)},
    'snowy mountains': (config)=>{return new SnowyMountains(config)},
    'wasteland': (config)=>{return new Wasteland(config)},
}

//Silent Grove
//Sand Caslte
//Old Aluts
//Panzerian Ouskirts
//Twilight Cidadel