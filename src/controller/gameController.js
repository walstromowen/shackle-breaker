

import TitleController from "./titleController.js";
import LobbyController from "./lobbyController.js";
import OverworldController from "./overworldController.js";
import BattleController from "./battleController.js";
import PartyController from "./partyController.js";
import CharacterSummaryController from "./characterSummaryController.js";

export default class GameController{
    constructor(model, view){
        this.props = {
            switchScreen: this.switchScreen.bind(this),
            getTitleController: this.getTitleController.bind(this),
            getLobbyController: this.getLobbyController.bind(this),
            getOverworldController: this.getOverworldController.bind(this),
            getBattleController: this.getBattleController.bind(this),
            getPartyController: this.getPartyController.bind(this),
            getCharacterSummaryController: this.getCharacterSummaryController.bind(this),
            updateMiniMenu: this.updateMiniMenu.bind(this),
        }
        this.model = model;
        this.view = view;
        this.titleController = new TitleController(this.props);
        this.lobbyController = new LobbyController(this.props, this.model.lobbyModel, this.view.lobbyView);
        this.overworldController = new OverworldController(this.props, this.model.overworldModel, this.view.overworldView);
        this.battleController = new BattleController(this.props, this.model.battleModel, this.view.battleView)
        this.partyController = new PartyController(this.props, this.model.partyModel, this.view.partyView);
        this.characterSummaryController = new CharacterSummaryController(this.props, this.model.characterSummaryModel, this.view.characterSummaryView);
        this.initialize();
    }
    initialize(){
        document.getElementById('inventory-mini-menu-overview-button').addEventListener('click', ()=>{
            document.getElementById('inventory-mini-menu-stats-tab').style.display = 'none';
            document.getElementById('inventory-mini-menu-abilities-tab').style.display = 'none';
            document.getElementById('inventory-mini-menu-overview-tab').style.display = 'flex';
        });
        document.getElementById('inventory-mini-menu-stats-button').addEventListener('click', ()=>{
            document.getElementById('inventory-mini-menu-overview-tab').style.display = 'none';
            document.getElementById('inventory-mini-menu-abilities-tab').style.display = 'none';
            document.getElementById('inventory-mini-menu-stats-tab').style.display = 'flex'; 
        });
        document.getElementById('inventory-mini-menu-abilities-button').addEventListener('click', ()=>{
            document.getElementById('inventory-mini-menu-overview-tab').style.display = 'none';
            document.getElementById('inventory-mini-menu-stats-tab').style.display = 'none';
            document.getElementById('inventory-mini-menu-abilities-tab').style.display = 'flex';
        });
    }
    switchScreen(screenId){
        switch(screenId){
            case 'loading-screen':
                //no model
                break;
            case 'title-screen':
                //no model
                break;
            case 'lobby-screen':
                this.lobbyController.onSwitchScreen();
                break;
            case 'overworld-screen':
                this.overworldController.onSwitchScreen();
                break;
            case 'battle-screen':
                this.battleController.onSwitchScreen();
                break;
            case 'party-screen':
                if(this.model.getScreen() == 'character-summary-screen' && this.model.getSituation() == 'battle'){
                    //Do nothing if coming from summary in a battle or encounter
                }else{
                    this.partyController.onSwitchScreen();
                }
                break;
            case 'character-summary-screen':
                this.characterSummaryController.onSwitchScreen();
                break;
        }
        this.model.switchScreen(screenId);
        this.view.switchScreen(screenId);
    }
    getTitleController(){
        return this.titleController;
    }
    getLobbyController(){
        return this.lobbyController;
    }
    getOverworldController(){
        return this.overworldController;
    }
    getBattleController(){
        return this.battleController;
    }   
    getPartyController(){
        return this.partyController;
    }
    getCharacterSummaryController(){
        return this.characterSummaryController;
    }
    updateMiniMenu(item){
        this.view.updateMiniMenu(item);
    }
}