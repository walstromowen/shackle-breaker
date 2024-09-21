import {createElement, capiltalizeAllFirstLetters, playSoundEffect} from '../utility.js';

import LobbyView from "./lobbyView.js";
import OverworldView from "./overworldView.js";
import BattleView from "./battleView.js";
import PartyView from "./partyView.js";
import CharacterSummaryView from "./characterSummaryView.js";

export default class GameView{
    constructor(){
        this.lobbyView = new LobbyView();
        this.overworldView = new OverworldView();
        this.battleView = new BattleView();
        this.partyView = new PartyView();
        this.characterSummaryView = new CharacterSummaryView();
    }
    switchScreen(screenId){
        Array.from(document.getElementsByClassName('screen')).forEach((screen)=>{
            if(screen.id == screenId){
                screen.style.display='flex';
            }else{
                screen.style.display='none';
            }
        });
    }
    updateMiniMenu(item){
        document.getElementById('inventory-mini-menu-item-name').innerText = item.name.toUpperCase();
        document.getElementById('inventory-mini-menu-img').src = item.imageSrc;
        document.getElementById('inventory-mini-menu-item-price').innerText = item.price +'g';
        document.getElementById('inventory-mini-menu-item-description').innerText = item.description;
        switch(item.itemType){
            case 'attachable':
                document.getElementById('inventory-mini-menu-item-level').innerText = item.level;
                document.getElementById('inventory-mini-menu-item-slot').innerText = capiltalizeAllFirstLetters(item.slot);
                document.getElementById('inventory-mini-menu-hp-recovery').innerText = item.hpRecovery;
                document.getElementById('inventory-mini-menu-speed').innerText = item.speed;
                document.getElementById('inventory-mini-menu-stamina-recovery').innerText = item.staminaRecovery;
                document.getElementById('inventory-mini-menu-evasion').innerText = item.evasion;
                document.getElementById('inventory-mini-menu-magic-recovery').innerText = item.magicRecovery;
                document.getElementById('inventory-mini-menu-critical').innerText = item.critical;
                document.getElementById('inventory-mini-menu-blunt-attack').innerText = item.bluntAttack;
                document.getElementById('inventory-mini-menu-pierce-attack').innerText = item.pierceAttack;
                document.getElementById('inventory-mini-menu-arcane-attack').innerText = item.arcaneAttack;
                document.getElementById('inventory-mini-menu-elemental-attack').innerText = item.elementalAttack;
                document.getElementById('inventory-mini-menu-blunt-defense').innerText = item.bluntDefense;
                document.getElementById('inventory-mini-menu-blunt-resistance').innerText = item.bluntResistance;
                document.getElementById('inventory-mini-menu-pierce-defense').innerText = item.pierceDefense;
                document.getElementById('inventory-mini-menu-pierce-resistance').innerText = item.pierceResistance;
                document.getElementById('inventory-mini-menu-arcane-defense').innerText = item.arcaneDefense;
                document.getElementById('inventory-mini-menu-arcane-resistance').innerText = item.arcaneResistance;
                document.getElementById('inventory-mini-menu-elemental-defense').innerText = item.elementalDefense;
                document.getElementById('inventory-mini-menu-elemental-resistance').innerText = item.elementalResistance;
                break;
            case 'material':
                document.getElementById('inventory-mini-menu-item-level').innerText = 'N/A';
                document.getElementById('inventory-mini-menu-item-slot').innerText = 'N/A';
                document.getElementById('inventory-mini-menu-hp-recovery').innerText = 'N/A';
                document.getElementById('inventory-mini-menu-speed').innerText = 'N/A';
                document.getElementById('inventory-mini-menu-stamina-recovery').innerText = 'N/A';
                document.getElementById('inventory-mini-menu-evasion').innerText = 'N/A';
                document.getElementById('inventory-mini-menu-magic-recovery').innerText = 'N/A';
                document.getElementById('inventory-mini-menu-critical').innerText = 'N/A';
                document.getElementById('inventory-mini-menu-blunt-attack').innerText = 'N/A';
                document.getElementById('inventory-mini-menu-pierce-attack').innerText = 'N/A';
                document.getElementById('inventory-mini-menu-arcane-attack').innerText = 'N/A';
                document.getElementById('inventory-mini-menu-elemental-attack').innerText = 'N/A';
                document.getElementById('inventory-mini-menu-blunt-defense').innerText = 'N/A';
                document.getElementById('inventory-mini-menu-blunt-resistance').innerText = 'N/A';
                document.getElementById('inventory-mini-menu-pierce-defense').innerText = 'N/A';
                document.getElementById('inventory-mini-menu-pierce-resistance').innerText = 'N/A';
                document.getElementById('inventory-mini-menu-arcane-defense').innerText = 'N/A';
                document.getElementById('inventory-mini-menu-arcane-resistance').innerText = 'N/A';
                document.getElementById('inventory-mini-menu-elemental-defense').innerText = 'N/A';
                document.getElementById('inventory-mini-menu-elemental-resistance').innerText = 'N/A';
        }
        

        document.getElementById('inventory-mini-menu-abilities-tab').querySelectorAll('.inventory-mini-menu-ability-slot').forEach((node)=>{
            node.remove();
        });
        if(item.itemType!='material'){
            for(let i = 0; i < item.abilityArray.length; i++){
                this.createAbilitySlot(item.abilityArray[i]);
            }
        }

    }
    createAbilitySlot(ability){
        const slot = createElement('div', 'inventory-mini-menu-ability-slot');

            const imgNameContainer = createElement('div', 'flex');
                const abilityImg = createElement('img', 'utility-button');
                const abilityName = createElement('p', 'stat-label');

            const hpCostContainer = createElement('div', 'stat-cell');
                const hpCostImgLabelContainer = createElement('div', 'flex');
                    const hpCostImg = createElement('img', 'icon');
                    const hpCostLabel = createElement('p', 'stat-label');
                const currentHpCost = createElement('p', 'stat-value');

            const staminaCostContainer = createElement('div', 'stat-cell');
                const staminaCostImgLabelContainer = createElement('div', 'flex');
                    const staminaCostImg = createElement('img', 'icon');
                    const staminaCostLabel = createElement('p', 'stat-label');
                const currentStaminaCost = createElement('p', 'stat-value');

            const magicCostContainer = createElement('div', 'stat-cell');
                const magicCostImgLabelContainer = createElement('div', 'flex');
                    const magicCostImg = createElement('img', 'icon');
                    const magicCostLabel = createElement('p', 'stat-label');
                const currentMagicCost = createElement('p', 'stat-value');

            const targetCountContainer = createElement('div', 'stat-cell');
                const targetCountImgLabelContainer = createElement('div', 'flex');
                    const targetCountImg = createElement('img', 'icon');
                    const targetCountLabel = createElement('p', 'stat-label');
                const currentTargetCount = createElement('p', 'stat-value');

            const speedModifierContainer = createElement('div', 'stat-cell');
                const speedModifierImgLabelContainer = createElement('div', 'flex');
                    const speedModifierImg = createElement('img', 'icon');
                    const speedModifierLabel = createElement('p', 'stat-label');
                const currentSpeedModifier = createElement('p', 'stat-value');

            const damageModifierContainer = createElement('div', 'stat-cell');
                const damageModifierImgLabelContainer = createElement('div', 'flex');
                    const damageModifierImg = createElement('img', 'icon');
                    const damageModifierLabel = createElement('p', 'stat-label');
                const currentDamageModifier = createElement('p', 'stat-value');

            const accuracyContainer = createElement('div', 'stat-cell');
                const accuracyImgLabelContainer = createElement('div', 'flex');
                    const accuracyImg = createElement('img', 'icon');
                    const accuracyLabel = createElement('p', 'stat-label');
                const currentAccuracy = createElement('p', 'stat-value');

            const damageTypesContainer = createElement('div', 'stat-cell');
      
            abilityImg.src = ability.iconSrc;
            abilityName.innerText = capiltalizeAllFirstLetters(ability.name);

            hpCostImg.src = './assets/media/icons/swirl-string.png';
            hpCostLabel.innerText = 'HP COST';
            currentHpCost.innerText = ability.healthCost;

            staminaCostImg.src = './assets/media/icons/swirl-string.png';
            staminaCostLabel.innerText = 'STM COST';
            currentStaminaCost.innerText = ability.staminaCost;

            magicCostImg.src = './assets/media/icons/swirl-string.png';
            magicCostLabel.innerText = 'MAG COST';
            currentMagicCost.innerText = ability.magicCost;

            targetCountImg.src = './assets/media/icons/swirl-string.png';
            targetCountLabel.innerText = 'TARGETS';
            currentTargetCount.innerText = ability.targetCount;

            speedModifierImg.src = './assets/media/icons/swirl-string.png';
            speedModifierLabel.innerText = 'SPD MOD';
            currentSpeedModifier.innerText = ability.speedModifier;

            damageModifierImg.src = './assets/media/icons/swirl-string.png';
            damageModifierLabel.innerText = 'DMG MOD';
            currentDamageModifier.innerText = ability.damageModifier;

            accuracyImg.src = './assets/media/icons/swirl-string.png';
            accuracyLabel.innerText = 'ACCURACY';
            currentAccuracy.innerText = ability.accuracy;


            imgNameContainer.appendChild(abilityImg);
            imgNameContainer.appendChild(abilityName);
            slot.appendChild(imgNameContainer);
            slot.appendChild(hpCostContainer);
            slot.appendChild(staminaCostContainer);
            slot.appendChild(magicCostContainer);
            slot.appendChild(targetCountContainer);
            slot.appendChild(speedModifierContainer);
            slot.appendChild(damageModifierContainer);
            slot.appendChild(accuracyContainer);
      

        document.getElementById('inventory-mini-menu-abilities-tab').appendChild(slot);
    }
}