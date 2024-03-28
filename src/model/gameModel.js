import LobbyModel from "./lobbyModel.js";
import OverworldModel from "./overworldModel.js";
import BattleModel from "./battleModel.js";

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
            getDifficulty: this.getDifficulty.bind(this),
            getBattle: this.getBattle.bind(this),
            getEncounter: this.getEncounter.bind(this),
            getMap: this.getMap.bind(this),
            getParty: this.getParty.bind(this),
            getInventory: this.getInventory.bind(this),
            getGold: this.getGold.bind(this),
            getScreen: this.getScreen.bind(this),
            calcAveragePartyLevel: this.calcAveragePartyLevel.bind(this),
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
    calcAveragePartyLevel(){
        let sum = 0;
        for(let i = 0; i < this.party.length; i++){
            sum = sum + this.party[i].level;
        }
        let average = Math.floor(sum/this.party.length);
        return average;
    }
}