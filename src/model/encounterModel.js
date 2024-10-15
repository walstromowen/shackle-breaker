import { getRandomArrayElement } from "../utility.js";

export default class EncounterModel{
    constructor(props){
        this.props = props;
        this.currentCharacter;
        this.currentStage;
        this.initialize();
    }
    initialize(){}
    determineCurrentCharater(){
        this.currentCharacter = getRandomArrayElement(this.props.getParty());
        if(this.currentCharacter.currentHP <= 0){
            this.determineCurrentCharater();
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
        for(let i = 0; decision.attributeArray.length; i++){
            switch(decision.attributeArray[i]){
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
                default:
                    attributeScore += 1;
                    break;
            }
        }
        attributeScore = Math.floor(attributeScore/decision.attributeArray.length);
        let attributeBonuseScore =  Math.floor(attributeScore/3)
        return attributeBonuseScore;
    }
    checkDecisionSuccess(attributeBonuseScore, decision){
        if(Math.floor(Math.random()*(20 + attributeBonuseScore)) > decision.successThreshold){
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
        tile.encounter =  '';
        tile.battle = this.props.getBattle();

    }
    checkResetEncounter(){
        let encounter = this.model.getEncounter();
        if(encounter.resetOnLeave){
            encounter.currentStage = encounter.initialStage;
        }
    }
}