import { Skeleton, Wolf} from "./entities.js";


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
            terrainSrc: './assets/media/terrain/terrain.png',
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

export function generateBiome(){
    return new Plains({});
}