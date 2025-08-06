import { getRandomArrayElement } from "../utility.js";

export default class EncounterModel{
    constructor(props){
        this.props = props;
        this.currentCharacter = '';
        this.currentStage;
    }
    initialize(){
        this.props.setSituation('encounter');
        this.determineCurrentCharacter();
        this.initializeCurrentStage();
    }
    determineCurrentCharacter(){
        if(this.currentCharacter == ''){
            this.currentCharacter = this.props.getParty()[0];
            if(this.currentCharacter.currentHP <= 0){
                this.determineCurrentCharacter();
            }
        }
    }
    initializeCurrentStage(){
        let encounter = this.props.getEncounter();
        this.currentStage = encounter.currentStage;
    }
    changeStage(stage){
        this.currentStage = stage
        this.props.getEncounter().currentStage = stage;
    }
    calculateAttributeBonusScore(decision){
        let attributeScore = 0;
        for(let i = 0; i < decision.attributes.length; i++){
            switch(decision.attributes[i]){
                case 'vigor':
                    attributeScore += this.currentCharacter.vigor;
                    break;
                case 'endurance':
                    attributeScore += this.currentCharacter.endurance;
                    break;
                case 'strength':
                    attributeScore += this.currentCharacter.strength;
                    break;
                case 'dexterity':
                    attributeScore += this.currentCharacter.dexterity;
                    break;
                case 'intelligence':
                    attributeScore += this.currentCharacter.intelligence;
                    break;
                case 'attunement':
                    attributeScore += this.currentCharacter.attunement;
                    break;
                case 'alterian':
                    if(this.currentCharacter.factions.includes('alterian')) attributeScore += 9;
                    break;
                case 'panzerian':
                    if(this.currentCharacter.factions.includes('panzerian')) attributeScore += 9;
                    break;
                case 'namuh':
                    if(this.currentCharacter.factions.includes('namuh')) attributeScore += 9;
                    break;
                case 'corruption':
                    attributeScore += Math.round(this.currentCharacter.currentCorruption*30);
                    break;
                default:
                    attributeScore = 0;
                    break;
            }
        }
        attributeScore = Math.floor(attributeScore/decision.attributes.length);
        let attributeBonusScore =  Math.floor(attributeScore/3)
        return attributeBonusScore;
    }
    checkDecisionSuccess(roll, successThreshold){
        if(roll >= successThreshold){
            return true;
        }else{
            return false;
        }
    }
    calculateDecisionOutcome(success, decision){
        let pool;
        if(success){
            pool = decision.successfulOutcomes;
        }else{
            pool = decision.negativeOutcomes;
        }
        let allWeightSum = pool.reduce((ac, outcome)=> ac + outcome.weight, 0);
        let threshold = Math.random() * allWeightSum;
        for(let outcome of pool){
            threshold -= outcome.weight;
            if(threshold < 0){
                return outcome;
            }
        }
    }
    toggleBattle(battle){
        this.props.setBattle(battle);
        this.props.setScreen('battle-screen');
    }
    updateTileBattle(currentPartyPosition){
        let tile =  this.props.getMap().tileLayout[currentPartyPosition[1]][currentPartyPosition[0]];
        tile.battle = this.props.getBattle();
    }
    updateTileEncounter(currentPartyPosition){
        let tile =  this.props.getMap().tileLayout[currentPartyPosition[1]][currentPartyPosition[0]];
        tile.encounter =  this.props.getEncounter();
    }
    checkResetEncounter(){
        let encounter = this.props.getEncounter();
        if(encounter.resetOnLeave){
            encounter.currentStage = encounter.initialStage;
        }
    }
    lootStage(loot){
        let inventory = this.props.getInventory();
        for(let i = 0; i < loot.length; i++){
            inventory.push(loot[i]);
        }
    }
    makePartySelectable(){
        let party = this.props.getParty()
        for(let i = 0; i < party.length; i++){
            party[i].isSelectable = true;
        }
    }
    checkGoldCost(cost){
        let currentGold = this.props.getGold();
        if(currentGold  >= cost){
            this.props.setGold(currentGold - cost)
            return true;
        }else{
            return false;
        }
    }
    checkRequiredItems(requiredItems){
        let removedItems = []
        let inventory = this.props.getInventory()
        for(let i = 0; i < requiredItems.length; i++){
            for(let j = 0; j < inventory.length; j++){
                if(requiredItems[i] == inventory[j].name){
                    removedItems.push(inventory[j]);
                    break;
                }
            }
        }
        if(removedItems.length == requiredItems.length){
            for(let i = 0; i < removedItems.length; i++){
                for(let j = 0; j < inventory.length; j++){
                    if(removedItems[i].itemId == inventory[j].itemId){
                        inventory.splice(j, 1);
                        i--;
                        break;
                    }
                }
            }
            return true;
        }else{
            return false;
        }
    }
}