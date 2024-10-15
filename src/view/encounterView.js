import {createElement, capiltalizeAllFirstLetters, playSoundEffect} from '../utility.js';


export default class EncounterView{
    constructor(){
        this.screen = document.getElementById('encounter-screen');
        
        this.characterCard = document.getElementById('encounter-card-current-character');

        this.characterCardName = document.getElementById('encounter-character-card-name-header');

        this.characterCardStatusContainer = document.getElementById('encounter-character-card-status-icon-container');

        this.characterCardCurrentHealth = document.getElementById('encounter-character-card-current-health');
        this.characterCardMaxHP = document.getElementById('encounter-character-card-max-health');
        this.characterCardHPProgress = document.getElementById('encounter-character-card-health-progress');
        
        this.characterCardCurrentStamina = document.getElementById('encounter-character-card-current-stamina');
        this.characterCardMaxStamina = document.getElementById('encounter-character-card-max-stamina');
        this.characterCardStaminaProgress = document.getElementById('encounter-character-card-stamina-progress');

        this.characterCardCurrentMagic = document.getElementById('encounter-character-card-current-magic');
        this.characterCardMaxMagic = document.getElementById('encounter-character-card-max-magic');
        this.characterCardMagicProgress = document.getElementById('encounter-character-card-magic-progress');
        
        this.eventCard = document.getElementById('encounter-card-event');

        this.eventCardHeader = document.getElementById('encounter-card-event-header');

        this.currentCharacterVigor = document.getElementById('encounter-current-character-vigor');
        this.currentCharacterStrength = document.getElementById('encounter-current-character-strength');
        this.currentCharacterDexterity = document.getElementById('encounter-current-character-dexterity');
        this.currentCharacterIntelligence = document.getElementById('encounter-current-character-intelligence');
        this.currentCharacterAttunement = document.getElementById('encounter-current-character-attunement');

        this.encounterConsole = document.getElementById('encounter-console');
        this.encounterConsoleContent = document.getElementById('encounter-console-content');

        this.encounterControlsChoicesTab = document.getElementById('encounter-controls-choice-options-tab');
    }
    updateCurrentCharacterCardStats(currentCharacter){
        this.characterCard.style.backgroundImage = `url(${currentCharacter.apperance})`;
        this.characterCardName.innerText = currentCharacter.name;
        //this.characterCardStatusContainer 
        this.characterCardCurrentHealth.innerText = currentCharacter.currentHP;
        this.characterCardMaxHP.innerText = currentCharacter.maxHP;
        this.characterCardHPProgress.style.width = Math.floor(currentCharacter.currentHP/currentCharacter.maxHP*100) + "%";
        this.characterCardCurrentStamina.innerText = currentCharacter.currentStamina;
        this.characterCardMaxStamina.innerText = currentCharacter.maxStamina;
        this.characterCardStaminaProgress.style.width = Math.floor(currentCharacter.currentStamina/currentCharacter.maxStamina*100) + "%";
        this.characterCardCurrentMagic.innerText = currentCharacter.currentMagic;
        this.characterCardMaxMagic.innerText = currentCharacter.maxMagic;
        this.characterCardMagicProgress.style.width = Math.floor(currentCharacter.currentMagic/currentCharacter.maxMagic*100) + "%";
    }
    updateCurrentCharacterAttributes(currentCharacter){
        this.currentCharacterVigor.innerText = currentCharacter.vigor;
        this.currentCharacterStrength.innerText = currentCharacter.strength;
        this.currentCharacterDexterity.innerText = currentCharacter.dexterity;
        this.currentCharacterIntelligence.innerText = currentCharacter.intelligence;
        this.currentCharacterAttunement.innerText = currentCharacter.attunement;
    }
    updateEventCard(currentStage){
        this.eventCard.style.backgroundImage = `url(${currentStage.imageSrc})`;
        this.eventCardHeader.innerText = currentStage.name;
    }
    appendToEncounterConsole(character){
        this.encounterConsoleContent.textContent += character;
        

        //this.encounterConsoleContent.classList.remove('typing-animation');
        //this.encounterConsoleContent.offsetWidth;
        //this.encounterConsoleContent.classList.add('typing-animation');
    }
    printToEncounterConsole(message){
        this.encounterConsoleContent.innerText = '';
        this.encounterConsoleContent.innerText = message;
    }
    removeDecisionButtons(){
        Array.from(this.encounterControlsChoicesTab.getElementsByClassName('encounter-decision-button')).forEach((button)=>{
            button.remove();
        });
    }
    createDecisionButton(decision){
        const decisionButton = createElement('p', 'encounter-decision-button');
        decisionButton.innerText = decision.description;
        this.encounterControlsChoicesTab.appendChild(decisionButton);
        return decisionButton;
    }
    playBattleTransition(){
        document.querySelector('body').classList.add('battle-wipe');
        return new Promise((resolve)=>{
            setTimeout(()=>{
                resolve(); 
            }, 3000)
        })
    }
}

