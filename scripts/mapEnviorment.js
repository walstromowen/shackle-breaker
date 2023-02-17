import {Skeleton, Bat, Wolf} from "./enemies.js";

export default class MapEnviorment{
    constructor(){
        this.biome = "";
        this.generateBiome();
    }
    generateBiome(){
        switch(Math.floor(Math.random()*3)){ 
            case 0: 
                this.biome = "cave";
                break;
            case 1:
                this.biome = "forest";
                break;
            case 2:
                this.biome = "plains";
                break;
            default:
                break;
        }
    }
    generateEnemy(){
        switch(this.biome){ 
            case "cave": 
                switch(Math.floor(Math.random()*2)){ 
                    case 0:
                        return new Skeleton();
                    case 1:
                        return new Bat();
                    default:
                        return;
                }
            case "forest":
                switch(Math.floor(Math.random()*2)){ 
                    case 0:
                        return new Bat();
                    case 1:
                        return new Wolf();
                    default:
                        return;
                }
            case "plains":
                switch(Math.floor(Math.random()*2)){ 
                    case 0:
                        return new Skeleton();
                    case 1:
                        return new Wolf();
                    default:
                        return;
                }
            default:
                break;
        }
    }
}