

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
            getCharacterSummaryController: this.getTitleController.bind(this),
        }
        this.model = model;
        this.view = view;
        this.titleController = new TitleController(this.props);
        this.lobbyController = new LobbyController(this.props, this.model.lobbyModel, this.view.lobbyView);
        this.overworldController = new OverworldController(this.props, this.model.overworldModel, this.view.overworldView);
        this.battleController = new BattleController(this.props, this.model.battleModel, this.view.battleView)
        this.partyController = new PartyController(this.props, this.model.partyModel, this.view.partyView);
        this.characterSummaryController = new CharacterSummaryController(this.props);
    }
    switchScreen(screenId){
        this.model.switchScreen(screenId);
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
                this.partyController.onSwitchScreen();
                break;
            case 'character-summary-screen':

                break;
        }
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
}