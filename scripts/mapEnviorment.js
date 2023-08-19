import {TreasureChest} from "./encounters.js";
import {getRandomItem } from "./items.js";
import {OpenChest, OpenChestArrowTrap, OpenChestAttractEnemy} from "./encounterResults.js";
import {Skeleton, Bat, Wolf, Royalmage, CaveSpider, Groveguardian} from "./enemies.js";

export default class MapEnviorment{
    constructor(){
        this.biome = "";
        this.imageSrc = "";
        this.backgroundMusicSrc = "";
        this.generateBiome();
    }
    generateBiome(){
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
                        return new Royalmage(playerLevel);
                    default:
                        return;
                }
            default:
                break;
        }
    }
    generateEncounter(playerLevel){
        switch(this.biome){ 
            case "cave": 
                switch(Math.floor(Math.random()*2)){ 
                    case 0:
                        return new TreasureChest([new OpenChest(getRandomItem())], [new OpenChestArrowTrap(), new OpenChestAttractEnemy(getRandomItem(), this.generateEnemy(playerLevel))]);
                    case 1:
                        return new TreasureChest([new OpenChest(getRandomItem())], [new OpenChestArrowTrap(), new OpenChestAttractEnemy(getRandomItem(), this.generateEnemy(playerLevel))]);
                    default:
                        return;
                }
            case "forest":
                switch(Math.floor(Math.random()*2)){ 
                    case 0:
                        return new TreasureChest([new OpenChest(getRandomItem())], [new OpenChestArrowTrap(), new OpenChestAttractEnemy(getRandomItem(), this.generateEnemy(playerLevel))]);
                    case 1:
                        return new TreasureChest([new OpenChest(getRandomItem())], [new OpenChestArrowTrap(), new OpenChestAttractEnemy(getRandomItem(), this.generateEnemy(playerLevel))]);
                    default:
                        return;
                }
            case "plains":
                switch(Math.floor(Math.random()*2)){ 
                    case 0:
                        return new TreasureChest([new OpenChest(getRandomItem())], [new OpenChestArrowTrap(), new OpenChestAttractEnemy(getRandomItem(), this.generateEnemy(playerLevel))]);
                    case 1:
                        return new TreasureChest([new OpenChest(getRandomItem())], [new OpenChestArrowTrap(), new OpenChestAttractEnemy(getRandomItem(), this.generateEnemy(playerLevel))]);
                    default:
                        return;
                }
            default:
                break;
        }
    }
}