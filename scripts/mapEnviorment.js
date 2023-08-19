import {TreasureChest} from "./encounters.js";
import {getRandomItem } from "./items.js";
import {OpenChest, OpenChestArrowTrap, OpenChestAttractEnemy} from "./encounterResults.js";
import {Skeleton, Bat, Wolf, Royalmage, CaveSpider, Groveguardian} from "./enemies.js";

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