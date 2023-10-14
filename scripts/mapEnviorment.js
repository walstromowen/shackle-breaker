import {LockedTreasureChest, AltusAmbushOpportunity, MysteriousDoor, TravelingMerchant, AbandonedCabin, SuspiciousSkeleton, Robbery, Avalanche} from "./encounters.js";
import {Skeleton, Bat, Wolf, AltusMage, CaveSpider, Groveguardian, EmperorDolos, ShadowStrider, TerrorBear, Bandit} from "./enemies.js";

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
                switch(Math.floor(Math.random()*4)){ 
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
                    case 3:
                        this.biome = "mountain";
                        this.imageSrc = "media/mountain.jpg";
                        this.backgroundMusicSrc = "./audio/achievement-philip-anderson-main-version-01-31-13804.mp3";
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
                switch(Math.floor(Math.random()*4)){ 
                    case 0:
                        return new Bat(playerLevel);
                    case 1:
                        return new Wolf(playerLevel);
                    case 2:
                        return new Groveguardian(playerLevel);
                    case 3:
                        return new Bandit(playerLevel);
                    default:
                        return;
                }
            case "plains":
                switch(Math.floor(Math.random()*4)){ 
                    case 0:
                        return new Skeleton(playerLevel);
                    case 1:
                        return new Wolf(playerLevel);
                    case 2:
                        return new AltusMage(playerLevel);
                    case 3:
                        return new Bandit(playerLevel);
                    default:
                        return;
                }
            case "mountain":
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
                        return new ShadowStrider(playerLevel);
                    case 1:
                        return new TerrorBear(playerLevel);
                    default:
                        return;
                }
            case "ancient altus ruins":
                switch(Math.floor(Math.random()*2)){ 
                    case 0:
                        return new Skeleton(playerLevel);
                    case 1:
                        return new Bat(playerLevel);
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
                switch(Math.floor(Math.random()*3)){ 
                    case 0:
                        return new LockedTreasureChest();
                    case 1:
                        return new MysteriousDoor();
                    case 2:
                        return new SuspiciousSkeleton();
                    default:
                        return;
                }
            case "forest":
                switch(Math.floor(Math.random()*4)){ 
                    case 0:
                        return new LockedTreasureChest();
                    case 1:
                        return new TravelingMerchant();
                    case 2:
                        return new AbandonedCabin();
                    case 3:
                        return new Robbery();
                    default:
                        return;
                }
            case "plains":
                switch(Math.floor(Math.random()*4)){ 
                    case 0:
                        return new LockedTreasureChest();
                    case 1:
                        return new AltusAmbushOpportunity();
                    case 2:
                        return new TravelingMerchant();
                    case 3:
                        return new Robbery();
                    default:
                        return;
                }
            case "mountain":
                switch(Math.floor(Math.random()*3)){ 
                    case 0:
                        return new Robbery();
                    case 1:
                        return new Avalanche();
                    case 2:
                        return new TravelingMerchant();
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
                        return new SuspiciousSkeleton();
                    default:
                        return;
                }
            default:
                break;
        }
    }
}