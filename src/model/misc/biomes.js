import { Skeleton, Wolf, Spider} from "./entities.js";


export default class Biome{
    constructor(config){
        this.name = config.name || "";
        this.terrainSrc = config.terrainSrc || "";
        this.backgroundMusicSrc = config.backgroundMusicSrc || "";
        this.battleMusicSrc = config.battleMusicSrc || "";
    }
    
}
export class Plains extends Biome{
    constructor(config){
        super({
            name: 'plains',
            terrainSrc: './assets/media/terrain/plains.png',
            backgroundMusicSrc: "./assets/audio/musicTracks/deep-in-the-dell-126916.mp3",
            battleMusicSrc: "./assets/audio/musicTracks/battle-of-the-dragons-8037.mp3",
        });
    }
    generateEnemies(partyLevel, count){
        let enemyArray = [];
        for(let i = 0; i < count; i ++){
            switch(Math.floor(Math.random()*2)){ 
                case 0:
                    enemyArray.push(new Skeleton({level: partyLevel}));
                    break;
                case 1:
                    enemyArray.push(new Wolf({level: partyLevel}));
                    break;
            }
        }
        return enemyArray;
    }
}

export class Cave extends Biome{
    constructor(config){
        super({
            name: 'cave',
            terrainSrc: './assets/media/terrain/cave.png',
            backgroundMusicSrc: "./assets/audio/musicTracks/gathering-darkness-kevin-macleod-main-version-04-22-8459.mp3",
            battleMusicSrc: "./assets/audio/musicTracks/battle-sword-139313.mp3",
        });
    }
    generateEnemies(partyLevel, count){
        let enemyArray = [];
        for(let i = 0; i < count; i ++){
            switch(Math.floor(Math.random()*3)){ 
                case 0:
                    enemyArray.push(new Skeleton({level: partyLevel}));
                    break;
                case 1:
                    enemyArray.push(new Wolf({level: partyLevel}));
                    break;
                case 1:
                    enemyArray.push(new Spider({level: partyLevel}));
                    break;
            }
        }
        return enemyArray;
    }
}

export function generateBiome(){
    let chance = Math.floor(Math.random()*2);
    switch(chance){
        case 0:
            return new Plains({});
        case 1:
            return new Cave({});
    }
}