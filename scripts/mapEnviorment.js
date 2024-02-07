import {LockedTreasureChest, UnlockedTreasureChest, AltusAmbushOpportunity, MysteriousDoor, TravelingMerchant, AbandonedCabin, SuspiciousSkeleton, Robbery, Avalanche, MercenaryForHire, AncientTombstone, Quicksand, AnimalTracks,
        UnearthedReamins} from "./encounters.js";
import {Skeleton, Bat, Wolf, AltusMage, CaveSpider, Groveguardian, EmperorDolos, ShadowStrider, TerrorBear, Bandit, Ghost, SkeletonMage, AltusGuard, Yeti, Tiger, TwilightDragon, AncientAltusKing, FloatingSkull, Pursuer} from "./enemies.js";

export default class MapEnviorment{
    constructor(biome){
        this.biome = "";
        this.imageSrc = "";
        this.backgroundMusicSrc = "";
        this.battleMusicSrc = "";
        this.terrain = new Image();
        this.terrain.src = "media/terrain/terrain.png";
        this.frameCoordinates = [[]];
        this.generateBiome(biome);
    }
    generateBiome(biome){
        switch(biome){ 
            case "basic": 
                switch(Math.floor(Math.random()*6)){
                    case 0: 
                        this.biome = "cave";
                        this.imageSrc = "media/cave.jpg";
                        this.backgroundMusicSrc = "./audio/gathering-darkness-kevin-macleod-main-version-04-22-8459.mp3";
                        this.battleMusicSrc = "./audio/battle-of-the-dragons-8037.mp3";
                        this.frameCoordinates = [
                            [3],
                            [3]
                        ];
                        break;
                    case 1:
                        this.biome = "forest";
                        this.imageSrc = "media/forest.jpg";
                        this.backgroundMusicSrc = "./audio/deep-in-the-dell-126916.mp3";
                        this.battleMusicSrc = "./audio/battle-of-the-dragons-8037.mp3";
                        this.frameCoordinates = [
                            [0,1],
                            [0,1]
                        ];
                        break;
                    case 2:
                        this.biome = "plains";
                        this.imageSrc = "media/plains.jpg";
                        this.backgroundMusicSrc = "./audio/the-epical-trailer-158083.mp3";
                        this.battleMusicSrc = "./audio/battle-sword-139313.mp3";
                        this.frameCoordinates = [
                            [0,2],
                            [0,1,2]
                        ];
                        break;
                    case 3:
                        this.biome = "mountain";
                        this.imageSrc = "media/mountain.jpg";
                        this.backgroundMusicSrc = "./audio/achievement-philip-anderson-main-version-01-31-13804.mp3";
                        this.battleMusicSrc = "./audio/battle-sword-139313.mp3";
                        this.frameCoordinates = [
                            [0,2],
                            [2]
                        ];
                        break;
                    case 4: 
                        this.biome = "desert";
                        this.imageSrc = "media/desert.jpg";
                        this.backgroundMusicSrc = "./audio/TimTaj - Desert Prince.mp3";
                        this.battleMusicSrc = "./audio/TimTaj - Desert Hunt.mp3";
                        this.frameCoordinates = [
                            [4],
                            [4]
                        ];
                        break;
                    case 5: 
                        this.biome = "tundra";
                        this.imageSrc = "media/tundra.jpg";
                        this.backgroundMusicSrc = "./audio/nocturne-roman-main-version-16841-01-45.mp3";
                        this.battleMusicSrc = "./audio/battle-sword-139313.mp3";
                        this.frameCoordinates = [
                            [5],
                            [5]
                        ];
                        break;
                    default:
                        break;
                }
                break;
            case "twilight realm": 
                this.biome = "twilight realm";
                this.imageSrc = "media/twilight-realm.jpg";
                this.backgroundMusicSrc = "./audio/mixkit-evil-storm-atmosphere-2404.wav";
                this.battleMusicSrc = "./audio/battle-sword-139313.mp3";
                this.frameCoordinates = [
                    [3],
                    [3],
                    [0],
                    [0],
                    [0]
                ];
                break;
            case "ancient altus ruins":
                this.biome = "ancient altus ruins";
                this.imageSrc = "media/ancient-altus-ruins.jpg";
                this.backgroundMusicSrc = "./audio/gathering-darkness-kevin-macleod-main-version-04-22-8459.mp3";
                this.battleMusicSrc = "./audio/battle-sword-139313.mp3";
                this.frameCoordinates = [
                    [6],
                    [6],
                    [0],
                    [0],
                    [6]
                ];
                break;
            case "altus castle":
                this.biome = "altus castle";
                this.imageSrc = "media/altus-castle-interior.jpg";
                this.backgroundMusicSrc = "./audio/mixkit-evil-storm-atmosphere-2404.wav";
                this.battleMusicSrc = "./audio/battle-sword-139313.mp3";
                this.frameCoordinates = [
                    [6],
                    [6],
                    [0],
                    [0],
                    [6]
                ];
                break;
            case "mysterious dungeon":
                this.biome = "mysterious dungeon";
                this.imageSrc = "media/mysterious-dungeon.jpg";
                this.backgroundMusicSrc = "./audio/mixkit-evil-storm-atmosphere-2404.wav";
                this.battleMusicSrc = "./audio/battle-sword-139313.mp3";
                this.frameCoordinates = [
                    [6],
                    [6],
                    [0],
                    [0],
                    [6]
                ];
                break;
            default:
                break;
        }
    }
    generateEnemies(currentCharacterLevel, isBoss, count){
        let enemyArray = [];
        for(let i = 0; i < count; i ++){
            switch(this.biome){ 
                case "cave": 
                    switch(Math.floor(Math.random()*5)){ 
                        case 0:
                            enemyArray.push(new CaveSpider(currentCharacterLevel));
                            break;
                        case 1:
                            enemyArray.push(new Bat(currentCharacterLevel));
                            break;
                        case 2:
                            enemyArray.push(new Skeleton(currentCharacterLevel));
                            break;
                        case 3:
                            enemyArray.push(new SkeletonMage(currentCharacterLevel));
                            break;
                        case 4:
                            enemyArray.push(new FloatingSkull(currentCharacterLevel));
                            break;
                    }
                    break;
                case "forest":
                    switch(Math.floor(Math.random()*4)){ 
                        case 0:
                            enemyArray.push(new Bat(currentCharacterLevel));
                            break;
                        case 1:
                            enemyArray.push(new Wolf(currentCharacterLevel));
                            break;
                        case 2:
                            enemyArray.push(new Groveguardian(currentCharacterLevel));
                            break;
                        case 3:
                            enemyArray.push(new Bandit(currentCharacterLevel));
                            break;
                    }
                    break;
                case "plains":
                    switch(Math.floor(Math.random()*4)){ 
                        case 0:
                            enemyArray.push(new Wolf(currentCharacterLevel));
                            break;
                        case 1:
                            enemyArray.push(new AltusMage(currentCharacterLevel));
                            break;
                        case 2:
                            enemyArray.push(new Bandit(currentCharacterLevel));
                            break;
                        case 3:
                            enemyArray.push(new AltusGuard(currentCharacterLevel));
                            break;
                    }
                    break;
                case "mountain":
                    switch(Math.floor(Math.random()*4)){ 
                        case 0:
                            enemyArray.push(new Bandit(currentCharacterLevel));
                            break;
                        case 1:
                            enemyArray.push(new Wolf(currentCharacterLevel));
                            break;
                        case 2:
                            enemyArray.push(new AltusMage(currentCharacterLevel));
                            break;
                        case 3:
                            enemyArray.push(new AltusGuard(currentCharacterLevel));
                            break;
                    }
                    break;
                case "desert": 
                    switch(Math.floor(Math.random()*2)){ 
                        case 0:
                            enemyArray.push(new Skeleton(currentCharacterLevel));
                            break;
                        case 1:
                            enemyArray.push(new SkeletonMage(currentCharacterLevel));
                            break;
                    }
                    break;  
                case "tundra":
                    switch(Math.floor(Math.random() * 4)){ 
                        case 0:
                            enemyArray.push(new Tiger(currentCharacterLevel));
                            break;
                        case 1:
                            enemyArray.push(new Wolf(currentCharacterLevel));
                            break;
                        case 2:
                            enemyArray.push(new SkeletonMage(currentCharacterLevel));
                            break;
                        case 3:
                            enemyArray.push(new Yeti(currentCharacterLevel));
                            break;
                    }
                    break;
                case "twilight realm":
                    if(isBoss == true){
                        enemyArray.push(new TwilightDragon(currentCharacterLevel));
                        break;
                    }
                    switch(Math.floor(Math.random()*2)){ 
                        case 0:
                            enemyArray.push(new ShadowStrider(currentCharacterLevel));
                            break;
                        case 1:
                            enemyArray.push(new TerrorBear(currentCharacterLevel));
                            break;
                    }
                    break;
                case "ancient altus ruins":
                    if(isBoss == true){
                        enemyArray.push(new AncientAltusKing(currentCharacterLevel));
                        break;
                    }
                    switch(Math.floor(Math.random()*5)){ 
                        case 0:
                            enemyArray.push(new Skeleton(currentCharacterLevel));
                            break;
                        case 1:
                            enemyArray.push(new Bat(currentCharacterLevel));
                            break;
                        case 2:
                            enemyArray.push(new SkeletonMage(currentCharacterLevel));
                            break;
                        case 3:
                            enemyArray.push(new Ghost(currentCharacterLevel));
                            break;
                        case 4:
                            enemyArray.push(new FloatingSkull(currentCharacterLevel));
                            break;
                    }
                    break;
                case "altus castle":
                    if(isBoss == true){
                        enemyArray.push(new EmperorDolos(currentCharacterLevel));
                        break;
                    }
                    switch(Math.floor(Math.random()*2)){ 
                        case 0:
                            enemyArray.push(new AltusMage(currentCharacterLevel));
                            break;
                        case 1:
                            enemyArray.push(new AltusGuard(currentCharacterLevel));
                            break;
                    }
                    break;
                case "mysterious dungeon":
                    switch(Math.floor(Math.random()*3)){ 
                        case 0:
                            enemyArray.push(new Bat(currentCharacterLevel));
                            break;
                        case 1:
                            enemyArray.push(new FloatingSkull(currentCharacterLevel));
                            break;
                        case 2:
                            enemyArray = [new Pursuer(currentCharacterLevel)];
                            i = count;
                            break;
                    }
                    break;
            }
        }
        return enemyArray;
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
                switch(Math.floor(Math.random()*5)){ 
                    case 0:
                        return new LockedTreasureChest();
                    case 1:
                        return new TravelingMerchant();
                    case 2:
                        return new AbandonedCabin();
                    case 3:
                        return new Robbery();
                    case 4:
                        return new AnimalTracks();
                    default:
                        return;
                }
            case "plains":
                switch(Math.floor(Math.random()*8)){ 
                    case 0:
                        return new LockedTreasureChest();
                    case 1:
                        return new AltusAmbushOpportunity();
                    case 2:
                        return new TravelingMerchant();
                    case 3:
                        return new Robbery();
                    case 4:
                        return new MercenaryForHire();
                    case 5:
                        return new AncientTombstone();
                    case 6:
                        return new UnlockedTreasureChest();
                    case 7:
                        return new AnimalTracks();
                    default:
                        return;
                }
            case "mountain":
                switch(Math.floor(Math.random()*6)){ 
                    case 0:
                        return new Robbery();
                    case 1:
                        return new Avalanche();
                    case 2:
                        return new TravelingMerchant();
                    case 3:
                        return new MysteriousDoor();
                    case 4:
                        return new AncientTombstone();
                    case 5:
                        return new AnimalTracks();
                    default:
                        return;
                }
            case "desert": 
                switch(Math.floor(Math.random()*6)){ 
                    case 0:
                        return new LockedTreasureChest();
                    case 1:
                        return new TravelingMerchant();
                    case 2:
                        return new AncientTombstone();
                    case 3:
                        return new Quicksand();
                    case 4:
                        return new Robbery();
                    case 5:
                        return new MercenaryForHire();
                    default:
                        return;
                }
            case "tundra":
                switch(Math.floor(Math.random() * 3)){ 
                    case 0:
                        return new AnimalTracks();
                    case 1:
                        return new Avalanche();
                    case 2:
                        return new MercenaryForHire();
                    default:
                        return;
                }
            case "twilight realm":
                switch(Math.floor(Math.random()*2)){ 
                    case 0:
                        return new LockedTreasureChest();
                    case 1:
                        return new UnlockedTreasureChest();
                    default:
                        return;
                }
            case "ancient altus ruins":
                switch(Math.floor(Math.random()*3)){ 
                    case 0:
                        return new LockedTreasureChest();
                    case 1:
                        return new SuspiciousSkeleton();
                    case 2:
                        return new AncientTombstone();
                    default:
                        return;
                }
            case "mysterious dungeon":
                switch(Math.floor(Math.random()*2)){ 
                    case 0:
                        return new LockedTreasureChest();
                    case 1:
                        return new UnearthedReamins();
                    default:
                        return;
                }
            default:
                break;
        }
    }
}