import LobbyModel from "./lobbyModel.js";
import OverworldModel from "./overworldModel.js";
import BattleModel from "./battleModel.js";
import PartyModel from "./partyModel.js";
import CharacterSummaryModel from "./characterSummaryModel.js";
import EncounterModel from "./encounterModel.js";

import { Entity } from "./misc/entities.js";
import { MagicMissile, Slash, Strike, Cleave, ThrowPosionedKnife, Bite, Earthquake, ShootWeb, ShootArrow, LightningBolt} from "./misc/abilities.js";
import { Dagger, ShortSword, BlacksmithHammer, ArcaneStaff, FireStaff, LightningStaff, LightStaff, LinenShirt, LinenPants, Handaxe, LeatherHelmet, LeatherHood, Shortbow, Buckler, LeatherBoots, LeatherChestplate, LeatherGloves, ClothHood, IronHelm} from "./misc/items.js";
import {HealthPotion, PoisonedKnife, KurtussBrewOfMadness, StaminaPotion, MagicPotion, Antidote, AloeRemedy, Bandage, PineWood} from "./misc/items.js";






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
            getDifficulty: this.getDifficulty.bind(this),
            getBattle: this.getBattle.bind(this),
            getEncounter: this.getEncounter.bind(this),
            getMap: this.getMap.bind(this),
            getParty: this.getParty.bind(this),
            getInventory: this.getInventory.bind(this),
            getGold: this.getGold.bind(this),
            getScreen: this.getScreen.bind(this),
            getSituation: this.getSituation.bind(this),
            recruitWanderingCompanion: this.recruitWanderingCompanion.bind(this),
            calcHighestPartyLevel: this.calcHighestPartyLevel.bind(this),
        }
        this.difficulty = '';
        this.battle = '';
        this.encounter = '';
        this.map = '';
        this.party = [];
        this.inventory = [];
        this.gold = 0;
        this.screen = 'title-screen';
        this.lobbyModel = new LobbyModel(this.props);
        this.overworldModel = new OverworldModel(this.props);
        this.battleModel = new BattleModel(this.props);
        this.partyModel = new PartyModel(this.props);
        this.characterSummaryModel = new CharacterSummaryModel(this.props);
        this.encounterModel = new EncounterModel(this.props);
        this.situation = '';
        this.wanderingCompanions = [
            new Entity({
                name: 'Ragnar Ironson',
                apperance: './assets/media/entities/companion-warrior-1.jpg',
                vigor: 7,
                strength: 5,
                dexterity: 5,
                intelligence: 5,
                attunement: 3,
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
                name: 'Nicholi Ironson',
                apperance: './assets/media/entities/companion-warrior-4.jpg',
                vigor: 5,
                strength: 7,
                dexterity: 5,
                intelligence: 3,
                attunement: 5,
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
                name: 'Julian Memira',
                apperance: './assets/media/entities/companion-warrior-3.jpg',
                vigor: 5,
                strength: 3,
                dexterity: 5,
                intelligence: 7,
                attunement: 5,
                equipment: {
                    mainHand: new LightStaff({level: 1}),
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
                apperance: './assets/media/entities/companion-warrior-2.jpg',
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
            new Entity({
                name: 'Gwen Swallowtail',
                apperance: './assets/media/entities/companion-rogue-1.jpg',
                vigor: 5,
                strength: 3,
                dexterity: 7,
                intelligence: 5,
                attunement: 5,
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
        ];
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
    recruitWanderingCompanion(){
        let index = Math.floor(Math.random()* this.wanderingCompanions.length)
        let companion = this.wanderingCompanions[index];
        this.wanderingCompanions.splice(index, 1);
        return companion;
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
}