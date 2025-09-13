

import TitleController from "./titleController.js";
import LobbyController from "./lobbyController.js";
import OverworldController from "./overworldController.js";
import BattleController from "./battleController.js";
import PartyController from "./partyController.js";
import CharacterSummaryController from "./characterSummaryController.js";
import EncounterController from "./encounterController.js";
import MapChangeController from "./mapChangeController.js";
import SaveListController from "./saveListController.js";

export default class GameController{
    constructor(model, view){
        this.props = {
            baseURL: 'https://shackle-breaker-backend.onrender.com',
            switchScreen: this.switchScreen.bind(this),
            getTitleController: this.getTitleController.bind(this),
            getLobbyController: this.getLobbyController.bind(this),
            getOverworldController: this.getOverworldController.bind(this),
            getBattleController: this.getBattleController.bind(this),
            getPartyController: this.getPartyController.bind(this),
            getCharacterSummaryController: this.getCharacterSummaryController.bind(this),
            getEncounterController: this.getEncounterController.bind(this),
            updateMiniMenu: this.updateMiniMenu.bind(this),
            updateAbilityMenu: this.updateAbilityMenu.bind(this),
            positionPopUpElement: this.positionPopUpElement.bind(this),
        }
        this.model = model;
        this.view = view;
        this.titleController = new TitleController(this.props);
        this.lobbyController = new LobbyController(this.props, this.model.lobbyModel, this.view.lobbyView);
        this.overworldController = new OverworldController(this.props, this.model.overworldModel, this.view.overworldView);
        this.battleController = new BattleController(this.props, this.model.battleModel, this.view.battleView)
        this.partyController = new PartyController(this.props, this.model.partyModel, this.view.partyView);
        this.characterSummaryController = new CharacterSummaryController(this.props, this.model.characterSummaryModel, this.view.characterSummaryView);
        this.encounterController = new EncounterController(this.props, this.model.encounterModel, this.view.encounterView);
        this.saveListController = new SaveListController(this.props, this.model.saveListModel, this.view.saveListView);
        this.mapChangeController = new MapChangeController(this.props);
        

        this.attributeStatPopUpExitEventHandler;

        this.initialize();
    }
    initialize(){
        window.addEventListener('resize', ()=>{
            this.view.resize();
        });
        document.querySelectorAll('.attribute-stat-pop-up').forEach((node)=>{
            node.addEventListener('mouseenter', (e)=>{
                e.preventDefault()
                let popUpMenu = document.getElementById('attribute-stat-pop-up-menu');
                this.view.updateAttributeStatPopUp(node);
                popUpMenu.style.display = 'flex';
                this.positionPopUpElement(popUpMenu, node);
                node.addEventListener('mouseleave', this.attributeStatPopUpExitEventHandler = (ev)=>{
                    node.removeEventListener('mouseleave', this.attributeStatPopUpExitEventHandler);
                    popUpMenu.style.display = 'none';
                });
            });
        });
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
        this.switchScreenHelpper(screenId).then(()=>{
            this.model.switchScreen(screenId);
            this.view.switchScreen(screenId);
        })
    }
    switchScreenHelpper(screenId){
        switch(screenId){
            case 'loading-screen':
                return Promise.resolve();
            case 'title-screen':
                return this.titleController.onSwitchScreen();
            case 'save-list-screen':
                return  this.saveListController.onSwitchScreen();
            case 'lobby-screen':
                return this.lobbyController.onSwitchScreen();
            case 'overworld-screen':
                return  this.overworldController.onSwitchScreen();
            case 'battle-screen':
                return  this.battleController.onSwitchScreen();
            case 'party-screen':
                if(this.model.getScreen() == 'character-summary-screen' && (this.model.getSituation() == 'battle' || this.model.getSituation() == 'encounter')){
                    return Promise.resolve();
                }else{
                    return this.partyController.onSwitchScreen();
                }
            case 'character-summary-screen':
                return this.characterSummaryController.onSwitchScreen();
            case 'encounter-screen':
                if(this.model.getScreen() != 'party-screen'){
                    return this.encounterController.onSwitchScreen();
                }
                return Promise.resolve();
            case 'map-change-screen':
                return Promise.resolve();
            default:
                return Promise.resolve();
            }
            
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
    getEncounterController(){
        return this.encounterController;
    }
    updateMiniMenu(item, currentCharacter){
        this.view.updateMiniMenu(item);
        let abilitySlots =  document.querySelectorAll('.inventory-mini-menu-ability-slot');
        if(item.itemSubset !='material'){
            for(let i = 0; i < item.abilityArray.length; i++){
                abilitySlots[i].addEventListener('mouseenter', ()=>{
                    let abilityMenu = document.getElementById('ability-mini-menu')
                    this.updateAbilityMenu(item.abilityArray[i], currentCharacter)
                    this.positionPopUpElement(abilityMenu, abilitySlots[i])
                    abilityMenu.style.display = 'flex';
                    abilitySlots[i].addEventListener('mouseleave', ()=>{
                        abilityMenu.style.display = 'none';
                    });
                });
            }
        }
    }
    updateAbilityMenu(ability, entity){
        this.view.updateAbilityMenu(ability, entity);
    }
    positionPopUpElement(popUpElement, relativeElement){
        this.view.positionPopUpElement(popUpElement, relativeElement)
    }
}