import {Skeleton, Bat, Wolf, Royalmage} from "./enemies.js";

export default class MapEnviorment{
    constructor(){
        this.biome = "";
        this.imageSrc = "";
        this.generateBiome();
    }
    generateBiome(){
        switch(Math.floor(Math.random()*3)){ 
            case 0: 
                this.biome = "cave";
                this.imageSrc = "media/cave.jpg"
                break;
            case 1:
                this.biome = "forest";
                this.imageSrc = "media/forest.jpg"
                break;
            case 2:
                this.biome = "plains";
                this.imageSrc = "media/plains.jpg"
                break;
            default:
                break;
        }
    }
    generateEnemy(playerLevel){
        console.log("Eviorment" + playerLevel);
        switch(this.biome){ 
            case "cave": 
                switch(Math.floor(Math.random()*2)){ 
                    case 0:
                        return new Skeleton(playerLevel);
                    case 1:
                        return new Bat(playerLevel);
                    default:
                        return;
                }
            case "forest":
                switch(Math.floor(Math.random()*2)){ 
                    case 0:
                        return new Bat(playerLevel);
                    case 1:
                        return new Wolf(playerLevel);
                    default:
                        return;
                }
            case "plains":
                switch(Math.floor(Math.random()*3)){ 
                    case 0:
                        return new Skeleton(playerLevel);
                    case 1:
                        return new Wolf(playerLevel);
                    case 2:
                        return new Royalmage(playerLevel);
                    default:
                        return;
                }
            default:
                break;
        }
    }
}