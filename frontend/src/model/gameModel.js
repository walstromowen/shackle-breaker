import LobbyModel from "./lobbyModel.js";
import OverworldModel from "./overworldModel.js";
import BattleModel from "./battleModel.js";
import PartyModel from "./partyModel.js";
import CharacterSummaryModel from "./characterSummaryModel.js";
import EncounterModel from "./encounterModel.js";
import SaveListModel from "./saveListModel.js";

import { Entity, Traveler } from "./misc/entities.js";
import { MagicMissile, Slash, Strike, Cleave, ThrowPosionedKnife, Bite, Earthquake, ShootWeb, ShootArrow, LightningBolt, CastShadow, ExposeWeakness} from "./misc/abilities.js";
import { Dagger, ShortSword, BlacksmithHammer, ArcaneStaff, FireStaff, LightningStaff, LightStaff, LinenShirt, LinenPants, Handaxe, LeatherHelmet, LeatherHood, Shortbow, Buckler, LeatherBoots, LeatherChestplate, LeatherGloves, ClothHood, IronHelm, ForestStaff, GreatSword, IronChainmail, Item} from "./misc/items.js";
import {HealthPotion, PoisonedKnife, KurtussBrewOfMadness, StaminaPotion, MagicPotion, Antidote, AloeRemedy, Bandage, PineWood} from "./misc/items.js";

import Battle from "./misc/battle.js";
import Encounter from "./misc/encounter.js";
import Map from "./misc/map.js";
import { entityRegistry } from "./misc/registries/entityRegistry.js";
import { itemRegistry } from "./misc/registries/itemRegistry.js";



export default class GameModel{
    constructor(){
        this.props = {
            setDifficulty: this.setDifficulty.bind(this),
            setBattle: this.setBattle.bind(this),
            setEncounter: this.setEncounter.bind(this),
            setMap: this.setMap.bind(this),
            setParty: this.setParty.bind(this),
            setInventory: this.setInventory.bind(this),
            setGold: this.setGold.bind(this),
            setScreen: this.setScreen.bind(this),
            setSituation: this.setSituation.bind(this),
            setMilestones: this.setMilestones.bind(this),
            setCurrentPartyPosition: this.setCurrentPartyPosition.bind(this),
            setPreviousPartyPosition: this.setPreviousPartyPosition.bind(this),
            setNextPartyPosition: this.setNextPartyPosition.bind(this),
            getDifficulty: this.getDifficulty.bind(this),
            getBattle: this.getBattle.bind(this),
            getEncounter: this.getEncounter.bind(this),
            getMap: this.getMap.bind(this),
            getParty: this.getParty.bind(this),
            getInventory: this.getInventory.bind(this),
            getGold: this.getGold.bind(this),
            getScreen: this.getScreen.bind(this),
            getSituation: this.getSituation.bind(this),
            getMilestones: this.getMilestones.bind(this),
            getCurrentPartyPosition: this.getCurrentPartyPosition.bind(this),
            getPreviousPartyPosition: this.getPreviousPartyPosition.bind(this),
            getNextPartyPosition: this.getNextPartyPosition.bind(this),
            recruitWanderingCompanion: this.recruitWanderingCompanion.bind(this),
            calcHighestPartyLevel: this.calcHighestPartyLevel.bind(this),
            toSaveObject: this.toSaveObject.bind(this),
            fromSaveObject: this.fromSaveObject.bind(this),
            resetGame: this.resetGame.bind(this)
        }
        this.difficulty = '';
        this.battle = null;
        this.encounter = null;
        this.map = '';
        this.party = [];
        this.inventory = [];
        this.gold = 0;
        this.milestones = [];
        this.screen = 'title-screen';
        this.situation = '';
        this.currentPartyPosition = [0,0];//in Tiles
        this.previousPartyPosition = [0,0];//in Tiles
        this.nextPartyPosition = [0,0];
        this.wanderingCompanions = [
            new Entity({
                name: 'Commander Mentoras',
                apperance: './assets/media/entities/companions/commander-mentoras.jpg',
                vigor: 5,
                strength: 7,
                dexterity: 5,
                intelligence: 3,
                attunement: 5,
                factions: ['alterian'],
                currentCorruption: 0.0,
                equipment: {
                    mainHand: new GreatSword({level: 1}),
                    offhand: new GreatSword({level: 1}),
                    head: '',
                    torso: new LinenShirt({level: 1}),
                    arms: '',
                    legs: new LinenPants({level: 1}),
                    feet: new LeatherBoots({level: 1}),
                },
                abilityArray: [new ExposeWeakness({})],
            }),
            new Entity({
                name: 'Beni Hezikiah',
                apperance: './assets/media/entities/companions/beni-hezikiah.jpg',
                vigor: 5,
                strength: 5,
                dexterity: 7,
                intelligence: 5,
                attunement: 3,
                factions: ['namuh'],
                currentCorruption: 0.0,
                equipment: {
                    mainHand: new ShortSword({level: 1}),
                    offhand: '',
                    head: new LeatherHood({level: 1}),
                    torso: new LeatherChestplate({level: 1}),
                    arms: '',
                    legs: new LinenPants({level: 1}),
                    feet: new LeatherBoots({level: 1}),
                },
                abilityArray: [new CastShadow({})],
            }),
            new Entity({
                name: 'Jagar Ironson',
                apperance: './assets/media/entities/companions/companion-warrior-1.jpg',
                vigor: 7,
                strength: 5,
                dexterity: 5,
                intelligence: 5,
                attunement: 3,
                factions: ['panzerian'],
                currentCorruption: 0.0,
                equipment: {
                    mainHand: new ShortSword({level: 1}),
                    offhand: new Buckler({level: 1}),
                    head: '',
                    torso: new LinenShirt({level: 1}),
                    arms: '',
                    legs: new LinenPants({level: 1}),
                    feet: new LeatherBoots({level: 1}),
                },
            }),
            new Entity({
                name: 'Gwen Mentoras',
                apperance: './assets/media/entities/companions/gwen-mentoras.jpg',
                vigor: 5,
                strength: 3,
                dexterity: 7,
                intelligence: 5,
                attunement: 5,
                factions: ['alterian'],
                currentCorruption: 0.0,
                equipment: {
                    mainHand: new Shortbow({level: 1}),
                    offhand: new Shortbow({level: 1}),
                    head: new LeatherHood({level: 1}),
                    torso: new LinenShirt({level: 1}),
                    arms: '',
                    legs: new LinenPants({level: 1}),
                    feet: new LeatherBoots({level: 1}),
                },
            }),
            new Entity({
                name: 'Nicholi Ironson',
                apperance: './assets/media/entities/companions/companion-warrior-4.jpg',
                vigor: 5,
                strength: 7,
                dexterity: 5,
                intelligence: 3,
                attunement: 5,
                factions: ['panzerian'],
                currentCorruption: 0.0,
                equipment: {
                    mainHand: new Handaxe({level: 1}),
                    offhand: '',
                    head: new IronHelm({level: 1}),
                    torso: new LeatherChestplate({level: 1}),
                    arms: '',
                    legs: new LinenPants({level: 1}),
                    feet: new LeatherBoots({level: 1}),
                },
            }),
            new Entity({
                name: 'Dr. Darius Micolash',
                apperance: './assets/media/entities/companions/companion-mage-3.jpg',
                vigor: 5,
                strength: 3,
                dexterity: 7,
                intelligence: 7,
                attunement: 3,
                factions: ['alterian'],
                currentCorruption: 0.5,
                equipment: {
                    mainHand: new ArcaneStaff({level: 1}),
                    offhand: new Dagger({level: 1}),
                    head: '',
                    torso: new LinenShirt({level: 1}),
                    arms: '',
                    legs: new LinenPants({level: 1}),
                    feet: new LeatherBoots({level: 1}),
                },
            }),
            new Entity({
                name: 'Julian Memira',
                apperance: './assets/media/entities/companions/companion-mage-2.jpg',
                vigor: 5,
                strength: 3,
                dexterity: 5,
                intelligence: 5,
                attunement: 7,
                factions: ['alterian'],
                currentCorruption: 0.0,
                equipment: {
                    mainHand: new ForestStaff({level: 1}),
                    offhand: '',
                    head: new ClothHood({level: 1}),
                    torso: new LinenShirt({level: 1}),
                    arms: '',
                    legs: new LinenPants({level: 1}),
                    feet: new LeatherBoots({level: 1}),
                },
            }),
            new Entity({
                name: 'Revan Sekrav',
                apperance: './assets/media/entities/companions/companion-warrior-2.jpg',
                vigor: 5,
                strength: 5,
                dexterity: 7,
                intelligence: 5,
                attunement: 3,
                equipment: {
                    mainHand: new Dagger({level: 1}),
                    offhand: '',
                    head: '',
                    torso: new LeatherChestplate({level: 1}),
                    arms: new LeatherGloves({level: 1}),
                    legs: new LinenPants({level: 1}),
                    feet: new LeatherBoots({level: 1}),
                },
            }),
        ];
        this.lobbyModel = new LobbyModel(this.props);
        this.overworldModel = new OverworldModel(this.props);
        this.battleModel = new BattleModel(this.props);
        this.partyModel = new PartyModel(this.props);
        this.characterSummaryModel = new CharacterSummaryModel(this.props);
        this.encounterModel = new EncounterModel(this.props);
        this.saveListModel = new SaveListModel(this.props);
    }
    setDifficulty(difficulty){
        this.difficulty = difficulty;
    }
    setBattle(battle){
        this.battle = battle;
    }
    setEncounter(encounter){
        this.encounter = encounter;
    }
    setMap(map){
        this.map = map;
    }
    setParty(party){
        this.party = party;
    }
    setInventory(inventory){
        this.inventory = inventory;
    }
    setGold(gold){
        this.gold = gold;
    }
    setScreen(screen){
        this.screen = screen;
    }
    setSituation(situation){
        this.situation = situation;
    }
    setMilestones(milestones){
        this.milestones = milestones;
    }
    setCurrentPartyPosition(currentPartyPosition){
        this.currentPartyPosition = currentPartyPosition;
    }
    setPreviousPartyPosition(previousPartyPosition){
        this.previousPartyPosition = previousPartyPosition;
    }
    setNextPartyPosition(nextPartyPosition){
        this.nextPartyPosition = nextPartyPosition;
    }
    switchScreen(screenID){
        this.screen = screenID;
    }
    getDifficulty(){
        return this.difficulty;
    }
    getBattle(){
        return this.battle;
    }
    getEncounter(){
        return this.encounter;
    }
    getMap(){
        return this.map;
    }
    getParty(){
        return this.party;
    }
    getInventory(){
        return this.inventory;
    }
    getGold(){
        return this.gold;
    }
    getScreen(){
        return this.screen;
    }
    getSituation(){
        return this.situation;
    }
    getMilestones(){
        return this.milestones;
    }
    getCurrentPartyPosition(){
        return this.currentPartyPosition;
    }
    getPreviousPartyPosition(){
        return this.previousPartyPosition;
    }
    getNextPartyPosition(){
        return this.nextPartyPosition;
    }
    recruitWanderingCompanion(){
        let index = Math.floor(Math.random()* this.wanderingCompanions.length)
        let companion = this.wanderingCompanions[index];
        if(companion){
            this.wanderingCompanions.splice(index, 1);
            return companion;
        }
        else{
            return new Traveler({level: 1})
        }
    }
    calcHighestPartyLevel(){
        let highestLevel = 0;
        for(let i = 0; i < this.party.length; i++){
            if(this.party[i].level > highestLevel){
                highestLevel = this.party[i].level;
            }
        }
        return highestLevel;
    }
    toSaveObject(){
        return {
            difficulty: this.difficulty,
            battle: this.battle ? this.battle.toSaveObject() : null,
            encounter: this.encounter ? this.encounter.toSaveObject() : null,
            map: this.map.toSaveObject(),
            party: this.party.map((entity)=>{return entity.toSaveObject()}),      
            inventory: this.inventory.map((item)=>{return item.toSaveObject()}),
            gold: this.gold,
            screen: this.screen,
            situation: this.situation,
            milestones: this.milestones,
            wanderingCompanions: this.wanderingCompanions.map((entity)=>{return entity.toSaveObject()}),
            currentPartyPosition: this.currentPartyPosition,
            previousPartyPosition: this.previousPartyPosition,
            nextPartyPosition: this.nextPartyPosition,
            timestamp: new Date().toISOString()
        };
    }
    fromSaveObject(rawSave){
        this.difficulty = rawSave.data.difficulty;
        this.battle = rawSave.data.battle ? Battle.fromSaveObject(rawSave.data.battle) : null;
        this.encounter = rawSave.encounter ? Encounter.fromSaveObject(rawSave.encounter) : null;
        this.map = Map.fromSaveObject(rawSave.data.map);
        this.party = rawSave.data.party.map((entity) => Entity.fromSaveObject(entity, entityRegistry)),
        this.inventory = rawSave.data.inventory.map(item => Item.fromSaveObject(item, itemRegistry)),
        this.gold = rawSave.data.gold;
        this.milestones = rawSave.data.milestones;
        this.screen = rawSave.data.screen;
        this.situation = rawSave.data.situation;
        this.wanderingCompanions =  rawSave.data.wanderingCompanions.map((entity) => Entity.fromSaveObject(entity, entityRegistry));
        this.currentPartyPosition = rawSave.data.currentPartyPosition;
        this.previousPartyPosition = rawSave.data.previousPartyPosition;
        this.nextPartyPosition = rawSave.data.nextPartyPosition;
    }
    resetGame(){
        this.difficulty = '';
        this.battle = null;
        this.encounter = null;
        this.map = '';
        this.party = [];
        this.inventory = [];
        this.gold = 0;
        this.milestones = [];
        this.screen = 'title-screen';
        this.situation = '';
        this.currentPartyPosition = [0,0];//in Tiles
        this.previousPartyPosition = [0,0];//in Tiles
        this.nextPartyPosition = [0,0];
        this.wanderingCompanions = [
            new Entity({
                name: 'Commander Mentoras',
                apperance: './assets/media/entities/companions/commander-mentoras.jpg',
                vigor: 5,
                strength: 7,
                dexterity: 5,
                intelligence: 3,
                attunement: 5,
                factions: ['alterian'],
                currentCorruption: 0.0,
                equipment: {
                    mainHand: new GreatSword({level: 1}),
                    offhand: new GreatSword({level: 1}),
                    head: '',
                    torso: new LinenShirt({level: 1}),
                    arms: '',
                    legs: new LinenPants({level: 1}),
                    feet: new LeatherBoots({level: 1}),
                },
                abilityArray: [new ExposeWeakness({})],
            }),
            new Entity({
                name: 'Beni Hezikiah',
                apperance: './assets/media/entities/companions/beni-hezikiah.jpg',
                vigor: 5,
                strength: 5,
                dexterity: 7,
                intelligence: 5,
                attunement: 3,
                factions: ['namuh'],
                currentCorruption: 0.0,
                equipment: {
                    mainHand: new ShortSword({level: 1}),
                    offhand: '',
                    head: new LeatherHood({level: 1}),
                    torso: new LeatherChestplate({level: 1}),
                    arms: '',
                    legs: new LinenPants({level: 1}),
                    feet: new LeatherBoots({level: 1}),
                },
                abilityArray: [new CastShadow({})],
            }),
            new Entity({
                name: 'Jagar Ironson',
                apperance: './assets/media/entities/companions/companion-warrior-1.jpg',
                vigor: 7,
                strength: 5,
                dexterity: 5,
                intelligence: 5,
                attunement: 3,
                factions: ['panzerian'],
                currentCorruption: 0.0,
                equipment: {
                    mainHand: new ShortSword({level: 1}),
                    offhand: new Buckler({level: 1}),
                    head: '',
                    torso: new LinenShirt({level: 1}),
                    arms: '',
                    legs: new LinenPants({level: 1}),
                    feet: new LeatherBoots({level: 1}),
                },
            }),
            new Entity({
                name: 'Gwen Mentoras',
                apperance: './assets/media/entities/companions/gwen-mentoras.jpg',
                vigor: 5,
                strength: 3,
                dexterity: 7,
                intelligence: 5,
                attunement: 5,
                factions: ['alterian'],
                currentCorruption: 0.0,
                equipment: {
                    mainHand: new Shortbow({level: 1}),
                    offhand: new Shortbow({level: 1}),
                    head: new LeatherHood({level: 1}),
                    torso: new LinenShirt({level: 1}),
                    arms: '',
                    legs: new LinenPants({level: 1}),
                    feet: new LeatherBoots({level: 1}),
                },
            }),
            new Entity({
                name: 'Nicholi Ironson',
                apperance: './assets/media/entities/companions/companion-warrior-4.jpg',
                vigor: 5,
                strength: 7,
                dexterity: 5,
                intelligence: 3,
                attunement: 5,
                factions: ['panzerian'],
                currentCorruption: 0.0,
                equipment: {
                    mainHand: new Handaxe({level: 1}),
                    offhand: '',
                    head: new IronHelm({level: 1}),
                    torso: new LeatherChestplate({level: 1}),
                    arms: '',
                    legs: new LinenPants({level: 1}),
                    feet: new LeatherBoots({level: 1}),
                },
            }),
            new Entity({
                name: 'Dr. Darius Micolash',
                apperance: './assets/media/entities/companions/companion-mage-3.jpg',
                vigor: 5,
                strength: 3,
                dexterity: 7,
                intelligence: 7,
                attunement: 3,
                factions: ['alterian'],
                currentCorruption: 0.5,
                equipment: {
                    mainHand: new ArcaneStaff({level: 1}),
                    offhand: new Dagger({level: 1}),
                    head: '',
                    torso: new LinenShirt({level: 1}),
                    arms: '',
                    legs: new LinenPants({level: 1}),
                    feet: new LeatherBoots({level: 1}),
                },
            }),
            new Entity({
                name: 'Julian Memira',
                apperance: './assets/media/entities/companions/companion-mage-2.jpg',
                vigor: 5,
                strength: 3,
                dexterity: 5,
                intelligence: 5,
                attunement: 7,
                factions: ['alterian'],
                currentCorruption: 0.0,
                equipment: {
                    mainHand: new ForestStaff({level: 1}),
                    offhand: '',
                    head: new ClothHood({level: 1}),
                    torso: new LinenShirt({level: 1}),
                    arms: '',
                    legs: new LinenPants({level: 1}),
                    feet: new LeatherBoots({level: 1}),
                },
            }),
            new Entity({
                name: 'Revan Sekrav',
                apperance: './assets/media/entities/companions/companion-warrior-2.jpg',
                vigor: 5,
                strength: 5,
                dexterity: 7,
                intelligence: 5,
                attunement: 3,
                equipment: {
                    mainHand: new Dagger({level: 1}),
                    offhand: '',
                    head: '',
                    torso: new LeatherChestplate({level: 1}),
                    arms: new LeatherGloves({level: 1}),
                    legs: new LinenPants({level: 1}),
                    feet: new LeatherBoots({level: 1}),
                },
            }),
        ];
    }
}

  
        
   
       
      
        
      