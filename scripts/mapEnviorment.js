import {LockedTreasureChest, AltusAmbushOpportunity, MysteriousDoor1} from "./encounters.js";
import {Skeleton, Bat, Wolf, AltusMage, CaveSpider, Groveguardian, EmperorDolos} from "./enemies.js";

export default class MapEnviorment{
    constructor(biome){
        this.biome = "";
        this.imageSrc = "";
        this.backgroundMusicSrc = "";
        this.generateBiome(biome);
    }
    generateBiome(biome){
        switch(biome){ 
            case "basic": 
                switch(Math.floor(Math.random()*3)){ 
                    case 0: 
                        this.biome = "cave";
                        this.imageSrc = "media/cave.jpg";
                        this.backgroundMusicSrc = "./audio/gathering-darkness-kevin-macleod-main-version-04-22-8459.mp3";
                        break;
                    case 1:
                        this.biome = "forest";
                        this.imageSrc = "media/forest.jpg";
                        this.backgroundMusicSrc = "./audio/deep-in-the-dell-126916.mp3";
                        break;
                    case 2:
                        this.biome = "plains";
                        this.imageSrc = "media/plains.jpg";
                        this.backgroundMusicSrc = "./audio/the-epical-trailer-158083.mp3";
                        break;
                    default:
                        break;
                }
                break;
            case "portal":
                switch(Math.floor(Math.random()*2)){ 
                    case 0: 
                        this.biome = "twilight realm";
                        this.imageSrc = "media/twilight-realm.jpg";
                        this.backgroundMusicSrc = "./audio/gathering-darkness-kevin-macleod-main-version-04-22-8459.mp3";
                        break;
                    case 1:
                        this.biome = "ancient altus ruins";
                        this.imageSrc = "media/ancient-altus-ruins.jpg";
                        this.backgroundMusicSrc = "./audio/gathering-darkness-kevin-macleod-main-version-04-22-8459.mp3";
                        break;
                    default:
                        break;
                }
                break;
            default:
                break;
        }
    }
    generateEnemy(playerLevel){
        switch(this.biome){ 
            case "cave": 
                switch(Math.floor(Math.random()*3)){ 
                    case 0:
                        return new CaveSpider(playerLevel);
                    case 1:
                        return new Bat(playerLevel);
                    case 2:
                        return new Skeleton(playerLevel);
                    default:
                        return;
                }
            case "forest":
                switch(Math.floor(Math.random()*3)){ 
                    case 0:
                        return new Bat(playerLevel);
                    case 1:
                        return new Wolf(playerLevel);
                    case 2:
                        return new Groveguardian(playerLevel);
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
                        return new AltusMage(playerLevel);
                    default:
                        return;
                }
            case "twilight realm":
                switch(Math.floor(Math.random()*2)){ 
                    case 0:
                        return new Wolf(playerLevel);
                    case 1:
                        return new Wolf(playerLevel);
                    default:
                        return;
                }
            case "ancient altus ruins":
                switch(Math.floor(Math.random()*2)){ 
                    case 0:
                        return new Skeleton(playerLevel);
                    case 1:
                        return new Skeleton(playerLevel);
                    default:
                        return;
                }
            default:
                break;
        }
    }
    generateEncounter(){
        switch(this.biome){ 
            case "cave": 
                switch(Math.floor(Math.random()*2)){ 
                    case 0:
                        return new LockedTreasureChest();
                    case 1:
                        return new MysteriousDoor1();
                    default:
                        return;
                }
            case "forest":
                switch(Math.floor(Math.random()*2)){ 
                    case 0:
                        return new LockedTreasureChest();
                    case 1:
                        return new LockedTreasureChest();
                    default:
                        return;
                }
            case "plains":
                switch(Math.floor(Math.random()*2)){ 
                    case 0:
                        return new LockedTreasureChest();
                    case 1:
                        return new AltusAmbushOpportunity();
                    default:
                        return;
                }
            case "twilight realm":
                switch(Math.floor(Math.random()*2)){ 
                    case 0:
                        return new LockedTreasureChest();
                    case 1:
                        return new LockedTreasureChest();
                    default:
                        return;
                }
            case "ancient altus ruins":
                switch(Math.floor(Math.random()*2)){ 
                    case 0:
                        return new LockedTreasureChest();
                    case 1:
                        return new LockedTreasureChest();
                    default:
                        return;
                }
            default:
                break;
        }
    }
}