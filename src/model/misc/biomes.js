import { getRandomArrayElementWeighted } from "../../utility.js";
import { Skeleton, SkeletonCultist, Wolf, Spider, GroveGuardian, Madman, MadMage, SandStalker, DryShark, Dog, ArmoredSkeleton, MadBandit, FloatingSkull, DryEel, PanzerianKnight, MadEngineer, IcePheonix} from "./entities.js";
import { Dagger, ShortSword, BlacksmithHammer, ArcaneStaff, FireStaff, LightningStaff, LightStaff, LinenShirt, LinenPants, Handaxe, LeatherHelmet, LeatherHood, Shortbow, Buckler, GreatSword, LeatherChestplate, LeatherGreaves, LeatherBoots, DarkStaff, IceStaff, ForestStaff, IronHelm, IronChainmail, IronGauntlets, IronGreaves, IronBoots, ClothHood, ClothRobe, BearTrap, Flintlock, SmokeBomb} from "./items.js";
import {HealthPotion, PoisonedKnife, KurtussBrewOfMadness, StaminaPotion, MagicPotion, Antidote, ParalysisTonic, AloeRemedy, Bandage, PineWood, Hide} from "./items.js";
import Encounter from "./encounters/encounter.js";
import Battle from "./battle.js";
import { MadmanAhead} from "./encounters/madmanAhead.js";
import {WanderingMercenary} from "./encounters/wanderingMercenary.js";
import { MysteriousAltar } from "./encounters/mysteriousAltar.js";
import { ShiftingSands, SandCastleEntrance} from "./encounters/shiftingSands.js";
import { TreasureChest } from "./encounters/treasureChest.js";
import { CaveIn } from "./encounters/caveIn.js";
import { TheArtifact } from "./encounters/theArtifact.js";
import { Bonfire } from "./encounters/bonfire.js";
import { DesertHorror, Sinkhole } from "./encounters/sinkhole.js";
import { TracksInTheSnow, WoundedTiger } from "./encounters/tracksInTheSnow.js";
import { SilentGrove } from "./encounters/silentGrove.js";

export default class Biome{
    constructor(config){
        this.name = config.name || "";
        this.terrainSrc = config.terrainSrc || "";
        this.backgroundMusicSrc = config.backgroundMusicSrc || "";
        this.battleMusicSrc = config.battleMusicSrc || "";
        this.possibleHostiles = config.possibleHostiles || [];
        this.possibleEncounters = config.possibleEncounters || [];
        this.storyEncounters = config.storyEncounters || [];
        this.weather = config.weather || 'clear';
        this.lootTable = config.lootTable || [
            {item: ()=>{return new ArcaneStaff({level: 1})}, weight: 1},
            {item: ()=>{return new LightStaff({level: 1})}, weight: 1},
            {item: ()=>{return new DarkStaff({level: 1})}, weight: 1},
            {item: ()=>{return new FireStaff({level: 1})}, weight: 1},
            {item: ()=>{return new LightningStaff({level: 1})}, weight: 1},
            {item: ()=>{return new IceStaff({level: 1})}, weight: 1},
            {item: ()=>{return new ForestStaff({level: 1})}, weight: 1},

            {item: ()=>{return new LeatherHood({level: 1})}, weight: 1},
            {item: ()=>{return new LeatherHelmet({level: 1})}, weight: 1},
            {item: ()=>{return new LeatherChestplate({level: 1})}, weight: 1},
            {item: ()=>{return new LeatherGreaves({level: 1})}, weight: 1},
            {item: ()=>{return new LeatherBoots({level: 1})}, weight: 1},

            {item: ()=>{return new IronHelm({level: 1})}, weight: 1},
            {item: ()=>{return new IronChainmail({level: 1})}, weight: 1},
            {item: ()=>{return new IronGauntlets({level: 1})}, weight: 1},
            {item: ()=>{return new IronGreaves({level: 1})}, weight: 1},
            {item: ()=>{return new IronBoots({level: 1})}, weight: 1},

            {item: ()=>{return new ClothHood({level: 1})}, weight: 1},
            {item: ()=>{return new ClothRobe({level: 1})}, weight: 1},

            {item: ()=>{return new LinenShirt({level: 1})}, weight: 2},
            {item: ()=>{return new LinenPants({level: 1})}, weight: 2},


            {item: ()=>{return new Flintlock({level: 1})}, weight: 1},
            {item: ()=>{return new GreatSword({level: 1})}, weight: 1},
            {item: ()=>{return new ShortSword({level: 1})}, weight: 1},
            {item: ()=>{return new Handaxe({level: 1})}, weight: 1},
            {item: ()=>{return new Buckler({level: 1})}, weight: 1},
            {item: ()=>{return new Dagger({level: 1})}, weight: 1},
            {item: ()=>{return new BlacksmithHammer({level: 1})}, weight: 1},

            {item: ()=>{return new KurtussBrewOfMadness()}, weight: 1},
            {item: ()=>{return new PoisonedKnife()}, weight: 1},
            {item: ()=>{return new BearTrap()}, weight: 1},
            {item: ()=>{return new SmokeBomb()}, weight: 1},

            {item: ()=>{return new HealthPotion()}, weight: 3},
            {item: ()=>{return new StaminaPotion()}, weight: 3},
            {item: ()=>{return new MagicPotion()}, weight: 3},

            {item: ()=>{return new Bandage()}, weight: 3},
            {item: ()=>{return new Antidote()}, weight: 2},
            {item: ()=>{return new ParalysisTonic()}, weight: 2},
            
        ];
    }
    generateEnemies(partyLevel, count, difficulty){
        let hostileArray = [];
        for(let i = 0; i < count; i ++){
            let hostile = getRandomArrayElementWeighted(this.possibleHostiles).entity(partyLevel, difficulty);
            hostileArray.push(hostile);
        }
        return hostileArray;
    }
    generateBattle(partyLevel, difficulty){
        return new Battle({hostiles: this.generateEnemies(partyLevel, Math.ceil(Math.random()*3), difficulty), battleMusicSrc: this.battleMusicSrc,}); 
    }
    generateEncounter(fn){
        let encounter = getRandomArrayElementWeighted(this.possibleEncounters)
        let startingStage = encounter.startingStage();
        if(startingStage.name == 'Wandering Mercenary'){
            let entity = fn()
            return new Encounter(new WanderingMercenary({entity: entity}), encounter.resetOnLeave) 
        }
        return new Encounter(startingStage, encounter.resetOnLeave)   
    }
    generateStoryEncounter(){
        let encounter = this.storyEncounters[0];
        this.storyEncounters.splice(0, 1);
        let startingStage = encounter.startingStage();
        return new Encounter(startingStage, encounter.resetOnLeave)   
    }
}
export class Plains extends Biome{
    constructor(config){
        super({
            name: config.name || 'plains',
            terrainSrc: './assets/media/terrain/plains.png',
            backgroundMusicSrc: "./assets/audio/musicTracks/deep-in-the-dell-126916.mp3",
            battleMusicSrc: "./assets/audio/musicTracks/battle-of-the-dragons-8037.mp3",
            possibleHostiles: [
                {entity: (partyLevel, difficulty)=>{return new Madman({level: partyLevel, difficulty: difficulty})}, weight: 2},
                {entity: (partyLevel, difficulty)=>{return new MadMage({level: partyLevel, difficulty: difficulty})}, weight: 1},
                {entity: (partyLevel, difficulty)=>{return new MadBandit({level: partyLevel, difficulty: difficulty})}, weight: 1},
                {entity: (partyLevel, difficulty)=>{return new Wolf({level: partyLevel, difficulty: difficulty})}, weight: 1},
                
            ],
            possibleEncounters: [
                {startingStage: ()=>{return {name: 'Wandering Mercenary'}}, resetOnLeave: false, weight: 1},
                {startingStage: ()=>{return new TreasureChest({})}, resetOnLeave: false, weight: 1},
                {startingStage: ()=>{return new MadmanAhead({})}, resetOnLeave: false, weight: 1},
                {startingStage: ()=>{return new Bonfire({})}, resetOnLeave: false, weight: 1},
                {startingStage: ()=>{return new SilentGrove({})}, resetOnLeave: false, weight: 100},
            ],
        });
    }
}

export class Cave extends Biome{
    constructor(config){
        super({
            name: config.name || 'cave',
            terrainSrc: './assets/media/terrain/cave.png',
            backgroundMusicSrc: "./assets/audio/musicTracks/gathering-darkness-kevin-macleod-main-version-04-22-8459.mp3",
            battleMusicSrc: "./assets/audio/musicTracks/battle-sword-139313.mp3",
            possibleHostiles: [
                {entity: (partyLevel, difficulty)=>{return new Skeleton({level: partyLevel, difficulty: difficulty})}, weight: 3},
                {entity: (partyLevel, difficulty)=>{return new FloatingSkull({level: partyLevel, difficulty: difficulty})}, weight: 3},
                {entity: (partyLevel, difficulty)=>{return new ArmoredSkeleton({level: partyLevel, difficulty: difficulty})}, weight: 2},
                {entity: (partyLevel, difficulty)=>{return new SkeletonCultist({level: partyLevel, difficulty: difficulty})}, weight: 2},
                {entity: (partyLevel, difficulty)=>{return new Spider({level: partyLevel, difficulty: difficulty})}, weight: 2},
            ],
            possibleEncounters: [
                {startingStage: ()=>{return new CaveIn({})}, resetOnLeave: false, weight: 2},
                {startingStage: ()=>{return new TreasureChest({})}, resetOnLeave: false, weight: 1},
                {startingStage: ()=>{return new MysteriousAltar({})}, resetOnLeave: false, weight: 1},
            ],
        });
    }
}

export class Desert extends Biome{
    constructor(config){
        super({
            name: config.name || 'desert',
            terrainSrc: './assets/media/terrain/desert.png',
            backgroundMusicSrc: "./assets/audio/musicTracks/TimTaj - Desert Prince.mp3",
            battleMusicSrc: "./assets/audio/musicTracks/TimTaj - Desert Hunt.mp3",
            possibleHostiles: [
                {entity: (partyLevel, difficulty)=>{return new DryShark({level: partyLevel, difficulty: difficulty})}, weight: 1},
                {entity: (partyLevel, difficulty)=>{return new DryEel({level: partyLevel, difficulty: difficulty})}, weight: 2},
                {entity: (partyLevel, difficulty)=>{return new SandStalker({level: partyLevel, difficulty: difficulty})}, weight: 3},
            ],
            possibleEncounters: [
                {startingStage: ()=>{return {name: 'Wandering Mercenary'}}, resetOnLeave: false, weight: 1},
                {startingStage: ()=>{return new TreasureChest({})}, resetOnLeave: false, weight: 2},
                {startingStage: ()=>{return new ShiftingSands({})}, resetOnLeave: false, weight: 3},
                {startingStage: ()=>{return new Sinkhole({})}, resetOnLeave: false, weight: 2},
            ],
        });
    }
}

export class SnowyMountains extends Biome{
    constructor(config){
        super({
            name: config.name || 'snowy mountains',
            terrainSrc: './assets/media/terrain/snowy-mountains.png',
            backgroundMusicSrc: "./assets/audio/musicTracks/nocturne-roman-main-version-16841-01-45.mp3",
            battleMusicSrc: "./assets/audio/musicTracks/battle-sword-139313.mp3",
            possibleHostiles: [
                {entity: (partyLevel, difficulty)=>{return new MadEngineer({level: partyLevel, difficulty: difficulty})}, weight: 2},
                {entity: (partyLevel, difficulty)=>{return new PanzerianKnight({level: partyLevel, difficulty: difficulty})}, weight: 1},
                {entity: (partyLevel, difficulty)=>{return new Wolf({level: partyLevel, difficulty: difficulty})}, weight: 1},
                {entity: (partyLevel, difficulty)=>{return new IcePheonix({level: partyLevel, difficulty: difficulty})}, weight: 1},
                
            ],
            possibleEncounters: [
                {startingStage: ()=>{return {name: 'Wandering Mercenary'}}, resetOnLeave: false, weight: 1},
                {startingStage: ()=>{return new TreasureChest({})}, resetOnLeave: false, weight: 1},
                {startingStage: ()=>{return new TracksInTheSnow({})}, resetOnLeave: true, weight: 1},
            ],
        });
    }
}

export class AltusCapital extends Biome{
    constructor(config){
        super({
            name: 'Altus Capital',
            terrainSrc: './assets/media/terrain/altus-capital.png',
            backgroundMusicSrc: "./assets/audio/musicTracks/Alex-Productions - Epic Cinematic Adventure Vlog _ Eglair.mp3",
            battleMusicSrc: "./assets/audio/musicTracks/battle-sword-139313.mp3",
            possibleHostiles: [
                {entity: (partyLevel, difficulty)=>{return new ArmoredSkeleton({level: partyLevel, difficulty: difficulty})}, weight: 1},
            ],
            possibleEncounters: [],
            storyEncounters: [
                {startingStage: ()=>{return new TheArtifact({})}, resetOnLeave: false},
            ]
        });
    }
}
export function generateBiome(biome){
    if(biome){
        if(biome == 'altus capital'){
            return new AltusCapital({})
        }
    }
    let chance = Math.floor(Math.random()*1);
    switch(chance){
        case 0:
            return new Plains({name: 'Altus Kingdom'});
        case 1:
            return new Cave({name: 'Infernus Valley'});
        case 2:
            return new Desert({name: 'The Dry Sea'});
        case 3:
            return new SnowyMountains({name: 'Panzeria'});
    }
}