import { loadCanvasImages, createElement, capiltalizeAllFirstLetters, playSoundEffect} from '../utility.js';


export default class PartyView{
    constructor(){
        this.screen = document.getElementById('party-screen');
        this.gridContainer = document.getElementById('party-grid-container');
    }
    createPartySlots(party){
        for(let i = 0; i < party.length; i++){
            this.createPartySlot(party[i]);
        }
    }
    createPartySlot(entity){
        const partyGridItem = createElement('div', 'party-grid-item');
            const characterSlotData = createElement('div', 'party-character-slot-data');//dragable true TODO
                const characterSlotNameHeader = createElement('h3', 'party-character-slot-name-header');
                const allVitalBarsContainer = createElement('div', 'party-all-vital-bars-container');

                    const healthBarContainer = createElement('div', 'party-vital-bar-container');
                        const healthProgress = createElement('div', 'party-vital-bar-progress health-color party-health-progress');
                        const healthLabelContainer = createElement('div', 'party-vital-label-container');
                            const healthIcon = createElement('img', 'icon health-icon');
                            const healthLabel = createElement('p', 'party-vital-label');
                        const currentHealth = createElement('div', 'party-current-vital-label party-current-health');

                    const staminaBarContainer = createElement('div', 'party-vital-bar-container');
                        const staminaProgress = createElement('div', 'party-vital-bar-progress stamina-color party-stamina-progress');
                        const staminaLabelContainer = createElement('div', 'party-vital-label-container');
                            const staminaIcon = createElement('img', 'icon stamina-icon');
                            const staminaLabel = createElement('p', 'party-vital-label');
                        const currentStamina = createElement('div', 'party-current-vital-label party-current-stamina');
                        
                    const magicBarContainer = createElement('div', 'party-vital-bar-container');
                        const magicProgress = createElement('div', 'party-vital-bar-progress magic-color party-magic-progress');
                        const magicLabelContainer = createElement('div', 'party-vital-label-container');
                            const magicIcon = createElement('img', 'icon magic-icon');
                            const magicLabel = createElement('p', 'party-vital-label');
                        const currentMagic = createElement('div', 'party-current-vital-label party-current-magic');

                const slotButtonContainer = createElement('div', 'party-character-slot-button-container');
                    const toggleSummaryButton = createElement('button', 'medium-size-button party-toggle-summary-button');
                    const chooseReinforcementButton = createElement('button', 'medium-size-button party-select-button');

        partyGridItem.appendChild(characterSlotData);
        characterSlotData.appendChild(characterSlotNameHeader);
        characterSlotData.appendChild(allVitalBarsContainer);
        characterSlotData.appendChild(slotButtonContainer );
        allVitalBarsContainer.appendChild(healthBarContainer)
        allVitalBarsContainer.appendChild(staminaBarContainer)
        allVitalBarsContainer.appendChild(magicBarContainer)
        healthBarContainer.appendChild(healthProgress);
        healthBarContainer.appendChild(healthLabelContainer);
        healthBarContainer.appendChild(currentHealth);
        healthLabelContainer.appendChild(healthIcon);
        healthLabelContainer.appendChild(healthLabel);
        
        staminaBarContainer.appendChild(staminaProgress);
        staminaBarContainer.appendChild(staminaLabelContainer);
        staminaBarContainer.appendChild(currentStamina);
        staminaLabelContainer.appendChild(staminaIcon);
        staminaLabelContainer.appendChild(staminaLabel);

        magicBarContainer.appendChild(magicProgress);
        magicBarContainer.appendChild(magicLabelContainer);
        magicBarContainer.appendChild(currentMagic);
        magicLabelContainer.appendChild(magicIcon);
        magicLabelContainer.appendChild(magicLabel);

        slotButtonContainer.appendChild(toggleSummaryButton);
        slotButtonContainer.appendChild(chooseReinforcementButton);

        toggleSummaryButton.innerText = 'Summary';
        chooseReinforcementButton.innerText = 'Select';

        this.gridContainer.appendChild(partyGridItem);

        characterSlotData.id = entity.partyId;
        characterSlotData.draggable = true;
        this.updateEntityStats(entity);

    }
    updateEntityStats(entity){
        const slot = document.getElementById(entity.partyId);
        slot.style.backgroundImage = `url(${entity.apperance})`;
        slot.querySelector('.party-character-slot-name-header').innerText = capiltalizeAllFirstLetters(entity.name);
        slot.querySelector('.party-health-progress').style.width = Math.floor(entity.currentHP/entity.maxHP*100) + "%";
        slot.querySelector('.health-icon').src = './assets/media/icons/hearts.png';
        slot.querySelector('.party-current-health').innerText = entity.currentHP;
        slot.querySelector('.party-stamina-progress').style.width = Math.floor(entity.currentStamina/entity.maxStamina*100) + "%";
        slot.querySelector('.stamina-icon').src = './assets/media/icons/despair.png';
        slot.querySelector('.party-current-stamina').innerText = entity.currentStamina;
        slot.querySelector('.party-magic-progress').style.width = Math.floor(entity.currentMagic/entity.maxMagic*100) + "%";
        slot.querySelector('.magic-icon').src = './assets/media/icons/crystalize.png';
        slot.querySelector('.party-current-magic').innerText = entity.currentMagic;
    }
    removeAllEntitySlots(){
        Array.from(this.gridContainer.getElementsByClassName('party-grid-item')).forEach((slot)=>{
            slot.remove();
        });
    }
    removeEntitySlot(partyId){
        Array.from(this.gridContainer.getElementsByClassName('party-grid-item')).forEach((slot)=>{
            if(slot.id == partyId){
                slot.remove();
            }
        });
    }
    hideElementsForBattle(situation){
        if(situation != 'overworld'){
            document.getElementById('party-toggle-overworld-button').style.display = 'none';
            document.querySelectorAll('.party-toggle-summary-button').forEach((node)=>{
                node.style.display='none';
            });
            document.querySelectorAll('.party-select-button').forEach((node)=>{
                node.style.display='block';
            });
            document.querySelectorAll('.party-character-slot-data').forEach((node)=>{
                node.draggable = false;
            });
        }else{
            document.getElementById('party-toggle-overworld-button').style.display = 'block';
            document.querySelectorAll('.party-select-button').forEach((node)=>{
                node.style.display='none';
            });
        }
    }
}