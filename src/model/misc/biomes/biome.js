import { getRandomArrayElementWeighted } from "../../../utility.js";

import Tile from "../tile.js";

import { Dagger, ShortSword, BlacksmithHammer, ArcaneStaff, FireStaff, LightningStaff, LightStaff, LinenShirt, LinenPants, Handaxe, LeatherHelmet, LeatherHood, Shortbow, Buckler, GreatSword, LeatherChestplate, LeatherGreaves, LeatherBoots, DarkStaff, IceStaff, ForestStaff, IronHelm, IronChainmail, IronGauntlets, IronGreaves, IronBoots, ClothHood, ClothRobe, BearTrap, Flintlock, SmokeBomb, ScrollOfInferno, ScrollOfHailStorm, ScrollOfCastShadow, IronSheild} from "../items.js";
import {HealthPotion, PoisonedKnife, KurtussBrewOfMadness, StaminaPotion, MagicPotion, Antidote, ParalysisTonic, AloeRemedy, Bandage, PineWood, Pelt, IronOre, Diamond} from "../items.js";
import Encounter from "../encounters/encounter.js";
import Battle from "../battle.js";

import {WanderingMercenary} from "../encounters/wanderingMercenary.js";
import { Aftermath } from "../encounters/aftermath.js";


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
        this.layoutWidth = config.layoutWidth || 16;
        this.layoutHeight = config.layoutHeight || 10;
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
            {item: ()=>{return new IronSheild({level: 1})}, weight: 1},
            {item: ()=>{return new Dagger({level: 1})}, weight: 1},
            {item: ()=>{return new BlacksmithHammer({level: 1})}, weight: 1},

            {item: ()=>{return new KurtussBrewOfMadness()}, weight: 1},
            {item: ()=>{return new PoisonedKnife()}, weight: 1},
            {item: ()=>{return new BearTrap()}, weight: 1},
            {item: ()=>{return new SmokeBomb()}, weight: 1},
            {item: ()=>{return new ScrollOfInferno()}, weight: 1},
            {item: ()=>{return new ScrollOfHailStorm()}, weight: 1},
            {item: ()=>{return new ScrollOfCastShadow()}, weight: 1},

            {item: ()=>{return new HealthPotion()}, weight: 2},
            {item: ()=>{return new StaminaPotion()}, weight: 2},
            {item: ()=>{return new MagicPotion()}, weight: 2},

            {item: ()=>{return new Bandage()}, weight: 2},
            {item: ()=>{return new Antidote()}, weight: 1},
            {item: ()=>{return new ParalysisTonic()}, weight: 1},
            
            {item: ()=>{return new Diamond()}, weight: 1},
        ];
        this.wallMap = {
            //1 neigboring tile
            '1,0,0,0,0,0,0,0':  [6,0],
            '0,1,0,0,0,0,0,0':  [0,4],
            '0,0,1,0,0,0,0,0':  [6,0],
            '0,0,0,1,0,0,0,0':  [1,3],
            '0,0,0,0,1,0,0,0':  [1,4],
            '0,0,0,0,0,1,0,0':  [6,0],
            '0,0,0,0,0,0,1,0':  [0,3],
            '0,0,0,0,0,0,0,1':  [6,0],
            //2 neigboring tiles
            '1,1,0,0,0,0,0,0':  [0,4],
            '1,0,1,0,0,0,0,0':  [6,0],
            '1,0,0,1,0,0,0,0':  [1,3],
            '1,0,0,0,1,0,0,0':  [1,4],
            '1,0,0,0,0,1,0,0':  [6,0],
            '1,0,0,0,0,0,1,0':  [0,3],
            '1,0,0,0,0,0,0,1':  [6,0],
            '0,1,1,0,0,0,0,0':  [0,4],
            '0,1,0,1,0,0,0,0':  [5,4],
            '0,1,0,0,1,0,0,0':  [4,4],
            '0,1,0,0,0,1,0,0':  [0,4],
            '0,1,0,0,0,0,1,0':  [4,2],
            '0,1,0,0,0,0,0,1':  [0,4],
            '0,0,1,1,0,0,0,0':  [1,3],
            '0,0,1,0,1,0,0,0':  [1,4],
            '0,0,1,0,0,1,0,0':  [6,0],
            '0,0,1,0,0,0,1,0':  [0,3],
            '0,0,1,0,0,0,0,1':  [6,0],
            '0,0,0,1,1,0,0,0':  [4,1],
            '0,0,0,1,0,1,0,0':  [1,3],
            '0,0,0,1,0,0,1,0':  [5,3],
            '0,0,0,1,0,0,0,1':  [1,3],
            '0,0,0,0,1,1,0,0':  [1,4],
            '0,0,0,0,1,0,1,0':  [4,3],
            '0,0,0,0,1,0,0,1':  [1,4],
            '0,0,0,0,0,1,1,0':  [0,3],
            '0,0,0,0,0,1,0,1':  [6,0],
            '0,0,0,0,0,0,1,1':  [0,3],
        // 3 neigboring tiles = 56
            '1,1,1,0,0,0,0,0':  [0,4],
            '1,1,0,1,0,0,0,0':  [1,2],
            '1,1,0,0,1,0,0,0':  [4,4],
            '1,1,0,0,0,1,0,0':  [0,4],
            '1,1,0,0,0,0,1,0':  [4,2],
            '1,1,0,0,0,0,0,1':  [0,4],
            '1,0,1,1,0,0,0,0':  [1,3],
            '1,0,1,0,1,0,0,0':  [1,4],
            '1,0,1,0,0,1,0,0':  [6,0],
            '1,0,1,0,0,0,1,0':  [0,3],
            '1,0,1,0,0,0,0,1':  [6,0],
            '1,0,0,1,1,0,0,0':  [4,1],
            '1,0,0,1,0,1,0,0':  [1,3],
            '1,0,0,1,0,0,1,0':  [5,3],
            '1,0,0,1,0,0,0,1':  [1,3],
            '1,0,0,0,1,1,0,0':  [1,4],
            '1,0,0,0,1,0,1,0':  [4,3],
            '1,0,0,0,1,0,0,1':  [1,4],
            '1,0,0,0,0,1,1,0':  [0,3],
            '1,0,0,0,0,1,0,1':  [6,0],
            '1,0,0,0,0,0,1,1':  [0,3],
            '0,1,1,1,0,0,0,0':  [5,4],
            '0,1,1,0,1,0,0,0':  [0,2],
            '0,1,1,0,0,1,0,0':  [0,4],
            '0,1,1,0,0,0,1,0':  [4,2],
            '0,1,1,0,0,0,0,1':  [0,4],
            '0,1,0,1,1,0,0,0':  [2,6],
            '0,1,0,1,0,1,0,0':  [5,4],
            '0,1,0,1,0,0,1,0':  [1,6],
            '0,1,0,1,0,0,0,1':  [5,4],
            '0,1,0,0,1,1,0,0':  [4,4],
            '0,1,0,0,1,0,1,0':  [0,6],
            '0,1,0,0,1,0,0,1':  [4,4],
            '0,1,0,0,0,1,1,0':  [4,2],
            '0,1,0,0,0,1,0,1':  [0,4],
            '0,1,0,0,0,0,1,1':  [4,2],
            '0,0,1,1,1,0,0,0':  [4,1],
            '0,0,1,1,0,1,0,0':  [1,3],
            '0,0,1,1,0,0,1,0':  [5,3],
            '0,0,1,1,0,0,0,1':  [1,3],
            '0,0,1,0,1,1,0,0':  [1,4],
            '0,0,1,0,1,0,1,0':  [4,3],
            '0,0,1,0,1,0,0,1':  [1,4],
            '0,0,1,0,0,1,1,0':  [0,3],
            '0,0,1,0,0,1,0,1':  [6,0],
            '0,0,1,0,0,0,1,1':  [0,3],
            '0,0,0,1,1,1,0,0':  [4,1],
            '0,0,0,1,1,0,1,0':  [3,6],
            '0,0,0,1,1,0,0,1':  [4,1],
            '0,0,0,1,0,1,1,0':  [1,1],
            '0,0,0,1,0,1,0,1':  [1,3],
            '0,0,0,1,0,0,1,1':  [5,3],
            '0,0,0,0,1,1,1,0':  [4,3],
            '0,0,0,0,1,1,0,1':  [1,4],
            '0,0,0,0,1,0,1,1':  [0,1],
            '0,0,0,0,0,1,1,1':  [0,3],
        //4 neighboring walls = 70  
            '1,1,1,1,0,0,0,0':  [1,2],
            '1,1,1,0,1,0,0,0':  [0,2],
            '1,1,1,0,0,1,0,0':  [0,4],
            '1,1,1,0,0,0,1,0':  [4,2],
            '1,1,1,0,0,0,0,1':  [0,4],
            '1,1,0,1,1,0,0,0':  [6,3],
            '1,1,0,1,0,1,0,0':  [1,2],
            '1,1,0,1,0,0,1,0':  [5,2],
            '1,1,0,1,0,0,0,1':  [1,2],
            '1,1,0,0,1,1,0,0':  [4,4],
            '1,1,0,0,1,0,1,0':  [0,6],
            '1,1,0,0,1,0,0,1':  [4,4],
            '1,1,0,0,0,1,1,0':  [4,2],
            '1,1,0,0,0,1,0,1':  [0,4],
            '1,1,0,0,0,0,1,1':  [4,2],
            '1,0,1,1,1,0,0,0':  [4,1],
            '1,0,1,1,0,1,0,0':  [1,3],
            '1,0,1,1,0,0,1,0':  [5,3],
            '1,0,1,1,0,0,0,1':  [1,3],
            '1,0,1,0,1,1,0,0':  [1,4],
            '1,0,1,0,1,0,1,0':  [4,3],
            '1,0,1,0,1,0,0,1':  [1,4],
            '1,0,1,0,0,1,1,0':  [0,3],
            '1,0,1,0,0,1,0,1':  [6,0],
            '1,0,1,0,0,0,1,1':  [0,3],
            '1,0,0,1,1,1,0,0':  [4,1],
            '1,0,0,1,1,0,1,0':  [3,6],
            '1,0,0,1,1,0,0,1':  [4,1],
            '1,0,0,1,0,1,1,0':  [1,1],
            '1,0,0,1,0,1,0,1':  [1,3],
            '1,0,0,1,0,0,1,1':  [5,3],
            '1,0,0,0,1,1,1,0':  [4,3],
            '1,0,0,0,1,1,0,1':  [1,4],
            '1,0,0,0,1,0,1,1':  [0,1],
            '1,0,0,0,0,1,1,1':  [0,3],
            '0,1,1,1,1,0,0,0':  [6,4],
            '0,1,1,1,0,1,0,0':  [5,4],
            '0,1,1,1,0,0,1,0':  [1,6],
            '0,1,1,1,0,0,0,1':  [5,4],
            '0,1,1,0,1,1,0,0':  [0,2],
            '0,1,1,0,1,0,1,0':  [6,2],
            '0,1,1,0,1,0,0,1':  [0,2],
            '0,1,1,0,0,1,1,0':  [4,2],
            '0,1,1,0,0,1,0,1':  [0,4],
            '0,1,1,0,0,0,1,1':  [4,2],
            '0,1,0,1,1,1,0,0':  [2,6],
            '0,1,0,1,1,0,1,0':  [2,5],
            '0,1,0,1,1,0,0,1':  [2,6],
            '0,1,0,1,0,1,1,0':  [0,5],
            '0,1,0,1,0,1,0,1':  [5,4],
            '0,1,0,1,0,0,1,1':  [1,6],
            '0,1,0,0,1,1,1,0':  [0,6],
            '0,1,0,0,1,1,0,1':  [4,4],
            '0,1,0,0,1,0,1,1':  [1,5],
            '0,1,0,0,0,1,1,1':  [4,2],
            '0,0,1,1,1,1,0,0':  [4,1],
            '0,0,1,1,1,0,1,0':  [3,6],
            '0,0,1,1,1,0,0,1':  [4,1],
            '0,0,1,1,0,1,1,0':  [1,1],
            '0,0,1,1,0,1,0,1':  [1,3],
            '0,0,1,1,0,0,1,1':  [5,3],
            '0,0,1,0,1,1,1,0':  [4,3],
            '0,0,1,0,1,1,0,1':  [1,4],
            '0,0,1,0,1,0,1,1':  [0,1],
            '0,0,1,0,0,1,1,1':  [0,3],
            '0,0,0,1,1,1,1,0':  [5,1],
            '0,0,0,1,1,1,0,1':  [4,1],
            '0,0,0,1,1,0,1,1':  [6,1],
            '0,0,0,1,0,1,1,1':  [1,1],
            '0,0,0,0,1,1,1,1':  [0,1],
        //5 neighboring tiles = 56
            '0,0,0,1,1,1,1,1':  [2,0],
            '0,0,1,0,1,1,1,1':  [0,1],
            '0,0,1,1,0,1,1,1':  [1,1],
            '0,0,1,1,1,0,1,1':  [6,1],
            '0,0,1,1,1,1,0,1':  [4,1],
            '0,0,1,1,1,1,1,0':  [5,1],
            '0,1,0,0,1,1,1,1':  [1,5],
            '0,1,0,1,0,1,1,1':  [0,5],
            '0,1,0,1,1,0,1,1':  [5,5],
            '0,1,0,1,1,1,0,1':  [2,6],
            '0,1,0,1,1,1,1,0':  [6,5],
            '0,1,1,0,0,1,1,1':  [4,2],
            '0,1,1,0,1,0,1,1':  [5,0],
            '0,1,1,0,1,1,0,1':  [0,2],
            '0,1,1,0,1,1,1,0':  [6,2],
            '0,1,1,1,0,0,1,1':  [1,6],
            '0,1,1,1,0,1,0,1':  [5,4],
            '0,1,1,1,0,1,1,0':  [0,5],
            '0,1,1,1,1,0,0,1':  [6,4],
            '0,1,1,1,1,0,1,0':  [4,5],
            '0,1,1,1,1,1,0,0':  [6,4],
            '1,0,0,0,1,1,1,1':  [0,1],
            '1,0,0,1,0,1,1,1':  [1,1],
            '1,0,0,1,1,0,1,1':  [6,1],
            '1,0,0,1,1,1,0,1':  [4,1],
            '1,0,0,1,1,1,1,0':  [5,1],
            '1,0,1,0,0,1,1,1':  [0,3],
            '1,0,1,0,1,0,1,1':  [0,1],
            '1,0,1,0,1,1,0,1':  [1,4],
            '1,0,1,0,1,1,1,0':  [4,3],
            '1,0,1,1,0,0,1,1':  [5,3],
            '1,0,1,1,0,1,0,1':  [1,3],
            '1,0,1,1,0,1,1,0':  [1,1],
            '1,0,1,1,1,0,0,1':  [4,1],
            '1,0,1,1,1,0,1,0':  [3,6],
            '1,0,1,1,1,1,0,0':  [4,1],
            '1,1,0,0,0,1,1,1':  [4,2],
            '1,1,0,0,1,0,1,1':  [1,5],
            '1,1,0,0,1,1,0,1':  [4,4],
            '1,1,0,0,1,1,1,0':  [0,6],
            '1,1,0,1,0,0,1,1':  [5,2],
            '1,1,0,1,0,1,0,1':  [1,2],
            '1,1,0,1,0,1,1,0':  [4,0],
            '1,1,0,1,1,0,0,1':  [6,3],
            '1,1,0,1,1,0,1,0':  [3,5],
            '1,1,0,1,1,1,0,0':  [6,3],
            '1,1,1,0,0,0,1,1':  [4,2],
            '1,1,1,0,0,1,0,1':  [0,4],
            '1,1,1,0,0,1,1,0':  [4,2],
            '1,1,1,0,1,0,0,1':  [0,2],
            '1,1,1,0,1,0,1,0':  [6,2],
            '1,1,1,0,1,1,0,0':  [0,2],
            '1,1,1,1,0,0,0,1':  [1,2],
            '1,1,1,1,0,0,1,0':  [5,2],
            '1,1,1,1,0,1,0,0':  [1,2],
            '1,1,1,1,1,0,0,0':  [3,0],
        //6 neigboring walls = 28
            '0,0,1,1,1,1,1,1':  [2,0],
            '0,1,0,1,1,1,1,1':  [3,3],
            '0,1,1,0,1,1,1,1':  [5,0],
            '0,1,1,1,0,1,1,1':  [0,5],
            '0,1,1,1,1,0,1,1':  [3,4],
            '0,1,1,1,1,1,0,1':  [6,4],
            '0,1,1,1,1,1,1,0':  [4,6],
            '1,0,0,1,1,1,1,1':  [2,0],
            '1,0,1,0,1,1,1,1':  [0,1],
            '1,0,1,1,0,1,1,1':  [1,1],
            '1,0,1,1,1,0,1,1':  [6,1],
            '1,0,1,1,1,1,0,1':  [4,1],
            '1,0,1,1,1,1,1,0':  [5,1],
            '1,1,0,0,1,1,1,1':  [1,5],
            '1,1,0,1,0,1,1,1':  [4,0],
            '1,1,0,1,1,0,1,1':  [5,6],
            '1,1,0,1,1,1,0,1':  [6,3],
            '1,1,0,1,1,1,1,0':  [2,4],
            '1,1,1,0,0,1,1,1':  [4,2],
            '1,1,1,0,1,0,1,1':  [5,0],
            '1,1,1,0,1,1,0,1':  [0,2],
            '1,1,1,0,1,1,1,0':  [6,2],
            '1,1,1,1,0,0,1,1':  [5,2],
            '1,1,1,1,0,1,0,1':  [1,2],
            '1,1,1,1,0,1,1,0':  [4,0],
            '1,1,1,1,1,0,0,1':  [3,0],
            '1,1,1,1,1,0,1,0':  [2,3],
            '1,1,1,1,1,1,0,0':  [3,0],
        //7 neighboring walls = 8
            '0,1,1,1,1,1,1,1':  [3,2],
            '1,0,1,1,1,1,1,1':  [2,0],
            '1,1,0,1,1,1,1,1':  [2,2],
            '1,1,1,0,1,1,1,1':  [5,0],
            '1,1,1,1,0,1,1,1':  [4,0],
            '1,1,1,1,1,0,1,1':  [3,1],
            '1,1,1,1,1,1,0,1':  [3,0],
            '1,1,1,1,1,1,1,0':  [2,1],
        //8 neighboring walls = 1
            '1,1,1,1,1,1,1,1':  [1,0],
        //0 neighboring walls = 1
            '0,0,0,0,0,0,0,0':  [6,0],
        }
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
        if(startingStage.name == 'Aftermath'){
            let entity = fn()
            return new Encounter(new Aftermath({entity: entity}), encounter.resetOnLeave) 
        }
        return new Encounter(startingStage, encounter.resetOnLeave)   
    }
    generateStoryEncounter(){
        let encounter = this.storyEncounters[0];
        this.storyEncounters.splice(0,1);
        let startingStage = encounter.startingStage();
        return new Encounter(startingStage, encounter.resetOnLeave)   
    }
    createEmptyTileSet(){
        let tileSet = [];
        for(let y = 0; y < this.layoutHeight; y++){
            let row = [];
            for(let x = 0; x < this.layoutWidth; x++){
                row.push(new Tile({position: [x, y]}))
            }
            tileSet.push(row)
        }
        return tileSet;
    }

    connectWalls(tileSet){
        for(let y = 0; y < tileSet.length; y++){
            for(let x = 0; x < tileSet[0].length; x++){
                if(tileSet[y][x].mapObject){
                    console.log(tileSet[y][x].mapObject.name)
                    if(tileSet[y][x].mapObject.name == 'wall'){
                        let imageCoordinates = this.wallMap[this.getNeighboringTiles(tileSet, x, y)]
                        tileSet[y][x].mapObject.imageCoordinates = imageCoordinates;
                    }
                   
                }
            }
        }
    }
    getNeighboringTiles(tileSet, x, y){
        let neighboringTiles = [];

        if(y-1 >= 0 && x-1 >= 0){ //Top left
            if(tileSet[y-1][x-1].mapObject){
                if(tileSet[y-1][x-1].mapObject.name == 'wall' || tileSet[y-1][x-1].mapObject.name == 'entrance' || tileSet[y-1][x-1].mapObject.name == 'exit')neighboringTiles.push(1)
                else neighboringTiles.push(0) 
            }else neighboringTiles.push(0) 
        }else neighboringTiles.push(1)
    
        if(y-1 >= 0){//Top Center
            if(tileSet[y-1][x].mapObject){
                if(tileSet[y-1][x].mapObject.name == 'wall' || tileSet[y-1][x].mapObject.name == 'entrance' || tileSet[y-1][x].mapObject.name == 'exit')neighboringTiles.push(1)
                else neighboringTiles.push(0) 
            }else neighboringTiles.push(0) 
        }else neighboringTiles.push(1)

        if(y-1 >= 0 && x+1 < tileSet[0].length){//Top Right
            if(tileSet[y-1][x+1].mapObject){
                if(tileSet[y-1][x+1].mapObject.name == 'wall' || tileSet[y-1][x+1].mapObject.name == 'entrance' || tileSet[y-1][x+1].mapObject.name == 'exit')neighboringTiles.push(1)
                else neighboringTiles.push(0) 
            }else neighboringTiles.push(0) 
        }else neighboringTiles.push(1)

        if(x-1 >= 0){//Left
            if(tileSet[y][x-1].mapObject){
                if(tileSet[y][x-1].mapObject.name == 'wall' || tileSet[y][x-1].mapObject.name == 'entrance' || tileSet[y][x-1].mapObject.name == 'exit')neighboringTiles.push(1)
                else neighboringTiles.push(0) 
            }else neighboringTiles.push(0) 
        }else neighboringTiles.push(1)

        if(x+1 < tileSet[0].length){//Right
            if(tileSet[y][x+1].mapObject){
                if(tileSet[y][x+1].mapObject.name == 'wall' || tileSet[y][x+1].mapObject.name == 'entrance' || tileSet[y][x+1].mapObject.name == 'exit')neighboringTiles.push(1)
                else neighboringTiles.push(0) 
            }else neighboringTiles.push(0) 
        }else neighboringTiles.push(1)

        if(y+1 < tileSet.length && x-1 >= 0){//Bottom left
            if(tileSet[y+1][x-1].mapObject){
                if(tileSet[y+1][x-1].mapObject.name == 'wall' || tileSet[y+1][x-1].mapObject.name == 'entrance' || tileSet[y+1][x-1].mapObject.name == 'exit')neighboringTiles.push(1)
                else neighboringTiles.push(0) 
            }else neighboringTiles.push(0) 
        }else neighboringTiles.push(1)

        if(y+1 < tileSet.length){//Bottom Center 
            if(tileSet[y+1][x].mapObject){
                if(tileSet[y+1][x].mapObject.name == 'wall' || tileSet[y+1][x].mapObject.name == 'entrance' || tileSet[y+1][x].mapObject.name == 'exit')neighboringTiles.push(1)
                else neighboringTiles.push(0) 
            }else neighboringTiles.push(0) 
        }else neighboringTiles.push(1)

        if(y+1 < tileSet.length && x+1 < tileSet[0].length){//Bottom Right
            if(tileSet[y+1][x+1].mapObject){
                if(tileSet[y+1][x+1].mapObject.name == 'wall' || tileSet[y+1][x+1].mapObject.name == 'entrance' || tileSet[y+1][x+1].mapObject.name == 'exit')neighboringTiles.push(1)
                else neighboringTiles.push(0) 
            }else neighboringTiles.push(0) 
        }else neighboringTiles.push(1)
        return neighboringTiles.toString();
    }  
   
    placeStructure(tileSet, structureMap, blockedTileTypes){
        let desiredX = Math.floor(Math.random()*(tileSet[0].length - structureMap[0].length - 1)) + 1; //+ 1 -1 for edge buffer
        let desiredY = Math.floor(Math.random()*(tileSet.length - structureMap.length - 1)) + 1;
        for(let y = 0; y < structureMap.length; y++){
            for(let x = 0; x < structureMap[y].length; x++){
                for(let i = 0; i < blockedTileTypes.length; i++){
                    if(tileSet[desiredY + y][desiredX + x].mapObject){
                        if(tileSet[desiredY + y][desiredX + x].mapObject.name == blockedTileTypes[i]){
                            return this.placeStructure(tileSet, structureMap, blockedTileTypes)
                        }
                    }
                }
            }
        }
        for(let y = 0; y < structureMap.length; y++){
            for(let x = 0; x < structureMap[y].length; x++){
                structureMap[y][x].position = [desiredX + x, desiredY + y]
                
                tileSet[desiredY + y][desiredX + x] = structureMap[y][x]
            }
        }
    }
}